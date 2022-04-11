module.exports = {
  core: { builder: 'webpack5' },
  stories: [
    '../apps/example/**/*.stories.mdx',
    '../apps/example/**/*.stories.@(js|jsx|ts|tsx)',
    '../libs/**/*.stories.mdx',
    '../libs/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  // uncomment the property below if you want to apply some webpack config globally
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need that should apply to all storybook configs

    // Return the altered config
    return config;
  },
};
