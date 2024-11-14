const loadFooter = async () => {
    try {
        const response = await fetch('../components/footer.html');
        if (!response.ok) throw new Error('Failed to load footer');
        const footerContent = await response.text();
        document.getElementById('footer-container').innerHTML = footerContent;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
};

document.addEventListener('DOMContentLoaded', loadFooter);