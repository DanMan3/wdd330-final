

export default function footerInit() {

    // Dynamic copywrite year in footer
    const today = new Date();
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = String(today.getFullYear());
    }

    // Dynamic "last modified" paragraph in footer
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }

}