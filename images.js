//---------------------------------------------------
// Load image list for each regex match
//---------------------------------------------------
var IMAGE_MAP_FILE = "data/image_match.json";
var PATTERN = "pattern";
var IMAGES = "images";
var SRC = "src";
var ALT = "alt";
var IMG = "img";

Counter = 0;

// Search for an image to go with this text
function getImage(imageMap, text) {
    for (var rec of imageMap) { 
        var pattern = rec[PATTERN];
        if (pattern) {
            var regex = RegExp(pattern);
            if (regex.test(text)) {
                // We have a match so pick an image
                var idx = random(rec[IMAGES].length);
                return rec[IMAGES][idx]; 
            }
	}
    }
    return null;
}

// Not really random, but likely different each time
function random(max) {
    Counter += 1;
    return (new Date().getTime() + Counter) % max;
}

function getDefaultImage() {
    // Default to a silly cat picture
    var picnum = random(10) + 1;
    return "http://lorempixel.com/500/400/cats/" + picnum;
	
    // These are random, but only once per refresh
    //return "https://loremflickr.com/320/240/cat";
    //return "https://loremflickr.com/320/240/dog";
}

// Callback on load of image file
function onImageData(imageMap) {
    // Use img alt text to find a relevant replacement image
    $(IMG).each(function() {
        var alt = $(this).attr(ALT);
        var src = $(this).attr(SRC);

	if (alt && src) { 
            // Default to image description
            var image = getImage(imageMap, alt);
            if (!image) {
                // Fallback to image name
                image = getImage(imageMap, src);
	    }
            if (!image) {		    
                image = getDefaultImage();
            }
            $(this).removeAttr(SRC).attr(SRC, image);
        }
    });
}

// Load image map after document loads
function main() {
    const people_url = chrome.runtime.getURL(IMAGE_MAP_FILE);
    fetch(people_url)
        .then((response) => response.json())
        .then((imageMap) => onImageData(imageMap));
}

// Start
main();
