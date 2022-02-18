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

/**
 * Reads configuration from config.json and saves it to local storage.
 * @param {Object} callback - function to execute when settings are saved successfully
 */
function initializeSettings(callback) {
    browser.storage.sync.clear(function () {
        const url = browser.runtime.getURL('data/config.json');

        fetch(url)
            .then((response) => response.json())
            .then((jsonConifg) => saveSettingsToLocalStorage(jsonConifg, callback));
    });
}

/**
 * Reads configuration from config.json and updates local storage with the new values.
 * @param {Object} localStorageJsonConfig - current settings in local storage
 */
function updateSettings(localStorageJsonConfig) {
    const url = browser.runtime.getURL('data/config.json');

    fetch(url)
        .then((response) => response.json())
        .then((fileJsonConfig) => updateSettingsInLocalStorage(localStorageJsonConfig, fileJsonConfig));

}

/**
 * Saves json configuration to local storage.
 * @param {Object} jsonConfig - a JSON configuration object
 * @param {Object} callback - function to execute if settings are saved successfully
 */
function saveSettingsToLocalStorage(jsonConifg, callback) {
    browser.storage.sync.set(jsonConifg, callback);
}

/**
 * Adds new config values (if any) to the existing configuration in local storage.
 * @param {Object} localStorageJsonConfig - current settings in local storage
 * @param {Object} fileJsonConfig - configuration in config.json
 */
function updateSettingsInLocalStorage(localStorageJsonConfig, fileJsonConfig) {
    localStorageJsonConfig.ignoreUrlPaths = getUpdatedField(localStorageJsonConfig.ignoreUrlPaths, fileJsonConfig.ignoreUrlPaths);
    localStorageJsonConfig.ignoreFileExtensions = getUpdatedField(localStorageJsonConfig.ignoreFileExtensions, fileJsonConfig.ignoreFileExtensions);
    localStorageJsonConfig.ignoreElemAttributes = getUpdatedField(localStorageJsonConfig.ignoreElemAttributes, fileJsonConfig.ignoreElemAttributes);
    localStorageJsonConfig.ignoreUrlProtocols = getUpdatedField(localStorageJsonConfig.ignoreUrlProtocols, fileJsonConfig.ignoreUrlProtocols);

    browser.storage.sync.clear(function () {
        browser.storage.sync.set(localStorageJsonConfig);
    });
}

/**
 * Adds the new values in config.json to the existing configuration in local storage.
 * @param {Object} localStorageField - current array for a given field in local storage
 * @param {Object} fileField - array for a given field in config.json
 */
function getUpdatedField(localStorageField, fileField) {
    let mergedArraysForField = localStorageField.concat(fileField);

    for (var i = 0; i < mergedArraysForField.length; ++i) {
        for (var j = i + 1; j < mergedArraysForField.length; ++j) {
            if (mergedArraysForField[i] === mergedArraysForField[j])
                mergedArraysForField.splice(j--, 1);
        }
    }

    return mergedArraysForField;
}

/**
 * Parses the input field into an array of strings, without spaces and wihtout emtpy elements.
 * @param {Object} field - The string obtained for teh field in the input form.
 */
function parseInputField(field) {
    //remove whitespaces and transform comma separated string into array
    let parsedField = field.replace(/ /g, '').split(',');

    //remove empty elements
    return parsedField.filter(function (el) {
        return el != null && el != '';
    });
}
