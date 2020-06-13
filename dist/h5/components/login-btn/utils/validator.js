const strategies = {
  required(val, errMsg) {
    if (val === '' || typeof val === 'undefined') {
      return errMsg;
    }
  },
  isLongThan(val, len, errMsg) {
    if (val === len) {
      return errMsg;
    }
  },
  isRepeat(val, len, errMsg) {
    const isRepeat = val.some(item => {
      if (item === len) {
        return true;
      }
    });
    if (isRepeat) {
      return errMsg;
    }
  },
  isMobile(val, errMsg) {
    // let isMobile = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[0-9])[0-9]{8}$/g;
    const isMobile = /(^1[0-9]{10}$)/;
    if (!isMobile.test(val)) {
      return errMsg;
    }
  },
  isLineNumber(val, errMsg) {
    const isMobile = /^\s*\d+-?\d+\s*$/;
    if (!isMobile.test(val)) {
      return errMsg;
    }
  },
  limitTitle(val, errMsg) {
    // 富文本编辑器验证title
    if (val.length < 5 || val.length > 30) {
      return errMsg;
    }
  },
  limitContent(val, errMsg) {
    // 富文本编辑器验证content
    if (val.replace(/<h2[^>]*>.*<\/h2>/i, '').replace(/<\/?[^>]*>/g, '').length < 10) {
      return errMsg;
    }
  },
  limitRemarkNum({ val, max, min }, errMsg) {
    if (val.length > max || val.length < min) {
      return errMsg;
    }
  },
  isNumber(val, errMsg) {
    if (!Math.trunc(val) && Math.trunc(val) !== 0) {
      return errMsg;
    }
  }
};
const validate = nowValidData => {
  let obj = {
    status: false,
    value: '',
    msg: '',
    type: nowValidData.type
  };
  const rules = nowValidData.rules;
  let stop = false;
  for (let i = 0, l1 = rules.length; i < l1; i++) {
    const RuleItem = rules[i];
    const rule = RuleItem.rule;
    const arg = [nowValidData.value, RuleItem.msg];
    const status = strategies[rule].apply(null, arg);
    if (status) {
      obj = {
        status: true,
        value: nowValidData.value,
        msg: status,
        type: nowValidData.type
      };
      stop = true;
      break;
    }
    if (stop) {
      break;
    }
  }
  return obj;
};
export const mnpValidate = (nowValidData, errorObj) => {
  const validateResult = validate(nowValidData);
  const { status, type, msg } = validateResult;
  errorObj[type] = { status, msg };
  return errorObj;
};
export const checkRules = (rules, error, scope, nowKey, errorFn) => {
  // 默认规则
  // const {name, service_tel, desc, address} = this.state
  // const rules = [
  //   {value: address, type: 'address', rules: [{rule: 'required', msg: '请填写地址!'}]},
  //   {value: name, type: 'name', rules: [{rule: 'required', msg: '请填写商户名称!'}]},
  //   {value: service_tel, type: 'service_tel', rules: [{rule: 'required', msg: '请填写客服电话!'}]},
  //   {value: desc, type: 'desc', rules: [{rule: 'required', msg: '请填写商户描述!'}]}
  // ]
  let nowError = {};
  if (nowKey) {
    const nowRule = rules.find(ruleItem => ruleItem.type === nowKey);
    if (!nowRule) {
      // console.error(`没有在规则中找到${nowKey}，请检查您的规则`)
      return false;
    }
    nowError = mnpValidate(nowRule, error);
  } else {
    rules.forEach(ruleItem => nowError = mnpValidate(ruleItem, error));
  }
  scope.setState({ error: nowError }, () => {
    if (errorFn) {
      errorFn();
    }
  });
};
export const handleError = error => {
  const keys = Object.keys(error);
  let stop = false;
  let nowError;
  keys.forEach(keyItem => {
    if (error[keyItem].status && !stop) {
      nowError = error[keyItem];
      stop = true;
    }
  });
  return nowError;
};
export default validate;