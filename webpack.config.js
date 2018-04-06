const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/client',
  output: {
    filename: 'app.js',
    path: `${__dirname}/public/js`
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'app.js.map',
      publicPath: 'https://localhost:8080/js/'
    })
  ]
}
