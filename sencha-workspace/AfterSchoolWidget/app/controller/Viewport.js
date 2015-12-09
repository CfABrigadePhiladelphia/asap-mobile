/*jslint browser: true, undef: true *//*global Ext,google*/
Ext.define('AfterSchoolWidget.controller.Viewport', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.device.Geolocation',
        'Ext.XTemplate'
    ],
    
    config: {
        views: [
            'Main',
            'SearchMenu',
            'ResultsMenu',
            'AboutSheet',
            'DetailsSheet'
        ],
        stores: [
            'Results'
        ],

        refs: {
            mainView: {
                selector: 'main',
                autoCreate: true,

                xtype: 'main'
            },
            searchBtn: 'button#searchMenu',
            searchMenu: {
                selector: 'searchmenu',
                autoCreate: true,

                xtype: 'searchmenu'
            },
            resultsBtn: 'button#resultsMenu',
            resultsMenu: {
                selector: 'resultsmenu',
                autoCreate: true,

                xtype: 'resultsmenu'
            },
            aboutSheet: {
                selector: 'aboutsheet',
                autoCreate: true,

                xtype: 'aboutsheet',
                fullscreen: true
            },
            detailsSheet: {
                selector: 'detailssheet',
                autoCreate: true,

                xtype: 'detailssheet',
                fullscreen: true
            }
        },
        control: {
            mainView: {
                maprender: 'onMapRender'
            },
            searchBtn: {
                tap: 'onSearchBtnTap'
            },
            resultsBtn: {
                tap: 'onResultsBtnTap'
            },
            'button[action=search]': {
                tap: 'onSearchTap'
            },
            'searchmenu field': {
                action: 'onSearchTap'
            },
            'button[action=about]': {
                tap: 'onAboutTap'
            },
            'aboutsheet button[action=dismiss]': {
                tap: 'onAboutDismissTap'
            },
            'detailssheet button[action=dismiss]': {
                tap: 'onDetailsDismissTap'
            },
            'resultsmenu list': {
                itemtap: 'onResultsItemTap'
            }
        }
    },
    
    
    // controller template methods
    launch: function() {
        var me = this,
            viewport = Ext.Viewport;
        
        // create menus
        viewport.setMenu(me.getSearchMenu(),{
            side: 'left',
            reveal: false,
            cover: false
        });
        
        viewport.setMenu(me.getResultsMenu(),{
            side: 'right',
            reveal: false,
            cover: false
        });

        viewport.showMenu('left');

        // create main view
        viewport.add(me.getMainView());

        // listen to store changes
        Ext.getStore('Results').on({
            scope: me,
            load: 'onResultsStoreLoad',
            clear: 'onResultsStoreClear'
        });

        // create template for info bubble
        me.infoTemplate = Ext.create('Ext.XTemplate', [
            '<h5><tpl if="SiteProviderName">{SiteProviderName} @ </tpl>{SiteName}</h5>',
            '<tpl if="SiteStreetAddress1">',
                '<p>',
                    '<a href="//maps.google.com/maps?q={SiteStreetAddress1:escape},+{SiteStreetAddress2:escape},{SiteCity:escape},+{SiteState:escape}+{SiteZip:escape}" target="_blank">',
                        '{SiteStreetAddress1}',
                        '<tpl if="SiteStreetAddress2"><br>{SiteStreetAddress2}</tpl>',
                        '<br>{SiteCity}, {SiteState} {SiteZip}',
                    '</a>',
                '</p>',
                '<tpl if="SiteContactPhone1">',
                    '<p>',
                        '<a href="tel:{SiteContactPhone1:escape}">{SiteContactPhone1}</a>',
                    '</p>',
                '</tpl>',
            '</tpl>',
            '<p><a href="http://www.phillyasap.org/SiteDetails.php?SiteID={SiteID}" target="_blank" onclick="return AfterSchoolWidget.app.getController(\'Viewport\').openSiteDetails(this)">Site Details</a></p>'
        ]);
    },


    // route handlers
