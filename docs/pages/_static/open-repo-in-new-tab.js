document.addEventListener("DOMContentLoaded", function () {
  const repoLink = document.querySelector('a.md-source');
  if (repoLink) {
    repoLink.setAttribute("target", "_blank");
    repoLink.setAttribute("rel", "noopener noreferrer");
  }
});
