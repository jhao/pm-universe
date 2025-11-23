const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const renderModuleOverview = () => {
  const searchInput = $('[data-search]');
  const grid = $('[data-module-grid]');
  const emptyState = $('[data-empty-state]');
  if (!grid) return;

  const modules = [
    {
      id: 'employees',
      title: '人事核心',
      description: '集中管理员工档案、合同与组织结构，支持全流程自动化。',
      features: ['员工 360° 档案', '入离职与调岗流程', '电子签名与审批'],
      stat: '127 位员工同步',
      updatedAt: '最近更新：今天 09:42',
      link: 'employee-directory.html',
    },
    {
      id: 'payroll',
      title: '薪酬与税务',
      description: '自动完成薪资计算、税务申报与异常提醒，确保合规与准确。',
      features: ['多州税务自动合规', '周期薪资批次', '异常监控与通知'],
      stat: '本周期薪资：$468K',
      updatedAt: '下一次发薪：周五',
      link: 'payroll-run.html',
    },
    {
      id: 'time',
      title: '时间与考勤',
      description: '跨班次排班、加班审批与移动打卡一体化处理。',
      features: ['地理围栏打卡', '排班冲突提醒', '请假审批工作流'],
      stat: '平均出勤率 96%',
      updatedAt: '待处理异常 4 项',
      link: 'time-attendance.html',
    },
    {
      id: 'talent',
      title: '人才发展',
      description: '绩效、目标与学习发展融合，推动员工成长。',
      features: ['绩效评估矩阵', 'OKR 对齐看板', '学习课程推荐'],
      stat: '绩效完成度 82%',
      updatedAt: '季度评估进行中',
      link: 'talent-performance.html',
    },
    {
      id: 'analytics',
      title: '报表与洞察',
      description: '实时监控薪资成本、人员流失与合规指标。',
      features: ['可视化看板', '自定义报表模板', '异常警报中心'],
      stat: '9 个自动化报表',
      updatedAt: '最新刷新：5 分钟前',
      link: 'analytics-reporting.html',
    },
  ];

  const render = (items) => {
    grid.innerHTML = '';
    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="badge-group">
          <span class="badge">${item.stat}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="subtitle">${item.description}</p>
        <ul class="feature-list">
          ${item.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="meta">
          <span>${item.updatedAt}</span>
        </div>
        <div class="cta">
          <a class="primary-button" href="${item.link}">进入模块</a>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  const filter = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = modules.filter(
      (module) =>
        module.title.toLowerCase().includes(keyword) ||
        module.description.toLowerCase().includes(keyword) ||
        module.features.some((feature) => feature.toLowerCase().includes(keyword))
    );
    grid.setAttribute('data-empty', filtered.length === 0);
    if (emptyState) emptyState.hidden = filtered.length !== 0;
    render(filtered);
  };

  render(modules);
  if (emptyState) emptyState.hidden = modules.length !== 0;
  searchInput?.addEventListener('input', filter);
};

const renderEmployeeDirectory = () => {
  const container = $('[data-employee-list]');
  const detail = $('[data-employee-detail]');
  if (!container || !detail) return;

  const employees = [
    {
      id: 'E-1024',
      name: '张伟',
      title: '人力资源经理',
      department: '人力资源部',
      location: '纽约',
      status: '在职',
      startDate: '2019-03-12',
      compensation: 128000,
      phone: '+1 (929) 555-1208',
      email: 'wei.zhang@example.com',
      manager: '王丽 (首席人事官)',
      tags: ['核心员工', '远程办公', '关键岗位'],
      timeline: [
        { date: '2023-12-04', event: '完成 2023 年绩效评估，评级：Exceed' },
        { date: '2023-09-18', event: '调薪 6%，已获批准' },
        { date: '2022-11-01', event: '晋升为人力资源经理' },
      ],
      leaveBalance: { annual: 12, sick: 6, floating: 2 },
      compensationHistory: [
        { year: '2024', base: 105000, bonus: 18000, equity: 5000 },
        { year: '2023', base: 99000, bonus: 15000, equity: 4000 },
        { year: '2022', base: 92000, bonus: 12000, equity: 4000 },
      ],
      documents: ['聘用合同.pdf', '保密协议.pdf', '2023 绩效总结.docx'],
    },
    {
      id: 'E-1088',
      name: '李娜',
      title: '薪酬专员',
      department: '薪酬中心',
      location: '洛杉矶',
      status: '在职',
      startDate: '2021-07-21',
      compensation: 86000,
      phone: '+1 (213) 555-2345',
      email: 'na.li@example.com',
      manager: '张伟',
      tags: ['薪资批次负责人'],
      timeline: [
        { date: '2024-01-08', event: '完成“多州税务申报”课程' },
        { date: '2023-10-16', event: '担任季度薪资审计负责人' },
        { date: '2023-04-05', event: '获得客户好评徽章 3 次' },
      ],
      leaveBalance: { annual: 10, sick: 8, floating: 1 },
      compensationHistory: [
        { year: '2024', base: 76000, bonus: 8000, equity: 2000 },
        { year: '2023', base: 72000, bonus: 6000, equity: 0 },
        { year: '2022', base: 69000, bonus: 4500, equity: 0 },
      ],
      documents: ['聘用合同.pdf', '薪酬保密协议.pdf'],
    },
    {
      id: 'E-1152',
      name: '王强',
      title: '仓储主管',
      department: '运营中心',
      location: '芝加哥',
      status: '在职',
      startDate: '2020-02-02',
      compensation: 72000,
      phone: '+1 (872) 555-7734',
      email: 'qiang.wang@example.com',
      manager: '陈晨 (运营副总监)',
      tags: ['轮班岗位', '加班审批'],
      timeline: [
        { date: '2024-02-12', event: '完成 OSHA 安全培训 (续期)' },
        { date: '2023-08-30', event: '获得季度优秀主管称号' },
        { date: '2023-05-18', event: '新增班次自动化审批流程' },
      ],
      leaveBalance: { annual: 8, sick: 4, floating: 0 },
      compensationHistory: [
        { year: '2024', base: 61000, bonus: 6500, equity: 0 },
        { year: '2023', base: 58000, bonus: 5000, equity: 0 },
        { year: '2022', base: 56000, bonus: 4200, equity: 0 },
      ],
      documents: ['劳动合同.pdf', '安全培训证书.png'],
    },
    {
      id: 'E-1199',
      name: '赵敏',
      title: '高级产品经理',
      department: '产品部',
      location: '西雅图',
      status: '远程',
      startDate: '2018-11-26',
      compensation: 145000,
      phone: '+1 (425) 555-8201',
      email: 'min.zhao@example.com',
      manager: '刘峰 (产品副总裁)',
      tags: ['远程办公', '关键人才'],
      timeline: [
        { date: '2024-03-02', event: '发起晋升申请（高级总监）' },
        { date: '2023-12-16', event: '主持产品路线图评审会' },
        { date: '2023-05-08', event: '完成领导力培养项目' },
      ],
      leaveBalance: { annual: 15, sick: 5, floating: 3 },
      compensationHistory: [
        { year: '2024', base: 120000, bonus: 21000, equity: 14000 },
        { year: '2023', base: 112000, bonus: 18000, equity: 12000 },
        { year: '2022', base: 105000, bonus: 15000, equity: 11000 },
      ],
      documents: ['股权授予协议.pdf', '竞业限制协议.pdf'],
    },
  ];

  const list = $('[data-employee-list]');
  const search = $('[data-employee-search]');

  const renderList = (items) => {
    list.innerHTML = '';
    items.forEach((employee, index) => {
      const item = document.createElement('div');
      item.className = 'list-item';
      item.dataset.id = employee.id;
      item.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="avatar">${employee.name.slice(0, 1)}</div>
          <div>
            <div style="font-weight:600;">${employee.name}</div>
            <div style="font-size:12px;color:var(--text-subtle);">${employee.title} · ${employee.department}</div>
          </div>
        </div>
        <span class="badge ${employee.status === '远程' ? 'warning' : 'success'}">${employee.status}</span>
      `;
      item.addEventListener('click', () => selectEmployee(employee.id));
      if (index === 0) item.classList.add('active');
      list.appendChild(item);
    });
  };

  const renderCompensation = (history) => `
    <table class="table">
      <thead>
        <tr>
          <th>年度</th>
          <th>基础薪资</th>
          <th>奖金</th>
          <th>股权</th>
        </tr>
      </thead>
      <tbody>
        ${history
          .map(
            (entry) => `
              <tr>
                <td>${entry.year}</td>
                <td>${formatCurrency(entry.base)}</td>
                <td>${formatCurrency(entry.bonus)}</td>
                <td>${entry.equity ? formatCurrency(entry.equity) : '-'}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;

  const selectEmployee = (id) => {
    $$('.list-item', container).forEach((node) => node.classList.toggle('active', node.dataset.id === id));
    const employee = employees.find((item) => item.id === id);
    if (!employee) return;

    detail.innerHTML = `
      <div class="panel-header">
        <div>
          <div class="breadcrumbs"><a href="index.html">ADP Workforce Now</a> · 人事核心</div>
          <h2>${employee.name}</h2>
          <p class="subtitle">${employee.title} · ${employee.department}</p>
          <div class="badge-group">
            ${employee.tags.map((tag) => `<span class="badge">${tag}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="secondary-button">发起异动</button>
          <button class="primary-button">更新档案</button>
        </div>
      </div>
      <div class="split">
        <div class="metric">
          <span>入职时间</span>
          <strong>${employee.startDate}</strong>
        </div>
        <div class="metric">
          <span>年薪总计</span>
          <strong>${formatCurrency(employee.compensation)}</strong>
        </div>
        <div class="metric">
          <span>年假余额</span>
          <strong>${employee.leaveBalance.annual} 天</strong>
        </div>
        <div class="metric">
          <span>病假余额</span>
          <strong>${employee.leaveBalance.sick} 天</strong>
        </div>
      </div>
      <div>
        <div class="tab-bar" data-employee-tabs>
          <button class="active" data-tab="profile">资料</button>
          <button data-tab="compensation">薪酬</button>
          <button data-tab="documents">文件</button>
        </div>
        <div data-tab-panel="profile">
          <div class="highlight">
            <p>联系电话：${employee.phone}</p>
            <p>邮箱：${employee.email}</p>
            <p>直属经理：${employee.manager}</p>
            <p>办公地点：${employee.location}</p>
          </div>
          <div class="timeline">
            ${employee.timeline
              .map(
                (item) => `
                  <div class="timeline-item">
                    <span>${item.date}</span>
                    <div>${item.event}</div>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
        <div data-tab-panel="compensation" hidden>
          ${renderCompensation(employee.compensationHistory)}
        </div>
        <div data-tab-panel="documents" hidden>
          <ul class="feature-list">
            ${employee.documents.map((doc) => `<li>${doc}</li>`).join('')}
          </ul>
          <button class="secondary-button">上传新文件</button>
        </div>
      </div>
    `;

    const tabs = $('[data-employee-tabs]', detail);
    if (tabs) {
      tabs.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-tab]');
        if (!button) return;
        const target = button.dataset.tab;
        $$('button', tabs).forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === target));
        $$('[data-tab-panel]', detail).forEach((panel) => {
          panel.hidden = panel.dataset.tabPanel !== target;
        });
      });
    }
  };

  const filter = () => {
    const keyword = search.value.trim().toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword) ||
        employee.title.toLowerCase().includes(keyword)
    );
    renderList(filtered);
    if (filtered.length > 0) {
      selectEmployee(filtered[0].id);
    } else {
      detail.innerHTML = '<div class="empty-state">未找到匹配的员工</div>';
    }
  };

  renderList(employees);
  selectEmployee(employees[0].id);
  search?.addEventListener('input', filter);
};

const renderPayroll = () => {
  const stepper = $('[data-stepper]');
  const content = $('[data-step-content]');
  if (!stepper || !content) return;

  const steps = [
    {
      id: 'overview',
      title: '批次概览',
      description: '确认发薪周期、覆盖员工以及预计成本。',
      body: `
        <div class="split">
          <div class="metric">
            <span>发薪周期</span>
            <strong>2024/03/01 - 2024/03/15</strong>
          </div>
          <div class="metric">
            <span>发薪日期</span>
            <strong>2024/03/22</strong>
          </div>
          <div class="metric">
            <span>员工数量</span>
            <strong>127 人</strong>
          </div>
          <div class="metric">
            <span>预计总额</span>
            <strong>$468,200</strong>
          </div>
        </div>
        <p class="subtitle">检查是否存在异常提醒：</p>
        <ul class="feature-list">
          <li>2 位员工地址变更，需确认税务档案</li>
          <li>仓储班次存在 1 条未批准的加班</li>
        </ul>
      `,
    },
    {
      id: 'timecards',
      title: '工时核对',
      description: '核对所有非豁免员工的打卡与加班状态。',
      body: `
        <table class="table">
          <thead>
            <tr>
              <th>员工</th>
              <th>计划工时</th>
              <th>实际工时</th>
              <th>差异</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>王强</td>
              <td>80h</td>
              <td>84h</td>
              <td>+4h</td>
              <td><span class="badge warning">等待审批</span></td>
            </tr>
            <tr>
              <td>赵敏</td>
              <td>80h</td>
              <td>80h</td>
              <td>0</td>
              <td><span class="badge success">已完成</span></td>
            </tr>
            <tr>
              <td>李娜</td>
              <td>80h</td>
              <td>79h</td>
              <td>-1h</td>
              <td><span class="badge success">已完成</span></td>
            </tr>
          </tbody>
        </table>
      `,
    },
    {
      id: 'deductions',
      title: '扣减与福利',
      description: '确认健康保险、401K、奖金等变动项目。',
      body: `
        <div class="split">
          <div class="card" style="box-shadow:none;border:1px solid var(--border);">
            <h3>福利项目概览</h3>
            <ul class="feature-list">
              <li>401K 递延：$32,800</li>
              <li>医疗保险：$18,420</li>
              <li>餐补与交通：$5,120</li>
            </ul>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border);">
            <h3>本期临时项</h3>
            <ul class="feature-list">
              <li>季度奖金：$24,000 (8 人)</li>
              <li>入职奖金：$6,500 (2 人)</li>
              <li>工会扣费：$2,130</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: 'preview',
      title: '结果预览',
      description: '查看净薪资、税费与发薪明细，下载验证报表。',
      body: `
        <div class="split">
          <div class="metric">
            <span>净薪资</span>
            <strong>$342,600</strong>
          </div>
          <div class="metric">
            <span>雇主税费</span>
            <strong>$68,120</strong>
          </div>
          <div class="metric">
            <span>福利成本</span>
            <strong>$39,480</strong>
          </div>
        </div>
        <button class="secondary-button">下载对账报表 (Excel)</button>
      `,
    },
    {
      id: 'confirm',
      title: '提交与发薪',
      description: '确认无误后提交批次，系统将按计划发薪。',
      body: `
        <div class="highlight">
          <p>所有必填步骤均已完成。</p>
          <p>自动化审核通过：税务、福利、合规。</p>
          <p>下一步：在 3 月 21 日 17:00 前可撤回。</p>
        </div>
        <button class="primary-button">提交薪资批次</button>
      `,
    },
  ];

  let activeIndex = 0;

  const renderSteps = () => {
    stepper.innerHTML = '';
    steps.forEach((step, index) => {
      const node = document.createElement('div');
      node.className = `step ${index === activeIndex ? 'active' : ''}`;
      node.innerHTML = `
        <div class="index">${index + 1}</div>
        <div>
          <div style="font-weight:600;">${step.title}</div>
          <div>${step.description}</div>
        </div>
      `;
      node.addEventListener('click', () => {
        activeIndex = index;
        update();
      });
      stepper.appendChild(node);
    });
  };

  const update = () => {
    renderSteps();
    const step = steps[activeIndex];
    content.innerHTML = `
      <h3>${step.title}</h3>
      <p class="subtitle">${step.description}</p>
      ${step.body}
      <div class="step-actions">
        <button class="ghost-button" ${activeIndex === 0 ? 'disabled' : ''}>上一步</button>
        <button class="primary-button">${activeIndex === steps.length - 1 ? '完成' : '下一步'}</button>
      </div>
    `;
    const [prevBtn, nextBtn] = $$('button', content).slice(-2);
    prevBtn?.addEventListener('click', () => {
      if (activeIndex === 0) return;
      activeIndex -= 1;
      update();
    });
    nextBtn?.addEventListener('click', () => {
      if (activeIndex === steps.length - 1) return;
      activeIndex += 1;
      update();
    });
  };

  update();
};

const renderTimeAttendance = () => {
  const tabs = $('[data-time-tabs]');
  if (!tabs) return;

  const views = {
    attendance: `
      <table class="table">
        <thead>
          <tr>
            <th>员工</th>
            <th>日期</th>
            <th>异常类型</th>
            <th>说明</th>
            <th>处理状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>王强</td>
            <td>3/11 (周一)</td>
            <td>加班未审批</td>
            <td>系统识别 4 小时加班</td>
            <td><span class="badge warning">待审批</span></td>
          </tr>
          <tr>
            <td>李娜</td>
            <td>3/09 (周六)</td>
            <td>缺卡</td>
            <td>午休未打卡，自动补全</td>
            <td><span class="badge success">已修正</span></td>
          </tr>
        </tbody>
      </table>
    `,
    scheduling: `
      <div class="split">
        <div class="card" style="box-shadow:none;border:1px solid var(--border);">
          <h3>本周排班</h3>
          <ul class="feature-list">
            <li>白班：45 人</li>
            <li>中班：18 人</li>
            <li>夜班：12 人</li>
            <li>缺口：仓储夜班 2 人</li>
          </ul>
        </div>
        <div class="card" style="box-shadow:none;border:1px solid var(--border);">
          <h3>AI 建议</h3>
          <ul class="feature-list">
            <li>建议夜班补班：李雷 (可用) / 韩梅梅 (可用)</li>
            <li>下周二仓储高峰，建议提前派班</li>
          </ul>
        </div>
      </div>
    `,
    requests: `
      <table class="table">
        <thead>
          <tr>
            <th>员工</th>
            <th>类型</th>
            <th>日期</th>
            <th>时长</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>赵敏</td>
            <td>远程办公</td>
            <td>3/20</td>
            <td>1 天</td>
            <td><span class="badge success">已批准</span></td>
          </tr>
          <tr>
            <td>王强</td>
            <td>调班</td>
            <td>3/15</td>
            <td>1 班次</td>
            <td><span class="badge warning">待确认</span></td>
          </tr>
        </tbody>
      </table>
    `,
  };

  const panels = $('[data-time-panel]');

  const update = (target) => {
    $$('button', tabs).forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === target));
    panels.innerHTML = views[target];
  };

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-tab]');
    if (!button) return;
    update(button.dataset.tab);
  });

  update('attendance');
};

