const modules = require('./getModules');

module.exports = {
  base: {
    Welcome: ['index'],
    Products: modules.map((mod) => ({
      type: 'link',
      label: mod.name, // The label that should be displayed (string).
      href: `/${mod.homePageId}`, // The target URL (string).
    })),
  },
};
