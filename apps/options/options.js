// Saves options to chrome.storage.sync.
function save_options() {
  var quick_access_url = document.getElementById('quick_access_url').value;
  var search_url = document.getElementById('search_url').value;
  chrome.storage.sync.set({
    quick_access_url: quick_access_url,
    omnibox_search_url: search_url
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    quick_access_url: 'http://www.producthunt.com',
    omnibox_search_url: 'https://www.producthunt.com/search?q='
  }, function(items) {
    document.getElementById('quick_access_url').value = items.quick_access_url;
    document.getElementById('search_url').value = items.omnibox_search_url;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);