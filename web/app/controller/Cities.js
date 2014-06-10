Ext.define('Cognitive.controller.Cities', {
    extend: 'Cognitive.classes.Controller',

    views: [
        'city.List',
        'city.Edit'
    ],

    stores: ['Cities'],
    models: ['City'],
    
    editWidget: 'cityedit',
    listWidget: 'citylist',
    tabWidget: '#tabCity',

    init: function() {
        this.store = this.getCitiesStore();
        this.callParent(arguments);
    },

    newRecord: function () {
        var rec = Ext.create('Cognitive.model.City');
        return rec;
    }

});