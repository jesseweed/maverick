/* 

= = = = = = = = = = = = = =
= ABOUT = = = = = = = = = =
= = = = = = = = = = = = = =

SCRIPT : image-hd.js

NAME : Image HD

DESCRIPTION: Javascript library for working with hi-res images (retina, hdpi, etc.)

AUTHORS :
- Jesse Weed

= = = = = = = = = = = = = =
= = = = = = = = = = = = = =


*/

/*jslint browser: true*/

// = = = = = = = = = = = = =
// 1. CONFIGURATION OPTIONS
// = = = = = = = = = = = = =

var ImageHD = {

    class_name : false, // set a class name to only update images with given class, otherwise set to false
    method : 'auto', // 'dir' => get same image name from this dir | 'append' => append to image name in same dir || 'auto' => uses dir for android & append for ios
    set_dimensions : true, // set explicit width/height to prevent img enlargement when not set
    android_dir_append : '', // ex: "drawble-" => "drawable-hdpi" || '' => 'hdpi'
    ios_dir_append : '',
    retina_prexix : '@2x', // by default, replace image.png with image@2x.png
    android : { // which andoird densities to target
        xhdpi : false,
        hdpi : false,
        mdpi : false,
        ldpi : false
    },
    retina_droid : true, // if true we will serve @2x images to XHDPI devices and ignore the rest
    autoload : false, // true => will call ImageHD.run as soon as dom has loaded
    debug : false, // set true to log what's happening in the console
    bg_img : true, // set true to update background images, though you should really do this with media queries
    bg_img_class : 'hd-bg' // required is bg_img = true | class name of elements background-image we want to replace

};

// = = = = = =
// End config
// = = = = = =


// = = = = = = = = = = = = = = = = =
// 2. DENSITY  -  Get screen density
// = = = = = = = = = = = = = = = = =

ImageHD.density = function () {

    "use strict";

    var platform = this.platform(),
        dpi = 'standard', // assume unknown dpi until we find otherwise
        res = window.devicePixelRatio; // device pixel ratio global

    // Android
    if (platform === 'android' && this.retina_droid === false) {
        if (this.method === 'auto') { this.method = 'dir'; }
        if (res > 1.5) { dpi = 'xhdpi'; // XHDPI
            } else if (res === 1.5) { dpi = 'hdpi';  // HDPI
            } else if (res === 1) { dpi = 'mdpi'; // MDPI
            } else if (res === 0.75) { dpi = 'ldpi'; } // LDPI
        // iOS
    } else if (platform === 'ios' || platform === 'mac' || this.retina_droid === true) {
        if (this.method === 'auto') { this.method = 'append'; }
        if (res > 1) { dpi = 'retina'; } // RETINA
    }

    if (this.debug === true) { this.log('current device density: ' + dpi); } // log density

    return dpi; // and we're done

};

// = = = = = =
// End DENSITY
// = = = = = =


// = = =  = = = = = = = = = = = = = = = = = =
// 3. LOG  -  Abstract logging functionality
// = = =  = = = = = = = = = = = = = = = = = =

ImageHD.log = function (what) {

    "use strict";

    /*jslint devel: true */

    if (typeof console !== "undefined") { console.log(what); }
};

// = = = =
// End LOG
// = = = =


// = = =  = = = = = = = = = = = = = = = = =
// 4. PLATFORM  -  determine platform type
// = = =  = = = = = = = = = = = = = = = = =

ImageHD.platform = function () {

    "use strict";

    var ua = navigator.userAgent.toLowerCase(),
        platform = navigator.platform.toLowerCase(),
        name = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];

    if (this.debug === true) { this.log('platform: ' + name); } // log platform

    return name;

};

// = = = = = = =
// End PLATFORM
// = = = = = = =


// = = =  = = = = = = = = = = = = = = = = = = = =
// 5. RUN  -  replace images with correct density
// = = =  = = = = = = = = = = = = = = = = = = = =

