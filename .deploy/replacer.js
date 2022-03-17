const replace = require("replace-in-file");
const glob = require("glob");

const Replacer = new class {

  async replace(filepath) {

    const options = {
      files: filepath,
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

  async start() {

    await glob(`./build/` + '/**/*.html', async (err, res) => {
      if (err) {
        console.log('Error', err);
      } else {
        // console.log(res);
        await this.replace(res)
      }
    });

  }
}

process.argv.forEach((val, index, array) => {
  if(val === '-start') {
    Replacer.start()
  }
});

module.exports = Replacer
