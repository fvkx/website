// Simple Admin Login Script

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('form');
  
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          
          // Check if username and password are both "admin"
          if (username === 'admin' && password === 'admin') {
              // Login successful
              alert('Login successful!');
              window.location.href = 'adminAlertHistory.html';
          } else {
              // Login failed
              alert('Error: Invalid username or password!');
          }
      });
  }
});