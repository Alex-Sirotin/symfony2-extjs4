Ext.define('Cognitive.view.people.Form', {
    filterEvent: 'filter',
    cancelFilterEvent: 'cancelfilter',
    extend: 'Ext.form.Panel',
    alias: 'widget.peopleform',
    layout: 'border',

    constructor: function() {
        this.addEvents(
            this.filterEvent,
            this.filterCancelEvent
        );

        this.items = [{
            region: 'west',
            title: 'Фильтр',
            frame: true,
            width: 320,
            split: true,
            autoScroll: true,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'comboboxselect',
                    itemId: 'educationsCombo',
                    store: 'Educations',
                    anchor: '100%',
                    fieldLabel: 'Образование',
                    displayField: 'name',
                    valueField: 'id',
                    width: 290,
                    labelWidth: 80,
                    emptyText: 'Выберите записи'
                },
                {
                    xtype: 'comboboxselect',
                    itemId: 'citiesCombo',
                    store: 'Cities',
                    anchor: '100%',
                    fieldLabel: 'Города',
                    displayField: 'name',
                    valueField: 'id',
                    width: 290,
                    labelWidth: 80,
                    emptyText: 'Выберите записи'
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    action: 'find',
                    text:'Фильтр',
                    tooltip:'Применить фильтр',
                    iconCls:'find',
                    scope:this,
                    handler: this.filterClick
                }, {
                    xtype: 'button',
                    action: 'clear',
                    text:'Отмена',
                    tooltip:'Отменить фильтр',
                    iconCls:'clear',
                    scope:this,
                    handler: this.cancelClick
                }
            ]
        }, {
            region: 'center',
            xtype: 'peoplelist'
        }];

        this.callParent(arguments);
    },

    filterClick: function() {
        var
            selectedCities = this.down('#citiesCombo').getValue(),
            selectedEducations = this.down('#educationsCombo').getValue(),
            params = {
                city_id: selectedCities,
                education_id: selectedEducations
            };
        this.fireEvent(this.filterEvent, params);
    },

    cancelClick: function() {
        this.down('#citiesCombo').clearValue();
        this.down('#educationsCombo').clearValue();
        this.fireEvent(this.cancelFilterEvent, arguments);
    }

});