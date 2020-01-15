chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  // onMessage must return "true" if response is async.
  const isResponseAsync = false;

  if (request.type === 'openImage') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length && tabs[0].id) {
        chrome.tabs.update(tabs[0].id, { url: request.src });
      }
    });
  }

  return isResponseAsync;
});
