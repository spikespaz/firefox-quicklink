/**
 * Runs on extension install. The first time it creates a new local config from config.json. 
 * In subsequent installations, it updates the local config with new values in config.json.
 */
browser.runtime.onInstalled.addListener(function () {
    //TODO: This code should add the new values in config.js to the existing configuration in local storage.
    browser.storage.sync.get(function (result) {
        //The first time the extension is installed, just initialize settings.
        if (JSON.stringify(result) === JSON.stringify({})) {
            initializeSettings();
        } else {
            updateSettings(result);
        }
    });
});
