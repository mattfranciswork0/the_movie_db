//note: make sure to run npm run develop or npm run build whenever you
//change the config file!
//note: when you do webpack-dev-server in package.json's develop, the dist folder output files are found in localhost:8080's network. This way you can check for the actual file size when the server
//is retrieving it. And you can check the time. Also your page gets automatically refrshed; and I think your config does too! If you want to see the output files locally, change it to webpack and get rid of --open
//note: webpack helps us with all js files, including imports/exports modules with bundle.js so that we don't need multiple <script>
//note:  npm run build minifies the bundle.js; while npm drun develop dosent
//note: webpack dev server is not the same as localhost:3000! It's a remote server for you to test file sizes whena server tries to download it
//note: webpack uses treehsaking,  Tree shaking is a method of optimising our code bundles by eliminating any code from the final file that isn’t actually being used.(eg;if youre using a library and your not using some of it's imports)
//note: lazy loading:. You can load only the files you want and improve your app’s performance. Dynamically importing.
//link that helped :https://www.sitepoint.com/beginners-guide-webpack-module-bundling/  and this guy's series:https://www.youtube.com/watch?v=CzLiXgRUt4g&list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os&index=5

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') //__dirname (reserved keyword)= current directory; create a path
    //publicPath: '/dist' //need it to tell where ouput is created for webpack dev server, need it for location of scripts; also! usefull for auto injection of scripts
    //We removed this because the auto injection of the <script> in index.html has a location of src=/bundle.js. Without the html loader being generated in dist, we would need this public path that consists of dist/bundle.js
  },
  module: { //a module is any import you have
    rules:[ //loaders are used to transform a `file to file code`;Loaders let you run preprocessors on files as they’re imported
        {
          test: /\.js$/, //able to import js
          exclude: /node_modules/,
          use: [
            {//Loaders are executed in reverse order
              loader: 'babel-loader',

            //preset is @babel-env in .babelrc
            //"syntax-dynamic-import" in babel.rc is required for dynamiclaly importing (used for lazy loading) (https://medium.com/walkme-engineering/when-magic-fails-a-programmer-grows-e3289ced0791)
            //core-js needed in package.json for promise pollyfill/support in IE
            }
          ]
        },
       {
        test: /\.scss$/, //able to import scss to js
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          },
          {
            loader: 'postcss-loader' //used browserlist in package.json along with post css to target specific browsers
            //Post css Autoprefixer plugin configuration will process based on the last 2 versions of all major browsers as well as specifically do what is needed for IE 8 and IE 9. (https://css-tricks.com/browserlist-good-idea/)
          }
        ]
      },
      {
        test: /\.html$/, //auto injects scripts and css files; able to import html to js
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader', //able to import images
            options: {
              name: '[name].[ext]', //by default it will have hashinng file name when you import the picture; but we want to have the normal image name
              outputPath:'img/', //by default, it will be in the dist folder. But I want to create an img folder inside the dist folder
              publicPath:'img/' //creates an img folder in the dist folder in webpack dev server
            }
          }
        ]
      }
    ]
  },
  //plugins are used to transform your whole code
    plugins: [ //not in reversed order like use[]
      new HtmlWebpackPlugin({ //will create a viewable html file (bundle.js automaticly creates the html part but we don't see it without this)
        //by default it will create an index.html
        template: 'src/index.html'//will find path of index html you have
      }),
      new MiniCssExtractPlugin({//will create a viewable css file (bundle.js automaticly creates the css part but we don't see it without this)
          filename: 'index.css'
      }),
      new CleanWebpackPlugin() //pass in the folders that you want to clean
  ]
};
