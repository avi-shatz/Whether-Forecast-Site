document.addEventListener("DOMContentLoaded", () => {

  const password = document.querySelector('input[name=password]');
  const confirm = document.querySelector('input[name=confirm]');

  function onChange() {

    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
  }

  password.addEventListener("change", () => onChange());
  confirm.addEventListener("change", () => onChange());
});
