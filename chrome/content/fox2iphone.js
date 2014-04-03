// Special thanks to Eric Lammerts (lammerts.org) and Adam Menges for their help.

var fox2iphone = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function () {
			gBrowser.addEventListener("load", function () {
				var autoRun = prefManager.getCharPref("extensions.fox2iphone.autorun");
				if (!autoRun) {
					// put alert here, if needed.
				}
			}, false);
		},

		run : function () {
				var req = new XMLHttpRequest();
				req.onreadystatechange = function(){
					if (req.readyState == 1) {
                        var url = encodeURIComponent(window.top.getBrowser().selectedBrowser.contentWindow.location.href);
						var title = window.top.getBrowser().selectedBrowser.contentDocument.title;
						var api = prefManager.getCharPref("extensions.fox2iphone.api");

						var params = 'apikey='+ api +
						     '&application='+ "Fox2iPhone" +
						     '&event='+ escape(title) +
                             '&url='+ url +
                             '&description='+ url;

						req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						req.send(params);
					}
					if (req.readyState == 4) {
						if (req.status != 200) {
							var errmsg = 'Error sending URL to Prowl: ' + req.status;
							if(req.responseXML) {
								var errs = req.responseXML.getElementsByTagName('error');
								if(errs.length) {
									errmsg += ' (' + errs[0].textContent + ')';
								}
							}
							alert(errmsg);
						}
					}
				};
                req.open('POST', 'https://api.prowlapp.com/publicapi/add', true);
		}
	};
}();

Application.getExtensions(function (extensions) {
    if (extensions.get("{9AE27B58-539E-11E3-B116-5F9A6188709B}").firstRun) {
        var toolbar = document.getElementById("nav-bar");
        toolbar.insertItem("fox2iphone-toolbar-button", toolbar.lastChild);
        toolbar.setAttribute("currentset", toolbar.currentSet);
        document.persist(toolbar.id, "currentset");
        toolbar.collapsed = false;

        window.open(
            "chrome://fox2iphone/content/options.xul",
            "fox2iphone-window",
            "chrome,centerscreen");
    }
});

window.addEventListener("load", fox2iphone.init, false);
