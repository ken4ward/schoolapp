SchoolStudents = new Mongo.Collection('schoolstudents');

SchoolStudents.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

SchoolStudents.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

SchoolStudents.friendlySlugs(
  {
    slugFrom: ['firstname', 'lastname'],
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);

//easy search index
SchoolStudentsIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { createdAt: -1};
    },
    selector: function (searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = this.userId || Meteor.userId();

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.userId = categoryFilter;
      }
      return selector;
    }
  }),
  name: 'SchoolStudentsIndex',
  collection: SchoolStudents,
  fields: ['firstname', 'lastname', 'username', 'middlename', 'studentclass', 'address', 'city', 'state', 'country', 'registra', 'useremail', 'mobile'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function (options) {
    return options.userId;
  }
});

SchoolStudentsGlobalIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { createdAt: -1};
    },
    selector: function (searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.userId = categoryFilter;
      }
      return selector;
    }
  }),
  name: 'SchoolStudentsGlobalIndex',
  collection: SchoolStudents,
  fields: ['firstname', 'lastname', 'username', 'middlename', 'studentclass', 'address', 'city', 'state', 'country', 'registra', 'useremail', 'mobile'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function () {
    return true;
  }
});


// Client and Server
/*SchoolStudentsIndex = new EasySearch.Index({

  engine: new EasySearch.MongoDB({
    sort: function () {
      return { createdAt: -1};
    },
    selector(searchObject, options, aggregation) {
      // retrieve the default selector
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation)

      // options.search.userId contains the userId of the logged in user
      selector.owner = options.search.userId
      //console.warn(selector.owner +'---' +this.userId);

      return selector
    }
  }),
  collection: SchoolStudents,
  fields: ['firstname', 'lastname', 'username', 'middlename', 'studentclass', 'address', 'city', 'state', 'country', 'registra'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: (options) => options.userId, // only allow searching when the user is logged in
});*/