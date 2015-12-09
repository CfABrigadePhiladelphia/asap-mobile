Ext.define('AfterSchoolWidget.view.AboutSheet', {
    extend: 'Ext.Sheet',
    xtype: 'aboutsheet',

    config: {
        left: 0,
        right: 0,
        bottom: 0,
        centered: false,
        height: '100%',
        hideOnMaskTap: true,
        layout: 'vbox',
        cls: 'about-sheet',
        items: [{
            flex: 1,

            xtype: 'container',
            styleHtmlContent: true,
            scrollable: 'vertical',
            html: [
                '<p>This app was a collaborative effort from After School Activities Partnership (ASAP), Code for Philly, and Philly311.</p>',                
                '<p><b>Data provided by:</b></p>',
                '<img src="resources/images/asap_logo.jpg">',
                '<p>ASAP aims to provide safe and supervised after school programming for youth in Philadelphia, and supports chess, Scrabble, drama and debate clubs for students of all ages. ASAP needs volunteers who are excited to work with students and who are comfortable taking the initiative to lead an activity on their own. The ASAP staff works with their volunteers to set them up at a time and location that is convenient for them in Philadelphia. Locations include: schools, recreation centers, community centers, other non-profits and libraries. ',
                'Please contact <a href="mailto:pcarroll@phillyasap.org">Paul Carroll</a> or call <a href="tel:2155452727">(215) 545-2727</a> with any questions about the data.</p>',
                '<p><b>App provided by:</b></p>',
                '<img src="resources/images/cfp_logo.png">',
                '<p>Code for Philly is volunteering 2.0. We create opportunities for citizens to modernize Philadelphia through the power of the web. Founded under Code for America\'s inaugural Brigade Program in 2012, Code for Philly currently hosts a weekly Meetup and participates in a number of hackathons and web-based City projects.',
                'Code for Philly is building a network of civic leaders, organizations and startups who believe there is a better way of doing things and want to make a difference. Together, we utilize our unique talents to create new technology that helps Philadelphia work better for everyone. To learn more about our innovative applications, check out our <a href="http://codeforphilly.org/projects" target="_blank">Projects</a> page.</p>'
            ].join('')
/*
    <p>This app was a collaborative effort from After School Activities Partnership (ASAP), Code for Philly, and Philly311.</p>
    
    <h1>Data provided by:</h1>
    <img src="resources/images/asap_logo.jpg" width="90%">
    <p>ASAP aims to provide safe and supervised after school programming for youth in Philadelphia, and supports chess, Scrabble, drama and debate clubs for students of all ages. ASAP needs volunteers who are excited to work with students and who are comfortable taking the initiative to lead an activity on their own. The ASAP staff works with their volunteers to set them up at a time and location that is convenient for them in Philadelphia. Locations include: schools, recreation centers, community centers, other non-profits and libraries. 
    Please contact <a href="mailto:pcarroll@phillyasap.org">Paul Carroll</a> or call <a href="tel:2155452727">(215) 545-2727</a> with any questions about the data.</p>
    
    <h1>App provided by:</h1>
    <img src="resources/images/cfp_logo.jpg" width="90%">
    <p>Code for Philly is volunteering 2.0. We create opportunities for citizens to modernize Philadelphia through the power of the web. Founded under Code for America's inaugural Brigade Program in 2012, Code for Philly currently hosts a weekly Meetup and participates in a number of hackathons and web-based City projects.
    Code for Philly is building a network of civic leaders, organizations and startups who believe there is a better way of doing things and want to make a difference. Together, we utilize our unique talents to create new technology that helps Philadelphia work better for everyone. - To learn more about our innovative applications, check out our <a href="http://codeforphilly.org/projects">Projects</a> page.</p>
*/
        },{
            xtype: 'button',
            ui: 'decline',
            action: 'dismiss',
            text: 'Close'
        }]
    }
});
