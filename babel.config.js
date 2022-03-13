module.exports = {
  presets: [['next/babel']],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", {
        "legacy": true
    }],
    [
      '@emotion/babel-plugin',
      {
        importMap: {
          '@mui/system': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/system', 'styled'],
            },
          },
          '@mui/material/styles': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/material/styles', 'styled'],
            },
          },
        },
      },
    ],
  ],
};
