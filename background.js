function filterPhotosphere() {
  const jsl_attrs = ["214", "941"];
  const div_attrs = ["228", "955"];

  var oldCount = 1;
  var count = 0;
  while (oldCount != count) {
    oldCount = count;
    var jsl_tags = document.getElementsByTagName("jsl");
    for (let i = 0; i < jsl_tags.length; i++) {
      // filter jsl tags with attibute: jstcache="214" || "941"
      var jsl = jsl_tags[i];
      if (jsl_attrs.indexOf(jsl.getAttribute("jstcache")) == -1) continue;
  
      // get all div
      var divs = jsl.getElementsByTagName("div");
      for (let j = 0; j < divs.length; j++) {
        //filter div tags with attribute: jstcache="228" || "955"
        var div = divs[j];
        if (div_attrs.indexOf(div.getAttribute("jstcache")) == -1) continue;

        // if tag has style (display:none): delete it, not a 360° view
        if (div.hasAttribute("style")) {
          jsl.remove();
          count++;
          continue;
        }
      }
    }
  }
  console.log(`Cleared ${count} photos!`);
}

chrome.action.onClicked.addListener(
  function(tab) {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        func: filterPhotosphere
      });
  }
);