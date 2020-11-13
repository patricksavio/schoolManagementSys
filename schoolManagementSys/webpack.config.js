const { resolve } = require("path");
const path = require("path");
module.exports = {
    entry : {
       addStudent: "./src/student.ts",
       displayStudents: "./src/displayStudents.ts",
       login: "./src/loginValidation.ts",
       home:"./src/home.ts"
    },
    output : {
        filename : "[name].bundle.js",
        path : path.resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use :[ 'style-loader',
                'css-loader'
            ]},
            {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ]},
             {
                test: /\.ts$/,
                use:[
                    'ts-loader'
                ]
            }
        ]
        
    },
    externals: {
        moment: 'moment'
    },
    resolve: {
        extensions:[".ts",".js"],
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000
      },
    mode: "development", 
   
}    