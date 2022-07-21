function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({ description: 'Search for %s' });
}
resetDefaultSuggestion();

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    resetDefaultSuggestion();
    chrome.storage.sync.get({
      omnibox_search_url: 'https://www.producthunt.com/search?q='
    }, function(items) {
      navigate(items.omnibox_search_url + text);
    });
  }
);

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}