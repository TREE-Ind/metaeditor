const { exec } = require("child_process");
const packageJson = require("../package.json");

// extra
const Replacer = require('./replacer')


// config
const REPO_URL = 'https://github.com/markolofsen/metaeditor'


const Deploy = new class {
  constructor() {}

  async exec(cmd) {

    console.warn('@CMD ', cmd);

    await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject()
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject()
          return;
        }
        resolve(true)
        console.log(`stdout: ${stdout}`);
      });
    })

  }

  async deploy() {

    const ps_path = './src/player/pixel_streaming/client'

    await this.exec(`npx javascript-obfuscator ${ps_path}/index_src.js --output ${ps_path}/index.js`)
    await this.exec('npx next build && npx next export -o ./build')
    await Replacer.start()
    await this.exec('npx gh-pages -d ./build')

    // Open urls
    await this.exec(`open https://metaeditor.io/docs/reactjs/deployment`)
    await this.exec(`open ${REPO_URL}/actions`)

    // setTimeout(async () => {
    //   await this.exec(`open ${REPO_URL}/settings/pages`)
    //   await this.exec(`open ${REPO_URL}/new/gh-pages`)
    //   await this.exec(`open ${REPO_URL}/new/gh-pages/_next`)
    // }, 1000 * 1)


  }
}


Deploy.deploy()
