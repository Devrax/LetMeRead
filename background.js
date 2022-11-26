chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url !== "chrome://extensions/") {
    const currentTab =
      tab.url.toLocaleLowerCase().match(/medium/g) ||
      tab.favIconUrl.toLocaleLowerCase().match(/medium/g);

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

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await chrome.action.setBadgeText({
    text: "",
  });

  const currentTab = await chrome.tabs.get(activeInfo.tabId);
  if (currentTab == null) return;

  const pages =
    currentTab.url.match(/(scribd|studocu|medium)/g) ||
    currentTab.favIconUrl.toLocaleLowerCase().match(/medium/g);
  if (pages == null) return;

  if (pages.length === 1) {
    await chrome.action.setBadgeText({
      text: pages.length === 1 ? "can" : "",
    });
    await chrome.action.setBadgeBackgroundColor({
      color: "#00FF00",
    });
  }
});
