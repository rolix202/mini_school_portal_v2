// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
//       content: [
//         "./index.html",
//         "./src/**/*.{js,ts,jsx,tsx}",
//       ],
//       defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
//     })
//   },
// }




const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { purgecss } : {})
  },
};
