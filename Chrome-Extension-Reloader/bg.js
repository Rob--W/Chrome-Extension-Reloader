/**
 * @author Rob W <gwnRob@gmail.com>
 * @license Creative Commons 3 with attribution (http://creativecommons.org/licenses/by-sa/3.0/)
 */
function reloadExtension(id) {
    if (id) {
        chrome.management.setEnabled(id, false, function() {
            chrome.management.setEnabled(id, true);
        });
    } else {
        if (confirm("No extension selected! Want to choose one?")) {
            window.open(chrome.extension.getURL('/options.html'));
        }
    }
}
chrome.browserAction.onClicked.addListener(function(tab) {
    reloadExtension(localStorage.getItem('id'));
});
var id = localStorage.getItem('id');
if (typeof id == "string" && id.length >= "32") {
    chrome.management.get(id, function(result) {
        chrome.browserAction.setTitle({title:"Reload extension:\n" + result.name + "  " + result.version});
    });
}