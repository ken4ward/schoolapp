SchoolDb = new Mongo.Collection('SchoolDb');

SchoolDb.allow({
	insert: ()=> false,
	update: ()=> false,
	remove: ()=> false
});

SchoolDb.deny({
	insert: ()=> true,
	update: ()=> true,
	remove: ()=> true
});

SchoolDb.friendlySlugs(
  {
    slugFrom: 'addschoolname',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);

//easy search index
SchoolDbIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { createdAt: -1};
    },
    selector: function (searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = this.userId || Meteor.userId();

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }
      return selector;
    }
  }),
  name: 'SchoolDbIndex',
  collection: SchoolDb,
  fields: ['addschoolname', 'addschoolmission', 'addschoolvision'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function (options) {
    return options.userId;
  }
});

SchoolDbGlobalIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { createdAt: -1};
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
  name: 'SchoolDbGlobalIndex',
  collection: SchoolDb,
  fields: ['addschoolname', 'addschoolmission', 'addschoolvision'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function () {
    return true;
  }
});