/* 一元判断 */

/**

 * 按钮点击事件

 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消

 */

const onButtonClick = (status) => {
    
      if (status == 1) {
    
        sendLog('processing') jumpTo('IndexPage')
    
      } else if (status == 2) {
    
        sendLog('fail') jumpTo('FailPage')
    
      } else if (status == 3) {
    
        sendLog('fail') jumpTo('FailPage')
    
      } else if (status == 4) {
    
        sendLog('success') jumpTo('SuccessPage')
    
      } else if (status == 5) {
    
        sendLog('cancel') jumpTo('CancelPage')
    
      } else {
    
        sendLog('other') jumpTo('Index')
    
      }
    
}

/**
 * 使用switch
 * @param {*status} status 
 */

const onButtonClick = (status) => {
  switch (status) {
    case 1:
      sendLog('processing');
      jumpTo('IndexPage');
      break;
    case 2:
    case 3:
      sendLog('fail');
      jumpTo('FailPage');
      break;
    case 4:
      sendLog('success');
      jumpTo('SuccessPage');
    case 5:
      sendLog('cancel');
      jumpTo('CancelPage');
    default:
      sendLog('other');
      jumpTo('Index');
      break;
  }
}

/**
 * 使用key - value对象的形式
 * 用对象属性查找的方式来进行逻辑判断，特别符合一元条件判断的情况
 */

 const actionObj = {
   '1': ['processing', 'IndexPage'],
   '2': ['fail', 'FailPage'],
   '3': ['fail', 'FailPage'],
   '4': ['success', 'SuccessPage'],
   '5': ['cancel', 'CancelPage'],
   'default': ['other', 'Index'],
 };

 const onButtonClick = (status) => {
   let action = actionObj[status] || actionObj['default'];
   
   sendLog(action[0]);
   jumpTo(action[1]);
 }

 /**
  * 使用map对象(任何具有iterator接口，且每个成员都是一个双元素数组的数据结构，都可以当作Map构造函数的参数)
  * 相对Object对象的优点：
  * 1. prototype不同；
  * 2. map的key可以是任意类型，而Object只能是字符串或symbol；
  * 3. map通过size能得到map的键值对个数，而对象的键值对个数只能手动确认；
  */
  const actionMap = new Map([
    [1, ['processing', 'IndexPage']],
    [2, ['fail', 'FailPage']],
    [3, ['fail', 'FailPage']],
    [4, ['success', 'SuccessPage']],
    [5, ['cancel', 'CancelPage']],
    ['default', ['other', 'Index']]
  ]);

  const onButtonClick = (status) => {
    let action = actionMap.get(status) || actionMap.get('default');
    
    sendLog(action[0]);
    jumpTo(action[1]);
  }

/* 多元判断 除了要判断status，还要判断用户的身份 */
/**

 * 按钮点击事件

 * @param {number} status 活动状态：1开团进行中 2开团失败 3 开团成功 4 商品售罄 5 有库存未开团

 * @param {string} identity 身份标识：guest客态 master主态

 */

const onButtonClick = (status, identity) => {
  
    if (identity == 'guest') {
  
      if (status == 1) {
  
        //do sth
  
      } else if (status == 2) {
  
        //do sth
  
      } else if (status == 3) {
  
        //do sth
  
      } else if (status == 4) {
  
        //do sth
  
      } else if (status == 5) {
  
        //do sth
  
      } else {
  
        //do sth
  
      }
  
    } else if (identity == 'master') {
  
      if (status == 1) {
  
        //do sth
  
      } else if (status == 2) {
  
        //do sth
  
      } else if (status == 3) {
  
        //do sth
  
      } else if (status == 4) {
  
        //do sth
  
      } else if (status == 5) {
  
        //do sth
  
      } else {
  
        //do sth
  
      }
  
    }
  }

/**
 * map改写
 * 字符串拼接的方式
 * 
 */
