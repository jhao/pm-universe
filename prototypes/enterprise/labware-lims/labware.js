const ROLE_CONFIG = {
  sample: {
    name: '样品管理员',
    menu: [
      { id: 'role-home', label: '角色概览', file: 'index.html', icon: '📊' },
      { id: 'sample-intake', label: '样品接收工作台', file: 'sample-intake.html', icon: '📥' },
      { id: 'batch-tracking', label: '批次追踪中心', file: 'batch-tracking.html', icon: '🧾' },
      { id: 'storage-allocation', label: '存储与流转', file: 'storage-allocation.html', icon: '🏷️' },
      { id: 'sample-archive', label: '留样档案库', file: 'sample-archive.html', icon: '🗂️' },
      { id: 'sample-detail', label: '样品详情示例', file: 'sample-detail.html', icon: '🔍' }
    ],
    quickLinks: [
      { label: '接收排班', target: 'sample-intake.html' },
      { label: '批次追踪', target: 'batch-tracking.html' },
      { label: '库存调拨', target: 'storage-allocation.html' }
    ]
  },
  analyst: {
    name: '分析人员',
    menu: [
      { id: 'role-home', label: '角色概览', file: 'index.html', icon: '📊' },
      { id: 'analyst-worklist', label: '个人工作清单', file: 'analyst-worklist.html', icon: '🧪' },
      { id: 'test-execution', label: '测试执行视图', file: 'test-execution.html', icon: '⚗️' },
      { id: 'result-entry', label: '结果录入面板', file: 'result-entry.html', icon: '📝' },
      { id: 'deviation-report', label: '偏差上报', file: 'deviation-report.html', icon: '🚨' },
      { id: 'test-batch-detail', label: '批次详情示例', file: 'test-batch-detail.html', icon: '📄' }
    ],
    quickLinks: [
      { label: '我的测试', target: 'analyst-worklist.html' },
      { label: 'SOP 执行', target: 'test-execution.html' },
      { label: '结果复核', target: 'result-entry.html' }
    ]
  },
  qa: {
    name: '质量主管',
    menu: [
      { id: 'role-home', label: '角色概览', file: 'index.html', icon: '📊' },
      { id: 'qa-release', label: '审核与放行', file: 'qa-release.html', icon: '✅' },
      { id: 'report-center', label: '报告生成中心', file: 'report-center.html', icon: '📑' },
      { id: 'compliance-audit', label: '合规审计台账', file: 'compliance-audit.html', icon: '🛡️' },
      { id: 'capa-tracking', label: 'CAPA 闭环', file: 'capa-tracking.html', icon: '🔁' },
      { id: 'release-detail', label: '放行记录示例', file: 'release-detail.html', icon: '🧾' }
    ],
    quickLinks: [
      { label: '待放行批次', target: 'qa-release.html' },
      { label: '报告模板', target: 'report-center.html' },
      { label: 'CAPA 台账', target: 'capa-tracking.html' }
    ]
  },
  admin: {
    name: '系统管理员',
    menu: [
      { id: 'role-home', label: '角色概览', file: 'index.html', icon: '📊' },
      { id: 'user-admin', label: '用户与角色', file: 'user-admin.html', icon: '👥' },
      { id: 'instrument-integration', label: '仪器与接口', file: 'instrument-integration.html', icon: '🔗' },
      { id: 'system-monitoring', label: '系统监控', file: 'system-monitoring.html', icon: '🛰️' },
      { id: 'config-workbench', label: '配置工作台', file: 'config-workbench.html', icon: '⚙️' },
      { id: 'integration-log', label: '接口日志示例', file: 'integration-log.html', icon: '📡' }
    ],
    quickLinks: [
      { label: '用户审批', target: 'user-admin.html' },
      { label: '接口监控', target: 'instrument-integration.html' },
      { label: '系统健康', target: 'system-monitoring.html' }
    ]
  }
};

