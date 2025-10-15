// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {

    const sendBtn = document.getElementById("sendBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const messageInput = document.getElementById("message");
    const charCount = document.getElementById("charCount");

    // 🧾 Update character counter
    messageInput.addEventListener("input", function () {
        charCount.textContent = messageInput.value.length;
    });

    // 🚨 Handle Send Alert button
    sendBtn.addEventListener("click", function () {
        const disasterType = document.getElementById("disasterType").value;
        const severity = document.getElementById("severity").value;
        const message = messageInput.value.trim();

        if (!disasterType || !severity || !message) {
            alert("⚠️ Please fill out all fields before sending an alert.");
            return;
        }

        // Confirm before sending
        const confirmSend = confirm(`Send ${severity.toUpperCase()} alert for ${disasterType.toUpperCase()}?`);
        if (confirmSend) {
            alert("✅ Alert has been sent successfully!");
            document.getElementById("smsForm").reset();
            charCount.textContent = "0";
        }
    });

    // ❌ Handle Cancel button
    cancelBtn.addEventListener("click", function () {
        const confirmCancel = confirm("Are you sure you want to clear this form?");
        if (confirmCancel) {
            document.getElementById("smsForm").reset();
            charCount.textContent = "0";
            alert("Form cleared.");
        }
    });
});

// 🔐 Logout confirmation
function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        alert("You have been logged out.");
        window.location.href = "HomePage.html"; // redirect to homepage
    }
}
