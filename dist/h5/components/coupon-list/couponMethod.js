import { navigateBy } from "navigate";
import dayjs from "dayjs";
// 星期定义
export const weekMap = new Map([[1, "周一"], [2, "周二"], [3, "周三"], [4, "周四"], [5, "周五"], [6, "周六"], [7, "周日"]]);
// 适用范围定义
export const applyScopeMap = new Map([[0, "全平台可用"], [1, "指定部分可用"], [2, "指定部分不可用"]]);
// 获取星期名称
export function getWeekName(week) {
  return weekMap.get(week);
}
// 获取适用范围名称
export function getApplyScopeName(scope) {
  return applyScopeMap.get(scope);
}
// 获取优惠券有效期
export function getValidDateText(coupon) {
  if (!coupon) {
    return "";
  }
  // 有效期类型 1 固定日期 2 非固定日期
  if (Number(coupon.termType) === 1) {
    return `${coupon.effectiveTime}-${coupon.overdueTime}`;
  } else {
    const { delayDays, validityDays } = coupon;
    const delayDayText = delayDays === 0 ? "当" : delayDays || "";
    const validDayText = validityDays === 0 ? "当" : validityDays || "";
    return `领取后${delayDayText}天生效，有效期为${validDayText}天`;
  }
}
// 获取优惠券失效说明
export function getValidTipText(coupon) {
  if (!coupon) {
    return "";
  }
  const { effectiveTime, overdueTime } = coupon || {};
  // 延迟可用天数
  if (effectiveTime) {
    const delayDay = dayjs(effectiveTime).diff(dayjs(), "day");
    if (delayDay > 0) {
      return `${delayDay}天后可用`;
    }
  }
  // 可用剩余天数
  if (overdueTime) {
    const surplusSecond = dayjs(overdueTime).diff(dayjs(), "millisecond"); // 与当前时间毫秒差值
    if (surplusSecond <= 0) {
      return "已过期";
    }
    const surplusDay = dayjs(overdueTime).diff(dayjs(), "day"); // 与当前时间天数差值
    return surplusDay > 0 ? `剩余${surplusDay}天` : surplusDay === 0 ? "今日过期" : "已过期";
  }
  return "";
}
/**
 * 整合优惠券适用范围数据
 */
function getCouponScopeTarget(coupon) {
  // scopeType 范围类型：1 商品类目 2 商家 3 商品
  const goodsList = [];
  const goodsCateList = [];
  const shopList = [];
  // 根据使用范围类别进行数据分组
  if (coupon && coupon.scopeList && coupon.scopeList.length > 0) {
    coupon.scopeList.forEach(scope => {
      const { scopeType, scopeId, appId } = scope;
      if (Number(scopeType) === 1) {
        goodsCateList.push({ scopeId, appId });
      }
      if (Number(scopeType) === 2) {
        shopList.push({ scopeId, appId });
      }
      if (Number(scopeType) === 3) {
        goodsList.push({ scopeId, appId });
      }
    });
  }
  return {
    goodsList,
    goodsCateList,
    shopList
  };
}
/**
 * 优惠券去使用，则根据优惠券适用范围跳转至不同的落地页(适用范围 0 全部 1 指定可用 2 指定不可用)
 */
export function couponToUsed(coupon) {
  console.log("couponToUsed coupon:", coupon);
  // 适用范围为全部或指定不可用
  if (Number(coupon.applyScope) === 0 || Number(coupon.applyScope) === 2) {
    return navigateBy({
      subBisCode: "-1",
      sectionType: "home",
      debug: true,
      params: {
        id: ""
      }
    });
  } else {
    // 适用范围为指定可用
    let pageType = "home";
    let subBisCode = "-1";
    const params = { id: "" };
    const couponScopes = getCouponScopeTarget(coupon);
    if (couponScopes.goodsList.length) {
      pageType = couponScopes.goodsList.length > 1 ? "list" : "detail";
      // 商品所属的业务标识
      const { appId, scopeId } = couponScopes.goodsList[0];
      subBisCode = appId;
      params.id = scopeId;
    } else if (couponScopes.goodsCateList.length) {
      pageType = couponScopes.goodsCateList.length > 1 ? "list" : "detail";
      // 分类所属的业务标识
      const { appId, scopeId } = couponScopes.goodsCateList[0];
      subBisCode = appId;
      params.id = scopeId;
    } else if (couponScopes.shopList.length) {
      pageType = couponScopes.shopList.length > 1 ? "list" : "detail";
      // 商家所属的业务标识
      const { appId, scopeId } = couponScopes.shopList[0];
      subBisCode = appId;
      params.id = scopeId;
    }
    // 跳转最终的落地页
    return navigateBy({
      subBisCode,
      sectionType: pageType,
      debug: true,
      params
    });
  }
}