### PostFeed prototype
# After git clone and npm install read carefully the next lines: 


If you encounter font loading issues while developing the PostFeed prototype, particularly when using Catalyst styles, follow these steps to ensure fonts are loaded correctly during local development without the need to copy them to the `dist` folder:

1. **Resolve Font Path Issues**:
    - The main issue occurs with relative paths defined in SCSS that are not resolved properly during development builds, leading to font loading errors.

2. **Steps to Correct Font Loading**:
   a. Comment out the first two lines in `styles.scss`.
   b. Run `npm run build` to generate the `dist` folder with the copied fonts from the `node_modules` directory.
   c. Uncomment the first two lines in `styles.scss`.
   d. Verify that the `dist` folder contains the fonts located at `dist/static/js/assets/fonts`.
   e. Start the local development server by running `npm run start`.

**Enhanced Step-by-Step Solution**:
1. **Comment CSS Import**:
    - Start by commenting out the initial CSS imports in `styles.scss` to prevent font loading issues during the initial build process.

2. **Build the Project**:
    - Run `npm run build` to trigger the build process and copy the fonts to the `dist` folder for proper font loading.

3. **Uncomment CSS Import**:
    - Once the build is complete, uncomment the CSS imports in `styles.scss` to include the font styles back into the project.

4. **Verify Font Directory**:
    - Check the `dist` folder to ensure that the fonts are located at `dist/static/js/assets/fonts` as expected.

5. **Start Local Server**:
    - Launch the local development server by running `npm run start` to see the project with the fonts loaded correctly.

By following these steps, you can address font loading issues in the development environment, ensuring that the fonts are included and accessible without any copying required. This enhanced solution provides a clear path to resolve font loading discrepancies and set up the project for successful local development.
