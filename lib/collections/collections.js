NewSchoolDB = new Mongo.Collection('NewSchoolDB');

NewSchoolDB.allow({
	insert: ()=> false,
	update: ()=> false,
	remove: ()=> false
});

NewSchoolDB.deny({
	insert: ()=> false,
	update: ()=> false,
	remove: ()=> false
});

SchoolLogo = new FS.Collection('SchoolLogo', {
	stores: [new FS.Store.FileSystem('SchoolLogo', {path: "~/uploads"})]
});

SchoolLogo.allow({

	insert: function (schoolId, doc) {
		return true;
	},
	update: function (schoolId, doc, fields, modifier) {
		return true;
	},
	download: function () {
		return true;
	}
});

SchoolLoogDBURL = new Mongo.Collection("SchoolLoogDBURL");

SchoolLoogDBURL.allow({
	insert: function () {
		return true;
	},
	update: function (schoolId, doc, fields, modifier) {
		return true;
	}
});

//easy search index
NewSchoolDBIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB({
		sort: function () {
			return { createdAt: -1};
		},
		selector: function (searchObject, options, aggregation) {
			let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
			categoryFilter = options.search.props.categoryFilter;

			if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
				selector.category = categoryFilter;
			}
			return selector;
		}
	}),
	collection: NewSchoolDB,
	fields: ['newschoolnamevar', 'newschoolmottovar', 'newschholvisionvar', 'sellschoolvar', 'schooltypevar', 'schoolfeerangevar', 
	'schoolcurriculumvar', 'date', 'createdAt', 'author', 'phone', 'mobile', 'num_street', 'schoolemail', 'schoolwebsite', 'name', 'locality',
	'country'],
	defaultSearchoptions: {
		limit: 8
	},
	permission: ()=> {
		return true;
	}
});