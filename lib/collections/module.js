Modules = new Mongo.Collection('modules');

if ( Meteor.isServer ) {
  Modules._ensureIndex( { modulename: 1, moduledescription: 1, year: 1 } );
}

Modules.allow({
  insert: function () { return false; },
  update: function () { return false; },
  remove: function () { return false; }
});

Modules.deny({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Modules.friendlySlugs(
  {
    slugFrom: 'modulename',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);

//easy search index


//easy search index
ModulesIndex = new EasySearch.Index({
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
  name: 'ModulesIndex',
  collection: Modules,
  fields: ['modulename', 'moduledescription', 'userId'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function (options) {
    return options.userId;
  }
});

ModulesGlobalIndex = new EasySearch.Index({
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
  name: 'ModulesGlobalIndex',
  collection: Modules,
  fields: ['modulename', 'moduledescription', 'userId'],
  defaultSearchoptions: {
    limit: 8
  },
  permission: function () {
    return true;
  }
});
