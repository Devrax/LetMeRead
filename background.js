chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url !== "chrome://extensions/") {
    const currentTab =
      tab.url.toLocaleLowerCase().match(/medium/g) ||
      tab.favIconUrl.toLocaleLowerCase().match(/medium/g) || [];

    if (currentTab.length >= 1) {
      await chrome.cookies.remove({ name: "uid", url: tab.url });
      await chrome.tabs.reload();
    } else {
      await chrome.scripting.executeScript({
        files: ["script.js"],
        target: { tabId: tab.id },
      });
    }
  }
});
