var prowlingFireFox = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function () {
			gBrowser.addEventListener("load", function () {
				var autoRun = prefManager.getCharPref("extensions.prowlingfirefox.autorun");
				if (!autoRun) {
					//put alert here
				}
			}, false);
		},
			
		run : function () {
			        var req = new XMLHttpRequest();

			        req.onreadystatechange = function(){
			                if (req.readyState == 4) {
			                        if (req.status == 200) {
			                        }
			                }
			        };
			
					var url = window.top.getBrowser().selectedBrowser.contentWindow.location.href; //Fix '+' bug
					var api = prefManager.getCharPref("extensions.prowlingfirefox.api");

			        var params = 'apikey='+ api +
			                     '&application='+ "Send2Prowl" +
			                     '&event='+ "" +
			                     '&url='+ url + 
			                     '&description='+ url;

			        req.open('POST', 'https://prowlapp.com/publicapi/add/?' + params, true);
			        req.send(null);
		}
	};
}();
window.addEventListener("load", prowlingfirefox.init, false);
