!function e(t,r,n){function o(c,u){if(!r[c]){if(!t[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(i)return i(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var l=r[c]={exports:{}};t[c][0].call(l.exports,function(e){var r=t[c][1][e];return o(r?r:e)},l,l.exports,e,t,r,n)}return r[c].exports}for(var i="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}({1:[function(e){"use strict";e("./lib/history-back")},{"./lib/history-back":3}],2:[function(e,t){"use strict";function r(e){return function(t){return t=t||window.event,t.preventDefault||(t.preventDefault=n),e(t)}}function n(){this.returnValue=!1}var o=document.addEventListener?"addEventListener":"attachEvent",i={click:document.addEventListener?"click":"onclick"};t.exports=function(e,t,n){e[o](i[t],r(n),!1)}},{}],3:[function(e){"use strict";function t(e){for(var t=document.referrer,r=document.location.pathname,n=[/localhost/,/192.168/,/10.28/,/davidherse/],o=[/\//,/\/tag\//],i=!1,c=0;c<n.length;c++)if(n[c].test(t)){i=!0;break}for(var u=0;u<o.length;u++)if(o[u].test(r)){i=!1;break}console.log(i,t,r),i&&e.preventDefault()}for(var r=e("./event"),n=document.querySelectorAll("[data-back]"),o=0;o<n.length;o++)r(n[o],"click",t)},{"./event":2}]},{},[1]);