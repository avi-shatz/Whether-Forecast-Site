document.addEventListener("DOMContentLoaded", () => {
  // make a validation error,
  // if the inputs in the password and confirm fields are not identical.
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
