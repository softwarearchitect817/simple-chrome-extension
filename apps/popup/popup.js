chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1); // Remove header
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*/*' ], // Pattern to match all http(s) pages
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders']
);

$(document).ready(function(){
    chrome.storage.sync.get({
      quick_access_url: 'https://www.producthunt.com'
    }, function(items) {
      $('#quick_access_extension_frame').on('load', function() {
        $('.loader').hide();
      });
      $('#quick_access_extension_frame').attr('src', items.quick_access_url);
    });
});