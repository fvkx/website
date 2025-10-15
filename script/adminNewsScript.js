// Logout handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored session data
        // sessionStorage.clear(); // Can't use in Claude artifacts
        
        // Redirect to login page or home
        alert('Logging out...');
        window.location.href = 'HomePage.html'; 
    }
}

// Image upload handler (placeholder)
document.getElementById('imageInput').addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length > 0) {
        alert(`${files.length} image(s) selected. Connect to your backend to upload.`);
        // Add your image upload logic here
    }
});
