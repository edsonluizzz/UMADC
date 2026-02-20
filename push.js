/*
  UMADC Push (FCM) – Fase 1 (Instalável + Avisos)
  - Você vai configurar o Firebase e colar aqui:
    1) firebaseConfig (Web App)
    2) vapidPublicKey (Cloud Messaging > Web Push certificates)

  Sem isso, o botão "Ativar avisos" aparece, mas vai avisar que falta configurar.
*/

// (Para o Service Worker) – quando você preencher firebaseConfig, copie também para self.__FIREBASE_CONFIG__
self.__FIREBASE_CONFIG__ = null;

// ===== PREENCHA AQUI =====
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };
// const vapidPublicKey = "";
// self.__FIREBASE_CONFIG__ = firebaseConfig; // <-- depois de preencher, descomente esta linha
// =========================

(function () {
  function addPushButton() {
    if (!("Notification" in window)) return;
    if (document.getElementById("btn-push")) return;

    const btn = document.createElement("button");
    btn.id = "btn-push";
    btn.textContent = "Ativar avisos";
    btn.style.cssText = [
      "position:fixed",
      "left:16px",
      "bottom:16px",
      "z-index:9999",
      "padding:10px 14px",
      "border-radius:999px",
      "border:1px solid rgba(255,255,255,0.15)",
      "background:rgba(5,10,20,0.85)",
      "backdrop-filter:blur(12px)",
      "color:#FFFFFF",
      "font-family:inherit",
      "font-weight:800",
      "letter-spacing:1px",
      "cursor:pointer"
    ].join(";");

    btn.onmouseenter = () => (btn.style.transform = "scale(1.03)");
    btn.onmouseleave = () => (btn.style.transform = "scale(1)");

    btn.onclick = async () => {
      try {
        if (typeof firebaseConfig === "undefined" || typeof vapidPublicKey === "undefined" || !vapidPublicKey) {
          alert("Falta configurar o Firebase (FCM) no arquivo push.js.");
          return;
        }

        const perm = await Notification.requestPermission();
        if (perm !== "granted") {
          alert("Permissão negada. Você pode ativar nas configurações do navegador.");
          return;
        }

        const reg = await navigator.serviceWorker.getRegistration("./");

        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const { getMessaging, getToken } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        const token = await getToken(messaging, {
          vapidKey: vapidPublicKey,
          serviceWorkerRegistration: reg || undefined
        });

        if (!token) throw new Error("No token returned");

        localStorage.setItem("umadc_push_token", token);
        console.log("UMADC push token:", token);

        alert("Avisos ativados ✅");
      } catch (e) {
        console.error(e);
        alert("Não foi possível ativar avisos. Confira Firebase + HTTPS + instalação do atalho.");
      }
    };

    document.body.appendChild(btn);
  }

  document.addEventListener("DOMContentLoaded", addPushButton);
})();