ImageHD.load = function () {

    "use strict";

    var el, img, src, name, ext, i = 0, im, new_src, w, h,
        type = this.type(),
        density = this.density(),
        platform = this.platform();

    if (density !== 'standard') {

        // replace all images
        if (this.class_name === false) {
            el = document.getElementsByTagName('img');
        // or just get images that match our class
        } else {
            el = document.getElementsByClassName(this.class_name);
        }

        // loop through images
        for (i = 0; el.length > i; i += 1) {

            img = el[i];
            src = img.src;
            name = img.src.split('/').pop();
            ext = src.split('.').pop();

            if (this.method === 'dir') { new_src = src.split(name).join(type + '/' + name); }
            if (this.method === 'append') { new_src = src.split('.' + ext).join(type + '.' + ext); }

            // update source
            if (new_src !== null && new_src !== 'undefined') {

                w = el[i].width;
                h = el[i].height;

                if (this.set_dimensions === true) {
                    el[i].width = w;
                    el[i].height = h;
                }

                el[i].src = new_src;

                if (this.debug === true) { this.log(src + ' replaced with ' + new_src); }

            }

        }

        if (this.bg_img === true) { this.setBackground(); } // replace background images

    }

};

// = = = =
// End RUN
// = = = =


// = = =  = = = = = = = = = = = = = = = = = = = = =
// 6. SET BACKGROUND  -  replace background images
// = = =  = = = = = = = = = = = = = = = = = = = = =

ImageHD.setBackground = function () {

    "use strict";

    var el, img, src, name, ext, i = 0, im, new_bg, w, h, element, style, bg,
        type = this.type(),
        density = this.density(),
        platform = this.platform();

    el = document.getElementsByClassName(this.bg_img_class); // get all matching elements

    // loop through backgrounds
    for (i = 0; el.length > i; i += 1) {
        element = el[i];
        style = window.getComputedStyle(element);
        bg = style.getPropertyValue('background-image');
        w = style.getPropertyValue('width');
        h = style.getPropertyValue('height');

        name = bg.split('/').pop(); name = name.split(')'); name = name[0];
        ext = bg.split('.').pop(); ext = ext.split(')'); ext = ext[0];

        if (this.method === 'dir') { new_bg = bg.split(name).join(type + '/' + name); }
        if (this.method === 'append') { new_bg = bg.split('.' + ext).join(type + '.' + ext); }

        // update background
        if (new_bg !== null && new_bg !== 'undefined') {

            el[i].setAttribute('style', 'background-image: ' + new_bg + '; background-size: ' + w + ' ' + h + ';');

            if (this.debug === true) { this.log(bg + ' replaced with ' + new_bg); }

        }
    }

};

// = = = = = = = = = =
// End SET BACKGROUND
// = = = = = = = = = =


// = = =  = = = = = = = = = = = = = = = = = =
// 7. TYPE  -  determine image naming schemes
// = = =  = = = = = = = = = = = = = = = = = =

ImageHD.type = function () {

    "use strict";

    var density = this.density(),
        platform = this.platform(),
        type = null;

    if (platform === 'android') {
        if (this.method === 'auto') { this.method = 'dir'; }
        type = this.android_dir_append + density;

    } else if (platform === 'ios' || platform === 'mac') {
        type = this.ios_dir_append + this.method;
        if (this.method === 'auto') { this.method = 'append'; }
        type = this.retina_prexix;
    }

    return type;

};

// = = = = =
// End TYPE
// = = = = =


// = = =  = = = = = = = = = = = = = = = = = = = = = = = = = =
// 8. AUTOLOAD  -  call ImageHD.run as soon as dom has loaded
// = = =  = = = = = = = = = = = = = = = = = = = = = = = = = =

if (ImageHD.autoload === true) {

    window.onload = function () {
        "use strict";
        ImageHD.run();
    };
}

// = = = = = = =
// End AUTOLOAD
// = = = = = = =