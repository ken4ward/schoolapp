Template.modules.onCreated(function () {
  var template = Template.instance();

});

Template.modules.helpers({
  inputAttributes: function () {
    return {'class': 'easy-search-input', 'placeholder': 'Search For Modules'};
  },

  players: function () {
    return Modules.find({userId: Meteor.userId()}, {sort: {createdAt: -1} });
  }, 

  selectedName: function () {
    var modules = ModulesIndex.config.mongoCollection.findOne({__originalId: Session.get('selectedModules')});
    return modules && modules.modulename;
  },

  index: function () {
    return ModulesIndex;
  },

  resultCount: function () {
    return ModulesIndex.getComponentDict().get('count');
  }, 

  showMore: function () {
    return false;
  },
  renderTempl: function () {
    Template.renderTemplate
  }
});

Template.ModulesUser.helpers({
  selected: function () {
    return Session.equals('selectedModules', this.__originalId) ? 'selected' : '';
  }
});

Template.ModulesUser.events({
  'click': function () {
    Session.set('selectedModules', this.__originalId);
  }
});

Template.modules.events({

 'change #performaction': function (event, template) {
    event.preventDefault();
  
    var selectedText = template.$('#performaction').val();
    if (selectedText === "addnewschool") {
      FlowRouter.go('/school/basic');
    }
    if (selectedText === "addmoduletoschool") {
       Modal.show('moduledialog');
    }
  },

  'change [type=checkbox]': function(event, template){
    event.preventDefault();
    var mySelectedModules = $('input:checkbox[name="eachmodules"]:checked').map(function () {
      return $(this).val()}).get();
    Session.set('selectedModules', mySelectedModules);
     console.log(Session.get('selectedModules'));
  }
});
