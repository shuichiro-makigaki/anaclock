'use strict';

chrome.storage.local.set({
  "status": "running"
});

var conf = {
  "hand": {
    "color": {
      "r": 0,
      "g": 0,
      "b": 0
    }
  },
  "background": {
    "shape": "square",
    "color": {
      "r": 254,
      "g": 254,
      "b": 254
    }
  }
};
