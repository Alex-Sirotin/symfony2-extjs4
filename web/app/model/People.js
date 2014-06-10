Ext.define('Cognitive.model.People', {
    extend: 'Ext.data.Model',

    fields: [
        'id',
        'name',
        'city_id',
        'city_name',
        'education_id',
        'education_name',
        'cities'
    ]
});