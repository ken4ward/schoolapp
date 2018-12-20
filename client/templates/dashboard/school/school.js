Template.school.onCreated(function () {
  var template = Template.instance();
});

Template.school.helpers({
  inputAttributes: function () {
    return {'class': 'easy-search-input', 'placeholder': 'Search For Schhols'};
  },

  players: function () {
    return SchoolDb.find({'userId': Meteor.userId()}, {sort: {createdAt: -1} });
  }, 

  selectedName: function () {
    var schools = SchoolDbIndex.config.mongoCollection.findOne({__originalId: Session.get('selectedSchools')});
    return schools && schools.addschoolname;
  },

  index: function () {
    return SchoolDbIndex;
  },

  resultCount: function () {
    return SchoolDbIndex.getComponentDict().get('count');
  }, 

  showMore: function () {
    return false;
  },
  renderTempl: function () {
    Template.renderTemplate
  }
});

Template.UserSchool.helpers({
  'selected': function () {
    return Session.equals('selectedSchools', this.__originalId) ? 'selected' : '';
  }
});

Template.UserSchool.events({
  'click': function () {
    Session.set('selectedSchools', this.__originalId);
  }
});

Template.school.events({
  'keyup [name="search"]': function (event, template) {
    let value = event.target.value.trim();

    if (value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set(value);
      template.searching.set(true);
    }

    if (value === '') {
      template.searchQuery.set(value);
    }
  },
  "click #add-module-to-school": function (event) {
    event.preventDefault();
    Modal.show('schoolmodal');
  },

  'change [type=checkbox]': function(event, template){
    event.preventDefault();
    var mySelectedModules = $('input:checkbox[name="eachmodules"]:checked').map(function () {
      return $(this).val()}).get();
    Session.setPersistent('selectedModules', mySelectedModules);
     console.log(Session.get('selectedModules'));
  }
});
