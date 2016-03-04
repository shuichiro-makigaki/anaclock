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

function drawClock(items) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var rad = 0;

  var str_mon = d.getMonth() + 1;
  var str_d = d.getDate();
  var str_h = h;
  var str_m = m;
  if (str_mon < 10) str_mon = "0" + str_mon;
  if (str_d < 10) str_d = "0" + str_d;
  if (h < 10) str_h = "0" + h;
  if (m < 10) str_m = "0" + m;
  browser.browserAction.setTitle({
    title: d.getFullYear() + "-" + str_mon + "-" + str_d + " " + str_h + ":" + str_m
  });

  if (h > 12) h -= 12;

  if (!(typeof items["conf"] === "undefined")) {
    try {
      conf = JSON.parse(items["conf"]);
    } catch (e) {}
  }
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "rgb(" + conf["background"]["color"]["r"] + "," + conf["background"]["color"]["g"] + "," + conf["background"]["color"]["b"] + ")";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, false);
  ctx.fill();

  // Face
  ctx.strokeStyle = "rgb(" + conf["hand"]["color"]["r"] + "," + conf["hand"]["color"]["g"] + "," + conf["hand"]["color"]["b"] + ")";
  ctx.beginPath();
  ctx.moveTo(9, 0);
  ctx.lineTo(9, 1);
  ctx.moveTo(17, 9);
  ctx.lineTo(18, 9);
  ctx.moveTo(9, 17);
  ctx.lineTo(9, 18);
  ctx.moveTo(0, 9);
  ctx.lineTo(1, 9);
  ctx.stroke();

  ctx.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));

  // Short hand
  rad = 2 * Math.PI / 12 * h + 2 * Math.PI / 12 / 60 * m - Math.PI / 2;
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(6 * Math.cos(rad)), Math.ceil(6 * Math.sin(rad)));
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
  ctx.stroke();

  // Long hand
  rad = 2 * Math.PI / 60 * m - Math.PI / 2;
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(8 * Math.cos(rad)), Math.ceil(8 * Math.sin(rad)));
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
  ctx.stroke();

  ctx.restore();

  chrome.browserAction.setIcon({
    imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
  });
}


function saveOptions(items) {
  if (!(typeof items["conf"] === "undefined")) {
    try {
      conf = JSON.parse(items["conf"]);
    } catch (e) {}
  }

  $('#hand-color').ColorPicker({
    color: conf["hand"]["color"],
    flat: true,
    onChange: function(hsb, hex, rgb) {
      conf["hand"]["color"] = rgb;
      chrome.storage.local.set({
        "conf": JSON.stringify(conf)
      });
    }
  });

  $('#bg-color').ColorPicker({
    color: conf["background"]["color"],
    flat: true,
    onChange: function(hsb, hex, rgb) {
      conf["background"]["color"] = rgb;
      chrome.storage.local.set({
        "conf": JSON.stringify(conf)
      });
    }
  });
}

function anaclock() {
  chrome.storage.local.get(null, drawClock);
}

function options() {
  chrome.storage.local.get(null, saveOptions);
}
