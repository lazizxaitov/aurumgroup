"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Lang = "ru" | "en" | "uz";
type FormState = { fullName: string; phone: string; email: string; message: string };

const CONTACTS = {
  email: "info@aurumgroup.uz",
  hrEmail: "hr@aurumgroup.uz",
  linkedin: "https://www.linkedin.com/company/aurum-global-group",
  address: {
    ru: "Республика Узбекистан, Навоийская обл., Томдинский р-н, ул. Геологов, д. 123-а",
    en: "123 a, Geologists str., Tomdi district, Navoiy region, Republic of Uzbekistan",
    uz: "O‘zbekiston Respublikasi, Navoiy viloyati, Tomdi tumani, Geologlar ko‘chasi, 123a-uy",
  },
};

const UI = {
  ru: {
    menu: ["О компании", "Наши проекты", "Наш подход к разведке", "ESG", "HR", "Контакты"],
    cta: "Смотреть проект",
    slogan: "Добыча, за которой стоит будущее",
    about: "О компании",
    project: "Наши проекты",
    experts: "Эксперты",
    esg: "Раздел ESG",
    hr: "Карьера",
    contacts: "Контакты",
    form: "Оставить анкету",
    submit: "Отправить",
    sending: "Отправка...",
    sent: "Анкета отправлена",
    error: "Не удалось отправить анкету",
    fullName: "ФИО",
    phone: "Телефон",
    email: "Инфо",
    position: "Желаемая позиция",
    message: "Сообщение",
  },
  en: {
    menu: ["About", "Projects", "Exploration Approach", "ESG", "HR", "Contacts"],
    cta: "View project",
    slogan: "Mining backed by the future.",
    about: "About",
    project: "Projects",
    experts: "Experts",
    esg: "ESG",
    hr: "Careers",
    contacts: "Contacts",
    form: "Leave application",
    submit: "Submit",
    sending: "Sending...",
    sent: "Application sent",
    error: "Failed to send",
    fullName: "Full name",
    phone: "Phone",
    email: "Info",
    position: "Position",
    message: "Message",
  },
  uz: {
    menu: ["Kompaniya", "Loyihalar", "Razvedka yondashuvi", "ESG", "HR", "Kontakt"],
    cta: "Loyihani ko'rish",
    slogan: "Kelajak uchun mas'ul qazib olish.",
    about: "Kompaniya haqida",
    project: "Loyihalar",
    experts: "Ekspertlar",
    esg: "ESG bo'limi",
    hr: "Karyera",
    contacts: "Kontaktlar",
    form: "Anketa qoldirish",
    submit: "Yuborish",
    sending: "Yuborilmoqda...",
    sent: "Anketa yuborildi",
    error: "Yuborishda xatolik",
    fullName: "F.I.Sh.",
    phone: "Telefon",
    email: "Info",
    position: "Lavozim",
    message: "Xabar",
  },
} as const;

