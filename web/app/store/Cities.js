Ext.define('Cognitive.store.Cities', {
    extend: 'Cognitive.classes.Store',
    model: 'Cognitive.model.City',

    constructor: function() {
        this.callParent(arguments);
        Ext.apply(this.proxy.api, {
            read:    'city/read',
            create:  'city/create',
            update:  'city/update',
            destroy: 'city/delete'
        });
    }
});