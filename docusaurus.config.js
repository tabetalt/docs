const admonitions = require('remark-admonitions');
const path = require('path');
const fs = require('fs');


const links = [
  {
    to: 'index',
    activeBasePath: `index`,
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
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: `https://github.com/tabetalt/docs/edit/master`,
        routeBasePath: '',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [admonitions],
      },
    ],
    ['@docusaurus/plugin-content-pages'],
    // ['@docusaurus/plugin-google-analytics'],
    ['@docusaurus/plugin-sitemap']
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
  // presets: [
  //   [
  //     '@docusaurus/preset-classic',
  //     {
  //       docs: {
  //         // It is recommended to set document id as docs home page (`docs/` path).
  //         homePageId: 'docs',
  //         sidebarPath: require.resolve('./sidebars.js'),
  //         // Please change this to your repo.
  //         editUrl:
  //           'https://github.com/facebook/docusaurus/edit/master/website/',
  //       },
  //       theme: {
  //         customCss: require.resolve('./src/css/theme.css'),
  //       },
  //     },
  //   ],
  // ],
};
