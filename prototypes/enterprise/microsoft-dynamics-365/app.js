const roles = {
  sales: {
    id: 'sales',
    name: '销售经理',
    description: '以客户和业绩为中心的销售管控',
    defaultView: 'sales-dashboard',
    menu: [
      { label: '销售工作台', view: 'sales-dashboard', icon: '📊' },
      { label: '潜客列表', view: 'sales-leads', icon: '🧲' },
      { label: '商机看板', view: 'sales-opportunities', icon: '🎯' },
      { label: '报价与合同', view: 'sales-quotes', icon: '📝' },
      { label: '销售预测', view: 'sales-forecast', icon: '📈' },
      { label: '活动任务', view: 'sales-activities', icon: '📆' }
    ]
  },
  service: {
    id: 'service',
    name: '客服主管',
    description: '全渠道的客户服务与满意度管理',
    defaultView: 'cs-dashboard',
    menu: [
      { label: '客服指挥中心', view: 'cs-dashboard', icon: '🎧' },
      { label: '工单队列', view: 'cs-cases', icon: '🗂️' },
      { label: '知识库', view: 'cs-knowledge', icon: '📚' },
      { label: '排班与 SLA', view: 'cs-sla', icon: '⏱️' },
      { label: '全渠道监控', view: 'cs-omnichannel', icon: '🌐' },
      { label: '客户满意度', view: 'cs-survey', icon: '💬' }
    ]
  },
  finance: {
    id: 'finance',
    name: '财务总监',
    description: '统一的财务数据与风险监控',
    defaultView: 'finance-dashboard',
    menu: [
      { label: '财务总览', view: 'finance-dashboard', icon: '💼' },
      { label: '应收账款', view: 'finance-ar', icon: '📥' },
      { label: '应付账款', view: 'finance-ap', icon: '📤' },
      { label: '预算执行', view: 'finance-budget', icon: '🧮' },
      { label: '费用报销', view: 'finance-expense', icon: '🧾' },
      { label: '结账流程', view: 'finance-close', icon: '✅' }
    ]
  },
  operations: {
    id: 'operations',
    name: '运营主管',
    description: '供应链、生产与现场执行协同',
    defaultView: 'ops-dashboard',
    menu: [
      { label: '供应链驾驶舱', view: 'ops-dashboard', icon: '🚀' },
      { label: '库存管理', view: 'ops-inventory', icon: '📦' },
      { label: '采购订单', view: 'ops-procurement', icon: '🛒' },
      { label: '生产计划', view: 'ops-production', icon: '🏭' },
      { label: '物流跟踪', view: 'ops-logistics', icon: '🚚' },
      { label: '设备维护', view: 'ops-maintenance', icon: '🛠️' }
    ]
  }
};

