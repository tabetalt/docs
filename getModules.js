const yaml = require('yaml');
const path = require('path');
const fs = require('fs');
const cnfp = path.resolve(__dirname, 'config.yaml');
const config = yaml.parse(fs.readFileSync(cnfp, 'utf8'));

const basePath = path.resolve(__dirname, 'projects');

module.exports = config.projects.filter((p) =>
  fs.existsSync(path.resolve(basePath, p.slug, 'sidebars.js'))
);
