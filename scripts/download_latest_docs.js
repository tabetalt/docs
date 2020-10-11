require('dotenv').config();
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { Octokit } = require('@octokit/rest');
const yaml = require('yaml');
const cnfp = path.resolve(__dirname, '..', 'config.yaml');
const config = yaml.parse(fs.readFileSync(cnfp, 'utf8'));

(async () => {
  const options = {
    githubToken: process.env.GITHUB_TOKEN,
    basePath: path.resolve(__dirname, '..', 'products'),
  };

  if (!options.githubToken) {
    throw new Error('Github Token is missing');
  }

  const octokit = new Octokit({
    auth: options.githubToken,
  });

  const modules = config.products || [];
  modules.forEach(async (mod) => {
    const repoBasePath = path.resolve(options.basePath, mod.slug);
    console.log(repoBasePath);
    rimraf.sync(repoBasePath);

    try {
      if (!fs.existsSync(repoBasePath)) {
        console.log(repoBasePath);
        fs.mkdirSync(repoBasePath, {
          recursive: true,
        });
      }
    } catch (e) {
      console.error(e);
    }

    const repo = mod.repo.split('/');
    const repoCnf = {
      owner: repo[0],
      repo: repo[1],
    };

    // Find tree_sha for `docs/`
    const mainTree = await octokit.git.getTree({
      ...repoCnf,
      tree_sha: 'HEAD',
    });

    if (!mainTree) {
      throw new Error('Could not find repository.');
    }

    const docsDirectory = mainTree.data.tree.find((f) => f.path === 'docs');
    // if (mod.changelog) {
    //   const changelog = mainTree.data.tree.find(
    //     (f) => f.path === 'CHANGELOG.md'
    //   );

    //   if (!changelog) {
    //     console.warn(`Docs directory (${mod.name}): CHANGELOG.md is missing.`);
    //     return;
    //   }

    //   const changeLogBlob = await octokit.git.getBlob({
    //     ...repoCnf,
    //     file_sha: changelog.sha,
    //   });

    //   const content = Buffer.from(
    //     changeLogBlob.data.content,
    //     'base64'
    //   ).toString('utf8');
    //   fs.writeFileSync(
    //     path.resolve(repoBasePath, 'CHANGELOG.md'),
    //     content,
    //     'utf-8'
    //   );
    // }
    if (!docsDirectory) {
      console.warn(`Docs directory (${mod.name}): ${mod.repo} is missing.`);
      return;
    }

    const tree = await octokit.git.getTree({
      ...repoCnf,
      tree_sha: docsDirectory.sha,
      recursive: true,
    });

    tree.data.tree
      .filter((f) => f.type === 'blob')
      .map(async (f) => {
        // Create product directory
        if (f.path.match('/')) {
          const paths = f.path.split('/');
          paths.pop();
          const mp = path.resolve(repoBasePath, ...paths);
          console.log(mp);
          fs.mkdirSync(mp, {
            recursive: true,
          });
        }

        // Download documentation file
        const blob = await octokit.git.getBlob({
          ...repoCnf,
          file_sha: f.sha,
        });

        const content = Buffer.from(blob.data.content, 'base64').toString(
          'utf8'
        );
        console.log(path.resolve(repoBasePath, f.path));
        fs.writeFileSync(path.resolve(repoBasePath, f.path), content, 'utf-8');
      });
  });
})();
