'use strict';

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

  $('#short-hand-color').ColorPicker({
    color: conf["short-hand"]["color"],
    flat: true,
    onChange: function(hsb, hex, rgb) {
      conf["short-hand"]["color"] = rgb;
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

  $('#dot-color').ColorPicker({
    color: conf["dot"]["color"],
    flat: true,
    onChange: function(hsb, hex, rgb) {
      conf["dot"]["color"] = rgb;
      chrome.storage.local.set({
        "conf": JSON.stringify(conf)
      });
    }
  });

  $("#title-format").val(conf["title"]["format"]);
  $("#title-format").on("change", function(e){
    conf["title"]["format"] = e.target.value;
    chrome.storage.local.set({
      "conf": JSON.stringify(conf)
    });
  });
}

chrome.storage.local.get(null, saveOptions);
