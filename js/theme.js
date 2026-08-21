function initThemeToggle() {
    const html = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    // Sync icon on load
    syncIcon();

    toggleBtn.addEventListener("click", function () {
        const isDark = html.hasAttribute("data-theme");
        if (isDark) {
            html.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
        syncIcon();
    });

    function syncIcon() {
        const isDark = html.hasAttribute("data-theme");
        const moonIcon = toggleBtn.querySelector(".fa-moon");
        const sunIcon = toggleBtn.querySelector(".fa-sun");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = isDark ? "none" : "inline-block";
            sunIcon.style.display = isDark ? "inline-block" : "none";
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
    initThemeToggle();
}