const DEFAULT_ROLE = 'sample';

const roleSelect = document.querySelector('[data-role-switcher]');
const menuContainer = document.querySelector('[data-menu]');
const roleLabel = document.querySelector('[data-role-label]');
const systemMenu = document.querySelector('[data-system-menu]');
const currentPageId = document.body.dataset.page;

function appendRoleParam(file, role) {
  if (!file) return '#';
  const hasQuery = file.includes('?');
  const connector = hasQuery ? '&' : '?';
  if (file.includes('role=')) {
    return file;
  }
  return `${file}${connector}role=${role}`;
}

function findRoleFromMenu(pageId) {
  for (const [roleKey, cfg] of Object.entries(ROLE_CONFIG)) {
    if (cfg.menu.some((item) => item.id === pageId)) {
      return roleKey;
    }
  }
  return null;
}

const urlRole = new URLSearchParams(window.location.search).get('role');
let currentRole = ROLE_CONFIG[urlRole] ? urlRole : null;

if (!currentRole) {
  const stored = localStorage.getItem('labware-lims-role');
  if (stored && ROLE_CONFIG[stored]) {
    currentRole = stored;
  }
}

if (!currentRole) {
  const inferred = findRoleFromMenu(currentPageId);
  currentRole = inferred || DEFAULT_ROLE;
}

function buildRoleOptions() {
  if (!roleSelect) return;
  roleSelect.innerHTML = '';
  Object.entries(ROLE_CONFIG).forEach(([key, cfg]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = cfg.name;
    roleSelect.appendChild(option);
  });
  roleSelect.value = currentRole;
}

function buildMenu() {
  if (!menuContainer) return;
  menuContainer.innerHTML = '';
  const cfg = ROLE_CONFIG[currentRole];
  cfg.menu.forEach((item) => {
    const link = document.createElement('a');
    link.href = appendRoleParam(item.file, currentRole);
    link.className = 'menu-item';
    if (item.id === currentPageId) {
      link.classList.add('active');
    }
    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.textContent = item.icon || '';
    const label = document.createElement('span');
    label.textContent = item.label;
    link.append(icon, label);
    menuContainer.appendChild(link);
  });
}

function buildSystemMenu() {
  if (!systemMenu) return;
  systemMenu.innerHTML = '';
  const cfg = ROLE_CONFIG[currentRole];
  cfg.quickLinks.forEach((item) => {
    const link = document.createElement('a');
    link.href = appendRoleParam(item.target, currentRole);
    link.textContent = item.label;
    link.className = 'system-link';
    const targetPage = cfg.menu.find((menuItem) => menuItem.file === item.target);
    if (targetPage && targetPage.id === currentPageId) {
      link.classList.add('active');
    }
    systemMenu.appendChild(link);
  });
}

function updateRoleLabel() {
  if (!roleLabel) return;
  roleLabel.textContent = ROLE_CONFIG[currentRole].name;
}

function toggleRolePanels() {
  const panels = document.querySelectorAll('[data-role-panel]');
  panels.forEach((panel) => {
    if (panel.dataset.rolePanel === currentRole) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

function persistRole() {
  try {
    localStorage.setItem('labware-lims-role', currentRole);
  } catch (err) {
    // ignore storage exceptions
  }
}

function initRoleSwitcher() {
  if (!roleSelect) return;
  roleSelect.addEventListener('change', (event) => {
    const nextRole = event.target.value;
    if (!ROLE_CONFIG[nextRole]) return;
    const firstMenu = ROLE_CONFIG[nextRole].menu[0];
    window.location.href = appendRoleParam(firstMenu.file, nextRole);
  });
}

function boot() {
  buildRoleOptions();
  buildMenu();
  buildSystemMenu();
  updateRoleLabel();
  toggleRolePanels();
  persistRole();
  initRoleSwitcher();
  document.body.dataset.role = currentRole;
}

boot();
