
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    files: ["script.js"],
    target: { tabId: tab.id },
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await chrome.action.setBadgeText({
        text: "",
      });
  const currentTab = await chrome.tabs.get(activeInfo.tabId);

  const pages = currentTab.url.match(/(scribd|studocu)/g);
  if(pages.length === 1) {
      await chrome.action.setBadgeText({
          text: pages.length === 1 ? "can" : "",
        });
        await chrome.action.setBadgeBackgroundColor({
            color: '#00FF00'
        })
    }
});