const renderTalent = () => {
  const tabs = $('[data-talent-tabs]');
  const panel = $('[data-talent-panel]');
  if (!tabs || !panel) return;

  const content = {
    performance: `
      <div class="split">
        <div class="metric">
          <span>季度评估完成率</span>
          <strong>82%</strong>
        </div>
        <div class="metric">
          <span>高绩效比例</span>
          <strong>21%</strong>
        </div>
        <div class="metric">
          <span>需关注员工</span>
          <strong>8 人</strong>
        </div>
      </div>
      <h3>重点关注</h3>
      <ul class="feature-list">
        <li>2 个团队绩效评分低于 3.0，建议安排教练辅导</li>
        <li>技术部待提交评估：3 份</li>
      </ul>
    `,
    goals: `
      <div class="split">
        <div class="metric">
          <span>公司 OKR 完成度</span>
          <strong>68%</strong>
        </div>
        <div class="metric">
          <span>个人目标对齐率</span>
          <strong>91%</strong>
        </div>
        <div class="metric">
          <span>本周更新</span>
          <strong>36 项</strong>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>目标</th>
            <th>负责人</th>
            <th>进度</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>提升客户满意度至 92%</td>
            <td>张伟</td>
            <td>78%</td>
            <td><span class="badge success">正常</span></td>
          </tr>
          <tr>
            <td>完成新产品发布</td>
            <td>赵敏</td>
            <td>64%</td>
            <td><span class="badge warning">风险</span></td>
          </tr>
        </tbody>
      </table>
    `,
    learning: `
      <div class="split">
        <div class="metric">
          <span>学习完成率</span>
          <strong>74%</strong>
        </div>
        <div class="metric">
          <span>必修课程</span>
          <strong>12 门</strong>
        </div>
        <div class="metric">
          <span>学习时长</span>
          <strong>1,240 小时</strong>
        </div>
      </div>
      <ul class="feature-list">
        <li>推荐：领导力成长营 (适用于新晋经理)</li>
        <li>合规必修：多元化与包容性培训 (截止 4/01)</li>
        <li>AI 推荐：薪酬分析数据课程</li>
      </ul>
    `,
  };

  const update = (target) => {
    $$('button', tabs).forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === target));
    panel.innerHTML = content[target];
  };

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-tab]');
    if (!button) return;
    update(button.dataset.tab);
  });

  update('performance');
};

