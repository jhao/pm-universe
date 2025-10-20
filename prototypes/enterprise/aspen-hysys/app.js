document.querySelectorAll('.header-role-switch').forEach((switcher) => {
  switcher.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-role]');
    if (!button) return;

    switcher.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });
  });
});

document.querySelectorAll('[data-role-container]').forEach((container) => {
  const switcher = container.querySelector('[data-role-switch]');
  const panels = container.querySelectorAll('.role-panel');

  if (!switcher) return;

  switcher.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-role]');
    if (!button) return;

    const selectedRole = button.dataset.role;

    switcher.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.role === selectedRole);
    });
  });
});

document.querySelectorAll('[data-stage-container]').forEach((container) => {
  const tabs = container.querySelectorAll('[data-stage-target]');
  const panels = container.querySelectorAll('.stage-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.stageTarget;

      tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.stage === target);
      });
    });
  });
});
