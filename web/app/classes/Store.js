Ext.define('Cognitive.classes.Store', {
    loadErrorEvent: 'loaderror',
    syncErrorEvent: 'syncerror',
    readExceptionEvent: 'readexception',
    extend: 'Ext.data.Store',

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
        api: {}
    },

    sorters: {
        property: 'name',
        direction: 'ASC'
    }
});