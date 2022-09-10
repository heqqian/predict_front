const path=require('path')

const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const config= {
    entry   :{
        'index':'./src/page/index/index.js',
    },
    output  :{
        filename   :'js/[name].js',
        path       :path.resolve(__dirname,'dist')
    },
    module: {
        rules:[
          {
            test:/\.css$/i,
            use:[MiniCssExtractPlugin.loader,'css-loader']
          },
          {
            test:/\.(png|svg|jpg|gif)$/,
            use:['file-loader&name=images/[name].[ext]']
          }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename:'css/[name].css'}),
        new HtmlWebpackPlugin({
          template  :'./src/view/index.html',
          filename  :'view/index.html',
          inject    :true,
          hash      :true,
          chunks    :['util','index']
        })
    ],
    mode:'development',
    devServer:{
        port:8080,
        static:"./dist"
    }
};

module.exports=config;