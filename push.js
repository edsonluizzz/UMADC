/*
  UMADC Push (FCM) – Fase 1 (Instalável + Avisos)
  - Já configurado com seu Firebase + VAPID
  - Este mesmo arquivo é usado:
    1) no navegador (botão "Ativar avisos")
    2) no Service Worker (para push em background), via importScripts("./push.js")
*/

// ===== Firebase (Web App) =====
const firebaseConfig = {
  apiKey: "AIzaSyBGKVUj7I_TJJVn4wmg0zwUwqMrNc8uEFg",
  authDomain: "umadc-e320f.firebaseapp.com",
  projectId: "umadc-e320f",
  storageBucket: "umadc-e320f.firebasestorage.app",
  messagingSenderId: "233749794147",
  appId: "1:233749794147:web:3b3cdeffa4ff1f32e9756"
};

// ===== VAPID (Web Push certificate - public key) =====
const vapidPublicKey = "BOR69OPE5q8UPjCYlheEPfAKJ66DojJao2gZjvxDkPIrFLAOFs1H8X3VuxUvouhYmzsQV2UdjKNqea4uKBg3tD0";

// Para o Service Worker conseguir inicializar o Firebase em background:
self.__FIREBASE_CONFIG__ = firebaseConfig;

// ===== Browser code (button + token) =====
(function () {
  // Evita rodar no contexto do Service Worker
  if (typeof window === "undefined" || typeof document === "undefined") return;

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
        if (!vapidPublicKey) {
          alert("Falta configurar a VAPID key.");
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
