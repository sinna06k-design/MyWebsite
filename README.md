# دليل ربط موقعك الإلكتروني مع ديسكورد (Discord OAuth2 & Bot Invite System)

هذا الدليل يشرح بالتفصيل كيفية ربط موقع الويب الخاص بك مع تطبيق Discord، وتفعيل تسجيل الدخول الآمن للمستخدمين، وسحب قائمة الخوادم (Guilds) التي يمتلك فيها المستخدم صلاحية الإدارة (Administrator)، ودعوة البوت الخاص بك إليها مباشرة.

---

## 🛠️ القسم الأول: إعداد تطبيق Discord في بوابة المطورين (Developer Portal)

قبل كتابة أي كود، يجب عليك تسجيل تطبيقك في ديسكورد للحصول على معرفات الاتصال:

1. افتح [بوابة مطوري ديسكورد (Discord Developer Portal)](https://discord.com/developers/applications).
2. انقر على **New Application** في الأعلى واكتب اسم تطبيقك/البوت الخاص بك.
3. توجه إلى تبويب **OAuth2** ثم إلى **General**:
   * ستجد **Client ID** (معرف التطبيق) و **Client Secret** (المفتاح السري). احفظهما لاستخدامهما لاحقاً.
   * في جزء **Redirects**، انقر على **Add Redirect** وأضف رابط موقعك الذي سيتم إعادة توجيه المستخدم إليه بعد تسجيل الدخول (مثال: `http://localhost:3000/` أو `https://mywebsite.app/`).
4. توجه إلى تبويب **Bot** في القائمة الجانبية:
   * انقر على **Add Bot** لإنشاء البوت الفعلي.
   * قم بتفعيل الخيارات تحت **Privileged Gateway Intents** (مثل *Server Members Intent*) إذا كان البوت يحتاج لمراقبة الأعضاء.

---

## 🔐 القسم الثاني: تطبيق تسجيل الدخول بالديسكورد (OAuth2 Implicit Grant)

تسجيل الدخول باستخدام **Implicit Grant** هو الأسهل والمناسب لمواقع الويب التي تعمل بالكامل في الواجهة الأمامية (Client-Side / Static Apps) حيث لا تحتاج إلى خادم خلفي (Backend) لإجراء المصافحة.

### 1. رابط تسجيل الدخول المباشر
توجيه المستخدم إلى رابط المصادقة الخاص بديسكورد مع تحديد الصلاحيات المطلوبة (Scopes):
```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=identify+email+guilds+guilds.join
```

#### شرح الصلاحيات (Scopes):
* `identify`: للحصول على معلومات الحساب الأساسية للمستخدم (الاسم، الآفاتار، المعرّف).
* `email`: للحصول على البريد الإلكتروني للمستخدم الموثق.
* `guilds`: لقراءة قائمة السيرفرات التي يتواجد بها المستخدم حالياً.
* `guilds.join`: للسماح للبوت بإدخال المستخدم تلقائياً للسيرفرات (اختياري).

---

## 🖥️ القسم الثالث: قراءة السيرفرات وتصفيتها (Fetch & Filter Admin Guilds)

بعد نجاح المصادقة، سيعيد ديسكورد توجيه المستخدم إلى موقعك مع إرفاق التوكن في رابط الموقع كـ `hash fragment` (مثل: `https://mywebsite.app/#access_token=TOKEN_HERE&token_type=Bearer`).

إليك الكود المرجعي البرمجي (جافا سكريبت) لكيفية التقاط التوكن، والاتصال بـ Discord API، وتصفية السيرفرات لعرض فقط تلك التي يملك فيها المستخدم صلاحيات **مدير (Administrator)** أو **المالك (Owner)**:

```javascript
// 1. استخراج التوكن من الرابط (URL Hash)
function getDiscordToken() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const token = params.get("access_token");
  
  if (token) {
    // حفظ التوكن محلياً لتجنب تسجيل الدخول المتكرر
    localStorage.setItem("discord_token", token);
    // تنظيف شريط العنوان في المتصفح
    window.history.replaceState({}, document.title, window.location.pathname);
    return token;
  }
  
  return localStorage.getItem("discord_token");
}

// 2. جلب معلومات الحساب والقنوات من Discord API
async function fetchDiscordData(accessToken) {
  try {
    // أ: جلب بيانات المستخدم الشخصية
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const userData = await userResponse.json();
    console.log("المستخدم الحالي:", userData.username);

    // ب: جلب السيرفرات التي يتواجد فيها المستخدم
    const guildsResponse = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const guildsData = await guildsResponse.json();

    // ج: تصفية السيرفرات (عرض السيرفرات التي يملكها أو لديه صلاحية إدارية فيها فقط)
    // صلاحية الإدارة (Administrator) في ديسكورد تتمثل بالبت الثامن (0x8) في قناع الصلاحيات
    const adminGuilds = guildsData.filter(guild => {
      const isOwner = guild.owner === true;
      const isAdmin = (parseInt(guild.permissions) & 0x8) === 0x8;
      return isOwner || isAdmin;
    });

    console.log("السيرفرات الإدارية المتاحة:", adminGuilds);
    return { user: userData, guilds: adminGuilds };
  } catch (error) {
    console.error("فشل جلب البيانات من ديسكورد:", error);
    return null;
  }
}
```

### شرح كيفية حساب وتصفية الصلاحيات:
الصلاحيات في ديسكورد هي عبارة عن قيمة رقمية من نوع (Bitwise Bitmask). للتحقق من صلاحية **Administrator**:
* نقوم بتحويل النص `guild.permissions` إلى رقم صحيح.
* نطبق عملية **AND (&)** الثنائية مع الرقم `8` (أو `0x8` بالنظام الست عشري) والذي يمثل رتبة المدير.
* إذا كانت النتيجة تساوي `8` فهذا يعني أن المستخدم يملك الصلاحية.

---

## 🤖 القسم الرابع: دعوة البوت وتحديد الخادم المستهدف (Guild Target Bot Invite)

بدلاً من دعوة البوت بشكل عشوائي، يمكنك جعل موقعك يوجه المستخدم لدعوة البوت مباشرة إلى **السيرفر المختار** تلقائياً عبر إرفاق معرّف السيرفر (`guild_id`) في رابط الدعوة:

### 1. صياغة رابط الدعوة الذكي:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot&guild_id=TARGET_GUILD_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI
```

#### شرح المعاملات (Query Parameters):
* `client_id`: معرف تطبيق البوت الخاص بك.
* `permissions=8`: الصلاحيات التي سيطلبها البوت عند دخوله السيرفر (الرقم 8 يعني طلب صلاحية Administrator).
* `scope=bot`: لتحديد أن الدعوة مخصصة لإضافة البوت للسيرفر.
* `guild_id`: معرّف الخادم المحدد (مثال: `123456789012345678`). عند تمريره، سيقوم ديسكورد بتثبيت الاختيار وتحديد هذا السيرفر تلقائياً للمستخدم بقائمة الإضافة.
* `redirect_uri`: رابط العودة لموقعك بعد إتمام دعوة البوت بنجاح.

---

## 🎨 القسم الخامس: صياغة عناوين الصور للسيرفرات والأعضاء (Discord CDN Images)

عند سحب السيرفرات، يرجع ديسكورد معرّف صورة الآفاتار (Hash). لعرض الصورة بشكل رسومي جميل في موقعك، استخدم روابط الـ CDN الرسمية:

### 1. رابط أيقونة السيرفر (Server Icon):
```
https://cdn.discordapp.com/icons/GUILD_ID/GUILD_ICON_HASH.png
```
* في حال لم يكن للسيرفر أيقونة، يفضل إظهار الحروف الأولى من اسم السيرفر كبديل.

### 2. رابط الصورة الشخصية للمستخدم (User Avatar):
```
https://cdn.discordapp.com/avatars/USER_ID/USER_AVATAR_HASH.png
```

---

## 🔒 القسم السادس: الممارسات الأمنية الفضلى

1. **حماية الـ Client Secret**: لا تقم مطلقاً بكتابة الـ `Client Secret` في كود الواجهة الأمامية للموقع (frontend) أو رفعه على GitHub العام. إذا كنت تستخدم خادماً خلفياً، قم بحفظه في ملف البيئة `.env` واستخدمه هناك فقط.
2. **استخدام معطيات الـ State**: لمنع هجمات التزييف عبر المواقع (CSRF)، أرسل قيمة عشوائية باسم `state` في رابط تسجيل الدخول، وتحقق من تطابقها عند عودة المستخدم للموقع.
3. **انتهاء التوكن**: تذكر أن توكن الـ implicit ينتهي صلاحيته تلقائياً بعد فترة، احرص على معالجة الخطأ 401 عند طلب البيانات وإجبار المستخدم على تجديد تسجيل الدخول عند الحاجة.
