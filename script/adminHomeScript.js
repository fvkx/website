// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Character counter
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    messageInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 160) {
            charCount.style.color = '#e74c3c';
        } else if (count > 140) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#65676b';
        }
    });

    // Send alert
    document.getElementById('sendBtn').addEventListener('click', function() {
        const disasterType = document.getElementById('disasterType').value;
        const severity = document.getElementById('severity').value;
        const message = document.getElementById('message').value;

        if (!disasterType || !severity || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Create formatted confirmation message with user inputs
        const confirmMessage = `Are you sure you want to send this alert?\n\n` +
                              `Disaster Type: ${disasterType}\n` +
                              `Severity: ${severity}\n` +
                              `Message: ${message}\n\n` +
                              `Recipients: 1,247 people`;

        if (confirm(confirmMessage)) {
            // Create success message with user inputs
            const successMessage = `Alert sent successfully!\n\n` +
                                  `Disaster Type: ${disasterType}\n` +
                                  `Severity: ${severity}\n` +
                                  `Message: ${message}\n` +
                                  `Sent to: 1,247 recipients`;
            
            alert(successMessage);
            
            // Add your send logic here
            document.getElementById('smsForm').reset();
            charCount.textContent = '0';
        }
    });

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            document.getElementById('smsForm').reset();
            charCount.textContent = '0';
        }
    });
});

// Logout handler (outside DOMContentLoaded so it's globally accessible)
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
        window.location.href = "HomePage.html"; // redirect to your homepage
    }
}