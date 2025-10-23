const ROLE_CONFIG = {
  analyst: {
    label: '业务分析师',
    defaultPage: 'index.html',
    menu: [
      { id: 'executive-dashboard', label: '执行仪表盘', href: 'index.html' },
      { id: 'cockpit-settings', label: '驾驶舱设置', href: 'cockpit-settings.html' },
      { id: 'dataset-explorer', label: '数据集浏览', href: 'dataset-explorer.html' },
      { id: 'report-builder', label: '报表创作中心', href: 'report-builder.html' }
    ]
  },
  engineer: {
    label: '数据工程师',
    defaultPage: 'data-connection-hub.html',
    menu: [
      { id: 'data-connections', label: '数据连接中心', href: 'data-connection-hub.html' },
      { id: 'dataflow-monitor', label: '数据流监控', href: 'dataflow-monitor.html' },
      { id: 'semantic-model', label: '语义模型工作台', href: 'semantic-model.html' }
    ]
  },
  admin: {
    label: '租户管理员',
    defaultPage: 'workspace-admin.html',
    menu: [
      { id: 'workspace-admin', label: '工作区与发布', href: 'workspace-admin.html' },
      { id: 'subscriptions', label: '订阅与警报', href: 'subscription-alerts.html' },
      { id: 'governance', label: '治理与合规中心', href: 'governance-center.html' }
    ]
  }
};

function buildMenu(roleKey, activePageId) {
  const nav = document.querySelector('.sidebar-nav ul');
  if (!nav) return;
  const role = ROLE_CONFIG[roleKey] || ROLE_CONFIG.analyst;
  nav.innerHTML = '';
  role.menu.forEach((item) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.dataset.pageId = item.id;
    link.innerHTML = `<span class="bullet"></span><span>${item.label}</span>`;
    if (item.id === activePageId) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    li.appendChild(link);
    nav.appendChild(li);
  });
}

function initRoleSelect(currentRole) {
  const select = document.getElementById('roleSelect');
  if (!select) return;
  Object.entries(ROLE_CONFIG).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value.label;
    if (key === currentRole) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener('change', (event) => {
    const targetRole = event.target.value;
    const config = ROLE_CONFIG[targetRole];
    if (config) {
      window.location.href = config.defaultPage;
    }
  });
}

function initShell() {
  const body = document.body;
  const currentRole = body.dataset.role || 'analyst';
  const activePageId = body.dataset.page || null;
  buildMenu(currentRole, activePageId);
  initRoleSelect(currentRole);
}

document.addEventListener('DOMContentLoaded', initShell);
