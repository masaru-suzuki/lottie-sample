const path = require('path')

module.exports = {
  entry: {
    main: './src/scripts/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets/'),
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'vendor',
  //     chunks: 'initial',
  //   },
  // },
  resolve: {
    modules: [path.resolve(__dirname, 'src/scripts/'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '...'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.m?jsx?$/,
        // exclude: /node_modules/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
