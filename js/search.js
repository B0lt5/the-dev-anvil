function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim().toLowerCase();

    const searchInput = document.querySelector('.nav-search input[name="q"]');
    if (searchInput) {
        searchInput.value = q;
    }

    const resultsContainer = document.getElementById("results");
    const metaEl = document.getElementById("results-meta");
    if (!resultsContainer || !metaEl) return;

    let matches = postsData;

    if (q) {
        matches = postsData.filter(function (post) {
            const haystack = [post.title, post.tags.join(" "), post.excerpt].join(" ").toLowerCase();
            return haystack.includes(q);
        });
    }

    if (q) {
        metaEl.innerHTML = "<strong>" + matches.length + "</strong> result" +
            (matches.length === 1 ? "" : "s") +
            ' for "<strong>' + escapeHtml(q) + '</strong>"';
    } else {
        metaEl.innerHTML = "Showing all <strong>" + matches.length + "</strong> articles";
    }

    if (matches.length === 0) {
        resultsContainer.innerHTML =
            '<div class="no-results">No articles found matching your search. ' +
            '<a href="search.html">View all articles</a></div>';
        return;
    }

    resultsContainer.innerHTML = matches.map(function (post) {
        return '<article class="post-card">' +
            '<a class="card-thumb" href="' + post.url + '">' +
            '<img src="' + post.image + '" alt="' + escapeHtml(post.title) + '">' +
            '</a>' +
            '<div class="post-content">' +
            '<span class="tag-chip">' + escapeHtml(post.tags[0]) + '</span>' +
            '<h3><a href="' + post.url + '">' + escapeHtml(post.title) + '</a></h3>' +
            '<p class="post-meta">By KT | ' + escapeHtml(post.date) + '</p>' +
            '<a class="read-more" href="' + post.url + '">Read More &rarr;</a>' +
            '</div>' +
            '</article>';
    }).join("");
});