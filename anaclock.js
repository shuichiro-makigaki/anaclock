'use strict';

function drawClock(items) {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  let rad = 0;

  if (h > 12) h -= 12;

  if (!(typeof items["conf"] === "undefined")) {
    try {
      conf = JSON.parse(items["conf"]);
    } catch (e) {}
  }

  browser.browserAction.setTitle({
    title: moment().format(conf["title"]["format"])
  });

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "rgb(" + conf["background"]["color"]["r"] + "," + conf["background"]["color"]["g"] + "," + conf["background"]["color"]["b"] + ")";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, false);
  ctx.fill();

  // Face
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(" + conf["dot"]["color"]["r"] + "," + conf["dot"]["color"]["g"] + "," + conf["dot"]["color"]["b"] + ")";
  ctx.beginPath();
  ctx.moveTo(9, 0);
  ctx.lineTo(9, 2);
  ctx.moveTo(16, 9);
  ctx.lineTo(18, 9);
  ctx.moveTo(9, 16);
  ctx.lineTo(9, 18);
  ctx.moveTo(0, 9);
  ctx.lineTo(2, 9);
  ctx.stroke();

  ctx.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));

  // Long hand
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(" + conf["hand"]["color"]["r"] + "," + conf["hand"]["color"]["g"] + "," + conf["hand"]["color"]["b"] + ")";
  rad = 2 * Math.PI / 60 * m - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(9 * Math.cos(rad)), Math.ceil(9 * Math.sin(rad)));
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
  ctx.stroke();

  // Short hand
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(" + conf["short-hand"]["color"]["r"] + "," + conf["short-hand"]["color"]["g"] + "," + conf["short-hand"]["color"]["b"] + ")";
  rad = 2 * Math.PI / 12 * h + 2 * Math.PI / 12 / 60 * m - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(7 * Math.cos(rad)), Math.ceil(7 * Math.sin(rad)));
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.ceil(2 * Math.cos(rad + Math.PI)), Math.ceil(2 * Math.sin(rad + Math.PI)));
  ctx.stroke();

  ctx.restore();

  chrome.browserAction.setIcon({
    imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
  });
}

function anaclock() {
  chrome.storage.local.get(null, drawClock);
}

anaclock();
setInterval(function() {
  anaclock()
}, 1000);
