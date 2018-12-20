// Settings related to the browser-policy security package

// eval() is used by MessageFormat v1, so is necessary
Meteor.startup( () => {
	BrowserPolicy.content.allowEval();
	BrowserPolicy.content.allowInlineStyles();
	BrowserPolicy.content.allowInlineScripts();
	
	BrowserPolicy.content.allowOriginForAll('http://maps.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('http://csi.gstatic.com');
	BrowserPolicy.content.allowOriginForAll('http://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png');
	BrowserPolicy.content.allowOriginForAll('https://maps.gstatic.com');
	BrowserPolicy.content.allowOriginForAll('http://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons.png');
	BrowserPolicy.content.allowOriginForAll('https://fonts.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('https://fonts.gstatic.com');
	BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
});