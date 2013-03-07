/*jshint indent: 4, camelcase: true, curly: true, eqeqeq: true, latedef: false, undef: false, strict: true */

var App, Maps, Verify, console, head, alert, url; // define variables

if (typeof jsDir === 'undefined') jsDir = '../_assets/js/';

// load scripts
head.js(jsDir + "lib/jquery-1.9.1.min.js");
head.js(jsDir + "lib/image-hd.js");
head.js(jsDir + "lib/spin.min.js");

head.ready(function () {

    "use strict";

    App.init();
    
    // ImageHD.load();

});


// Generic App Functionality
App = {

    debug : true,

    // Initiliaztion functions & data bindings
    init : function () {

        "use strict";

         // Load verification scripts if on confirm page
        if (this.Location.page() === 'confirm') {
            App.verify.init();
        }

        // if we're on the quote page
        if (this.Location.page() === 'quote') {
            this.Geo.bind();

            // got to confirm page on submit
            $("#quote-next").click(function (e) {
                console.log('go to next');
                location.href = "quote/confirm";
                e.preventDefault();
            });

            // got to confirm page on submit
            $("#quote-recommend").click(function (e) {
                console.log('go to next');
                location.href = "industry";
                e.preventDefault();
            });

        }

        App.log('main.js loaded.');
        App.checks();


    }, // End : init

    // Tie logging to debug flag
    log : function (what) {

        "use strict";

        if (typeof console !== "undefined" && this.debug === true) {
            console.log(what);
        }
    }, // End : log

    // toggle checkmarks - should probably rename this function
    checks : function () {

        "use strict";

        $("li.checked").click(function () {
            
            var kids = $(this).children(),
                icon = kids[0],
                cl = $(this).attr('class');

            if (cl === 'unchecked') {
                $(icon).addClass('entypo-checked');
                $(icon).removeClass('entypo-unchecked');
                $(this).addClass('checked');
                $(this).removeClass('unchecked');
            }

            if (cl === 'checked') {
                $(icon).addClass('entypo-unchecked');
                $(icon).removeClass('entypo-checked');
                $(this).addClass('unchecked');
                $(this).removeClass('checked');
            }
            
        });

        $("li.unchecked").click(function () {
            
            var kids = $(this).children(),
                icon = kids[0],
                cl = $(this).attr('class');

            if (cl === 'unchecked') {
                $(icon).addClass('entypo-checked');
                $(icon).removeClass('entypo-unchecked');
                $(this).addClass('checked');
                $(this).removeClass('unchecked');
            }

            if (cl === 'checked') {
                $(icon).addClass('entypo-unchecked');
                $(icon).removeClass('entypo-checked');
                $(this).addClass('unchecked');
                $(this).removeClass('checked');
            }

        });
    }, // End : checks

    // listen to slider and update an element with it's value
    sliderValue : function (id, target, callback) {

        "use strict";

        var amt = $('#' + id).val();
        $('#' + target).html(amt);

        // if a callback was requested, call it
        if (typeof callback !== 'undefined') {
            callback();
        }
    }, // End : sliderValue

    // callback for quote sliders to update additional values
    sliderQuote : function (id, target) {

        "use strict";

        var amt = $('#' + id).val();
        $('#' + target).html('$' + Math.round(amt / 86));

    } // End : sliderQuote

}; // End : App