import purgecss from '@fullhuman/postcss-purgecss'

const purgecssConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
};

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { purgecss: purgecssConfig } : {})
  },
};
