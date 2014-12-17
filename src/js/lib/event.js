'use strict';

var addEventListener = document.addEventListener ? 'addEventListener' : 'attachEvent';
var events = {
  click: (document.addEventListener ? 'click' : 'onclick')
}

function callbackWrap(callback) {
  return function(event) {
    event = event || window.event;
    if(!event.preventDefault) {
      event.preventDefault = preventDefault;
    }

    return callback(event);
  }
}

function preventDefault() {
  this.returnValue = false;
}

module.exports = function(node, event, callback) {
  node[addEventListener](events[event], callbackWrap(callback), false);
}
