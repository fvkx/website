document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();
  
      if (user === "admin" && pass === "admin") {
        alert("✅ Login successful!");
        window.location.href = "adminHomePage.html";
      } else {
        alert("❌ Invalid username or password!");
      }
    });
  });
  