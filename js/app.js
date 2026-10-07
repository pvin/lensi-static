(function () {
  const listEl = document.getElementById("item-list");
  const yearEl = document.getElementById("year");
  const items = window.LENSI_ITEMS || [];

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (!listEl) return;

  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "item-card";

    const link = document.createElement("a");
    link.className = "item-card__link";
    link.href = item.href || "#";
    if (item.href && item.href !== "#" && /^https?:\/\//i.test(item.href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.setAttribute(
      "aria-label",
      [item.title, item.subtitle].filter(Boolean).join(" — ")
    );

    const media = document.createElement("div");
    media.className = "item-card__media";

    const badge = document.createElement("span");
    badge.className = "item-card__index";
    badge.textContent = item.id || String(index + 1).padStart(2, "0");

    const img = document.createElement("img");
    img.className = "item-card__img";
    img.src = item.imageUrl || "";
    img.alt = item.title ? `${item.title} preview` : "Item preview";
    img.loading = index < 6 ? "eager" : "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => {
      img.removeAttribute("src");
      media.style.background =
        "linear-gradient(135deg, #1a1a22 0%, #2a2a35 50%, #1a1a22 100%)";
    });

    media.append(badge, img);

    const body = document.createElement("div");
    body.className = "item-card__body";

    const title = document.createElement("h2");
    title.className = "item-card__title";
    title.textContent = item.title || `Item ${index + 1}`;

    body.append(title);

    if (item.subtitle) {
      const subtitle = document.createElement("p");
      subtitle.className = "item-card__subtitle";
      subtitle.textContent = item.subtitle;
      body.append(subtitle);
    }

    link.append(media, body);
    li.append(link);
    fragment.append(li);
  });

  listEl.append(fragment);
})();
