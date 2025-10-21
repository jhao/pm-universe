const ROLE_STORAGE_KEY = 'honeywellPHD.activeRole';

const applyRole = (role) => {
  document.body.setAttribute('data-active-role', role);
  const roleLabel = document.querySelector('[data-role-label]');
  if (roleLabel) {
    roleLabel.textContent = role;
  }

  document.querySelectorAll('[data-role]').forEach((node) => {
    const roleValue = node.getAttribute('data-role');
    if (!roleValue) {
      return;
    }

    if (roleValue === 'all') {
      node.classList.remove('role-hidden');
      return;
    }

    const roles = roleValue.split(',').map((item) => item.trim());
    if (roles.includes(role)) {
      node.classList.remove('role-hidden');
    } else {
      node.classList.add('role-hidden');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.querySelector('[data-role-switcher]');

  if (!roleSelect) {
    return;
  }

  const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY);
  if (storedRole && [...roleSelect.options].some((option) => option.value === storedRole)) {
    roleSelect.value = storedRole;
  }

  applyRole(roleSelect.value);

  roleSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    window.localStorage.setItem(ROLE_STORAGE_KEY, value);
    applyRole(value);
  });
});
