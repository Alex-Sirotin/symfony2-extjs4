Ext.application({
    name: 'Cognitive',
    appFolder: 'app',
    paths: {
        'Ext.ux': '/app/ux'
    },
    requires: [
        'Ext.container.Viewport',
        'Ext.ux.BoxSelect',
        'Ext.tab.*'
    ],
    controllers: [
        'Cities',
        'Educations',
        'Peoples'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'north',
                    xtype: 'panel',
                    height: 70,
                    html:
                        '<table><tr>' +
                            '<td><h1>Тестовое задание</h1></td>' +
                            '<td>&nbsp;&nbsp;</td>' +
                            '<td>' +
                                '<b>Александр Сиротин</b><br>' +
                                'email: <a href="mailto:Alexander.Sirotin@gmail.com">Alexander.Sirotin@gmail.com</a><br>' +
                                'Skype: ship2k<br>' +
                            '</td>' +
                        '</tr></table>'
                }, {
                    region: 'center',
                    xtype: 'tabpanel',
                    id: 'main',
                    activeTab: 0,
                    defaults :{
                        bodyPadding: 10
                    },
                    items: [{
                        title: 'Главная',
                        html:
                            '<div style="font-size: medium">' +
                            '<ol>' +
                                '<li>Создать три таблицы в БД. В одной хранятся имена пользователей, во второй - связь между пользователями и их образованием (среднее, бакалавр, магистр, еще что-то), в третьей - между пользователями и некими городами, у каждого пользователя может быть 1 или более городов.</li>' +
                                '<li>Написать скрипт, который будет выводить список (grid) этих пользователей, в зависимости от отмеченных галочек (для каждой таблички свой набор галочек). Грид обновляется без перезагрузки страницы. Поля: пользователь, образование, город</li>' +
                                '<li>Если получится решить задачу с использованием ООП и ExtJS – это дополнительный плюс.</li>' +
                            '</ol>' +
                            'Фреймворки можно использовать любые.' +
                            '</div>'
                    }, {
                        title: 'Пользователи',
                        id: 'tabPeople',
                        xtype: 'peopleform'
                    },{
                        title: 'Образование',
                        id: 'tabEducation',
                        xtype: 'educationlist'
                    },{
                        title: 'Города',
                        id: 'tabCity',
                        xtype: 'citylist'
                    }
                    ]
                }
            ]
        });
    }

});