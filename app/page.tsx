"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Lang = "ru" | "en" | "uz";
type FormState = { fullName: string; phone: string; email: string; position: string; message: string };

const CONTACTS = {
  phone: "+998 90 123 45 67",
  email: "hr@aurumgroup.uz",
  linkedin: "https://www.linkedin.com/company/aurum-global-group",
  address: "Tashkent, Uzbekistan",
};

const UI = {
  ru: {
    menu: ["О компании", "Проект", "Эксперты", "ESG", "HR", "Контакты"],
    cta: "Смотреть проект",
    slogan: "Добыча, за которой стоит будущее.",
    about: "О компании",
    project: "Наш проект",
    experts: "Эксперты",
    esg: "Раздел ESG",
    hr: "HR / Карьера",
    contacts: "Контакты",
    form: "Оставить анкету",
    submit: "Отправить",
    sending: "Отправка...",
    sent: "Анкета отправлена",
    error: "Не удалось отправить анкету",
    fullName: "ФИО",
    phone: "Телефон",
    email: "Почта",
    position: "Желаемая позиция",
    message: "Сообщение",
  },
  en: {
    menu: ["About", "Project", "Experts", "ESG", "HR", "Contacts"],
    cta: "View project",
    slogan: "Mining backed by the future.",
    about: "About",
    project: "Our project",
    experts: "Experts",
    esg: "ESG",
    hr: "HR / Careers",
    contacts: "Contacts",
    form: "Leave application",
    submit: "Submit",
    sending: "Sending...",
    sent: "Application sent",
    error: "Failed to send",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    position: "Position",
    message: "Message",
  },
  uz: {
    menu: ["Kompaniya", "Loyiha", "Ekspertlar", "ESG", "HR", "Kontakt"],
    cta: "Loyihani ko'rish",
    slogan: "Kelajak uchun mas'ul qazib olish.",
    about: "Kompaniya haqida",
    project: "Loyiha",
    experts: "Ekspertlar",
    esg: "ESG bo'limi",
    hr: "HR / Karyera",
    contacts: "Kontaktlar",
    form: "Anketa qoldirish",
    submit: "Yuborish",
    sending: "Yuborilmoqda...",
    sent: "Anketa yuborildi",
    error: "Yuborishda xatolik",
    fullName: "F.I.Sh.",
    phone: "Telefon",
    email: "Pochta",
    position: "Lavozim",
    message: "Xabar",
  },
} as const;

const ABOUT_PARAGRAPHS = [
  "Aurum Global Group — частная горнодобывающая компания, основанная в 2022 году и реализующая проекты на территории Южно-Тянь-Шаньского орогенического пояса — одного из богатейших золотоносных регионов мира, входящего в Золотой пояс Тянь-Шаня.",
  "Мы являемся одними из первых частных недропользователей в регионе, кто внедряет международные стандарты (JORC, NI 43-101) в разведке, оценке и разработке месторождений.",
  "Наш подход сочетает техническую строгость, стратегическую оценку ресурсов и приверженность принципам экологической и социальной ответственности.",
];

const STANDARDS = [
  "Глубокую геологическую экспертизу и современные методы анализа данных",
  "Передовые технологии разведки и моделирования (Leapfrog, спектрометрия, дистанционное зондирование, бурение с ориентацией)",
  "Комплексный подход к анализу активов, обеспечивающий снижение проектных рисков",
  "Ответственность перед природой и обществом",
];

const PROJECT_POINTS = [
  "Геологоразведка начата в апреле 2022 года",
  "Оцифровка и интерпретация существующих геоданных",
  "Более 95 000 м алмазного бурения и анализ 90 000+ кернов",
  "Запасы: 313 тыс. унций @ 1,65 г/т",
  "Ресурсы: 786 тыс. унций @ 0,71 г/т",
  "Идёт подготовка ТЭО (JORC) совместно с AMC",
];

