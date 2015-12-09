Ext.define('AfterSchoolWidget.view.Main', {
    extend: 'Ext.Map',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        useCurrentLocation: false,
        styleHtmlContent: true,
		mapOptions: {
			zoom: 13,
			center: { latitude: 39.9529, longitude: -75.1602 }
		},
        masked: {
//            cls: 'no-results',
            html: 'Press "Search Now" in the left menu to find programs'
        },
        items: {
            docked: 'top',
            xtype: 'titlebar',
            title: location.search.match(/(^|\W)env=311(\W|$)/) ? '' : 'Activity Finder',
            items: [{
                itemId: 'searchMenu',
                iconCls: 'search',
                align: 'left'
            },{
                itemId: 'resultsMenu',
                iconCls: 'list',
                align: 'right'
            }]
        }
    }
});
