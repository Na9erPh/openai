# TikTok Live Analyzer Demo

This demo project shows a simple website that checks whether a TikTok user is currently live and lists previously recorded live streams. It is intended as an example only and uses mock data.

## Usage

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Enter a username and press **"تحليل"** to simulate checking the live status. If the account is live, a green download icon appears. When the live ends, a badge with the number of recorded streams is shown. Click the username to view previous streams with download links.

The data is mocked in `server.js` for demonstration purposes.

## تنزيل الكود وتشغيله

1. لاستنساخ المستودع على جهازك شغّل الأمر:
   ```
   git clone <رابط المستودع>
   ```
   بعد ذلك انتقل إلى مجلد المشروع:
   ```
   cd openai
   ```

2. ثبِّت الاعتمادات ثم ابدأ الخادم كما هو موضح في قسم **Usage**.

## تحديث الكود

لتحديث المشروع لاحقًا نفِّذ داخل مجلده:

```bash
git pull
```

بعد جلب التغييرات يمكنك تشغيل `npm install` مجددًا إذا أضيفت اعتمادات جديدة ثم تشغيل الخادم كالمعتاد.
