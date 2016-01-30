'use strict';

function anaclock() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  if ( h > 12 ) h -= 12;
  var rad = 0;
  chrome.storage.local.get("color1", function(items){
    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var scolor = {"r":0, "g":0, "b":0};
    try {
      scolor = JSON.parse(items["color1"]);
    } catch(e) {}
    ctx.strokeStyle = "rgb("+scolor["r"]+","+scolor["g"]+","+scolor["b"]+")";
    // Face
    ctx.beginPath();
    ctx.moveTo(9, 0); ctx.lineTo(9, 2);
    ctx.moveTo(16, 9); ctx.lineTo(18, 9);
    ctx.moveTo(9, 16); ctx.lineTo(9, 18);
    ctx.moveTo(0, 9); ctx.lineTo(2, 9);
    ctx.stroke();

    ctx.translate(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2));

    // Short hand
    rad = 2 * Math.PI / 12 * h + 2 * Math.PI / 12 / 60 * m - Math.PI / 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(6 * Math.cos(rad)), Math.ceil(6 * Math.sin(rad)));
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(2 * Math.cos(rad+Math.PI)), Math.ceil(2 * Math.sin(rad+Math.PI)));
    ctx.stroke();

    // Long hand
    rad = 2 * Math.PI / 60 * m - Math.PI / 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(8 * Math.cos(rad)), Math.ceil(8 * Math.sin(rad)));
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.ceil(2 * Math.cos(rad+Math.PI)), Math.ceil(2 * Math.sin(rad+Math.PI)));
    ctx.stroke();

    ctx.restore();

    chrome.browserAction.setIcon({
      "imageData": ctx.getImageData(0, 0, canvas.width, canvas.height)
    });
  });
}
