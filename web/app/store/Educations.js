Ext.define('Cognitive.store.Educations', {
    extend: 'Cognitive.classes.Store',
    model: 'Cognitive.model.Education',

    constructor: function() {
        this.callParent(arguments);
        Ext.apply(this.proxy.api, {
            read:    'education/read',
            create:  'education/create',
            update:  'education/update',
            destroy: 'education/delete'
        });
    }

});