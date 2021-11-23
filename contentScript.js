function dEBCN(elm) {
  return document.getElementsByClassName(elm);
}

function devSitePage() {
  const hosts = {
    'Android': ['developer.android.com', 'source.android.com'],
    'Apigee': 'docs.apigee.com',
    'Cloud Platform': 'cloud.google.com',
    'Cloud Platform Priority 1': 'cloud.google.com',
    'Cloud Platform Priority 2': 'cloud.google.com',
    'Cloud Platform Priority 3': 'cloud.google.com',
    'Cloud Console': 'cloud.google.com',
    'Cloud Marketing & Sales': 'cloud.google.com',
    'Cloud Technical Marketing': 'cloud.google.com',
    'Cloud-MT Pilot': 'cloud.google.com',
    'Firebase': 'firebase.google.com',
    'Maps': 'developers.google.com',
    'Search Console': 'developers.google.com',
    'Tensorflow': 'www.tensorflow.org',
  };
  const title_arr = dEBCN('ZY4IA')[0].getAttribute('title').split('_');
  const locale = title_arr.shift();
  const product = title_arr.shift();
  const project_id = title_arr.shift();
  const raw_path = title_arr.join('_');
  let path_arr = raw_path.split('/');
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
  let new_qs = 'hl=en';
  if (cur_qs) {
    let qs_arr = cur_qs.split('&');
    let lang_flg = false;
    let k, v;
    for (let i = 0; i < qs_arr.length; i++) {
      [k, v] = qs_arr[i].split('=');
      if (k == 'hl') {
        qs_arr[i] = 'hl=en';
        lang_flg = true;
      }
    }
    if (!lang_flg) {
      qs_arr.push('hl=en');
    }
    new_qs = qs_arr.join('&');
  }
  const url = 
      loc.protocol + '//' + loc.host + loc.pathname + 
      '?' + new_qs + (loc.hash ? loc.hash : '');
  return window.open(url) ? url : false;
}

function projectPage() {
  const title_arr = dEBCN('ZY4IA')[0].getAttribute('title').split('_');
  let project_id = title_arr[2];
  if (title_arr[1].match(/n[0-9]+/)) {
    project_id = dEBCN('ZY4IA')[0].getAttribute('title').split('_')[1];
  }
  const url = 
      'https://localization.google.com/polyglot?project_id=' + project_id;
  return window.open(url) ? url : false;
}

function helpArticlePage() {
  const sel = window.getSelection().toString();
  let locale, product, project_id, raw_path;
  [locale, product, project_id, raw_path] = 
      dEBCN('ZY4IA')[0].getAttribute('title').split('_');
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
    if (sel.indexOf('/') > 0) {
      art = '/' + art;
    }
    url = 'https://support.google.com' + art + '?hl=' + locale;
    return window.open(url) ? url : false;
  }
  const dirs = {
    'Allo': 'allo',
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
    'Shopping Merchants and Brands': 'merchants',
    'Unicorn': 'families',
    'WiFi': 'wifi',
    'YouTube': 'youtube',
    'YouTube Creator': 'youtube',
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
  const url = 
      'https://localization.google.com/polyglot/lqe/arbitration/' + 
      url_arr[url_arr.length - 1];
  return window.open(url) ? url : false;
}

function qmPage() {
  const project_id = dEBCN('ZY4IA')[0].getAttribute('title').split('_')[2];
  const url = 'https://gloc-qm.appspot.com/?show_all=yes&search=' + project_id;
  return window.open(url) ? url : false;
}

function qmSearch() {
  const url = 
      'https://gloc-qm.appspot.com/?show_all=yes&search=' + 
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
    case 'openDevSitePage':
      sendResponse(devSitePage());
      break;
    case 'openHelpArticlePage':
      sendResponse(helpArticlePage());
      break;
    case 'openLqePage':
      sendResponse(lqePage());
      break;
    case 'openQMPage':
      sendResponse(qmPage());
      break;
    case 'searchInQm':
      sendResponse(qmSearch());
      break;
  }
});