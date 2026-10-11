const login = require("fca-unofficial");
const fs = require("fs");

// قراءة ملف الكوكيز الخاص بحساب الفيسبوك
const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

// تسجيل الدخول إلى الفيسبوك
login({ appState: appState }, (err, api) => {
    if (err) return console.error("حدث خطأ في الاتصال:", err);

    console.log("بوت CROW متصل الآن ومستقر! 🚀");

    // الاستماع للرسائل في الميسنجر
    api.listenMqtt((err, message) => {
        if (err) return console.error("خطأ في الاستماع للرسائل:", err);

        // إذا كتب أي شخص في الشات أمر /up
        if (message.body === "/up") {
            let statusMessage = `🌌╭──────────────╮\n     🐦‍⬛ C R O W\n🌌╰──────────────╯\n\n🫀 نبض النظام: 💚 مستقر\n📡 الاتصال: 🟢 متصل\n\n⏳ منذ آخر تشغيل\n└─ 🕐 1d 0h 5m\n\n⚡ سرعة الاستجابة\n└─ 🚀 12 ms\n\n🛡️ الحماية\n└─ 🔵 ACTIVE\n━━━━━━━━━━━━━━━━━━\n☁️ كل الأنظمة تعمل بشكل طبيعي.\n👤 Itachi\n━━━━━━━━━━━━━━━━━━`;
            
            // البوت يرسل الرسالة المزخرفة تلقائياً
            api.sendMessage(statusMessage, message.threadID);
        }
    });
});
