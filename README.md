## Welcome to the Perspective API Extension Codebase

This extension is designed to bring Perspective feedback inline with the comments/text that you author.

### Getting Started

 1. Download extension
 2. Start writing
 3. Get Perspective feedback :+1:

When you enable the extension (chrome only atm), you will see the Perspective indicator on the bottom right of your text box when you write content.

### Pipeline (not necessarily in order)

- [x] Enable Perspective feedback on input fields.
- [ ] Show Perspective feedback text explanations.
- [ ] Allow users the ability to give submit their own feedback for a given toxicity score.
- [ ] Toggle to enable/disable the extension on a site.
- [ ] Optimize positioning for popular sites (Facebook, Twitter, etc.)
- [ ] Firefox add-on


### Feedback, comments, bugs...

If you have feedback on this extension, please create an issue on this repository or in the chrome store listing. All types of feedback are welcome.


### Disagree with a feedback result?

As the Perspective team puts it:
>"It’s still early days and we will get a lot of things wrong."

The API allows for feedback on scores to be submitted but this is not built into the extension. This is in the pipeline, though!


### Development

  1. `npm install`

  1. `npm run build` will create a `build/` directory

  1. _(optional)_ `npm run watch` will create a `build/` directory and will rebuild when changes happen in repo

The `build/` directory is what contains the manifest and built extension code for loading the unpacked extension into chrome.
