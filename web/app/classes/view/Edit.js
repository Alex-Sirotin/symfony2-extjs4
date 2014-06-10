Ext.define('Cognitive.classes.view.Edit', {
    extend: 'Ext.window.Window',
    updateRecordEvent: 'updateRecord',
    layout: 'fit',
    autoShow: true,
    modal: true,

    initComponent: function() {

        this.addEvents(this.updateRecordEvent);

        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Наименование',
                        allowBlank: false
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                scope: this,
                handler: this.saveClick
            },
            {
                text: 'Отмена',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    saveClick: function() {
        var
            form   = this.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        this.fireEvent(this.updateRecordEvent, this, record, values);
    }
});