const itemStorage = (() => {
  const STORAGE_KEY = "campus-lost-found-items";

  function saveItems(itemsToSave) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave));
      return true;
    } catch (error) {
      console.warn("物品数据保存失败：", error);
      return false;
    }
  }

  function loadItems(defaultItems) {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (!savedData) {
        saveItems(defaultItems);
        return [...defaultItems];
      }

      const parsedItems = JSON.parse(savedData);

      if (!Array.isArray(parsedItems)) {
        throw new Error("本地保存的数据格式不正确");
      }

      return parsedItems;
    } catch (error) {
      console.warn("物品数据读取失败，将使用默认数据：", error);
      return [...defaultItems];
    }
  }

  return {
    loadItems,
    saveItems
  };
})();