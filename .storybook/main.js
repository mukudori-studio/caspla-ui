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
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
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
