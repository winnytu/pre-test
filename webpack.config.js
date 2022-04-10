const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//需要靠 path的 api來搬移檔案
const path = require("path");
//開始設定
module.exports = {
  //給檔案來源
  entry: "./src/index.js",
  //輸出位置與名稱
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.js"
  },
  module: {
    rules: [{
      test:/\.js$/, //2. 偵測所有 js 結尾的檔案
      exclude:/node_modules/, //3.排除 node_modules
      use: {
        loader:'babel-loader', //1. 使用 babel-loader
        options: { presets: ['@babel/preset-env'] }
      }
    },
    { 
        test: /.jsx$/, 
        exclude: /node_modules/, 
        use: { 
            loader: 'babel-loader', 
            options: { presets: ['@babel/preset-react','@babel/preset-env'] } 
        } 
    },
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: false,
    },
}
};