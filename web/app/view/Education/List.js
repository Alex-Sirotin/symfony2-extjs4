Ext.define('Cognitive.view.education.List' ,{
    extend: 'Cognitive.classes.view.List',
    alias: 'widget.educationlist',
    title: 'Все образования',
    store: 'Educations',

    initComponent: function() {
        this.columns = [
            {
                text: 'ID',
                dataIndex: 'id',
                width:50
            }, {
                text: 'Наименование',
                dataIndex: 'name',
                width:300
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