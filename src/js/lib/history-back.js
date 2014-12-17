'use strict';
var event = require('./event');
var backButtons = document.querySelectorAll('[data-back]');

function goBack(e) {
  var referrer = document.referrer;
  var pathname = document.location.pathname;

  var hostRegex = [/localhost/, /192.168/, /10.28/, /davidherse/];
  var pathNameRegex = [/\/tag\//];

  var historyBack = false;

  for (var i = 0; i < hostRegex.length; i++) {
    if(hostRegex[i].test(referrer) || historyBack) {
      historyBack = true;
      break;
    }
  }

  for (var j = 0; j < pathNameRegex.length; j++) {
    if(pathNameRegex[j].test(pathname)) {
      historyBack = false;
      break;
    }
  }

  historyBack = (pathname === '/') ? false : historyBack;

  if(historyBack) {
    e.preventDefault();
    window.history.back();
  }
}

for (var i = 0; i < backButtons.length; i++) {
  event(backButtons[i], 'click', goBack);
}
