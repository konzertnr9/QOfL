function dEBCN(elm) {
  return document.getElementsByClassName(elm);
}

function getLocale() {
  const target_segment = dEBCN('smDXjd')[0]; // Get the first target segment, expected to fail on dropbox tasks
  return target_segment ? target_segment.getAttribute('lang') : dEBCN('ZY4IA')[0].getAttribute('title').split('_')[0];
}

function getTaskData() {
  const title_arr = dEBCN('ZY4IA')[0].getAttribute('title').split('_');
  const locale = getLocale();
  if (locale == title_arr[0]) {
    title_arr.shift();
  }
  const product = title_arr.shift();
  const project_id = title_arr.shift();
  const raw_path = title_arr.join('_');
  const task_data = {
    'locale': locale,
    'product': product,
    'project_id': project_id,
    'raw_path': raw_path,
  };
  return task_data;
}

function setLocale(cur_qs, locale) {
  let new_qs = 'hl=' + locale;
  if (cur_qs) {
    let qs_arr = cur_qs.split('&');
    let lang_flg = false;
    let k, v;
    for (let i = 0; i < qs_arr.length; i++) {
      [k, v] = qs_arr[i].split('=');
      if (k == 'hl') {
        qs_arr[i] = 'hl=' + locale;
        lang_flg = true;
      }
    }
    if (!lang_flg) {
      qs_arr.push('hl=' + locale);
    }
    new_qs = qs_arr.join('&');
  }
  return new_qs;
}

function devSitePage() {
  const hosts = {
    'Ad Manager': 'developers.google.com',
    'Android': ['developer.android.com', 'source.android.com'],
    'Apigee': 'docs.apigee.com',
    'Chrome OS': 'developer.chrome.com',
    'Cloud Platform': 'cloud.google.com',
    'Cloud Platform Priority 1': 'cloud.google.com',
    'Cloud Platform Priority 2': 'cloud.google.com',
    'Cloud Platform Priority 3': 'cloud.google.com',
    'Cloud Console': 'cloud.google.com',
    'Cloud Marketing & Sales': 'cloud.google.com',
    'Cloud Technical Marketing': 'cloud.google.com',
    'Cloud-MT Pilot': 'cloud.google.com',
    'DevPlat': ['developers.google.com', 'firebase.google.com'],
    'Firebase': 'firebase.google.com',
    'Google Assistant': 'developers.google.com',
    'Maps': 'developers.google.com',
    'News': 'developers.google.com',
    'Search Console': 'developers.google.com',
    'Tensorflow': 'www.tensorflow.org',
  };
  const task_data = getTaskData();
  const locale = task_data['locale'];
  const product = task_data['product'];
  const project_id = task_data['project_id'];
  let path_arr = task_data['raw_path'].split('/');
  path_arr[0] = path_arr[0].replace('Translatable HTML attributes for ', '');
  path_arr[0] = path_arr[0].replace('Meta tags for ', '');
  const file_name = path_arr[path_arr.length - 1];
  if (!file_name.match('.html') && !file_name.match('.arb')) {
    let prompt = 
        'This does not look like a DevSite project. ' + 
        'Are you sure to proceed?';
    if (!window.confirm(prompt)) {
      return false;
    }
  }
  if (file_name == 'index.html' || 
      file_name.match('.arb') || 
      file_name.match('_index.yaml')) {
    path_arr[path_arr.length - 1] = '';
  } else {
    path_arr[path_arr.length - 1] = file_name.replace('.html', '');
  }
  let url;
  if (Array.isArray(hosts[product])) { // Multiple possible sites
    let url_arr = [];
    for (const host of hosts[product]) {
      // Check project description for target site
      let inst = dEBCN('r99c0e')[0].innerHTML;
      url = 'https://' + host + '/' + path_arr.join('/') + '?hl=' + locale;
      if (inst && inst.match(host)) {
        return window.open(url) ? url : false;
      } else {
        url_arr.push(url);
      }
    }
    let ret_val = [];
    for (const url of url_arr) {
      if (!window.open(url)) {
        return false;
      }
      ret_val.push(url);
    }
    return ret_val.join(',');
  } else {
    if (!hosts[product]) { // Product not found
      alert('Product not supported.');
      return false;
    }
    url = 
        'https://' + hosts[product] + '/' + path_arr.join('/') + 
        '?hl=' + locale;
    return window.open(url) ? url : false;
  }
}

