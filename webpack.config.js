const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  stats: 'minimal',
  devServer: {
    contentBase: './public',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};
