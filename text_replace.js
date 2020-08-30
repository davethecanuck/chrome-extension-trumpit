// Statics
TEXT_MAP = "data/text_replace.json";
ASIDES = "data/asides.json";

// Globals
TextMap = null;
Asides = null;
Counter = 0;

function replaceText(text) {
    // Add asides
    for (var key in Asides) {
	// Just replace the first instance
        regex = RegExp(key + "\S*", 'i');
	if (regex.test(text)) {
	    options = Asides[key]
            var idx = random(options.length);
            text = text.replace(regex, key + ", " + options[idx] + ", ");
	}
    }

    for (var key in TextMap) {
	regex = RegExp(key, 'gi');
	if (regex.test(text)) {
            text = text.replace(regex, TextMap[key]);
        }
    }
    return text;
}

function random(max) {
    Counter += 1;
    return (new Date().getTime() + Counter) % max;
}

function onTextMap(textMap) {
    console.log("onTextMap");
    TextMap = textMap;
    if (Asides) {
        scanText();
    }
}

function onAsides(asides) {
    console.log("onAsides");
    Asides = asides;
    if (TextMap) {
        scanText();
    }
}

// JQuery filter on node type 3 (text). Applies the
// replaceText function on each match
function scanText() {
    console.log("text_replace.scanText()");
    $('body :not(script)').contents().filter(function() {
        return this.nodeType === 3;
    }).replaceWith(function() {
        return replaceText(this.nodeValue);
    });
}

function main() {
    const text_map_url = chrome.runtime.getURL(TEXT_MAP);
    const asides_url = chrome.runtime.getURL(ASIDES);

    console.log("Fetch " + asides_url);
    fetch(asides_url)
        .then((response) => response.json())
        .then((asides) => onAsides(asides));

    console.log("Fetch " + text_map_url);
    fetch(text_map_url)
        .then((response) => response.json())
        .then((textMap) => onTextMap(textMap));
}

// Start
main();
