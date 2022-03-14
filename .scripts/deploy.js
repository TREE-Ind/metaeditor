const replace = require("replace-in-file");
const { exec } = require("child_process");
const packageJson = require("../package.json");

class Deploy {
  constructor() {
    this.dir = '.scripts'
    this.repo_url = 'https://github.com/markolofsen/metaeditor'
  }

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
    await this.exec('cd ../ && npx next build && npx next export -o ./build')
    await this.replaceFilePaths()
    await this.exec('npx gh-pages -d ../build')
    await this.exec(`open ${this.repo_url}/actions`)

    // URLS
    await new Promise((resolve, reject) => {
      setTimeout(() => {

        this.exec(`open ${this.repo_url}/blob/main/${this.dir}/README.md`)
        this.exec(`open ${this.repo_url}/settings/pages`)
        this.exec(`open ${this.repo_url}/new/gh-pages`)
        this.exec(`open ${this.repo_url}/new/gh-pages/_next`)

        resolve(true)

      }, 1000 * 60 * 3)
    })

  }

  async replaceFilePaths() {
    const options = {
      //you may need to modify the file address to suite your project
      files: "../build/index.html",
      from: [/src="\//g, /href="\//g],
      to: ['src="./', 'href="./'],
    };

    await new Promise(async (resolve, reject) => {
      try {
        const results = await replace(options);
        console.log("Replacement results:", results);
        resolve()
      } catch (error) {
        console.error("Error occurred:", error);
        reject()
      }
    })
  }
}


new Deploy().deploy()
