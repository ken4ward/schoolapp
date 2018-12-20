Courses = new Mongo.Collection("courses");

Courses.friendlySlugs(
  {
    slugFrom: 'title',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);

Courses.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

Courses.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

CourseIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { dateCreated: -1};
    },
    selector: function (searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = this.userId || Meteor.userId();

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.createdById = categoryFilter;
      }
      return selector;
    }
  }),
  name: 'CourseIndex',
  collection: Courses,
  fields: ['title', 'about', 'author'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function (options) {
    return options.userId;
  }
});

//easy search index
CourseGlobalIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { dateCreated: -1};
    },
    selector: function (searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }
      return selector;
    }
  }),
  name: 'CourseGlobalIndex',
  collection: Courses,
  fields: ['title', 'about', 'author'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function () {
    return true;
  }
});

