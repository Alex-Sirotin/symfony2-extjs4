Ext.define('Cognitive.store.Peoples', {
    extend: 'Ext.data.Store',
    model: 'Cognitive.model.People',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            root: 'data',
            type: 'json',
            encode: true
        },
        api: {
            read:    'people/read',
            create:  'people/create',
            update:  'people/update',
            destroy: 'people/delete'
        }
    },

    sorters: {
        property: 'name',
        direction: 'ASC'
    }
});