Ext.define('Cognitive.controller.Peoples', {
    extend: 'Cognitive.classes.Controller',

    views: [
        'people.List',
        'people.Edit',
        'people.Form'
    ],

    stores: ['Peoples', 'Cities', 'Educations'],
    models: ['People'],

    editWidget: 'peopleedit',
    listWidget: 'peoplelist',
    tabWidget: '#tabPeople',

    init: function() {
        this.store = this.getPeoplesStore();
        this.citiesStore = this.getCitiesStore();
        this.educationsStore = this.getEducationsStore();
        this.control(
            'peopleform', {
                filter: this.filter,
                cancelfilter: this.cancelFilter
            }
        );
        this.callParent(arguments);
    },

    newRecord: function () {
        var rec = Ext.create('Cognitive.model.People');
        return rec;
    },

    load: function() {
        this.citiesStore.load();
        this.educationsStore.load();
        this.loadPeoples();
    },

    loadPeoples: function() {
        this.store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    this.fireEvent(this.successLoadEvent, arguments);
                } else {
                    this.fireEvent(this.failureLoadEvent, arguments);
                }
            }
        });
    },

    filter: function(params) {
        this.store.clearFilter(true);
        var cityFilter = new Ext.util.Filter({
            filterFn: function(item) {
                var rec_ids = Ext.Array.map(
                        item.get('city_id').split(','),
                        function(val) { return parseInt(val); }
                    );
                var intersect = Ext.Array.intersect(params.city_id, rec_ids)
                return Ext.isEmpty(params.city_id) || intersect.length > 0
            }
        });

        var educationFilter = new Ext.util.Filter({
            filterFn: function(item) {
                var result = Ext.isEmpty(params.education_id)
                    || Ext.Array.contains(params.education_id, item.get('education_id'));
                return result;
            }
        });
        this.store.filter([cityFilter, educationFilter]);
    },

    cancelFilter: function() {
        this.store.clearFilter(true);
        this.load();
    },

    edit: function(record) {
        //record.set('cities', record.get('city_id').split(','));
        //console.log(record);
        var view = Ext.widget(this.editWidget, {
            citiesStore: this.citiesStore,
            educationsStore: this.educationsStore,
            editedRecord: record
        });
        if (Ext.isDefined(record)) {
            view.down('form').loadRecord(record);
        }
    }
});