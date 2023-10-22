let activeTabId = null;
let tabDetails = {};

// Stores the active tab's time in the tabDetails list 
// when active tab changes
chrome.tabs.onActivated.addListener(activeInfo => {
    activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, currentTab => {
        if (!tabDetails[activeTabId]) {
            tabDetails[activeTabId] = { time: 0, url: currentTab.pendingUrl || currentTab.url, title: currentTab.title };
        }
    });
});

// set activeTabId for each window
chrome.windows.onFocusChanged.addListener(windowId => {
    // If no window is selected, set activeTabId to null
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        activeTabId = null;
    // For all active tabs in current window (just 1 tab), take the
    // first tab from that list and assign it to activeTabId
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            activeTabId = tabs[0].id;
            chrome.tabs.get(activeTabId, currentTab => {
                if (!tabDetails[activeTabId]) {
                    tabDetails[activeTabId] = { time: 0, url: currentTab.pendingUrl || currentTab.url, title: currentTab.title };
                }
            });
        });
    }
});

// Built in function to increments the active tab's time
// in the tabDetails list every second
setInterval(() => {
    if (activeTabId) {
        tabDetails[activeTabId].time++;
    }
}, 1000);

// Define function to be used in our content.js file to send the tabDetails list
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'getTabDetails') {
        sendResponse(tabDetails);
    }
});

