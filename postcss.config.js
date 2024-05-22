module.exports = {
    plugins: [
      'tailwindcss',
      'postcss-flexbugs-fixes',
      'postcss-preset-env',
      [
        'postcss-normalize',
        {
          allowDuplicates: false,
        },
      ],
      [
        '@fullhuman/postcss-purgecss',
        {
          content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        },
      ],
      'autoprefixer',
    ],
  };
  