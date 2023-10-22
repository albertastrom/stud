let activeTabId = null;
let tabDetails = {};
let inSession = "false";

// When tab is opened and in session is false, request status from api
// Define your API endpoint and request data
const apiURL = 'http://localhost:8000/api';

let apiKey;
function getKey()
{
  chrome.storage.sync.get(["apiKey"], function(data){
    apiKey = data.apiKey;

    // move the dependent code inside the callback
    if (apiKey == undefined)
    {
        console.warn("Please enter an API key in the options menu");
    }
    console.log(apiURL, apiKey);
  });
}

// Call the function to initialize the apiKey
getKey();



chrome.tabs.onCreated.addListener(function(tab) {
    // Code to run when a new tab is opened
    // console.log("Started");
    // if (inSession === "false")
    // {
    //     inSession = "true";
    // }
    // requestStatusFromAPI(apiKey);

    // You can replace this with your own logic or function
});

let endTime = new Date(); // Thi should be created from the api endpoint response in the requestStatusFromAPI function !!!
endTime.setSeconds(endTime.getSeconds() + 15);
let currentTime = new Date();

console.log(currentTime, endTime);




// Create the fetch request

function requestStatusFromAPI(apiKey) {

    const requestData = {
        apiKey: apiKey,
        data_request: 'status'
      };

    fetch(apiURL, {
    method: 'POST', // You can use 'GET' if your API accepts GET requests
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        // if data is in session, set inSession to true

        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
    });
}



// Stores the active tab's time in the tabDetails list 
// when active tab changes
chrome.tabs.onActivated.addListener(activeInfo => {
    activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, currentTab => {
        if (!tabDetails[activeTabId]) {
            tabDetails[activeTabId] = { 
                time: 0, 
                url: currentTab.pendingUrl || currentTab.url, 
                title: currentTab.title, 
                approved: true 
            };
        }
    });
});

// set activeTabId for each window
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        activeTabId = null;
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            activeTabId = tabs[0].id;
            chrome.tabs.get(activeTabId, currentTab => {
                if (!tabDetails[activeTabId]) {
                    tabDetails[activeTabId] = { 
                        time: 0, 
                        url: currentTab.pendingUrl || currentTab.url, 
                        title: currentTab.title, 
                        approved: true 
                    };
                }
            });
        });
    }
});

// Built in function to increments the active tab's time
// in the tabDetails list every second
setInterval(() => {
    
    if (inSession !== "false")
    {
        console.log(tabDetails);
        currentTime = new Date();
        console.log(endTime.getTime() - currentTime.getTime());
    }
    
    if (activeTabId && inSession === "true") {
        tabDetails[activeTabId].time++;
    }
    if (currentTime.getTime() >= endTime.getTime())
    {
        inSession = "false";
    }
    if (inSession === "ended")
    {
        // This is where we would send the tabDetails list to the server
        // and reset the tabDetails list
        // set inSession to false
        sendRequestToAPI(requestData)
        .then(responseData => {
            // Handle the response data
            console.log(responseData);
        })
        .catch(error => {
            // Handle any errors
            console.error("Error:", error);
        });
        tabDetails = {};
        inSession = "false";
    }
}, 1000);



async function sendDataToAPI(apiKey, items) {
    // Create the JSON request object
    const requestData = {
      apiKey: apiKey,
      data_request: "add_data",
      links: items
    };
  
    // Convert the request data to a JSON string
    const jsonData = JSON.stringify(requestData);
  
    // Send the JSON request to the API
    try {
        const response = await fetch(apiURL, {
            method: "POST", // Use the appropriate HTTP method (e.g., POST, GET, PUT) as needed
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occurred during the fetch
        throw error;
    }
  }
  
 
  







// Define function to be used in our content.js file to send the tabDetails list
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.cmd === 'getTabDetails') {
//         sendResponse(tabDetails);
//     }
// });



// Once the script starts running (start condition will be when a tab is opened), we are checking if the user is in the session from hitting the api endpoint, perhaps after something is clicked in the popup...
// Then we set the inSession variable to true, and start our timer that counts town an integer every second based on the "end time" that we get from the api endpoint and our current time. Once the timer hits 0, we check with the api to see if user is on break, or still in session and update the timer accordingly. If the user is on break, we set the timer for the break end time and wait for the timer to hit 0 again. If the user is still in session, we set the timer for the session end time and wait for the timer to hit 0 again. If the user is not in session, we stop the timer and