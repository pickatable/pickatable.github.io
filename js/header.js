const loadHeader = async () => {
    const headerContainer = document.getElementById('header-container');
    
    try {
        const response = await fetch('components/header.html');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const headerContent = await response.text();
        headerContainer.innerHTML = headerContent;
        
        // Initialize menu functionality
        initializeMenu();
    } catch (error) {
        console.error('Error loading header:', error);
        headerContainer.innerHTML = '<p>Error loading header</p>';
    }
};

function initializeMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    hamburgerIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const buttonContainer = document.querySelector('.button-container');

        if (!dropdownMenu.contains(event.target) && !buttonContainer.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);