const KINIR_STEPS = [
  "Проект разработан на основе масштабных геологоразведочных, инженерных и технических исследований.",
  "Экспертизу выполняли AMC Consultants и NewPro Consulting & Engineering Services.",
  "Пробурено около 500 скважин общей протяжённостью более 130 000 метров.",
  "В январе 2025 началась начальная фаза строительства, в мае 2025 началась вторая фаза.",
  "В проекте задействовано более 150 единиц тяжёлой техники.",
  "Используются SAP ERP и DCS Siemens для централизованного управления.",
];

const EXPERTS = [
  { name: "Richard Goldfarb", role: "Economic Geology Expert", image: "/media/gallery-1.jpg", companies: ["USGS", "Colorado School of Mines"] },
  { name: "Jeffrey Hedenquist", role: "Ore Deposit Specialist", image: "/media/gallery-2.jpg", companies: ["University of Ottawa", "Global Epithermal Projects"] },
  { name: "Pavel Mukhin", role: "Regional Geologist", image: "/media/gallery-3.jpg", companies: ["Central Asia Field Projects", "JORC Teams"] },
];

const INITIAL_FORM: FormState = { fullName: "", phone: "", email: "", position: "", message: "" };

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const t = useMemo(() => UI[lang], [lang]);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep((prev) => (prev + 1) % KINIR_STEPS.length), 5000);
    return () => clearInterval(timer);
  }, []);

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
                  {["#about", "#projects", "#experts", "#esg", "#hr", "#contacts"].map((href, i) => (
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
            <a href={`tel:${CONTACTS.phone.replace(/\s+/g, "")}`} className="hidden text-sm font-semibold text-[var(--accent-strong)] md:inline">{CONTACTS.phone}</a>
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
          <div className="relative overflow-hidden rounded-[28px] bg-[#141d2b]"><Image src="/media/hero.jpg" alt="hero" width={1920} height={1200} className="h-[62vh] min-h-[420px] w-full object-cover opacity-75" priority /><div className="hero-overlay absolute inset-0" /><div className="absolute inset-0 flex items-end p-6 md:p-10"><div className="max-w-4xl text-[#f4ecde]"><h1 className="text-5xl font-semibold md:text-7xl">Aurum Global Group</h1><p className="mt-4 text-2xl md:text-3xl">{t.slogan}</p><p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d1d8e5] md:text-lg">{ABOUT_PARAGRAPHS[0]}</p></div></div></div>
          <div className="mt-8 grid gap-5 px-4 md:grid-cols-2 md:px-8"><article className="modern-card rounded-[20px] p-5"><p className="text-2xl font-semibold text-[#11161e] md:text-3xl">2022</p><p className="mt-1 text-xs uppercase tracking-[0.09em] text-[#42516a]">{lang === "ru" ? "ГОД ОСНОВАНИЯ" : lang === "en" ? "FOUNDATION YEAR" : "TASHKIL TOPGAN YIL"}</p></article><article className="modern-card rounded-[20px] p-5"><p className="text-2xl font-semibold text-[#11161e] md:text-3xl">130 000+ м</p><p className="mt-1 text-xs uppercase tracking-[0.09em] text-[#42516a]">{lang === "ru" ? "ОБЩАЯ ПРОХОДКА БУРЕНИЯ" : lang === "en" ? "TOTAL DRILLING" : "UMUMIY BURG'ILASH"}</p></article></div>
        </section>

        <section id="about" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.about}</h2><div className="mt-5 space-y-4 text-base leading-relaxed text-[#2e3643]">{ABOUT_PARAGRAPHS.map((p) => <p key={p}>{p}</p>)}</div></article><article className="modern-card relative overflow-hidden rounded-[24px] p-7 md:p-9"><Image src="/media/project-sarybulak.jpg" alt="standards" width={1400} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-18" /><div className="absolute inset-0 bg-white/70" /><div className="relative"><h3 className="text-2xl font-semibold">{lang === "ru" ? "Мы строим новый стандарт добычи ископаемых опираясь на:" : lang === "en" ? "Our mining standard is based on:" : "Yangi standart quyidagilarga asoslanadi:"}</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#2e3643]">{STANDARDS.map((i) => <li key={i}>• {i}</li>)}</ul></div></article></div></section>

        <section id="projects" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><h2 className="section-title font-semibold">{t.project}</h2><article className="modern-card mt-8 overflow-hidden rounded-[24px] bg-white/92"><Image src="/media/project-kinir.jpg" alt="Kinir" width={1400} height={1000} className="h-72 w-full object-cover" /><div className="grid gap-6 p-6 md:p-7"><h3 className="text-3xl font-semibold">{lang === "ru" ? "Кинир (лицензия: 1452 га)" : lang === "en" ? "Kinir (license: 1452 ha)" : "Kinir (litsenziya: 1452 ga)"}</h3><ul className="mt-2 space-y-2 text-sm text-[#2e3643]">{PROJECT_POINTS.map((p) => <li key={p}>• {p}</li>)}</ul></div></article></section>

        <section id="experts" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><h2 className="section-title font-semibold">{t.experts}</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{EXPERTS.map((e) => <article key={e.name} className="modern-card overflow-hidden rounded-[20px]"><Image src={e.image} alt={e.name} width={900} height={650} className="h-48 w-full object-cover" /><div className="p-5"><h3 className="text-xl font-semibold">{e.name}</h3><p className="mt-1 text-sm text-[#566078]">{e.role}</p><ul className="mt-3 space-y-1 text-sm text-[#2e3643]">{e.companies.map((c) => <li key={c}>• {c}</li>)}</ul></div></article>)}</div></section>

        <section id="esg" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]"><div className="modern-card relative overflow-hidden rounded-[24px]"><Image src="/media/esg.jpg" alt="ESG" width={1400} height={1000} className="h-full min-h-[320px] w-full object-cover opacity-42" /><div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/82 to-white/30 p-6 md:p-8"><h2 className="section-title font-semibold text-[#1d1d1f]">{t.esg}</h2><p className="mt-4 max-w-xl text-sm text-[#3d4655] md:text-base">{lang === "ru" ? "ESG в Aurum Global Group: долгосрочное мышление — наша ценность." : lang === "en" ? "ESG at Aurum Global Group is a core value." : "Aurum Global Group uchun ESG — asosiy qadriyat."}</p></div></div><div className="grid gap-5"><article className="modern-card rounded-[20px] p-6"><h3 className="text-2xl font-semibold">{lang === "ru" ? "Экологическая ответственность" : lang === "en" ? "Environmental Responsibility" : "Ekologik mas'uliyat"}</h3><ul className="mt-3 space-y-2 text-sm text-[#2e3643] md:text-base"><li>• Безотходная разведка и цифровая съёмка</li><li>• Мониторинг водных ресурсов</li><li>• Постоянная экологическая оценка</li></ul></article><article className="modern-card rounded-[20px] p-6"><h3 className="text-2xl font-semibold">{lang === "ru" ? "Корпоративное управление" : lang === "en" ? "Corporate Governance" : "Korporativ boshqaruv"}</h3><ul className="mt-3 space-y-2 text-sm text-[#2e3643] md:text-base"><li>• JORC и международный аудит</li><li>• Внутренний контроль качества</li><li>• Прозрачная отчётность</li></ul></article></div></div></section>

        <section id="kinir" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><article className="modern-card rounded-[28px] p-8 md:p-10"><h2 className="section-title font-semibold">{lang === "ru" ? "Проект золотого рудника Кинир" : lang === "en" ? "Kinir Gold Mine Project" : "Kinir oltin koni loyihasi"}</h2><div className="mt-6 grid gap-4 md:grid-cols-3"><article className="modern-card rounded-[16px] p-4"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent-strong)]">{lang === "ru" ? "Инжиниринг" : lang === "en" ? "Engineering" : "Injiniring"}</p><p className="mt-2 text-sm text-[#2e3643]">AMC, NewPro, EFK Engineering</p></article><article className="modern-card rounded-[16px] p-4"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent-strong)]">{lang === "ru" ? "Инфраструктура" : lang === "en" ? "Infrastructure" : "Infratuzilma"}</p><p className="mt-2 text-sm text-[#2e3643]">{lang === "ru" ? "360 км кабельных линий, водоснабжение 20 км" : lang === "en" ? "360 km cable lines, 20 km water supply" : "360 km kabel liniyalari, 20 km suv ta'minoti"}</p></article><article className="modern-card rounded-[16px] p-4"><p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent-strong)]">{lang === "ru" ? "Безопасность" : lang === "en" ? "Safety" : "Xavfsizlik"}</p><p className="mt-2 text-sm text-[#2e3643]">{lang === "ru" ? "Системы ОТ и ПБ, непрерывное обучение" : lang === "en" ? "HSE systems and continuous training" : "Mehnat xavfsizligi tizimlari va doimiy trening"}</p></article></div><div className="kinir-panel mt-8 rounded-[24px] p-5 md:p-7"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#57647c]">{lang === "ru" ? "Процесс реализации" : lang === "en" ? "Implementation process" : "Amalga oshirish jarayoni"}</p><p className="text-sm font-semibold text-[#1b2434]">{activeStep + 1} / {KINIR_STEPS.length}</p></div><div className="mt-4 h-2 w-full overflow-hidden rounded-sm bg-[#d8dce4]"><div className="h-full rounded-sm bg-[var(--accent)] transition-all duration-500" style={{ width: `${((activeStep + 1) / KINIR_STEPS.length) * 100}%` }} /></div><div className="mt-4 overflow-hidden"><div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeStep * 100}%)` }}>{KINIR_STEPS.map((item, i) => <article key={item} className="min-w-full"><div className="grid gap-3 rounded-[20px] bg-white/95 p-5 md:grid-cols-[48px_1fr]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white">{i + 1}</span><p className="text-sm leading-relaxed text-[#2e3643] md:text-base">{item}</p></div></article>)}</div></div></div></article></section>

        <section id="hr" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.hr}</h2><p className="mt-4 max-w-2xl text-base text-[#2e3643]">{lang === "ru" ? "Оставьте анкету для подбора персонала." : lang === "en" ? "Submit your profile for recruitment." : "Xodimlar tanlovi uchun anketa qoldiring."}</p></article><article className="modern-card rounded-[24px] p-7 md:p-9"><h3 className="text-2xl font-semibold">{t.form}</h3><form className="mt-5 grid gap-3" onSubmit={submitForm}><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.fullName} value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} /><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.phone} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.email} type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /><input className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.position} value={form.position} onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))} /><textarea className="min-h-28 rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm" placeholder={t.message} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} /><button type="submit" disabled={submitting} className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? t.sending : t.submit}</button>{submitState === "success" ? <p className="text-sm text-green-700">{t.sent}</p> : null}{submitState === "error" ? <p className="text-sm text-red-700">{t.error}</p> : null}</form></article></div></section>

        <section id="contacts" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10"><article className="modern-card rounded-[24px] p-7 md:p-9"><h2 className="section-title font-semibold">{t.contacts}</h2><div className="mt-5 grid gap-3 text-base text-[#2e3643] md:grid-cols-2"><p><strong>{t.phone}:</strong> <a href={`tel:${CONTACTS.phone.replace(/\s+/g, "")}`} className="text-[var(--accent-strong)]">{CONTACTS.phone}</a></p><p><strong>{t.email}:</strong> <a href={`mailto:${CONTACTS.email}`} className="text-[var(--accent-strong)]">{CONTACTS.email}</a></p><p><strong>LinkedIn:</strong> <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer" className="text-[var(--accent-strong)]">Aurum Global Group</a></p><p><strong>{lang === "ru" ? "Адрес" : lang === "en" ? "Address" : "Manzil"}:</strong> {CONTACTS.address}</p></div></article></section>
      </main>

      <footer className="container-grid border-t border-[var(--border)] pt-10 pb-4 text-sm text-[#3a4250]"><p>Aurum Global Group</p></footer>
    </div>
  );
}
