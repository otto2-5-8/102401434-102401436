/**
 * 持久化层：把信息数组存进 localStorage，刷新页面后数据不丢。
 *
 * 公开 API 与共用框架保持一致（loadItems / saveItems），存储键也沿用
 * "campus-lost-found-items"，这样两人那半合并后读的是同一份数据。
 */
const itemStorage = (function () {
  const STORAGE_KEY = "campus-lost-found-items";

  /** 读取失败（隐私模式、被禁用、数据被改坏）时回退到示例数据，不让页面白屏。 */
  function loadItems(defaultItems) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        saveItems(defaultItems);
        return defaultItems.map(copyItem);
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        throw new Error("本地保存的数据不是数组");
      }

      return parsed.filter(isUsableItem).map(copyItem);
    } catch (error) {
      console.warn("物品数据读取失败，改用示例数据：", error);
      return defaultItems.map(copyItem);
    }
  }

  /** 写入失败时返回 false，由调用方给出"存不下/被禁用"的提示。 */
  function saveItems(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (error) {
      console.warn("物品数据保存失败：", error);
      return false;
    }
  }

  function isUsableItem(item) {
    return Boolean(item) && typeof item === "object" && item.id != null && typeof item.name === "string";
  }

  function copyItem(item) {
    return Object.assign({}, item);
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    loadItems: loadItems,
    saveItems: saveItems
  };
})();
