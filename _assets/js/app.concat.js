/*jshint indent: 4, camelcase: true, curly: true, eqeqeq: true, latedef: false, undef: false, strict: true */

var App, console, head, alert; // define variables

if (typeof jsDir === 'undefined') jsDir = '../_assets/js/';

// load scripts
head.js(jsDir + "lib/jquery.min.js");
head.js(jsDir + "lib/image-hd.js");

head.ready(function () {

    "use strict";

    App.init();

});


// Generic App Functionality
App = {

    debug : true,

    // Initiliaztion functions & data bindings
    init : function () {

        "use strict";

        // ImageHD.load(); //retinafy images
        
        App.log('main.js loaded.');

    }, // End : init

    // Tie logging to debug flag
    log : function (what) {

        "use strict";

        if (typeof console !== "undefined" && this.debug === true) {
            console.log(what);
        }
    } // End : log

}; // End : App