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
 export function formatDate(row, column) {
   let errorDate = function() {
      let Y = '2020';
      let M = '01';
      let D = '01';
      let h = '00';
      let m = '00';
      let s = '00';
      column = column.replace('Y', Y)
      column = column.replace('M', M)
      column = column.replace('D', D)
      column = column.replace('h', h)
      column = column.replace('m', m)
      column = column.replace('s', s)
      return column;
   }
   if (!row) return errorDate();
   try {
      let date = new Date(row);
      let Y = date.getFullYear();
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      // return Y + M + D + h + m + s;
      column = column.replace('Y', Y)
      column = column.replace('M', M)
      column = column.replace('D', D)
      column = column.replace('h', h)
      column = column.replace('m', m)
      column = column.replace('s', s)
       return column;
   } catch (err) {
     return errorDate();
   }
}

export function arrayStringToNumber(str) {
  str = '' + str || ''
  if (str.indexOf(',') > 0) str = str.split(',');
  if (!str || str === '[]') return [];
  if (str.length === 1) return [+str];
  let arr = [];
  (str || []).map(item => {
    if (!item || !+item) return;
    arr.push(item);
  })
  return arr;
}

export function pathUpdateJoin(ops) {
   /*
  *  ops.vue  this 指向
  *  ops.path 上传路径
  *  ops.keys 参数名
  *  ops.values 参数值
  *  ops.params 参数对象
  * */
  if (!ops.vue) return '';
  let baseUrl = ((ops.vue.axios || {}).defaults || {}).baseURL;
  if (ops.params) {
     baseUrl = baseUrl + ops.path + '?';
    for (let i in ops.params) {
      baseUrl += i + '=' + ops.params[i] + '&'
    }
    baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('&'));
    return baseUrl;
  }
  if (typeof ops.keys === 'object' && ops.keys[0]) {
    baseUrl = baseUrl + ops.path + '?';
    (ops.keys || []).forEach((element, item) => {
      if (item === (ops.keys).length - 1) {
        baseUrl += element + '=' + ops.values[item];
      } else {
        baseUrl += element + '=' + ops.values[item] + '&'
      }
    });
    return baseUrl;
  }
  return baseUrl + ops.path + '?' + ops.keys + '=' + ops.values; 
}

export function deleteArrayAttr(arr, attr) {
  let index = arr.indexOf(attr);
  if (index < 0) return [];
  arr.splice(index, 1);
  return arr;
}

