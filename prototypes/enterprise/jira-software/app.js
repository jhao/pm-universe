const roles = {
  product: {
    key: 'product',
    label: '产品经理',
    summary: '规划产品方向，维护需求优先级与路线图',
    menu: [
      { id: 'overview', label: '项目总览', icon: '📊', path: 'index.html' },
      { id: 'backlog', label: '需求池', icon: '🗂️', path: 'backlog.html' },
      { id: 'roadmap', label: '路线图', icon: '🛣️', path: 'roadmap.html' },
      { id: 'insights', label: '客户洞察', icon: '💡', path: 'customer-insights.html' }
    ]
  },
  scrum: {
    key: 'scrum',
    label: 'Scrum Master',
    summary: '保障节奏与流程，跟踪 Sprint 质量与发布准备度',
    menu: [
      { id: 'sprint-board', label: 'Sprint 看板', icon: '🧭', path: 'sprint-board.html' },
      { id: 'release-plan', label: '发布计划', icon: '🚀', path: 'release-plan.html' },
      { id: 'retrospective', label: '回顾会议', icon: '📝', path: 'retrospective.html' },
      { id: 'automation', label: '自动化规则', icon: '⚙️', path: 'automation-rules.html' }
    ]
  },
  dev: {
    key: 'dev',
    label: '开发者',
    summary: '专注实现需求、修复缺陷并保持持续交付',
    menu: [
      { id: 'my-work', label: '我的任务', icon: '✅', path: 'my-work.html' },
      { id: 'code', label: '代码集成', icon: '🧪', path: 'code-integration.html' },
      { id: 'bugs', label: '缺陷追踪', icon: '🐞', path: 'bug-tracker.html' },
      { id: 'docs', label: '技术文档', icon: '📚', path: 'tech-docs.html' }
    ]
  },
  executive: {
    key: 'executive',
    label: '业务负责人',
    summary: '关注交付节奏、资源投入与风险态势',
    menu: [
      { id: 'reports', label: '进度报告', icon: '📈', path: 'progress-report.html' },
      { id: 'resources', label: '资源排期', icon: '🧩', path: 'resource-planning.html' },
      { id: 'portfolio', label: '项目组合', icon: '🏢', path: 'portfolio-dashboard.html' },
      { id: 'risks', label: '风险概览', icon: '⚠️', path: 'risk-overview.html' }
    ]
  }
};

const DEFAULT_ROLE = 'product';

const getCurrentRoleKey = () => {
  const params = new URLSearchParams(window.location.search);
  const roleKey = params.get('role');
  return roles[roleKey] ? roleKey : DEFAULT_ROLE;
};

const updateUrlWithRole = (urlString, roleKey) => {
  const directoryUrl = new URL('.', window.location.href);
  const url = new URL(urlString, directoryUrl);
  url.searchParams.set('role', roleKey);
  return `${url.pathname}${url.search}${url.hash}`;
};

const renderSideMenu = (role, activePageId) => {
  const menuContainer = document.querySelector('[data-region="side-nav"]');
  if (!menuContainer) return;

  menuContainer.innerHTML = '';

  role.menu.forEach((item) => {
    const link = document.createElement('a');
    link.className = 'sidebar-link';
    if (item.id === activePageId) {
      link.classList.add('is-active');
    }
    link.href = updateUrlWithRole(item.path, role.key);
    link.dataset.keepRole = 'true';

    const icon = document.createElement('span');
    icon.className = 'sidebar-link__icon';
    icon.textContent = item.icon;

    const label = document.createElement('span');
    label.className = 'sidebar-link__label';
    label.textContent = item.label;

    link.appendChild(icon);
    link.appendChild(label);

    menuContainer.appendChild(link);
  });
};

const renderRoleSwitcher = (roleKey) => {
  const switcher = document.querySelector('[data-region="role-switcher"]');
  if (!switcher) return;

  const label = document.createElement('label');
  label.textContent = '角色';

  const select = document.createElement('select');
  Object.values(roles).forEach((role) => {
    const option = document.createElement('option');
    option.value = role.key;
    option.textContent = role.label;
    if (role.key === roleKey) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    const newRole = event.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set('role', newRole);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.location.href = newUrl;
  });

  switcher.innerHTML = '';
  switcher.appendChild(label);
  switcher.appendChild(select);
};

const injectRoleMeta = (role) => {
  const roleLabels = document.querySelectorAll('[data-role-name]');
  roleLabels.forEach((node) => {
    node.textContent = role.label;
  });

  const summaries = document.querySelectorAll('[data-role-summary]');
  summaries.forEach((node) => {
    node.textContent = role.summary;
  });
};

const decorateRoleAwareLinks = (roleKey) => {
  document.querySelectorAll('a[data-keep-role], button[data-keep-role]').forEach((node) => {
    const href = node.getAttribute('href');
    if (!href) return;
    node.setAttribute('href', updateUrlWithRole(href, roleKey));
  });
};

const init = () => {
  const activePageId = document.body.dataset.pageId || 'overview';
  const roleKey = getCurrentRoleKey();
  const role = roles[roleKey];

  renderSideMenu(role, activePageId);
  renderRoleSwitcher(roleKey);
  injectRoleMeta(role);
  decorateRoleAwareLinks(roleKey);

  document.body.dataset.role = roleKey;
};

document.addEventListener('DOMContentLoaded', init);
