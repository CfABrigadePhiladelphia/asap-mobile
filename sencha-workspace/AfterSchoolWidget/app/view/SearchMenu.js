Ext.define('AfterSchoolWidget.view.SearchMenu', {
    extend: 'Ext.Menu',
    xtype: 'searchmenu',
    requires: [
        'Ext.form.Panel'
    ],

    config: {
        width: 300,
        layout: 'fit',
        items: [{

            xtype: 'formpanel',
            defaults: {
                xtype: 'checkboxfield',
                labelWidth: '75%'
            },
            items: [{
                xtype: 'searchfield',
                name: 'q',
                placeHolder: 'keywords (optional)'
            },{
                name: 'features[]',
                label: 'Transportation Provided',
                value: 'TransportationProvided'
            },{
                itemId: 'nearField',
                label: 'Near my location',
                checked: true
            },{
                xtype: 'component',
                html: 'Grades Served'
            },{
                name: 'grades[]',
                label: 'Pre-K',
                value: 'Pre_k'
            },{
                name: 'grades[]',
                label: 'K-5',
                value: 'K_5'
            },{
                name: 'grades[]',
                label: '6-8',
                value: '6_8'
            },{
                name: 'grades[]',
                label: '9-12',
                value: '9_12'
            },{
                name: 'grades[]',
                label: 'Other',
                value: 'Other'
            },{
                xtype: 'component',
                html: 'Program Hours'
            },{
                name: 'hours[]',
                label: 'Before School',
                value: 'BeforeSchool'
            },{
                name: 'hours[]',
                label: 'Evening School',
                value: 'EveningSchool'
            },{
                name: 'hours[]',
                label: 'Weekend',
                value: 'Weekend'
            },{
                name: 'hours[]',
                label: 'Overnight',
                value: 'Overnight'
            },{
                name: 'hours[]',
                label: 'Summer Programs',
                value: 'SummerProgram'
            },{
                xtype: 'component',
                html: 'ASAP Club'
            },{
                name: 'clubs[]',
                label: 'Chess',
                value: 'ASAPChess'
            },{
                name: 'clubs[]',
                label: 'Debate',
                value: 'ASAPDebate'
            },{
                name: 'clubs[]',
                label: 'Drama',
                value: 'ASAPDrama'
            },{
                name: 'clubs[]',
                label: 'Scrabble',
                value: 'ASAPScrabble'
            }]
        },{
            docked: 'bottom',
            xtype: 'toolbar',
            items: {
                flex: 1,

                xtype: 'button',
                action: 'search',
                text: 'Search now'
            }
        }]
    }
});
