/** PAGE INITIALIZATION CODE AND VARIABLES **/

const ignoreUrlPathsInput = document.getElementById('ignore-url-paths');
const ignoreFileExtensionsInput = document.getElementById('ignore-file-extensions');
const ignoreElemAttributesInput = document.getElementById('ignore-element-attributes');
const ignoreUrlProtocolsInput = document.getElementById('ignore-url-protocols');

// When save settings button is clicked, calls saveSettingsToLocalStorage() (defined in helpers.js)
// Passes a showMsg() callback to inform the user settings have been saved.
const saveSettingsBtn = document.getElementById('save-settings-btn');
saveSettingsBtn.onclick = function () {
    saveSettingsToLocalStorage({
        ignoreUrlPaths: parseInputField(ignoreUrlPathsInput.value),
        ignoreFileExtensions: parseInputField(ignoreFileExtensionsInput.value),
        ignoreElemAttributes: parseInputField(ignoreElemAttributesInput.value),
        ignoreUrlProtocols: parseInputField(ignoreUrlProtocolsInput.value)
    }, function () {
        showMsg('Settings saved');
    });
}


// When save settings button is clicked, calls saveSettingsToLocalStorage() (defined in helpers.js).
// Passes a showMsg() callback.
const resetSettingsBtn = document.getElementById('reset-settings-btn');
resetSettingsBtn.onclick = function () {
    initializeSettings(function () {
        resetSettingsForm();
    });
}

// Initialize settings UI controls to its default values.
initializePage();

/** PAGE FUNCTIONS **/

/**
 * Initializes page components and scripts, including the main form, GA, etc.
 */
function initializePage() {
    initializeSettingsForm();
}

/**
 * Initializes user settings UI controls.
 * @param {Object} callback - function to execute when settings are initialized successfully.
 */
function initializeSettingsForm(_) {
    browser.storage.sync.get(function (result, callback) {
        ignoreUrlPathsInput.value = result.ignoreUrlPaths.join(', ');
        ignoreFileExtensionsInput.value = result.ignoreFileExtensions.join(', ');
        ignoreElemAttributesInput.value = result.ignoreElemAttributes.join(', ');
        ignoreUrlProtocolsInput.value = result.ignoreUrlProtocols.join(', ');

        if (callback) {
            callback();
        }
    });
}

/**
 * Called when settings are reset to defaults, to initialize the settings UI controls.
 */
function resetSettingsForm() {
    initializeSettingsForm(showMsg('Settings reset to defaults'));
}

/**
 * Shows a message for successful options operations.
 * @param {Object} msg - The text to show in the toast message.
 */
function showMsg(msg) {
    const optionsMsg = document.getElementsByClassName('options-msg')[0];
    optionsMsg.innerHTML = msg;
    optionsMsg.style.display = 'block';
}
