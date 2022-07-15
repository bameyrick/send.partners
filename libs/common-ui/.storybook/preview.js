import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

export const defaultExclude = [];

export const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    exclude: defaultExclude,
  },
  docs: { inlineStories: true },
};
