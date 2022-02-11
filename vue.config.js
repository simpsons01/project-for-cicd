const args = process.argv.slice(2)
const page = args[2]

module.exports = {
  outputDir: "dist/" + page,
  publicPath: process.env.VUE_APP_PUBLIC_PATH ? process.env.VUE_APP_PUBLIC_PATH  + page : "",
  chainWebpack: config => {
    config.entry('main').clear()
    config.entry('main').add('./src/' + page + '.ts')
  }
}