// public/js/validation.js — client-side form validation

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const passwordHint = document.getElementById('passwordHint');

  if (form) {
    form.addEventListener('submit', (e) => {
      if (passwordInput.value.length < 6) {
        e.preventDefault(); // stop the form from submitting
        passwordHint.textContent = 'Password must be at least 6 characters.';
        passwordHint.style.color = 'red';
      }
    });
  }
});