const views = {
  'sales-dashboard': {
    role: 'sales',
    title: '销售工作台',
    subtitle: '实时掌握销售漏斗与团队重点任务',
    breadcrumbs: ['销售管理', '销售工作台'],
    hero: {
      title: '季度销售业绩节奏',
      description: '基于 Dynamics 365 Sales 自动聚合的商机、预测与成交率趋势。'
    },
    actions: [
      { label: '新建商机', view: 'sales-opportunity-detail', style: 'primary' },
      { label: '分配任务', view: 'sales-activities', style: 'secondary' }
    ],
    sections: [
      {
        type: 'grid',
        columns: 3,
        cards: [
          {
            title: '当季目标达成',
            value: '68%',
            trend: { type: 'positive', text: '较上月 +6%' },
            hint: '预计 6.3M / 目标 9.2M'
          },
          {
            title: '活跃商机',
            value: '124',
            trend: { type: 'neutral', text: '重点跟进 18 条' },
            hint: '<a class="inline-link" href="?view=sales-opportunities">跳转商机看板</a>'
          },
          {
            title: '预测准确度',
            value: '82%',
            trend: { type: 'positive', text: 'AI 提升 +4%' },
            hint: 'AI 预测区间 ±8%'
          }
        ]
      },
      {
        type: 'split',
        left: {
          title: '漏斗阶段概览',
          content: `
            <div class="kanban">
              <div class="kanban-column">
                <h4>线索 (36)</h4>
                <div class="kanban-card">
                  <div class="title">华东渠道采购</div>
                  <div class="meta">评分 86 · 转化率 37%</div>
                </div>
                <div class="kanban-card">
                  <div class="title">南区代理升级计划</div>
                  <div class="meta">评分 78 · SLA 24 小时</div>
                </div>
              </div>
              <div class="kanban-column">
                <h4>商机 (68)</h4>
                <div class="kanban-card">
                  <div class="title">京沪大型零售采购</div>
                  <div class="meta">¥2.4M · 概率 55%</div>
                  <div class="view-switch-links">
                    <a href="?view=sales-opportunity-detail">查看详情</a>
                    <a href="?view=sales-quotes">生成报价</a>
                  </div>
                </div>
                <div class="kanban-card">
                  <div class="title">跨境 SaaS 联合方案</div>
                  <div class="meta">¥1.1M · 概率 42%</div>
                </div>
              </div>
              <div class="kanban-column">
                <h4>签约 (20)</h4>
                <div class="kanban-card">
                  <div class="title">华南制造集团续约</div>
                  <div class="meta">预计签约 7 天</div>
                  <div class="view-switch-links">
                    <a href="?view=sales-quotes">合同审批</a>
                  </div>
                </div>
                <div class="kanban-card">
                  <div class="title">政府行业数智项目</div>
                  <div class="meta">跨部门协同</div>
                </div>
              </div>
            </div>
          `
        },
        right: {
          title: '关键提醒',
          content: `
            <div class="list">
              <div class="list-item">
                <div>
                  <div class="label">今日需拜访客户</div>
                  <div class="value">张伟 / 城市交通集团</div>
                </div>
                <a class="inline-link" href="?view=sales-activities">查看任务</a>
              </div>
              <div class="list-item">
                <div>
                  <div class="label">AI 推荐下一步</div>
                  <div class="value">发送价值证明资料给蓝海零售</div>
                </div>
                <span class="badge info">AI Insight</span>
              </div>
              <div class="list-item">
                <div>
                  <div class="label">临近失效报价</div>
                  <div class="value">共 3 份，最高金额 ¥420K</div>
                </div>
                <a class="inline-link" href="?view=sales-quotes">刷新报价</a>
              </div>
            </div>
          `
        }
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>统一跟踪商机进展、资源分配与预测准确度，支撑季度目标落地。</p>
      <p><strong>关键流程：</strong>从线索培育到合同签署的端到端流程均可在此调度，并支持 AI 建议与团队协作。</p>
    `
  },
  'sales-leads': {
    role: 'sales',
    title: '潜客列表',
    subtitle: '聚合市场营销与外呼来源的全部潜客',
    breadcrumbs: ['销售管理', '潜客列表'],
    hero: {
      title: '潜客优先级评分模型',
      description: '实时同步 Marketing 自动化评分，快速筛选高意向客户。'
    },
    actions: [
      { label: '导入 Excel', view: 'sales-leads-import', style: 'secondary' },
      { label: '新建潜客', view: 'sales-lead-detail', style: 'primary' }
    ],
    sections: [
      {
        type: 'table',
        title: '潜客清单',
        headers: ['潜客名称', '来源渠道', '评分', '最新互动', '负责人', '操作'],
        rows: [
          ['星汉数字科技', '线上研讨会', '<span class="badge success">A 级</span>', '1 小时前 · 提交 demo 申请', '周颖', '<div class="table-actions"><a href="?view=sales-lead-detail">打开详情</a></div>'],
          ['华北零售同盟', '广告投放', '<span class="badge warning">B 级</span>', '昨天 · 下载白皮书', '李雷', '<div class="table-actions"><a href="?view=sales-opportunity-detail">转为商机</a></div>'],
          ['宏盛制造集团', '展会线索', '<span class="badge neutral">C 级</span>', '2 天前 · 邮件沟通', '陈薇', '<div class="table-actions"><a href="?view=sales-lead-detail">更新进展</a></div>']
        ]
      },
      {
        type: 'section',
        title: '线索渠道构成',
        content: `
          <div class="two-column">
            <div class="card">
              <h3>来源占比</h3>
              <div class="chart-placeholder">图表示例：广告 32% · 活动 28% · 转介绍 25% · 其他 15%</div>
            </div>
            <div class="card">
              <h3>响应 SLA</h3>
              <div class="list">
                <div class="list-item"><span class="label">营销自动转交</span><span class="value">平均 35 分钟</span></div>
                <div class="list-item"><span class="label">销售首次响应</span><span class="value">平均 2.1 小时</span></div>
                <div class="list-item"><span class="label">自动分配规则</span><span class="value">地域 + 行业 + 得分</span></div>
              </div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>统一潜客信息、提高响应效率，减少高意向客户流失。</p>
      <p><strong>配合流程：</strong>结合 Power Automate 对接市场活动，支持快速转商机与拜访安排。</p>
    `
  },
  'sales-opportunities': {
    role: 'sales',
    title: '商机看板',
    subtitle: '以阶段驱动的商机协作与预测调整',
    breadcrumbs: ['销售管理', '商机看板'],
    hero: {
      title: '团队商机负载情况',
      description: '实时查看不同阶段的金额与胜率分布，支持拖拽流转。'
    },
    actions: [
      { label: '创建报价', view: 'sales-quotes', style: 'secondary' },
      { label: '生成预测', view: 'sales-forecast', style: 'primary' }
    ],
    sections: [
      {
        type: 'kanban',
        columns: [
          {
            title: '接洽 (¥1.2M)',
            cards: [
              { title: '星汉数字科技', meta: '负责人：周颖 · 概率 35%', view: 'sales-opportunity-detail' },
              { title: '华北零售同盟', meta: '负责人：李雷 · 概率 28%', view: 'sales-opportunity-detail' }
            ]
          },
          {
            title: '方案 (¥2.8M)',
            cards: [
              { title: '宏盛制造集团', meta: '负责人：陈薇 · 概率 45%', view: 'sales-opportunity-detail' },
              { title: '东南物流集团', meta: '负责人：王俊 · 概率 50%', view: 'sales-opportunity-detail' }
            ]
          },
          {
            title: '谈判 (¥1.6M)',
            cards: [
              { title: '蓝海零售', meta: '负责人：周颖 · 概率 64%', view: 'sales-opportunity-detail' },
              { title: '城市交通集团', meta: '负责人：张伟 · 概率 72%', view: 'sales-opportunity-detail' }
            ]
          }
        ]
      },
      {
        type: 'metrics',
        title: 'AI 预测与风险提醒',
        metrics: [
          { label: '本月预测金额', value: '¥3.9M', trend: '较目标 -8%' },
          { label: '高风险商机', value: '6 条', trend: '需补充决策人' },
          { label: '平均转化周期', value: '42 天', trend: '优于去年 5 天' }
        ],
        links: [
          { label: '查看 AI 建议', view: 'sales-opportunity-detail' },
          { label: '风险商机清单', view: 'sales-activities' }
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>为销售团队提供实时协作视图，快速识别风险与调整预测。</p>
      <p><strong>关键动作：</strong>结合 Power BI 预测模型，自动标记缺失决策人、预算等信息。</p>
    `
  },
  'sales-quotes': {
    role: 'sales',
    title: '报价与合同',
    subtitle: '统一生成报价、审批流程与合同版本',
    breadcrumbs: ['销售管理', '报价与合同'],
    hero: {
      title: '报价自动化工作流',
      description: '对接产品目录与折扣策略，自动生成 PDF 并触发审批。'
    },
    actions: [
      { label: '新建报价', view: 'sales-quote-editor', style: 'primary' },
      { label: '审批队列', view: 'sales-quote-approvals', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '近期报价',
        headers: ['报价编号', '客户', '金额', '状态', '有效期', '操作'],
        rows: [
          ['QT-2024-198', '蓝海零售', '¥420,000', '<span class="badge warning">待审批</span>', '2024-06-30', '<div class="table-actions"><a href="?view=sales-quote-editor">编辑</a></div>'],
          ['QT-2024-205', '星汉数字科技', '¥1,280,000', '<span class="badge success">已签署</span>', '2024-07-12', '<div class="table-actions"><a href="?view=sales-contract-detail">查看合同</a></div>'],
          ['QT-2024-189', '城市交通集团', '¥860,000', '<span class="badge neutral">已发送</span>', '2024-06-20', '<div class="table-actions"><a href="?view=sales-contract-detail">跟踪反馈</a></div>']
        ]
      },
      {
        type: 'section',
        title: '审批进度追踪',
        content: `
          <div class="timeline">
            <div class="timeline-item">
              <div class="time">09:20</div>
              <div class="content"><strong>王俊</strong> 提交报价 <a class="inline-link" href="?view=sales-quote-editor">QT-2024-214</a>，系统自动校验折扣上限。</div>
            </div>
            <div class="timeline-item">
              <div class="time">09:48</div>
              <div class="content">审批人 <strong>刘敏</strong> 通过 <span class="badge success">折扣 15%</span>，推送至法务复核。</div>
            </div>
            <div class="timeline-item">
              <div class="time">10:05</div>
              <div class="content">法务上传合同模板 V2，等待客户电子签署。</div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>规范报价审批与合同归档，保障折扣策略与合规。</p>
      <p><strong>系统联动：</strong>整合产品、定价、法务模板，并支持 DocuSign 电子签署。</p>
    `
  },
  'sales-quote-approvals': {
    role: 'sales',
    title: '报价审批队列',
    subtitle: '审批人待处理的报价与折扣申请',
    breadcrumbs: ['销售管理', '报价与合同', '审批队列'],
    hero: {
      title: '待审批报价 5 份',
      description: '重点关注高折扣与临近失效的报价。'
    },
    actions: [
      { label: '返回报价列表', view: 'sales-quotes', style: 'secondary' },
      { label: '批量审批', view: 'sales-quotes', style: 'primary' }
    ],
    sections: [
      {
        type: 'table',
        title: '审批清单',
        headers: ['报价编号', '客户', '折扣', '金额', '提交人', '状态'],
        rows: [
          ['QT-2024-214', '蓝海零售', '15%', '¥480,000', '王俊', '<span class="badge warning">待财务确认</span>'],
          ['QT-2024-216', '星汉数字', '8%', '¥320,000', '周颖', '<span class="badge success">通过</span>'],
          ['QT-2024-218', '城市交通', '18%', '¥680,000', '张伟', '<span class="badge warning">超出授权</span>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>透明管理审批进度，避免报价过期。</p>
      <p><strong>协同：</strong>与财务、法务联动控制折扣政策。</p>
    `
  },
  'sales-forecast': {
    role: 'sales',
    title: '销售预测',
    subtitle: 'AI 加权的团队预测与场景模拟',
    breadcrumbs: ['销售管理', '销售预测'],
    hero: {
      title: '预测场景对比',
      description: '模拟不同折扣策略、团队配额分配对预测的影响。'
    },
    actions: [
      { label: '生成预测快照', view: 'sales-forecast', style: 'primary' },
      { label: '导出 Power BI', view: 'sales-forecast', style: 'secondary' }
    ],
    sections: [
      {
        type: 'metrics',
        title: '季度预测概览',
        metrics: [
          { label: '提交预测', value: '¥9.8M', trend: '覆盖率 106%' },
          { label: 'AI 调整值', value: '+¥0.6M', trend: '关键因素：高概率商机' },
          { label: '信心指数', value: '4.2 / 5', trend: '来源：销售自评 + 历史表现' }
        ],
        links: [
          { label: '查看低信心团队', view: 'sales-forecast-team' },
          { label: '打开预测提交流程', view: 'sales-forecast-team' }
        ]
      },
      {
        type: 'section',
        title: '场景模拟器',
        content: `
          <div class="split">
            <div class="card">
              <h3>策略参数</h3>
              <div class="list">
                <div class="list-item"><span class="label">平均折扣率</span><span class="value">12% → 10%</span></div>
                <div class="list-item"><span class="label">新增 HC</span><span class="value">+2 (华东 &amp; 华南)</span></div>
                <div class="list-item"><span class="label">营销预算</span><span class="value">+¥0.4M</span></div>
              </div>
              <div class="view-switch-links">
                <a href="?view=sales-forecast-team">查看团队提交</a>
                <a href="?view=sales-dashboard">返回工作台</a>
              </div>
            </div>
            <div class="card">
              <h3>预测结果</h3>
              <div class="chart-placeholder">趋势图示例：最优场景 11.6M · 保守场景 9.1M</div>
              <div class="alert">AI 建议增加客户成功参与可提高续约率 3.8%。</div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提供统一预测口径，支持多场景模拟并辅以 AI 调整。</p>
      <p><strong>协作方式：</strong>销售、财务、运营共享预测数据，联动库存与生产策略。</p>
    `
  },
  'sales-activities': {
    role: 'sales',
    title: '活动任务',
    subtitle: '聚合拜访、电话与 Teams 协作任务',
    breadcrumbs: ['销售管理', '活动任务'],
    hero: {
      title: '今日任务概览',
      description: '自动同步 Outlook 日历与 Teams 任务，避免遗漏客户沟通。'
    },
    actions: [
      { label: '创建任务', view: 'sales-activity-detail', style: 'primary' },
      { label: '查看路线图', view: 'sales-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '团队任务列表',
        content: `
          <div class="list">
            <div class="list-item">
              <div>
                <div class="label">拜访 · 城市交通集团</div>
                <div class="value">负责人：张伟 · 14:00</div>
              </div>
              <a class="inline-link" href="?view=sales-activity-detail">查看详情</a>
            </div>
            <div class="list-item">
              <div>
                <div class="label">线上演示 · 蓝海零售</div>
                <div class="value">负责人：周颖 · 16:30</div>
              </div>
              <a class="inline-link" href="?view=sales-activity-detail">加入会议</a>
            </div>
            <div class="list-item">
              <div>
                <div class="label">报价跟进 · 星汉数字科技</div>
                <div class="value">负责人：陈薇 · 截止 18:00</div>
              </div>
              <a class="inline-link" href="?view=sales-quotes">刷新报价</a>
            </div>
          </div>
        `
      },
      {
        type: 'section',
        title: '沟通时间线',
        content: `
          <div class="timeline">
            <div class="timeline-item">
              <div class="time">09:00</div>
              <div class="content">AI 建议发送试用邀请给 <strong>南区代理升级计划</strong>。</div>
            </div>
            <div class="timeline-item">
              <div class="time">10:30</div>
              <div class="content">团队同步会议 · <a class="inline-link" href="?view=sales-dashboard">查看纪要</a></div>
            </div>
            <div class="timeline-item">
              <div class="time">11:15</div>
              <div class="content">跟进 <strong>蓝海零售</strong> 报价审批，提醒法务确认。</div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>集中管理所有销售活动，确保客户接触节奏。</p>
      <p><strong>协同工具：</strong>与 Outlook、Teams、Power Automate 无缝集成。</p>
    `
  },
  'sales-opportunity-detail': {
    role: 'sales',
    title: '商机详情 - 蓝海零售',
    subtitle: '从需求分析到报价审批的完整信息视图',
    breadcrumbs: ['销售管理', '商机看板', '商机详情'],
    hero: {
      title: '关键信息概览',
      description: 'AI 自动生成摘要，帮助快速对齐策略。'
    },
    actions: [
      { label: '推进到谈判', view: 'sales-opportunities', style: 'primary' },
      { label: '发起协同', view: 'sales-activities', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '客户画像与需求',
        content: `
          <div class="two-column">
            <div class="card">
              <h3>客户基础信息</h3>
              <div class="list">
                <div class="list-item"><span class="label">行业</span><span class="value">连锁零售</span></div>
                <div class="list-item"><span class="label">规模</span><span class="value">320+ 门店</span></div>
                <div class="list-item"><span class="label">CRM 系统</span><span class="value">原 Salesforce</span></div>
              </div>
            </div>
            <div class="card">
              <h3>核心需求</h3>
              <ul>
                <li>统一会员管理与全渠道促销</li>
                <li>门店库存自动补货建议</li>
                <li>与 Power BI 的数据联动</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        type: 'section',
        title: '进展时间线',
        content: `
          <div class="timeline">
            <div class="timeline-item">
              <div class="time">05-28</div>
              <div class="content">市场活动转化为商机，AI 推荐负责人 <strong>周颖</strong>。</div>
            </div>
            <div class="timeline-item">
              <div class="time">06-02</div>
              <div class="content">完成方案演示，与 IT 部门确认系统对接。</div>
            </div>
            <div class="timeline-item">
              <div class="time">06-05</div>
              <div class="content">提交报价 <a class="inline-link" href="?view=sales-quote-editor">QT-2024-214</a>，等待审批。</div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>快速洞察商机信息，协调跨团队资源，提高赢单率。</p>
      <p><strong>下一步建议：</strong>邀请客户成功团队参与试点门店部署。</p>
    `
  },
  'sales-quote-editor': {
    role: 'sales',
    title: '报价编辑器',
    subtitle: '拖拽组件快速生成标准化报价',
    breadcrumbs: ['销售管理', '报价与合同', '报价编辑器'],
    hero: {
      title: '报价结构预览',
      description: '根据产品目录与折扣策略自动生成条款。'
    },
    actions: [
      { label: '保存草稿', view: 'sales-quotes', style: 'secondary' },
      { label: '提交审批', view: 'sales-quotes', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '报价内容',
        content: `
          <div class="split">
            <div class="card">
              <h3>产品明细</h3>
              <table class="table">
                <thead><tr><th>项目</th><th>数量</th><th>折扣</th><th>金额</th></tr></thead>
                <tbody>
                  <tr><td>Dynamics 365 Sales Premium</td><td>120</td><td>12%</td><td>¥360,000</td></tr>
                  <tr><td>Power BI Pro</td><td>160</td><td>5%</td><td>¥128,000</td></tr>
                  <tr><td>实施服务包</td><td>1</td><td>0%</td><td>¥220,000</td></tr>
                </tbody>
              </table>
            </div>
            <div class="card">
              <h3>条款 &amp; 审批</h3>
              <div class="list">
                <div class="list-item"><span class="label">付款条款</span><span class="value">30% 预付 · 40% 交付 · 30% 验收</span></div>
                <div class="list-item"><span class="label">折扣策略</span><span class="value">符合标准折扣</span></div>
                <div class="list-item"><span class="label">审批路径</span><span class="value">销售经理 → 财务 → 法务</span></div>
              </div>
              <div class="view-switch-links">
                <a href="?view=sales-quotes">返回列表</a>
                <a href="?view=sales-contract-detail">预览合同</a>
              </div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>降低报价制作时间，确保折扣与条款符合政策。</p>
      <p><strong>系统联动：</strong>可调用 Power Automate 触发审批通知。</p>
    `
  },
  'sales-contract-detail': {
    role: 'sales',
    title: '合同详情 - 蓝海零售',
    subtitle: '追踪合同版本、审批与签署状态',
    breadcrumbs: ['销售管理', '报价与合同', '合同详情'],
    hero: {
      title: '合同执行概况',
      description: '从拟定到签署的全过程跟踪。'
    },
    actions: [
      { label: '下载 PDF', view: 'sales-contract-detail', style: 'secondary' },
      { label: '提醒签署', view: 'sales-contract-detail', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '版本记录',
        content: `
          <table class="table">
            <thead><tr><th>版本</th><th>更新时间</th><th>更新人</th><th>备注</th></tr></thead>
            <tbody>
              <tr><td>V1</td><td>06-02 14:20</td><td>王俊</td><td>初版条款</td></tr>
              <tr><td>V2</td><td>06-05 09:48</td><td>刘敏</td><td>新增数据安全条款</td></tr>
              <tr><td>V3</td><td>06-06 10:12</td><td>法务</td><td>确认签署方信息</td></tr>
            </tbody>
          </table>
        `
      },
      {
        type: 'section',
        title: '执行进度',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">审批状态</span><span class="value"><span class="badge success">财务通过</span></span></div>
            <div class="list-item"><span class="label">签署状态</span><span class="value">等待客户 CFO 签署</span></div>
            <div class="list-item"><span class="label">启用日期</span><span class="value">预计 2024-07-01</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>跟进合同执行风险，确保按计划签署。</p>
      <p><strong>提醒：</strong>可通过 Teams 提醒客户签署进度，避免延迟。</p>
    `
  },
  'sales-lead-detail': {
    role: 'sales',
    title: '潜客详情 - 星汉数字科技',
    subtitle: '线索来源、互动历史与转化建议',
    breadcrumbs: ['销售管理', '潜客列表', '潜客详情'],
    hero: {
      title: '线索评分 92 · 极高意向',
      description: '结合 Marketing 评分与行为数据生成。'
    },
    actions: [
      { label: '转为商机', view: 'sales-opportunity-detail', style: 'primary' },
      { label: '指派同事', view: 'sales-leads', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '互动记录',
        content: `
          <div class="timeline">
            <div class="timeline-item">
              <div class="time">06-01</div>
              <div class="content">参加「零售数智峰会」线下活动。</div>
            </div>
            <div class="timeline-item">
              <div class="time">06-03</div>
              <div class="content">下载 Dynamics 365 解决方案白皮书。</div>
            </div>
            <div class="timeline-item">
              <div class="time">06-05</div>
              <div class="content">预约 06-10 的产品演示。</div>
            </div>
          </div>
        `
      },
      {
        type: 'section',
        title: 'AI 转化建议',
        content: `
          <div class="alert">建议在 24 小时内安排资深顾问参与演示，可提升转化率 12%。</div>
          <div class="view-switch-links">
            <a href="?view=sales-activities">安排拜访</a>
            <a href="?view=sales-opportunity-detail">快速建商机</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>及时洞察潜客行为并采取行动。</p>
      <p><strong>后续动作：</strong>触发 Power Automate 通知客户成功团队。</p>
    `
  },
  'sales-leads-import': {
    role: 'sales',
    title: '导入潜客数据',
    subtitle: '通过模板批量导入潜客',
    breadcrumbs: ['销售管理', '潜客列表', '导入潜客'],
    hero: {
      title: '导入助手',
      description: '支持 Excel、CSV 与 Power Query 数据源。'
    },
    actions: [
      { label: '下载模板', view: 'sales-leads-import', style: 'secondary' },
      { label: '上传文件', view: 'sales-leads', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '导入步骤',
        content: `
          <ol>
            <li>下载最新模板并补充潜客信息。</li>
            <li>上传文件，系统自动校验字段。</li>
            <li>匹配重复记录并确认分配规则。</li>
          </ol>
          <div class="modal-hint">导入完成后可直接将高分线索推送到 <a class="inline-link" href="?view=sales-opportunities">商机看板</a>。</div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提升市场与销售交接效率，确保数据质量。</p>
      <p><strong>校验提醒：</strong>自动检测重复、缺失字段，并可定义自定义规则。</p>
    `
  },
  'sales-forecast-team': {
    role: 'sales',
    title: '团队预测提交流程',
    subtitle: '跟踪不同销售小组的预测状态',
    breadcrumbs: ['销售管理', '销售预测', '团队提交'],
    hero: {
      title: '提交概况',
      description: '确保各团队按时提交，并对预测差异进行说明。'
    },
    actions: [
      { label: '提醒未提交', view: 'sales-forecast-team', style: 'secondary' },
      { label: '整合预测', view: 'sales-forecast', style: 'primary' }
    ],
    sections: [
      {
        type: 'table',
        title: '团队提交状态',
        headers: ['团队', '提交人', '提交时间', '覆盖率', '备注', '操作'],
        rows: [
          ['华东一区', '周颖', '06-05 09:30', '112%', '新增 2 个高概率商机', '<div class="table-actions"><a href="?view=sales-opportunities">查看详情</a></div>'],
          ['华南大区', '王俊', '06-05 10:10', '96%', '待确认大型项目预算', '<div class="table-actions"><a href="?view=sales-opportunity-detail">补充信息</a></div>'],
          ['渠道事业部', '陈薇', '未提交', '—', '等待营销反馈', '<div class="table-actions"><a href="?view=sales-activities">发送提醒</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保预测按时提交，提升沟通效率。</p>
      <p><strong>协作方式：</strong>自动提醒未提交团队，并记录偏差原因。</p>
    `
  },
  'sales-activity-detail': {
    role: 'sales',
    title: '活动详情 - 城市交通集团拜访',
    subtitle: '详细的拜访计划与纪要',
    breadcrumbs: ['销售管理', '活动任务', '活动详情'],
    hero: {
      title: '拜访准备就绪',
      description: '确保拜访前资料齐全，拜访后及时记录。'
    },
    actions: [
      { label: '记录纪要', view: 'sales-activities', style: 'primary' },
      { label: '邀请同事', view: 'sales-activities', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '行程安排',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">时间</span><span class="value">06-06 14:00 - 15:30</span></div>
            <div class="list-item"><span class="label">地点</span><span class="value">上海总部 · 会议室 B2</span></div>
            <div class="list-item"><span class="label">与会者</span><span class="value">张伟、客户 CIO、客户运营经理</span></div>
          </div>
        `
      },
      {
        type: 'section',
        title: '准备资料',
        content: `
          <ul>
            <li>行业案例 PPT</li>
            <li>数字化评估报告</li>
            <li>报价草稿</li>
          </ul>
          <div class="view-switch-links">
            <a href="?view=sales-dashboard">查看工作台</a>
            <a href="?view=sales-opportunity-detail">关联商机</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>标准化拜访流程，确保信息沉淀。</p>
      <p><strong>协作：</strong>与 Teams 会议纪要、OneNote 等工具同步。</p>
    `
  },
  'cs-dashboard': {
    role: 'service',
    title: '客服指挥中心',
    subtitle: '全渠道服务态势与 SLA 监控',
    breadcrumbs: ['客户服务', '客服指挥中心'],
    hero: {
      title: '实时服务热度',
      description: '融合电话、聊天、邮件等渠道的实时数据。'
    },
    actions: [
      { label: '分配工单', view: 'cs-cases', style: 'primary' },
      { label: '调整排班', view: 'cs-sla', style: 'secondary' }
    ],
    sections: [
      {
        type: 'grid',
        columns: 3,
        cards: [
          { title: '活跃工单', value: '286', trend: { type: 'warning', text: '高于 SLA 阈值' }, hint: '<a class="inline-link" href="?view=cs-cases">查看队列</a>' },
          { title: '今日满意度', value: '4.6 / 5', trend: { type: 'positive', text: '收集反馈 96 份' }, hint: '<a class="inline-link" href="?view=cs-survey">分析反馈</a>' },
          { title: '在线坐席', value: '48', trend: { type: 'neutral', text: '排班利用率 92%' }, hint: '<a class="inline-link" href="?view=cs-sla">查看排班</a>' }
        ]
      },
      {
        type: 'split',
        left: {
          title: '渠道实时监控',
          content: `
            <div class="board">
              <div class="tile"><h4>电话</h4><div class="value">68 通</div><div class="progress"><span style="width: 72%; background: var(--primary);"></span></div></div>
              <div class="tile"><h4>在线聊天</h4><div class="value">120 会话</div><div class="progress"><span style="width: 84%; background: var(--accent);"></span></div></div>
              <div class="tile"><h4>邮件</h4><div class="value">56 封</div><div class="progress"><span style="width: 40%; background: var(--warning);"></span></div></div>
              <div class="tile"><h4>社交媒体</h4><div class="value">42 条</div><div class="progress"><span style="width: 32%; background: var(--positive);"></span></div></div>
            </div>
          `
        },
        right: {
          title: '紧急提醒',
          content: `
            <div class="list">
              <div class="list-item"><span class="label">物流延迟投诉</span><span class="value">需升级至运营团队</span></div>
              <div class="list-item"><span class="label">系统故障告警</span><span class="value">影响 12 个 VIP 客户</span></div>
              <div class="list-item"><span class="label">满意度低于 3</span><span class="value">来自华北门店</span></div>
            </div>
          `
        }
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>统一监控客服运行态势，快速响应异常。</p>
      <p><strong>协作：</strong>与运营、产品团队共享实时状态，支撑闭环。</p>
    `
  },
  'cs-cases': {
    role: 'service',
    title: '工单队列',
    subtitle: '多渠道工单统一分配与 SLA 管控',
    breadcrumbs: ['客户服务', '工单队列'],
    hero: {
      title: '队列健康度',
      description: '自动按照优先级、技能分组分配工单。'
    },
    actions: [
      { label: '新建工单', view: 'cs-case-detail', style: 'primary' },
      { label: '导入知识', view: 'cs-knowledge', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '今日工单',
        headers: ['工单编号', '渠道', '优先级', '状态', '负责人', '操作'],
        rows: [
          ['CS-10238', '在线聊天', '<span class="badge warning">高</span>', '处理中', '李想', '<div class="table-actions"><a href="?view=cs-case-detail">打开</a></div>'],
          ['CS-10241', '电话', '<span class="badge success">中</span>', '等待客户', '王芳', '<div class="table-actions"><a href="?view=cs-case-detail">更新</a></div>'],
          ['CS-10252', '邮件', '<span class="badge neutral">低</span>', '新建', '智能分配', '<div class="table-actions"><a href="?view=cs-case-detail">指派</a></div>']
        ]
      },
      {
        type: 'section',
        title: 'SLA 即将超时',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">CS-10238</span><span class="value">剩余 18 分钟</span></div>
            <div class="list-item"><span class="label">CS-10235</span><span class="value">等待客服主管确认</span></div>
            <div class="list-item"><span class="label">CS-10229</span><span class="value">影响 VIP 客户</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>按 SLA 管控工单处理，减少超时风险。</p>
      <p><strong>系统动作：</strong>AI 自动分配，支持升级到现场服务。</p>
    `
  },
  'cs-knowledge': {
    role: 'service',
    title: '知识库',
    subtitle: '构建一线客服的知识资产',
    breadcrumbs: ['客户服务', '知识库'],
    hero: {
      title: '高频问题一览',
      description: '基于反馈与 AI 推荐自动排序。'
    },
    actions: [
      { label: '创建知识', view: 'cs-knowledge-editor', style: 'primary' },
      { label: '查看推荐', view: 'cs-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '知识条目',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">SaaS 账号密码重置</span><span class="value">近 7 日调用 128 次</span></div>
            <div class="list-item"><span class="label">物流签收异常</span><span class="value">关联现场服务</span></div>
            <div class="list-item"><span class="label">门店设备激活</span><span class="value">AI 推荐更新</span></div>
          </div>
          <div class="view-switch-links">
            <a href="?view=cs-knowledge-editor">编辑文档</a>
            <a href="?view=cs-dashboard">返回指挥中心</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>沉淀知识，减少重复劳动。</p>
      <p><strong>协同：</strong>与 Power Virtual Agents 共享知识，支撑机器人回答。</p>
    `
  },
  'cs-sla': {
    role: 'service',
    title: '排班与 SLA',
    subtitle: '保障不同渠道的服务响应时间',
    breadcrumbs: ['客户服务', '排班与 SLA'],
    hero: {
      title: '排班执行率 92%',
      description: '智能推荐排班并平衡技能分布。'
    },
    actions: [
      { label: '调整排班', view: 'cs-schedule-editor', style: 'primary' },
      { label: '查看报表', view: 'cs-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '本周排班',
        content: `
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>日期</th><th>早班</th><th>中班</th><th>晚班</th><th>技能组</th></tr></thead>
              <tbody>
                <tr><td>周一</td><td>电话 (12)</td><td>全渠道 (10)</td><td>聊天 (8)</td><td>VIP / 技术</td></tr>
                <tr><td>周二</td><td>电话 (10)</td><td>全渠道 (12)</td><td>社媒 (6)</td><td>VIP / 社媒</td></tr>
                <tr><td>周三</td><td>现场 (6)</td><td>电话 (10)</td><td>聊天 (8)</td><td>现场服务</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        type: 'section',
        title: 'SLA 阈值',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">电话</span><span class="value">20 秒内接起 · 达成率 92%</span></div>
            <div class="list-item"><span class="label">聊天</span><span class="value">30 秒响应 · 达成率 88%</span></div>
            <div class="list-item"><span class="label">邮件</span><span class="value">4 小时回复 · 达成率 76%</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保排班匹配需求，维持 SLA。</p>
      <p><strong>协同：</strong>结合 Field Service，协调现场工程师支援。</p>
    `
  },
  'cs-omnichannel': {
    role: 'service',
    title: '全渠道监控',
    subtitle: '统一视图下的渠道表现与情绪分析',
    breadcrumbs: ['客户服务', '全渠道监控'],
    hero: {
      title: '渠道情绪热力图',
      description: '通过 AI 对话分析，实时感知客户情绪。'
    },
    actions: [
      { label: '打开情绪分析', view: 'cs-omnichannel', style: 'primary' },
      { label: '配置渠道', view: 'cs-omnichannel-settings', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '情绪概览',
        content: `
          <div class="board">
            <div class="tile"><h4>正向</h4><div class="value">64%</div><div class="progress"><span style="width: 64%; background: var(--positive);"></span></div></div>
            <div class="tile"><h4>中性</h4><div class="value">22%</div><div class="progress"><span style="width: 22%; background: var(--warning);"></span></div></div>
            <div class="tile"><h4>负向</h4><div class="value">14%</div><div class="progress"><span style="width: 14%; background: var(--negative);"></span></div></div>
            <div class="tile"><h4>NPS</h4><div class="value">38</div><div class="progress"><span style="width: 45%; background: var(--primary);"></span></div></div>
          </div>
        `
      },
      {
        type: 'section',
        title: '渠道详情',
        content: `
          <div class="kanban">
            <div class="kanban-column">
              <h4>社交媒体</h4>
              <div class="kanban-card"><div class="title">微博话题</div><div class="meta">情绪偏负 · 建议发声明</div></div>
              <div class="kanban-card"><div class="title">小红书</div><div class="meta">达人评测 4.8 分</div></div>
            </div>
            <div class="kanban-column">
              <h4>应用内聊天</h4>
              <div class="kanban-card"><div class="title">排队时长</div><div class="meta">平均 32 秒</div></div>
              <div class="kanban-card"><div class="title">关键词</div><div class="meta">物流 · 发票</div></div>
            </div>
            <div class="kanban-column">
              <h4>邮件</h4>
              <div class="kanban-card"><div class="title">响应 SLA</div><div class="meta">76% 达标</div></div>
              <div class="kanban-card"><div class="title">自动分类</div><div class="meta">AI 误判率 3%</div></div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>统一监控全渠道服务表现。</p>
      <p><strong>后续动作：</strong>向营销团队同步情绪热点，协调舆情应对。</p>
    `
  },
  'cs-survey': {
    role: 'service',
    title: '客户满意度',
    subtitle: 'CSAT / NPS 反馈分析与回访计划',
    breadcrumbs: ['客户服务', '客户满意度'],
    hero: {
      title: '近 30 日满意度趋势',
      description: '自动收集问卷并计算指标。'
    },
    actions: [
      { label: '发起回访', view: 'cs-survey-followup', style: 'primary' },
      { label: '导出报表', view: 'cs-survey', style: 'secondary' }
    ],
    sections: [
      {
        type: 'grid',
        columns: 3,
        cards: [
          { title: 'CSAT', value: '4.6', trend: { type: 'positive', text: '+0.3' }, hint: '目标 4.5' },
          { title: 'NPS', value: '38', trend: { type: 'neutral', text: '响应率 42%' }, hint: '<a class="inline-link" href="?view=cs-survey-followup">查看回访计划</a>' },
          { title: '差评工单', value: '12', trend: { type: 'warning', text: '待处理 4' }, hint: '<a class="inline-link" href="?view=cs-case-detail">立即跟进</a>' }
        ]
      },
      {
        type: 'section',
        title: '客户声音主题',
        content: `
          <ul>
            <li>物流延迟占比 28%，需与运营联动。</li>
            <li>发票开具等待时间较长。</li>
            <li>客服响应速度总体改善。</li>
          </ul>
          <div class="view-switch-links">
            <a href="?view=ops-logistics">联动运营</a>
            <a href="?view=finance-ap">通知财务</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>持续追踪客户声音，驱动服务改进。</p>
      <p><strong>协同：</strong>与营销、运营共享反馈，制定改善计划。</p>
    `
  },
  'cs-case-detail': {
    role: 'service',
    title: '工单详情 - CS-10238',
    subtitle: '多渠道对话与知识推荐',
    breadcrumbs: ['客户服务', '工单队列', '工单详情'],
    hero: {
      title: '工单 SLA 即将到期',
      description: '请协调高级工程师参与处理。'
    },
    actions: [
      { label: '升级现场服务', view: 'ops-maintenance', style: 'primary' },
      { label: '发送回复', view: 'cs-case-detail', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '对话记录',
        content: `
          <div class="timeline">
            <div class="timeline-item"><div class="time">09:12</div><div class="content">客户：门店扫码设备无法联网。</div></div>
            <div class="timeline-item"><div class="time">09:18</div><div class="content">坐席李想：建议重启，未恢复。</div></div>
            <div class="timeline-item"><div class="time">09:26</div><div class="content">AI 推荐知识：<a class="inline-link" href="?view=cs-knowledge">门店设备激活流程</a></div></div>
          </div>
        `
      },
      {
        type: 'section',
        title: '处理计划',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">责任人</span><span class="value">高级工程师 · 赵云</span></div>
            <div class="list-item"><span class="label">目标</span><span class="value">2 小时内恢复</span></div>
            <div class="list-item"><span class="label">状态</span><span class="value">等待现场响应</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保跨渠道信息同步，快速升级处理。</p>
      <p><strong>协同：</strong>可直接生成现场服务工单，并通知运营。</p>
    `
  },
  'cs-knowledge-editor': {
    role: 'service',
    title: '知识文档编辑器',
    subtitle: '结构化编辑与版本管理',
    breadcrumbs: ['客户服务', '知识库', '文档编辑'],
    hero: {
      title: '模板与 AI 推荐',
      description: '快速生成标准答案，保持文档统一。'
    },
    actions: [
      { label: '保存草稿', view: 'cs-knowledge', style: 'secondary' },
      { label: '发布文档', view: 'cs-knowledge', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '文档结构',
        content: `
          <div class="split">
            <div class="card">
              <h3>问题描述</h3>
              <p>扫码设备联网失败，报错代码 0x310。</p>
            </div>
            <div class="card">
              <h3>解决步骤</h3>
              <ol>
                <li>检查门店 Wi-Fi。</li>
                <li>重启设备。</li>
                <li>若失败，提交现场服务。</li>
              </ol>
            </div>
          </div>
          <div class="view-switch-links">
            <a href="?view=cs-knowledge">返回知识库</a>
            <a href="?view=cs-dashboard">查看调用量</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>维持知识更新，提高解决效率。</p>
      <p><strong>协同：</strong>支持版本控制与审批流。</p>
    `
  },
  'cs-schedule-editor': {
    role: 'service',
    title: '排班编辑器',
    subtitle: '拖拽式排班与技能匹配',
    breadcrumbs: ['客户服务', '排班与 SLA', '排班编辑'],
    hero: {
      title: '排班计划草稿',
      description: 'AI 推荐与人工微调结合。'
    },
    actions: [
      { label: '保存排班', view: 'cs-sla', style: 'primary' },
      { label: '共享给团队', view: 'cs-sla', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '排班画布',
        content: `
          <div class="chart-placeholder">拖拽式排班示意：坐席与时段矩阵，可拖动调整。</div>
          <div class="modal-hint">支持导入历史数据，预测高峰并自动建议人力。</div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提升排班效率，保障 SLA 达成。</p>
      <p><strong>协同：</strong>同步到 Teams 班表与移动端。</p>
    `
  },
  'cs-omnichannel-settings': {
    role: 'service',
    title: '渠道配置',
    subtitle: '管理接入的服务渠道与授权',
    breadcrumbs: ['客户服务', '全渠道监控', '渠道配置'],
    hero: {
      title: '渠道接入状态',
      description: '快速检视不同渠道的授权与连通性。'
    },
    actions: [
      { label: '新增渠道', view: 'cs-omnichannel-settings', style: 'primary' },
      { label: '测试连接', view: 'cs-omnichannel-settings', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '渠道列表',
        headers: ['渠道', '状态', '最后同步', '负责人', '操作'],
        rows: [
          ['微博', '<span class="badge success">已连接</span>', '06-05 11:20', '营销运营', '<div class="table-actions"><a href="?view=cs-omnichannel">查看数据</a></div>'],
          ['微信小程序', '<span class="badge success">已连接</span>', '06-05 10:48', '数字化团队', '<div class="table-actions"><a href="?view=cs-omnichannel">查看数据</a></div>'],
          ['短信', '<span class="badge warning">需更新密钥</span>', '06-04 08:15', 'IT 支持', '<div class="table-actions"><a href="?view=cs-omnichannel-settings">更新</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保渠道连通可靠。</p>
      <p><strong>协同：</strong>与安全、IT 团队对齐访问控制。</p>
    `
  },
  'cs-survey-followup': {
    role: 'service',
    title: '回访计划',
    subtitle: '针对低评分客户的回访行动',
    breadcrumbs: ['客户服务', '客户满意度', '回访计划'],
    hero: {
      title: '差评客户优先级',
      description: '结合消费金额与情绪打分排序。'
    },
    actions: [
      { label: '创建任务', view: 'cs-cases', style: 'primary' },
      { label: '同步运营', view: 'ops-logistics', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '回访清单',
        headers: ['客户', '评分', '问题类型', '负责人', '计划时间', '操作'],
        rows: [
          ['华北门店 023', '2', '物流延迟', '王芳', '06-06 15:00', '<div class="table-actions"><a href="?view=ops-logistics">协同运营</a></div>'],
          ['华南门店 118', '1', '发票开具', '李想', '06-06 16:30', '<div class="table-actions"><a href="?view=finance-ap">同步财务</a></div>'],
          ['线上客户 A57', '2', '客服响应慢', '赵云', '06-07 10:00', '<div class="table-actions"><a href="?view=cs-sla">调整排班</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>闭环客户反馈。</p>
      <p><strong>协作：</strong>协调运营、财务等团队快速响应。</p>
    `
  },
  'finance-dashboard': {
    role: 'finance',
    title: '财务总览',
    subtitle: '统一的营收、成本与现金流监控',
    breadcrumbs: ['财务与资金', '财务总览'],
    hero: {
      title: '集团财务健康度',
      description: '实时整合总账、应收应付与预算执行情况。'
    },
    actions: [
      { label: '生成财报', view: 'finance-dashboard', style: 'primary' },
      { label: '共享给管理层', view: 'finance-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'grid',
        columns: 3,
        cards: [
          { title: '本月营收', value: '¥18.6M', trend: { type: 'positive', text: '同比 +12%' }, hint: '<a class="inline-link" href="?view=finance-ar">查看明细</a>' },
          { title: '经营现金流', value: '¥6.2M', trend: { type: 'neutral', text: '目标 5.8M' }, hint: '<a class="inline-link" href="?view=finance-close">现金流预测</a>' },
          { title: '费用执行', value: '86%', trend: { type: 'warning', text: '市场费用偏高' }, hint: '<a class="inline-link" href="?view=finance-budget">预算详情</a>' }
        ]
      },
      {
        type: 'split',
        left: {
          title: '利润表趋势',
          content: '<div class="chart-placeholder">柱状图示意：营收、成本、毛利率趋势</div>'
        },
        right: {
          title: '重点提醒',
          content: `
            <div class="list">
              <div class="list-item"><span class="label">应收超期</span><span class="value">¥2.1M · 需催收</span></div>
              <div class="list-item"><span class="label">预算偏差</span><span class="value">市场部 +18%</span></div>
              <div class="list-item"><span class="label">结账进度</span><span class="value">财务结账倒计时 6 天</span></div>
            </div>
            <div class="view-switch-links">
              <a href="?view=finance-ar">查看应收</a>
              <a href="?view=finance-close">检查结账</a>
            </div>
          `
        }
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>实时掌握财务关键指标，支持经营决策。</p>
      <p><strong>协同：</strong>与销售、运营共用财务数据，驱动跨部门协同。</p>
    `
  },
  'finance-ar': {
    role: 'finance',
    title: '应收账款',
    subtitle: '催收策略与信用风险监控',
    breadcrumbs: ['财务与资金', '应收账款'],
    hero: {
      title: '应收账龄结构',
      description: '快速识别超期账款并制定催收计划。'
    },
    actions: [
      { label: '导出账龄表', view: 'finance-ar', style: 'secondary' },
      { label: '发起催收任务', view: 'finance-ar-followup', style: 'primary' }
    ],
    sections: [
      {
        type: 'table',
        title: '客户应收明细',
        headers: ['客户', '应收金额', '账龄', '信用等级', '负责人', '操作'],
        rows: [
          ['蓝海零售', '¥1,280,000', '30 天', '<span class="badge success">A级</span>', '李倩', '<div class="table-actions"><a href="?view=finance-invoice-detail">查看发票</a></div>'],
          ['城市交通集团', '¥860,000', '45 天', '<span class="badge warning">B级</span>', '张宇', '<div class="table-actions"><a href="?view=finance-ar-followup">催收计划</a></div>'],
          ['华南制造', '¥540,000', '60 天', '<span class="badge warning">C级</span>', '王磊', '<div class="table-actions"><a href="?view=finance-ar-followup">升级处理</a></div>']
        ]
      },
      {
        type: 'section',
        title: 'AI 风险提示',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">信用评分下降</span><span class="value">城市交通集团 -6 分</span></div>
            <div class="list-item"><span class="label">合同即将到期</span><span class="value">蓝海零售 30 天</span></div>
            <div class="list-item"><span class="label">争议账款</span><span class="value">¥120,000 · 待法务</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>降低坏账风险，提升现金流回款。</p>
      <p><strong>协同：</strong>与销售跟进客户沟通，必要时升级法务。</p>
    `
  },
  'finance-ap': {
    role: 'finance',
    title: '应付账款',
    subtitle: '付款计划与供应商协同',
    breadcrumbs: ['财务与资金', '应付账款'],
    hero: {
      title: '付款节奏与折扣策略',
      description: '优先处理即将到期账款并利用现金折扣。'
    },
    actions: [
      { label: '批量付款', view: 'finance-ap', style: 'primary' },
      { label: '同步运营', view: 'ops-procurement', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '待付款清单',
        headers: ['供应商', '金额', '到期日', '折扣', '状态', '操作'],
        rows: [
          ['华东物流', '¥320,000', '06-10', '2% / 10 天', '<span class="badge warning">即将到期</span>', '<div class="table-actions"><a href="?view=finance-payment-batch">安排付款</a></div>'],
          ['智联科技', '¥210,000', '06-18', '无', '<span class="badge neutral">待审批</span>', '<div class="table-actions"><a href="?view=finance-invoice-detail">查看发票</a></div>'],
          ['创远制造', '¥540,000', '06-25', '1.5% / 15 天', '<span class="badge success">已排期</span>', '<div class="table-actions"><a href="?view=finance-payment-batch">查看计划</a></div>']
        ]
      },
      {
        type: 'section',
        title: '现金流影响',
        content: '<div class="chart-placeholder">折线图示意：未来 30 天付款预测</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>合理安排付款节奏，维护供应商关系。</p>
      <p><strong>协同：</strong>与运营确认交付进度，避免提前或延迟付款。</p>
    `
  },
  'finance-budget': {
    role: 'finance',
    title: '预算执行',
    subtitle: '预算 vs 实际 对比与调整建议',
    breadcrumbs: ['财务与资金', '预算执行'],
    hero: {
      title: '预算执行率 86%',
      description: '按部门、项目维度监控预算偏差。'
    },
    actions: [
      { label: '调整预算', view: 'finance-budget-adjust', style: 'primary' },
      { label: '导出报表', view: 'finance-budget', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '部门预算偏差',
        content: `
          <div class="board">
            <div class="tile"><h4>市场部</h4><div class="value">+18%</div><div class="progress"><span style="width: 68%; background: var(--negative);"></span></div></div>
            <div class="tile"><h4>销售部</h4><div class="value">-6%</div><div class="progress"><span style="width: 45%; background: var(--positive);"></span></div></div>
            <div class="tile"><h4>研发部</h4><div class="value">+4%</div><div class="progress"><span style="width: 55%; background: var(--warning);"></span></div></div>
            <div class="tile"><h4>运营部</h4><div class="value">-2%</div><div class="progress"><span style="width: 40%; background: var(--positive);"></span></div></div>
          </div>
        `
      },
      {
        type: 'section',
        title: '调整建议',
        content: `
          <ul>
            <li>市场部可延后部分广告投放。</li>
            <li>研发云资源费用需与运营协同优化。</li>
            <li>销售激励预算保持原计划。</li>
          </ul>
          <div class="view-switch-links">
            <a href="?view=finance-budget-adjust">发起调整</a>
            <a href="?view=ops-production">通知运营</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>把控预算执行偏差，快速调整。</p>
      <p><strong>协同：</strong>与各部门共享预算数据，形成闭环。</p>
    `
  },
  'finance-expense': {
    role: 'finance',
    title: '费用报销',
    subtitle: '报销流程与合规校验',
    breadcrumbs: ['财务与资金', '费用报销'],
    hero: {
      title: '报销队列状态',
      description: '自动识别异常报销并提示补充材料。'
    },
    actions: [
      { label: '批量审核', view: 'finance-expense', style: 'primary' },
      { label: '配置政策', view: 'finance-expense-policy', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '待审核报销',
        headers: ['报销单', '申请人', '金额', '类别', '状态', '操作'],
        rows: [
          ['EXP-2024-156', '张伟', '¥3,200', '差旅', '<span class="badge warning">需补发票</span>', '<div class="table-actions"><a href="?view=finance-expense-detail">补充资料</a></div>'],
          ['EXP-2024-158', '周颖', '¥1,280', '市场活动', '<span class="badge success">待付款</span>', '<div class="table-actions"><a href="?view=finance-expense-detail">查看详情</a></div>'],
          ['EXP-2024-161', '李雷', '¥820', '客户招待', '<span class="badge neutral">已通过</span>', '<div class="table-actions"><a href="?view=finance-expense-detail">查看凭证</a></div>']
        ]
      },
      {
        type: 'section',
        title: '政策提示',
        content: '<div class="alert">AI 识别到 2 笔报销缺少酒店发票，已通知申请人补充。</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提升报销效率，确保政策合规。</p>
      <p><strong>协同：</strong>与 HR、采购共享费用数据。</p>
    `
  },
  'finance-close': {
    role: 'finance',
    title: '结账流程',
    subtitle: '结账日历与任务协同',
    breadcrumbs: ['财务与资金', '结账流程'],
    hero: {
      title: '月结倒计时 6 天',
      description: '自动生成结账任务与状态跟踪。'
    },
    actions: [
      { label: '发布结账清单', view: 'finance-close', style: 'primary' },
      { label: '同步审计', view: 'finance-close', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '结账任务看板',
        content: `
          <div class="kanban">
            <div class="kanban-column">
              <h4>待开始</h4>
              <div class="kanban-card"><div class="title">库存调整</div><div class="meta">负责人：运营</div></div>
              <div class="kanban-card"><div class="title">费用 accrual</div><div class="meta">负责人：财务</div></div>
            </div>
            <div class="kanban-column">
              <h4>进行中</h4>
              <div class="kanban-card"><div class="title">应收对账</div><div class="meta">负责人：李倩</div></div>
              <div class="kanban-card"><div class="title">现金流预测</div><div class="meta">负责人：张宇</div></div>
            </div>
            <div class="kanban-column">
              <h4>已完成</h4>
              <div class="kanban-card"><div class="title">固定资产折旧</div><div class="meta">负责人：王磊</div></div>
              <div class="kanban-card"><div class="title">工资计提</div><div class="meta">负责人：HR</div></div>
            </div>
          </div>
        `
      },
      {
        type: 'section',
        title: '风险提醒',
        content: '<div class="alert">提醒：需确认跨境收入的税率调整，截止 06-08。</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保按时结账并降低审计风险。</p>
      <p><strong>协同：</strong>与运营、采购、HR 同步任务进度。</p>
    `
  },
  'finance-invoice-detail': {
    role: 'finance',
    title: '发票详情 - 蓝海零售',
    subtitle: '发票状态与收款跟踪',
    breadcrumbs: ['财务与资金', '应收账款', '发票详情'],
    hero: {
      title: '发票 INV-2024-318',
      description: '开票金额 ¥1,280,000 · 账龄 30 天。'
    },
    actions: [
      { label: '登记收款', view: 'finance-ar', style: 'primary' },
      { label: '发送提醒', view: 'finance-ar-followup', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '发票信息',
        content: `
          <div class="two-column">
            <div class="card">
              <h3>基本信息</h3>
              <div class="list">
                <div class="list-item"><span class="label">开票日期</span><span class="value">2024-05-08</span></div>
                <div class="list-item"><span class="label">付款条件</span><span class="value">30 天内付清</span></div>
                <div class="list-item"><span class="label">项目</span><span class="value">Dynamics 365 许可证</span></div>
              </div>
            </div>
            <div class="card">
              <h3>状态跟踪</h3>
              <div class="timeline">
                <div class="timeline-item"><div class="time">05-08</div><div class="content">发票发送至财务邮箱。</div></div>
                <div class="timeline-item"><div class="time">05-28</div><div class="content">客户确认收票，等待付款。</div></div>
                <div class="timeline-item"><div class="time">06-04</div><div class="content">催收提醒已发送，待回复。</div></div>
              </div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>追踪大额发票进度，避免逾期。</p>
      <p><strong>下一步：</strong>与销售确认客户审批状态。</p>
    `
  },
  'finance-ar-followup': {
    role: 'finance',
    title: '应收催收计划',
    subtitle: '分阶段的催收动作与协同',
    breadcrumbs: ['财务与资金', '应收账款', '催收计划'],
    hero: {
      title: '重点客户催收节奏',
      description: '按账龄制定催收策略，并记录反馈。'
    },
    actions: [
      { label: '创建催收任务', view: 'finance-ar-followup', style: 'primary' },
      { label: '通知销售', view: 'sales-activities', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '催收步骤',
        headers: ['阶段', '动作', '负责人', '计划时间', '状态', '操作'],
        rows: [
          ['阶段一', '发送付款提醒邮件', '李倩', '06-06', '进行中', '<div class="table-actions"><a href="?view=finance-invoice-detail">查看发票</a></div>'],
          ['阶段二', '电话跟进', '张宇', '06-08', '待执行', '<div class="table-actions"><a href="?view=sales-activities">安排拜访</a></div>'],
          ['阶段三', '启动法律程序', '法务', '06-15', '未开始', '<div class="table-actions"><a href="?view=finance-close">同步进度</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>标准化催收流程，提升回款效率。</p>
      <p><strong>协同：</strong>与销售、法务共享催收计划。</p>
    `
  },
  'finance-payment-batch': {
    role: 'finance',
    title: '付款批次计划',
    subtitle: '统一审批与执行',
    breadcrumbs: ['财务与资金', '应付账款', '付款计划'],
    hero: {
      title: '六月第一批付款',
      description: '覆盖物流、软件订阅与设备采购。'
    },
    actions: [
      { label: '提交审批', view: 'finance-ap', style: 'primary' },
      { label: '导出付款单', view: 'finance-ap', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '付款明细',
        content: `
          <table class="table">
            <thead><tr><th>供应商</th><th>金额</th><th>币种</th><th>预计付款日</th><th>备注</th></tr></thead>
            <tbody>
              <tr><td>华东物流</td><td>¥320,000</td><td>CNY</td><td>06-09</td><td>享受 2% 折扣</td></tr>
              <tr><td>智联科技</td><td>¥210,000</td><td>CNY</td><td>06-15</td><td>待确认验收单</td></tr>
              <tr><td>创远制造</td><td>¥540,000</td><td>CNY</td><td>06-22</td><td>分批付款</td></tr>
            </tbody>
          </table>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>集中管理付款批次，确保审批合规。</p>
      <p><strong>协同：</strong>与采购、运营共享资金计划。</p>
    `
  },
  'finance-budget-adjust': {
    role: 'finance',
    title: '预算调整申请',
    subtitle: '记录调整理由与审批路径',
    breadcrumbs: ['财务与资金', '预算执行', '预算调整'],
    hero: {
      title: '市场部二季度预算调整',
      description: '申请将线下活动预算部分转移至线上广告。'
    },
    actions: [
      { label: '提交审批', view: 'finance-budget', style: 'primary' },
      { label: '保存草稿', view: 'finance-budget', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '调整内容',
        content: `
          <div class="split">
            <div class="card">
              <h3>预算来源</h3>
              <div class="list">
                <div class="list-item"><span class="label">原预算</span><span class="value">线下活动 ¥1,200,000</span></div>
                <div class="list-item"><span class="label">调整后</span><span class="value">线下活动 ¥900,000</span></div>
                <div class="list-item"><span class="label">调出金额</span><span class="value">¥300,000</span></div>
              </div>
            </div>
            <div class="card">
              <h3>投向项目</h3>
              <div class="list">
                <div class="list-item"><span class="label">新增预算</span><span class="value">线上广告 ¥250,000</span></div>
                <div class="list-item"><span class="label">客户活动</span><span class="value">¥50,000</span></div>
                <div class="list-item"><span class="label">预计 ROI</span><span class="value">提升 15%</span></div>
              </div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>规范预算调整流程，记录决策依据。</p>
      <p><strong>协同：</strong>自动通知 CFO 与部门负责人审批。</p>
    `
  },
  'finance-expense-detail': {
    role: 'finance',
    title: '报销详情 - EXP-2024-156',
    subtitle: '单据、发票与审批记录',
    breadcrumbs: ['财务与资金', '费用报销', '报销详情'],
    hero: {
      title: '差旅报销待补资料',
      description: '需补充酒店发票与行程单。'
    },
    actions: [
      { label: '请求补充', view: 'finance-expense', style: 'secondary' },
      { label: '审批通过', view: 'finance-expense', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '报销信息',
        content: `
          <div class="two-column">
            <div class="card">
              <h3>费用构成</h3>
              <table class="table">
                <thead><tr><th>项目</th><th>金额</th><th>备注</th></tr></thead>
                <tbody>
                  <tr><td>机票</td><td>¥1,800</td><td>上海-深圳</td></tr>
                  <tr><td>酒店</td><td>¥1,200</td><td>待补发票</td></tr>
                  <tr><td>交通</td><td>¥200</td><td>打车票据齐全</td></tr>
                </tbody>
              </table>
            </div>
            <div class="card">
              <h3>审批流程</h3>
              <div class="timeline">
                <div class="timeline-item"><div class="time">06-04</div><div class="content">提交报销单。</div></div>
                <div class="timeline-item"><div class="time">06-05</div><div class="content">直属经理通过。</div></div>
                <div class="timeline-item"><div class="time">06-05</div><div class="content">财务要求补充酒店发票。</div></div>
              </div>
            </div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>核对单据完整性，保障合规。</p>
      <p><strong>后续：</strong>等待申请人补充后再审批。</p>
    `
  },
  'finance-expense-policy': {
    role: 'finance',
    title: '报销政策配置',
    subtitle: '设置报销标准与自动校验规则',
    breadcrumbs: ['财务与资金', '费用报销', '政策配置'],
    hero: {
      title: '政策模板 · 2024 版',
      description: '定义费用类别、限额与审批路径。'
    },
    actions: [
      { label: '新增政策', view: 'finance-expense-policy', style: 'primary' },
      { label: '同步至 HR', view: 'finance-expense', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '政策摘要',
        content: `
          <div class="list">
            <div class="list-item"><span class="label">差旅住宿</span><span class="value">一线城市 ¥800/晚</span></div>
            <div class="list-item"><span class="label">交通补贴</span><span class="value">高铁二等座</span></div>
            <div class="list-item"><span class="label">审批路径</span><span class="value">直属经理 → 部门负责人 → 财务</span></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保报销政策透明且自动化。</p>
      <p><strong>协同：</strong>同步政策至 HR 系统与移动端。</p>
    `
  },
  'ops-dashboard': {
    role: 'operations',
    title: '供应链驾驶舱',
    subtitle: '贯通采购、库存、生产与配送',
    breadcrumbs: ['供应链运营', '供应链驾驶舱'],
    hero: {
      title: '订单履约全景',
      description: '实时查看销售订单、库存健康度与配送效率。'
    },
    actions: [
      { label: '创建任务', view: 'ops-workorder-detail', style: 'primary' },
      { label: '查看预警', view: 'ops-logistics', style: 'secondary' }
    ],
    sections: [
      {
        type: 'grid',
        columns: 3,
        cards: [
          { title: '订单履约率', value: '94%', trend: { type: 'positive', text: '+3%' }, hint: '<a class="inline-link" href="?view=ops-logistics">查看延迟订单</a>' },
          { title: '库存周转天数', value: '32 天', trend: { type: 'neutral', text: '目标 30 天' }, hint: '<a class="inline-link" href="?view=ops-inventory">库存详情</a>' },
          { title: '产能利用率', value: '88%', trend: { type: 'warning', text: '华南工厂接近满载' }, hint: '<a class="inline-link" href="?view=ops-production">调整排程</a>' }
        ]
      },
      {
        type: 'split',
        left: {
          title: '订单执行状态',
          content: '<div class="chart-placeholder">甘特图示意：订单 → 生产 → 配送</div>'
        },
        right: {
          title: '关键预警',
          content: `
            <div class="list">
              <div class="list-item"><span class="label">缺料告警</span><span class="value">SKU-238 缺口 420 件</span></div>
              <div class="list-item"><span class="label">仓库容量</span><span class="value">华东仓占用 92%</span></div>
              <div class="list-item"><span class="label">运输延迟</span><span class="value">跨境批次晚点 8 小时</span></div>
            </div>
            <div class="view-switch-links">
              <a href="?view=ops-inventory">处理缺料</a>
              <a href="?view=ops-logistics">查看运输</a>
            </div>
          `
        }
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>全局监控供应链运作，提升协同效率。</p>
      <p><strong>协同：</strong>与销售预测、财务现金流互通数据。</p>
    `
  },
  'ops-inventory': {
    role: 'operations',
    title: '库存管理',
    subtitle: '多仓库存与补货建议',
    breadcrumbs: ['供应链运营', '库存管理'],
    hero: {
      title: '库存健康度',
      description: '统一查看安全库存、周转率与缺货风险。'
    },
    actions: [
      { label: '发起调拨', view: 'ops-inventory-transfer', style: 'primary' },
      { label: '生成补货计划', view: 'ops-inventory', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '重点 SKU',
        headers: ['SKU', '品类', '库存', '安全库存', '周转天数', '操作'],
        rows: [
          ['SKU-238', '智能设备', '420', '600', '<span class="badge warning">偏低</span>', '<div class="table-actions"><a href="?view=ops-inventory-transfer">调拨</a></div>'],
          ['SKU-512', '配件', '1,280', '900', '<span class="badge success">健康</span>', '<div class="table-actions"><a href="?view=ops-inventory-transfer">分配</a></div>'],
          ['SKU-901', '耗材', '320', '500', '<span class="badge warning">待补货</span>', '<div class="table-actions"><a href="?view=ops-procurement">采购补货</a></div>']
        ]
      },
      {
        type: 'section',
        title: '仓库分布',
        content: '<div class="chart-placeholder">地图热力图：华东仓、华南仓、跨境仓库存热度</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>降低缺货与积压风险，优化库存结构。</p>
      <p><strong>协同：</strong>与采购、销售、财务共享库存数据。</p>
    `
  },
  'ops-procurement': {
    role: 'operations',
    title: '采购订单',
    subtitle: '采购需求与供应商协同',
    breadcrumbs: ['供应链运营', '采购订单'],
    hero: {
      title: '采购执行进度',
      description: '整合需求计划、采购订单与供应商交期。'
    },
    actions: [
      { label: '创建采购单', view: 'ops-procurement-order', style: 'primary' },
      { label: '供应商绩效', view: 'ops-procurement', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '采购订单列表',
        headers: ['采购单', '供应商', '金额', '到货日期', '状态', '操作'],
        rows: [
          ['PO-2024-118', '创远制造', '¥820,000', '06-18', '<span class="badge warning">延迟风险</span>', '<div class="table-actions"><a href="?view=ops-procurement-order">查看详情</a></div>'],
          ['PO-2024-122', '智联科技', '¥260,000', '06-12', '<span class="badge success">按计划</span>', '<div class="table-actions"><a href="?view=ops-procurement-order">跟踪交付</a></div>'],
          ['PO-2024-127', '华东物流', '¥140,000', '06-20', '<span class="badge neutral">待发货</span>', '<div class="table-actions"><a href="?view=ops-procurement-order">提醒发货</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>保障采购及时交付，支撑生产与销售。</p>
      <p><strong>协同：</strong>对接供应商门户与财务付款计划。</p>
    `
  },
  'ops-production': {
    role: 'operations',
    title: '生产计划',
    subtitle: '产能排程与工单进度',
    breadcrumbs: ['供应链运营', '生产计划'],
    hero: {
      title: '周生产排程',
      description: '结合订单需求与产能限制自动排程。'
    },
    actions: [
      { label: '调整排产', view: 'ops-production-plan', style: 'primary' },
      { label: '导入预测', view: 'sales-forecast', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '工单进度',
        content: `
          <div class="kanban">
            <div class="kanban-column">
              <h4>待生产</h4>
              <div class="kanban-card"><div class="title">WO-458</div><div class="meta">产品 A · 计划 06-08</div></div>
              <div class="kanban-card"><div class="title">WO-462</div><div class="meta">产品 B · 待原料</div></div>
            </div>
            <div class="kanban-column">
              <h4>生产中</h4>
              <div class="kanban-card"><div class="title">WO-455</div><div class="meta">80% 完成</div></div>
              <div class="kanban-card"><div class="title">WO-456</div><div class="meta">产线 2 · 预计 06-07 完成</div></div>
            </div>
            <div class="kanban-column">
              <h4>待质检</h4>
              <div class="kanban-card"><div class="title">WO-452</div><div class="meta">质检排期 06-06</div></div>
              <div class="kanban-card"><div class="title">WO-453</div><div class="meta">等待 QA</div></div>
            </div>
          </div>
        `
      },
      {
        type: 'section',
        title: '产能分析',
        content: '<div class="chart-placeholder">折线图：产能利用率 vs 计划产量</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>平衡产能与需求，减少瓶颈。</p>
      <p><strong>协同：</strong>与销售预测、库存联动排产。</p>
    `
  },
  'ops-logistics': {
    role: 'operations',
    title: '物流跟踪',
    subtitle: '订单配送状态与异常处理',
    breadcrumbs: ['供应链运营', '物流跟踪'],
    hero: {
      title: '运输可视化',
      description: '实时追踪干线与支线运输状态。'
    },
    actions: [
      { label: '查看延迟订单', view: 'ops-logistics-delay', style: 'primary' },
      { label: '通知客服', view: 'cs-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'table',
        title: '运输批次',
        headers: ['批次', '路线', '状态', '预计到达', '异常', '操作'],
        rows: [
          ['LOT-558', '上海 → 广州', '<span class="badge success">运输中</span>', '06-06 20:00', '—', '<div class="table-actions"><a href="?view=ops-logistics-detail">查看轨迹</a></div>'],
          ['LOT-562', '深圳 → 北京', '<span class="badge warning">延迟</span>', '06-07 12:00', '天气原因', '<div class="table-actions"><a href="?view=ops-logistics-delay">启动应急</a></div>'],
          ['LOT-564', '香港 → 上海', '<span class="badge neutral">待发运</span>', '06-08 09:00', '报关审核', '<div class="table-actions"><a href="?view=ops-logistics-detail">加急处理</a></div>']
        ]
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提升运输透明度，快速处理异常。</p>
      <p><strong>协同：</strong>与客服同步延迟信息，及时通知客户。</p>
    `
  },
  'ops-maintenance': {
    role: 'operations',
    title: '设备维护',
    subtitle: '现场服务与预防性维护',
    breadcrumbs: ['供应链运营', '设备维护'],
    hero: {
      title: '设备健康指数',
      description: '基于 IoT 数据预测维护窗口。'
    },
    actions: [
      { label: '创建工单', view: 'ops-workorder-detail', style: 'primary' },
      { label: '查看巡检计划', view: 'ops-maintenance', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '设备状态',
        content: `
          <div class="board">
            <div class="tile"><h4>产线 1</h4><div class="value">良好</div><div class="progress"><span style="width: 78%; background: var(--positive);"></span></div></div>
            <div class="tile"><h4>产线 2</h4><div class="value">预警</div><div class="progress"><span style="width: 58%; background: var(--warning);"></span></div></div>
            <div class="tile"><h4>仓储 AGV</h4><div class="value">正常</div><div class="progress"><span style="width: 72%; background: var(--accent);"></span></div></div>
            <div class="tile"><h4>冷链设备</h4><div class="value">需要巡检</div><div class="progress"><span style="width: 40%; background: var(--negative);"></span></div></div>
          </div>
        `
      },
      {
        type: 'section',
        title: '工单安排',
        content: '<div class="timeline"><div class="timeline-item"><div class="time">06-06</div><div class="content">现场技师王强前往处理产线 2 震动异常。</div></div><div class="timeline-item"><div class="time">06-07</div><div class="content">安排冷链设备巡检。</div></div></div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>减少停机，保障生产稳定。</p>
      <p><strong>协同：</strong>与客服、生产共享维护进度。</p>
    `
  },
  'ops-inventory-transfer': {
    role: 'operations',
    title: '库存调拨计划',
    subtitle: '跨仓库补货与调拨',
    breadcrumbs: ['供应链运营', '库存管理', '库存调拨'],
    hero: {
      title: '华东仓 → 华南仓 调拨方案',
      description: '平衡热销区域库存，避免缺货。'
    },
    actions: [
      { label: '提交审批', view: 'ops-inventory', style: 'primary' },
      { label: '通知物流', view: 'ops-logistics', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '调拨明细',
        content: `
          <table class="table">
            <thead><tr><th>SKU</th><th>调出仓</th><th>调入仓</th><th>数量</th><th>原因</th></tr></thead>
            <tbody>
              <tr><td>SKU-238</td><td>华东仓</td><td>华南仓</td><td>220</td><td>南区活动备货</td></tr>
              <tr><td>SKU-512</td><td>华东仓</td><td>西南仓</td><td>180</td><td>补足安全库存</td></tr>
            </tbody>
          </table>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>快速调拨库存，满足区域销售需求。</p>
      <p><strong>协同：</strong>联动物流安排运输，财务同步成本。</p>
    `
  },
  'ops-procurement-order': {
    role: 'operations',
    title: '采购订单详情 - PO-2024-118',
    subtitle: '供应商交付追踪',
    breadcrumbs: ['供应链运营', '采购订单', '订单详情'],
    hero: {
      title: '创远制造供货进度',
      description: '订单金额 ¥820,000 · 延迟风险。'
    },
    actions: [
      { label: '提醒发货', view: 'ops-procurement', style: 'primary' },
      { label: '协同财务', view: 'finance-ap', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '交付计划',
        content: `
          <div class="timeline">
            <div class="timeline-item"><div class="time">06-01</div><div class="content">订单确认，预付 30%。</div></div>
            <div class="timeline-item"><div class="time">06-05</div><div class="content">供应商反馈原料不足，延迟 2 天。</div></div>
            <div class="timeline-item"><div class="time">06-09</div><div class="content">预计完成生产并发货。</div></div>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>确保关键物料按时到货。</p>
      <p><strong>协同：</strong>与供应商、财务共享订单状态。</p>
    `
  },
  'ops-production-plan': {
    role: 'operations',
    title: '排产调整画布',
    subtitle: '拖拽式排程与冲突提示',
    breadcrumbs: ['供应链运营', '生产计划', '排产调整'],
    hero: {
      title: '华南工厂本周排程',
      description: '调整高优先级订单的生产顺序。'
    },
    actions: [
      { label: '保存排程', view: 'ops-production', style: 'primary' },
      { label: '通知生产线', view: 'ops-production', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '排程画布',
        content: '<div class="chart-placeholder">时间轴示意：拖拽工单调整顺序</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>快速调整排程，避免产能冲突。</p>
      <p><strong>协同：</strong>与采购、销售同步调整结果。</p>
    `
  },
  'ops-logistics-detail': {
    role: 'operations',
    title: '运输轨迹详情 - LOT-558',
    subtitle: '轨迹、温控与异常记录',
    breadcrumbs: ['供应链运营', '物流跟踪', '运输详情'],
    hero: {
      title: '实时轨迹监控',
      description: 'GPS 定位 · 温度 3℃ · 无异常。'
    },
    actions: [
      { label: '共享给客户', view: 'cs-dashboard', style: 'secondary' },
      { label: '标记完成', view: 'ops-logistics', style: 'primary' }
    ],
    sections: [
      {
        type: 'section',
        title: '轨迹 & 指标',
        content: '<div class="chart-placeholder">地图轨迹与温度曲线</div>'
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>提供可视化运输信息，提升透明度。</p>
      <p><strong>协同：</strong>客服可直接查看并回复客户咨询。</p>
    `
  },
  'ops-logistics-delay': {
    role: 'operations',
    title: '延迟批次应急方案',
    subtitle: '延迟原因与补救措施',
    breadcrumbs: ['供应链运营', '物流跟踪', '延迟应急'],
    hero: {
      title: 'LOT-562 延迟 4 小时',
      description: '天气原因导致晚点，需通知客户与补救。'
    },
    actions: [
      { label: '启动备选线路', view: 'ops-logistics', style: 'primary' },
      { label: '通知客服', view: 'cs-dashboard', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '应急措施',
        content: `
          <ul>
            <li>协调替代司机加急配送。</li>
            <li>通知客服团队更新客户预期。</li>
            <li>提交延迟原因给 Power BI 分析。</li>
          </ul>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>快速响应运输延迟，减少客户投诉。</p>
      <p><strong>协同：</strong>与客服、销售共享最新进度。</p>
    `
  },
  'ops-workorder-detail': {
    role: 'operations',
    title: '现场工单 - 产线 2 振动异常',
    subtitle: '工单处理流程与备件',
    breadcrumbs: ['供应链运营', '设备维护', '工单详情'],
    hero: {
      title: '紧急工单 · SLA 4 小时',
      description: '需快速排查并恢复生产线稳定。'
    },
    actions: [
      { label: '派单给工程师', view: 'ops-maintenance', style: 'primary' },
      { label: '查看备件库存', view: 'ops-inventory', style: 'secondary' }
    ],
    sections: [
      {
        type: 'section',
        title: '处理步骤',
        content: `
          <ol>
            <li>工程师王强预计 30 分钟到达。</li>
            <li>检查主轴与传感器状态。</li>
            <li>测试运行 15 分钟确认无异常。</li>
          </ol>
          <div class="view-switch-links">
            <a href="?view=ops-maintenance">查看维护日历</a>
            <a href="?view=ops-dashboard">返回驾驶舱</a>
          </div>
        `
      }
    ],
    summary: `
      <p><strong>业务目标：</strong>保障关键产线快速恢复。</p>
      <p><strong>协同：</strong>通知客服可能的交付影响。</p>
    `
  },
};

const state = {
  role: null,
  view: null
};

const layout = {
  menu: document.getElementById('role-menu'),
  roleSelect: document.getElementById('role-switcher'),
  breadcrumbs: document.getElementById('breadcrumbs'),
  headerTitle: document.getElementById('page-title'),
  headerSubtitle: document.getElementById('page-subtitle'),
  heroContainer: document.getElementById('hero'),
  actions: document.getElementById('page-actions'),
  sections: document.getElementById('page-sections'),
  summary: document.getElementById('page-summary')
};

const trendClassMap = {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
  warning: 'neutral'
};

const resolveState = () => {
  const params = new URLSearchParams(window.location.search);
  let role = params.get('role') || localStorage.getItem('d365-role') || 'sales';
  if (!roles[role]) {
    role = 'sales';
  }

  let view = params.get('view') || localStorage.getItem('d365-view') || roles[role].defaultView;
  if (!views[view]) {
    view = roles[role].defaultView;
  }

  const viewRole = views[view].role;
  if (viewRole && viewRole !== role) {
    role = viewRole;
  }

  if (!roles[role].menu.some((item) => item.view === view) && views[view].role !== role) {
    view = roles[role].defaultView;
  }

  return { role, view };
};

const buildMenu = (roleId, viewId) => {
  const role = roles[roleId];
  layout.menu.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'sidebar-header';
  header.innerHTML = `
    <div class="brand">D9</div>
    <div class="info">
      <span class="title">Dynamics 365</span>
      <span class="subtitle">${role.name}</span>
    </div>
  `;
  layout.menu.appendChild(header);

  const roleDesc = document.createElement('div');
  roleDesc.className = 'role-description';
  roleDesc.innerHTML = `<p>${role.description}</p>`;
  roleDesc.style.marginBottom = '24px';
  roleDesc.style.color = 'rgba(226, 232, 240, 0.75)';
  roleDesc.style.fontSize = '13px';
  layout.menu.appendChild(roleDesc);

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'menu-section-title';
  sectionTitle.textContent = '功能导航';
  layout.menu.appendChild(sectionTitle);

  role.menu.forEach((item) => {
    const link = document.createElement('a');
    link.href = `?role=${roleId}&view=${item.view}`;
    link.dataset.role = roleId;
    link.dataset.view = item.view;
    link.innerHTML = `
      <span class="icon">${item.icon}</span>
      <span>${item.label}</span>
    `;
    if (item.view === viewId) {
      link.classList.add('active');
    }
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo(roleId, item.view);
    });
    layout.menu.appendChild(link);
  });
};

const renderBreadcrumbs = (crumbs) => {
  layout.breadcrumbs.innerHTML = crumbs
    .map((crumb, index) => {
      const isLast = index === crumbs.length - 1;
      return `<span${isLast ? ' class="current"' : ''}>${crumb}</span>`;
    })
    .join('<span>›</span>');
};

const renderHero = (view) => {
  if (!view.hero) {
    layout.heroContainer.innerHTML = '';
    return;
  }
  layout.heroContainer.innerHTML = `
    <div class="hero">
      <h2>${view.hero.title}</h2>
      <p>${view.hero.description}</p>
    </div>
  `;
};

const renderActions = (roleId, actions) => {
  layout.actions.innerHTML = '';
  if (!actions) return;

  actions.forEach((action) => {
    const button = document.createElement('button');
    button.className = `button ${action.style || 'ghost'}`;
    button.textContent = action.label;
    button.addEventListener('click', () => {
      navigateTo(action.role || roleId, action.view || roles[roleId].defaultView);
    });
    layout.actions.appendChild(button);
  });
};

const renderGridSection = (section) => {
  const columnsClass = section.columns === 2 ? 'cols-2' : 'cols-3';
  const cards = section.cards
    .map((card) => {
      const trend = card.trend
        ? `<div class="stat-trend ${trendClassMap[card.trend.type] || 'neutral'}">${card.trend.text}</div>`
        : '';
      const hint = card.hint ? `<div class="subtext">${card.hint}</div>` : '';
      return `
        <div class="card">
          <h3>${card.title}</h3>
          <div class="stat-value">${card.value}</div>
          ${trend}
          ${hint}
        </div>
      `;
    })
    .join('');

  const title = section.title ? `<div class="section-header"><h2>${section.title}</h2></div>` : '';
  return `<section class="section">${title}<div class="grid ${columnsClass}">${cards}</div></section>`;
};

const renderSplitSection = (section) => {
  const left = section.left
    ? `<div class="card"><h3>${section.left.title}</h3>${section.left.content}</div>`
    : '';
  const right = section.right
    ? `<div class="card"><h3>${section.right.title}</h3>${section.right.content}</div>`
    : '';
  return `<section class="section"><div class="split">${left}${right}</div></section>`;
};

const renderTableSection = (section) => {
  const header = section.title ? `<div class="section-header"><h2>${section.title}</h2></div>` : '';
  const headRow = section.headers
    .map((headerCell) => `<th>${headerCell}</th>`)
    .join('');
  const bodyRows = section.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('');
  return `<section class="section">${header}<table class="table"><thead><tr>${headRow}</tr></thead><tbody>${bodyRows}</tbody></table></section>`;
};

const renderKanbanSection = (section) => {
  const columns = section.columns
    .map((column) => {
      const cards = column.cards
        .map((card) => {
          const link = card.view
            ? `<div class="view-switch-links"><a href="?view=${card.view}">打开</a></div>`
            : '';
          return `
            <div class="kanban-card">
              <div class="title">${card.title}</div>
              <div class="meta">${card.meta}</div>
              ${link}
            </div>
          `;
        })
        .join('');
      return `
        <div class="kanban-column">
          <h4>${column.title}</h4>
          ${cards}
        </div>
      `;
    })
    .join('');
  const title = section.title ? `<div class="section-header"><h2>${section.title}</h2></div>` : '';
  return `<section class="section">${title}<div class="kanban">${columns}</div></section>`;
};

const renderMetricsSection = (section) => {
  const title = section.title ? `<div class="section-header"><h2>${section.title}</h2></div>` : '';
  const metrics = section.metrics
    .map(
      (metric) => `
        <div class="card">
          <div class="metric">
            <span class="label">${metric.label}</span>
            <span class="value">${metric.value}</span>
            <span class="label">${metric.trend}</span>
          </div>
        </div>
      `
    )
    .join('');
  const links = section.links
    ? `<div class="view-switch-links">${section.links
        .map((link) => `<a href="?view=${link.view}">${link.label}</a>`)
        .join('')}</div>`
    : '';
  return `<section class="section">${title}<div class="grid cols-3">${metrics}</div>${links}</section>`;
};

const renderGenericSection = (section) => {
  const title = section.title ? `<div class="section-header"><h2>${section.title}</h2></div>` : '';
  return `<section class="section">${title}${section.content}</section>`;
};

const renderSections = (sections = []) => {
  layout.sections.innerHTML = sections
    .map((section) => {
      switch (section.type) {
        case 'grid':
          return renderGridSection(section);
        case 'split':
          return renderSplitSection(section);
        case 'table':
          return renderTableSection(section);
        case 'kanban':
          return renderKanbanSection(section);
        case 'metrics':
          return renderMetricsSection(section);
        case 'section':
        default:
          return renderGenericSection(section);
      }
    })
    .join('');
};

const renderSummary = (summary) => {
  layout.summary.innerHTML = summary
    ? `<div class="summary-panel">${summary}</div>`
    : '';
};

const renderRoleSwitcher = (roleId) => {
  layout.roleSelect.innerHTML = Object.values(roles)
    .map(
      (role) => `<option value="${role.id}" ${role.id === roleId ? 'selected' : ''}>${role.name}</option>`
    )
    .join('');
};

const renderView = () => {
  const { role, view } = resolveState();
  state.role = role;
  state.view = view;

  localStorage.setItem('d365-role', role);
  localStorage.setItem('d365-view', view);

  const viewConfig = views[view];
  document.title = `${viewConfig.title} · Dynamics 365 原型`;

  buildMenu(role, view);
  renderRoleSwitcher(role);
  renderBreadcrumbs(viewConfig.breadcrumbs || []);
  layout.headerTitle.textContent = viewConfig.title;
  layout.headerSubtitle.textContent = viewConfig.subtitle || '';
  renderHero(viewConfig);
  renderActions(role, viewConfig.actions);
  renderSections(viewConfig.sections);
  renderSummary(viewConfig.summary);
};

const navigateTo = (role, view) => {
  const params = new URLSearchParams(window.location.search);
  params.set('role', role);
  params.set('view', view);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState({ role, view }, '', newUrl);
  renderView();
};

layout.roleSelect.addEventListener('change', (event) => {
  const newRole = event.target.value;
  const defaultView = roles[newRole].defaultView;
  navigateTo(newRole, defaultView);
});

window.addEventListener('popstate', () => {
  renderView();
});

renderView();