function enPage() {
  const loc = window.location;
  const cur_qs = loc.search.slice(1);
  const new_qs = setLocale(cur_qs, 'en');
  const url = 
      loc.protocol + '//' + loc.host + loc.pathname + 
      '?' + new_qs + (loc.hash ? loc.hash : '');
  return window.open(url) ? url : false;
}

function enPage2() {
  const loc = window.location;
  var path_arr = loc.pathname.split('/');
  if (path_arr[1].match(/^([a-zA-Z]{2})$/)) {
    path_arr[1] = 'en';
  } else {
    path_arr.splice(1, 0, 'en');
  }
  const url = 
      loc.protocol + '//' + loc.host + path_arr.join('/') + 
      (loc.search ? '?' + loc.search : '') + (loc.hash ? loc.hash : '');
  return window.open(url) ? url : false;
}

function projectPage() {
  const task_data = getTaskData();
  const url_arr = window.location.href.split('/');
  const user_prof = url_arr[url_arr.length - 4] == 'u' ? url_arr[url_arr.length - 3] : false; // Support for account switching
  const url = 
      'https://localization.google.com/polyglot' + 
      (user_prof ? '/u/' + user_prof + '/' : '') + // Support for account switching
      '?project_id=' + task_data['project_id'];
  return window.open(url) ? url : false;
}

function helpArticlePage() {
  const sel = window.getSelection().toString();
  const task_data = getTaskData();
  const locale = task_data['locale'];
  const product = task_data['product'];
  let url;
  if (~sel.indexOf('/')) {
    if (sel.indexOf('answer') == -1) {
      let prompt = 
          'This does not look like a link to a Help article. ' + 
          'Are you sure to proceed?';
      if (!window.confirm(prompt)) {
        return false;
      }
    }
    let art = sel;
    let hash;
    let cur_qs;
    if (sel.indexOf('/') > 0) {
      art = '/' + art;
    }
    if (art.indexOf('#') > 0) {
      [art, hash] = art.split('#');
    }
    if (art.indexOf('?') > 0) {
      [art, cur_qs] = art.split('?');
    }
    const new_qs = setLocale(cur_qs, locale);
    url = 'https://support.google.com' + art + '?' + new_qs + (hash ? '#' + hash : '');
    return window.open(url) ? url : false;
  }
  const dirs = {
    'Allo': 'allo',
    'Accessibility Checker': 'pixelphonekb',
    'Ad Grants': 'grants',
    'Ad Manager': 'admanager',
    'AdMob': 'admob',
    'Ads Transparency & Control': 'google-ads',
    'AdSense': 'adsense',
    'AdWords Next': 'google-ads',
    'Analytics': 'analytics',
    'Android': 'android',
    'Attribution': 'analytics',
    'Authorized Buyers': 'authotizedbuyers',
    'Business Profile': 'business',
    'Calendar':  'calendar',
    'Campaign Manager': 'campaignmanager',
    'Chrome': 'chrome',
    'Classroom': 'edu/classroom',
    'Cloud Platform': 'googlecloud',
    'Cloud Platform Priority 1': 'googlecloud',
    'Cloud Platform Priority 2': 'googlecloud',
    'Cloud Platform Priority 3': 'googlecloud',
    'Cloud Console': 'googlecloud',
    'Cloud Marketing & Sales': 'googlecloud',
    'Cloud Technical Marketing': 'googlecloud',
    'Cloud-MT Pilot': 'googlecloud',
    'Data Studio': 'datastudio',
    'Display & Video 360': 'displayvideo',
    'Display Platforms': 'displayspecs',
    'Docs': ['docs', 'drive', 'sites'],
    'Duo': 'duo',
    'GAIA': 'accounts',
    'Gmail': 'mail',
    'Google Assistant': 'assistant',
    'Google Domains': 'domains',
    'Google Fi': 'fi',
    'Google My Business (GMB)': 'business',
    'Google Play': ['googleplay', 'googleplay/android-developer'],
    'Google One': 'googleone',
    'Google Store': 'store',
    'Google Tag Manager': 'tagmanager',
    'Google Workspace': ['a', 'jamboard', 'channelservices'],
    'Groups': 'groups',
    'Hangouts': 'hangouts',
    'Hangouts Chat': 'chat',
    'Hangouts Meet': 'meet',
    'Magnolia': 'fundingchoices',
    'Maps': 'maps',
    'Nest': 'googlenest',
    'Optimize': 'optimize',
    'Payments': ['pay', 'paymentscenter'],
    'Photos': 'photos',
    'Product Search': 'merchants',
    'Rich Media': 'richmedia',
    'Search (GWS)': 'websearch',
    'Search Ads 360': 'searchads',
    'Search Console': 'webmasters',
    'Shopping Merchant': ['merchants', 'manufacturers'],
    'Shopping Merchants and Brands': 'merchants',
    'Unicorn': 'families',
    'WiFi': 'wifi',
    'YouTube': 'youtube',
    'YouTube Creator': 'youtube',
    'YouTube Kids': 'youtubekids',
    'YouTube MT Pilot': 'youtube',
  };
  if (Array.isArray(dirs[product])) { // Multiple possible directories
    let ret_val = [];
    for (const dir of dirs[product]) {
      url = 
          'https://support.google.com/' + dir + '/answer/' + sel + 
          '?hl=' + locale;
      if (!window.open(url)) {
        return false;
      }
      ret_val.push(url);
    }
    return ret_val.join(',');
  } else {
    if (!dirs[product]) { // Product not found
      alert('Product not supported.');
      return false;
    }
    url = 
        'https://support.google.com/' + dirs[product] + '/answer/' + sel + 
        '?hl=' + locale;
    return window.open(url) ? url : false;
  }
}

