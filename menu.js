const pathSegments = window.location.pathname.split('/').filter(Boolean);
const prototypesIndex = pathSegments.indexOf('prototypes');
if (prototypesIndex !== -1) {
  const rootSegments = pathSegments.slice(0, prototypesIndex + 1);
  const rootPath = `/${rootSegments.join('/')}/`;

  const createMenu = (catalog) => {
    const style = document.createElement('style');
    style.textContent = `
      .prototype-menu-wrapper {
        position: fixed;
        top: 16px;
        left: 16px;
        z-index: 9999;
        font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
      }
      .prototype-menu-button {
        background: rgba(15, 23, 42, 0.85);
        color: #fff;
        border: none;
        border-radius: 999px;
        padding: 10px 18px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.25);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .prototype-menu-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 22px rgba(15, 23, 42, 0.35);
      }
      .prototype-menu-panel {
        margin-top: 12px;
        width: 280px;
        max-height: 70vh;
        background: rgba(255, 255, 255, 0.98);
        border-radius: 18px;
        padding: 18px;
        box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
        border: 1px solid rgba(15, 23, 42, 0.08);
        backdrop-filter: blur(6px);
        overflow: hidden;
      }
      .prototype-menu-hidden { display: none; }
      .prototype-menu-panel h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #0f172a;
      }
      .prototype-menu-list {
        margin: 0;
        padding: 0;
        list-style: none;
        max-height: 260px;
        overflow-y: auto;
      }
      .prototype-menu-list li {
        margin-bottom: 6px;
      }
      .prototype-menu-link {
        display: block;
        text-decoration: none;
        color: #1d4ed8;
        font-size: 14px;
        padding: 6px 8px;
        border-radius: 10px;
        transition: background 0.15s ease;
      }
      .prototype-menu-link:hover {
        background: rgba(59, 130, 246, 0.12);
      }
      .prototype-menu-category {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid rgba(15, 23, 42, 0.08);
      }
      .prototype-menu-category:first-of-type {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
      }
      .prototype-menu-about {
        font-size: 12px;
        line-height: 1.6;
        color: #475569;
        margin-top: 16px;
        padding: 12px;
        background: rgba(241, 245, 249, 0.9);
        border-radius: 12px;
      }
      .prototype-menu-about a {
        color: #1d4ed8;
        text-decoration: none;
      }
      .prototype-menu-about a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = 'prototype-menu-wrapper';

    const button = document.createElement('button');
    button.className = 'prototype-menu-button';
    button.type = 'button';
    button.textContent = '原型导航';

    const panel = document.createElement('div');
    panel.className = 'prototype-menu-panel prototype-menu-hidden';

    const homeLink = document.createElement('a');
    homeLink.className = 'prototype-menu-link';
    homeLink.href = `${rootPath}`;
    homeLink.textContent = '🏠 返回原型首页';
    panel.appendChild(homeLink);

    catalog.categories.forEach((category) => {
      const section = document.createElement('section');
      section.className = 'prototype-menu-category';

      const heading = document.createElement('h3');
      heading.textContent = category.name;
      section.appendChild(heading);

      const list = document.createElement('ul');
      list.className = 'prototype-menu-list';

      category.items.forEach((item) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'prototype-menu-link';
        link.href = `${rootPath}${item.path}`;
        link.textContent = item.name;
        listItem.appendChild(link);
        list.appendChild(listItem);
      });

      section.appendChild(list);
      panel.appendChild(section);
    });

    const about = document.createElement('div');
    about.className = 'prototype-menu-about';
    about.innerHTML = `
      <strong>关于 PM Universe</strong><br />
      浏览更多原型与资料，请访问项目仓库：<br />
      <a href="https://github.com/haojin-dev/pm-universe" target="_blank" rel="noopener">GitHub - pm-universe</a><br />
      作者主页：<a href="http://haoj.in" target="_blank" rel="noopener">http://haoj.in</a>
    `;
    panel.appendChild(about);

    button.addEventListener('click', () => {
      panel.classList.toggle('prototype-menu-hidden');
    });

    wrapper.appendChild(button);
    wrapper.appendChild(panel);
    document.body.appendChild(wrapper);
  };

  fetch(`${rootPath}prototype-index.json`)
    .then((response) => response.json())
    .then((catalog) => {
      createMenu(catalog);
    })
    .catch((error) => {
      console.error('无法加载原型目录', error);
    });
}
