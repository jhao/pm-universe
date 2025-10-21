const roles = {
  plantManager: {
    id: 'plantManager',
    name: '工厂经理',
    badge: '管理层视角',
    summary: '聚焦经营指标、订单兑现与供应协同，快速识别风险并驱动跨部门行动。',
    personaTag: '年度交付与利润达成',
    menu: [
      { id: 'plant-dashboard', label: '经营驾驶舱', icon: '📊' },
      { id: 'sales-demand', label: '订单与预测', icon: '🧾' },
      { id: 'supply-chain', label: '供应链协同', icon: '🔗' }
    ]
  },
  productionPlanner: {
    id: 'productionPlanner',
    name: '计划经理',
    badge: '计划排程视角',
    summary: '执行 S&OP、MRP 与 APS 排程，平衡需求、产能与物料，保障可承诺交期。',
    personaTag: '交付承诺与产能均衡',
    menu: [
      { id: 'planner-board', label: '主计划中心', icon: '🗓️' },
      { id: 'material-availability', label: '物料可用性', icon: '📦' },
      { id: 'plan-simulation', label: '排程模拟', icon: '🧮' }
    ]
  },
  shopSupervisor: {
    id: 'shopSupervisor',
    name: '车间主管',
    badge: '执行监控视角',
    summary: '监控工单执行、人员工时与设备状态，确保生产节拍与质量一致。',
    personaTag: '产线节拍与执行效率',
    menu: [
      { id: 'shopfloor-execution', label: '工单执行板', icon: '🏭' },
      { id: 'labor-timekeeping', label: '人员工时', icon: '👷' },
      { id: 'maintenance-schedule', label: '设备维护', icon: '🛠️' }
    ]
  },
  qualityEngineer: {
    id: 'qualityEngineer',
    name: '质量工程师',
    badge: '质量闭环视角',
    summary: '掌控过程质量、检验计划与不合格处理，推动持续改进。',
    personaTag: '零缺陷与合规',
    menu: [
      { id: 'quality-dashboard', label: '质量监控台', icon: '✅' },
      { id: 'inspection-workbench', label: '检验工作台', icon: '🔍' },
      { id: 'supplier-quality', label: '供应商质量', icon: '🤝' }
    ]
  },
  serviceManager: {
    id: 'serviceManager',
    name: '售后服务经理',
    badge: '服务协同视角',
    summary: '统筹服务请求、派工与装机资产，延伸客户全生命周期体验。',
    personaTag: '客户成功与续约',
    menu: [
      { id: 'service-control-center', label: '服务指挥台', icon: '🛰️' },
      { id: 'field-ticket', label: '现场工单', icon: '🚚' },
      { id: 'installed-base', label: '装机资产', icon: '🧩' }
    ]
  }
};

const pages = {};

let currentRole = 'plantManager';
let currentPage = null;

function createOption(value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  return option;
}

function renderRoleContext(role) {
  document.getElementById('roleBadge').textContent = role.badge;
  document.getElementById('roleTitle').textContent = `${role.name}工作台`;
  document.getElementById('roleSummary').textContent = role.summary;
  document.getElementById('rolePersonaTag').textContent = role.personaTag;
}

function renderMenu(role) {
  const container = document.getElementById('sidebarMenu');
  container.innerHTML = '';

  role.menu.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'menu-item';
    button.dataset.pageId = item.id;
    button.innerHTML = `<span class="menu-icon">${item.icon}</span><span>${item.label}</span>`;
    container.appendChild(button);
  });
}

