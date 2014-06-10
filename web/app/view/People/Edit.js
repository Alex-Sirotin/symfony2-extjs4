Ext.define('Cognitive.view.people.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.peopleedit',
    title: 'Редактировать пользователя',
    updateRecordEvent: 'updateRecord',
    layout: 'fit',
    autoShow: true,
    autoscroll: true,
    width:400,
    modal: true,

    initComponent: function() {

        this.addEvents(this.updateRecordEvent);

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

        this.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Наименование',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        name : 'education_id',
                        fieldLabel: 'Образование',
                        allowBlank: false,
                        store: 'Educations',
                        anchor: '100%',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: 'Выберите записи',
                        width: 390
                    }, {
                        xtype: 'comboboxselect',
                        name : 'cities',
                        fieldLabel: 'Город',
                        allowBlank: false,
                        store: 'Cities',
                        anchor: '100%',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: 'Выберите записи',
                        width: 390
                    }
                ]
            }
        ];

        this.callParent(arguments);

        this.on('show', this.fillCities, this);
    },

    saveClick: function() {
        var
            form   = this.down('form'),
            record = form.getRecord(),
            values = form.getValues();
            values.city_id = values.cities.join("|");
        this.fireEvent(this.updateRecordEvent, this, record, values);
    },

    fillCities: function() {
        if (Ext.isDefined(this.editedRecord)) {
            var ids = this.editedRecord.get('cities');
            this.down('comboboxselect').setValue(ids);
        }
    }

});