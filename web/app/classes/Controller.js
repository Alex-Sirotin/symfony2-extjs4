Ext.define('Cognitive.classes.Controller', {
    successLoadEvent: 'successLoad',
    failureLoadEvent: 'failureLoad',
    successSyncEvent: 'successSync',
    failureSyncEvent: 'failureSync',
    extend: 'Ext.app.Controller',

    editWidget: null,
    listWidget: null,
    store: null,
    model: null,

    init: function() {
        this.addEvents(
            this.successLoadEvent,
            this.failureLoadEvent,
            this.successSyncEvent,
            this.failureSyncEvent
        );

        this.on(this.successLoadEvent, this.successLoad, this);
        this.on(this.failureLoadEvent, this.failureLoad, this);
        this.on(this.successSyncEvent, this.successSync, this);
        this.on(this.failureSyncEvent, this.failureSync, this);

        this.control(
            this.editWidget, {
                updateRecord: this.update
            }
        );
        this.control(
            this.tabWidget, {
                activate: this.load
            }
        );
        this.control(
            this.listWidget, {
                addrecordclick: this.add,
                editrecordclick: this.edit,
                deleterecordclick: this.destroy,
                refreshrecordclick: this.refresh,
            }
        );
    },

    load: function() {
        this.store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    this.fireEvent(this.successLoadEvent, arguments);
                } else {
                    this.fireEvent(this.failureLoadEvent, arguments);
                }
            }
        });
    },

    sync: function(win) {
        this.store.sync({
            scope: this,
            callback: function () {
                win.close();
                this.store.sort();
            },
            success: function() {
                this.fireEvent(this.successSyncEvent, arguments);
            },
            failure: function() {
                this.fireEvent(this.failureSyncEvent, arguments);
            }
        });
    },

    successLoad: function() {
    },

    failureLoad: function() {
        Ext.Msg.alert({
            title: 'Ошибка загрузки',
            msg: 'При загрузке данных произошла ошибка!',
            buttons: Ext.window.MessageBox.OK,
            icon: Ext.window.MessageBox.Error
        });
    },

    successSync: function() {
        this.load();
    },

    failureSync: function() {
        this.load();
        Ext.Msg.show({
            title: 'Ошибка сохранения',
            msg: 'При сохранении данных произошла ошибка!',
            buttons: Ext.Msg.OK,
            icon: Ext.window.MessageBox.Error
        });
    },

    add: function() {
        var record = this.newRecord();
        Ext.apply(record, {isNew: true});
        this.edit(record);
    },

    edit: function(record) {
        var view = Ext.widget(this.editWidget);
        if (Ext.isDefined(record)) {
            view.down('form').loadRecord(record);
        }
    },

    destroy: function(records) {
        this.store.remove(records);
        this.sync();
    },

    update: function(win, record, values) {
        record.set(values);
        if (Ext.isDefined(record.isNew) && record.isNew) {
            this.store.add(record);
        }
        this.sync(win);
    },

    refresh: function() {
        this.load();
    }
});