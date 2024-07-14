### PostFeed prototype
## After git clone and npm install as first steps, read carefully the next lines: 


If you encounter font loading issues while developing the PostFeed prototype, particularly when using Catalyst styles, follow these steps to ensure fonts are loaded correctly during local development without the need to copy them to the `dist` folder:

1. **Resolve Font Path Issues**:
    - The main issue occurs with relative paths defined in SCSS that are not resolved properly during development builds, leading to font loading errors.

2. **Steps to Correct Font Loading**:
    - Comment out the first two lines in `styles.scss`. ($cat-font-path: '...' and @import "@haiilo/catalyst")
    - Run `npm run build` to generate the `dist` folder with the copied fonts from the `node_modules` directory.
    - Uncomment the first two lines in `styles.scss`.
    - Verify that the `dist` folder contains the fonts located at `dist/static/js/assets/fonts`.
    - Start the local development server by running `npm run start`.

By following these steps, you can address font loading issues in the development environment, ensuring that the fonts are included and accessible without any copying required. This enhanced solution provides a clear path to resolve font loading discrepancies and set up the project for successful local development.
