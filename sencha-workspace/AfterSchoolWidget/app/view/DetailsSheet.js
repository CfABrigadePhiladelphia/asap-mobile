Ext.define('AfterSchoolWidget.view.DetailsSheet', {
    extend: 'Ext.Sheet',
    xtype: 'detailssheet',
    requires: [
        'Jarvus.touch.Iframe'
    ],

    config: {
        left: 0,
        right: 0,
        bottom: 0,
        centered: false,
        height: '100%',
        hideOnMaskTap: true,
        layout: 'vbox',
        items: [{
            flex: 1,

            xtype: 'iframe',
            blankHtml: '<html><body style="color:white;font-weight:bold;text-align:center">Loading Details&hellip;</body></html>'
        },{
            xtype: 'button',
            dock: 'bottom',
            ui: 'decline',
            action: 'dismiss',
            text: 'Close'
        }]
    }
});
