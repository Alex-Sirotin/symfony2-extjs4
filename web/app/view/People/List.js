Ext.define('Cognitive.view.people.List', {
    extend: 'Cognitive.classes.view.List',
    alias: 'widget.peoplelist',
    title: 'Все пользвателей',
    store: 'Peoples',

    initComponent: function() {
        this.columns = [
            {
                text: 'ID',
                dataIndex: 'id',
                width:50
            }, {
                text: 'Наименование',
                dataIndex: 'name',
                width:150
            }, {
                text: 'Образование',
                tpl: '<tpl>{education_name}</tpl>',
                xtype:'templatecolumn',
                width:150
            }, {
                text: 'Города',
                tpl: '<tpl>{city_name}</tpl>',
                xtype:'templatecolumn',
                flex:1
            }, {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'edit',
                    tooltip: 'Редактировать',
                    scope: this,
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.editRecord(rec);
                    }
                }, {
                    iconCls: 'delete',
                    tooltip: 'Удалить',
                    scope: this,
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.deleteRecords([rec]);
                    }
                }]
            }
        ];
        this.callParent(arguments);
    }
});