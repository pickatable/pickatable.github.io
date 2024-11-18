const loadHeader = async () => {
    try {
        const response = await fetch('../components/header.html');
        if (!response.ok) throw new Error('Failed to load header');
        const header = await response.text();
        document.getElementById('header').innerHTML = header;
        initializeMenu();
    } catch (error) {
        console.error('Error loading header:', error);
    }
};

function initializeMenu() {
    const hamburger = document.getElementById('header-dropdown-icon');
    const dropdownMenu = document.getElementById('header-dropdown-menu');

    hamburger.addEventListener('click', function() {
        dropdownMenu.classList.toggle('visible');
    });

    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);