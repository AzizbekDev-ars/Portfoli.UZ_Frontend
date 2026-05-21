export const translations = {
  uz: {
    nav: { brand: "Portfolio.uz", login: "Kirish", register: "Ro'yxatdan o'tish" },
    hero: { 
      title: "O'zingizni", 
      title_highlight: "dunyoga ko'rsating", 
      subtitle: "Bir necha daqiqada professional portfolio yarating va ish toping", 
      btn_start: "Boshlash", 
      btn_demo: "Demo ko'rish" 
    },
    problem: { 
      badge: "Muammo va Yechim", 
      title: "Nega vizitka va sayt yasash odatda asabni buzadi?",
      problems: [
        { title: "Portfolio qilish qiyin", desc: "Dasturlash va serverlarni sozlash qimmat va oylab vaqtni oladi." },
        { title: "Dizayn bilmaslik", desc: "Saytni chiroyli, responsiv va zamonaviy qilib bezash oson emas." },
        { title: "Ish topish qiyin", desc: "Mijozlarga professional ishlarni bitta manzilda ko'rsata olmaslik." }
      ],
      solution: "Portfolio.uz yordamida bu muammolar unutiladi. Qulay interfeys, tayyor shablonlar va avtomatika!"
    },
    features: {
      badge: "Imkoniyatlar", title: "1 ta platforma — bitta mukammal natija",
      items: [
        { title: "1-click portfolio yaratish", desc: "Hech qanday murakkabliklarsiz bitta bosishda o'z sahifangizga ega bo'ling." },
        { title: "Tayyor dizayn template'lar", desc: "Eng so'nggi trendlardagi, chiroyli va responsiv shablonlar to'plami." },
        { title: "AI yordamida to'ldirish", desc: "O'zingiz haqingizda mukammal va e'tibor tortuvchi matnlarni yozib beradi." },
        { title: "Custom domain ulash", desc: "O'z ismingizdagi (\".uz\", \".com\") shaxsiy domenni saytingizga ulang." },
        { title: "Portfolio analytics", desc: "Saytingiz statistikasini ko'ring: qaysi ishingiz eng ommabop ekanini biling." }
      ]
    },
    howItWorks: {
      badge: "Qanday ishlaydi?", title: "3 qadamda muvaffaqiyatli sahifa",
      steps: [
        { title: "Ro'yxatdan o'ting", desc: "Email orqali tezkor va xavfsiz tizimga kiring." },
        { title: "O'zingizni tariflang", desc: "Tajribangiz, ishlaringiz hamda yutuqlaringizni yozib chiqing." },
        { title: "Portfolio tayyor", desc: "Saytingiz internetga avtomatik chiqadi, uni mijozlarga yuboring!" }
      ]
    },
    preview: { badge: "Demo", title: "Muvaffaqiyatli namunalar" },
    testimonials: {
      badge: "Fikrlar", title: "Foydalanuvchilarimiz nima deydi?",
      items: [
        { name: "Azizbek", role: "Software Engineer", text: "Portfolio.uz orqali saytimni 10 daqiqada yig'dim. Ikki kundan so'ng yangi vakansiya bo'yicha taklif tushdi!" },
        { name: "Malika", role: "UX/UI Dizayner", text: "Dizayn shablonlari shunchaki ajoyib. O'zim xohlagan haqiqiy minimalist uslubni topa oldim." },
        { name: "Sardor", role: "Freelancer", text: "Klientlarga fayllar tashlashdan ko'ra o'z saytimni beraman, shu ishonchni ancha oshirdi." }
      ]
    },
    pricing: {
      badge: "Narxlar", title: "O'zingizga mos tarifni tanlang",
      free: { title: "Bepul", price: "$0", desc: "Boshlang'ich qadamlar va tanishish uchun", features: ["1 ta tayyor template", "Faqat Portfolio.uz/ profilingiz", "Asosiy analitika"], btn: "Boshlash" },
      pro: { title: "Pro", price: "$3/oy", desc: "Professional darajadagi taqdimot va erkinlik", features: ["Barcha premium template'lar", "Custom domain ulash (.com, .uz)", "To'liq Google analitika", "AI copywriter yordamchisi"], btn: "Pro ga o'tish" }
    },
    cta: { title: "Hozir o'z portfolioingizni yarating", btn: "Boshlash" },
    auth: {
      loginTitle: "Tizimga kirish",
      registerTitle: "Ro'yxatdan o'tish",
      email: "Pochta manzilingiz",
      password: "Parolingiz",
      username: "Ismingiz",
      btnLogin: "Kirish",
      btnRegister: "Ro'yxatdan o'tish",
      noAccount: "Hali akkountingiz yo'qmi?",
      hasAccount: "Allaqachon akkountingiz bormi?",
      toRegister: "Ro'yxatdan o'tish",
      toLogin: "Kirish"
    },
    dashboard: {
      nav: { home: "Bosh sahifa", visitors: "Tashriflar", messages: "Xabarlar", certificates: "Sertifikatlar", experiences: "Tajribalar", projects: "Loyihalar", cv: "CV", settings: "Sozlamalar", search: "Qidirish..." },
      home: { 
        visits: "Umumiy tashriflar", newVisitors: "Yangi tashriflar", unread: "O'qilmagan xabarlar", cvDownloads: "CV yuklab olingan", 
        newsTitle: "Yaratuvchilardan yangiliklar", newsSubtitle: "Portfolio.uz 2.0 versiyasi haqida", newsText: "Yangi yangilanishda biz platformamiz tezligini 40% ga oshirdik. Yuqoridagi videoda tafsilotlar.",
        newMsgs: "Yangi xabarlar", viewMsg: "Xabarni ko'rish", allMsgs: "Barcha xabarlarga o'tish →",
        totalVisitors: "Tashrif buyuruvchilar", allMessages: "Barcha xabarlar"
      },
      visitors: {
        title: "Tashrif buyuruvchilar", lineChartTitle: "Oylik tashriflar statistikasi", barChartTitle: "Tashriflar shaharlar bo'yicha",
        search: "Qidirish (Email yoki shahar)...",
        colUser: "IP / Qurilma", colDate: "Vaqt", colCity: "Shahar / Davlat", colMsg: "Sahifa", colCV: "Metod", colAction: "Amal",
        btnDelete: "O'chirish", prev: "Oldingi", next: "Keyingi", empty: "Topilmadi",
        yes: "Ha", no: "Yo'q",
        fDateDesc: "Eng yangilari", fDateAsc: "Eng eskilar",
        fCityAll: "Barcha shaharlar", fMsgAll: "Xabar holati", fCVAll: "CV holati"
      },
      messages: {
        title: "Xabarlar", search: "Ism, email yoki matn bo'yicha qidiruv...",
        filterTitle: "Filtrlar:",
        sortLatest: "Eng yangilari", sortOldest: "Eng eskilar",
        allMessages: "Barcha xabarlar", unread: "O'qilmagan", read: "O'qilgan",
        allLiked: "Barchasi (Like)", liked: "Yoqtirilganlar", unliked: "Yoqtirilmaganlar",
        noMessages: "Mos keluvchi xabarlar topilmadi.",
        deleteConfirm: "Rostdan ham ushbu xabarni o'chirmoqchimisiz?",
        viewMsg: "Xabarni ko'rish"
      },
      portfolio: {
        loading: "Yuklanmoqda...",
        notFoundTitle: "Sahifa topilmadi",
        notFoundDesc: "Bunday username mavjud emas yoki profil yashirin.",
        noCV: "Kechirasiz, ushbu foydalanuvchi hali CV tayyorlamagan."
      },
      common: {
        save: "Saqlash",
        cancel: "Bekor qilish",
        delete: "O'chirish",
        edit: "Tahrirlash",
        add: "Qo'shish",
        loading: "Yuklanmoqda...",
        success: "Muvaffaqiyatli bajarildi!",
        error: "Xatolik yuz berdi",
        noData: "Ma'lumot topilmadi",
        view: "Ko'rish",
        upgrade: "Pro ga o'ting",
        limitReached: "Limitga yetdingiz"
      },
      settings: {
        title: "Sozlamalar",
        saveChanges: "O'zgarishlarni saqlash",
        personalInfo: "Shaxsiy Ma'lumot va Profil",
        showOnSite: "Saytda ko'rsatish",
        specialty: "Mutaxassislik",
        specialtyPlaceholder: "Masalan: Fullstack Developer",
        aboutMe: "Men haqimda",
        aboutMePlaceholder: "Kasbingiz va tajribangiz haqida...",
        contactSocials: "Aloqa & Ijtimoiy Tarmoqlar",
        location: "Manzil",
        locationPlaceholder: "Masalan: Toshkent, O'zbekiston",
        phone: "Tel Raqam",
        phonePlaceholder: "+998 90 123 45 67",
        upgradeToProTitle: "PRO Ta'rifiga O'ting",
        upgradeToProDesc: "Mijozlar tashrifini kuzating, CV ni aktivlashtiring va xohlagancha dizayn almashtiring.",
        upgradeToProBtn: "Tarifni Yangilash ($3)",
        proActiveTitle: "Siz PRO Tarifidasiz 🎉",
        proActiveDesc: "Barcha imkoniyatlar (Tashriflar, CV, dizaynlar) aktiv.",
        cancelProBtn: "Tarifni Bekor Qilish",
        securityPassword: "Xavfsizlik & Parol",
        currentPassword: "Joriy Parol",
        newPassword: "Yangi Parol",
        confirmNewPassword: "Yangi Parolni Tasdiqlash",
        passwordInfo: "Parolni o'zgartirish uchun avval ishlatilayotgan parolingiz kiritilishi shart. O'zgartirmasangiz maydonlarni bo'sh qoldiring.",
        chooseDesignTitle: "Portfolio Dizaynini Tanlash",
        freeDesignAlert: "Bepul 1 marta o'zgartirish mumkin",
        chooseDesignDesc: "O'zingizga yoqqan dizayn uslubini tanlang. Qolgan barcha ma'lumotlar avtomatik tarzda moslashadi.",
        successAvatarUpdate: "Avatar muvaffaqiyatli yangilandi!",
        successSave: "Sozlamalar muvaffaqiyatli saqlandi!",
        alertPassMismatch: "Yangi parollar mos kelmadi!",
        alertProSuccess: "Tabriklaymiz! Siz endi PRO tarifidasiz 🎉",
        alertProCancelConfirm: "Haqiqatan ham PRO tarifingizni bekor qilmoqchimisiz?",
        alertProCanceled: "PRO tarifingiz bekor qilindi.",
        alertAvatarDeleteConfirm: "Avatarni o'chirmoqchimisiz?",
        linkPlaceholder: "linki...",
        viewPortfolio: "Portfolioni ko'rish"
      },
      certificates: {
        title: "Sertifikatlar",
        searchPlaceholder: "Qidirish...",
        addNew: "Qo'shish",
        certImage: "Sertifikat Surati",
        changeImage: "Rasmni almashtirish",
        uploadImage: "Sertifikat suratini yuklash",
        certName: "Sertifikat Nomi",
        certNamePlaceholder: "Masalan: React Developer...",
        dateReceived: "Olingan Sana",
        provider: "Taqdim Etuvchi",
        providerPlaceholder: "Masalan: Coursera, Udemy...",
        certLink: "Sertifikat Linki (Ixtiyoriy)",
        shortDescription: "Qisqacha Tafsif",
        descriptionPlaceholder: "Nimalar o'rganildi, qanday natijalar...",
        addCertTitle: "Yangi Sertifikat",
        editCertTitle: "Sertifikatni Tahrirlash",
        deleteConfirm: "Rostdan ham ushbu sertifikatni o'chirmoqchimisiz?",
        notFound: "Sertifikatlar topilmadi",
        verifyBtn: "Tekshirish",
        loading: "Yuklanmoqda..."
      },
      experiences: {
        title: "Tajribalar (Work Experience)",
        searchPlaceholder: "Kompaniya yoki lavozim izlash...",
        addNew: "Yangi qo'shish",
        companyName: "Kompaniya nomi",
        companyPlaceholder: "Masalan: Google, EPAM...",
        role: "Lavozim",
        rolePlaceholder: "Masalan: Senior Frontend Engineer",
        startDate: "Boshlanish Sanasi",
        endDate: "Tugash Sanasi",
        present: "Hozirgacha",
        details: "Batafsil ma'lumot (Vazifalar)",
        detailsPlaceholder: "Nimalar qilingan, qanday vazifalar bajarilgan...",
        addExpTitle: "Yangi Tajriba",
        editExpTitle: "Tajribani Tahrirlash",
        deleteConfirm: "Rostdan ham ushbu tajribani o'chirmoqchimisiz?",
        notFound: "Hech qanday tajriba topilmadi...",
        inCV: "CV da bor",
        addToCV: "CV ga qo'shish",
        cvLimitAlert: "CV uchun faqat 2 ta tajriba tanlash mumkin. Iltimos bittasini o'chiring."
      },
      projects: {
        title: "Loyihalar",
        searchPlaceholder: "Loyiha izlash...",
        addNew: "Yangi qo'shish",
        projImage: "Loyiha Surati",
        changeImage: "Rasmni almashtirish",
        uploadImage: "Loyiha suratini yuklash",
        projName: "Loyiha Nomi",
        projNamePlaceholder: "Masalan: E-commerce Website...",
        projDesc: "Loyiha Tafsifi (Description)",
        projDescPlaceholder: "Loyiha haqida qisqacha ma'lumot va ishlatilgan texnologiyalar...",
        ongoing: "Hali tugallanmagan",
        addProjTitle: "Yangi Loyiha",
        editProjTitle: "Loyihani Yangilash",
        deleteConfirm: "Rostdan ham ushbu loyihani o'chirmoqchimisiz?",
        notFound: "Hech qanday loyiha topilmadi...",
        cvLimitAlert: "CV uchun faqat 3 ta loyiha tanlash mumkin. Iltimos bittasini navbatdan olib tashlang.",
        freeLimitAlert: "Siz bepul tarifdasiz va loyihalar limiti {limit} ga yetdingiz. Iltimos, PRO tarifga o'ting!"
      },
      cv: {
        title: "Rezyume (CV) Yaratish",
        desc: "Dizaynni tanlang, ma'lumotlaringiz avtomatik joylashadi.",
        downloadPdf: "Yuklab Olish (PDF)",
        generating: "Yaratilmoqda...",
        previewContact: "Bog'lanish",
        previewAddress: "Manzil",
        previewCerts: "Sertifikatlar",
        previewProfile: "Profil",
        previewExp: "Ish Tajribasi",
        previewProjs: "Loyihalar",
        noBio: "Hali bio kiritilmagan.",
        upgradePlaceholderTitle: "Rezyume (CV) Yaratish (PRO)",
        upgradePlaceholderDesc: "O'zingizning professional rezyumengizni bir qancha zamonaviy dizaynlarda avtomatik yaratish hamda PDF formatda yuklab olish imkoniyatiga ega bo'lish uchun PRO tarifiga o'ting."
      }
    }
  },
  ru: {
    nav: { brand: "Portfolio.uz", login: "Войти", register: "Регистрация" },
    hero: { title: "Покажите себя", title_highlight: "миру", subtitle: "Создайте профессиональное портфолио за несколько минут и найдите работу", btn_start: "Начать", btn_demo: "Смотреть демо" },
    problem: { 
      badge: "Проблема и Решение", title: "Почему создание сайта — это сложно?",
      problems: [
        { title: "Сложно создать", desc: "Верстка и сервера занимают месяцы и стоят дорого." },
        { title: "Нет навыков дизайна", desc: "Сделать красивый и современный дизайн непросто для многих." },
        { title: "Сложно найти работу", desc: "Трудно показать свои лучшие работы клиентам в одном месте." }
      ],
      solution: "С Portfolio.uz всё проще. Дружелюбный интерфейс, шаблоны и полная автоматизация!"
    },
    features: {
      badge: "Возможности", title: "Все необходимые инструменты",
      items: [
        { title: "Создание в 1 клик", desc: "Никаких сложностей. Зарегистрируйтесь и мгновенно получите страницу." },
        { title: "Готовые шаблоны", desc: "Выберите современный адаптивный шаблон по своему вкусу." },
        { title: "Автозаполнение AI", desc: "Искусственный интеллект поможет написать идеальные тексты." },
        { title: "Подключение домена", desc: "Подключите собственный уникальный домен (.uz, .com и т.д.)." },
        { title: "Аналитика", desc: "Следите за просмотрами ваших работ и популярностью портфолио." }
      ]
    },
    howItWorks: {
      badge: "Как это работает", title: "Ваш сайт онлайн в 3 простых шага",
      steps: [
        { title: "Регистрация", desc: "Быстрый безопасный вход через почту." },
        { title: "Ввод данных", desc: "Укажите свой опыт, проекты и навыки." },
        { title: "Всё готово", desc: "Ваш профессиональный сайт готов к отправке клиентам!" }
      ]
    },
    preview: { badge: "Демо", title: "Успешные портфолио" },
    testimonials: {
      badge: "Отзывы", title: "Что говорят наши пользователи?",
      items: [
        { name: "Азизбек", role: "Разработчик", text: "Собрал сайт за 10 минут. Через два дня получил приглашение на работу!" },
        { name: "Малика", role: "UX/UI Дизайнер", text: "Шаблоны потрясающие. Я нашла идеальный минималистичный стиль." },
        { name: "Сардор", role: "Фрилансер", text: "Свой сайт повышает доверие клиентов в разы." }
      ]
    },
    pricing: {
      badge: "Цены", title: "Выберите подходящий тариф",
      free: { title: "Бесплатно", price: "$0", desc: "Для старта и ознакомления", features: ["1 базовый шаблон", "Только домен Portfolio.uz/ ваше_имя", "Базовая статистика"], btn: "Начать бесплатно" },
      pro: { title: "Pro", price: "$3/мес", desc: "Для профессионалов и полной свободы", features: ["Все премиум шаблоны", "Свой домен (.com, .uz)", "Полная аналитика", "AI-помощник текстов"], btn: "Выбрать Pro" }
    },
    cta: { title: "Создайте своё портфолио прямо сейчас", btn: "Начать" },
    auth: {
      loginTitle: "Вход в систему",
      registerTitle: "Регистрация",
      email: "Ваш Email",
      password: "Ваш пароль",
      username: "Ваше имя",
      btnLogin: "Войти",
      btnRegister: "Зарегистрироваться",
      noAccount: "Еще нет аккаунта?",
      hasAccount: "Уже есть аккаунт?",
      toRegister: "Зарегистрироваться",
      toLogin: "Войти"
    },
    dashboard: {
      nav: { home: "Главная", visitors: "Посетители", messages: "Сообщения", certificates: "Сертификаты", experiences: "Опыт", projects: "Проекты", cv: "Резюме", settings: "Настройки", search: "Поиск..." },
      home: { 
        visits: "Всего визитов", newVisitors: "Новые посетители", unread: "Непрочитанные", cvDownloads: "CV скачано", 
        newsTitle: "Новости от создателей", newsSubtitle: "О версии Portfolio.uz 2.0", newsText: "Мы увеличили скорость работы на 40%. Подробности в видео выше.",
        newMsgs: "Новые сообщения", viewMsg: "Посмотреть", allMsgs: "Все сообщения →",
        totalVisitors: "Посетители", allMessages: "Все сообщения"
      },
      visitors: {
        title: "Посетители", lineChartTitle: "Статистика по месяцам", barChartTitle: "Визиты по городам",
        search: "Поиск (Email или город)...",
        colUser: "IP / Устройство", colDate: "Время", colCity: "Город / Страна", colMsg: "Страница", colCV: "Метод", colAction: "Действие",
        btnDelete: "Удалить", prev: "Пред", next: "След", empty: "Не найдено",
        yes: "Да", no: "Нет",
        fDateDesc: "Сначала новые", fDateAsc: "Сначала старые",
        fCityAll: "Все города", fMsgAll: "Все сообщения", fCVAll: "Все CV"
      },
      messages: {
        title: "Сообщения", search: "Поиск по имени, email или тексту...",
        filterTitle: "Фильтры:",
        sortLatest: "Сначала новые", sortOldest: "Сначала старые",
        allMessages: "Все сообщения", unread: "Непрочитанные", read: "Прочитанные",
        allLiked: "Все (Like)", liked: "Понравившиеся", unliked: "Остальные",
        noMessages: "Сообщения не найдены.",
        deleteConfirm: "Вы действительно хотите удалить это сообщение?",
        viewMsg: "Посмотреть"
      },
      portfolio: {
        loading: "Загрузка...",
        notFoundTitle: "Страница не найдена",
        notFoundDesc: "Такого пользователя не существует или профиль скрыт.",
        noCV: "К сожалению, этот пользователь еще не подготовил CV."
      },
      common: {
        save: "Сохранить",
        cancel: "Отмена",
        delete: "Удалить",
        edit: "Редактировать",
        add: "Добавить",
        loading: "Загрузка...",
        success: "Успешно выполнено!",
        error: "Произошла ошибка",
        noData: "Данные не найдены",
        view: "Смотреть",
        upgrade: "Перейти на Pro",
        limitReached: "Лимит достигнут"
      },
      settings: {
        title: "Настройки",
        saveChanges: "Сохранить изменения",
        personalInfo: "Личная информация и профиль",
        showOnSite: "Показывать на сайте",
        specialty: "Специальность",
        specialtyPlaceholder: "Например: Fullstack Developer",
        aboutMe: "О себе",
        aboutMePlaceholder: "О вашей профессии и опыте...",
        contactSocials: "Контакты и соцсети",
        location: "Адрес",
        locationPlaceholder: "Например: Ташкент, Узбекистан",
        phone: "Телефон",
        phonePlaceholder: "+998 90 123 45 67",
        upgradeToProTitle: "Перейдите на тариф PRO",
        upgradeToProDesc: "Отслеживайте визиты, активируйте резюме и меняйте шаблоны без ограничений.",
        upgradeToProBtn: "Обновить тариф ($3)",
        proActiveTitle: "Вы на тарифе PRO 🎉",
        proActiveDesc: "Все возможности (визиты, резюме, дизайны) активны.",
        cancelProBtn: "Отменить тариф",
        securityPassword: "Безопасность и пароль",
        currentPassword: "Текущий пароль",
        newPassword: "Новый пароль",
        confirmNewPassword: "Подтвердите новый пароль",
        passwordInfo: "Для смены пароля необходимо ввести текущий пароль. Если не меняете, оставьте поля пустыми.",
        chooseDesignTitle: "Выбор дизайна портфолио",
        freeDesignAlert: "Бесплатно можно изменить 1 раз",
        chooseDesignDesc: "Выберите стиль дизайна, который вам нравится. Все остальные данные адаптируются автоматически.",
        successAvatarUpdate: "Аватар успешно обновлен!",
        successSave: "Настройки успешно сохранены!",
        alertPassMismatch: "Новые пароли не совпадают!",
        alertProSuccess: "Поздравляем! Теперь вы на тарифе PRO 🎉",
        alertProCancelConfirm: "Вы действительно хотите отменить тариф PRO?",
        alertProCanceled: "Ваш тариф PRO отменен.",
        alertAvatarDeleteConfirm: "Удалить аватар?",
        linkPlaceholder: "ссылка...",
        viewPortfolio: "Смотреть портфолио"
      },
      certificates: {
        title: "Сертификаты",
        searchPlaceholder: "Поиск...",
        addNew: "Добавить",
        certImage: "Изображение сертификата",
        changeImage: "Заменить изображение",
        uploadImage: "Загрузить фото сертификата",
        certName: "Название сертификата",
        certNamePlaceholder: "Например: React Developer...",
        dateReceived: "Дата получения",
        provider: "Организация",
        providerPlaceholder: "Например: Coursera, Udemy...",
        certLink: "Ссылка на сертификат (Опционально)",
        shortDescription: "Краткое описание",
        descriptionPlaceholder: "Что было изучено, какие результаты...",
        addCertTitle: "Новый сертификат",
        editCertTitle: "Редактировать сертификат",
        deleteConfirm: "Вы действительно хотите удалить этот сертификат?",
        notFound: "Сертификаты не найдены",
        verifyBtn: "Проверить",
        loading: "Загрузка..."
      },
      experiences: {
        title: "Опыт работы",
        searchPlaceholder: "Поиск компании или должности...",
        addNew: "Добавить",
        companyName: "Название компании",
        companyPlaceholder: "Например: Google, EPAM...",
        role: "Должность",
        rolePlaceholder: "Например: Senior Frontend Engineer",
        startDate: "Дата начала",
        endDate: "Дата окончания",
        present: "По настоящее время",
        details: "Подробная информация (Обязанности)",
        detailsPlaceholder: "Что было сделано, какие обязанности...",
        addExpTitle: "Новый опыт работы",
        editExpTitle: "Редактировать опыт",
        deleteConfirm: "Вы действительно хотите удалить этот опыт работы?",
        notFound: "Опыт работы не найден...",
        inCV: "В резюме",
        addToCV: "Добавить в резюме",
        cvLimitAlert: "Для резюме можно выбрать не более 2 мест работы. Пожалуйста, уберите одно."
      },
      projects: {
        title: "Проекты",
        searchPlaceholder: "Поиск проектов...",
        addNew: "Добавить новый",
        projImage: "Изображение проекта",
        changeImage: "Заменить изображение",
        uploadImage: "Загрузить фото проекта",
        projName: "Название проекта",
        projNamePlaceholder: "Например: E-commerce Website...",
        projDesc: "Описание проекта",
        projDescPlaceholder: "Краткая информация о проекте и технологиях...",
        ongoing: "В процессе разработки",
        addProjTitle: "Новый проект",
        editProjTitle: "Редактировать проект",
        deleteConfirm: "Вы действительно хотите удалить этот проект?",
        notFound: "Проекты не найдены...",
        cvLimitAlert: "Для резюме можно выбрать не более 3 проектов. Пожалуйста, уберите один.",
        freeLimitAlert: "Вы на бесплатном тарифе и достигли лимита проектов ({limit}). Пожалуйста, перейдите на PRO!"
      },
      cv: {
        title: "Создание резюме (CV)",
        desc: "Выберите дизайн, ваши данные распределятся автоматически.",
        downloadPdf: "Скачать (PDF)",
        generating: "Создается...",
        previewContact: "Контакты",
        previewAddress: "Адрес",
        previewCerts: "Сертификаты",
        previewProfile: "Профиль",
        previewExp: "Опыт работы",
        previewProjs: "Проекты",
        noBio: "Био еще не заполнено.",
        upgradePlaceholderTitle: "Создание резюме (CV) (PRO)",
        upgradePlaceholderDesc: "Перейдите на тариф PRO, чтобы автоматически генерировать профессиональное резюме в нескольких современных стилях и скачивать его в формате PDF."
      }
    }
  },
  en: {
    nav: { brand: "Portfolio.uz", login: "Login", register: "Sign Up" },
    hero: { title: "Showcase yourself to", title_highlight: "the world", subtitle: "Create a professional portfolio in minutes and land your dream job", btn_start: "Get Started", btn_demo: "View Demo" },
    problem: { 
      badge: "Problem & Solution", title: "Why is building a website so stressful?",
      problems: [
        { title: "Hard to build", desc: "Coding and hosting take months and cost a fortune." },
        { title: "No design skills", desc: "Creating a beautiful layout isn't easy for everyone." },
        { title: "Hard to land a job", desc: "You have no single place to showcase your best work." }
      ],
      solution: "With Portfolio.uz, those issues disappear. Intuitive setup, great templates, and full automation!"
    },
    features: {
      badge: "Features", title: "Everything you need to stand out",
      items: [
        { title: "1-click generation", desc: "Register and instantly get your personal webpage without hassle." },
        { title: "Ready-made templates", desc: "Choose from a variety of modern and highly responsive templates." },
        { title: "AI-assisted generation", desc: "Artificial Intelligence writes perfect copy for your bio." },
        { title: "Custom domain", desc: "Attach your own domain (.com, .net, etc.) easily." },
        { title: "Analytics", desc: "Track visitors and see which of your projects get the most attention." }
      ]
    },
    howItWorks: {
      badge: "How it works", title: "Live in 3 easy steps",
      steps: [
        { title: "Sign up", desc: "Quickly sign up using standard authentication." },
        { title: "Fill in the blanks", desc: "Add your resume, projects, skills, and social links." },
        { title: "You're live", desc: "Done! Share your website link with recruiters immediately." }
      ]
    },
    preview: { badge: "Demo", title: "Successful Examples" },
    testimonials: {
      badge: "Testimonials", title: "What our users say?",
      items: [
        { name: "Azizbek", role: "Software Engineer", text: "Built my site in 10 mins. Got a job interview two days later!" },
        { name: "Malika", role: "UX/UI Designer", text: "The templates are amazing. It matched my minimalist aesthetic perfectly." },
        { name: "Sardor", role: "Freelancer", text: "Having my own site boosts my credibility in clients' eyes enormously." }
      ]
    },
    pricing: {
      badge: "Pricing", title: "Choose the right plan for you",
      free: { title: "Free", price: "$0", desc: "For beginners and simple needs", features: ["1 basic template", "Link: Portfolio.uz/yourname", "Basic views tracking"], btn: "Start Free" },
      pro: { title: "Pro", price: "$3/mo", desc: "Professional tools and absolute freedom", features: ["All premium templates", "Custom domain (.com, .uz)", "Advanced Analytics", "AI copywriting assistant"], btn: "Upgrade to Pro" }
    },
    cta: { title: "Create your portfolio right now", btn: "Start Now" },
    auth: {
      loginTitle: "Login to your account",
      registerTitle: "Create an account",
      email: "Email address",
      password: "Password",
      username: "Username",
      btnLogin: "Login",
      btnRegister: "Register",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      toRegister: "Register here",
      toLogin: "Login here"
    },
    dashboard: {
      nav: { home: "Home", visitors: "Visitors", messages: "Messages", certificates: "Certificates", experiences: "Experiences", projects: "Projects", cv: "CV", settings: "Settings", search: "Search..." },
      home: { 
        visits: "Total Visits", newVisitors: "New Visitors", unread: "Unread Messages", cvDownloads: "CV Downloads", 
        newsTitle: "News from creators", newsSubtitle: "About Portfolio.uz 2.0", newsText: "We increased platform speed by 40%. Details in the video above.",
        newMsgs: "New Messages", viewMsg: "View Message", allMsgs: "Go to all messages →",
        totalVisitors: "Total Visitors", allMessages: "All Messages"
      },
      visitors: {
        title: "Visitors", lineChartTitle: "Monthly visits stats", barChartTitle: "Visits by city",
        search: "Search (Email or City)...",
        colUser: "IP / Device", colDate: "Time", colCity: "City / Country", colMsg: "Page", colCV: "Method", colAction: "Action",
        btnDelete: "Delete", prev: "Prev", next: "Next", empty: "No records found",
        yes: "Yes", no: "No",
        fDateDesc: "Newest first", fDateAsc: "Oldest first",
        fCityAll: "All Cities", fMsgAll: "Message Status", fCVAll: "CV Status"
      },
      messages: {
        title: "Messages", search: "Search by name, email or text...",
        filterTitle: "Filters:",
        sortLatest: "Newest first", sortOldest: "Oldest first",
        allMessages: "All Messages", unread: "Unread", read: "Read",
        allLiked: "All (Liked)", liked: "Liked", unliked: "Unliked",
        noMessages: "No matching messages found.",
        deleteConfirm: "Are you sure you want to delete this message?",
        viewMsg: "View Message"
      },
      portfolio: {
        loading: "Loading...",
        notFoundTitle: "Page Not Found",
        notFoundDesc: "This username does not exist or the profile is private.",
        noCV: "Sorry, this user has not prepared a CV yet."
      },
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        loading: "Loading...",
        success: "Operation successful!",
        error: "An error occurred",
        noData: "No data found",
        view: "View",
        upgrade: "Upgrade to Pro",
        limitReached: "Limit reached"
      }
    }
  }
};