const CONTENT = {
  ru: {
    about: [
      "Aurum Global Group — международная частная горнодобывающая компания, основанная в 2022 году и реализующая проекты по разведке и освоению месторождений золота в Южно-Тяньшанском орогеническом поясе — одном из наиболее перспективных золотоносных регионов мира, входящем в Тяньшанский золотой пояс.",
      "Этот регион известен месторождениями мирового уровня, включая «Мурунтау» и «Кумтор», и обладает значительным потенциалом для открытия новых крупных золоторудных объектов.",
      "Компания реализует два флагманских проекта по разведке золота — «Кинир» и «Сарыбулак», применяя современные геологоразведочные технологии, передовые методы анализа данных и международные стандарты оценки минеральных ресурсов.",
      "Будучи одной из первых частных компаний-недропользователей в регионе, работающих в соответствии с международными стандартами (JORC, NI 43-101), Aurum Global Group формирует новый подход к ответственному освоению минеральных ресурсов.",
      "Наша цель — создавать устойчивую ценность, развивая природные ресурсы ответственно, эффективно и с применением лучших мировых практик.",
    ],
    standardsTitle: "Деятельность компании основана на сочетании:",
    standards: [
      "глубокой геологической экспертизы",
      "современных технологий разведки и анализа данных",
      "строгих международных стандартов отчётности",
      "принципов экологической и социальной ответственности",
    ],
    projectsTitle: "Наши проекты",
    projects: [
      {
        title: "«Кинир»",
        image: "/media/project-kinir.jpg",
        description: [
          "Проект «Кинир» является одним из ключевых активов компании.",
          "Геологоразведочные работы на участке были начаты в апреле 2022 года и включают комплексные геологические, геофизические и геохимические исследования, направленные на выявление и оценку золоторудных систем.",
          "Проект разрабатывается с применением современных технологий моделирования и анализа данных, что позволяет существенно повысить точность интерпретации геологических структур и прогнозирования минеральных ресурсов.",
        ],
      },
      {
        title: "«Сарыбулак»",
        image: "/media/project-sarybulak.jpg",
        description: [
          "Проект «Сарыбулак» является вторым стратегическим активом Aurum Global Group.",
          "Лицензия на геологоразведочные работы была получена в 2024 году, и в настоящее время компания проводит комплексную программу исследований, направленную на оценку потенциала золотоносных структур.",
        ],
      },
    ],
    explorationTitle: "Наш подход к разведке",
    explorationIntro:
      "Стратегия Aurum Global Group основана на сочетании современных технологий геологоразведки, научного анализа и международных стандартов оценки ресурсов. Мы используем интегрированный подход, включающий несколько этапов.",
    exploration: [
      {
        title: "Региональные исследования",
        points: [
          "дистанционное зондирование (ASTER, Sentinel)",
          "аэрогеофизические исследования с использованием дронов (магнитометрия, гамма-спектрометрия)",
          "анализ исторических геологических данных",
        ],
      },
      {
        title: "Детальные исследования на участках",
        points: [
          "геохимический анализ почв и пород",
          "алмазное бурение с высокой плотностью скважин",
          "структурный анализ и 3D-моделирование геологических структур (Leapfrog)",
        ],
      },
      {
        title: "Оценка минеральных ресурсов",
        points: [
          "бурение подтверждающих скважин",
          "лабораторные анализы проб (Fire Assay, ICP-MS)",
          "металлургические испытания",
        ],
      },
    ],
    explorationFooter:
      "Для повышения точности геологических моделей компания сотрудничает с ведущими международными экспертами в области геологии золоторудных месторождений.",
    experts: [
      { name: "Павел Мухин", role: "региональный геолог с большим опытом работы в Центральной Азии", image: "/media/experts/pavel-mukhin.jpg" },
      { name: "д-р Ричард Голдфарб", role: "мировой эксперт по формированию золоторудных систем", image: "/media/experts/richard-goldfarb.jpg" },
      { name: "Марк Гуссенс", role: "геофизическое картирование, исследования дистанционного зондирования", image: "/media/experts/mark-gussens.jpg" },
    ],
    esgTitle: "ESG",
    esgKey: "ESG",
    esgLetters: [
      { letter: "E", title: "Экологическая ответственность" },
      { letter: "S", title: "Безопасность и охрана труда" },
      { letter: "G", title: "Корпоративное управление" },
    ],
    esgLead: "Ответственная добыча и устойчивое развитие",
    esgIntro: [
      "В Aurum Global Group мы рассматриваем устойчивое развитие как фундамент долгосрочного успеха.",
      "Недропользование связано не только с экономикой, но и с ответственностью перед окружающей средой, обществом и будущими поколениями.",
      "Поэтому принципы ESG (Environmental, Social, Governance) интегрированы во все этапы нашей деятельности — от геологоразведки до эксплуатации и рекультивации.",
    ],
    esgBaseTitle: "ESG — основа нашей стратегии",
    esgBaseText:
      "Для Aurum Global Group принципы ESG — это не формальное требование, а основа долгосрочного устойчивого развития компании. Мы стремимся развивать минеральные ресурсы таким образом, чтобы создавать ценность для экономики, общества и окружающей среды.",
    esgBlocks: [
      {
        title: "Экологическая ответственность",
        intro: "",
        points: [
          "разведка с минимальным вмешательством в природную среду",
          "мониторинг и защита водных ресурсов",
          "постоянная экологическая оценка всех этапов проекта",
          "будущая рекультивация земель в соответствии с международными стандартами",
        ],
        footer:
          "Проект хвостохранилища разработан в соответствии с рекомендациями ICOLD, принципами BAT и стандартами ASTM, а противофильтрационная система соответствует требованиям EN/ISO, CE и GRI.",
      },
      {
        title: "Безопасность и охрана труда",
        intro: "Безопасность сотрудников и подрядчиков является безусловным приоритетом.",
        points: [
          "системы разрешений на выполнение работ",
          "комплексную оценку рисков",
          "анализ безопасности операций",
          "программы постоянного обучения персонала",
        ],
        footer: "Эти меры формируют устойчивую культуру безопасности на всех этапах реализации проектов.",
      },
      {
        title: "Корпоративное управление",
        intro:
          "Aurum Global Group придерживается высоких стандартов корпоративного управления и прозрачности. Основные принципы нашей деятельности включают:",
        points: [
          "соблюдение международных стандартов отчётности (JORC, NI 43-101)",
          "независимую экспертизу и аудит проектов",
          "системы внутреннего контроля качества",
          "прозрачность и ответственность перед партнёрами и инвесторами",
        ],
        footer: "",
      },
    ],
    kinirTitle: "Проект «Кинир»: международная экспертиза",
    kinirSteps: [
      "Проект золотого рудника «Кинир» разработан на основе масштабных геологоразведочных, инженерных и технических исследований, выполненных в соответствии с международными стандартами.",
      "Международную экспертизу проекта осуществляли ведущие мировые консультанты:",
      "AMC Consultants (Австралия) — оценка минеральных ресурсов и запасов",
      "NewPro Consulting & Engineering Services (Австралия) — базовый инжиниринг",
      "В геологической интерпретации и формировании стратегии разведки участвовали признанные специалисты отрасли:",
      "Павел Мухин — региональный геолог с большим опытом работы в Центральной Азии",
      "д-р Ричард Голдфарб — мировой эксперт по формированию золоторудных систем",
      "Геофизические исследования выполнялись при участии:",
      "Марка Гуссенса — геофизическое картирование, исследования дистанционного зондирования",
      "Лабораторные анализы проводились в соответствии с международными стандартами с постоянным контролем качества:",
      "ALS (Австралия)",
      "Xinhai Lab (Китай)",
      "Площадь лицензионного участка составляет около 1 700 гектаров.",
    ],
    kinirTechTitle: "Технологии и инфраструктура",
    kinirTechIntro: "В проекте применяются современные цифровые решения и системы управления производством.",
    kinirTechUse: "Для планирования и управления операциями используются:",
    kinirTechPoints: [
      "ERP-система SAP",
      "программное обеспечение для оптимизации горного планирования",
      "технологии дронов, GNSS и LiDAR для точных топографических моделей",
      "интегрированные платформы 3D-моделирования, объединяющие геологические, горные и инфраструктурные данные",
    ],
    kinirTechFooter:
      "Такая интеграция обеспечивает более точное планирование и повышение эффективности всех этапов разработки месторождения.",
    sectionProcess: "Процесс реализации",
  },
  en: {
    about: [
      "Aurum Global Group is an international private mining company founded in 2022 and implementing gold exploration and development projects in the South Tien Shan orogenic belt — one of the most promising gold‑bearing regions in the world, part of the Tien Shan gold belt.",
      "This region is known for world‑class deposits, including Muruntau and Kumtor, and has significant potential for discovering new large gold deposits.",
      "The company operates two flagship gold exploration projects — Kinir and Sarybulak — applying modern exploration technologies, advanced data analysis, and international mineral resource reporting standards.",
      "As one of the first private subsoil users in the region working to international standards (JORC, NI 43-101), Aurum Global Group is shaping a new approach to responsible mineral development.",
      "Our goal is to create sustainable value by developing natural resources responsibly, efficiently, and with best global practices.",
    ],
    standardsTitle: "The company’s activities are based on a combination of:",
    standards: [
      "deep geological expertise",
      "modern exploration and data analysis technologies",
      "strict international reporting standards",
      "principles of environmental and social responsibility",
    ],
    projectsTitle: "Projects",
    projects: [
      {
        title: "Kinir",
        image: "/media/project-kinir.jpg",
        description: [
          "The Kinir project is one of the company’s key assets.",
          "Exploration at the site began in April 2022 and includes comprehensive geological, geophysical, and geochemical studies aimed at identifying and evaluating gold systems.",
          "The project uses modern modeling and data analysis technologies to significantly improve the accuracy of interpreting geological structures and forecasting mineral resources.",
        ],
      },
      {
        title: "Sarybulak",
        image: "/media/project-sarybulak.jpg",
        description: [
          "The Sarybulak project is the second strategic asset of Aurum Global Group.",
          "The exploration license was obtained in 2024, and the company is currently conducting a comprehensive program to assess the potential of gold‑bearing structures.",
        ],
      },
    ],
    explorationTitle: "Our Exploration Approach",
    explorationIntro:
      "Aurum Global Group’s strategy combines modern exploration technologies, scientific analysis, and international resource reporting standards. We use an integrated approach that includes several stages.",
    exploration: [
      {
        title: "Regional Studies",
        points: [
          "remote sensing (ASTER, Sentinel)",
          "airborne geophysics using drones (magnetometry, gamma spectrometry)",
          "analysis of historical geological data",
        ],
      },
      {
        title: "Detailed Site Studies",
        points: [
          "geochemical analysis of soils and rocks",
          "high‑density diamond drilling",
          "structural analysis and 3D geological modeling (Leapfrog)",
        ],
      },
      {
        title: "Mineral Resource Evaluation",
        points: [
          "confirmation drilling",
          "laboratory assay testing (Fire Assay, ICP‑MS)",
          "metallurgical testing",
        ],
      },
    ],
    explorationFooter:
      "To improve geological model accuracy, the company collaborates with leading international experts in gold deposit geology.",
    experts: [
      { name: "Pavel Mukhin", role: "Regional geologist with extensive experience in Central Asia", image: "/media/experts/pavel-mukhin.jpg" },
      { name: "Dr. Richard Goldfarb", role: "World‑renowned expert in gold system formation", image: "/media/experts/richard-goldfarb.jpg" },
      { name: "Marc Gussens", role: "Geophysical mapping, remote sensing studies", image: "/media/experts/mark-gussens.jpg" },
    ],
    esgTitle: "ESG",
    esgKey: "ESG",
    esgLetters: [
      { letter: "E", title: "Environmental Responsibility" },
      { letter: "S", title: "Safety and Occupational Health" },
      { letter: "G", title: "Corporate Governance" },
    ],
    esgLead: "Responsible mining and sustainable development",
    esgIntro: [
      "At Aurum Global Group we see sustainable development as the foundation of long‑term success.",
      "Subsoil use is not only about economics, but also responsibility to the environment, society, and future generations.",
      "Therefore ESG principles (Environmental, Social, Governance) are integrated into every stage of our operations — from exploration to mining and reclamation.",
    ],
    esgBaseTitle: "ESG is the foundation of our strategy",
    esgBaseText:
      "For Aurum Global Group, ESG is not a formal requirement but the basis of long‑term sustainable development. We aim to develop mineral resources in a way that creates value for the economy, society, and the environment.",
    esgBlocks: [
      {
        title: "Environmental Responsibility",
        intro: "",
        points: [
          "exploration with minimal environmental disturbance",
          "monitoring and protection of water resources",
          "continuous environmental assessment throughout project stages",
          "future land reclamation in accordance with international standards",
        ],
        footer:
          "The tailings facility is designed in accordance with ICOLD recommendations, BAT principles and ASTM standards, and the seepage control system complies with EN/ISO, CE and GRI requirements.",
      },
      {
        title: "Safety and Occupational Health",
        intro: "Safety of employees and contractors is an unconditional priority.",
        points: [
          "work permit systems",
          "comprehensive risk assessment",
          "operational safety analysis",
          "continuous training programs",
        ],
        footer: "These measures create a strong safety culture at all stages of project implementation.",
      },
      {
        title: "Corporate Governance",
        intro:
          "Aurum Global Group adheres to high standards of corporate governance and transparency. Our key principles include:",
        points: [
          "compliance with international reporting standards (JORC, NI 43‑101)",
          "independent expert review and audit of projects",
          "internal quality control systems",
          "transparency and accountability to partners and investors",
        ],
        footer: "",
      },
    ],
    kinirTitle: "Kinir Project: International Expertise",
    kinirSteps: [
      "The Kinir gold mine project is based on extensive geological, engineering and technical studies conducted to international standards.",
      "International expertise for the project was provided by leading global consultants:",
      "AMC Consultants (Australia) — mineral resources and reserves assessment",
      "NewPro Consulting & Engineering Services (Australia) — basic engineering",
      "Recognized industry specialists participated in geological interpretation and exploration strategy:",
      "Pavel Mukhin — regional geologist with extensive Central Asia experience",
      "Dr. Richard Goldfarb — world‑renowned expert in gold system formation",
      "Geophysical studies were carried out with participation of:",
      "Marc Gussens — geophysical mapping and remote sensing studies",
      "Laboratory analyses were conducted to international standards with continuous QA/QC:",
      "ALS (Australia)",
      "Xinhai Lab (China)",
      "The licensed area is about 1,700 hectares.",
    ],
    kinirTechTitle: "Technologies and Infrastructure",
    kinirTechIntro: "The project applies modern digital solutions and production management systems.",
    kinirTechUse: "For planning and operations management we use:",
    kinirTechPoints: [
      "SAP ERP system",
      "mine planning optimization software",
      "drone, GNSS and LiDAR technologies for accurate topographic models",
      "integrated 3D modeling platforms combining geological, mining and infrastructure data",
    ],
    kinirTechFooter:
      "This integration enables more accurate planning and greater efficiency across all stages of mine development.",
    sectionProcess: "Implementation process",
  },
  uz: {
    about: [
      "Aurum Global Group — 2022 yilda tashkil etilgan xalqaro xususiy kon kompaniyasi bo‘lib, Janubiy Tyanshan orogenik kamarida oltin konlarini qidirish va o‘zlashtirish loyihalarini amalga oshiradi. Bu hudud Tyanshan oltin kamarining eng istiqbolli mintaqalaridan biridir.",
      "Ushbu hudud «Muruntau» va «Kumtor» kabi jahon darajasidagi konlari bilan mashhur va yirik yangi oltin konlarini kashf etish salohiyatiga ega.",
      "Kompaniya «Kinir» va «Sarybulak» nomli ikki flagman loyihani zamonaviy geologik-qidiruv texnologiyalari, ilg‘or ma’lumotlar tahlili va xalqaro resurs baholash standartlari asosida olib bormoqda.",
      "Mintaqada JORC va NI 43-101 kabi xalqaro standartlarga muvofiq ishlayotgan ilk xususiy yer qa’ri foydalanuvchilardan biri sifatida Aurum Global Group mas’uliyatli o‘zlashtirishning yangi yondashuvini shakllantiradi.",
      "Maqsadimiz — tabiiy resurslarni mas’uliyatli, samarali va eng yaxshi jahon amaliyotlari asosida rivojlantirib, barqaror qiymat yaratish.",
    ],
    standardsTitle: "Kompaniya faoliyati quyidagi omillarga tayanadi:",
    standards: [
      "chuqur geologik ekspertiza",
      "zamonaviy qidiruv va ma’lumotlar tahlili texnologiyalari",
      "qat’iy xalqaro hisobot standartlari",
      "ekologik va ijtimoiy mas’uliyat tamoyillari",
    ],
    projectsTitle: "Loyihalar",
    projects: [
      {
        title: "Kinir",
        image: "/media/project-kinir.jpg",
        description: [
          "«Kinir» loyihasi kompaniyaning asosiy aktivlaridan biridir.",
          "Uchastkada geologik-qidiruv ishlari 2022 yil aprelida boshlangan bo‘lib, oltin tizimlarini aniqlash va baholashga qaratilgan kompleks geologik, geofizik va geokimyoviy tadqiqotlarni o‘z ichiga oladi.",
          "Loyiha zamonaviy modellashtirish va ma’lumotlarni tahlil qilish texnologiyalari asosida olib borilib, geologik tuzilmalarni talqin qilish va mineral resurslarni prognozlash aniqligini sezilarli oshiradi.",
        ],
      },
      {
        title: "Sarybulak",
        image: "/media/project-sarybulak.jpg",
        description: [
          "«Sarybulak» loyihasi Aurum Global Group’ning ikkinchi strategik aktividir.",
          "Geologik-qidiruv litsenziyasi 2024 yilda olingan va hozirda kompaniya oltinli tuzilmalarning salohiyatini baholashga qaratilgan kompleks dasturini amalga oshirmoqda.",
        ],
      },
    ],
    explorationTitle: "Razvedka yondashuvi",
    explorationIntro:
      "Aurum Global Group strategiyasi zamonaviy geologik-qidiruv texnologiyalari, ilmiy tahlil va resurslarni baholash bo‘yicha xalqaro standartlar uyg‘unligiga asoslanadi. Biz bir necha bosqichdan iborat integratsiyalashgan yondashuvni qo‘llaymiz.",
    exploration: [
      {
        title: "Mintaqaviy tadqiqotlar",
        points: [
          "masofaviy zondlash (ASTER, Sentinel)",
          "dronlar yordamida aerogeofizik tadqiqotlar (magnitometriya, gamma-spektrometriya)",
          "tarixiy geologik ma’lumotlarni tahlil qilish",
        ],
      },
      {
        title: "Uchastkalarda batafsil tadqiqotlar",
        points: [
          "tuproq va jinslarning geokimyoviy tahlili",
          "yuqori zichlikdagi olmos burg‘ilash",
          "geologik tuzilmalarni struktur tahlili va 3D modellashtirish (Leapfrog)",
        ],
      },
      {
        title: "Mineral resurslarni baholash",
        points: [
          "tasdiqlovchi burg‘ilash",
          "laboratoriya tahlillari (Fire Assay, ICP‑MS)",
          "metallurgik sinovlar",
        ],
      },
    ],
    explorationFooter:
      "Geologik modellar aniqligini oshirish uchun kompaniya oltin konlari geologiyasi bo‘yicha yetakchi xalqaro ekspertlar bilan hamkorlik qiladi.",
    experts: [
      { name: "Pavel Mukhin", role: "Markaziy Osiyoda katta tajribaga ega mintaqaviy geolog", image: "/media/experts/pavel-mukhin.jpg" },
      { name: "Dr. Richard Goldfarb", role: "oltin tizimlari shakllanishi bo‘yicha jahon eksperti", image: "/media/experts/richard-goldfarb.jpg" },
      { name: "Marc Gussens", role: "geofizik xaritalash va masofaviy zondlash tadqiqotlari", image: "/media/experts/mark-gussens.jpg" },
    ],
    esgTitle: "ESG",
    esgKey: "ESG",
    esgLetters: [
      { letter: "E", title: "Ekologik mas’uliyat" },
      { letter: "S", title: "Xavfsizlik va mehnat muhofazasi" },
      { letter: "G", title: "Korporativ boshqaruv" },
    ],
    esgLead: "Mas’uliyatli qazib olish va barqaror rivojlanish",
    esgIntro: [
      "Aurum Global Group barqaror rivojlanishni uzoq muddatli muvaffaqiyatning asosi deb biladi.",
      "Yer qa’ri boyliklaridan foydalanish nafaqat iqtisod, balki atrof‑muhit, jamiyat va kelajak avlodlar oldidagi mas’uliyatdir.",
      "Shu bois ESG (Environmental, Social, Governance) tamoyillari faoliyatimizning barcha bosqichlariga — razvedkadan to ekspluatatsiya va rekultivatsiyagacha — integratsiya qilingan.",
    ],
    esgBaseTitle: "ESG — strategiyamizning asosi",
    esgBaseText:
      "Aurum Global Group uchun ESG — bu formal talab emas, balki uzoq muddatli barqaror rivojlanishning asosi. Biz resurslarni iqtisod, jamiyat va atrof‑muhit uchun qiymat yaratadigan tarzda rivojlantirishga intilamiz.",
    esgBlocks: [
      {
        title: "Ekologik mas’uliyat",
        intro: "",
        points: [
          "tabiatga minimal aralashuv bilan razvedka",
          "suv resurslarini monitoring qilish va himoya qilish",
          "loyiha bosqichlarida doimiy ekologik baholash",
          "xalqaro standartlarga muvofiq kelajakdagi rekultivatsiya",
        ],
        footer:
          "Xvostoxranilish loyihasi ICOLD tavsiyalari, BAT tamoyillari va ASTM standartlariga muvofiq ishlab chiqilgan, filtrga qarshi tizim esa EN/ISO, CE va GRI talablariga mos.",
      },
      {
        title: "Xavfsizlik va mehnat muhofazasi",
        intro: "Xodimlar va pudratchilar xavfsizligi mutlaq ustuvorlikdir.",
        points: [
          "ish ruxsatnomalari tizimlari",
          "xatarlarni kompleks baholash",
          "operatsion xavfsizlik tahlillari",
          "doimiy o‘quv dasturlari",
        ],
        footer: "Bu chora‑tadbirlar loyiha amalga oshirishning barcha bosqichlarida barqaror xavfsizlik madaniyatini yaratadi.",
      },
      {
        title: "Korporativ boshqaruv",
        intro:
          "Aurum Global Group korporativ boshqaruv va shaffoflikning yuqori standartlariga amal qiladi. Asosiy tamoyillar:",
        points: [
          "xalqaro hisobot standartlariga rioya (JORC, NI 43‑101)",
          "loyihalarning mustaqil ekspertizasi va auditi",
          "ichki sifat nazorati tizimlari",
          "hamkorlar va investorlar oldida shaffoflik va javobgarlik",
        ],
        footer: "",
      },
    ],
    kinirTitle: "«Kinir» loyihasi: xalqaro ekspertiza",
    kinirSteps: [
      "«Kinir» oltin koni loyihasi xalqaro standartlarga muvofiq amalga oshirilgan keng ko‘lamli geologik, muhandislik va texnik tadqiqotlar asosida ishlab chiqilgan.",
      "Loyihaning xalqaro ekspertizasini yetakchi global konsalting kompaniyalari amalga oshirgan:",
      "AMC Consultants (Avstraliya) — mineral resurs va zaxiralarni baholash",
      "NewPro Consulting & Engineering Services (Avstraliya) — bazaviy injiniring",
      "Geologik talqin va razvedka strategiyasini shakllantirishda quyidagi mutaxassislar ishtirok etgan:",
      "Pavel Mukhin — Markaziy Osiyoda katta tajribaga ega mintaqaviy geolog",
      "Dr. Richard Goldfarb — oltin tizimlari shakllanishi bo‘yicha jahon eksperti",
      "Geofizik tadqiqotlar quyidagilar ishtirokida amalga oshirilgan:",
      "Marc Gussens — geofizik xaritalash va masofaviy zondlash tadqiqotlari",
      "Laboratoriya tahlillari xalqaro standartlar va doimiy sifat nazorati bilan bajarilgan:",
      "ALS (Avstraliya)",
      "Xinhai Lab (Xitoy)",
      "Litsenziya maydoni taxminan 1 700 gektarni tashkil etadi.",
    ],
    kinirTechTitle: "Texnologiyalar va infratuzilma",
    kinirTechIntro: "Loyihada zamonaviy raqamli yechimlar va ishlab chiqarishni boshqarish tizimlari qo‘llaniladi.",
    kinirTechUse: "Rejalashtirish va operatsiyalarni boshqarishda quyidagilar ishlatiladi:",
    kinirTechPoints: [
      "SAP ERP tizimi",
      "kon rejalashtirishni optimallashtirish dasturi",
      "dron, GNSS va LiDAR texnologiyalari orqali aniq topografik modellar",
      "geologik, tog‘-kon va infratuzilma ma’lumotlarini birlashtiruvchi 3D modellashtirish platformalari",
    ],
    kinirTechFooter:
      "Bunday integratsiya rejalashtirish aniqligini oshiradi va konni o‘zlashtirishning barcha bosqichlarida samaradorlikni ko‘paytiradi.",
    sectionProcess: "Amalga oshirish jarayoni",
  },
} as const;

