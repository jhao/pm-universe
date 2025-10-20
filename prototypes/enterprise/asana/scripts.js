const initRoleSwitchers = () => {
  const switchers = document.querySelectorAll('[data-role-switcher]');
  switchers.forEach((switcher) => {
    const targetSelector = switcher.dataset.target;
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    const panels = target ? target.querySelectorAll('[data-role-panel]') : switcher.parentElement.querySelectorAll('[data-role-panel]');
    const buttons = switcher.querySelectorAll('[data-role]');

    const setActive = (role) => {
      buttons.forEach((btn) => {
        const isActive = btn.dataset.role === role;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        if (panel.dataset.rolePanel === role) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => setActive(btn.dataset.role));
    });

    if (buttons.length) {
      setActive(buttons[0].dataset.role);
    }
  });
};

const initSearchFilters = () => {
  const inputs = document.querySelectorAll('[data-search]');
  inputs.forEach((input) => {
    const targetSelector = input.dataset.target;
    if (!targetSelector) return;
    const list = document.querySelector(targetSelector);
    if (!list) return;
    const items = Array.from(list.querySelectorAll('[data-filter-item]'));
    const emptySelector = input.dataset.empty;
    const emptyEl = emptySelector ? document.querySelector(emptySelector) : null;

    const applyFilter = () => {
      const keyword = input.value.trim().toLowerCase();
      let visibleCount = 0;
      items.forEach((item) => {
        const keywords = item.dataset.keywords || '';
        const match = !keyword || keywords.toLowerCase().includes(keyword);
        item.hidden = !match;
        if (match) visibleCount += 1;
      });
      if (emptyEl) {
        emptyEl.hidden = visibleCount !== 0;
      }
    };

    input.addEventListener('input', applyFilter);
    applyFilter();
  });
};

const initViewToggles = () => {
  const toggles = document.querySelectorAll('[data-view-toggle]');
  toggles.forEach((toggle) => {
    const buttons = toggle.querySelectorAll('button[data-view]');
    const targetSelector = toggle.dataset.viewTarget;
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!target) return;
    const sections = target.querySelectorAll('[data-view-panel]');

    const setActive = (view) => {
      buttons.forEach((btn) => {
        const isActive = btn.dataset.view === view;
        btn.classList.toggle('active', isActive);
      });
      sections.forEach((panel) => {
        if (panel.dataset.viewPanel === view) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => setActive(btn.dataset.view));
    });

    if (buttons.length) {
      setActive(buttons[0].dataset.view);
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initRoleSwitchers();
  initSearchFilters();
  initViewToggles();
});
