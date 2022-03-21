"use strict";

var LUNR_CONFIG = {
    "resultsElementId": "searchResults",  // Element to contain results
    "countElementId": "resultCount"  // Element showing number of results
};


// Get URL arguments
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Parse search results into HTML
function parseLunrResults(results) {
    var html = [];
    for (var i = 0; i < results.length; i++) {
        console.log(PREVIEW_LOOKUP[id]);
        var id = results[i]["ref"];
        var item = PREVIEW_LOOKUP[id]
        var title = item["t"];
        var title_preview = item["tp"];
        var preview = item["p"];
        var link = item["l"];
        var result = (' <div class="col-md-12 mb-lg-5 mb-md-4 mb-3"><div class="section-header"><h4 class="banner-sub-text text-light-blue font-weight-bold"><a href="' + link + '">'
                    + title + ' - ' + title_preview + '</a></</h4></div><div class="mulisoft-content"><p class="text-dark">'
                    + preview + '</p></div></div>');
        html.push(result);
    }
    if (html.length) {
        return html.join("");
    }
    else {
        return "<div class='section-header'><h2><span>Your search returned no results.</span> </h2></div>";
    }
}


function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


function showResultCount(query, total, domElementId) {
    if (total == 0) {
        return;
    }

    var s = "";
    if (total > 1) {
        s = "s";
    }
    var found = " <div class='section-header'><h2><span>Search Results for: " + query + "</span> </h2></div>";
    if (query != "" && query != null) {
        query = escapeHtml(query);
       // var forQuery = ' for <span class="result-query">' + query + '</span>';
    }
    else {
        var forQuery = "";
    }
    var element = document.getElementById(domElementId);
    //element.innerHTML = found + forQuery + "</p>";
    element.innerHTML = found;
}


function searchLunr(query) {
    var idx = lunr.Index.load(LUNR_DATA);
    // Write results to page
    var results = idx.search(query);
    var resultHtml = parseLunrResults(results);
    var elementId = LUNR_CONFIG["resultsElementId"];
    document.getElementById(elementId).innerHTML = resultHtml;

    var count = results.length;
    showResultCount(query, count, LUNR_CONFIG["countElementId"]);
}


// When the window loads, read query parameters and perform search
window.onload = function() {
    var query = getParameterByName("q");
    if (query != "" && query != null) {
        document.forms.lunrSearchForm.q.value = query;
        searchLunr(query);
    } else{
        document.getElementById('searchResults').innerHTML = "<div class='section-header'><h2><span>Your search returned no results.</span> </h2></div>";
    }
};