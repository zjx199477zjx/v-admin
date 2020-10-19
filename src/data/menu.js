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
                'path': '/record',
                'title': '一体机档案管理',
                'name': 'record',
                'icon': 'el-icon-folder',
                // 'hide': true,
                'meta': {
                  'requireAuth': true
                },
                'component': Layout,
                'children': [
                  {'id': 4, 'path': '/record/recordList', 'title': '档案列表', 'list': 'sort', 'name': 'recordList', 'component': () => import('src/pages/record/recordList')},
                  {'id': 5, 'path': '/record/examination', 'title': '健康体检列表', 'name': 'examination', 'component': () => import('src/pages/record/examination')},
                  // {'id': 7, 'path': '/record/diabetesList', 'title': '2型糖尿病患者管理', 'name': 'diabetesList', 'component': () => import('src/pages/record/diabetesList')},
                  {'id': 8, 
                    'path': '/record/different', 
                    'title': '中医体质辨识', 
                    'icon': 'el-icon-s-unfold',
                    'name': 'different', 
                    'component': () => import('src/pages/record/different'),
                    'children': [
                        {'id': 9, 'path': '/record/subMenuModule/addDifferent', 'title': '新增中医体质辨识', 'list': 'sort', 'name': 'addDifferent', 'component': () => import('src/pages/record/subMenuModule/addDifferent')},
                        {'id': 10, 'path': '/record/subMenuModule/viewDifferent', 'title': '查看中医体质辨识', 'list': 'sort', 'name': 'viewDifferent', 'component': () => import('src/pages/record/subMenuModule/viewDifferent')}
                    ]
                  },
                  {
                    'id': 11,
                    'path': '/record/elderlyManager', 
                    'title': '老年人健康管理',
                    'icon': 'el-icon-s-unfold',
                    'name': 'elderlyManager',
                    'component': () => import('src/pages/record/elderlyManager'),
                    'children': [
                        {'id': 12, 'path': '/record/subMenuModule/peopleList', 'title': '老年人健康管理列表', 'list': 'sort', 'name': 'peopleList', 'component': () => import('src/pages/record/subMenuModule/peopleList')},
                        {'id': 13, 'path': '/record/subMenuModule/peopleLife', 'title': '老年人生活能力评估', 'list': 'sort', 'name': 'peopleLife', 'component': () => import('src/pages/record/subMenuModule/peopleLife')},
                        {'id': 14, 'path': '/record/subMenuModule/peopleExamination', 'title': '老年人健康体检列表', 'list': 'sort', 'name': 'peopleExamination', 'component': () => import('src/pages/record/subMenuModule/peopleExamination')}
                    ]
                  },
                  {
                    'id': 15,
                    'path': '/record/highPressureManager', 
                    'title': '高血压患者健康管理',
                    'icon': 'el-icon-s-unfold',
                    'name': 'highPressureManager',
                    'component': () => import('src/pages/record/highPressureManager'),
                    'children': [
                        {'id': 16, 'path': '/record/subMenuModule/highPressureList', 'title': '高血压患者列表', 'list': 'sort', 'name': 'highPressureList', 'component': () => import('src/pages/record/subMenuModule/highPressureList')},
                        {'id': 17, 'path': '/record/subMenuModule/highPressureRecord', 'title': '随访服务记录', 'name': 'highPressureRecord', 'component': () => import('src/pages/record/subMenuModule/highPressureRecord')},
                        {'id': 18, 'path': '/record/subMenuModule/highExaminationList', 'title': '健康体检列表', 'list': 'sort', 'name': 'highExaminationList', 'component': () => import('src/pages/record/subMenuModule/highExaminationList')}
                    ]
                  },
                  {
                     'id': 19,
                     'path': '/record/diabetesManager', 
                     'title': '2型糖尿病患者管理',
                     'icon': 'el-icon-s-unfold',
                     'name': 'diabetesManager',
                     'component': () => import('src/pages/record/diabetesManager'),
                     'children': [
                         {'id': 16, 'path': '/record/subMenuModule/diabetesList', 'title': '2型糖尿病患者列表', 'list': 'sort', 'name': 'diabetesList', 'component': () => import('src/pages/record/subMenuModule/diabetesList')},
                         {'id': 17, 'path': '/record/subMenuModule/diabetesRecord', 'title': '2型糖尿病随访服务记录', 'name': 'diabetesRecord', 'component': () => import('src/pages/record/subMenuModule/diabetesRecord')},
                         {'id': 18, 'path': '/record/subMenuModule/diabetesExaminationList', 'title': '2型糖尿病健康体检列表', 'list': 'sort', 'name': 'diabetesExaminationList', 'component': () => import('src/pages/record/subMenuModule/diabetesExaminationList')}
                     ]
                  }
                ]
              },
               {
                'id': 20,
                'path': '/public',
                'title': '公共卫生服务管理',
                'name': 'public',
                'icon': 'el-icon-s-operation',
                // 'hide': true,
                'meta': {
                  'requireAuth': true
                },
                'component': Layout,
                'children': [
                   {'id': 21, 'path': '/public/education', 'title': '健康教育', 'list': 'sort', 'name': 'education', 'component': () => import('src/pages/public/education')},
                   {'id': 22, 'path': '/public/slowManager', 'title': '慢病管理统计', 'list': 'sort', 'name': 'slowManager', 'component': () => import('src/pages/public/slowManager')},
                   {
                     'id': 23,
                     'path': '/public/regServiceManager',
                     'title': '区域服务统计', 
                     'list': 'sort', 
                     'name': 'regServiceManager', 
                     'icon': 'el-icon-s-unfold', 
                     'component': () => import('src/pages/public/regServiceManager'),
                     'children': [
                        {'id': 25, 'path': '/public/subMenuModule/regCreateRecord', 'title': '建档率', 'list': 'sort', 'name': 'regCreateRecord', 'component': () => import('src/pages/public/subMenuModule/regCreateRecord')},
                        {'id': 26, 'path': '/public/subMenuModule/regExamine', 'title': '体检率', 'list': 'sort', 'name': 'regExamine', 'component': () => import('src/pages/public/subMenuModule/regExamine')},
                        {'id': 27, 'path': '/public/subMenuModule/regHighNorm', 'title': '高血压规范管理率', 'list': 'sort', 'name': 'regHighNorm', 'component': () => import('src/pages/public/subMenuModule/regHighNorm')},
                        {'id': 28, 'path': '/public/subMenuModule/regHighFollow', 'title': '高血压随访率', 'list': 'sort', 'name': 'regHighFollow', 'component': () => import('src/pages/public/subMenuModule/regHighFollow')},
                        {'id': 29, 'path': '/public/subMenuModule/regDiabetesNorm', 'title': '糖尿病规范管理率', 'list': 'sort', 'name': 'regDiabetesNorm', 'component': () => import('src/pages/public/subMenuModule/regDiabetesNorm')},
                        {'id': 30, 'path': '/public/subMenuModule/regDiabetesFollow', 'title': '糖尿病随访率', 'list': 'sort', 'name': 'regDiabetesFollow', 'component': () => import('src/pages/public/subMenuModule/regDiabetesFollow')},
                        {'id': 30, 'path': '/public/subMenuModule/regDoctorWork', 'title': '医生工作量完成情况', 'list': 'sort', 'name': 'regDoctorWork', 'component': () => import('src/pages/public/subMenuModule/regDoctorWork')}
                     ]
                    },
                   {
                     'id': 24,
                     'path': '/public/orgServiceManager',
                     'title': '机构服务统计', 
                     'list': 'sort', 
                     'name': 'orgServiceManager', 
                     'icon': 'el-icon-s-unfold', 
                     'component': () => import('src/pages/public/orgServiceManager'),
                     'children': [
                        {'id': 31, 'path': '/public/subMenuModule/orgCreateRecord', 'title': '建档率', 'list': 'sort', 'name': 'orgCreateRecord', 'component': () => import('src/pages/public/subMenuModule/orgCreateRecord')},
                        {'id': 32, 'path': '/public/subMenuModule/orgExamine', 'title': '体检率', 'list': 'sort', 'name': 'orgExamine', 'component': () => import('src/pages/public/subMenuModule/orgExamine')},
                        {'id': 33, 'path': '/public/subMenuModule/orgHighNorm', 'title': '高血压规范管理率', 'list': 'sort', 'name': 'orgHighNorm', 'component': () => import('src/pages/public/subMenuModule/orgHighNorm')},
                        {'id': 34, 'path': '/public/subMenuModule/orgHighFollow', 'title': '高血压随访率', 'list': 'sort', 'name': 'orgHighFollow', 'component': () => import('src/pages/public/subMenuModule/orgHighFollow')},
                        {'id': 35, 'path': '/public/subMenuModule/orgDiabetesNorm', 'title': '糖尿病规范管理率', 'list': 'sort', 'name': 'orgDiabetesNorm', 'component': () => import('src/pages/public/subMenuModule/orgDiabetesNorm')},
                        {'id': 36, 'path': '/public/subMenuModule/orgDiabetesFollow', 'title': '糖尿病随访率', 'list': 'sort', 'name': 'orgDiabetesFollow', 'component': () => import('src/pages/public/subMenuModule/orgDiabetesFollow')},
                        {'id': 37, 'path': '/public/subMenuModule/orgDoctorWork', 'title': '医生工作量完成情况', 'list': 'sort', 'name': 'orgDoctorWork', 'component': () => import('src/pages/public/subMenuModule/orgDoctorWork')}
                     ]
                    }
                ]
               },
              // {
              //   'path': '/charts',
              //   'title': '图表管理',
              //   'icon': 'el-icon-adm-statistics',
              //   'hide': true,
              //   'meta': {
              //     'requireAuth': true
              //   },
              //   'component': Layout,
              //   'children': [
              //     {'path': '/charts/bar', 'title': '柱状图', 'name': 'bar', 'component': () => import('src/pages/charts/bar')},
              //     {'path': '/charts/line', 'title': '折线图'},
              //     {'path': '/charts/pie', 'title': '饼图'}
              //   ]
              // },
              // {
              //   'path': '/form',
              //   'title': '表单管理',
              //   'icon': 'el-icon-adm-form',
              //   'hide': true,
              //   'children': [
              //     {'path': '/form/render', 'title': '渲染表单'}
              //   ]
              // },
              // {
              //   'path': '/system/index',
              //   'hide': true,
              //   'title': '系统管理',
              //   'icon': 'el-icon-adm-project'
              // },
              // {
              //   'path': '/user/index',
              //   'title': '用户管理',
              //   'hide': true,
              //   'icon': 'el-icon-adm-user'
              // },
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
              }
              // {
              //   'path': '/log/index',
              //   'title': '操作日志',
              //   'hide': true,
              //   'icon': 'el-icon-adm-log'
              // },
              // {
              //   'path': '/test/index',
              //   'title': '测试',
              //   'hide': true,
              //   'icon': 'el-icon-adm-formsetup'
              // }
    ];
    // console.log(arrayFilter(list))
    return arrayFilter(list);
 }
 export function arrayFilter(arr) {
  //  数组过滤 hide 
    let curList = [];
    (arr || []).forEach(item => {
      if (item.children) item.children = arrayFilter(item.children);
      if (!item.hide) curList.push(item);  
    })
    return curList;
 }

 export function menuTitleFilter(arr, title) {
   //  数组 取值 title
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

 export function childMenuFiler(arr, attr) {
  //  数组取值子菜单
   let curList = null;
     (arr || []).forEach(item => {
        if (item.path === attr) {
          curList = item.children;
        } else if (item.children && !curList) {
          curList = childMenuFiler(item.children, attr);
        }
     })
    return curList
 }
