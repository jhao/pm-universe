const ROLE_CONFIG = {
  agent: {
    label: '客服代表',
    summary: '聚焦个人工单处理效率、客户上下文与即时沟通。',
    menu: [
      { id: 'overview', label: '全局概览', href: 'index.html', icon: '🏠', scope: 'shared' },
      { id: 'agent-workspace', label: '智能工作台', href: 'agent-workspace.html', icon: '🧰' },
      { id: 'live-chat', label: '实时对话中心', href: 'live-chat-console.html', icon: '💬' },
      { id: 'customer-360', label: '客户 360 视图', href: 'customer-360.html', icon: '🧭' },
      { id: 'ticket-detail', label: '工单详情示例', href: 'ticket-detail.html', icon: '📄' }
    ]
  },
  supervisor: {
    label: '客服主管',
    summary: '监控队列与 SLA，协调人力排班并处理升级请求。',
    menu: [
      { id: 'overview', label: '全局概览', href: 'index.html', icon: '🏠', scope: 'shared' },
      { id: 'queue-monitor', label: '队列监控中心', href: 'queue-monitor.html', icon: '📊' },
      { id: 'sla-planning', label: '排班与 SLA 控制塔', href: 'sla-planning.html', icon: '🗓️' },
      { id: 'quality-review', label: '质量审核面板', href: 'quality-review.html', icon: '🧪' }
    ]
  },
  analyst: {
    label: '运营分析师',
    summary: '洞察渠道表现与自动化回报，驱动持续优化。',
    menu: [
      { id: 'overview', label: '全局概览', href: 'index.html', icon: '🏠', scope: 'shared' },
      { id: 'analytics-insights', label: '运营分析仪表盘', href: 'analytics-insights.html', icon: '📈' },
      { id: 'channel-analytics', label: '渠道体验分析', href: 'channel-analytics.html', icon: '🌐' },
      { id: 'automation-performance', label: '自动化成效中心', href: 'automation-performance.html', icon: '🤖' }
    ]
  }
};

const storageKey = 'zendesk-support-suite-role';

function initRoleSwitcher() {
  const body = document.body;
  const defaultRole = body.dataset.defaultRole || 'agent';
  const storedRole = window.localStorage?.getItem(storageKey);
  const initialRole = storedRole && ROLE_CONFIG[storedRole] ? storedRole : defaultRole;
  let activeRole = initialRole;

  const roleSwitcher = document.querySelector('[data-role-switcher]');
  if (roleSwitcher) {
    roleSwitcher.innerHTML = '';
    Object.entries(ROLE_CONFIG).forEach(([role, config]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = config.label;
      btn.dataset.role = role;
      if (role === activeRole) btn.classList.add('active');
      btn.addEventListener('click', () => {
        if (activeRole !== role) {
          activeRole = role;
          window.localStorage?.setItem(storageKey, role);
          body.dataset.activeRole = role;
          updateRoleSwitcher(roleSwitcher, activeRole);
          rebuildMenu(activeRole);
          updateRoleSummary(activeRole);
          toggleRoleViews(activeRole);
        }
      });
      roleSwitcher.appendChild(btn);
    });
  }

  body.dataset.activeRole = activeRole;
  rebuildMenu(activeRole);
  updateRoleSummary(activeRole);
  toggleRoleViews(activeRole);
}

function updateRoleSwitcher(container, activeRole) {
  container.querySelectorAll('button').forEach((btn) => {
    if (btn.dataset.role === activeRole) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function rebuildMenu(activeRole) {
  const config = ROLE_CONFIG[activeRole];
  const menuContainer = document.querySelector('[data-menu]');
  if (!menuContainer || !config) return;

  menuContainer.innerHTML = '';

  const sections = new Map();
  config.menu.forEach((item) => {
    const sectionKey = item.scope === 'shared' ? 'shared' : 'role';
    if (!sections.has(sectionKey)) {
      sections.set(sectionKey, []);
    }
    sections.get(sectionKey).push(item);
  });

  sections.forEach((items, key) => {
    const section = document.createElement('div');
    section.className = 'menu-section';

    const title = document.createElement('div');
    title.className = 'menu-section-title';
    title.textContent = key === 'shared' ? '公共视图' : ROLE_CONFIG[activeRole].label + '工作台';
    section.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'menu-list';

    items.forEach((item) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      link.dataset.menuId = item.id;

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = item.icon || '•';
      link.appendChild(icon);

      const text = document.createElement('span');
      text.textContent = item.label;
      link.appendChild(text);

      const currentPage = document.body.dataset.page;
      if (currentPage && currentPage === item.id) {
        link.classList.add('active');
      }

      li.appendChild(link);
      list.appendChild(li);
    });

    section.appendChild(list);
    menuContainer.appendChild(section);
  });
}

function updateRoleSummary(activeRole) {
  const summaryEl = document.querySelector('[data-role-summary]');
  if (summaryEl) {
    summaryEl.textContent = ROLE_CONFIG[activeRole]?.summary || '';
  }
}

function toggleRoleViews(activeRole) {
  document.querySelectorAll('[data-role-view]').forEach((el) => {
    const roles = (el.dataset.roleView || '').split(',').map((s) => s.trim()).filter(Boolean);
    const visible = roles.length === 0 || roles.includes('all') || roles.includes(activeRole);
    el.hidden = !visible;
  });

  document.querySelectorAll('[data-role-locked]').forEach((el) => {
    const roles = (el.dataset.roleLocked || '').split(',').map((s) => s.trim()).filter(Boolean);
    const locked = roles.length > 0 && !roles.includes(activeRole);
    el.hidden = locked;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRoleSwitcher();
});
