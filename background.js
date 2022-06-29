chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'Project',
    title: 'Open Polyglot project',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'LQE',
    title: 'Open LQE report',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'Task',
    title: 'Open Polyglot task',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/lqe/arbitration/*', 'https://localization.google.com/polyglot/u/*/lqe/arbitration/*'],
  });
  chrome.contextMenus.create({
    id: 'devSite',
    title: 'Open DevSite page',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'help',
    title: 'Open Help article',
    contexts: ['selection'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'QM',
    title: 'Open QMv1 queries',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'QM2',
    title: 'Open QMv2 queries',
    contexts: ['page'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'QMSearch',
    title: 'Search in QMv1',
    contexts: ['selection'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'QMSearch2',
    title: 'Search in QMv2',
    contexts: ['selection'],
    documentUrlPatterns: ['https://localization.google.com/polyglot/tasks/*', 'https://localization.google.com/polyglot/u/*/tasks/*'],
  });
  chrome.contextMenus.create({
    id: 'en',
    title: 'Open EN page',
    contexts: ['page'],
    documentUrlPatterns: ['*://*.google.com/*', '*://*.android.com/*', '*://*.tensorflow.org/*', '*://*.apigee.com/*'],
  });
  chrome.contextMenus.create({
    id: 'en2',
    title: 'Open EN page',
    contexts: ['page'],
    documentUrlPatterns: ['*://*.chrome.com/*'],
  });
});
chrome.contextMenus.onClicked.addListener((itemData) => {
  switch (itemData.menuItemId) {
    case 'Project':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openProjectPage'},
            (res) => {
          console.log(res);
        });
      });
      break;
    case 'LQE':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openLqePage'}, 
            (res) => {
          console.log(res);
        });
      });
      break;
    case 'Task':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openTaskPage'}, 
            (res) => {
          console.log(res);
        });
      });
      break;
    case 'devSite':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openDevSitePage'}, 
            (res) => {
          console.log(res);
        });
      });
      break;
    case 'help':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openHelpArticlePage'}, 
            (res) => {
          console.log(res);
        });
      });
      break;
    case 'QM':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openQMPage'}, (res) => {
          console.log(res);
        });
      });
      break;
    case 'QM2':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openQMPage2'}, (res) => {
          console.log(res);
        });
      });
      break;
    case 'QMSearch':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'searchInQm'}, (res) => {
          console.log(res);
        });
      });
      break;
    case 'QMSearch2':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'searchInQm2'}, (res) => {
          console.log(res);
        });
      });
      break;
    case 'en':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openEnPage'}, (res) => {
          console.log(res);
        });
      });
      break;
    case 'en2':
      chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'openEnPage2'}, (res) => {
          console.log(res);
        });
      });
      break;
  }
});
