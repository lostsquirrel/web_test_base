 /* Copyright 2011 Google Inc. All Rights Reserved. */(function() {
    var b = 0, c = null, d = null, e = null, g = null, h = null, k = null, l = function(a) {
        a.target = "_blank";
        a.addEventListener("click", function() {
            window.close()
        }, !1)
    }, p = function() {
        var a;
        if (a = d.value.replace(/^\s+|\s+$/g, ""))
            e.innerHTML = "Searching...", e.style.display = "block", g.style.display = "none", h.style.display = "none", k.style.display = "none", c.disabled = !0, b++, chrome.extension.sendMessage({type: "fetch_html",eventKey: b,query: a}, m)
    }, m = function(a) {
        if (a.eventKey == b) {
            if (a.html) {
                k.innerHTML = a.html;
                var n = k.getElementsByTagName("span");
                a = 0;
                for (var f; f = n[a]; a++)
                    "dct-lnk" != f.className && "dct-rlnk" != f.className || f.addEventListener("click", function() {
                        d.value = this.title ? this.title : this.innerHTML;
                        p()
                    }, !1);
                n = k.getElementsByTagName("a");
                for (a = 0; f = n[a]; a++)
                    l(f);
                e.style.display = "none";
                k.style.display = "block"
            } else
                e.innerHTML = "No definition found.", e.style.display = "block", g.href = "http://www.google.com/search?q=" + a.sanitizedQuery, g.innerHTML = 'Search the web for "' + a.sanitizedQuery + '" \u00bb', g.style.display = "block";
            c.disabled = !1
        }
    }, c = document.getElementById("button"), 
    d = document.getElementById("query-field");
    d.focus();
    e = document.getElementById("lookup-status");
    g = document.getElementById("web-search-link");
    l(g);
    h = document.getElementById("usage-tip");
    k = document.getElementById("meaning");
    l(document.getElementById("options-link"));
    c.addEventListener("click", p, !1);
    d.addEventListener("keydown", function(a) {
        13 == a.keyCode && p()
    }, !1);
    h.innerHTML = "Tip: Select text on any webpage, then click the Google Dictionary button to view the definition of your selection.";
    h.style.display = "block";
    chrome.tabs.getSelected(null, function(a) {
        chrome.tabs.sendMessage(a.id, {type: "get_selection"}, function(a) {
            a.selection && (d.value = a.selection, p())
        })
    });
})();
