Ext.define('AfterSchoolWidget.store.Results', {
    extend: 'Ext.data.Store',

    config: {
        fields: [
            { name: 'SiteID', type: 'integer' },
            { name: 'SiteName', type: 'string' },
            { name: 'SiteProviderName', type: 'string' },
            { name: 'SiteLat', type: 'float' },
            { name: 'SiteLong', type: 'float' },
            { name: 'SiteStreetAddress1', type: 'string' },
            { name: 'SiteStreetAddress2', type: 'string' },
            { name: 'SiteCity', type: 'string' },
            { name: 'SiteState', type: 'string' },
            { name: 'SiteZip', type: 'string' },
            { name: 'SiteContactPhone1', type: 'string' }
        ],
        proxy: {
            type: 'ajax',
            url: '/legacy-search',
            startParam: 'offset',
            pageParam: false,
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