function highlightMenu(pageId) {
  const buttons = document.querySelectorAll('#sidebarMenu .menu-item');
  buttons.forEach((btn) => {
    if (btn.dataset.pageId === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function buildBreadcrumbs(page, role) {
  if (page.breadcrumbs && page.breadcrumbs.length) {
    return page.breadcrumbs;
  }

  const trail = [role.name];
  const menuItem = role.menu.find((item) => item.id === currentPage);
  if (menuItem) {
    trail.push(menuItem.label);
  }
  trail.push(page.title);
  return trail;
}

function renderPage(pageId) {
  const page = pages[pageId];
  if (!page) {
    return;
  }

  currentPage = pageId;
  const role = roles[currentRole];
  const wrapper = document.getElementById('pageWrapper');

  const breadcrumbs = buildBreadcrumbs(page, role)
    .map((text) => `<span>${text}</span>`)
    .join('');

  const metrics = page.metrics
    ? `<div class="page-metrics">${page.metrics
        .map((metric) => `<span class=\"metric-pill\">${metric}</span>`)
        .join('')}</div>`
    : '';

  wrapper.innerHTML = `
    ${page.backTo ? `<button class="back-link" data-target-page="${page.backTo}">← 返回 ${pages[page.backTo]?.title ?? ''}</button>` : ''}
    <div class="breadcrumbs">${breadcrumbs}</div>
    <div class="page-header">
      <div>
        <h2 class="page-title">${page.title}</h2>
        ${page.subtitle ? `<p class="page-subtitle">${page.subtitle}</p>` : ''}
      </div>
      ${metrics}
    </div>
    <div class="page-body">${page.hero}</div>
    ${page.details ? `<div class="page-footnote">${page.details}</div>` : ''}
  `;

  highlightMenu(pageId);
}

function setRole(roleId, navigate = true) {
  const role = roles[roleId];
  if (!role) {
    return;
  }
  currentRole = roleId;
  renderRoleContext(role);
  renderMenu(role);
  highlightMenu('');
  if (navigate) {
    const firstPage = role.menu[0]?.id;
    if (firstPage) {
      renderPage(firstPage);
    }
  }
}

function handleMenuClick(event) {
  const target = event.target.closest('[data-page-id]');
  if (!target) return;
  const pageId = target.dataset.pageId;
  if (pageId) {
    renderPage(pageId);
  }
}

function handleActionNavigation(event) {
  const link = event.target.closest('[data-target-page]');
  if (!link) return;
  const targetPage = link.dataset.targetPage;
  if (targetPage && pages[targetPage]) {
    event.preventDefault();
    renderPage(targetPage);
  }
}

function init() {
  const roleSelect = document.getElementById('roleSelect');
  Object.values(roles).forEach((role) => {
    roleSelect.appendChild(createOption(role.id, role.name));
  });
  roleSelect.value = currentRole;
  roleSelect.addEventListener('change', (event) => {
    const nextRole = event.target.value;
    setRole(nextRole, true);
  });

  document.getElementById('sidebarMenu').addEventListener('click', handleMenuClick);
  document.getElementById('pageWrapper').addEventListener('click', handleActionNavigation);

  setRole(currentRole, true);
}
pages['plant-dashboard'] = {
  title: '经营驾驶舱',
  subtitle: '实时掌握交付、成本与产能状况，识别风险并触发应对。',
  breadcrumbs: ['工厂经理', '经营驾驶舱'],
  metrics: ['交付风险 5 单', '异常工序 8 个'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">核心 KPI</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="capacity-alerts">预警中心</button>
          <button class="ghost-link" data-target-page="financial-snapshot">财务概览</button>
        </div>
      </header>
      <div class="panel-grid">
        <article class="kpi-card critical">
          <span class="kpi-label">准时交付率</span>
          <span class="kpi-value">82%</span>
          <span class="trend-down">↓ -6.5%</span>
          <button class="ghost-link" data-target-page="order-delays">查看延迟订单</button>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">产能利用率</span>
          <span class="kpi-value">91%</span>
          <span class="trend-up">↑ +3.2%</span>
          <button class="ghost-link" data-target-page="capacity-alerts">产能瓶颈分析</button>
        </article>
        <article class="kpi-card success">
          <span class="kpi-label">毛利率</span>
          <span class="kpi-value">24.6%</span>
          <span class="trend-up">↑ +1.1%</span>
          <button class="ghost-link" data-target-page="financial-snapshot">查看利润看板</button>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">库存周转（天）</span>
          <span class="kpi-value">46</span>
          <span class="trend-down">↓ -3</span>
          <button class="ghost-link" data-target-page="inventory-health">库存健康度</button>
        </article>
      </div>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">交付风险看板</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="customer-commitment">承诺回顾</button>
        </div>
      </header>
      <div class="split-grid">
        <div>
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>客户</th>
                <th>预计发货</th>
                <th>状态</th>
                <th>下一动作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><button class="action-link" data-target-page="order-detail">SO-10245</button></td>
                <td>博信医疗</td>
                <td>6月12日</td>
                <td><span class="status-badge status-critical">高风险</span></td>
                <td>等待 APS 重排</td>
              </tr>
              <tr>
                <td><button class="action-link" data-target-page="order-detail">SO-10231</button></td>
                <td>华腾自动化</td>
                <td>6月10日</td>
                <td><span class="status-badge status-warning">关注</span></td>
                <td>缺料确认</td>
              </tr>
              <tr>
                <td><button class="action-link" data-target-page="order-detail">SO-10212</button></td>
                <td>凌创科技</td>
                <td>6月09日</td>
                <td><span class="status-badge status-success">正常</span></td>
                <td>计划准时</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div class="panel" style="padding: 18px 20px;">
            <header>
              <h4 class="panel-title">产能负荷趋势</h4>
            </header>
            <div class="chart-bars">
              <div class="chart-bar" style="height: 60%;">
                <span class="value">76%</span>
                <span>周一</span>
              </div>
              <div class="chart-bar" style="height: 75%;">
                <span class="value">84%</span>
                <span>周二</span>
              </div>
              <div class="chart-bar" style="height: 85%; background: rgba(239, 68, 68, 0.35);">
                <span class="value">97%</span>
                <span>周三</span>
              </div>
              <div class="chart-bar" style="height: 78%;">
                <span class="value">88%</span>
                <span>周四</span>
              </div>
              <div class="chart-bar" style="height: 68%;">
                <span class="value">72%</span>
                <span>周五</span>
              </div>
            </div>
            <button class="ghost-link" data-target-page="capacity-alerts">查看产能瓶颈分布</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <strong>场景重点：</strong>
    <ul>
      <li>按角色聚合 KPI，并可深入查看产能、库存、财务等看板。</li>
      <li>交付风险列表可直接跳转订单详情或触发 APS 重排。</li>
    </ul>
  `
};

pages['capacity-alerts'] = {
  title: '产能瓶颈预警',
  subtitle: '识别占用率超阈值的关键资源并下钻至工单级别。',
  breadcrumbs: ['工厂经理', '经营驾驶舱', '产能瓶颈预警'],
  backTo: 'plant-dashboard',
  metrics: ['需重排 3 工单', '建议外协 1 项'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">资源超载情况</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="plan-simulation">推送给 APS 重排</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>资源</th>
            <th>班次</th>
            <th>负荷</th>
            <th>超载时段</th>
            <th>影响工单</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>数控线#3</td>
            <td>早班</td>
            <td>118%</td>
            <td>6月12日 08:00-12:00</td>
            <td><button class="action-link" data-target-page="operation-tracking">WO-8801</button></td>
          </tr>
          <tr>
            <td>焊接单元#2</td>
            <td>中班</td>
            <td>109%</td>
            <td>6月12日 16:00-20:00</td>
            <td><button class="action-link" data-target-page="operation-tracking">WO-8794</button></td>
          </tr>
          <tr>
            <td>热处理炉#1</td>
            <td>晚班</td>
            <td>105%</td>
            <td>6月13日 00:00-03:00</td>
            <td><button class="action-link" data-target-page="operation-tracking">WO-8779</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">瓶颈工序 Gantt</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="planner-board">跳转主计划</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>今日</h4>
          <div class="card-item">
            <strong>WO-8801 工序20</strong>
            <div class="card-meta"><span>08:00-10:30</span><span class="badge">客户：博信</span></div>
            <button class="ghost-link" data-target-page="operation-tracking">查看执行</button>
          </div>
          <div class="card-item">
            <strong>WO-8794 工序30</strong>
            <div class="card-meta"><span>16:00-19:00</span><span class="badge">需转产</span></div>
          </div>
        </div>
        <div class="lane-column">
          <h4>明日</h4>
          <div class="card-item">
            <strong>WO-8811 工序10</strong>
            <div class="card-meta"><span>07:30-09:00</span><span class="badge">建议外协</span></div>
            <button class="ghost-link" data-target-page="outsourcing-request">发起外协</button>
          </div>
          <div class="card-item">
            <strong>WO-8788 工序40</strong>
            <div class="card-meta"><span>21:00-23:00</span><span class="badge">待确认</span></div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>展示资源超载清单，并可直接跳转至 APS 模拟或工单执行详情。</li>
      <li>Gantt 摘要提供今日/明日瓶颈工序的应对动作。</li>
    </ul>
  `
};

pages['financial-snapshot'] = {
  title: '财务概览',
  subtitle: '关联经营指标的实时毛利、成本与现金流表现。',
  breadcrumbs: ['工厂经理', '经营驾驶舱', '财务概览'],
  backTo: 'plant-dashboard',
  metrics: ['毛利率 24.6%', '现金流健康'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">损益监控</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="inventory-health">库存与现金占用</button>
        </div>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">收入 / 成本</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>类别</th>
                <th>本月实际</th>
                <th>预算偏差</th>
                <th>趋势</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>营业收入</td>
                <td>¥1260万</td>
                <td class="trend-down">-3%</td>
                <td>需求短缺</td>
              </tr>
              <tr>
                <td>直接材料</td>
                <td>¥510万</td>
                <td class="trend-up">+2%</td>
                <td>原料涨价</td>
              </tr>
              <tr>
                <td>制造费用</td>
                <td>¥185万</td>
                <td class="trend-up">+1%</td>
                <td>能源成本</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">利润桥</h4>
          </header>
          <div class="chart-bars" style="height: 220px;">
            <div class="chart-bar" style="height: 80%; background: rgba(34, 197, 94, 0.3);">
              <span class="value">+120</span>
              <span>价格</span>
            </div>
            <div class="chart-bar" style="height: 55%; background: rgba(248, 113, 113, 0.35);">
              <span class="value">-85</span>
              <span>成本</span>
            </div>
            <div class="chart-bar" style="height: 30%; background: rgba(37, 99, 235, 0.35);">
              <span class="value">+45</span>
              <span>效率</span>
            </div>
            <div class="chart-bar" style="height: 20%; background: rgba(37, 99, 235, 0.2);">
              <span class="value">+18</span>
              <span>服务</span>
            </div>
          </div>
          <button class="primary-button" data-target-page="sales-demand">查看订单结构</button>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>连接 ERP 财务与制造指标，辅助价格、成本、效率的管理决策。</li>
    </ul>
  `
};

pages['inventory-health'] = {
  title: '库存健康度',
  subtitle: '透视 ABC 分类、呆滞料与现金占用情况，识别优化机会。',
  breadcrumbs: ['工厂经理', '经营驾驶舱', '库存健康度'],
  backTo: 'plant-dashboard',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">库存结构</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="material-availability">查看可用性</button>
        </div>
      </header>
      <div class="split-grid">
        <div>
          <table>
            <thead>
              <tr>
                <th>分类</th>
                <th>金额 (¥)</th>
                <th>占比</th>
                <th>周转天数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>6,300,000</td>
                <td>46%</td>
                <td>22</td>
              </tr>
              <tr>
                <td>B</td>
                <td>4,100,000</td>
                <td>30%</td>
                <td>37</td>
              </tr>
              <tr>
                <td>C</td>
                <td>3,200,000</td>
                <td>24%</td>
                <td class="trend-down">58</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">呆滞物料</h4>
            <div class="panel-actions">
              <button class="ghost-link" data-target-page="material-exception">生成处置任务</button>
            </div>
          </header>
          <table>
            <thead>
              <tr>
                <th>物料编码</th>
                <th>描述</th>
                <th>库存</th>
                <th>天数</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RM-5582</td>
                <td>特规钢板</td>
                <td>420 件</td>
                <td>180</td>
                <td><span class="status-badge status-critical">超阈值</span></td>
              </tr>
              <tr>
                <td>RM-4410</td>
                <td>液压组件</td>
                <td>160 件</td>
                <td>120</td>
                <td><span class="status-badge status-warning">关注</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>提供库存结构与呆滞料名单，可直接发起处置或联动计划。</li>
    </ul>
  `
};

pages['order-delays'] = {
  title: '延迟订单列表',
  subtitle: '从订单层面掌握影响交付的瓶颈环节。',
  breadcrumbs: ['工厂经理', '经营驾驶舱', '延迟订单'],
  backTo: 'plant-dashboard',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">风险订单</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="customer-commitment">客户沟通</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>客户</th>
            <th>延迟</th>
            <th>主因</th>
            <th>应对</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button class="action-link" data-target-page="order-detail">SO-10245</button></td>
            <td>博信医疗</td>
            <td>4 天</td>
            <td>工序瓶颈</td>
            <td>APS 重排</td>
          </tr>
          <tr>
            <td><button class="action-link" data-target-page="order-detail">SO-10198</button></td>
            <td>蓝科能源</td>
            <td>2 天</td>
            <td>缺料</td>
            <td>紧急采购</td>
          </tr>
          <tr>
            <td><button class="action-link" data-target-page="order-detail">SO-10187</button></td>
            <td>威科动力</td>
            <td>1 天</td>
            <td>变更</td>
            <td>设计确认</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>与 APS、采购、工程模块联动，快速查明并驱动解决方案。</li>
    </ul>
  `
};

pages['order-detail'] = {
  title: '客户订单详情 · SO-10245',
  subtitle: '查看订单结构、排程与执行状态，协调交付。',
  breadcrumbs: ['工厂经理', '经营驾驶舱', '订单详情'],
  backTo: 'plant-dashboard',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">订单摘要</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="customer-commitment">客户承诺</button>
        </div>
      </header>
      <div class="split-grid">
        <div>
          <div class="panel" style="border-style: dashed;">
            <header>
              <h4 class="panel-title">结构</h4>
            </header>
            <table>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>数量</th>
                  <th>进度</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>主机 A200</td>
                  <td>4</td>
                  <td>72%</td>
                  <td><span class="status-badge status-warning">缺料</span></td>
                </tr>
                <tr>
                  <td>控制柜</td>
                  <td>4</td>
                  <td>54%</td>
                  <td><span class="status-badge status-critical">瓶颈</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div class="panel" style="border-style: dashed;">
            <header>
              <h4 class="panel-title">里程碑</h4>
            </header>
            <div class="lane-board">
              <div class="lane-column">
                <h4>计划</h4>
                <div class="card-item">
                  <strong>设计更改单</strong>
                  <div class="card-meta"><span>完成</span><span class="badge">5月18日</span></div>
                </div>
                <div class="card-item">
                  <strong>APS 重排</strong>
                  <div class="card-meta"><span>待执行</span><span class="badge">6月08日</span></div>
                  <button class="ghost-link" data-target-page="plan-simulation">打开排程模拟</button>
                </div>
              </div>
              <div class="lane-column">
                <h4>执行</h4>
                <div class="card-item">
                  <strong>WO-8801</strong>
                  <div class="card-meta"><span>工序 20</span><span class="badge">延期</span></div>
                  <button class="ghost-link" data-target-page="operation-tracking">查看车间执行</button>
                </div>
                <div class="card-item">
                  <strong>入库检验</strong>
                  <div class="card-meta"><span>计划 6月11日</span><span class="badge">待检验</span></div>
                  <button class="ghost-link" data-target-page="inspection-workbench">跳转检验</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>汇集结构、里程碑和工单状态，便于跨部门协同。</li>
    </ul>
  `
};

pages['sales-demand'] = {
  title: '订单与预测',
  subtitle: '从销售订单、预测和需求变更角度审视需求侧动态。',
  breadcrumbs: ['工厂经理', '订单与预测'],
  metrics: ['本月订单 186 单', '预测偏差 4.6%'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">需求组合</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="forecast-detail">预测分解</button>
        </div>
      </header>
      <div class="split-grid">
        <div>
          <table>
            <thead>
              <tr>
                <th>渠道</th>
                <th>订单额 (¥)</th>
                <th>环比</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>国内直销</td>
                <td>7,800,000</td>
                <td class="trend-up">+8%</td>
                <td><span class="status-badge status-success">稳定</span></td>
              </tr>
              <tr>
                <td>海外 OEM</td>
                <td>3,950,000</td>
                <td class="trend-down">-5%</td>
                <td><span class="status-badge status-warning">波动</span></td>
              </tr>
              <tr>
                <td>服务备件</td>
                <td>1,120,000</td>
                <td class="trend-up">+11%</td>
                <td><span class="status-badge status-success">增长</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">需求脉冲</h4>
          </header>
          <div class="chart-bars" style="height: 220px;">
            <div class="chart-bar" style="height: 50%;">
              <span class="value">+6%</span>
              <span>周一</span>
            </div>
            <div class="chart-bar" style="height: 90%; background: rgba(249, 115, 22, 0.35);">
              <span class="value">+22%</span>
              <span>周二</span>
            </div>
            <div class="chart-bar" style="height: 40%;">
              <span class="value">+4%</span>
              <span>周三</span>
            </div>
            <div class="chart-bar" style="height: 65%;">
              <span class="value">+12%</span>
              <span>周四</span>
            </div>
            <div class="chart-bar" style="height: 55%;">
              <span class="value">+7%</span>
              <span>周五</span>
            </div>
          </div>
          <button class="primary-button" data-target-page="customer-commitment">调整客户承诺</button>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>支持从渠道、地区、产品组合审视需求变化，连接预测与承诺流程。</li>
    </ul>
  `
};

pages['forecast-detail'] = {
  title: '预测分解',
  subtitle: '查看滚动预测、关键假设与偏差，指导 S&OP。',
  breadcrumbs: ['工厂经理', '订单与预测', '预测分解'],
  backTo: 'sales-demand',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">滚动预测</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="planner-board">同步至主计划</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>月份</th>
            <th>预测量</th>
            <th>实际</th>
            <th>偏差</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-05</td>
            <td>820</td>
            <td>795</td>
            <td class="trend-down">-3%</td>
            <td>需求推迟</td>
          </tr>
          <tr>
            <td>2024-06</td>
            <td>880</td>
            <td>-</td>
            <td class="trend-up">+5%</td>
            <td>新增医疗项目</td>
          </tr>
          <tr>
            <td>2024-07</td>
            <td>910</td>
            <td>-</td>
            <td>+0%</td>
            <td>维持</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>预测数据可推送至主计划或反向验证产能。</li>
    </ul>
  `
};

pages['customer-commitment'] = {
  title: '客户承诺回顾',
  subtitle: '协调销售与计划，对关键客户承诺进行确认与调整。',
  breadcrumbs: ['工厂经理', '订单与预测', '客户承诺回顾'],
  backTo: 'sales-demand',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">承诺面板</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="plan-simulation">请求重排</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>客户</th>
            <th>订单号</th>
            <th>承诺发货</th>
            <th>风险</th>
            <th>动作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>博信医疗</td>
            <td>SO-10245</td>
            <td>6月12日</td>
            <td><span class="status-badge status-critical">高</span></td>
            <td><button class="ghost-link" data-target-page="order-detail">查看明细</button></td>
          </tr>
          <tr>
            <td>蓝科能源</td>
            <td>SO-10198</td>
            <td>6月09日</td>
            <td><span class="status-badge status-warning">中</span></td>
            <td><button class="ghost-link" data-target-page="material-exception">补料计划</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>支持承诺调整、客户沟通记录与对 APS 的重排请求。</li>
    </ul>
  `
};

pages['supply-chain'] = {
  title: '供应链协同',
  subtitle: '关注供应商绩效、在途物流与协同任务，保障供给可靠。',
  breadcrumbs: ['工厂经理', '供应链协同'],
  metrics: ['待确认 ASN 6 条', '外协任务 4 项'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">供应商绩效</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="supplier-collaboration">协同任务</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>供应商</th>
            <th>准时率</th>
            <th>质量</th>
            <th>缺料</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>华盛精密</td>
            <td>96%</td>
            <td>99.2%</td>
            <td>0</td>
            <td><span class="status-badge status-success">良好</span></td>
          </tr>
          <tr>
            <td>恒泰电子</td>
            <td class="trend-down">84%</td>
            <td>97.4%</td>
            <td>2</td>
            <td><span class="status-badge status-warning">关注</span></td>
          </tr>
          <tr>
            <td>创联机加</td>
            <td>91%</td>
            <td class="trend-down">92.1%</td>
            <td>1</td>
            <td><span class="status-badge status-warning">跟进</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">在途与外协</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">物流在途</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>ASN</th>
                <th>物料</th>
                <th>数量</th>
                <th>到厂</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ASN-5521</td>
                <td>铝型材</td>
                <td>1,200</td>
                <td>6月09日</td>
                <td><span class="status-badge status-warning">延迟</span></td>
              </tr>
              <tr>
                <td>ASN-5519</td>
                <td>伺服模块</td>
                <td>240</td>
                <td>6月08日</td>
                <td><span class="status-badge status-success">正常</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">外协任务</h4>
            <div class="panel-actions">
              <button class="primary-button" data-target-page="outsourcing-request">创建外协需求</button>
            </div>
          </header>
          <div class="lane-board">
            <div class="lane-column">
              <h4>待派发</h4>
              <div class="card-item">
                <strong>齿轮加工</strong>
                <div class="card-meta"><span>数量 60</span><span class="badge">紧急</span></div>
              </div>
            </div>
            <div class="lane-column">
              <h4>执行中</h4>
              <div class="card-item">
                <strong>焊接总成</strong>
                <div class="card-meta"><span>恒泰电子</span><span class="badge">预计 6月11日</span></div>
                <button class="ghost-link" data-target-page="supplier-collaboration">查看协同</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>从绩效、在途与外协角度统一掌握供应风险并即时协同。</li>
    </ul>
  `
};

pages['supplier-collaboration'] = {
  title: '供应商协同任务',
  subtitle: '与供应商共享需求、进度与问题列表，实现透明协作。',
  breadcrumbs: ['工厂经理', '供应链协同', '供应商协同任务'],
  backTo: 'supply-chain',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">协同看板</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="outsourcing-request">发布新的协同</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>待确认</h4>
          <div class="card-item">
            <strong>ASN-5521 延迟说明</strong>
            <div class="card-meta"><span>恒泰电子</span><span class="badge">需反馈</span></div>
            <button class="ghost-link" data-target-page="field-ticket">请求现场核查</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>执行中</h4>
          <div class="card-item">
            <strong>焊接总成缺陷整改</strong>
            <div class="card-meta"><span>创联机加</span><span class="badge">QC 提交</span></div>
            <button class="ghost-link" data-target-page="nonconformance-case">查看 8D</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>已完成</h4>
          <div class="card-item">
            <strong>铸件图纸更新</strong>
            <div class="card-meta"><span>华盛精密</span><span class="badge">关闭</span></div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>协同任务关联外协、质量及服务模块，实现上下游闭环。</li>
    </ul>
  `
};

pages['outsourcing-request'] = {
  title: '外协需求创建',
  subtitle: '为瓶颈工序快速创建外协任务并分配供应商。',
  breadcrumbs: ['工厂经理', '供应链协同', '外协需求'],
  backTo: 'supply-chain',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">需求表单</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="supplier-collaboration">推送协同</button>
        </div>
      </header>
      <table>
        <tbody>
          <tr>
            <th style="width: 180px;">工单</th>
            <td>WO-8811 / 工序 10</td>
          </tr>
          <tr>
            <th>物料</th>
            <td>精密齿轮组件</td>
          </tr>
          <tr>
            <th>数量</th>
            <td>60 套</td>
          </tr>
          <tr>
            <th>交付要求</th>
            <td>6月14日前回厂，需附合格证明</td>
          </tr>
          <tr>
            <th>候选供应商</th>
            <td>
              <div class="tag-group">
                <span class="badge">华盛精密</span>
                <span class="badge">创联机加</span>
                <span class="badge">恒泰电子</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>外协单可直接推送给供应商协同门户，并同步到 APS 排程。</li>
    </ul>
  `
};
pages['planner-board'] = {
  title: '主计划中心',
  subtitle: '整合 S&OP、MRP 与 APS 结果，调度跨工厂产能。',
  breadcrumbs: ['计划经理', '主计划中心'],
  metrics: ['需重排 4 工单', '缺料 12 项'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">计划周期总览</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="simulation-scenario">情景对比</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>需求</h4>
          <div class="card-item">
            <strong>滚动预测</strong>
            <div class="card-meta"><span>锁定量 880</span><span class="badge">+5%</span></div>
            <button class="ghost-link" data-target-page="forecast-detail">查看预测</button>
          </div>
          <div class="card-item">
            <strong>重点订单</strong>
            <div class="card-meta"><span>SO-10245</span><span class="badge">高优先</span></div>
            <button class="ghost-link" data-target-page="order-detail">订单详情</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>产能</h4>
          <div class="card-item">
            <strong>工厂 A</strong>
            <div class="card-meta"><span>负荷 92%</span><span class="badge">需平衡</span></div>
            <button class="ghost-link" data-target-page="capacity-alerts">瓶颈查看</button>
          </div>
          <div class="card-item">
            <strong>工厂 B</strong>
            <div class="card-meta"><span>负荷 78%</span><span class="badge">可承接</span></div>
            <button class="ghost-link" data-target-page="simulation-scenario">转产模拟</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>结果</h4>
          <div class="card-item">
            <strong>发布计划</strong>
            <div class="card-meta"><span>版本 2024W24</span><span class="badge">待发布</span></div>
            <button class="primary-button" data-target-page="plan-simulation">打开 APS</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>统一展示需求、产能、结果，支持快速跳转至 APS、订单或预测详情。</li>
    </ul>
  `
};

pages['material-availability'] = {
  title: '物料可用性',
  subtitle: '结合 MRP 结果、库存与供应计划，锁定缺料影响范围。',
  breadcrumbs: ['计划经理', '物料可用性'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">缺料汇总</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="material-exception">生成异常任务</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>物料</th>
            <th>描述</th>
            <th>缺口</th>
            <th>影响工单</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RM-5582</td>
            <td>特规钢板</td>
            <td>280 件</td>
            <td><button class="action-link" data-target-page="order-detail">SO-10245</button></td>
            <td><span class="status-badge status-critical">需加急</span></td>
          </tr>
          <tr>
            <td>SUB-2301</td>
            <td>伺服驱动</td>
            <td>60 套</td>
            <td><button class="action-link" data-target-page="order-detail">SO-10198</button></td>
            <td><span class="status-badge status-warning">已下单</span></td>
          </tr>
          <tr>
            <td>RM-4410</td>
            <td>液压组件</td>
            <td>120 件</td>
            <td><button class="action-link" data-target-page="order-detail">SO-10176</button></td>
            <td><span class="status-badge status-warning">待确认</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">供应覆盖</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">来料计划</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>PO</th>
                <th>供应商</th>
                <th>到货</th>
                <th>数量</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PO-77652</td>
                <td>恒泰电子</td>
                <td>6月11日</td>
                <td>80</td>
                <td><span class="status-badge status-warning">需确认</span></td>
              </tr>
              <tr>
                <td>PO-77621</td>
                <td>华盛精密</td>
                <td>6月09日</td>
                <td>320</td>
                <td><span class="status-badge status-success">在途</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">替代方案</h4>
          </header>
          <div class="lane-board">
            <div class="lane-column">
              <h4>可替代</h4>
              <div class="card-item">
                <strong>SUB-2301B 兼容件</strong>
                <div class="card-meta"><span>库存 30</span><span class="badge">需验证</span></div>
                <button class="ghost-link" data-target-page="control-plan">品质评估</button>
              </div>
            </div>
            <div class="lane-column">
              <h4>外协</h4>
              <div class="card-item">
                <strong>齿轮外协</strong>
                <div class="card-meta"><span>60 套</span><span class="badge">进行中</span></div>
                <button class="ghost-link" data-target-page="outsourcing-request">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>物料缺口与供应覆盖一屏呈现，并关联质量、外协等处理动作。</li>
    </ul>
  `
};

pages['material-exception'] = {
  title: '物料异常处理',
  subtitle: '对缺料、替代、取消等场景快速建立协同任务。',
  breadcrumbs: ['计划经理', '物料可用性', '物料异常处理'],
  backTo: 'material-availability',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">异常列表</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="supplier-collaboration">推送供应商</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>异常编号</th>
            <th>类型</th>
            <th>对象</th>
            <th>优先级</th>
            <th>责任人</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EX-0098</td>
            <td>缺料</td>
            <td>RM-5582</td>
            <td><span class="status-badge status-critical">高</span></td>
            <td>采购-张岩</td>
          </tr>
          <tr>
            <td>EX-0102</td>
            <td>替代</td>
            <td>SUB-2301</td>
            <td><span class="status-badge status-warning">中</span></td>
            <td>工程-刘倩</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>异常单可分派责任人、设置 SLA，并与协同门户联通。</li>
    </ul>
  `
};

pages['plan-simulation'] = {
  title: 'APS 排程模拟',
  subtitle: '通过多个情景比较交期、产能与成本影响。',
  breadcrumbs: ['计划经理', '排程模拟'],
  metrics: ['情景数 3', '受影响订单 7'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">情景列表</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="simulation-scenario">新建情景</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>情景</th>
            <th>策略</th>
            <th>交期影响</th>
            <th>成本影响</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SCE-24-06A</td>
            <td>调整班次</td>
            <td class="trend-up">+1 天</td>
            <td class="trend-up">+2%</td>
            <td><button class="ghost-link" data-target-page="simulation-scenario">查看详情</button></td>
          </tr>
          <tr>
            <td>SCE-24-06B</td>
            <td>外协转产</td>
            <td class="trend-down">-2 天</td>
            <td class="trend-up">+3%</td>
            <td><button class="ghost-link" data-target-page="simulation-scenario">查看详情</button></td>
          </tr>
          <tr>
            <td>SCE-24-06C</td>
            <td>优先订单</td>
            <td class="trend-down">-1 天</td>
            <td>+0%</td>
            <td><button class="ghost-link" data-target-page="simulation-scenario">查看详情</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>对多个 APS 情景进行比较，快速选择最优方案并发布。</li>
    </ul>
  `
};

pages['simulation-scenario'] = {
  title: '情景对比面板',
  subtitle: '对比不同排程情景的 KPI，确认发布策略。',
  breadcrumbs: ['计划经理', '排程模拟', '情景对比面板'],
  backTo: 'plan-simulation',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">KPI 对比</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="planner-board">发布计划</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>KPI</th>
            <th>基线</th>
            <th>SCE-24-06B</th>
            <th>SCE-24-06C</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>平均交期</td>
            <td>12.6 天</td>
            <td class="trend-down">10.8 天</td>
            <td>11.4 天</td>
          </tr>
          <tr>
            <td>产能利用率</td>
            <td>89%</td>
            <td>93%</td>
            <td>87%</td>
          </tr>
          <tr>
            <td>加班成本</td>
            <td>+0%</td>
            <td class="trend-up">+3%</td>
            <td>+1%</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>情景对比结果可回写到经营驾驶舱，并触发审批流。</li>
    </ul>
  `
};
pages['shopfloor-execution'] = {
  title: '工单执行板',
  subtitle: '掌握关键工单节拍、设备状态与异常，驱动现场行动。',
  breadcrumbs: ['车间主管', '工单执行板'],
  metrics: ['在制工单 26', '异常 5'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">产线节拍</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="operation-tracking">进入工单跟踪</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>待开工</h4>
          <div class="card-item">
            <strong>WO-8812</strong>
            <div class="card-meta"><span>工序 10</span><span class="badge">预计 08:30</span></div>
            <button class="ghost-link" data-target-page="operation-tracking">派工</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>执行中</h4>
          <div class="card-item">
            <strong>WO-8801</strong>
            <div class="card-meta"><span>工序 20</span><span class="badge">延迟 40min</span></div>
            <button class="ghost-link" data-target-page="operation-tracking">查看详情</button>
          </div>
          <div class="card-item">
            <strong>WO-8794</strong>
            <div class="card-meta"><span>工序 30</span><span class="badge">缺料</span></div>
            <button class="ghost-link" data-target-page="material-exception">协同补料</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>待检验</h4>
          <div class="card-item">
            <strong>WO-8788</strong>
            <div class="card-meta"><span>工序 40</span><span class="badge">QC 待检</span></div>
            <button class="ghost-link" data-target-page="inspection-workbench">派发检验</button>
          </div>
        </div>
      </div>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">设备状态</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="maintenance-schedule">维护计划</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>设备</th>
            <th>状态</th>
            <th>当前工单</th>
            <th>稼动率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CNC-03</td>
            <td><span class="status-badge status-warning">待保养</span></td>
            <td>WO-8801</td>
            <td>94%</td>
            <td><button class="ghost-link" data-target-page="maintenance-schedule">安排停机</button></td>
          </tr>
          <tr>
            <td>WELD-02</td>
            <td><span class="status-badge status-critical">故障</span></td>
            <td>WO-8794</td>
            <td>56%</td>
            <td><button class="ghost-link" data-target-page="downtime-analysis">查看故障</button></td>
          </tr>
          <tr>
            <td>PAINT-01</td>
            <td><span class="status-badge status-success">运行</span></td>
            <td>WO-8766</td>
            <td>88%</td>
            <td><button class="ghost-link" data-target-page="operation-tracking">查看排程</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>产线看板联动派工、补料、检验与维护，保证节拍同步。</li>
    </ul>
  `
};

pages['operation-tracking'] = {
  title: '工单跟踪 · WO-8801',
  subtitle: '掌握工序进度、资源利用、现场反馈与问题。',
  breadcrumbs: ['车间主管', '工单执行板', '工单跟踪 WO-8801'],
  backTo: 'shopfloor-execution',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">工序进度</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="downtime-analysis">记录停机</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>工序</th>
            <th>资源</th>
            <th>计划</th>
            <th>实际</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10 粗加工</td>
            <td>CNC-02</td>
            <td>06:30</td>
            <td>06:50</td>
            <td><span class="status-badge status-success">完成</span></td>
          </tr>
          <tr>
            <td>20 精加工</td>
            <td>CNC-03</td>
            <td>08:30</td>
            <td>09:15</td>
            <td><span class="status-badge status-warning">延迟</span></td>
          </tr>
          <tr>
            <td>30 热处理</td>
            <td>FURN-01</td>
            <td>11:00</td>
            <td>-</td>
            <td><span class="status-badge status-critical">未开工</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">现场反馈</h3>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>问题</h4>
          <div class="card-item">
            <strong>刀具磨损</strong>
            <div class="card-meta"><span>操作员：李强</span><span class="badge">已通知维护</span></div>
            <button class="ghost-link" data-target-page="maintenance-schedule">加入维护计划</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>行动</h4>
          <div class="card-item">
            <strong>调整工艺参数</strong>
            <div class="card-meta"><span>工艺：陈敏</span><span class="badge">进行中</span></div>
            <button class="ghost-link" data-target-page="control-plan">查看标准</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>整合工序进度与现场反馈，支持维护、工艺和质量团队协同。</li>
    </ul>
  `
};

pages['labor-timekeeping'] = {
  title: '人员工时',
  subtitle: '跟踪班组出勤、效率与加班，确保人力匹配节拍。',
  breadcrumbs: ['车间主管', '人员工时'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">班组概览</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="operation-tracking">关联工单</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>班组</th>
            <th>出勤</th>
            <th>效率</th>
            <th>加班</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>机加工早班</td>
            <td>18/20</td>
            <td>92%</td>
            <td>1.5h</td>
            <td><span class="status-badge status-warning">人手紧张</span></td>
          </tr>
          <tr>
            <td>焊接中班</td>
            <td>16/18</td>
            <td>88%</td>
            <td>0h</td>
            <td><span class="status-badge status-success">正常</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">个人工时</h3>
      </header>
      <table>
        <thead>
          <tr>
            <th>员工</th>
            <th>技能</th>
            <th>本日工时</th>
            <th>效率</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>李强</td>
            <td>CNC</td>
            <td>7.5h</td>
            <td>95%</td>
            <td><button class="ghost-link" data-target-page="operation-tracking">查看派工</button></td>
          </tr>
          <tr>
            <td>王珊</td>
            <td>焊接</td>
            <td>6.0h</td>
            <td>89%</td>
            <td><button class="ghost-link" data-target-page="downtime-analysis">记录异常</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>人员维度支持技能匹配、加班审批与派工联动。</li>
    </ul>
  `
};

pages['maintenance-schedule'] = {
  title: '设备维护计划',
  subtitle: '安排预防性维护、紧急修复与备件需求，减少停机。',
  breadcrumbs: ['车间主管', '设备维护计划'],
  backTo: 'shopfloor-execution',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">维护日程</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="downtime-analysis">创建维修单</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>设备</th>
            <th>维护类型</th>
            <th>计划时间</th>
            <th>负责人</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CNC-03</td>
            <td>预防保养</td>
            <td>6月12日 18:00</td>
            <td>设备-赵鹏</td>
            <td><span class="status-badge status-warning">待确认</span></td>
          </tr>
          <tr>
            <td>WELD-02</td>
            <td>故障修复</td>
            <td>6月11日 14:00</td>
            <td>维护-刘伟</td>
            <td><span class="status-badge status-critical">紧急</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">备件需求</h3>
      </header>
      <table>
        <thead>
          <tr>
            <th>备件</th>
            <th>数量</th>
            <th>库存</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>刀具套件</td>
            <td>4</td>
            <td>2</td>
            <td><span class="status-badge status-warning">不足</span></td>
            <td><button class="ghost-link" data-target-page="material-exception">补货申请</button></td>
          </tr>
          <tr>
            <td>焊枪模块</td>
            <td>1</td>
            <td>0</td>
            <td><span class="status-badge status-critical">缺货</span></td>
            <td><button class="ghost-link" data-target-page="supplier-collaboration">协同采购</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>维护计划与备件需求同步计划、采购及质量模块。</li>
    </ul>
  `
};

pages['downtime-analysis'] = {
  title: '停机分析',
  subtitle: '记录停机原因、影响与处理进度，实现持续改善。',
  breadcrumbs: ['车间主管', '设备维护计划', '停机分析'],
  backTo: 'maintenance-schedule',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">故障记录</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="quality-dashboard">质量追踪</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>设备</th>
            <th>原因</th>
            <th>停机</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DT-20240608</td>
            <td>WELD-02</td>
            <td>焊枪过热</td>
            <td>1.8h</td>
            <td><span class="status-badge status-warning">处理中</span></td>
          </tr>
          <tr>
            <td>DT-20240605</td>
            <td>CNC-01</td>
            <td>润滑不足</td>
            <td>0.6h</td>
            <td><span class="status-badge status-success">关闭</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">改进任务</h3>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>短期措施</h4>
          <div class="card-item">
            <strong>更换冷却系统</strong>
            <div class="card-meta"><span>责任：维护</span><span class="badge">进行中</span></div>
            <button class="ghost-link" data-target-page="maintenance-schedule">查看计划</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>长期改善</h4>
          <div class="card-item">
            <strong>焊接工艺优化</strong>
            <div class="card-meta"><span>责任：工艺</span><span class="badge">待立项</span></div>
            <button class="ghost-link" data-target-page="control-plan">更新标准</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>停机数据与质量、工艺改进相连，构成闭环改进体系。</li>
    </ul>
  `
};
pages['quality-dashboard'] = {
  title: '质量监控台',
  subtitle: '追踪过程质量、客户投诉与改进进度，实现质量闭环。',
  breadcrumbs: ['质量工程师', '质量监控台'],
  metrics: ['PPM 420', '不合格 9'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">质量 KPI</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="nonconformance-case">不合格处理</button>
        </div>
      </header>
      <div class="panel-grid">
        <article class="kpi-card critical">
          <span class="kpi-label">客户投诉</span>
          <span class="kpi-value">3</span>
          <span class="trend-up">↑ +2</span>
          <button class="ghost-link" data-target-page="service-control-center">查看客户服务</button>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">过程合格率</span>
          <span class="kpi-value">96.4%</span>
          <span class="trend-down">↓ -1.2%</span>
          <button class="ghost-link" data-target-page="inspection-workbench">检验追踪</button>
        </article>
        <article class="kpi-card success">
          <span class="kpi-label">供应商合格率</span>
          <span class="kpi-value">98.7%</span>
          <span class="trend-up">↑ +0.6%</span>
          <button class="ghost-link" data-target-page="supplier-quality">查看供应商质量</button>
        </article>
      </div>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">质量热点</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">不合格项目</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>编号</th>
                <th>类型</th>
                <th>来源</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NCR-24068</td>
                <td>过程</td>
                <td>WO-8794</td>
                <td><span class="status-badge status-warning">分析中</span></td>
                <td><button class="ghost-link" data-target-page="nonconformance-case">8D 报告</button></td>
              </tr>
              <tr>
                <td>NCR-24062</td>
                <td>供应商</td>
                <td>恒泰电子</td>
                <td><span class="status-badge status-critical">待处置</span></td>
                <td><button class="ghost-link" data-target-page="supplier-quality">协同整改</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">过程能力</h4>
          </header>
          <div class="chart-bars" style="height: 220px;">
            <div class="chart-bar" style="height: 68%;">
              <span class="value">1.28</span>
              <span>机加工</span>
            </div>
            <div class="chart-bar" style="height: 85%;">
              <span class="value">1.55</span>
              <span>装配</span>
            </div>
            <div class="chart-bar" style="height: 45%; background: rgba(239, 68, 68, 0.35);">
              <span class="value">0.95</span>
              <span>焊接</span>
            </div>
          </div>
          <button class="ghost-link" data-target-page="control-plan">调整控制计划</button>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>质量指标与热点问题集中展示，与服务、供应商协同联动。</li>
    </ul>
  `
};

pages['inspection-workbench'] = {
  title: '检验工作台',
  subtitle: '安排来料、过程和出货检验，并处理不合格。',
  breadcrumbs: ['质量工程师', '检验工作台'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">检验任务</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="nonconformance-case">创建 NCR</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>任务</th>
            <th>类型</th>
            <th>对象</th>
            <th>计划</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IQC-240621</td>
            <td>来料</td>
            <td>SUB-2301</td>
            <td>6月09日</td>
            <td><span class="status-badge status-warning">待检</span></td>
          </tr>
          <tr>
            <td>IPQC-240618</td>
            <td>过程</td>
            <td>WO-8801</td>
            <td>6月08日</td>
            <td><span class="status-badge status-critical">暂停</span></td>
          </tr>
          <tr>
            <td>FQC-240605</td>
            <td>成品</td>
            <td>SO-10176</td>
            <td>6月10日</td>
            <td><span class="status-badge status-success">完成</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">检验数据</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">抽样结果</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>项目</th>
                <th>样本</th>
                <th>合格</th>
                <th>缺陷</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>尺寸检验</td>
                <td>30</td>
                <td>28</td>
                <td>2</td>
              </tr>
              <tr>
                <td>焊缝外观</td>
                <td>15</td>
                <td>13</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">快速操作</h4>
          </header>
          <div class="lane-board">
            <div class="lane-column">
              <h4>复检</h4>
              <div class="card-item">
                <strong>WO-8801 工序 20</strong>
                <div class="card-meta"><span>抽样 5 件</span><span class="badge">待派发</span></div>
                <button class="ghost-link" data-target-page="operation-tracking">通知车间</button>
              </div>
            </div>
            <div class="lane-column">
              <h4>放行</h4>
              <div class="card-item">
                <strong>SO-10176</strong>
                <div class="card-meta"><span>FQC 完成</span><span class="badge">已放行</span></div>
                <button class="ghost-link" data-target-page="service-control-center">同步服务</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>检验任务、数据及快速操作一体化，并联动车间与服务。</li>
    </ul>
  `
};

pages['nonconformance-case'] = {
  title: '不合格处理 · NCR-24068',
  subtitle: '执行 8D 流程，跟踪遏制、纠正与预防措施。',
  breadcrumbs: ['质量工程师', '不合格处理', 'NCR-24068'],
  backTo: 'quality-dashboard',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">8D 阶段</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="control-plan">更新控制计划</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>D1 团队</h4>
          <div class="card-item">
            <strong>成立跨部门小组</strong>
            <div class="card-meta"><span>完成</span><span class="badge">负责人：张敏</span></div>
          </div>
        </div>
        <div class="lane-column">
          <h4>D3 遏制</h4>
          <div class="card-item">
            <strong>隔离焊接件</strong>
            <div class="card-meta"><span>数量 18</span><span class="badge">进行中</span></div>
            <button class="ghost-link" data-target-page="inspection-workbench">安排复检</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>D5 根因</h4>
          <div class="card-item">
            <strong>焊接参数偏差</strong>
            <div class="card-meta"><span>原因确认</span><span class="badge">待验证</span></div>
            <button class="ghost-link" data-target-page="downtime-analysis">关联停机</button>
          </div>
        </div>
        <div class="lane-column">
          <h4>D7 预防</h4>
          <div class="card-item">
            <strong>培训焊接班组</strong>
            <div class="card-meta"><span>完成度 60%</span><span class="badge">计划 6月12日</span></div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>完整 8D 流程与检验、维护、服务、供应链信息同步。</li>
    </ul>
  `
};

pages['control-plan'] = {
  title: '控制计划调整',
  subtitle: '维护过程控制点、检验频次与防错措施。',
  breadcrumbs: ['质量工程师', '控制计划调整'],
  backTo: 'quality-dashboard',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">控制点</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="inspection-workbench">发布检验</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>工序</th>
            <th>检查项目</th>
            <th>频次</th>
            <th>控制方法</th>
            <th>防错</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>焊接</td>
            <td>焊缝温度</td>
            <td>每批</td>
            <td>在线传感</td>
            <td><span class="badge">报警</span></td>
          </tr>
          <tr>
            <td>机加工</td>
            <td>尺寸 CPK</td>
            <td>每 2 小时</td>
            <td>SPC 抽样</td>
            <td><span class="badge">测量确认</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>控制计划与检验任务联动，确保整改措施落地。</li>
    </ul>
  `
};

pages['supplier-quality'] = {
  title: '供应商质量台账',
  subtitle: '评估供应商质量表现与整改进度，实现协同改善。',
  breadcrumbs: ['质量工程师', '供应商质量'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">质量评分</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="supplier-collaboration">协同整改</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>供应商</th>
            <th>PPM</th>
            <th>投诉</th>
            <th>整改任务</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>恒泰电子</td>
            <td>520</td>
            <td>2</td>
            <td><button class="action-link" data-target-page="nonconformance-case">NCR-24062</button></td>
            <td><span class="status-badge status-warning">整改中</span></td>
          </tr>
          <tr>
            <td>创联机加</td>
            <td>180</td>
            <td>0</td>
            <td><button class="action-link" data-target-page="supplier-collaboration">任务 #SC-102</button></td>
            <td><span class="status-badge status-success">达标</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">整改跟踪</h3>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>待回复</h4>
          <div class="card-item">
            <strong>焊接飞溅改善</strong>
            <div class="card-meta"><span>恒泰电子</span><span class="badge">期限 6月15日</span></div>
          </div>
        </div>
        <div class="lane-column">
          <h4>执行中</h4>
          <div class="card-item">
            <strong>尺寸公差优化</strong>
            <div class="card-meta"><span>创联机加</span><span class="badge">SOP 更新</span></div>
            <button class="ghost-link" data-target-page="control-plan">关联控制计划</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>供应商质量指标与整改任务同步供应链协同平台。</li>
    </ul>
  `
};
pages['service-control-center'] = {
  title: '服务指挥台',
  subtitle: '统筹服务请求、派工与 SLA，保障客户体验。',
  breadcrumbs: ['售后服务经理', '服务指挥台'],
  metrics: ['开放工单 18', 'SLA 风险 3'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">服务请求</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="service-appointment">排班计划</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>请求号</th>
            <th>客户</th>
            <th>类型</th>
            <th>SLA</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SR-240612</td>
            <td>博信医疗</td>
            <td>设备故障</td>
            <td>6月09日 14:00</td>
            <td><span class="status-badge status-critical">高风险</span></td>
            <td><button class="ghost-link" data-target-page="field-ticket">查看现场工单</button></td>
          </tr>
          <tr>
            <td>SR-240609</td>
            <td>蓝科能源</td>
            <td>预防维护</td>
            <td>6月12日 10:00</td>
            <td><span class="status-badge status-warning">待派工</span></td>
            <td><button class="ghost-link" data-target-page="service-appointment">排班</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">客户体验指标</h3>
      </header>
      <div class="panel-grid">
        <article class="kpi-card">
          <span class="kpi-label">首次修复率</span>
          <span class="kpi-value">87%</span>
          <span class="trend-up">↑ +4%</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">平均响应</span>
          <span class="kpi-value">3.2h</span>
          <span class="trend-down">↓ -0.8h</span>
        </article>
        <article class="kpi-card success">
          <span class="kpi-label">满意度</span>
          <span class="kpi-value">4.6</span>
          <span class="trend-up">↑ +0.2</span>
        </article>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>服务请求与派工、排班、客户指标联动，形成闭环服务体验。</li>
    </ul>
  `
};

pages['field-ticket'] = {
  title: '现场工单 · SR-240612',
  subtitle: '跟踪现场工程师执行、备件与客户沟通。',
  breadcrumbs: ['售后服务经理', '现场工单', 'SR-240612'],
  backTo: 'service-control-center',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">执行详情</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="service-appointment">调整排班</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>工程师</th>
            <th>到达</th>
            <th>完成</th>
            <th>状态</th>
            <th>下一步</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>张凯</td>
            <td>6月08日 13:20</td>
            <td>-</td>
            <td><span class="status-badge status-warning">维修中</span></td>
            <td><button class="ghost-link" data-target-page="service-appointment">申请支援</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">备件与文档</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">备件需求</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>物料</th>
                <th>数量</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>伺服模块</td>
                <td>1</td>
                <td><span class="status-badge status-warning">待确认</span></td>
                <td><button class="ghost-link" data-target-page="material-availability">检查库存</button></td>
              </tr>
              <tr>
                <td>电缆组件</td>
                <td>2</td>
                <td><span class="status-badge status-success">已备货</span></td>
                <td><button class="ghost-link" data-target-page="installed-base">关联资产</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">沟通记录</h4>
          </header>
          <div class="lane-board">
            <div class="lane-column">
              <h4>客户</h4>
              <div class="card-item">
                <strong>说明设备频繁报警</strong>
                <div class="card-meta"><span>6月08日 12:40</span><span class="badge">待回访</span></div>
              </div>
            </div>
            <div class="lane-column">
              <h4>内部</h4>
              <div class="card-item">
                <strong>请求质量支援</strong>
                <div class="card-meta"><span>质量部</span><span class="badge">已响应</span></div>
                <button class="ghost-link" data-target-page="quality-dashboard">查看质量热点</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>现场工单连接备件、质量与资产，实现端到端服务履约。</li>
    </ul>
  `
};

pages['service-appointment'] = {
  title: '服务排班计划',
  subtitle: '可视化现场资源，合理分配工程师与班次。',
  breadcrumbs: ['售后服务经理', '服务排班计划'],
  backTo: 'service-control-center',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">排班甘特</h3>
        <div class="panel-actions">
          <button class="primary-button" data-target-page="field-ticket">分派工单</button>
        </div>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>6月08日</h4>
          <div class="card-item">
            <strong>张凯</strong>
            <div class="card-meta"><span>SR-240612</span><span class="badge">维修中</span></div>
          </div>
          <div class="card-item">
            <strong>刘婷</strong>
            <div class="card-meta"><span>SR-240609</span><span class="badge">待出发</span></div>
          </div>
        </div>
        <div class="lane-column">
          <h4>6月09日</h4>
          <div class="card-item">
            <strong>王宇</strong>
            <div class="card-meta"><span>巡检</span><span class="badge">空档</span></div>
            <button class="ghost-link" data-target-page="field-ticket">指派 SR-240612</button>
          </div>
        </div>
      </div>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">能力矩阵</h3>
      </header>
      <table>
        <thead>
          <tr>
            <th>工程师</th>
            <th>技能</th>
            <th>区域</th>
            <th>负荷</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>张凯</td>
            <td>电控 / 机械</td>
            <td>华东</td>
            <td>120%</td>
            <td><button class="ghost-link" data-target-page="field-ticket">调整任务</button></td>
          </tr>
          <tr>
            <td>刘婷</td>
            <td>液压</td>
            <td>华南</td>
            <td>80%</td>
            <td><button class="ghost-link" data-target-page="service-control-center">派工</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  details: `
    <ul>
      <li>排班视图结合能力矩阵，支持快速派工与资源调度。</li>
    </ul>
  `
};

pages['installed-base'] = {
  title: '装机资产台账',
  subtitle: '掌握客户现场设备配置、保修与服务历史。',
  breadcrumbs: ['售后服务经理', '装机资产'],
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">资产列表</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="asset-detail">查看详情</button>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>资产编号</th>
            <th>客户</th>
            <th>型号</th>
            <th>安装日期</th>
            <th>保修</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INST-10045</td>
            <td>博信医疗</td>
            <td>A200</td>
            <td>2023-11-18</td>
            <td>2025-11-17</td>
            <td><span class="status-badge status-warning">服务中</span></td>
          </tr>
          <tr>
            <td>INST-10012</td>
            <td>蓝科能源</td>
            <td>A180</td>
            <td>2022-09-03</td>
            <td>2024-09-02</td>
            <td><span class="status-badge status-success">运行</span></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">生命周期</h3>
      </header>
      <div class="lane-board">
        <div class="lane-column">
          <h4>服务历史</h4>
          <div class="card-item">
            <strong>SR-240512 保养</strong>
            <div class="card-meta"><span>完成</span><span class="badge">满意度 5</span></div>
          </div>
        </div>
        <div class="lane-column">
          <h4>升级机会</h4>
          <div class="card-item">
            <strong>控制系统升级</strong>
            <div class="card-meta"><span>建议 Q3</span><span class="badge">销售跟进</span></div>
            <button class="ghost-link" data-target-page="sales-demand">反馈销售</button>
          </div>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>资产信息支持服务、销售与研发协同，洞察升级机会。</li>
    </ul>
  `
};

pages['asset-detail'] = {
  title: '资产详情 · INST-10045',
  subtitle: '深入查看配置、使用参数、告警与服务历史。',
  breadcrumbs: ['售后服务经理', '装机资产', '资产详情 INST-10045'],
  backTo: 'installed-base',
  hero: `
    <section class="panel">
      <header>
        <h3 class="panel-title">配置概览</h3>
        <div class="panel-actions">
          <button class="ghost-link" data-target-page="field-ticket">发起服务工单</button>
        </div>
      </header>
      <table>
        <tbody>
          <tr>
            <th style="width: 180px;">安装地点</th>
            <td>博信医疗 无菌车间</td>
          </tr>
          <tr>
            <th>关键配置</th>
            <td>双通道伺服 / 环境监控套件 / 远程诊断模块</td>
          </tr>
          <tr>
            <th>软件版本</th>
            <td>v6.4.2</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="panel">
      <header>
        <h3 class="panel-title">告警与历史</h3>
      </header>
      <div class="split-grid">
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">实时告警</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th>类型</th>
                <th>描述</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6月08日 12:10</td>
                <td>温度</td>
                <td>控制柜过温</td>
                <td><span class="status-badge status-critical">处理中</span></td>
              </tr>
              <tr>
                <td>6月03日 09:22</td>
                <td>通信</td>
                <td>远程模块离线</td>
                <td><span class="status-badge status-success">已恢复</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel" style="border-style: dashed;">
          <header>
            <h4 class="panel-title">服务记录</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>工单</th>
                <th>类型</th>
                <th>日期</th>
                <th>结论</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SR-240512</td>
                <td>保养</td>
                <td>2024-05-12</td>
                <td>完成</td>
              </tr>
              <tr>
                <td>SR-240118</td>
                <td>维修</td>
                <td>2024-01-18</td>
                <td>更换模块</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
  details: `
    <ul>
      <li>资产详情支持直接发起服务与同步质量、销售部门。</li>
    </ul>
  `
};
document.addEventListener('DOMContentLoaded', init);

