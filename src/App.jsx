import { useState, useEffect, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
// API KEY - پہلے سے لگی ہوئی ہے
// ══════════════════════════════════════════════════════════════
const ANTHROPIC_API_KEY = "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";

// ══════════════════════════════════════════════════════════════
// TRANSLATIONS — 7 Languages
// ══════════════════════════════════════════════════════════════
const T = {
  en: {
    dir:"ltr",flag:"🇬🇧",name:"English",
    nav_home:"Home",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    hero_tag:"The Freelancer's Shield",
    hero_h1a:"Protect Your Work.",hero_h1b:"Prove Your Worth.",
    hero_p:"Two smart tools built for freelancers — stop scope creep before it costs you, and show clients your real value with confidence.",
    hero_cta1:"Try ValueProof",hero_cta2:"Try BoundaryGuard",
    s1n:"73%",s1l:"of freelancers face scope creep on every project",
    s2n:"$12K",s2l:"lost annually per freelancer to unpaid extra work",
    s3n:"68%",s3l:"of clients underpay because they don't see full value",
    fvt:"ValueProof",fvi:"💎",
    fvd:"Turn your completed work into a compelling value story. Show clients the exact business impact you created — in their language, in numbers.",
    fvb:"Open ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",
    fbd:"Paste your contract scope and the client's new request. Get an instant verdict on scope creep — plus a professional reply ready to send.",
    fbb:"Open BoundaryGuard →",
    hiw:"Built for Real Freelancer Problems",
    h1t:"Scope Creep Kills Profits",h1b:"Every freelancer knows the feeling: you agree on a project, then the client keeps adding 'small' requests. BoundaryGuard catches this the moment it happens and tells you exactly what to say.",
    h2t:"Your Value Gets Underestimated",h2b:"Clients see hours worked, not outcomes delivered. ValueProof flips this — it turns your technical work into business outcomes that clients actually care about, justifying higher rates naturally.",
    h3t:"One Platform, Total Protection",h3b:"Use both tools together: guard your time with BoundaryGuard, then prove your worth with ValueProof. Your freelance business becomes professionally bulletproof.",
    vp_title:"ValueProof",vp_sub:"Turn your work into a value story clients can't ignore.",
    vp_ht:"How to Use ValueProof",
    vs1t:"Describe Your Work",vs1b:"Write what you built or delivered. Be specific — mention the features, quality level, and the effort you put in. The more detail, the stronger your value statement.",
    vs2t:"List Key Features",vs2b:"Add your standout capabilities: loading speed, design quality, integrations, automation, mobile responsiveness — anything that makes your work excellent.",
    vs3t:"State the Business Impact",vs3b:"Think from the client's perspective: how will this help their business? More sales, saved time, reduced costs, better customer experience, stronger brand.",
    vb_t:"Why ValueProof Works for You",
    vb1t:"Justify Higher Rates",vb1b:"When clients see business impact in real numbers, hourly rates become irrelevant. You shift the conversation from 'how long did it take?' to 'what value did it create?'",
    vb2t:"Win More Clients",vb2b:"Use your generated value statements in proposals and portfolios. Convert more leads by speaking the language of business outcomes instead of technical specifications.",
    vb3t:"Handle Rate Objections",vb3b:"Next time a client says 'you're too expensive', share your ValueProof statement. The conversation shifts immediately from cost to ROI.",
    vb4t:"Build Lasting Credibility",vb4b:"A professional value statement shows you think like a business partner, not just a vendor. Clients trust partners more — and pay them more.",
    vl1:"What work did you complete?",vp1:"e.g. Designed and built a complete e-commerce website with payment gateway, order tracking system, and fully mobile-responsive layout for a clothing brand in Lahore...",
    vl2:"Key features & quality highlights?",vp2:"e.g. Sub-2-second loading speed, SEO-optimized structure, WhatsApp chat integration, multi-language support, admin dashboard with sales analytics...",
    vl3:"Expected impact on client's business?",vp3:"e.g. Enables 24/7 online sales without a physical store, expected 30-40% increase in orders, reduces customer support calls by 50%, professional brand image...",
    vbtn:"Generate Value Statement",vload:"Crafting your value statement...",
    vrt:"Your Value Statement",vcopy:"Copy Statement",
    bg_title:"BoundaryGuard",bg_sub:"Never do unpaid work again. Know your limits the moment they're crossed.",
    bg_ht:"How to Use BoundaryGuard",
    bs1t:"Paste Your Contract Scope",bs1b:"Copy the agreed scope from your proposal, contract, or initial project message. Even bullet points or a WhatsApp conversation works — just paste it in.",
    bs2t:"Add the Client's New Request",bs2b:"Paste exactly what the client just asked you to do. Don't rephrase or edit it — the tool needs the original wording to analyze accurately.",
    bs3t:"Get Your Instant Verdict",bs3b:"See immediately if it's in scope, out of scope, or borderline — with a polished, professional response you can copy and send to the client directly.",
    bb_t:"Why BoundaryGuard Changes Everything",
    bb1t:"Stop Losing Money",bb1b:"The average freelancer loses $12,000 per year to scope creep. BoundaryGuard catches every overreach before you commit to doing the extra work for free.",
    bb2t:"Professional Responses, Every Time",bb2b:"No more awkward conversations or not knowing what to say. Get a polished, client-friendly reply instantly — maintain professionalism without the anxiety.",
    bb3t:"Protect Client Relationships",bb3b:"The suggested replies are always respectful and professional. You protect your time and rates without damaging the relationship or sounding difficult.",
    bb4t:"Build an Evidence Record",bb4b:"Screenshot each verdict as documentation. If a client later disputes scope or claims something was included, you have AI-analyzed evidence to refer back to.",
    bl1:"Original Contract / Scope of Work",bp1:"Paste your agreed project scope here. Can be from a proposal, contract, email, or WhatsApp. Example:\n• Design a 5-page website (Home, About, Services, Portfolio, Contact)\n• Include 2 revision rounds\n• Deliver in 14 working days\n• Mobile-responsive design included\n• No e-commerce or booking features",
    bl2:"Client's New Request or Message",bp2:"Paste exactly what the client just said or asked. Example:\n'By the way, can you also add a blog section with comments, an online booking system for appointments, and translate the whole site into Arabic? Oh and the logo design needs a complete redesign too.'",
    bbtn:"Check Scope Now",bload:"Analyzing contract & request...",
    brt:"Scope Analysis",bvl:"Verdict",bal:"Analysis",brl:"Suggested Client Reply",bac:"Your Next Step",
    ins:"IN SCOPE",outs:"OUT OF SCOPE",bord:"BORDERLINE",
    copy_t:"Copy",copied_t:"Copied!",err_t:"Something went wrong. Please try again.",
    req_t:"Please fill in all fields before generating.",
    th_l:"Theme",la_l:"Language",back:"← Back to Home",
    footer:"FreelanceShield — Built for Freelancers Who Value Their Work",
  },
  ur: {
    dir:"rtl",flag:"🇵🇰",name:"اردو",
    nav_home:"ہوم",nav_vp:"ویلیو پروف",nav_bg:"باؤنڈری گارڈ",
    hero_tag:"فری لانسر کا محافظ",
    hero_h1a:"اپنا کام بچائیں۔",hero_h1b:"اپنی قدر ثابت کریں۔",
    hero_p:"فری لانسرز کے لیے بنائے گئے دو ذہین ٹولز — اضافی کام سے پہلے روکیں، اور کلائنٹس کو اپنی اصل قدر اعتماد سے بتائیں۔",
    hero_cta1:"ویلیو پروف آزمائیں",hero_cta2:"باؤنڈری گارڈ آزمائیں",
    s1n:"73%",s1l:"فری لانسرز ہر پروجیکٹ میں اسکوپ کریپ کا سامنا کرتے ہیں",
    s2n:"$12K",s2l:"سالانہ نقصان فی فری لانسر بلا معاوضہ کام سے",
    s3n:"68%",s3l:"کلائنٹس کم قیمت دیتے ہیں کیونکہ وہ پوری قدر نہیں دیکھتے",
    fvt:"ویلیو پروف",fvi:"💎",
    fvd:"اپنے مکمل کام کو ایک مؤثر ویلیو کہانی میں بدلیں۔ کلائنٹس کو دکھائیں کہ آپ نے ان کے کاروبار پر کتنا اثر ڈالا — ان کی زبان میں، اعداد میں۔",
    fvb:"ویلیو پروف کھولیں →",
    fbt:"باؤنڈری گارڈ",fbi:"🛡️",
    fbd:"اپنا معاہدہ اور کلائنٹ کی نئی درخواست پیسٹ کریں۔ فوراً پتہ چلے گا کہ یہ اسکوپ کریپ ہے یا نہیں — اور بھیجنے کے لیے ایک تیار جواب بھی ملے گا۔",
    fbb:"باؤنڈری گارڈ کھولیں →",
    hiw:"اصل فری لانسر مسائل کے لیے بنایا گیا",
    h1t:"اسکوپ کریپ منافع کو ختم کرتا ہے",h1b:"ہر فری لانسر یہ احساس جانتا ہے: پروجیکٹ پر اتفاق ہوتا ہے، پھر کلائنٹ چھوٹی چھوٹی درخواستیں بڑھاتا رہتا ہے۔ باؤنڈری گارڈ یہ اسی لمحے پکڑتا ہے اور آپ کو بتاتا ہے کیا کہنا ہے۔",
    h2t:"آپ کی قدر کو کم آنکا جاتا ہے",h2b:"کلائنٹ گھنٹے دیکھتے ہیں، نتائج نہیں۔ ویلیو پروف یہ بدل دیتا ہے — آپ کا تکنیکی کام کاروباری نتائج میں تبدیل ہو جاتا ہے جو کلائنٹ کو واقعی اہمیت دیتے ہیں۔",
    h3t:"ایک پلیٹ فارم، مکمل تحفظ",h3b:"دونوں ٹولز ایک ساتھ استعمال کریں: باؤنڈری گارڈ سے وقت بچائیں، پھر ویلیو پروف سے اپنی قدر ثابت کریں۔",
    vp_title:"ویلیو پروف",vp_sub:"اپنے کام کو ایک ایسی ویلیو کہانی میں بدلیں جسے کلائنٹ نظرانداز نہ کر سکے۔",
    vp_ht:"ویلیو پروف کیسے استعمال کریں",
    vs1t:"اپنا کام بیان کریں",vs1b:"آپ نے کیا بنایا یا فراہم کیا — خصوصیات، معیار اور محنت کے بارے میں تفصیل سے لکھیں۔ جتنی زیادہ تفصیل، اتنی مضبوط ویلیو اسٹیٹمنٹ۔",
    vs2t:"اہم خصوصیات لکھیں",vs2b:"نمایاں صلاحیتیں شامل کریں: لوڈنگ کی رفتار، ڈیزائن کا معیار، انٹیگریشنز، آٹومیشنز، موبائل ریسپانسیو — جو بھی آپ کے کام کو بہترین بناتا ہے۔",
    vs3t:"کاروباری اثر بتائیں",vs3b:"کلائنٹ کے نقطہ نظر سے سوچیں: یہ ان کے کاروبار کو کیسے فائدہ دے گا؟ زیادہ فروخت، بچا ہوا وقت، کم اخراجات، بہتر کسٹمر تجربہ۔",
    vb_t:"ویلیو پروف آپ کے لیے کیوں کام کرتا ہے",
    vb1t:"زیادہ ریٹ کا جواز",vb1b:"جب کلائنٹ کاروباری اثر اصل اعداد میں دیکھتے ہیں تو فی گھنٹہ ریٹ غیر اہم ہو جاتی ہے۔ گفتگو 'کتنا وقت لگا؟' سے 'کتنی قدر پیدا ہوئی؟' پر آ جاتی ہے۔",
    vb2t:"زیادہ کلائنٹ جیتیں",vb2b:"اپنی ویلیو اسٹیٹمنٹس تجاویز اور پورٹ فولیو میں استعمال کریں۔ تکنیکی تفصیلات کی بجائے کاروباری زبان میں بات کریں اور زیادہ لیڈز کنورٹ کریں۔",
    vb3t:"قیمت پر اعتراض ہینڈل کریں",vb3b:"جب کلائنٹ کہے 'آپ بہت مہنگے ہیں'، اپنی ویلیو پروف اسٹیٹمنٹ شیئر کریں۔ گفتگو فوری طور پر لاگت سے ROI پر آ جاتی ہے۔",
    vb4t:"دیرپا اعتبار بنائیں",vb4b:"ایک پیشہ ورانہ ویلیو اسٹیٹمنٹ دکھاتا ہے کہ آپ بزنس پارٹنر کی طرح سوچتے ہیں، نہ صرف ایک وینڈر۔ کلائنٹس پارٹنرز پر زیادہ اعتماد کرتے ہیں۔",
    vl1:"آپ نے کون سا کام مکمل کیا؟",vp1:"مثلاً: لاہور میں کپڑوں کے برانڈ کے لیے پیمنٹ گیٹ وے، آرڈر ٹریکنگ سسٹم اور مکمل موبائل ریسپانسیو لے آؤٹ کے ساتھ مکمل ای کامرس ویب سائٹ ڈیزائن اور بنائی...",
    vl2:"اہم خصوصیات اور معیار کی جھلکیاں؟",vp2:"مثلاً: 2 سیکنڈ سے کم لوڈنگ، SEO آپٹمائزڈ ڈھانچہ، واٹس ایپ چیٹ انٹیگریشن، کثیر لسانی سپورٹ، سیلز اینالیٹکس کے ساتھ ایڈمن ڈیش بورڈ...",
    vl3:"کلائنٹ کے کاروبار پر متوقع اثر؟",vp3:"مثلاً: جسمانی دکان کے بغیر 24/7 آن لائن فروخت، آرڈرز میں 30-40% اضافے کی توقع، کسٹمر سپورٹ کالز 50% کم، پیشہ ورانہ برانڈ امیج...",
    vbtn:"ویلیو اسٹیٹمنٹ بنائیں",vload:"آپ کی ویلیو اسٹیٹمنٹ تیار ہو رہی ہے...",
    vrt:"آپ کی ویلیو اسٹیٹمنٹ",vcopy:"اسٹیٹمنٹ کاپی کریں",
    bg_title:"باؤنڈری گارڈ",bg_sub:"کبھی بلا معاوضہ کام نہ کریں۔ حدود پار ہوتے ہی فوری جانیں۔",
    bg_ht:"باؤنڈری گارڈ کیسے استعمال کریں",
    bs1t:"اپنا معاہدہ پیسٹ کریں",bs1b:"اپنی تجویز، معاہدے یا ابتدائی پروجیکٹ پیغام سے متفقہ دائرہ کار کاپی کریں۔ بلٹ پوائنٹس یا واٹس ایپ گفتگو بھی ٹھیک ہے — بس پیسٹ کر دیں۔",
    bs2t:"نئی درخواست شامل کریں",bs2b:"کلائنٹ نے ابھی جو مانگا بالکل ویسے پیسٹ کریں۔ اپنی طرف سے ترمیم نہ کریں — درست تجزیے کے لیے ٹول کو اصل الفاظ چاہئیں۔",
    bs3t:"فوری فیصلہ پائیں",bs3b:"فوری دیکھیں کہ یہ دائرے میں ہے، باہر ہے، یا سرحدی ہے — ایک شائستہ، پیشہ ورانہ جواب کے ساتھ جو آپ کاپی کر کے کلائنٹ کو بھیج سکتے ہیں۔",
    bb_t:"باؤنڈری گارڈ سب کچھ کیوں بدل دیتا ہے",
    bb1t:"پیسے ضائع ہونا روکیں",bb1b:"اوسط فری لانسر سالانہ $12,000 اسکوپ کریپ سے کھو دیتا ہے۔ باؤنڈری گارڈ ہر زیادتی اس سے پہلے پکڑتا ہے جب آپ مفت کام کرنے کا وعدہ کریں۔",
    bb2t:"ہر بار پیشہ ورانہ جواب",bb2b:"اب کوئی عجیب گفتگو یا سمجھ نہ آنا کہ کیا کہوں۔ فوری ایک شائستہ، کلائنٹ دوست جواب تیار — پریشانی کے بغیر پیشہ ورانہ رہیں۔",
    bb3t:"کلائنٹ تعلق کی حفاظت",bb3b:"مجوزہ جوابات ہمیشہ احترام آمیز اور پیشہ ورانہ ہوتے ہیں۔ آپ اپنا وقت اور ریٹ بچاتے ہیں بغیر تعلق کو نقصان پہنچائے یا مشکل لگے۔",
    bb4t:"ثبوت کا ریکارڈ بنائیں",bb4b:"ہر فیصلے کا اسکرین شاٹ لیں بطور دستاویز۔ اگر کلائنٹ بعد میں دائرے پر اعتراض کرے تو آپ کے پاس تجزیہ شدہ ثبوت موجود ہے۔",
    bl1:"اصل معاہدہ / کام کا دائرہ کار",bp1:"متفقہ پروجیکٹ دائرہ یہاں پیسٹ کریں۔ مثال:\n• 5 صفحاتی ویب سائٹ ڈیزائن کریں (ہوم، ابؤٹ، سروسز، پورٹ فولیو، کانٹیکٹ)\n• 2 ترمیمی راؤنڈز شامل\n• 14 کام کے دنوں میں ڈیلیوری\n• موبائل ریسپانسیو ڈیزائن شامل\n• ای کامرس یا بکنگ فیچرز نہیں",
    bl2:"کلائنٹ کی نئی درخواست یا پیغام",bp2:"کلائنٹ نے ابھی بالکل جو کہا پیسٹ کریں۔ مثال:\n'ویسے، کیا آپ بلاگ سیکشن کمنٹس کے ساتھ، اپوائنٹمنٹ کے لیے آن لائن بکنگ سسٹم، اور پوری سائٹ عربی میں ترجمہ بھی شامل کر سکتے ہیں؟ اور لوگو کا مکمل نئے سرے سے ڈیزائن بھی چاہیے۔'",
    bbtn:"ابھی چیک کریں",bload:"معاہدے اور درخواست کا تجزیہ ہو رہا ہے...",
    brt:"دائرہ کار کا تجزیہ",bvl:"فیصلہ",bal:"تجزیہ",brl:"مجوزہ کلائنٹ جواب",bac:"آپ کا اگلا قدم",
    ins:"دائرہ کار میں",outs:"دائرہ کار سے باہر",bord:"سرحدی",
    copy_t:"کاپی",copied_t:"کاپی ہو گئی!",err_t:"کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔",
    req_t:"جنریٹ کرنے سے پہلے تمام فیلڈز بھریں۔",
    th_l:"تھیم",la_l:"زبان",back:"← ہوم پر واپس",
    footer:"فری لانس شیلڈ — ان فری لانسرز کے لیے جو اپنے کام کی قدر جانتے ہیں",
  },
  ar: {
    dir:"rtl",flag:"🇸🇦",name:"العربية",
    nav_home:"الرئيسية",nav_vp:"إثبات القيمة",nav_bg:"حارس الحدود",
    hero_tag:"درع المستقل",hero_h1a:"احمِ عملك.",hero_h1b:"أثبت قيمتك.",
    hero_p:"أداتان ذكيتان للمستقلين — أوقف توسع النطاق قبل أن يكلفك، وأظهر للعملاء قيمتك الحقيقية بثقة.",
    hero_cta1:"جرّب إثبات القيمة",hero_cta2:"جرّب حارس الحدود",
    s1n:"73%",s1l:"من المستقلين يواجهون توسع النطاق في كل مشروع",s2n:"12K$",s2l:"خسارة سنوية لكل مستقل بسبب العمل غير المدفوع",s3n:"68%",s3l:"من العملاء يدفعون أقل لأنهم لا يرون القيمة كاملة",
    fvt:"إثبات القيمة",fvi:"💎",fvd:"حوّل عملك المنجز إلى قصة قيمة مقنعة. أظهر للعملاء التأثير التجاري الدقيق الذي أحدثته.",fvb:"فتح إثبات القيمة →",
    fbt:"حارس الحدود",fbi:"🛡️",fbd:"الصق عقدك وطلب العميل الجديد. احصل على حكم فوري بشأن توسع النطاق مع رد جاهز للإرسال.",fbb:"فتح حارس الحدود →",
    hiw:"مبني لمشاكل المستقلين الحقيقية",
    h1t:"توسع النطاق يقتل الأرباح",h1b:"كل مستقل يعرف الشعور: تتفق على مشروع ثم العميل يضيف طلبات صغيرة باستمرار. حارس الحدود يكتشف هذا فوراً ويخبرك بالضبط ماذا تقول.",
    h2t:"قيمتك تُقلَّل",h2b:"العملاء يرون الساعات لا النتائج. إثبات القيمة يقلب هذا — يحول عملك التقني إلى نتائج تجارية تهم العميل حقاً.",
    h3t:"منصة واحدة، حماية كاملة",h3b:"استخدم الأداتين معاً: احمِ وقتك بحارس الحدود، ثم أثبت قيمتك بإثبات القيمة.",
    vp_title:"إثبات القيمة",vp_sub:"حوّل عملك إلى قصة قيمة لا يستطيع العميل تجاهلها.",
    vp_ht:"كيفية استخدام إثبات القيمة",
    vs1t:"صف عملك",vs1b:"اكتب ما بنيته أو سلّمته. كن محدداً — اذكر الميزات ومستوى الجودة والجهد المبذول. كلما زادت التفاصيل، كان بيان القيمة أقوى.",
    vs2t:"اذكر الميزات الرئيسية",vs2b:"أضف القدرات البارزة: سرعة التحميل، جودة التصميم، التكاملات، الأتمتة، التوافق مع الجوال.",
    vs3t:"حدد التأثير التجاري",vs3b:"فكر من منظور العميل: كيف سيساعد هذا أعماله؟ مزيد من المبيعات، توفير الوقت، تقليل التكاليف، تجربة عملاء أفضل.",
    vb_t:"لماذا يعمل إثبات القيمة لصالحك",
    vb1t:"تبرير معدلات أعلى",vb1b:"عندما يرى العملاء التأثير التجاري بأرقام حقيقية، تصبح المعدلات بالساعة غير ذات صلة.",
    vb2t:"كسب المزيد من العملاء",vb2b:"استخدم بيانات القيمة في العروض وحوافظ الأعمال لتحويل المزيد من العملاء المحتملين.",
    vb3t:"معالجة اعتراضات السعر",vb3b:"في المرة القادمة يقول فيها العميل 'أنت غالٍ جداً'، شارك بيان إثبات القيمة الخاص بك.",
    vb4t:"بناء مصداقية راسخة",vb4b:"بيان قيمة احترافي يُظهر أنك تفكر كشريك أعمال لا كمجرد مورد.",
    vl1:"ما العمل الذي أتممته؟",vp1:"مثال: صممت وبنيت موقع تجارة إلكترونية متكامل مع بوابة دفع وتتبع طلبات وتصميم متجاوب للجوال...",
    vl2:"الميزات الرئيسية ونقاط الجودة؟",vp2:"مثال: تحميل أقل من ثانيتين، محسّن لمحركات البحث، تكامل واتساب، لوحة إدارة...",
    vl3:"التأثير المتوقع على أعمال العميل؟",vp3:"مثال: مبيعات 24/7، زيادة الطلبات 30-40%، تقليل دعم العملاء 50%...",
    vbtn:"إنشاء بيان القيمة",vload:"جارٍ إنشاء بيان قيمتك...",vrt:"بيان قيمتك",vcopy:"نسخ البيان",
    bg_title:"حارس الحدود",bg_sub:"لا تعمل بدون مقابل أبداً. اعرف حدودك فور تجاوزها.",
    bg_ht:"كيفية استخدام حارس الحدود",
    bs1t:"الصق عقدك",bs1b:"انسخ النطاق المتفق عليه من عرضك أو عقدك أو رسالتك الأولية.",
    bs2t:"أضف الطلب الجديد",bs2b:"الصق بالضبط ما طلبه العميل للتو. لا تعدّله — الأداة تحتاج الصياغة الأصلية للتحليل الدقيق.",
    bs3t:"احصل على حكمك الفوري",bs3b:"اعرف فوراً إذا كان ضمن النطاق أو خارجه أو على الحدود — مع رد احترافي جاهز للإرسال.",
    bb_t:"لماذا يغير حارس الحدود كل شيء",
    bb1t:"أوقف خسارة المال",bb1b:"يخسر المستقل العادي 12,000 دولار سنوياً بسبب توسع النطاق. حارس الحدود يلتقط كل تجاوز.",
    bb2t:"ردود احترافية في كل مرة",bb2b:"لا مزيد من المحادثات المحرجة. احصل فوراً على رد مؤدب وصديق للعميل.",
    bb3t:"احمِ علاقة العميل",bb3b:"الردود المقترحة دائماً محترمة ومهنية. تحمي وقتك ومعدلاتك دون الإضرار بالعلاقة.",
    bb4t:"ابنِ سجل دليل",bb4b:"التقط صور الشاشة لكل حكم كتوثيق. إذا اعترض العميل لاحقاً، لديك تحليل موثق كدليل.",
    bl1:"العقد الأصلي / نطاق العمل",bp1:"الصق النطاق المتفق عليه هنا...",
    bl2:"طلب العميل الجديد أو رسالته",bp2:"الصق بالضبط ما قاله العميل...",
    bbtn:"تحقق الآن",bload:"جارٍ تحليل العقد والطلب...",
    brt:"تحليل النطاق",bvl:"الحكم",bal:"التحليل",brl:"الرد المقترح للعميل",bac:"خطوتك التالية",
    ins:"ضمن النطاق",outs:"خارج النطاق",bord:"على الحدود",
    copy_t:"نسخ",copied_t:"تم النسخ!",err_t:"حدث خطأ. حاول مرة أخرى.",req_t:"يرجى ملء جميع الحقول قبل الإنشاء.",
    th_l:"المظهر",la_l:"اللغة",back:"← العودة للرئيسية",
    footer:"فريلانس شيلد — للمستقلين الذين يقدّرون عملهم",
  },
  es: {
    dir:"ltr",flag:"🇪🇸",name:"Español",
    nav_home:"Inicio",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    hero_tag:"El Escudo del Freelancer",hero_h1a:"Protege Tu Trabajo.",hero_h1b:"Demuestra Tu Valor.",
    hero_p:"Dos herramientas inteligentes para freelancers — detén el scope creep antes de que te cueste, y comunica tu valor real a los clientes con confianza.",
    hero_cta1:"Probar ValueProof",hero_cta2:"Probar BoundaryGuard",
    s1n:"73%",s1l:"de freelancers enfrentan scope creep en cada proyecto",s2n:"$12K",s2l:"perdidos anualmente por trabajo extra no pagado",s3n:"68%",s3l:"de clientes pagan menos porque no ven el valor completo",
    fvt:"ValueProof",fvi:"💎",fvd:"Transforma tu trabajo completado en una historia de valor convincente. Muestra a los clientes el impacto comercial exacto que creaste.",fvb:"Abrir ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Pega tu contrato y la nueva solicitud. Obtén un veredicto instantáneo sobre scope creep con una respuesta lista para enviar.",fbb:"Abrir BoundaryGuard →",
    hiw:"Construido para Problemas Reales de Freelancers",
    h1t:"El Scope Creep Destruye Ganancias",h1b:"Todo freelancer conoce el sentimiento: acordáis un proyecto, luego el cliente sigue añadiendo solicitudes 'pequeñas'. BoundaryGuard lo detecta al instante.",
    h2t:"Tu Valor Es Subestimado",h2b:"Los clientes ven horas, no resultados. ValueProof cambia esto — convierte tu trabajo técnico en resultados comerciales que realmente importan.",
    h3t:"Una Plataforma, Protección Total",h3b:"Usa ambas herramientas juntas: protege tu tiempo con BoundaryGuard, luego demuestra tu valor con ValueProof.",
    vp_title:"ValueProof",vp_sub:"Convierte tu trabajo en una historia de valor que los clientes no pueden ignorar.",
    vp_ht:"Cómo Usar ValueProof",vs1t:"Describe Tu Trabajo",vs1b:"Escribe qué construiste o entregaste — sé específico sobre características, calidad y esfuerzo.",vs2t:"Lista Características Clave",vs2b:"Añade capacidades destacadas: velocidad, calidad de diseño, integraciones, automatizaciones.",vs3t:"Declara el Impacto",vs3b:"Piensa desde la perspectiva del cliente: más ventas, tiempo ahorrado, costos reducidos.",
    vb_t:"Por Qué ValueProof Funciona Para Ti",vb1t:"Justifica Tarifas Más Altas",vb1b:"Cuando los clientes ven el impacto en números, las tarifas por hora se vuelven irrelevantes.",vb2t:"Gana Más Clientes",vb2b:"Usa tus declaraciones en propuestas y portfolios para convertir más leads.",vb3t:"Maneja Objeciones de Precio",vb3b:"Comparte tu ValueProof cuando el cliente diga 'eres demasiado caro'.",vb4t:"Construye Credibilidad",vb4b:"Una declaración profesional muestra que piensas como socio comercial.",
    vl1:"¿Qué trabajo completaste?",vp1:"Ej: Diseñé y construí un sitio e-commerce completo con pasarela de pago...",vl2:"¿Características clave y puntos de calidad?",vp2:"Ej: Carga rápida, SEO optimizado, integración WhatsApp, panel admin...",vl3:"¿Impacto esperado en el negocio del cliente?",vp3:"Ej: Ventas 24/7, aumento de pedidos 30-40%, soporte al cliente -50%...",
    vbtn:"Generar Declaración de Valor",vload:"Construyendo tu declaración...",vrt:"Tu Declaración de Valor",vcopy:"Copiar Declaración",
    bg_title:"BoundaryGuard",bg_sub:"Nunca hagas trabajo no pagado. Conoce tus límites al instante.",
    bg_ht:"Cómo Usar BoundaryGuard",bs1t:"Pega Tu Contrato",bs1b:"Copia el alcance acordado de tu propuesta o contrato.",bs2t:"Añade la Nueva Solicitud",bs2b:"Pega exactamente lo que el cliente acaba de pedir. No lo edites.",bs3t:"Obtén Tu Veredicto",bs3b:"Ve si está dentro/fuera del alcance o es borderline — con respuesta profesional lista.",
    bb_t:"Por Qué BoundaryGuard Cambia Todo",bb1t:"Detén la Pérdida de Dinero",bb1b:"El freelancer promedio pierde $12,000/año por scope creep.",bb2t:"Respuestas Profesionales",bb2b:"Una respuesta lista y pulida al instante, sin conversaciones incómodas.",bb3t:"Protege la Relación",bb3b:"Respuestas respetuosas que protegen el tiempo sin dañar la relación.",bb4t:"Construye un Registro",bb4b:"Capturas como evidencia si el cliente disputa el alcance después.",
    bl1:"Contrato Original / Alcance del Trabajo",bp1:"Pega el alcance acordado aquí...",bl2:"Nueva Solicitud del Cliente",bp2:"Pega exactamente lo que el cliente acaba de pedir...",
    bbtn:"Verificar Ahora",bload:"Analizando contrato y solicitud...",brt:"Análisis de Alcance",bvl:"Veredicto",bal:"Análisis",brl:"Respuesta Sugerida al Cliente",bac:"Tu Próximo Paso",
    ins:"DENTRO DEL ALCANCE",outs:"FUERA DEL ALCANCE",bord:"BORDERLINE",
    copy_t:"Copiar",copied_t:"¡Copiado!",err_t:"Algo salió mal. Por favor, inténtalo de nuevo.",req_t:"Por favor completa todos los campos antes de generar.",
    th_l:"Tema",la_l:"Idioma",back:"← Volver al Inicio",footer:"FreelanceShield — Para Freelancers que Valoran su Trabajo",
  },
  fr: {
    dir:"ltr",flag:"🇫🇷",name:"Français",
    nav_home:"Accueil",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    hero_tag:"Le Bouclier du Freelance",hero_h1a:"Protégez Votre Travail.",hero_h1b:"Prouvez Votre Valeur.",
    hero_p:"Deux outils intelligents pour les freelances — stoppez le scope creep avant qu'il vous coûte, et communiquez votre vraie valeur aux clients avec confiance.",
    hero_cta1:"Essayer ValueProof",hero_cta2:"Essayer BoundaryGuard",
    s1n:"73%",s1l:"des freelances font face au scope creep sur chaque projet",s2n:"12K€",s2l:"perdus annuellement par freelance à cause du travail non payé",s3n:"68%",s3l:"des clients paient moins car ils ne voient pas la valeur complète",
    fvt:"ValueProof",fvi:"💎",fvd:"Transformez votre travail en une histoire de valeur convaincante. Montrez aux clients l'impact commercial exact que vous avez créé.",fvb:"Ouvrir ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Collez votre contrat et la nouvelle demande client. Obtenez un verdict instantané sur le scope creep avec une réponse prête à envoyer.",fbb:"Ouvrir BoundaryGuard →",
    hiw:"Conçu pour les Vrais Problèmes des Freelances",
    h1t:"Le Scope Creep Tue les Profits",h1b:"Tout freelance connaît ce sentiment: vous vous accordez sur un projet, puis le client ajoute des demandes 'petites'. BoundaryGuard le détecte instantanément.",
    h2t:"Votre Valeur Est Sous-estimée",h2b:"Les clients voient des heures, pas des résultats. ValueProof renverse ça — transforme votre travail technique en résultats commerciaux qui comptent vraiment.",
    h3t:"Une Plateforme, Protection Totale",h3b:"Utilisez les deux outils ensemble : protégez votre temps avec BoundaryGuard, puis prouvez votre valeur avec ValueProof.",
    vp_title:"ValueProof",vp_sub:"Transformez votre travail en une histoire de valeur que les clients ne peuvent pas ignorer.",
    vp_ht:"Comment Utiliser ValueProof",vs1t:"Décrivez Votre Travail",vs1b:"Écrivez ce que vous avez construit ou livré — soyez précis sur les fonctionnalités, la qualité et l'effort.",vs2t:"Listez les Fonctionnalités Clés",vs2b:"Ajoutez les capacités remarquables: vitesse, design, intégrations, automatisations.",vs3t:"Déclarez l'Impact",vs3b:"Pensez du point de vue du client: plus de ventes, temps économisé, meilleure expérience.",
    vb_t:"Pourquoi ValueProof Fonctionne Pour Vous",vb1t:"Justifiez des Tarifs Plus Élevés",vb1b:"Quand les clients voient l'impact en chiffres réels, les tarifs horaires deviennent non pertinents.",vb2t:"Gagnez Plus de Clients",vb2b:"Utilisez vos déclarations dans les propositions et portfolios.",vb3t:"Gérez les Objections de Prix",vb3b:"Partagez votre ValueProof quand le client dit 'vous êtes trop cher'.",vb4t:"Construisez la Crédibilité",vb4b:"Une déclaration professionnelle montre que vous pensez comme un partenaire commercial.",
    vl1:"Quel travail avez-vous terminé?",vp1:"Ex: Conçu et construit un site e-commerce avec passerelle de paiement...",vl2:"Fonctionnalités clés et points de qualité?",vp2:"Ex: Chargement rapide, SEO optimisé, intégration WhatsApp, panneau admin...",vl3:"Impact attendu sur le business du client?",vp3:"Ex: Ventes 24/7, augmentation des commandes 30-40%, support client -50%...",
    vbtn:"Générer la Déclaration de Valeur",vload:"Construction de votre déclaration...",vrt:"Votre Déclaration de Valeur",vcopy:"Copier la Déclaration",
    bg_title:"BoundaryGuard",bg_sub:"Ne faites plus jamais de travail non payé. Connaissez vos limites au moment où elles sont franchies.",
    bg_ht:"Comment Utiliser BoundaryGuard",bs1t:"Collez Votre Contrat",bs1b:"Copiez le périmètre convenu de votre proposition ou contrat.",bs2t:"Ajoutez la Nouvelle Demande",bs2b:"Collez exactement ce que le client vient de demander. Ne le modifiez pas.",bs3t:"Obtenez Votre Verdict",bs3b:"Voyez si c'est dans le périmètre, hors périmètre ou borderline — avec une réponse professionnelle prête.",
    bb_t:"Pourquoi BoundaryGuard Change Tout",bb1t:"Arrêtez de Perdre de l'Argent",bb1b:"Le freelance moyen perd 12 000€/an à cause du scope creep.",bb2t:"Réponses Professionnelles",bb2b:"Une réponse polie et prête instantanément, sans conversations gênantes.",bb3t:"Protégez la Relation",bb3b:"Réponses respectueuses qui protègent votre temps sans endommager la relation.",bb4t:"Construisez un Dossier",bb4b:"Captures d'écran comme preuve si le client conteste le périmètre.",
    bl1:"Contrat Original / Périmètre du Travail",bp1:"Collez le périmètre convenu ici...",bl2:"Nouvelle Demande du Client",bp2:"Collez exactement ce que le client vient de demander...",
    bbtn:"Vérifier Maintenant",bload:"Analyse du contrat et de la demande...",brt:"Analyse du Périmètre",bvl:"Verdict",bal:"Analyse",brl:"Réponse Suggérée au Client",bac:"Votre Prochaine Étape",
    ins:"DANS LE PÉRIMÈTRE",outs:"HORS PÉRIMÈTRE",bord:"BORDERLINE",
    copy_t:"Copier",copied_t:"Copié!",err_t:"Une erreur s'est produite. Veuillez réessayer.",req_t:"Veuillez remplir tous les champs avant de générer.",
    th_l:"Thème",la_l:"Langue",back:"← Retour à l'Accueil",footer:"FreelanceShield — Pour les Freelances qui Valorisent leur Travail",
  },
  tr: {
    dir:"ltr",flag:"🇹🇷",name:"Türkçe",
    nav_home:"Ana Sayfa",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    hero_tag:"Freelancer'ın Kalkanı",hero_h1a:"Çalışmanı Koru.",hero_h1b:"Değerini Kanıtla.",
    hero_p:"Freelancer'lar için iki akıllı araç — kapsam genişlemesini maliyetlenmeden durdurun ve gerçek değerinizi müşterilere güvenle iletin.",
    hero_cta1:"ValueProof'u Dene",hero_cta2:"BoundaryGuard'ı Dene",
    s1n:"73%",s1l:"freelancer her projede kapsam genişlemesiyle karşılaşıyor",s2n:"$12K",s2l:"ödenmemiş ekstra işten yıllık kayıp",s3n:"68%",s3l:"müşteri tam değeri görmediği için daha az ödüyor",
    fvt:"ValueProof",fvi:"💎",fvd:"Tamamladığın işi etkileyici bir değer hikayesine dönüştür. Müşterilere yarattığın iş etkisini tam olarak göster.",fvb:"ValueProof'u Aç →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Sözleşmeni ve müşterinin yeni talebini yapıştır. Kapsam genişlemesine anında karar al — göndermeye hazır profesyonel yanıtla.",fbb:"BoundaryGuard'ı Aç →",
    hiw:"Gerçek Freelancer Sorunları İçin Tasarlandı",
    h1t:"Kapsam Genişlemesi Kârları Öldürür",h1b:"Her freelancer bu hissi bilir: bir proje üzerinde anlaşırsın, sonra müşteri 'küçük' istekler eklemeye devam eder. BoundaryGuard bunu anında yakalar.",
    h2t:"Değerin Küçümseniyor",h2b:"Müşteriler saatleri görür, sonuçları değil. ValueProof bunu değiştirir — teknik çalışmanı müşterilerin önem verdiği iş sonuçlarına dönüştürür.",
    h3t:"Tek Platform, Tam Koruma",h3b:"Her iki aracı birlikte kullan: BoundaryGuard ile zamanını koru, ardından ValueProof ile değerini kanıtla.",
    vp_title:"ValueProof",vp_sub:"Çalışmanı müşterilerin görmezden gelemeyeceği bir değer hikayesine dönüştür.",
    vp_ht:"ValueProof Nasıl Kullanılır",vs1t:"Çalışmanı Tanımla",vs1b:"Ne inşa ettiğini veya teslim ettiğini yaz — özellikler, kalite ve çaba hakkında spesifik ol.",vs2t:"Temel Özellikleri Listele",vs2b:"Öne çıkan yetenekleri ekle: hız, tasarım kalitesi, entegrasyonlar, otomasyonlar.",vs3t:"İş Etkisini Belirt",vs3b:"Müşterinin bakış açısından düşün: daha fazla satış, tasarruf edilen zaman, azalan maliyetler.",
    vb_t:"ValueProof Senin İçin Neden İşe Yarar",vb1t:"Daha Yüksek Ücretleri Haklı Çıkar",vb1b:"Müşteriler etkiyi gerçek sayılarla gördüğünde saatlik ücretler alakasız hale gelir.",vb2t:"Daha Fazla Müşteri Kazan",vb2b:"Değer beyanlarını teklifler ve portföylerde kullan.",vb3t:"Fiyat İtirazlarını Yönet",vb3b:"'Çok pahalısın' dendiğinde ValueProof beyanını paylaş.",vb4t:"Güvenilirlik Oluştur",vb4b:"Profesyonel değer beyanı iş ortağı gibi düşündüğünü gösterir.",
    vl1:"Hangi işi tamamladın?",vp1:"Ör: Ödeme ağ geçidi ve sipariş takibiyle eksiksiz e-ticaret sitesi tasarladım...",vl2:"Temel özellikler ve kalite öne çıkanları?",vp2:"Ör: Hızlı yükleme, SEO optimize, WhatsApp entegrasyonu, yönetici paneli...",vl3:"Müşterinin işi üzerinde beklenen etki?",vp3:"Ör: 7/24 satış, sipariş artışı %30-40, müşteri desteği %50 azalma...",
    vbtn:"Değer Beyanı Oluştur",vload:"Değer beyanın oluşturuluyor...",vrt:"Değer Beyanın",vcopy:"Beyanı Kopyala",
    bg_title:"BoundaryGuard",bg_sub:"Asla ödenmemiş iş yapma. Sınırların aşıldığı an bil.",
    bg_ht:"BoundaryGuard Nasıl Kullanılır",bs1t:"Sözleşmeni Yapıştır",bs1b:"Teklifinden veya sözleşmenden kararlaştırılan kapsamı kopyala.",bs2t:"Yeni Talebi Ekle",bs2b:"Müşterinin az önce istediğini tam olarak yapıştır. Düzenleme yapma.",bs3t:"Anında Kararını Al",bs3b:"Kapsamda mı, dışında mı yoksa sınırda mı olduğunu gör — profesyonel yanıtla.",
    bb_t:"BoundaryGuard Neden Her Şeyi Değiştirir",bb1t:"Para Kaybını Durdur",bb1b:"Ortalama freelancer kapsam genişlemesiyle yılda $12.000 kaybeder.",bb2t:"Profesyonel Yanıtlar",bb2b:"Garip konuşmalar yok. Anında hazır, kibar, müşteri dostu yanıt.",bb3t:"İlişkiyi Koru",bb3b:"Önerilen yanıtlar saygılı ve profesyonel — zaman koruma ilişki bozmadan.",bb4t:"Kayıt Oluştur",bb4b:"Kapsam tartışması olursa ekran görüntüleri delil olarak kullan.",
    bl1:"Orijinal Sözleşme / İş Kapsamı",bp1:"Kararlaştırılan proje kapsamını buraya yapıştır...",bl2:"Müşterinin Yeni Talebi",bp2:"Müşterinin az önce istediğini tam olarak yapıştır...",
    bbtn:"Şimdi Kontrol Et",bload:"Sözleşme ve talep analiz ediliyor...",brt:"Kapsam Analizi",bvl:"Karar",bal:"Analiz",brl:"Müşteriye Önerilen Yanıt",bac:"Sonraki Adımın",
    ins:"KAPSAM DAHİLİNDE",outs:"KAPSAM DIŞINDA",bord:"SINIRDA",
    copy_t:"Kopyala",copied_t:"Kopyalandı!",err_t:"Bir şeyler ters gitti. Lütfen tekrar dene.",req_t:"Oluşturmadan önce tüm alanları doldur.",
    th_l:"Tema",la_l:"Dil",back:"← Ana Sayfaya Dön",footer:"FreelanceShield — İşinin Değerini Bilen Freelancer'lar İçin",
  },
};

// ══════════════════════════════════════════════════════════════
// THEMES — 5 (White + Black required, 3 custom colored)
// ══════════════════════════════════════════════════════════════
const THEMES = {
  white: {
    n:"Pure White", e:"☀️",
    bg:"#F6F7FB", pageGrad:"linear-gradient(160deg,#F6F7FB 0%,#EEF2FF 100%)",
    card:"#FFFFFF", cardBorder:"rgba(0,0,0,0.07)", cardShadow:"0 2px 20px rgba(0,0,0,0.07)",
    text:"#0F1629", textSec:"#5A6481", accent:"#2563EB", accentHover:"#1D4ED8",
    accentGlow:"rgba(37,99,235,0.14)", accentLight:"rgba(37,99,235,0.08)",
    badge_in:{bg:"#DCFCE7",c:"#15803D",b:"#86EFAC"},
    badge_out:{bg:"#FEE2E2",c:"#B91C1C",b:"#FCA5A5"},
    badge_bord:{bg:"#FEF9C3",c:"#92400E",b:"#FDE047"},
    headerBg:"rgba(246,247,251,0.92)", headerBorder:"rgba(0,0,0,0.07)",
    inputBg:"#F8FAFC", inputBorder:"#DDE3EF", inputFocus:"#2563EB",
    btn:"linear-gradient(135deg,#2563EB 0%,#6366F1 100%)",
    btnText:"#FFFFFF", stepIcon:"#EFF6FF", stepIconText:"#2563EB",
    statBg:"#FFFFFF", statBorder:"rgba(37,99,235,0.12)",
    orb1:"rgba(37,99,235,0.12)", orb2:"rgba(99,102,241,0.1)", orb3:"rgba(139,92,246,0.08)",
    resultBg:"#EFF6FF", resultBorder:"rgba(37,99,235,0.2)",
    selectBg:"#FFFFFF", isDark:false,
  },
  black: {
    n:"Obsidian", e:"🌑",
    bg:"#060608", pageGrad:"linear-gradient(160deg,#060608 0%,#0D0D16 100%)",
    card:"#0F0F18", cardBorder:"rgba(0,245,255,0.07)", cardShadow:"0 2px 24px rgba(0,0,0,0.5)",
    text:"#E4E4FF", textSec:"#7070A0", accent:"#00F5FF", accentHover:"#00D4DD",
    accentGlow:"rgba(0,245,255,0.18)", accentLight:"rgba(0,245,255,0.06)",
    badge_in:{bg:"rgba(0,255,128,0.1)",c:"#00FF80",b:"rgba(0,255,128,0.25)"},
    badge_out:{bg:"rgba(255,70,70,0.1)",c:"#FF4646",b:"rgba(255,70,70,0.25)"},
    badge_bord:{bg:"rgba(255,210,0,0.08)",c:"#FFD200",b:"rgba(255,210,0,0.2)"},
    headerBg:"rgba(6,6,8,0.92)", headerBorder:"rgba(0,245,255,0.06)",
    inputBg:"#090912", inputBorder:"#1A1A2E", inputFocus:"#00F5FF",
    btn:"linear-gradient(135deg,#00F5FF 0%,#7B2FBE 100%)",
    btnText:"#06060A", stepIcon:"rgba(0,245,255,0.08)", stepIconText:"#00F5FF",
    statBg:"#0F0F18", statBorder:"rgba(0,245,255,0.1)",
    orb1:"rgba(0,245,255,0.08)", orb2:"rgba(123,47,190,0.12)", orb3:"rgba(0,120,255,0.06)",
    resultBg:"rgba(0,245,255,0.04)", resultBorder:"rgba(0,245,255,0.15)",
    selectBg:"#0F0F18", isDark:true,
  },
  wine: {
    n:"Royal Crimson", e:"🍷",
    bg:"#140810", pageGrad:"linear-gradient(160deg,#140810 0%,#1C0B16 100%)",
    card:"#1E0E18", cardBorder:"rgba(255,107,157,0.1)", cardShadow:"0 2px 24px rgba(0,0,0,0.5)",
    text:"#FFE4EE", textSec:"#C07090", accent:"#FF6B9D", accentHover:"#FF4D8A",
    accentGlow:"rgba(255,107,157,0.2)", accentLight:"rgba(255,107,157,0.07)",
    badge_in:{bg:"rgba(0,230,150,0.1)",c:"#00E696",b:"rgba(0,230,150,0.25)"},
    badge_out:{bg:"rgba(255,60,60,0.1)",c:"#FF3C3C",b:"rgba(255,60,60,0.25)"},
    badge_bord:{bg:"rgba(255,180,0,0.1)",c:"#FFB400",b:"rgba(255,180,0,0.25)"},
    headerBg:"rgba(20,8,16,0.92)", headerBorder:"rgba(255,107,157,0.08)",
    inputBg:"#100610", inputBorder:"#2E0E20", inputFocus:"#FF6B9D",
    btn:"linear-gradient(135deg,#FF6B9D 0%,#C026D3 100%)",
    btnText:"#FFFFFF", stepIcon:"rgba(255,107,157,0.1)", stepIconText:"#FF6B9D",
    statBg:"#1E0E18", statBorder:"rgba(255,107,157,0.12)",
    orb1:"rgba(255,107,157,0.1)", orb2:"rgba(192,38,211,0.1)", orb3:"rgba(139,0,60,0.12)",
    resultBg:"rgba(255,107,157,0.05)", resultBorder:"rgba(255,107,157,0.18)",
    selectBg:"#1E0E18", isDark:true,
  },
  forest: {
    n:"Deep Forest", e:"🌿",
    bg:"#061510", pageGrad:"linear-gradient(160deg,#061510 0%,#091D14 100%)",
    card:"#0C2018", cardBorder:"rgba(255,184,0,0.09)", cardShadow:"0 2px 24px rgba(0,0,0,0.5)",
    text:"#D0FFE8", textSec:"#6BA880", accent:"#FFAB40", accentHover:"#FF9A00",
    accentGlow:"rgba(255,171,64,0.2)", accentLight:"rgba(255,171,64,0.07)",
    badge_in:{bg:"rgba(0,200,110,0.12)",c:"#00C86E",b:"rgba(0,200,110,0.25)"},
    badge_out:{bg:"rgba(255,80,80,0.1)",c:"#FF5050",b:"rgba(255,80,80,0.25)"},
    badge_bord:{bg:"rgba(255,171,64,0.12)",c:"#FFAB40",b:"rgba(255,171,64,0.25)"},
    headerBg:"rgba(6,21,16,0.92)", headerBorder:"rgba(255,171,64,0.07)",
    inputBg:"#050E0A", inputBorder:"#163320", inputFocus:"#FFAB40",
    btn:"linear-gradient(135deg,#FFAB40 0%,#00C896 100%)",
    btnText:"#061510", stepIcon:"rgba(255,171,64,0.1)", stepIconText:"#FFAB40",
    statBg:"#0C2018", statBorder:"rgba(255,171,64,0.1)",
    orb1:"rgba(255,171,64,0.08)", orb2:"rgba(0,200,110,0.1)", orb3:"rgba(0,100,60,0.12)",
    resultBg:"rgba(255,171,64,0.04)", resultBorder:"rgba(255,171,64,0.16)",
    selectBg:"#0C2018", isDark:true,
  },
  sapphire: {
    n:"Electric Sapphire", e:"⚡",
    bg:"#040E28", pageGrad:"linear-gradient(160deg,#040E28 0%,#050F32 100%)",
    card:"#071435", cardBorder:"rgba(122,255,110,0.08)", cardShadow:"0 2px 24px rgba(0,0,0,0.5)",
    text:"#D8E8FF", textSec:"#6080B0", accent:"#7AFF6E", accentHover:"#5DEE50",
    accentGlow:"rgba(122,255,110,0.18)", accentLight:"rgba(122,255,110,0.06)",
    badge_in:{bg:"rgba(122,255,110,0.1)",c:"#7AFF6E",b:"rgba(122,255,110,0.25)"},
    badge_out:{bg:"rgba(255,90,90,0.1)",c:"#FF5A5A",b:"rgba(255,90,90,0.25)"},
    badge_bord:{bg:"rgba(255,210,0,0.08)",c:"#FFD200",b:"rgba(255,210,0,0.2)"},
    headerBg:"rgba(4,14,40,0.92)", headerBorder:"rgba(122,255,110,0.07)",
    inputBg:"#030B20", inputBorder:"#0D2050", inputFocus:"#7AFF6E",
    btn:"linear-gradient(135deg,#7AFF6E 0%,#00C3FF 100%)",
    btnText:"#040E28", stepIcon:"rgba(122,255,110,0.08)", stepIconText:"#7AFF6E",
    statBg:"#071435", statBorder:"rgba(122,255,110,0.1)",
    orb1:"rgba(122,255,110,0.07)", orb2:"rgba(0,195,255,0.09)", orb3:"rgba(37,99,235,0.1)",
    resultBg:"rgba(122,255,110,0.04)", resultBorder:"rgba(122,255,110,0.15)",
    selectBg:"#071435", isDark:true,
  },
};

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════
function useCopy() {
  const [copied, setCopied] = useState("");
  const copy = useCallback((text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }, []);
  return [copied, copy];
}

// ══════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND ORBS
// ══════════════════════════════════════════════════════════════
function AnimBg({ th }) {
  return (
    <div style={{ position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {[
        { size:600, x:"10%", y:"5%", delay:"0s", dur:"20s" },
        { size:500, x:"70%", y:"60%", delay:"-8s", dur:"25s" },
        { size:400, x:"40%", y:"35%", delay:"-15s", dur:"18s" },
      ].map((o, i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width:o.size, height:o.size,
          left:o.x, top:o.y,
          background: i===0 ? th.orb1 : i===1 ? th.orb2 : th.orb3,
          filter:"blur(80px)",
          animation:`orbFloat ${o.dur} ${o.delay} infinite ease-in-out alternate`,
          willChange:"transform",
        }} />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════
function Header({ page, setPage, lang, setLang, theme, setTheme, t, th }) {
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const isRTL = t.dir === "rtl";

  return (
    <header style={{
      position:"sticky", top:0, zIndex:200,
      background:th.headerBg, borderBottom:`1px solid ${th.headerBorder}`,
      backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
    }}>
      <div style={{
        maxWidth:960, margin:"0 auto", padding:"12px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:16,
        flexWrap:"wrap",
      }}>
        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
        >
          <div style={{
            width:36, height:36, borderRadius:10,
            background:th.btn, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:17, flexShrink:0,
            boxShadow:`0 2px 12px ${th.accentGlow}`,
          }}>🛡️</div>
          <span style={{
            fontFamily:"'Syne', sans-serif", fontWeight:800,
            fontSize:20, color:th.text, letterSpacing:"-0.02em",
          }}>FreelanceShield</span>
        </div>

        {/* Nav */}
        <nav style={{ display:"flex", gap:4, alignItems:"center" }}>
          {[
            { key:"home", label:t.nav_home, icon:"🏠" },
            { key:"valueproof", label:t.nav_vp, icon:"💎" },
            { key:"boundaryguard", label:t.nav_bg, icon:"🛡️" },
          ].map(({ key, label, icon }) => (
            <button key={key}
              onClick={() => setPage(key)}
              style={{
                background: page===key ? th.accentLight : "transparent",
                border: page===key ? `1px solid ${th.accentGlow}` : "1px solid transparent",
                borderRadius:10, padding:"7px 14px",
                color: page===key ? th.accent : th.textSec,
                cursor:"pointer", fontSize:13, fontWeight: page===key ? 700 : 500,
                fontFamily:"inherit", transition:"all 0.2s", whiteSpace:"nowrap",
              }}>
              <span style={{ marginRight:5, fontSize:12 }}>{icon}</span>{label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {/* Theme picker */}
          <div style={{ position:"relative" }}>
            <button
              onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
              style={{
                background:th.card, border:`1px solid ${th.cardBorder}`,
                borderRadius:10, padding:"7px 12px", cursor:"pointer",
                color:th.text, fontSize:16, fontFamily:"inherit",
                display:"flex", alignItems:"center", gap:4,
              }}>
              {THEMES[theme].e}
              <span style={{ fontSize:10, color:th.textSec }}>▾</span>
            </button>
            {themeOpen && (
              <div style={{
                position:"absolute", top:"calc(100% + 6px)",
                [isRTL ? "left" : "right"]:0,
                background:th.card, border:`1px solid ${th.cardBorder}`,
                borderRadius:12, padding:6, minWidth:170,
                boxShadow:`0 8px 32px rgba(0,0,0,0.2)`, zIndex:300,
              }}>
                {Object.entries(THEMES).map(([k,v]) => (
                  <button key={k}
                    onClick={() => { setTheme(k); setThemeOpen(false); }}
                    style={{
                      display:"block", width:"100%", padding:"8px 12px",
                      background: theme===k ? th.accentLight : "transparent",
                      border:"none", borderRadius:8,
                      color: theme===k ? th.accent : th.text,
                      fontSize:13, fontWeight: theme===k ? 700 : 400,
                      textAlign: isRTL ? "right" : "left",
                      cursor:"pointer", fontFamily:"inherit",
                    }}>
                    {v.e} {v.n}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language picker */}
          <div style={{ position:"relative" }}>
            <button
              onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
              style={{
                background:th.card, border:`1px solid ${th.cardBorder}`,
                borderRadius:10, padding:"7px 12px", cursor:"pointer",
                color:th.text, fontSize:13, fontWeight:600, fontFamily:"inherit",
                display:"flex", alignItems:"center", gap:4,
              }}>
              {T[lang].flag} {T[lang].name.slice(0,5)}
              <span style={{ fontSize:10, color:th.textSec }}>▾</span>
            </button>
            {langOpen && (
              <div style={{
                position:"absolute", top:"calc(100% + 6px)",
                [isRTL ? "left" : "right"]:0,
                background:th.card, border:`1px solid ${th.cardBorder}`,
                borderRadius:12, padding:6, minWidth:150,
                boxShadow:`0 8px 32px rgba(0,0,0,0.2)`, zIndex:300,
              }}>
                {Object.keys(T).map(code => (
                  <button key={code}
                    onClick={() => { setLang(code); setLangOpen(false); }}
                    style={{
                      display:"block", width:"100%", padding:"8px 12px",
                      background: lang===code ? th.accentLight : "transparent",
                      border:"none", borderRadius:8,
                      color: lang===code ? th.accent : th.text,
                      fontSize:13, fontWeight: lang===code ? 700 : 400,
                      textAlign: isRTL ? "right" : "left",
                      cursor:"pointer", fontFamily:"inherit",
                    }}>
                    {T[code].flag} {T[code].name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════
function HomePage({ setPage, t, th }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const id = setTimeout(() => setVis(true), 80); return () => clearTimeout(id); }, []);

  const fadeUp = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  });

  return (
    <div style={{ maxWidth:960, margin:"0 auto", padding:"0 24px 80px" }}>

      {/* ── HERO ── */}
      <div style={{ textAlign:"center", padding:"70px 0 50px", ...fadeUp(0) }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:th.accentLight, border:`1px solid ${th.accentGlow}`,
          borderRadius:40, padding:"6px 16px", marginBottom:24,
        }}>
          <span style={{ fontSize:13 }}>🛡️</span>
          <span style={{ fontSize:12, fontWeight:700, color:th.accent, letterSpacing:"0.06em", textTransform:"uppercase" }}>
            {t.hero_tag}
          </span>
        </div>
        <h1 style={{
          fontFamily:"'Syne', sans-serif", fontWeight:900,
          fontSize:"clamp(36px, 6vw, 64px)", lineHeight:1.1,
          color:th.text, marginBottom:10,
        }}>
          {t.hero_h1a}
        </h1>
        <h1 style={{
          fontFamily:"'Syne', sans-serif", fontWeight:900,
          fontSize:"clamp(36px, 6vw, 64px)", lineHeight:1.1,
          color:th.accent, marginBottom:20,
        }}>
          {t.hero_h1b}
        </h1>
        <p style={{ color:th.textSec, fontSize:17, maxWidth:560, margin:"0 auto 36px", lineHeight:1.7 }}>
          {t.hero_p}
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setPage("valueproof")} style={{
            background:th.btn, color:th.btnText,
            border:"none", borderRadius:12, padding:"14px 28px",
            fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
            boxShadow:`0 4px 20px ${th.accentGlow}`,
            transition:"all 0.2s",
          }}>💎 {t.hero_cta1}</button>
          <button onClick={() => setPage("boundaryguard")} style={{
            background:"transparent", color:th.accent,
            border:`1.5px solid ${th.accent}`, borderRadius:12, padding:"14px 28px",
            fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
            transition:"all 0.2s",
          }}>🛡️ {t.hero_cta2}</button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:60, ...fadeUp(0.15) }}>
        {[[t.s1n,t.s1l],[t.s2n,t.s2l],[t.s3n,t.s3l]].map(([num,label],i) => (
          <div key={i} style={{
            background:th.statBg, border:`1px solid ${th.statBorder}`,
            borderRadius:16, padding:"24px 20px", textAlign:"center",
            boxShadow:th.cardShadow,
          }}>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:36, fontWeight:900, color:th.accent, lineHeight:1 }}>{num}</div>
            <div style={{ fontSize:13, color:th.textSec, marginTop:8, lineHeight:1.5 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURE CARDS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginBottom:60, ...fadeUp(0.3) }}>
        {[
          { icon:t.fvi, title:t.fvt, desc:t.fvd, btn:t.fvb, page:"valueproof" },
          { icon:t.fbi, title:t.fbt, desc:t.fbd, btn:t.fbb, page:"boundaryguard" },
        ].map((f,i) => (
          <div key={i} style={{
            background:th.card, border:`1px solid ${th.cardBorder}`,
            borderRadius:20, padding:32, boxShadow:th.cardShadow,
            display:"flex", flexDirection:"column", gap:16,
            transition:"transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${th.accentGlow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=th.cardShadow; }}>
            <div style={{
              width:56, height:56, borderRadius:16,
              background:th.accentLight, border:`1px solid ${th.accentGlow}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
            }}>{f.icon}</div>
            <div>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:22, fontWeight:800, color:th.text, marginBottom:8 }}>{f.title}</h3>
              <p style={{ color:th.textSec, fontSize:14, lineHeight:1.75 }}>{f.desc}</p>
            </div>
            <button onClick={() => setPage(f.page)} style={{
              background:th.btn, color:th.btnText,
              border:"none", borderRadius:10, padding:"12px 20px",
              fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
              alignSelf:"flex-start", boxShadow:`0 2px 12px ${th.accentGlow}`,
              transition:"all 0.2s",
            }}>{f.btn}</button>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ ...fadeUp(0.45) }}>
        <h2 style={{
          fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800,
          color:th.text, textAlign:"center", marginBottom:32,
        }}>{t.hiw}</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
          {[[t.h1t,t.h1b,"🔍"],[t.h2t,t.h2b,"📊"],[t.h3t,t.h3b,"⚡"]].map(([title,body,icon],i) => (
            <div key={i} style={{
              background:th.card, border:`1px solid ${th.cardBorder}`,
              borderRadius:16, padding:24, boxShadow:th.cardShadow,
            }}>
              <div style={{
                width:44, height:44, borderRadius:12,
                background:th.stepIcon, display:"flex",
                alignItems:"center", justifyContent:"center",
                fontSize:20, marginBottom:14,
              }}>{icon}</div>
              <h4 style={{ fontFamily:"'Syne', sans-serif", fontSize:16, fontWeight:800, color:th.text, marginBottom:8 }}>{title}</h4>
              <p style={{ color:th.textSec, fontSize:13.5, lineHeight:1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED TOOL CARD WRAPPER
// ══════════════════════════════════════════════════════════════
function ToolCard({ th, children }) {
  return (
    <div style={{
      background:th.card, border:`1px solid ${th.cardBorder}`,
      borderRadius:20, padding:28, boxShadow:th.cardShadow, marginBottom:20,
    }}>
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// VALUE PROOF PAGE
// ══════════════════════════════════════════════════════════════
function ValueProofPage({ t, th, lang }) {
  const [work, setWork] = useState("");
  const [features, setFeatures] = useState("");
  const [impact, setImpact] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vis, setVis] = useState(false);
  const [copied, copy] = useCopy();

  useEffect(() => { const id = setTimeout(() => setVis(true), 60); return () => clearTimeout(id); }, []);
  const fade = (delay) => ({ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ${delay}s, transform 0.5s ${delay}s` });

  const LANG_NAMES = { en:"English", ur:"Urdu", ar:"Arabic", es:"Spanish", hi:"Hindi", fr:"French", tr:"Turkish" };

  const generate = async () => {
    if (!work.trim() || !features.trim() || !impact.trim()) { setError(t.req_t); return; }
    setError(""); setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ 
          "Content-Type":"application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model:"claude-3-5-sonnet-20241022",
          max_tokens:1000,
          messages:[{ role:"user", content:`You are a world-class marketing consultant specializing in helping freelancers articulate their value.

Freelancer's input:
Work Done: ${work}
Key Features: ${features}
Expected Impact: ${impact}

Generate a compelling Value Statement in ${LANG_NAMES[lang]} with EXACTLY these three sections:

**VALUE SUMMARY**
[2-3 powerful sentences focusing on business ROI and outcomes. Client-friendly, zero jargon. Show the transformation the client received.]

**VALUE SNIPPETS**
[3 punchy one-liners under 130 characters each, starting with a relevant emoji. These should be shareable highlights.]

**CLIENT MESSAGE TEMPLATE**
[A warm, professional message the freelancer can send to justify their rates or present completed work. 3-4 sentences. First-person. Ready to copy-paste.]

Keep it compelling, professional, and results-focused. Respond entirely in ${LANG_NAMES[lang]}.` }]
        })
      });
      const data = await res.json();
      if (data.error) {
        setResult(`Error: ${data.error.message || "API error"}`);
      } else {
        setResult((data.content||[]).map(b=>b.text||"").join(""));
      }
    } catch (e) {
      setResult(t.err_t);
    }
    setLoading(false);
  };

  const inputStyle = {
    width:"100%", background:th.inputBg, border:`1.5px solid ${th.inputBorder}`,
    borderRadius:12, padding:"13px 16px", color:th.text,
    fontSize:14, lineHeight:1.7, fontFamily:"inherit",
    transition:"border-color 0.2s", resize:"vertical",
  };
  const labelStyle = { display:"block", fontSize:12, fontWeight:700, color:th.textSec, marginBottom:7, letterSpacing:"0.05em", textTransform:"uppercase" };

  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"0 24px 80px" }}>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"48px 0 32px", ...fade(0) }}>
        <div style={{
          width:64, height:64, borderRadius:18, background:th.accentLight,
          border:`1px solid ${th.accentGlow}`, display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:28,
          margin:"0 auto 16px",
        }}>💎</div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(28px,5vw,42px)", fontWeight:900, color:th.accent, marginBottom:10 }}>
          {t.vp_title}
        </h1>
        <p style={{ color:th.textSec, fontSize:16, maxWidth:500, margin:"0 auto" }}>{t.vp_sub}</p>
      </div>

      {/* How to use */}
      <div style={{ ...fade(0.1), marginBottom:24 }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:20 }}>
            📋 {t.vp_ht}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[[1,t.vs1t,t.vs1b],[2,t.vs2t,t.vs2b],[3,t.vs3t,t.vs3b]].map(([n,title,body]) => (
              <div key={n} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{
                  width:36, height:36, borderRadius:10, flexShrink:0,
                  background:th.stepIcon, display:"flex",
                  alignItems:"center", justifyContent:"center",
                  fontFamily:"'Syne', sans-serif", fontSize:16, fontWeight:900, color:th.stepIconText,
                }}>{n}</div>
                <div>
                  <div style={{ fontWeight:700, color:th.text, fontSize:14, marginBottom:5 }}>{title}</div>
                  <div style={{ color:th.textSec, fontSize:13, lineHeight:1.6 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>

      {/* Benefits */}
      <div style={{ ...fade(0.2), marginBottom:24 }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:20 }}>
            🌟 {t.vb_t}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[[t.vb1t,t.vb1b,"💰"],[t.vb2t,t.vb2b,"🚀"],[t.vb3t,t.vb3b,"💬"],[t.vb4t,t.vb4b,"🏆"]].map(([title,body,icon],i) => (
              <div key={i} style={{
                background:th.accentLight, borderRadius:14, padding:18,
                border:`1px solid ${th.accentGlow}`,
              }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                <div style={{ fontWeight:700, color:th.text, fontSize:14, marginBottom:6 }}>{title}</div>
                <div style={{ color:th.textSec, fontSize:13, lineHeight:1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>

      {/* Tool */}
      <div style={{ ...fade(0.3) }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:24 }}>
            ✨ Generate Your Value Statement
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div>
              <label style={labelStyle}>{t.vl1}</label>
              <textarea style={{...inputStyle, minHeight:100}} placeholder={t.vp1} value={work} onChange={e=>setWork(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.vl2}</label>
              <textarea style={{...inputStyle, minHeight:80}} placeholder={t.vp2} value={features} onChange={e=>setFeatures(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.vl3}</label>
              <textarea style={{...inputStyle, minHeight:80}} placeholder={t.vp3} value={impact} onChange={e=>setImpact(e.target.value)} />
            </div>
            {error && <p style={{ color:"#EF4444", fontSize:13, margin:0 }}>{error}</p>}
            <button
              onClick={generate}
              disabled={loading}
              style={{
                background:loading ? th.accentLight : th.btn,
                color:loading ? th.accent : th.btnText,
                border:`1px solid ${th.accentGlow}`,
                borderRadius:12, padding:"15px 24px",
                fontSize:15, fontWeight:700, cursor:loading ? "not-allowed" : "pointer",
                fontFamily:"inherit", boxShadow:`0 4px 20px ${th.accentGlow}`,
                transition:"all 0.2s",
              }}>
              {loading ? `⏳ ${t.vload}` : `✨ ${t.vbtn}`}
            </button>
          </div>
        </ToolCard>

        {/* Loading shimmer */}
        {loading && (
          <ToolCard th={th}>
            {[80,100,60,90,70,55].map((w,i) => (
              <div key={i} style={{
                height:14, width:`${w}%`, borderRadius:7, marginBottom:12,
                background:`linear-gradient(90deg, ${th.card} 25%, ${th.accentGlow} 50%, ${th.card} 75%)`,
                backgroundSize:"200% 100%",
                animation:"shimmer 1.5s infinite",
              }} />
            ))}
          </ToolCard>
        )}

        {/* Result */}
        {result && !loading && (
          <ToolCard th={th}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:10 }}>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:18, fontWeight:800, color:th.accent, margin:0 }}>
                ✅ {t.vrt}
              </h3>
              <button
                onClick={() => copy(result, "vp")}
                style={{
                  background:th.accentLight, border:`1px solid ${th.accentGlow}`,
                  borderRadius:8, padding:"7px 14px", cursor:"pointer",
                  color:th.accent, fontSize:12, fontWeight:700, fontFamily:"inherit",
                }}>
                {copied==="vp" ? `✓ ${t.copied_t}` : `📋 ${t.vcopy}`}
              </button>
            </div>
            <div style={{ background:th.resultBg, border:`1px solid ${th.resultBorder}`, borderRadius:14, padding:20 }}>
              <pre style={{ whiteSpace:"pre-wrap", wordBreak:"break-word", color:th.text, fontSize:14, lineHeight:1.85, fontFamily:"inherit", margin:0 }}>
                {result}
              </pre>
            </div>
          </ToolCard>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// BOUNDARY GUARD PAGE
// ══════════════════════════════════════════════════════════════
function BoundaryGuardPage({ t, th, lang }) {
  const [contract, setContract] = useState("");
  const [request, setRequest] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vis, setVis] = useState(false);
  const [copied, copy] = useCopy();

  useEffect(() => { const id = setTimeout(() => setVis(true), 60); return () => clearTimeout(id); }, []);
  const fade = (delay) => ({ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity 0.5s ${delay}s, transform 0.5s ${delay}s` });

  const LANG_NAMES = { en:"English", ur:"Urdu", ar:"Arabic", es:"Spanish", hi:"Hindi", fr:"French", tr:"Turkish" };

  const check = async () => {
    if (!contract.trim() || !request.trim()) { setError(t.req_t); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ 
          "Content-Type":"application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model:"claude-3-5-sonnet-20241022",
          max_tokens:900,
          messages:[{ role:"user", content:`You are BoundaryGuard, an expert in freelance contract scope analysis.

Original Contract/Scope:
${contract}

Client's New Request:
${request}

Respond ONLY with valid JSON (no markdown, no backticks, no extra text):
{
  "verdict": "IN_SCOPE" or "OUT_OF_SCOPE" or "BORDERLINE",
  "explanation": "2-3 sentences in ${LANG_NAMES[lang]} clearly explaining why this verdict. Reference specific parts of the original scope.",
  "suggested_response": "A complete, ready-to-send message in ${LANG_NAMES[lang]} for the freelancer to send to the client. If OUT_OF_SCOPE: professionally decline and offer a separate quote. If BORDERLINE: acknowledge and ask for clarification/extra budget. If IN_SCOPE: confirm happily. Warm, professional tone. No placeholders.",
  "action": "A specific, actionable next step for the freelancer in ${LANG_NAMES[lang]}. Be concrete and helpful."
}` }]
        })
      });
      const data = await res.json();
      if (data.error) {
        setResult({ verdict:"ERROR", explanation:`Error: ${data.error.message}`, suggested_response:"", action:"" });
      } else {
        const txt = (data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
        setResult(JSON.parse(txt));
      }
    } catch {
      setResult({ verdict:"ERROR", explanation:t.err_t, suggested_response:"", action:"" });
    }
    setLoading(false);
  };

  const getBadge = (v) => {
    if (v==="IN_SCOPE") return { label:t.ins, ...th.badge_in, icon:"✅" };
    if (v==="OUT_OF_SCOPE") return { label:t.outs, ...th.badge_out, icon:"❌" };
    if (v==="BORDERLINE") return { label:t.bord, ...th.badge_bord, icon:"⚠️" };
    return { label:v, ...th.badge_bord, icon:"ℹ️" };
  };

  const inputStyle = {
    width:"100%", background:th.inputBg, border:`1.5px solid ${th.inputBorder}`,
    borderRadius:12, padding:"13px 16px", color:th.text,
    fontSize:14, lineHeight:1.7, fontFamily:"inherit",
    transition:"border-color 0.2s", resize:"vertical",
  };
  const labelStyle = { display:"block", fontSize:12, fontWeight:700, color:th.textSec, marginBottom:7, letterSpacing:"0.05em", textTransform:"uppercase" };

  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"0 24px 80px" }}>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"48px 0 32px", ...fade(0) }}>
        <div style={{
          width:64, height:64, borderRadius:18, background:th.accentLight,
          border:`1px solid ${th.accentGlow}`, display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:28,
          margin:"0 auto 16px",
        }}>🛡️</div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(28px,5vw,42px)", fontWeight:900, color:th.accent, marginBottom:10 }}>
          {t.bg_title}
        </h1>
        <p style={{ color:th.textSec, fontSize:16, maxWidth:500, margin:"0 auto" }}>{t.bg_sub}</p>
      </div>

      {/* Verdict legend */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24, ...fade(0.05) }}>
        {[[t.ins,"✅",th.badge_in],[t.bord,"⚠️",th.badge_bord],[t.outs,"❌",th.badge_out]].map(([label,icon,s],i) => (
          <div key={i} style={{
            background:s.bg, border:`1px solid ${s.b}`, borderRadius:12, padding:"14px 12px",
            textAlign:"center",
          }}>
            <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
            <div style={{ fontSize:11, fontWeight:800, color:s.c, letterSpacing:"0.04em" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* How to use */}
      <div style={{ ...fade(0.1), marginBottom:24 }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:20 }}>
            📋 {t.bg_ht}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[[1,t.bs1t,t.bs1b],[2,t.bs2t,t.bs2b],[3,t.bs3t,t.bs3b]].map(([n,title,body]) => (
              <div key={n} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{
                  width:36, height:36, borderRadius:10, flexShrink:0,
                  background:th.stepIcon, display:"flex",
                  alignItems:"center", justifyContent:"center",
                  fontFamily:"'Syne', sans-serif", fontSize:16, fontWeight:900, color:th.stepIconText,
                }}>{n}</div>
                <div>
                  <div style={{ fontWeight:700, color:th.text, fontSize:14, marginBottom:5 }}>{title}</div>
                  <div style={{ color:th.textSec, fontSize:13, lineHeight:1.6 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>

      {/* Benefits */}
      <div style={{ ...fade(0.2), marginBottom:24 }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:20 }}>
            🔒 {t.bb_t}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[[t.bb1t,t.bb1b,"💸"],[t.bb2t,t.bb2b,"💬"],[t.bb3t,t.bb3b,"🤝"],[t.bb4t,t.bb4b,"📂"]].map(([title,body,icon],i) => (
              <div key={i} style={{
                background:th.accentLight, borderRadius:14, padding:18,
                border:`1px solid ${th.accentGlow}`,
              }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                <div style={{ fontWeight:700, color:th.text, fontSize:14, marginBottom:6 }}>{title}</div>
                <div style={{ color:th.textSec, fontSize:13, lineHeight:1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>

      {/* Tool */}
      <div style={{ ...fade(0.3) }}>
        <ToolCard th={th}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, color:th.text, marginBottom:24 }}>
            🔍 Analyze Scope
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div>
              <label style={labelStyle}>{t.bl1}</label>
              <textarea style={{...inputStyle, minHeight:140}} placeholder={t.bp1} value={contract} onChange={e=>setContract(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.bl2}</label>
              <textarea style={{...inputStyle, minHeight:100}} placeholder={t.bp2} value={request} onChange={e=>setRequest(e.target.value)} />
            </div>
            {error && <p style={{ color:"#EF4444", fontSize:13, margin:0 }}>{error}</p>}
            <button
              onClick={check}
              disabled={loading}
              style={{
                background:loading ? th.accentLight : th.btn,
                color:loading ? th.accent : th.btnText,
                border:`1px solid ${th.accentGlow}`,
                borderRadius:12, padding:"15px 24px",
                fontSize:15, fontWeight:700, cursor:loading ? "not-allowed" : "pointer",
                fontFamily:"inherit", boxShadow:`0 4px 20px ${th.accentGlow}`,
                transition:"all 0.2s",
              }}>
              {loading ? `⏳ ${t.bload}` : `🔍 ${t.bbtn}`}
            </button>
          </div>
        </ToolCard>

        {/* Loading */}
        {loading && (
          <ToolCard th={th}>
            {[50,80,65,90,55].map((w,i) => (
              <div key={i} style={{
                height:14, width:`${w}%`, borderRadius:7, marginBottom:12,
                background:`linear-gradient(90deg, ${th.card} 25%, ${th.accentGlow} 50%, ${th.card} 75%)`,
                backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite",
              }} />
            ))}
          </ToolCard>
        )}

        {/* Result */}
        {result && !loading && (
          <ToolCard th={th}>
            <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:18, fontWeight:800, color:th.text, marginBottom:20 }}>
              🔎 {t.brt}
            </h3>

            {/* Verdict badge */}
            {result.verdict && result.verdict!=="ERROR" && (() => {
              const b = getBadge(result.verdict);
              return (
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  background:b.bg, border:`1.5px solid ${b.b}`,
                  borderRadius:40, padding:"10px 20px", marginBottom:20,
                  fontSize:14, fontWeight:800, color:b.c,
                }}>
                  {b.icon} {b.label}
                </div>
              );
            })()}

            {/* Analysis */}
            {result.explanation && (
              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:11, fontWeight:700, color:th.accent, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8 }}>
                  {t.bal}
                </div>
                <div style={{ background:th.resultBg, border:`1px solid ${th.resultBorder}`, borderRadius:12, padding:16 }}>
                  <p style={{ color:th.text, fontSize:14, lineHeight:1.8, margin:0 }}>{result.explanation}</p>
                </div>
              </div>
            )}

            {/* Suggested reply */}
            {result.suggested_response && (
              <div style={{ marginBottom:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, flexWrap:"wrap", gap:8 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:th.accent, letterSpacing:"0.07em", textTransform:"uppercase" }}>
                    {t.brl}
                  </div>
                  <button
                    onClick={() => copy(result.suggested_response, "reply")}
                    style={{
                      background:th.accentLight, border:`1px solid ${th.accentGlow}`,
                      borderRadius:8, padding:"6px 12px", cursor:"pointer",
                      color:th.accent, fontSize:12, fontWeight:700, fontFamily:"inherit",
                    }}>
                    {copied==="reply" ? `✓ ${t.copied_t}` : `📋 ${t.copy_t}`}
                  </button>
                </div>
                <div style={{
                  background:th.resultBg, border:`1px solid ${th.resultBorder}`,
                  borderLeft:`3px solid ${th.accent}`,
                  borderRadius:12, padding:16,
                }}>
                  <p style={{ color:th.text, fontSize:14, lineHeight:1.85, margin:0, fontStyle:"italic" }}>
                    "{result.suggested_response}"
                  </p>
                </div>
              </div>
            )}

            {/* Action */}
            {result.action && (
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:th.accent, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8 }}>
                  {t.bac}
                </div>
                <div style={{
                  display:"flex", gap:12, alignItems:"flex-start",
                  background:th.accentLight, borderRadius:12, padding:16,
                  border:`1px solid ${th.accentGlow}`,
                }}>
                  <span style={{ fontSize:20 }}>💡</span>
                  <p style={{ color:th.text, fontSize:14, lineHeight:1.7, margin:0 }}>{result.action}</p>
                </div>
              </div>
            )}
          </ToolCard>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("white");

  const t = T[lang];
  const th = THEMES[theme];
  const isRTL = t.dir === "rtl";

  return (
    <div dir={t.dir} style={{
      minHeight:"100vh",
      background:th.pageGrad,
      color:th.text,
      fontFamily: isRTL
        ? "'Noto Naskh Arabic','Noto Nastaliq Urdu', serif"
        : "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      transition:"background 0.4s, color 0.3s",
      position:"relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, input:focus { border-color: ${th.inputFocus} !important; outline: none !important; box-shadow: 0 0 0 3px ${th.accentGlow} !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${th.cardBorder}; border-radius: 4px; }
        @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(40px,-30px) scale(1.05); } 66% { transform: translate(-20px,40px) scale(0.95); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      <AnimBg th={th} />

      <div style={{ position:"relative", zIndex:10 }}>
        <Header
          page={page} setPage={setPage}
          lang={lang} setLang={setLang}
          theme={theme} setTheme={setTheme}
          t={t} th={th}
        />

        <main>
          {page === "home" && <HomePage setPage={setPage} t={t} th={th} />}
          {page === "valueproof" && <ValueProofPage t={t} th={th} lang={lang} key={lang} />}
          {page === "boundaryguard" && <BoundaryGuardPage t={t} th={th} lang={lang} key={lang} />}
        </main>

        <footer style={{
          textAlign:"center", padding:"28px 20px",
          borderTop:`1px solid ${th.cardBorder}`,
          color:th.textSec, fontSize:12,
        }}>
          {t.footer}
        </footer>
      </div>
    </div>
  );
}
