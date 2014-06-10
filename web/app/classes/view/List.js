Ext.define('Cognitive.classes.view.List' ,{
    editRecordClickEvent: 'editrecordclick',
    addRecordClickEvent: 'addrecordclick',
    deleteRecordsClickEvent: 'deleterecordclick',
    refreshRecordsClickEvent: 'refreshrecordclick',
    extend: 'Ext.grid.Panel',
    selType: 'checkboxmodel',
    frame: true,

    initComponent: function() {

        this.addEvents(
            this.editRecordClickEvent,
            this.addRecordClickEvent,
            this.deleteRecordsClickEvent,
            this.refreshRecordsClickEvent
        );

//        this.columns = [
//            {
//                header: 'ID',
//                dataIndex: 'id',
//                width:50
//            }, {
//                header: 'Наименование',
//                dataIndex: 'name',
//                width:300
//            }, {
//                menuDisabled: true,
//                sortable: false,
//                xtype: 'actioncolumn',
//                width: 50,
//                items: [{
//                    iconCls: 'edit',
//                    tooltip: 'Редактировать',
//                    scope: this,
//                    handler: function(grid, rowIndex, colIndex) {
//                        var rec = grid.getStore().getAt(rowIndex);
//                        this.editRecord(rec);
//                    }
//                }, {
//                    iconCls: 'delete',
//                    tooltip: 'Удалить',
//                    scope: this,
//                    handler: function(grid, rowIndex, colIndex) {
//                        var rec = grid.getStore().getAt(rowIndex);
//                        this.deleteRecords([rec]);
//                    }
//                }]
//            }
//        ];

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners: {
                scope:this,
                selectionchange: function(sm, selections) {
                    this.down('button[action=delete]').setDisabled(selections.length === 0);
                    this.down('button[action=edit]').setDisabled(selections.length != 1);
                }
            }
        });

        this.dockedItems = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                action: 'refresh',
                text:'Обновить',
                tooltip:'Обновить грид',
                iconCls:'refresh',
                scope:this,
                handler: this.refreshRecords
            },
            '-',
            {
                action: 'add',
                text:'Создать',
                tooltip:'Создать запись',
                iconCls:'add',
                scope:this,
                handler: this.addRecord
            },
            '-',
            {
                action: 'edit',
                text:'Правка',
                tooltip:'Изменить запись',
                iconCls:'edit',
                disabled: true,
                scope:this,
                handler: function() {
                    var recs = this.selModel.getSelection();
                    if (recs.length == 1) {
                        this.editRecord(recs[0]);
                    } else {
                        throw new Error("Can't edit few events!");
                    }
                }
            },
            '-',
            {
                action: 'delete',
                text:'Удалить',
                tooltip:'Удалить запись',
                iconCls:'delete',
                disabled: true,
                scope:this,
                handler: function() {
                    var recs = this.selModel.getSelection();
                    this.deleteRecords(recs);
                }
            }]
        });

        this.on('itemdblclick', this.rowDblClick)

        this.callParent(arguments);
    },

    rowDblClick: function(grid, record) {
        this.fireEvent(this.editRecordClickEvent, record);
    },

    addRecord: function() {
        this.fireEvent(this.addRecordClickEvent);
    },

    editRecord: function(rec) {
        this.fireEvent(this.editRecordClickEvent, rec);
    },

    deleteRecords: function(recs) {
        this.fireEvent(this.deleteRecordsClickEvent, recs);
    },

    refreshRecords: function(recs) {
        this.fireEvent(this.refreshRecordsClickEvent, recs);
    }

});