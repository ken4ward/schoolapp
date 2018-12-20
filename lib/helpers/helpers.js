Handlebars.registerHelper('trimString', function(passedString, startstring, endstring) {
   var theString = passedString.substring( startstring, endstring );
   if (theString) {
   	return new Handlebars.SafeString(theString);
   }
});

Template.registerHelper('equals', function (realValue, compared) {
	return realValue == compared;
});

Template.registerHelper("accessDenied", function() {
    FlowRouter.go("/dashboard");
});

Template.registerHelper("notloggedIn", function() {
    FlowRouter.go("/");
});

Template.registerHelper('groupRoutes', function () {
  FlowRouter.watchPathChange()
  var groupName = FlowRouter.current().route.group.name
  return _.filter(FlowRouter._routes, function (route) {
    return route.group.name === groupName
  });
});

