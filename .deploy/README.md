## Deploy gh-pages

[How to Host a Next.JS App on GitHub Pages](https://tishonator.com/blog/how-to-host-a-next-js-app-on-github-pages)



After `yarn deploy` create empty `.nojekyll` in [gh-pages](https://github.com/markolofsen/metaeditor/tree/gh-pages):

- `/`

- `/_next/`


[Set domain](https://github.com/markolofsen/metaeditor/settings/pages) `ps.metaeditor.io`


---

javascript-obfuscator ./src/player/pixel_streaming/client/index_src.js --output ./src/player/pixel_streaming/client/index.js
