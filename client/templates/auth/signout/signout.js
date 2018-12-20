Template.signout.events({
    'click #signoutbutton': function(event){
        event.preventDefault();
        Meteor.logout();
        Modal.hide('signout');
        Bert.alert("You have successfully logged out.", "success", "growl-top-right");
        FlowRouter.go('/');
        
    }
});