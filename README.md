# Quicklink Firefox Extension

Speed up navigations by prefetching links with Google Chrome Labs' Quicklink script.

Theoretically this source code could also be used as an extension for Chrome if you prefer it as an alternative that is privacy conscious.

### [Get the extension on Mozilla Add-ons!][100]

## What is it?

Quicklink is a small JavaScript file that crawls the current site's viewport for anchors with URLs and prefetches the content of the sites at those locations.
It only runs when the browser is idle and when the anchors are within the viewport. It also will not run when the user has a slow connection.

Check out the source code for Quicklink, or the original Chrome extension.

- Website: https://getquick.link/
- GitHub: https://github.com/GoogleChromeLabs/quicklink/
  - The latest release on the repository is [2.1.0][1001] however the latest on UNPKG is [2.2.0][1002].
- They also have a [Chrome extension][1003] which is what this code is based on.
  - The GitHub repository for the chrome extension [used to exist][1004] but was deleted or hidden.
  - I had to extract the source code from the `crx` file to see how they did it.

## Privacy Policy

The original Chrome extension has Google Analytics enabled by default, however this extension for Firefox has all of that code completely removed and will not track you.
Quicklink itself has no tracking and does not make any calls to external sites unless it is prefetching them.

## License

As the original repository for the extension is not available, I have taken the liberty of providing derived code in this repository under the [Creative Commons Zero v1.0 Universal][101] license.

Quicklink itself is licensed under the [Apache License 2.0][102].

[100]: https://addons.mozilla.org/en-US/firefox/addon/quicklink/
[101]: https://github.com/spikespaz/firefox-quicklink/blob/main/LICENSE
[102]: https://github.com/GoogleChromeLabs/quicklink/blob/master/LICENSE
[1001]: https://github.com/GoogleChromeLabs/quicklink/releases/tag/2.1.0
[1002]: https://unpkg.com/quicklink@2.2.0/dist/quicklink.umd.js
[1003]: https://chrome.google.com/webstore/detail/quicklink-chrome-extensio/epmplkdcjhgigmnjmjibilpmekhgkbeg
[1004]: https://github.com/demianrenzulli/quicklink-chrome-extension
  
