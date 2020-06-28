const admonitions = require('remark-admonitions');
const path = require('path');
const fs = require('fs');
const modules = require('./getModules');

const multipleDocs = [
  {
    id: 'docs',
    path: 'docs',
    sidebarPath: require.resolve('./sidebars.js'),
    // editUrl: `https://github.com/tabetalt/docs/edit/master`,
    routeBasePath: 'intro',
    showLastUpdateAuthor: true,
    showLastUpdateTime: true,
    remarkPlugins: [admonitions],
  },
].concat(
  modules.map((mod) => ({
    id: mod.slug,
    name: mod.slug,
    path: `products/${mod.slug}`,
    sidebarPath: require.resolve(`./products/${mod.slug}/sidebars.js`),
    editUrl: mod.publicRepo && `https://github.com/${mod.repo}/edit/master`,
    routeBasePath: mod.slug,
    homePageId: mod.homePageId,
    showLastUpdateAuthor: true,
    showLastUpdateTime: true,
    admonitions: true,
    remarkPlugins: [admonitions],
  }))
);

const links = [
  {
    to: 'intro/index',
    activeBasePath: `intro/index`,
    label: `Docs`,
    position: 'left',
  },
  // {
  //   href: 'https://tabetalt.no/blog', label: 'Blog',
  //   position: 'left',
  // },
  {
    href: `https://github.com/tabetalt`,
    label: 'GitHub',
    position: 'left',
  },
];

module.exports = {
  title: 'Tabetalt',
  tagline:
    'Tabetalt builds modern developer-friendly e-commerce solutions for small to enterprise companies.',
  url: `https://docs.tabetalt.no/`,
  baseUrl: `/`,
  favicon: 'img/favicon.png',
  organizationName: 'tabetalt',
  projectName: 'docs',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Tabetalt',
        src: `img/logo-tabetalt.svg`,
        srcDark: `img/logo-tabetalt-dark.svg`,
        href: 'https://tabetalt.no/',
      },
      links,
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Tabetalt.no AS`,
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'Privacy',
              href: 'https://tabetalt.no/personvern/',
            },
          ],
        },
      ],
    },
  },
  plugins: [
    ['docusaurus-multiple-docs', multipleDocs],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     path: 'docs',
    //     sidebarPath: require.resolve('./sidebars.js'),
    //     // editUrl: `https://github.com/tabetalt/docs/edit/master`,
    //     routeBasePath: '',
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true,
    //     remarkPlugins: [admonitions],
    //   },
    // ],
    ['@docusaurus/plugin-content-pages'],
    // ['@docusaurus/plugin-google-analytics'],
    ['@docusaurus/plugin-sitemap'],
  ],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: require.resolve('./src/css/theme.css'),
      },
    ],
    // ['@docusaurus/theme-search-algolia'],
  ],
  // presets: [['@docusaurus/preset-classic']],
};
