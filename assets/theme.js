const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => { const isOpen = navLinks.classList.toggle("is-open"); navToggle.setAttribute("aria-expanded", String(isOpen)); });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { navLinks.classList.remove("is-open"); navToggle.setAttribute("aria-expanded", "false"); }));
}
(function loadInstagramFeed() {
  const feed = document.getElementById("ig-feed");
  if (!feed || !feed.dataset.feedId) return;
  const profileUrl = "https://www.instagram.com/pettylittlethingsoc";
  fetch("https://feeds.behold.so/" + encodeURIComponent(feed.dataset.feedId))
    .then((response) => { if (!response.ok) throw new Error("Feed unavailable"); return response.json(); })
    .then((data) => {
      const posts = (data.posts || []).slice(0, 6); if (!posts.length) return; feed.innerHTML = "";
      posts.forEach((post) => {
        const sizes = post.sizes || {}; const imageUrl = sizes.medium?.mediaUrl || sizes.large?.mediaUrl || sizes.small?.mediaUrl || post.mediaUrl; if (!imageUrl) return;
        const link = document.createElement("a"); link.href = post.permalink || profileUrl; link.target = "_blank"; link.rel = "noopener"; link.className = "gallery__item gallery__item--live";
        const image = document.createElement("img"); image.src = imageUrl; image.alt = post.prunedCaption?.slice(0, 100) || "Petty Little Things Instagram post"; image.loading = "lazy";
        const overlay = document.createElement("span"); overlay.className = "gallery__overlay"; overlay.textContent = post.mediaType === "VIDEO" ? "▶ Watch" : "View";
        link.append(image, overlay); feed.appendChild(link);
      });
    }).catch(() => {});
})();
document.querySelectorAll("[data-quantity-input]").forEach((input) => input.addEventListener("change", () => input.form?.submit()));