export function underline2Hump(s) {
  /*
  *  字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
  * */
  return s.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

export function hump2Underline(s) {
   /*
  *  字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
  * */
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function updateKeyUnder(arr, skip, isExecArrayToString) {
      /*
  * 统一将 下划线格式转 字符串的驼峰格式
  *  arr  需要转换KEY 对象 
  *  skip  过滤的key
  * isExecArrayToString  是否只执行 数组转字符串
  * */
  let defaultSkip = {};
  (skip || []).map(item => {
    defaultSkip[item] = true;
  });
  let obj = {};
  for (let i in arr) {
    if (!defaultSkip[i]) {
      try {
         if (typeof arr[i] === 'object') arr[i] = arr[i].join(',');
      } catch (err) {
        arr[i] = arr[i]
      }
     isExecArrayToString ? obj[i] = arr[i] : obj[underline2Hump(i)] = arr[i];
    } 
  }
  return obj;
}

export function updateKeyHump(arr, skip, isExecArrayToString) {
    /*
  * 统一将 字符串的驼峰格式转下划线格式
  *  arr  需要转换KEY 对象 
  *  skip  过滤的key
  * isExecArrayToString  是否只执行 数组转字符串
  * */
  let defaultSkip = {
    'disease1Has1': true, 
    'disease1Has2': true,
    'disease1Has3': true,
    'disease1Has4': true,
    'disease1Has5': true,
    'disease1Has6': true,
    'fatherHistory': true,
    'motherHistory': true,
    'brotherHistory': true,
    'childrenHistory': true,
    'geneticHistory': true
  };
  (skip || []).map(item => {
    defaultSkip[item] = true;
  });
  let obj = {};
  for (let i in arr) {
    if (!defaultSkip[i]) {
      try {
         if (typeof arr[i] === 'object') arr[i] = arr[i].join(',');
      } catch (err) {
        arr[i] = arr[i]
      }
      isExecArrayToString ? obj[i] = arr[i] : obj[hump2Underline(i)] = arr[i];
    } 
  }
  return obj;
}


export function extend(target, source, socpe) {
  if (socpe) {
    Object.assign(target, source);
    return Object.assign(target, socpe);
  }
  return Object.assign(target, source);
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

export function reduceString (array) {
  let str = '';
  array.forEach((item, index) => {
     str += item.id
    if (index < array.length - 1) {
       str += ','
    }  
  })
  return str
}

export function deviceAddressArray () {
    return [
      {name: '武汉市中心医院', value: '15050501', keyValue: '1'},
      {name: '电科导航', value: '16050601', keyValue: '2'},
      {name: '2016年湖北省一体机', value: '16101801', keyValue: '3'},
      {name: '武汉市交管局', value: '170110501', keyValue: '4'},
      {name: '鄂州工业研究院', value: '17021801', keyValue: '5'},
      {name: '上海', value: '17051801', keyValue: '6'},
      {name: '社区580', value: '17101801', keyValue: '7'},
      {name: '北京中能', value: '17101802', keyValue: '8'},
      {name: '同步远方', value: '17102001', keyValue: '9'},
      {name: '四川益阳', value: '17111301', keyValue: '10'},
      {name: '万达', value: '18032001', keyValue: '11'},
      {name: '微至健康服务中心', value: '18080601', keyValue: '12'},
      {name: '襄樊', value: '18080601', keyValue: '13'},
      {name: '武汉默联', value: '18081301', keyValue: '14'},
      {name: '崇仁小学', value: '18091301', keyValue: '15'}
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

export function SFID(card) {
    let vcity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
   };

  let isCardNo = function(card) {
      let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (reg.test(card) === false) {
          return false;
      }
      return true;
  };

  let checkProvince = function(card) {
      let province = card.substr(0, 2);
      if (vcity[province] === undefined) {
          return false;
      }
      return true;
  };

  let checkBirthday = function(card) {
      let len = card.length;
      if (len === 15) {
          let reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/; 
          let arrData = card.match(reFifteen);
          let year = arrData[2];
          let month = arrData[3];
          let day = arrData[4];
          let birthday = new Date('19' + year + '/' + month + '/' + day);
          return verifyBirthday('19' + year, month, day, birthday);
      }
      if (len === 18) {
          let reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          let arrData = card.match(reEighteen);
          let year = arrData[2];
          let month = arrData[3];
          let day = arrData[4];
          let birthday = new Date(year + '/' + month + '/' + day);
          return verifyBirthday(year, month, day, birthday);
      }
      return false;
  };

  let verifyBirthday = function(year, month, day, birthday) {
      year = +year
      month = +month
      day = +day
      let now = new Date();
      let nowYear = now.getFullYear();
      if (birthday.getFullYear() === year && (birthday.getMonth() + 1) === month && birthday.getDate() === day) {
          let time = nowYear - year;
          if (time >= 3 && time <= 100) {
              return true;
          }
          return false;
      }
      return false;
  };

  let checkParity = function(card) {
      card = changeFivteenToEighteen(card);
      let len = card.length;
      if (len === 18) {
          let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; 
          let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; 
          let cardTemp = 0;
          let i;
          let valnum; 
          for (i = 0; i < 17; i++) { 
              cardTemp += card.substr(i, 1) * arrInt[i]; 
          } 
          valnum = arrCh[cardTemp % 11]; 
          if (valnum === card.substr(17, 1)) {
              return true;
          }
          return false;
      }
      return false; 
  };
  let changeFivteenToEighteen = function(card) {
      if (card.length === 15) {
          let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; 
          let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; 
          let cardTemp = 0;
          let i;   
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for (i = 0; i < 17; i++) { 
              cardTemp += card.substr(i, 1) * arrInt[i]; 
          } 
          card += arrCh[cardTemp % 11]; 
          return card;
      }
      return card;
  };
  
    if (card === '') {
          return false;
      }
      if (isCardNo(card) === false) {
          return false;
      }
      if (checkProvince(card) === false) {
          return false;
      }
      if (checkBirthday(card) === false) {
          return false;
      }
      if (checkParity(card) === false) {
        return false;
      }
    return true;
}

export default util;
