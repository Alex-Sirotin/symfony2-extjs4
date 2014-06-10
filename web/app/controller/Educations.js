Ext.define('Cognitive.controller.Educations', {
    extend: 'Cognitive.classes.Controller',

    views: [
        'education.List',
        'education.Edit'
    ],
    
    stores: ['Educations'],
    models: ['Education'],

    editWidget: 'educationedit',
    listWidget: 'educationlist',
    tabWidget: '#tabEducation',

    init: function() {
        this.store = this.getEducationsStore();
        this.callParent(arguments);
    },

    newRecord: function () {
        var rec = Ext.create('Cognitive.model.Education');
        return rec;
    }

});