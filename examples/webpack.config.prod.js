const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
    }

    return entries
  }, {}),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.vue$/, use: ['vue-loader'] },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
    ]
  },

  resolve: {
    alias: {
      vueglue: path.resolve(__dirname, '../dist/vueglue.esm.js')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'shared',
          filename: 'shared.js',
          chunks: 'initial'
        }
      }
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}