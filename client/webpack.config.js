const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          host: '0.0.0.0',
          openPage: 'http://localhost:8080',
          contentBasePublicPath: path.join(__dirname, 'dist'),
          historyApiFallback: true,
          contentBase: './',
          watchContentBase: true,
        },
      };

const esLintPlugin = () => [new ESLintPlugin({ extensions: ['ts', 'js', 'jsx', 'tsx'] })];

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,

  entry: './src/index.tsx',

  output: development
    ? {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext]',
        publicPath: '/',
      }
    : {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext]',
      },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp3)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(development ? 'development' : 'production'),
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'planning-poker',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    ...esLintPlugin(),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          ['svgo', { removeViewBox: false }],
        ],
      },
    }),
    new webpack.IgnorePlugin(/cptable/),
    new webpack.LoaderOptionsPlugin({
      options: {
        vendor: ['xlsx'],
        node: { fs: 'empty' },
        externals: [{ './cptable': 'var cptable' }],
      },
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.json'],

    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@src': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },

    fallback: {
      crypto: false,
      fs: false,
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  ...devServer(development),
});