//    ,showHome: function() {
//        this.getMainView().pop(this.getSearchForm());
//    }


    // event handlers
    onMapRender: function(map, gMap) {
        var me = this;

        // create the bus info bubble
        me.infoBubble = new google.maps.InfoWindow();
        
//        map.mapContainer.on('click', function(ev, t) {
//            debugger;
//        });
        
//        google.maps.event.addListener(me.infoBubble, 'domready', function() {
//            map.mapContainer.down('.gm-style-iw').on('click', function(ev, t) {
//            debugger;
//            });
//        });
    },

    onSearchBtnTap: function() {
        Ext.Viewport.toggleMenu('left');
    },

    onResultsBtnTap: function() {
        Ext.Viewport.toggleMenu('right');
    },
    
    onSearchTap: function() {
        var me = this,
            formPanel = me.getSearchMenu().down('formpanel'),
            searchParams = formPanel.getValues();
            
        if (formPanel.down('#nearField').getChecked()) {
            formPanel.setMasked({
                xtype: 'loadmask',
                message: 'Getting Location&hellip;'
            });
            Ext.device.Geolocation.getCurrentPosition({
                success: function(position) {
                    formPanel.setMasked(false);
                    searchParams['near[lat]'] = position.coords.latitude;
                    searchParams['near[lon]'] = position.coords.longitude;
                    me.doSearch(searchParams);
                },
                failure: function() {
                    Ext.Msg.alert('Location unavailable', 'Your location could not be determined, please ensure your device\'s location sensor is active, or try your search again with the nearby option disabled');
                }
            });
        } else {
            me.doSearch(searchParams);
        }
    },
    
    onResultsStoreLoad: function(store, records) {
        var me = this,
            mainView = me.getMainView(),
            gMap = mainView.getMap(),
            infoBubble = me.infoBubble,
            markers = me.markers = me.markers || [];
            
        if (!records.length) {
            mainView.setMasked({
                cls: 'no-results',
                html: 'No results'
            });
            return;
        }

        mainView.setMasked(false);

        Ext.each(records, function(record) {
            var marker = record.mapMarker = new google.maps.Marker({
                map: gMap,
                position: new google.maps.LatLng(record.get('SiteLat'), record.get('SiteLong'))
            });

			markers.push(marker);
            
            // attach listener to show info bubble
            google.maps.event.addListener(marker, 'click', function() {
                
                // close any existing buble
                infoBubble.close();
                
                // update bubble's content
                infoBubble.setContent(me.infoTemplate.apply(record.getData()));
                
                // open bubble attached to marker
                infoBubble.open(gMap, marker);
            });
        });
    },

    onResultsStoreClear: function() {
        var markers = this.markers || [];
        
        while (markers.length) {
            markers.pop().setMap(null);
        }
    },
    
    onResultsItemTap: function(resultsList, index, target, record) {
        var marker = record.mapMarker;

        this.getMainView().getMap().panTo(marker.getPosition());
        google.maps.event.trigger(marker, 'click');
    },

    onAboutTap: function() {
        Ext.Viewport.hideAllMenus();
        this.getAboutSheet().show();
    },
    
    onAboutDismissTap: function(btn) {
        this.getAboutSheet().hide();
    },
    
    onDetailsDismissTap: function() {
        var detailsSheet = this.getDetailsSheet();
        detailsSheet.hide();
        detailsSheet.down('iframe').setSrc(null);
    },


    // controller methods
    doSearch: function(params) {
        var store = Ext.getStore('Results');
        
        Ext.Viewport.hideMenu('left');
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Finding activities&hellip;'
        });
        
        store.removeAll();
        store.getProxy().setExtraParams(params);
        store.loadPage(1, {
            callback: function() {
                Ext.Viewport.setMasked(false);
                //Ext.Viewport.showMenu('right');
            }
        });
    },
    
    /**
     * @public
     * This method is invoked externally by links within the google map infowindow
     */
    openSiteDetails: function(detailsLinkDom) {
        var detailsSheet = this.getDetailsSheet(),
            iframe = detailsSheet.down('iframe');

        Ext.Viewport.hideAllMenus();
        detailsSheet.show();
        iframe.setSrc(detailsLinkDom.href);

        return false;
    }
});