const renderAnalytics = () => {
  const select = $('[data-period-select]');
  const container = $('[data-analytics]');
  if (!select || !container) return;

  const datasets = {
    quarterly: {
      payrollCost: '$1.42M',
      turnoverRate: '12%',
      selfService: '78%',
      trends: [
        { label: '一月', value: 72 },
        { label: '二月', value: 68 },
        { label: '三月', value: 80 },
      ],
    },
    yearly: {
      payrollCost: '$5.48M',
      turnoverRate: '14%',
      selfService: '74%',
      trends: [
        { label: '2021', value: 54 },
        { label: '2022', value: 63 },
        { label: '2023', value: 78 },
      ],
    },
    monthly: {
      payrollCost: '$468K',
      turnoverRate: '1.2%',
      selfService: '82%',
      trends: [
        { label: '第 1 周', value: 80 },
        { label: '第 2 周', value: 76 },
        { label: '第 3 周', value: 84 },
      ],
    },
  };

  const render = (dataset) => {
    container.innerHTML = `
      <div class="split">
        <div class="metric">
          <span>薪酬成本</span>
          <strong>${dataset.payrollCost}</strong>
        </div>
        <div class="metric">
          <span>离职率</span>
          <strong>${dataset.turnoverRate}</strong>
        </div>
        <div class="metric">
          <span>员工自助使用率</span>
          <strong>${dataset.selfService}</strong>
        </div>
      </div>
      <div class="card" style="box-shadow:none;border:1px solid var(--border);">
        <h3>趋势分析</h3>
        <div class="chart">
          <div class="chart-bars">
            ${dataset.trends
              .map(
                (item) => `
                  <div class="chart-bar">
                    <span>${item.label}</span>
                    <div class="bar-track"><div class="bar-fill" style="width:${item.value}%;"></div></div>
                    <strong>${item.value}%</strong>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  };

  select.addEventListener('change', (event) => {
    const dataset = datasets[event.target.value];
    render(dataset);
  });

  render(datasets[select.value]);
};

const init = () => {
  const page = document.body.dataset.page;
  renderModuleOverview();
  if (page === 'employees') renderEmployeeDirectory();
  if (page === 'payroll') renderPayroll();
  if (page === 'time') renderTimeAttendance();
  if (page === 'talent') renderTalent();
  if (page === 'analytics') renderAnalytics();
};

document.addEventListener('DOMContentLoaded', init);