function lqePage() {
  const url_arr = window.location.href.split('/');
  const task_id = url_arr[url_arr.length - 1];
  const user_prof = url_arr[url_arr.length - 4] == 'u' ? url_arr[url_arr.length - 3] : false; // Support for account switching
  const url = 
      'https://localization.google.com/polyglot/' + 
      (user_prof ? 'u/' + user_prof + '/' : '') + // Support for account switching
      'lqe/arbitration/' + task_id;
  return window.open(url) ? url : false;
}

function taskPage() {
  const url_arr = window.location.href.split('/');
  const task_id = url_arr[url_arr.length - 1];
  const user_prof = url_arr[url_arr.length - 5] == 'u' ? url_arr[url_arr.length - 4] : false; // Support for account switching
  const url = 
      'https://localization.google.com/polyglot/' + 
      (user_prof ? 'u/' + user_prof + '/' : '') + // Support for account switching
      'tasks/' + task_id;
  return window.open(url) ? url : false;
}

function qmPage() {
  const task_data = getTaskData();
  const url = 'https://gloc-qm.appspot.com/?show_all=yes&search=' + task_data['project_id'];
  return window.open(url) ? url : false;
}

function qmPage2() {
  const task_data = getTaskData();
  const url = 'https://localization.google.com/query?pid=' + task_data['project_id'];
  return window.open(url) ? url : false;
}


function qmSearch() {
  const url = 
      'https://gloc-qm.appspot.com/?show_all=yes&search=' + 
      encodeURIComponent(window.getSelection().toString());
  return window.open(url) ? url : false;
}

function qmSearch2() {
  const url = 
      'https://localization.google.com/query?text=' + 
      encodeURIComponent(window.getSelection().toString());
  return window.open(url) ? url : false;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.message) {
    case 'openProjectPage':
      sendResponse(projectPage());
      break;
    case 'openEnPage':
      sendResponse(enPage());
      break;
    case 'openEnPage2':
      sendResponse(enPage2());
      break;
    case 'openDevSitePage':
      sendResponse(devSitePage());
      break;
    case 'openHelpArticlePage':
      sendResponse(helpArticlePage());
      break;
    case 'openLqePage':
      sendResponse(lqePage());
      break;
    case 'openTaskPage':
      sendResponse(taskPage());
      break;
    case 'openQMPage':
      sendResponse(qmPage());
      break;
    case 'openQMPage2':
      sendResponse(qmPage2());
      break;
    case 'searchInQm':
      sendResponse(qmSearch());
      break;
    case 'searchInQm2':
      sendResponse(qmSearch2());
      break;
  }
});