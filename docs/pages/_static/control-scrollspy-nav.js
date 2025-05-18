document.addEventListener("DOMContentLoaded", function () {
  const navRoots = document.querySelectorAll(".md-nav--primary, .md-nav--secondary");
  if (navRoots.length === 0) {
    console.warn("❌ No navigation roots found.");
    return;
  }

  function filterScrollspyItems() {
    console.groupCollapsed("🔍 Scrollspy filter pass");

    navRoots.forEach((root) => {
      const links = root.querySelectorAll(".md-nav__link");
      console.log(`📁 Root: ${root.className} → ${links.length} links`);

      links.forEach((link) => {
        const text = link.textContent.trim();
        const href = link.getAttribute("href");
        if (!href?.startsWith("#")) return;

        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        const tagName = targetEl?.tagName;

        if (!tagName) {
          console.warn(`❓ "${text}" → #${targetId} not found`);
          return;
        }

        const shouldHide = /^H[4-6]$/.test(tagName);
        if (shouldHide) {
          link.style.display = "none";
          console.log(`❌ Hiding "${text}" → <${tagName}>`);
        } else {
          link.style.display = "";
          console.log(`✅ Keeping "${text}" → <${tagName}>`);
        }
      });
    });

    console.groupEnd();
  }

  filterScrollspyItems();

  const observer = new MutationObserver(filterScrollspyItems);
  navRoots.forEach((root) => {
    observer.observe(root, { childList: true, subtree: true });
  });
});
