/*
* 
* Cross Domain Data JQuery Plugin
* 
* by Boris Kuzmic
*
* version 0.1
* 
*/
(function($){

	$.getRemoteData = function(callback, url) {
		var _cb; 				// holds postMessage callback
		var frm;				// jquery iframe object
		var loaded = false; 	// iframe loading indicator, for window.name transport only
	
		frm = $('<iframe name="_rmfrm" id="_rmfrm" style="display:none;" scrolling="no" frameborder="0"></iframe>');		
		$(document.body).append(frm);
		frm.attr('src', url);

		// use window.postMessage if available for message transport
		if (window.postMessage) {
			if (callback) {
				_cb = null;
				
				_cb = function(e) {
					// cleanup						
					$(window).unbind('message',_cb);					
					frm.remove();
					callback(e.originalEvent.data);
				};
				
				$(window).bind('message',_cb);						
			}			
		} else {
			// fall back to window.name transport
			frm.load(function() {
				if (loaded) {
					if (!$.browser.msie) {
						retrieveData();
					}
				} else {
					loaded = true;
					frm.get(0).contentWindow.location = "about:blank";
				}
			});
		
			if ($.browser.msie) {
				frm.get(0).onreadystatechange = function() {
					if (loaded) {
						retrieveData();
					}
				};
			}
		}
		
		function retrieveData() {
			try {
				var data = frm.get(0).contentWindow.name || null;
				if (data != null) {
					frm.remove();
					callback(data);
				}
			} catch (e) {/**/}	
		}		
	
	};
	

})(jQuery);
