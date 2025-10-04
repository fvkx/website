// Character counter for message
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');

if (messageInput && charCount) {
    messageInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        
        // Change color if approaching limit
        if (this.value.length > 140) {
            charCount.style.color = '#e74c3c';
        } else if (this.value.length > 120) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#65676b';
        }
    });
}

// Send button functionality
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', function() {
        const disasterType = document.getElementById('disasterType').value;
        const severity = document.getElementById('severity').value;
        const message = document.getElementById('message').value;
        
        if (!disasterType || !severity || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (message.length > 160) {
            alert('Message is too long. Maximum 160 characters allowed.');
            return;
        }
        
        // In a real application, this would send the data to a server
        alert(`Alert sent to all users!\n\nDisaster: ${disasterType}\nSeverity: ${severity}\nMessage: ${message}`);
        
        // Reset form
        document.getElementById('smsForm').reset();
        charCount.textContent = '0';
        charCount.style.color = '#65676b';
    });
}

// Cancel button functionality
const cancelBtn = document.getElementById('cancelBtn');
if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            document.getElementById('smsForm').reset();
            if (charCount) {
                charCount.textContent = '0';
                charCount.style.color = '#65676b';
            }
        }
    });
}