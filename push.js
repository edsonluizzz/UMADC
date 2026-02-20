/*
  UMADC Push (FCM) – Versão Compat (estável para PWA)
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

const vapidPublicKey = "BOR69OPE5q8UPjCYlheEPfAKJ66DojJao2gZjvxDkPIrFLAOFs1H8X3VuxUvouhYmzsQV2UdjKNqea4uKBg3tD0";

self.__FIREBASE_CONFIG__ = firebaseConfig;

// ===== Browser =====
(function () {

  if (typeof window === "undefined") return;

  function addPushButton() {

    if (!("Notification" in window)) return;
    if (document.getElementById("btn-push")) return;

    const btn = document.createElement("button");
    btn.id = "btn-push";
    btn.textContent = "Ativar avisos";
    btn.style.cssText = `
      position:fixed;
      left:16px;
      bottom:16px;
      z-index:9999;
      padding:10px 14px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,0.15);
      background:rgba(5,10,20,0.85);
      backdrop-filter:blur(12px);
      color:#FFFFFF;
      font-weight:800;
      cursor:pointer;
    `;

    btn.onclick = async () => {

      try {

        const perm = await Notification.requestPermission();
        if (perm !== "granted") {
          alert("Permissão negada.");
          return;
        }

        const reg = await navigator.serviceWorker.ready;

        // Carrega versão compat (estável)
        await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
        await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();

        const token = await messaging.getToken({
          vapidKey: vapidPublicKey,
          serviceWorkerRegistration: reg
        });

        if (!token) throw new Error("Token não gerado");

        console.log("UMADC push token:", token);
        localStorage.setItem("umadc_push_token", token);

        alert("Avisos ativados ✅");

      } catch (e) {
        console.error(e);
        alert("Erro ao ativar avisos.");
      }

    };

    document.body.appendChild(btn);
  }

  document.addEventListener("DOMContentLoaded", addPushButton);

})();
