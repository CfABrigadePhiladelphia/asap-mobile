Ext.define('AfterSchoolWidget.view.ResultsMenu', {
    extend: 'Ext.Menu',
    xtype: 'resultsmenu',
    requires: [
        'Ext.dataview.List',
        'Ext.plugin.ListPaging'
    ],

    config: {
        width: 200,
        modal: false,
        layout: 'fit',
        items: [{
            xtype: 'list',
            loadingText: false,
            emptyText: 'No activities matching your criteria were found',
            itemTpl: [
                '<tpl if="SiteProviderName">{SiteProviderName} @ </tpl>{SiteName}'
            ],
            store: 'Results',
            plugins: [{
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true
            }]
        },{
            docked: 'bottom',
            xtype: 'toolbar',
            items: {
                flex: 1,

                xtype: 'button',
                action: 'about',
                text: 'About this App'
            }
        }]
    }
});