const actions = new Map([
  
    ['guest_1', () => { /*do sth*/ }],
  
    ['guest_2', () => { /*do sth*/ }],
  
    ['guest_3', () => { /*do sth*/ }],
  
    ['guest_4', () => { /*do sth*/ }],
  
    ['guest_5', () => { /*do sth*/ }],
  
    ['master_1', () => { /*do sth*/ }],
  
    ['master_2', () => { /*do sth*/ }],
  
    ['master_3', () => { /*do sth*/ }],
  
    ['master_4', () => { /*do sth*/ }],
  
    ['master_5', () => { /*do sth*/ }],
  
    ['default', () => { /*do sth*/ }],
  
  ])
  
  
  /**
  
   * 按钮点击事件
  
   * @param {string} identity 身份标识：guest客态 master主态
  
   * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
  
   */
  
  const onButtonClick = (identity, status) => {
    let action = actions.get(`${identity}_${status}`) || actions.get('default');
  
    action.call(this);
  }

/**
 * map 方式改写
 * 对象作为key
 */
const actions = new Map([
    [{
  
      identity: 'guest',
  
      status: 1
  
    }, () => { /* functionA */ }],
  
    [{
  
      identity: 'guest',
  
      status: 2
  
    }, () => { /* functionA */ }],
  
    [{
  
      identity: 'guest',
  
      status: 3
  
    }, () => { /* functionA */ }],
  
    [{
  
      identity: 'guest',
  
      status: 4
  
    }, () => { /* functionA */ }],
  
    [{
  
      identity: 'guest',
  
      status: 5
  
    }, () => { /* functionB */ }],
  
    //...
  
  ]);

  const onButtonClick = (identity, status) => {
      let action = [...actions].filter(([key, value]) => (key.identity == identity && key.status == status));
    
      action.forEach(([key, value]) => value.call(this));
   }

   
 /**
  * 缓存function A，function B
  * 注意这里是一个闭包
  * 为什么这里不把function A，function B写在外面？
  */
const actions = () => {
  
    const functionA = () => { /*do sth*/ }
  
    const functionB = () => { /*do sth*/ }
  
    return new Map([
      [{
  
        identity: 'guest',
  
        status: 1
  
      }, functionA],
  
      [{
  
        identity: 'guest',
  
        status: 2
  
      }, functionA],
  
      [{
  
        identity: 'guest',
  
        status: 3
  
      }, functionA],
  
      [{
  
        identity: 'guest',
  
        status: 4
  
      }, functionA],
  
      [{
  
        identity: 'guest',
  
        status: 5
  
      }, functionB],
  
      //...
  
    ]);
}
  
  
  
  const onButtonClick = (identity, status) => {
    let action = [...actions()].filter(([key, value]) => (key.identity == identity && key.status == status));
  
    action.forEach(([key, value]) => value.call(this));
  }

/**
 * 正则表达式改写
 */

const actions = () => {
  
    const functionA = () => { /*do sth*/ }
  
    const functionB = () => { /*do sth*/ }
  
    const functionC = () => { /*send log*/ }
  
    return new Map([
  
      [/^guest_[1-4]$/, functionA],
  
      [/^guest_5$/, functionB],
  
      [/^guest_.*$/, functionC],
  
      //...
  
    ])
  
  }
  
  
  
  const onButtonClick = (identity, status) => {
  
    let action = [...actions()].filter(([key, value]) => (key.test(`${identity}_${status}`)))
  
    action.forEach(([key, value]) => value.call(this))
  
  }

  
  /**
   * if/else
  
  switch
  
  一元判断时：存到Object里
  
  一元判断时：存到Map里
  
  多元判断时：将condition拼接成字符串存到Object里
  
  多元判断时：将condition拼接成字符串存到Map里
  
  多元判断时：将condition存为Object存到Map里
  
  多元判断时：将condition写作正则存到Map里
   
  */