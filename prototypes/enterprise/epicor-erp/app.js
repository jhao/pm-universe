const ROLE_CONFIG = [
  {
    id: 'production',
    name: '生产经理',
    summary: '关注排程执行、产线产能与质量预警，及时协调工单与资源。'
  },
  {
    id: 'supply',
    name: '供应链主管',
    summary: '统筹采购、库存与物流协同，保障物料齐套与供应韧性。'
  },
  {
    id: 'finance',
    name: '财务总监',
    summary: '洞察成本、利润与现金流波动，支撑经营分析与预算执行。'
  },
  {
    id: 'service',
    name: '客户服务经理',
    summary: '跟踪客户履约与售后服务交付，提高满意度与续约率。'
  },
  {
    id: 'admin',
    name: '系统管理员',
    summary: '配置主数据、权限与跨部门流程，保障系统稳定运行。'
  }
];

const DEFAULT_ROLE = 'production';
const STORAGE_KEY = 'epicor-erp-active-role';

function parseRoleList(value) {
  if (!value) return ['all'];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function setElementVisibility(element, shouldShow) {
  if (shouldShow) {
    element.classList.add('is-visible');
    element.removeAttribute('hidden');
  } else {
    element.classList.remove('is-visible');
    element.setAttribute('hidden', 'hidden');
  }
}

function applyRole(roleId, { persist = true } = {}) {
  const role = ROLE_CONFIG.find((item) => item.id === roleId) || ROLE_CONFIG[0];
  document.body.dataset.role = role.id;

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, role.id);
    } catch (error) {
      console.warn('无法写入本地存储，角色切换状态不会保留。', error);
    }
  }

  const summaryElement = document.querySelector('[data-role-summary]');
  if (summaryElement) {
    summaryElement.textContent = role.summary;
  }

  document
    .querySelectorAll('[data-role-name]')
    .forEach((node) => (node.textContent = role.name));

  document.querySelectorAll('[data-role-visibility]').forEach((node) => {
    const roles = parseRoleList(node.dataset.roleVisibility);
    const shouldShow = roles.includes('all') || roles.includes(role.id);
    setElementVisibility(node, shouldShow);
  });
}

function setupRoleSwitcher() {
  const select = document.querySelector('[data-role-select]');
  if (!select) return;

  select.innerHTML = '';
  ROLE_CONFIG.forEach((role) => {
    const option = document.createElement('option');
    option.value = role.id;
    option.textContent = role.name;
    select.appendChild(option);
  });

  const storedRole = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn('无法读取本地存储中的角色信息。', error);
      return null;
    }
  })();

  const initialRole = ROLE_CONFIG.some((role) => role.id === storedRole)
    ? storedRole
    : DEFAULT_ROLE;

  select.value = initialRole;
  applyRole(initialRole, { persist: false });

  select.addEventListener('change', (event) => {
    applyRole(event.target.value);
  });
}

function highlightNavigation() {
  const activePage = document.body.dataset.page;
  if (!activePage) return;

  document.querySelectorAll('.nav-list a').forEach((link) => {
    if (link.dataset.nav === activePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupRoleSwitcher();
  highlightNavigation();
});
