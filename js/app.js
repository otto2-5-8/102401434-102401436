const itemList = document.getElementById("item-list");

function renderItems(data) {
  itemList.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";

    const typeText = item.type === "lost" ? "寻物" : "招领";
    const typeClass = item.type === "lost" ? "lost" : "found";
    const resolvedClass = item.status === "已找到" ? "resolved" : "";

    card.innerHTML = `
      <div class="card-header">
        <span class="type-tag ${typeClass}">${typeText}</span>
        <span class="status ${resolvedClass}">${item.status}</span>
      </div>

      <h3>${item.name}</h3>
      <p>分类：${item.category}</p>
      <p>地点：${item.location}</p>
      <p>日期：${item.date}</p>
      <p class="description">${item.description}</p>

      <button class="detail-button" type="button">查看详情</button>
    `;

    itemList.appendChild(card);
  });
}

renderItems(items);