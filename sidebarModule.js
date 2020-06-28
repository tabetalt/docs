const yaml = require('yaml');
const path = require('path');
const fs = require('fs');
const cnfp = path.resolve(__dirname, 'config.yaml');
const config = yaml.parse(fs.readFileSync(cnfp, 'utf8'));

const basePath = path.resolve(__dirname, 'docs', config.basePath);

const addBasePath = (slug, s) => {
  if (typeof s === 'string') {
    return `${slug}/${s}`;
  }
  if (s.type === 'doc' || s.type === 'ref') {
    s.id = `${slug}/${s.id}`;
    return s;
  }

  if (s.type === 'category') {
    s.items = s.items.map((i) => addBasePath(slug, i));
    return s;
  }
};

module.exports = config.products.reduce((products, product) => {
  try {
    products[product.name] = [];
    const changeLogPath = path.resolve(basePath, product.slug, 'CHANGELOG.md');
    if (product.changelog && fs.existsSync(changeLogPath)) {
      products[product.name].push(`${config.basePath}/${product.slug}/CHANGELOG`);
    }
    
    const sideBarPath = path.resolve(basePath, product.slug, 'sidebar.js');
    if (fs.existsSync(sideBarPath)) {
      const sidebar = require(sideBarPath);
      products[product.name] = products[product.name].concat(sidebar.map((s) =>
        addBasePath(`${config.basePath}/${product.slug}`, s)
      ));
    }
  } catch (e) {
    console.error(e);
  }
  return products;
}, {});
