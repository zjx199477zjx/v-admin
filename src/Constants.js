'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

module.exports = {
    defaultConfig: {
        // 列表页数据最大显示数量 定义
        dataNumberPage: [10, 20, 50, 100],
        // 默认显示条数
        numPage: 10,
        // 分页显示风格顺序
        layoutPage: 'total, sizes, prev, pager, next, jumper',
        // 上传图片路径
        updatePath: 'SihealIMManagement/file/upload_edu_file'
    },

    defaultParam: {
        terminal: 'pc',
        version_no: '10001',
        token: '',
        role: '',
        project: -1,
        uid: ''
    },

    // 一体机 携带参数
    defaultMachineParam: {
        adminid: 2,
        appcode: 'system',
        skip: true
    },

    // 疾病类型
    defaultDiseaseType: [
        {name: '高血压', value: 0},
        {name: '糖尿病', value: 1}
    ],

    // 人群范围
    defaultCrowd: [
        {name: '全部', value: -1},
        {name: '儿童', value: 0},
        {name: '青少年', value: 1},
        {name: '青年', value: 2},
        {name: '中年人', value: 3},
        {name: '老年人', value: 4}
    ],

    // 老年人生活评估 室内活动
    defaultPeopleEating: [
        {name: '可自理:独立完成(0分）', value: 0},
        {name: '中度依赖:需要协助，如切碎、搅拌食物等（3分）', value: 3},
        {name: '不能自理:完全需要帮助（5分） ', value: 5}
    ],

     // 老年人生活评估 自控
    defaultPeopleToilet: [
        {name: ' 可自理:不需协助，可自控（0分）', value: 0},
        {name: ' 轻度依赖:偶尔失禁，但基本上能如厕或使用便具 （1分）', value: 1},
        {name: ' 中度依赖:经常失禁，在很多提示和协助下尚能如厕或使用便具（5分）', value: 5},
        {name: ' 不能自理:完全失禁，完全需要帮助（10分）', value: 10}
    ],

     // 老年人生活评估 室外活动
    defaultPeopleActivity: [
        {name: ' 可自理:独立完成所有活动（0分）', value: 0},
        {name: ' 轻度依赖:借助较小的外力或辅助装置能完成站立、行走、上下楼梯等（1分）', value: 1},
        {name: ' 中度依赖:借助较大的外力才能完成站立、行走，不能上下楼梯 （5分）', value: 5},
        {name: ' 不能自理:卧床不起，活动完全需要帮助（10分） ', value: 10}
    ],

    // 存档材料请附后
    defaultArchive: [
        {name: '书面材料', value: 1},
        {name: '图片材料', value: 2},
        {name: '印刷材料', value: 3},
        {name: '影音材料', value: 4},
        {name: '签到表', value: 5},
        {name: '其他材料', value: 6}
    ],

    // 阳虚质
    defaultRadioState: [
        {name: '没有(根本不)', value: 1},
        {name: '很少(有一点)', value: 2},
        {name: '有时(有些)', value: 3},
        {name: '经常(相当)', value: 4},
        {name: '总是(非常)', value: 5}
    ],

    // 判断结果
    defaultResult: [
        {name: '是', value: 1},
        {name: '倾向是', value: 2},
        {name: '否', value: 3}
    ],

    // 摄盐情况(咸淡)
    defaultSalt: [
        {name: '轻', value: 1},
        {name: '中', value: 2},
        {name: '重 ', value: 3}
    ],
    
    // 药物不良反应
    defaultMReactions: [
        {name: '无', value: 1},
        {name: '有', value: 2}
    ],

    // 此次随访分类
    defaultHbpType: [
        {name: '控制满意', value: 1},
        {name: '控制不满意', value: 2},
        {name: '不良反应', value: 3},
        {name: '并发症', value: 4}
    ],

    // 遵医行为
    defaultBehavior: [
        {name: '良好', value: 1},
        {name: '一般', value: 2},
        {name: '差 ', value: 3}
    ],

    // 随访方式
    defaultFollowType: [
        {name: '门诊', value: 1},
        {name: '家庭', value: 2},
        {name: '电话 ', value: 3}
    ],

    // 老年人健康状态自我评估
    defaultEha: [
        {name: '满意', value: 1},
        {name: '基本满意', value: 2},
        {name: '说不清楚', value: 3},
        {name: '不太满意', value: 4},
        {name: '不满意', value: 5}
    ],

    // 体育锻炼频率
    defaultExercise: [
        {name: '每天', value: 1},
        {name: '每周一次以上', value: 2},
        {name: '偶尔', value: 3},
        {name: '不锻炼', value: 4}
    ],

    // 口唇
    defaultLips: [
        {name: '红润', value: 1},
        {name: '苍白', value: 2},
        {name: '发绀', value: 3},
        {name: '皲裂', value: 4},
        {name: '疱疹', value: 5}
    ],

    // 齿列
    defaultDentition: [
        {name: '正常', value: 1},
        {name: '缺齿', value: 2},
        {name: '龋齿', value: 3},
        {name: '义齿(假牙)', value: 4}
    ],

    // 听力
    defaultListening: [
        {name: '听见', value: 1},
        {name: '听不清或无法听见', value: 2}
    ],

    // 运动功能
    defaultMotor: [
        {name: '可顺利完成', value: 1},
        {name: '无法独立完成其中任何一个动作', value: 2}
    ],

    // 皮肤
    defaultSkin: [
        {name: '正常', value: 1},
        {name: '潮红', value: 2},
        {name: '苍白', value: 3},
        {name: '发绀', value: 4},
        {name: '黄染', value: 5},
        {name: '色素沉着', value: 6},
        {name: '其他', value: 7, other: true}
    ],

    // 巩膜
    defaultSclear: [
        {name: '正常', value: 1},
        {name: '黄染', value: 2},
        {name: '充血', value: 3},
        {name: '其他', value: 4, other: true}
    ],

    // 淋巴结
    defaultNodes: [
        {name: '未触及', value: 1},
        {name: '锁骨上', value: 2},
        {name: '腋窝', value: 3},
        {name: '其他', value: 4, other: true}
    ],

    // 罗音(肺)
    defaultRale: [
        {name: '无', value: 1},
        {name: '干罗音', value: 2},
        {name: '湿罗音', value: 3},
        {name: '其他', value: 4, other: true}
    ],

    // 心律(心脏)
    defaultRhythm: [
        {name: '齐', value: 1},
        {name: '不齐', value: 2},
        {name: '绝对不齐', value: 3}
    ],

    // 下肢水肿
    defaultEfet: [
        {name: '无', value: 1},
        {name: '单侧', value: 2},
        {name: '双侧不对称', value: 3},
        {name: '双侧对称', value: 4}
    ],

    // 足背动脉搏动
    defaultDartp: [
        {name: '未触及', value: 1},
        {name: '触及双侧对称', value: 2},
        {name: '触及左侧弱或消失', value: 3},
        {name: '触及右侧弱或消失', value: 4}
    ],

    // 肛门指诊
    defaultRefferral: [
        {name: '未及异常', value: 1},
        {name: '触痛', value: 2},
        {name: '包块', value: 3},
        {name: '前列腺异常', value: 4},
        {name: '其他', value: 5, other: true}
    ],

    // 脑血管疾病
    defaultDisease: [
        {name: '未发现', value: 1},
        {name: '缺血性卒中', value: 2},
        {name: '脑出血', value: 3},
        {name: '蛛网膜下腔出血', value: 4},
        {name: '短暂性脑缺血发作', value: 5},
        {name: '其他', value: 6, other: true}
    ],

    // 肾脏疾病
    defaultKidney: [
        {name: '未发现', value: 1},
        {name: '糖尿病肾病', value: 2},
        {name: '肾功能衰竭', value: 3},
        {name: '急性肾炎', value: 4},
        {name: '慢性肾炎', value: 5},
        {name: '其他', value: 6, other: true}
    ],

    // 心脏疾病
    defaultHeart: [
        {name: '未发现', value: 1},
        {name: '心肌梗死', value: 2},
        {name: '心绞痛', value: 3},
        {name: '冠状动脉血运重建', value: 4},
        {name: '充血性心力衰竭', value: 5},
         {name: '心前区疼痛', value: 6},
        {name: '其他', value: 7, other: true}
    ],

    // 血管疾病
    defaultVascular: [
        {name: '未发现', value: 1},
        {name: '夹层动脉瘤', value: 2},
        {name: '动脉闭塞性疾病', value: 3},
        {name: '其他', value: 4, other: true}
    ],

    // 眼部疾病
    defaultOcular: [
        {name: '未发现', value: 1},
        {name: '视网膜出血或渗出', value: 2},
        {name: '视乳头水肿', value: 3},
        {name: '白内障', value: 4},
        {name: '其他', value: 5, other: true}
    ],

    // 服药依从性
    defaultZmedcompli: [
        {name: '规律', value: 1},
        {name: '间断', value: 2},
        {name: '不服药', value: 3}
    ],

    // 危险因素控制
    defaultRisk: [
        {name: '戒烟', value: 1},
        {name: '健康饮酒', value: 2},
        {name: '饮食', value: 3},
        {name: '锻炼', value: 4},
        {name: '减体重(目标)', value: 5, other: true, formData: 'tjJweight'},
        {name: '建议接种疫苗', value: 6, other: true, formData: 'tjSeedlingsName'},
        {name: '其他', value: 7, other: true, formData: 'tjOtherrisk'}
    ],

    // 健康指导
    defaultLategui: [
        {name: '纳入慢性病患者健康管理', value: 1},
        {name: '建议复查', value: 2},
        {name: '建议转诊', value: 3}
    ],

    // 乳腺
    defaultBreast: [
        {name: '未见异常', value: 1},
        {name: '乳房切除', value: 2},
        {name: '异常泌乳', value: 3},
        {name: '乳腺包块', value: 4},
        {name: '其他', value: 5, other: true}
    ],

    // 平和质
    defaultQuality: [
        {name: '是', value: 1},
        {name: '基本是', value: 2}
    ],

     // 体质辨识
    defaultSubtance: [
        {name: '是', value: 1},
        {name: '倾向是', value: 2}
    ],

    // 大便潜血
    defaultFecal: [
        {name: '阴性', value: 1},
        {name: '阳性', value: 2}
    ],

    // 咽部
    defaultPharynx: [
        {name: '无充血', value: 1},
        {name: '充血', value: 2},
        {name: '淋巴滤泡增生', value: 3}
    ],

    defaultOdrch: [
        {name: '无', value: 1},
        {name: '有', value: 2}
    ],

    // 饮酒频率
    defaultDrinkw: [
        {name: '从不', value: 1},
        {name: '偶尔', value: 2},
        {name: '经常', value: 3},
        {name: '每天', value: 4}
    ],

    // 饮酒种类
    defaultZldrinkw: [
        {name: '白酒', value: 1},
        {name: '啤酒', value: 2},
        {name: '红酒', value: 3},
        {name: '黄酒', value: 4},
        {name: '其他', value: 5, other: true}
    ],

    // 是否戒酒
    defaultJdrinkw: [
        {name: '未戒酒', value: 1},
        {name: '已戒酒', value: 2}
    ],

    defaultZuidrink: [
        {name: '是', value: 1},
        {name: '否', value: 2}
    ],

    // 饮食习惯
    defaultEating: [
        {name: '荤素均衡', value: 1},
        {name: '荤食为主', value: 2},
        {name: '素食为主', value: 3},
        {name: '嗜盐', value: 4},
        {name: '嗜油', value: 5},
        {name: '嗜糖', value: 6}
    ],

    // 吸烟状况
    defaultHabit: [
        {name: '从不吸烟', value: 1},
        {name: '已戒烟', value: 2},
        {name: '吸烟', value: 3}
    ],

    // 老年人认知功能
    defaultEcf: [
        {name: '粗筛阴性', value: 1},
        {name: '粗筛阳性', value: 2}
    ],

    // 老年人生活自理能力自我评估
    defaultEsca: [
        {name: '可自理（0～3分）', value: 1},
        {name: '轻度依赖（4～8分）', value: 2},
        {name: '中度依赖（9～18分) ', value: 3},
        {name: '不能自理（≥19分）', value: 4}
    ],

    // 症状
    defaultSymptom: [
        {name: '无症状', value: 1},
        {name: '头痛', value: 2},
        {name: '头晕', value: 3},
        {name: '心悸', value: 4},
        {name: '胸闷', value: 5},
        {name: '胸痛', value: 6},
        {name: '慢性咳嗽', value: 7},
        {name: '咳痰', value: 8},
        {name: '呼吸困难', value: 9},
        {name: '多饮', value: 10},
        {name: '多尿', value: 11},
        {name: '体重下降', value: 12},
        {name: '乏力', value: 13},
        {name: '关节肿痛', value: 14},
        {name: '视力模糊', value: 15},
        {name: '手脚麻木', value: 16},
        {name: '尿急', value: 17},
        {name: '尿痛', value: 18},
        {name: '便秘', value: 19},
        {name: '腹泻', value: 20},
        {name: '恶心呕吐', value: 21},
        {name: '眼花', value: 22},
        {name: '耳鸣', value: 23},
        {name: '乳房胀痛', value: 24},
        {name: '其他', value: 25, other: true}
    ],

    // 厨房排风设施:
    defaultKitchen: [
        {name: '无', value: 1},
        {name: '油烟机', value: 2},
        {name: '换气扇', value: 3},
        {name: '烟囱', value: 4}
    ],

    // 婚姻状况
    defaultMarrageState: [
        {name: '未婚', value: 1},
        {name: '已婚', value: 2},
        {name: '丧偶', value: 3},
        {name: '离婚', value: 4},
        {name: '未说明的婚姻状况', value: 5}
    ],

    // 燃料类型
    defaultFuel: [
        {name: '液化气', value: 1},
        {name: '煤', value: 2},
        {name: '天然气', value: 3},
        {name: '沼气', value: 4},
        {name: '柴火', value: 5},
        {name: '其他', value: 6}
    ],

    // 饮水
    defaultDrinkwater: [
        {name: '自来水', value: 1},
        {name: '经净化过滤的水', value: 2},
        {name: '井水', value: 3},
        {name: '河湖水', value: 4},
        {name: '塘水', value: 5},
        {name: '其他', value: 6}
    ],

    // 厕所
    defaultWc: [
        {name: '卫生厕所', value: 1},
        {name: '一格或二格粪池式', value: 2},
        {name: '马桶', value: 3},
        {name: '露天粪坑', value: 4},
        {name: '简易棚厕', value: 5}
    ],

    // 户籍
    defaultCensus: [
        {name: '户籍', value: 1},
        {name: '非户籍', value: 2}
    ],

    // 是否RH血型
    defaultRhblood: [
        {name: '否', value: 1},
        {name: '是', value: 2},
        {name: '不祥', value: 3}
    ],

    // 禽畜栏
    defaultLivestock: [
        {name: '单设', value: 1},
        {name: '室内', value: 2},
        {name: '室外', value: 3}
    ],

    // 职业
    defaultWorkUnits: [
        {name: '国家机关、党群组织、企业、事业单位负责人', value: 1},
        {name: '专业技术人员', value: 2},
        {name: '办事人员和有关人员', value: 3},
        {name: '商业、服务业人员', value: 4},
        {name: '农、林、牧、渔、水利业生产人员', value: 5},
        {name: '生产、运输设备操作人员及有关人员', value: 6},
        {name: '军人', value: 7},
        {name: '不便分类的其他从业人员', value: 8}
    ],

    // 教育程度
    defaultCulTrueOption: [
        {name: '文盲及半文盲', value: 1},
        {name: '小学', value: 2},
        {name: '初中', value: 3},
        {name: '高中/技校/中专', value: 4},
        {name: '大学专科及以上', value: 5},
        {name: '不详', value: 6}
    ],

    // 血型
    defaultBloodType: [
        {name: 'A型', value: 1},
        {name: 'B型', value: 2},
        {name: 'AB型', value: 3},
        {name: 'O型', value: 4},
        {name: '不详', value: 5}
    ],
    // 民族
    defaultNational: [
       {name: '汉族', value: 1},
       {name: '壮族', value: 2},
       {name: '满族', value: 3},
       {name: '回族', value: 4},
       {name: '苗族', value: 5},
       {name: '维吾尔族', value: 6},
       {name: '土家族', value: 7},
       {name: '彝族', value: 8},
       {name: '蒙古族', value: 9},
       {name: '藏族', value: 10},
       {name: '布依族', value: 11},
       {name: '侗族', value: 12},
       {name: '瑶族', value: 13},
       {name: '朝鲜族', value: 14},
       {name: '白族', value: 15},
       {name: '哈尼族', value: 16},
       {name: '哈萨克族', value: 17},
       {name: '黎族', value: 18},
       {name: '傣族', value: 19},
       {name: '畲族', value: 20},
       {name: '傈僳族', value: 21},
       {name: '仡佬族', value: 22},
       {name: '东乡族', value: 23},
       {name: '高山族', value: 24},
       {name: '拉祜族', value: 25},
       {name: '水族', value: 26},
       {name: '佤族', value: 27},
       {name: '纳西族', value: 28},
       {name: '羌族', value: 29},
       {name: '土族', value: 30},
       {name: '仫佬族', value: 31},
       {name: '锡伯族', value: 32},
       {name: '柯尔克孜族', value: 33},
       {name: '达斡尔族', value: 34},
       {name: '景颇族', value: 35},
       {name: '毛南族', value: 36},
       {name: '撒拉族', value: 37},
       {name: '布朗族', value: 38},
       {name: '塔吉克族', value: 39},
       {name: '阿昌族', value: 40},
       {name: '普米族', value: 41},
       {name: '鄂温克族', value: 42},
       {name: '怒族', value: 43},
       {name: '京族', value: 44},
       {name: '基诺族', value: 45},
       {name: '德昂族', value: 46},
       {name: '保安族', value: 47},
       {name: '俄罗斯族', value: 48},
       {name: '裕固族', value: 49},
       {name: '乌孜别克族', value: 50},
       {name: '门巴族', value: 51},
       {name: '鄂伦春族', value: 52},
       {name: '独龙族', value: 53},
       {name: '塔塔尔族', value: 54},
       {name: '赫哲族', value: 55},
       {name: '珞巴族', value: 56}
     ]
    
}
