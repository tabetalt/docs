const modules = require('./sidebarModule');

console.log(modules);

module.exports = {
  docs: {
    Welcome: ['index'],
    ...modules,
  },
};
