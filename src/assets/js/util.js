let util = {
  debounceIdentify: 0,
  bounce (func, delay) {
    this.debounceIdentify && clearTimeout(this.debounceIdentify);
    this.debounceIdentify = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  }
};

export function setTitle (title) {
  title = title || '新海健康管理平台';
  window.document.title = title;
}

export function setMenu (routers, code) {
  /*
  *  @routers  redux管理的 appRouter和otherRouter 的路由表
  *  @code  用户类型   user.codetype 字段  值为 1，2，3，4
  *
  * */
  let menu = [];
  routers.forEach(router => {
    console.log(routers)
    const INDEX = router.children[0];
    if (INDEX.meta.role.indexOf(code) > -1) {
      let obj = {
        title: INDEX.meta.title,
        path: `${router.path}/${INDEX.path}`,
        icon: `el-icon-dogma-${INDEX.meta.icon}`
      };
      menu.push(obj);
    }
  });
  
  return menu;
}

export function measureArray (string, value) {
  if (string === true) return 'temperature&glucose&pressure&oxygen&height&blood_fat&weight&pulse&urinalysis&body_fat&hemoglobin&blood_uric_acid&height_weight&rate&eyesight';
  if (string && value) {
    let array = ('temperature&glucose&pressure&oxygen&height&blood_fat&weight&pulse&urinalysis&body_fat&hemoglobin&blood_uric_acid&height_weight&rate&eyesight').split('&');
    let curArray = [];
    let curObj = [];
    array.map(function(item) {
      curObj = {};
      curObj[string] = item;
      curObj[value] = getTypeName(item);
      curArray.push(curObj)
    });
    return curArray;
  }
  return ('temperature&glucose&pressure&oxygen&height&blood_fat&weight&pulse&urinalysis&body_fat&hemoglobin&blood_uric_acid&height_weight&rate&eyesight').split('&')
}

export function reduceArray (array) {
  return array.reduce((pre, item) => { return pre + item; }, 0);
}

export function deviceAddressArray () {
    return [
      {name: '武汉市中心医院', value: '15050501'},
      {name: '电科导航', value: '16050601'},
      {name: '2016年湖北省一体机', value: '16101801'},
      {name: '武汉市交管局', value: '170110501'},
      {name: '鄂州工业研究院', value: '17021801'},
      {name: '上海', value: '17051801'},
      {name: '社区580', value: '17101801'},
      {name: '北京中能', value: '17101802'},
      {name: '同步远方', value: '17102001'},
      {name: '四川益阳', value: '17111301'},
      {name: '万达', value: '18032001'},
      {name: '微至健康服务中心', value: '18080601'},
      {name: '襄樊', value: '18080601'},
      {name: '武汉默联', value: '18081301'},
      {name: '崇仁小学', value: '18091301'}
    ]
}

export function curDate(yearVal, monthVal, dateVal) {
    yearVal = yearVal || 0
    monthVal = monthVal || 0
    dateVal = dateVal || 0
    let nowDate = new Date();
    let date = {
        year: nowDate.getFullYear() + yearVal,
        month: (nowDate.getMonth() + 1 + monthVal === 0 ? 12 : nowDate.getMonth() + 1 + monthVal),
        date: nowDate.getDate()
    }
    return date.year + '-' + (date.month > 9 ? date.month : '0' + date.month) + '-' + (date.date > 9 ? date.date : '0' + date.date);
}

export function beforeDay(num) {
    let myDate = new Date(); 
    myDate.setDate(myDate.getDate() - (num - 1));
    let dateArray = [];
    let dateTemp;
    let flag = 1;
    for (let i = 0; i < num; i++) {
      dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
      dateArray.push(dateTemp);
      myDate.setDate(myDate.getDate() + flag);
    }
    return dateArray
}

export function getTimestamp(time) {
   return (new Date(time)).getTime()
}

export function getTypeName(key) {
  switch (key) {
    case 'glucose': return '血糖';
    case 'eyesight': return '视力';
    case 'blood_fat': return '血脂';
    case 'weight': return '体重';
    case 'pressure': return '血压';
    case 'hemoglobin':return '血红蛋白';
    case 'blood_uric_acid': return '血尿酸';
    case 'height_weight':return 'BMI';
    case 'urinalysis' :return '尿常规';
    case 'rate' :return '心率';
    case 'temperature' : return '体温';
    case 'pulse' : return '脉率';
    case 'oxygen' : return '血氧';
    case 'body_fat' :return '体脂';
    case 'height' :return '身高';
    case 'login_idcard' : return '身份证登录';
    case 'login_faceId' : return '人脸识别登录';
    case 'login_username' : return '用户名登录';
    case 'login_jkwh_qrcode' : return '健康武汉二维码登录';
    case 'login_device_qrcode' : return '新海设备二维码登录';
    case 'login_huakeda_qrcode' : return '华科大二维码登录';
    case 'login_search_history' : return '身份搜索登录';
    case 'login_wechat_openid' : return '微信登录';
  }
}

export function getCurrentPath (vm, router) {
  // console.log(router);
  // const routers = vm.$store.state.routers;
  // console.log(routers);
  
  let currentPathArr = [];
  
  if (router.name !== 'home') {
    if (router.name.indexOf('_index') > -1) {
      currentPathArr.push({
        title: router.meta.title,
        path: '',
        name: router.name
      });
    } else {
      router.matched.forEach(item => {
        let obj = {
          title: item.meta.title,
          path: item.path,
          name: item.name
        };
        if (item.path.indexOf('/:id') > -1) {
          obj.path = router.path;
        }
        currentPathArr.push(obj);
      });
    }
  }
  
  // console.log(currentPathArr);
  // 当 currentPathArr 的长度不为空的时候  提交 action
  
  return currentPathArr;
}

export function mergeBarData (target, data) {
  console.log(target);
  console.log(data);
  if (target.legend && target.legend.data.length) {
    target.legend.data = data.map(first => {
      return first.name;
    });
  }
  
  if (target.nest) {
    target.xAxis.data = data[0].value.map(first => {
      return first.name;
    });
    
    target.series = data.map(first => {
      let obj = {
        name: first.name,
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        },
        data: []
      };
      obj.data = first.value.map(second => {
        return second.value;
      });
      return obj;
    });
  } else {
    let categoryAxis = target.xAxis.type === 'category' ? target.xAxis : target.yAxis;
    
    categoryAxis.data = data.map(first => {
      return first.name;
    });
    
    target.series[0].data = data.map(first => {
      return first.value;
    });
  }
  return target;
}

export default util;
