const path = require('path');

module.exports = {
  typescript: { reactDocgen: false },
  framework: '@storybook/react',
  stories: ['../**/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/stores': path.resolve(__dirname, '../src/stores'),
      '@/apis': path.resolve(__dirname, '../src/apis'),
    };

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: {
              localIdentName: "[local]___[hash:base64:2]",
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    });

    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
