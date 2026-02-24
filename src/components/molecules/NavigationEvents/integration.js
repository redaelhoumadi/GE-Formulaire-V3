document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var gclidParam = urlParams.get('gclid');
    var referrerParam = window.location.href;
    var button = document.getElementById('gclidform');
    if (button && gclidParam) { button.href += (button.href.includes('?') ? '&' : '?') + 'gclid=' + gclidParam + '&referrer=' + referrerParam; }
});