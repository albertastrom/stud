const init = function()
{
    // Create a container for the shadow root
    const shadowHost = document.createElement('div');
    shadowHost.style.position = 'fixed';
    shadowHost.style.bottom = '25px';
    shadowHost.style.left = '10px';
    document.body.appendChild(shadowHost);

    // Attach the shadow root to the container
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    // Create main slide box container
    const slideBox = document.createElement('div');
    slideBox.className = 'slide-box';

    // Create the toggle button
    const toggleButton = document.createElement('div');
    toggleButton.className = 'toggle-button';

    // Set the default state as closed
    slideBox.classList.add('closed');
    toggleButton.innerText = '>';

    // Check stored state and initialize accordingly
    chrome.storage.local.get('slideBoxState', function(data) {
        if (data.slideBoxState !== 'closed') {
            slideBox.classList.remove('closed');
            toggleButton.innerText = '<';
        }
    });

    // Listen to button clicks to update stored state
    const toggleSlideBox = () => {
        if (slideBox.classList.contains('closed')) {
            slideBox.classList.remove('closed');
            toggleButton.innerText = '<';
            chrome.storage.local.set({slideBoxState: 'open'});
        } else {
            slideBox.classList.add('closed');
            toggleButton.innerText = '>';
            chrome.storage.local.set({slideBoxState: 'closed'});
        }
    };

    toggleButton.addEventListener('click', toggleSlideBox);
    slideBox.appendChild(toggleButton);

    // Create the content div
    const content = document.createElement('div');
    content.className = 'content';
    const title = document.createElement('div');
    title.className = 'timer';

    // Fetching the time from storage and updating the timer accordingly
    const fetchAndUpdateTimer = () => {
        chrome.storage.local.get(['hours', 'minutes', 'seconds'], function(data) {
            if (data.hours === undefined) {
                // If it's the first time, set timer to 1 hour
                chrome.storage.local.set({hours: 1, minutes: 0, seconds: 0});
                title.innerText = "01:00:00";
            } else {
                // If not the first time, set the timer based on storage values
                const formattedTime = `${data.hours.toString().padStart(2, '0')}:${data.minutes.toString().padStart(2, '0')}:${data.seconds.toString().padStart(2, '0')}`;
                title.innerText = formattedTime;
            }
        });
    }

    setInterval(() => {
        chrome.storage.local.get(['hours', 'minutes', 'seconds'], function(data) {
            data.seconds++;
            if (data.seconds >= 60) {
                data.seconds = 0;
                data.minutes++;
                if (data.minutes >= 60) {
                    data.minutes = 0;
                    data.hours++;
                }
            }

            // Update storage with the new time values
            chrome.storage.local.set({hours: data.hours, minutes: data.minutes, seconds: data.seconds});

            const formattedTime = `${data.hours.toString().padStart(2, '0')}:${data.minutes.toString().padStart(2, '0')}:${data.seconds.toString().padStart(2, '0')}`;
            title.innerText = formattedTime;
        });
    }, 1000);

    // Call this function when initializing your extension's content script in each tab
    fetchAndUpdateTimer();


    content.appendChild(title);
    slideBox.appendChild(content);

    // Append the main slide box to the shadow root
    shadowRoot.appendChild(slideBox);         


    fetch(chrome.runtime.getURL('src/slidebox.css'))
    .then(response => response.text())
    .then(cssText => {
        const style = document.createElement('style');
        style.innerHTML = cssText;
        shadowRoot.appendChild(style);
    });

};
init();

