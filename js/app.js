const itemList = document.getElementById("item-list");
const detailModal = document.getElementById("detail-modal");
const closeDetailButton = document.getElementById("close-detail");

const detailType = document.getElementById("detail-type");
const detailStatus = document.getElementById("detail-status");
const detailTitle = document.getElementById("detail-title");
const detailCategory = document.getElementById("detail-category");
const detailLocation = document.getElementById("detail-location");
const detailDate = document.getElementById("detail-date");
const detailDescription = document.getElementById("detail-description");
const detailContact = document.getElementById("detail-contact");

let lastFocusedElement = null;

function isResolvedStatus(status) {
  return status === "已找到" || status === "已归还";
}

function renderItems(data) {
  itemList.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";

    const typeText = item.type === "lost" ? "寻物" : "招领";
    const typeClass = item.type === "lost" ? "lost" : "found";
    const resolvedClass = isResolvedStatus(item.status) ? "resolved" : "";

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

      <button
        class="detail-button"
        type="button"
        data-item-id="${item.id}"
      >
        查看详情
      </button>
    `;

    itemList.appendChild(card);
  });
}

function openDetail(itemId) {
  const item = items.find((currentItem) => currentItem.id === itemId);

  if (!item) {
    return;
  }

  const typeText = item.type === "lost" ? "寻物" : "招领";
  const typeClass = item.type === "lost" ? "lost" : "found";
  const resolvedClass = isResolvedStatus(item.status) ? "resolved" : "";

  detailType.textContent = typeText;
  detailType.className = `type-tag ${typeClass}`;

  detailStatus.textContent = item.status;
  detailStatus.className = `status ${resolvedClass}`;

  detailTitle.textContent = item.name;
  detailCategory.textContent = item.category;
  detailLocation.textContent = item.location;
  detailDate.textContent = item.date;
  detailDescription.textContent = item.description;
  detailContact.textContent = item.contact;

  lastFocusedElement = document.activeElement;
  detailModal.hidden = false;
  detailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeDetailButton.focus();
}

function closeDetailModal() {
  detailModal.hidden = true;
  detailModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

itemList.addEventListener("click", (event) => {
  const detailButton = event.target.closest(".detail-button");

  if (!detailButton) {
    return;
  }

  openDetail(Number(detailButton.dataset.itemId));
});

closeDetailButton.addEventListener("click", closeDetailModal);

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) {
    closeDetailModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !detailModal.hidden) {
    closeDetailModal();
  }
});

renderItems(items);