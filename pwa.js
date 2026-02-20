(function () {
  // GitHub Pages (repo subpath): /UMADC/
  const SW_URL = "/UMADC/service-worker.js";
  const SW_SCOPE = "/UMADC/";

  async function registerSW() {
    if (!("serviceWorker" in navigator)) return null;
    try {
      return await navigator.serviceWorker.register(SW_URL, { scope: SW_SCOPE });
    } catch (e) {
      console.warn("SW register failed", e);
      return null;
    }
  }

  // Android install prompt
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  function showInstallButton() {
    if (document.getElementById("btn-install-app")) return;
    const btn = document.createElement("button");
    btn.id = "btn-install-app";
    btn.textContent = "Instalar App";
    btn.style.cssText = [
      "position:fixed",
      "right:16px",
      "bottom:16px",
      "z-index:9999",
      "padding:10px 14px",
      "border-radius:999px",
      "border:1px solid rgba(255,255,255,0.15)",
      "background:rgba(5,10,20,0.85)",
      "backdrop-filter:blur(12px)",
      "color:#F59E0B",
      "font-family:inherit",
      "font-weight:800",
      "letter-spacing:1px",
      "cursor:pointer"
    ].join(";");
    btn.onclick = async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      btn.remove();
    };
    document.body.appendChild(btn);
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await registerSW();
  });
})();
