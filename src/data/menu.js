 import Layout from 'src/pages/layout/layout';
 export function menuList () {
  let list = [
              {
                'id': 1,
                'path': '/home',
                'name': 'home',
                'title': '首页',
                'icon': 'el-icon-adm-home',
                 component: () => import('src/pages/home/home')
              },
              {
                'id': 3,
                'path': '/tables',
                'title': '表格管理',
                'icon': 'el-icon-adm-linechart',
                // 'hide': true,
                'meta': {
                  'requireAuth': true
                },
                'component': Layout,
                'children': [
                  // {
                  //   'path': '/tables/basic',
                  //   'title': '基本表格', 
                  //   'name': 'basic', 
                  //   'component': () => import('src/pages/tables/basic'),
                  //   'children': [
                  //      {
                  //       'path': '/tables/basic',
                  //       'title': '子菜单3', 
                  //       'name': 'basic', 
                  //       'component': () => import('src/pages/charts/bar')
                  //      }
                  //    ]
                  // },
                  {'id': 4, 'path': '/tables/sort', 'title': '排序表格', 'name': 'sort', 'component': () => import('src/pages/tables/sort')},
                  {'id': 5, 'path': '/tables/filter', 'title': '筛选表格', 'name': 'filter', 'component': () => import('src/pages/tables/filter')}
                ]
              },
              {
                'path': '/charts',
                'title': '图表管理',
                'icon': 'el-icon-adm-statistics',
                'hide': true,
                'meta': {
                  'requireAuth': true
                },
                'component': Layout,
                'children': [
                  {'path': '/charts/bar', 'title': '柱状图', 'name': 'bar', 'component': () => import('src/pages/charts/bar')},
                  {'path': '/charts/line', 'title': '折线图'},
                  {'path': '/charts/pie', 'title': '饼图'}
                ]
              },
              {
                'path': '/form',
                'title': '表单管理',
                'icon': 'el-icon-adm-form',
                'hide': true,
                'children': [
                  {'path': '/form/render', 'title': '渲染表单'}
                ]
              },
              {
                'path': '/system/index',
                'hide': true,
                'title': '系统管理',
                'icon': 'el-icon-adm-project'
              },
              {
                'path': '/user/index',
                'title': '用户管理',
                'hide': true,
                'icon': 'el-icon-adm-user'
              },
              {
                'id': 2,
                'path': '/access',
                'title': '权限管理',
                'name': 'access_index',
                'icon': 'el-icon-adm-organization',
                'meta': {
                  'requireAuth': true
                },
                'component': Layout,
                // component: () => import('src/pages/access/index')
                'children': [
                    {
                      'id': 7,
                      'path': '/index',
                      'name': 'index',
                      'title': '用户权限管理',
                      'component': () => import('src/pages/access/index')
                    }
                ]
              },
              {
                'path': '/log/index',
                'title': '操作日志',
                'hide': true,
                'icon': 'el-icon-adm-log'
              },
              {
                'path': '/test/index',
                'title': '测试',
                'hide': true,
                'icon': 'el-icon-adm-formsetup'
              }
    ];
    console.log(arrayFilter(list))
    return arrayFilter(list);
 }
 export function arrayFilter(arr) {
    let curList = [];
    (arr || []).forEach(item => {
      if (item.children) item.children = arrayFilter(item.children);
      if (!item.hide) curList.push(item);  
    })
    return curList;
 }

 export function menuTitleFilter(arr, title) {
   let curList = title || [];
    (arr || []).forEach(item => {
      curList.push(
        {id: item.id, name: item.title}
        )
      if (item.children) {
        const childrens = menuTitleFilter(item.children, []);
         curList.push(...childrens)
      }
    })
    return curList;
 }