const INITIAL_FORM: FormState = { fullName: "", phone: "", email: "", message: "" };

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const t = useMemo(() => UI[lang], [lang]);
  const content = useMemo(() => CONTENT[lang], [lang]);



  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitState("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language: lang }),
      });
      if (!res.ok) throw new Error("fail");
      setForm(INITIAL_FORM);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(245,245,247,0.95)] backdrop-blur-xl">
        <div className="container-grid relative flex items-center justify-between gap-3 py-3">
          <div className="relative">
            <button type="button" onClick={() => setMenuOpen((p) => !p)} className="flex h-11 w-11 items-center justify-center rounded-md bg-white/90" aria-label="menu" aria-expanded={menuOpen}>
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 bg-[#1d1d1f] transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-[#1d1d1f] transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-[#1d1d1f] transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
            {menuOpen ? (
              <div className="absolute left-0 top-13 z-50 min-w-64 rounded-xl border border-[var(--border)] bg-white p-2">
                <nav className="grid gap-1">
                  {["#about", "#projects", "#exploration", "#esg", "#hr", "#contacts"].map((href, i) => (
                    <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-[#1d1d1f] hover:bg-[var(--accent-soft)]">{t.menu[i]}</a>
                  ))}
                </nav>
              </div>
            ) : null}
          </div>

          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
            <Image src="/media/logo.png" alt="Aurum Global Group logo" width={160} height={48} className="h-11 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-white/90 p-1">
              {(["ru", "en", "uz"] as Lang[]).map((code) => (
                <button key={code} type="button" onClick={() => setLang(code)} className={`rounded px-2 py-1 text-xs font-semibold ${lang === code ? "bg-[var(--accent)] text-white" : "text-[#3a3a3c]"}`}>{code.toUpperCase()}</button>
              ))}
            </div>
            <a href="#projects" className="premium-cta grid h-10 w-10 place-items-center rounded-md md:h-auto md:w-auto md:px-4 md:py-2 md:text-sm md:font-semibold" aria-label={t.cta}>
              <svg className="h-4 w-4 md:hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="hidden md:inline">{t.cta}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="space-y-2">
        <section className="container-grid pt-4 pb-2 md:pt-6 md:pb-4">
          <div className="relative overflow-hidden rounded-[28px] bg-[#141d2b]"><Image src="/media/hero.jpg" alt="hero" width={1920} height={1200} className="h-[62vh] min-h-[420px] w-full object-cover opacity-75" priority /><div className="hero-overlay absolute inset-0" /><div className="absolute inset-0 flex items-end p-6 md:p-10"><div className="max-w-4xl text-[#f4ecde]"><h1 className="text-5xl font-semibold md:text-7xl">Aurum Global Group</h1><p className="mt-4 text-2xl md:text-3xl">{t.slogan}</p><p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d1d8e5] md:text-lg">{content.about[0]}</p></div></div></div>
          <div className="mt-8 px-4 md:px-8" />
        </section>

        <section id="about" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><div className="grid gap-8"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.about}</h2><div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#424b5c]"><span>2022</span><span className="h-1 w-1 rounded-full bg-[var(--accent)]" /><span>{lang === "ru" ? "ГОД ОСНОВАНИЯ" : lang === "en" ? "FOUNDATION YEAR" : "TASHKIL TOPGAN YIL"}</span></div><div className="mt-5 space-y-4 text-base leading-relaxed text-[#2e3643]">{content.about.map((p) => <p key={p}>{p}</p>)}</div></article><article className="modern-card relative overflow-hidden rounded-[24px] p-7 md:p-9"><Image src="/media/project-sarybulak.jpg" alt="standards" width={1400} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-18" /><div className="absolute inset-0 bg-white/70" /><div className="relative"><h3 className="text-2xl font-semibold">{content.standardsTitle}</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#2e3643]">{content.standards.map((i) => <li key={i}>• {i}</li>)}</ul></div></article></div></section>

        <section id="projects" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><h2 className="section-title font-semibold">{content.projectsTitle}</h2><div className="mt-7 grid gap-6 md:grid-cols-2">{content.projects.map((project) => <article key={project.title} className="modern-card overflow-hidden rounded-[24px] bg-white/92"><Image src={project.image} alt={project.title} width={1400} height={1000} className="h-56 w-full object-cover" /><div className="grid gap-4 p-6 md:p-7"><h3 className="text-2xl font-semibold">{project.title}</h3><div className="space-y-3 text-sm text-[#2e3643]">{project.description.map((p) => <p key={p}>{p}</p>)}</div></div></article>)}</div></section>

        <section id="exploration" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><h2 className="section-title font-semibold">{content.explorationTitle}</h2><p className="mt-4 max-w-4xl text-base text-[#2e3643]">{content.explorationIntro}</p><div className="mt-6 grid gap-5 md:grid-cols-3">{content.exploration.map((item) => <article key={item.title} className="modern-card rounded-[20px] p-6"><h3 className="text-xl font-semibold">{item.title}</h3><ul className="mt-3 space-y-2 text-sm text-[#2e3643]">{item.points.map((p) => <li key={p}>• {p}</li>)}</ul></article>)}</div><p className="mt-5 max-w-4xl text-base text-[#2e3643]">{content.explorationFooter}</p></section>

        <section id="experts" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><h2 className="section-title font-semibold">{t.experts}</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{content.experts.map((e) => <article key={e.name} className="modern-card overflow-hidden rounded-[20px]"><Image src={e.image} alt={e.name} width={900} height={650} className="h-48 w-full object-cover" /><div className="p-5"><h3 className="text-xl font-semibold">{e.name}</h3><p className="mt-1 text-sm text-[#566078]">{e.role}</p></div></article>)}</div></section>

        <section id="esg" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <div className="grid gap-8">
            <div className="modern-card relative overflow-hidden rounded-[24px]">
              <Image src="/media/esg.jpg" alt="ESG" width={1400} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-42" />
              <div className="relative bg-gradient-to-t from-white/95 via-white/82 to-white/30 p-6 md:p-8">
                <h2 className="section-title font-semibold text-[#1d1d1f]">{content.esgTitle}</h2>
                <p className="mt-4 text-sm font-semibold text-[#1d1d1f] md:text-base">{content.esgLead}</p>
                {content.esgIntro.map((p) => (
                  <p key={p} className="mt-3 max-w-4xl text-sm text-[#3d4655] md:text-base">{p}</p>
                ))}
                <p className="mt-4 text-sm font-semibold text-[#1d1d1f] md:text-base">{content.esgBaseTitle}</p>
                <p className="mt-3 max-w-4xl text-sm text-[#3d4655] md:text-base">{content.esgBaseText}</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">{content.esgBlocks.map((block, index) => (
              <article key={block.title} className="modern-card rounded-[20px] p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                    {content.esgLetters[index]?.letter ?? content.esgKey}
                  </span>
                  <h3 className="text-xl font-semibold">{block.title}</h3>
                </div>
                {block.intro ? <p className="mt-3 text-sm text-[#2e3643] md:text-base">{block.intro}</p> : null}
                <ul className="mt-3 space-y-2 text-sm text-[#2e3643] md:text-base">{block.points.map((p) => <li key={p}>• {p}</li>)}</ul>
                {block.footer ? <p className="mt-3 text-sm text-[#2e3643] md:text-base">{block.footer}</p> : null}
              </article>
            ))}</div>
          </div>
        </section>

        <section id="kinir" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><article className="modern-card rounded-[28px] p-8 md:p-10"><h2 className="section-title font-semibold">{content.kinirTitle}</h2><div className="mt-6"><article className="modern-card rounded-[20px] p-6"><h3 className="text-2xl font-semibold">{content.kinirTechTitle}</h3><p className="mt-3 text-sm text-[#2e3643] md:text-base">{content.kinirTechIntro}</p><p className="mt-3 text-sm text-[#2e3643] md:text-base">{content.kinirTechUse}</p><ul className="mt-3 space-y-2 text-sm text-[#2e3643] md:text-base">{content.kinirTechPoints.map((p) => <li key={p}>• {p}</li>)}</ul><p className="mt-3 text-sm text-[#2e3643] md:text-base">{content.kinirTechFooter}</p></article></div></article></section>

        <section id="hr" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.hr}</h2><p className="mt-4 max-w-2xl text-lg text-[#2e3643] md:text-xl">{lang === "ru" ? "Оставьте анкету для подбора персонала." : lang === "en" ? "Submit your profile for recruitment." : "Xodimlar tanlovi uchun anketa qoldiring."}</p><p className="mt-4 max-w-2xl text-base text-[#2e3643] md:text-lg">{lang === "ru" ? "Для подробной информации можете обратиться по почте:" : lang === "en" ? "For detailed information, please contact us by email:" : "Batafsil ma'lumot uchun elektron pochta orqali murojaat qiling:"} <a href={`mailto:${CONTACTS.hrEmail}`} className="font-semibold text-[var(--accent-strong)]">{CONTACTS.hrEmail}</a></p></article><article className="modern-card rounded-[24px] p-7 md:p-9"><h3 className="text-2xl font-semibold">{t.form}</h3><form className="mt-5 grid gap-3" onSubmit={submitForm}><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.fullName} value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} /><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.phone} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.email} type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /><textarea className="min-h-28 rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.message} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} /><button type="submit" disabled={submitting} className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? t.sending : t.submit}</button>{submitState === "success" ? <p className="text-sm text-green-700">{t.sent}</p> : null}{submitState === "error" ? <p className="text-sm text-red-700">{t.error}</p> : null}</form></article></div></section>

        <section id="contacts" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.contacts}</h2><div className="mt-5 grid gap-3 text-base text-[#2e3643] md:grid-cols-2"><p><strong>{t.email}:</strong> <a href={`mailto:${CONTACTS.email}`} className="text-[var(--accent-strong)]">{CONTACTS.email}</a></p><p><strong>LinkedIn:</strong> <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer" className="text-[var(--accent-strong)]">Aurum Global Group</a></p><p><strong>{lang === "ru" ? "Адрес" : lang === "en" ? "Address" : "Manzil"}:</strong> {CONTACTS.address[lang]}</p></div></article></section>
      </main>

      <footer className="container-grid border-t border-[var(--border)] pt-10 pb-4 text-sm text-[#3a4250]"><p>Aurum Global Group</p></footer>
    </div>
  );
}
