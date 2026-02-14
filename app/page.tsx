"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

export default function Home() {
  const navItems = [
    { href: "#about", label: "О компании" },
    { href: "#projects", label: "Проекты" },
    { href: "#gallery", label: "Галерея" },
    { href: "#exploration", label: "Разведка" },
    { href: "#esg", label: "ESG" },
    { href: "#kinir", label: "Кинир" },
  ];

  const aboutParagraphs = [
    "Aurum Global Group — частная горнодобывающая компания, основанная в 2022 году и реализующая проекты на территории Южно-Тянь-Шаньского орогенического пояса — одного из богатейших золотоносных регионов мира, входящего в Золотой пояс Тянь-Шаня.",
    "Мы являемся одними из первых частных недропользователей в регионе, кто внедряет международные стандарты (JORC, NI 43-101) в разведке, оценке и разработке месторождений.",
    "Наш подход сочетает техническую строгость, стратегическую оценку ресурсов и приверженность принципам экологической и социальной ответственности.",
  ];

  const standards = [
    "Глубокую геологическую экспертизу и современные методы анализа данных",
    "Передовые технологии разведки и моделирования (Leapfrog, спектрометрия, дистанционное зондирование, бурение с ориентацией)",
    "Комплексный подход к анализу активов, обеспечивающий снижение проектных рисков",
    "Ответственность перед природой и обществом",
  ];

  const kpi = [
    { value: "2022", label: "ГОД ОСНОВАНИЯ" },
    { value: "130 000+ м", label: "ОБЩАЯ ПРОХОДКА БУРЕНИЯ" },
    { value: "$110 млн", label: "ИНВЕСТИЦИИ В КИНИР" },
    { value: "2,3 млн т/год", label: "ПЕРЕРАБОТКА РУДЫ" },
  ];

  const projects = [
    {
      title: "Кинир (лицензия: 1452 га)",
      image: "/media/project-kinir.jpg",
      summary:
        "Геологоразведка начата в апреле 2022 года. Выполнен полный цикл разведочных, модельных и инженерных работ по международным стандартам.",
      points: [
        "Геологоразведка начата в апреле 2022 года",
        "Оцифровка и интерпретация существующих геоданных",
        "Детальная геология, топосъёмка, магнитная съёмка (дроны), IP-исследования",
        "Более 95 000 м алмазного бурения и анализ 90 000+ кернов",
        "Построена 3D модель и отчёт по запасам в соответствии с JORC (AMC Consultants)",
        "Запасы: 313 тыс. унций @ 1,65 г/т",
        "Ресурсы: 786 тыс. унций @ 0,71 г/т",
        "Идёт подготовка ТЭО (JORC) совместно с AMC",
      ],
      production: [
        "Начало строительства ЗИФ: март 2025",
        "Запуск: декабрь 2025",
        "Объём переработки: 2,3 млн тонн руды/год",
        "Получаемая продукция: золоторудное сырье и медный концентрат",
        "Инвестиции: $110 млн",
      ],
    },
    {
      title: "Сарыбулак (лицензия: 787 га)",
      image: "/media/project-sarybulak.jpg",
      summary:
        "Лицензия получена в 2024 году. Участок проходит этап подтверждения потенциала с подготовкой 3D-модели и ТЭО.",
      points: [
        "Лицензия получена в 2024 году",
        "Первичные геофизические и геохимические исследования завершены",
        "Выполнено более 8700 м разведочного бурения",
        "3D-модель и ТЭО в разработке (AMC)",
        "Перспективное орогенное золоторудное месторождение",
      ],
      production: [],
    },
  ];

  const explorationSections = [
    {
      title: "1. Региональное картирование",
      items: [
        "Дроны (магнитометрия, гамма-спектрометрия)",
        "Дистанционное зондирование (ASTER, Sentinel)",
        "Анализ исторических геоданных",
      ],
    },
    {
      title: "2. Работа на участках",
      items: [
        "Геохимия почвы и пород",
        "Алмазное бурение с высокой плотностью",
        "Структурный анализ и 3D моделирование (Leapfrog)",
      ],
    },
    {
      title: "3. Оценка ресурсов",
      items: [
        "Бурение подтверждающих скважин",
        "Лабораторные анализы (FA, ICP-MS)",
        "Металлургические испытания",
      ],
    },
  ];

  const esgEnvironment = [
    "Безотходная разведка, цифровая съёмка и бурение с минимальным вмешательством",
    "Мониторинг и охрана водных ресурсов",
    "Постоянная экологическая оценка всех этапов проекта",
    "Будущая рекультивация земель по международным стандартам",
  ];

  const esgGovernance = [
    "Соблюдение норм JORC и международного аудита",
    "Системы внутреннего контроля качества",
    "Полная прозрачность на всех этапах отчётности",
  ];

  const galleryImages = [
    { src: "/media/gallery-1.jpg", alt: "Промышленная площадка 1" },
    { src: "/media/gallery-2.jpg", alt: "Промышленная площадка 2" },
    { src: "/media/gallery-3.jpg", alt: "Промышленная площадка 3" },
    { src: "/media/gallery-4.jpg", alt: "Промышленная площадка 4" },
    { src: "/media/project-kinir.jpg", alt: "Кинир: объект строительства" },
    { src: "/media/project-sarybulak.jpg", alt: "Сарыбулак: вид с дрона" },
  ];

  const kinirNarrative = [
    "Проект золотого рудника Кинир был разработан на основе масштабных геологоразведочных, инженерных и технических исследований, выполненных в соответствии с международно признанными стандартами.",
    "Международную экспертизу проекта осуществляли ведущие мировые консультанты: AMC Consultants (Австралия) — по оценке минеральных ресурсов и запасов, и NewPro Consulting & Engineering Services (Австралия) — по базовому инжинирингу.",
    "В разработке проекта также принимали участие признанные эксперты в области геологии. Павел Мухин, ведущий региональный геолог с обширным опытом работы в Центральной Азии, и доктор Ричард Голдфарб, всемирно известный специалист по формированию месторождений золота, участвовали в геологической интерпретации, формировании стратегии разведки и уточнении модели минеральных ресурсов.",
    "В поддержку геологических работ были выполнены геофизические и дистанционные исследования. Майк Секстон из Planetary Geophysics (Австралия) провёл геофизическое картирование, а Марк Гуссенс выполнил исследования с применением дистанционного зондирования.",
    "На сегодняшний день на месторождении пробурено около 500 скважин общей протяжённостью более 130 000 метров, что позволило определить и подтвердить минеральные ресурсы и запасы руды. Оценка ресурсов и запасов была подготовлена компанией AMC Consultants (Австралия) в соответствии с кодексом JORC.",
    "Параллельно аудит проекта был выполнен компанией RSM, бизнес-план разработан совместно с PwC, а поддержку в финансировании проекта оказал Halyk Bank.",
    "Лабораторный анализ проб проводился в соответствии с международными стандартами с постоянным контролем качества. Металлургические испытания были выполнены компаниями ALS (Австралия) и Xinhai Lab (Китай).",
    "На основании полученных результатов компания NewPro Consulting & Engineering Services разработала технологическую схему и определила основные проектные решения, а компания EFK Engineering (Турция) выполнила детальное проектирование.",
    "После получения всех необходимых разрешений в январе 2025 года проект перешёл в начальную фазу со строительством лагеря. В мае 2025 года была начата вторая фаза, включающая строительство золотоизвлекательной фабрики.",
    "Генеральным подрядчиком проекта выступила Discover Invest при участии международных и локальных компаний, включая EREN Technic Heavy Industries, KONMONT, Bir İnşaat, Dal Heavy Industries, Dal Electric, Pit Works, а также узбекские компании Minex, TAN GROUP, Nextport Logistics и Silver Tulp.",
    "В реализации проекта задействовано более 150 единиц тяжёлой горнодобывающей техники, поставляемой преимущественно компаниями Caterpillar, MAN и Mercedes.",
    "Площадь лицензионного участка составляет около 1 700 гектаров. Проектируемый открытый карьер имеет протяжённость порядка 1,6 километра, ширину 1,7 километра и глубину около 250 метров.",
    "Хвостохранилище спроектировано компанией VIA Engineering (Турция) с общей проектной вместимостью 6 миллионов кубических метров и реализуется в две очереди строительства. Проект соответствует рекомендациям ICOLD, принципам BAT и стандартам ASTM, а противофильтрационная система смонтирована компанией Haoyang Environmental (Китай) в соответствии с требованиями стандартов EN/ISO, CE и GRI.",
    "Экологическая безопасность является ключевым приоритетом проекта. Отчёт об исходных условиях подготовлен компанией Reviver Consulting (Турция), а очистные сооружения для биологических отходов спроектированы компанией ENV Energy.",
    "На всём проекте внедрены комплексные системы управления охраной труда и промышленной безопасностью, включая системы разрешений на работу, оценки рисков, анализы безопасности операций и постоянные программы обучения, формирующие устойчивую культуру безопасности.",
    "Электроэнергетическая инфраструктура предприятия построена на базе трансформаторов Hitachi Energy и центров управления двигателями ABB (MCC). Проектирование и монтаж электрораспределительных систем выполнены компанией DAL Electric Automation (Турция). В рамках проекта проложено 360 километров кабельных линий электроснабжения. Также создана система водоснабжения с подачей воды на расстояние 20 километров и внедрена замкнутая циркуляционная система с минимальными потерями воды.",
    "Автоматизация и приборное оснащение предприятия в основном поставлены компанией Siemens, а централизованное управление осуществляется через распределённую систему управления DCS Siemens, спроектированную и внедрённую компанией Pacpro (Турция). Система обеспечивает мониторинг процессов в реальном времени, оптимизацию параметров и устойчивую работу предприятия.",
    "В производстве используется система SAP в качестве ERP-платформы для управления техническим обслуживанием, закупками, запасами, контролем затрат и финансовой отчётностью. Программное обеспечение для планирования горных работ оптимизирует проектирование карьера и использование оборудования, а технологии дронов, GNSS и LiDAR обеспечивают точные топографические модели и мониторинг операций в реальном времени.",
    "В рамках стратегии устойчивого развития предусмотрена установка солнечных панелей общей мощностью более 14 МВт·ч, что позволит снизить энергопотребление и повысить эффективность производства.",
    "Для интеграции проектных решений применяются платформы 3D-моделирования, объединяющие геологические, горные, перерабатывающие и инфраструктурные данные. Управление сроками и критическим путём осуществляется с использованием Primavera, а планирование задач и контроль прогресса — через Jira.",
  ];

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];
  const [activeKinirStep, setActiveKinirStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const goKinirPrev = () =>
    setActiveKinirStep((prev) => (prev - 1 + kinirNarrative.length) % kinirNarrative.length);
  const goKinirNext = () => setActiveKinirStep((prev) => (prev + 1) % kinirNarrative.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveKinirStep((prev) => (prev + 1) % kinirNarrative.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [kinirNarrative.length]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(245,245,247,0.9)] backdrop-blur-xl">
        <div className="container-grid relative flex items-center justify-between gap-4 py-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="group flex h-11 w-11 items-center justify-center rounded-md bg-white/85"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute top-0 left-0 h-0.5 w-5 bg-[#1d1d1f] transition ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute top-[7px] left-0 h-0.5 w-5 bg-[#1d1d1f] transition ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-[14px] left-0 h-0.5 w-5 bg-[#1d1d1f] transition ${
                    menuOpen ? "translate-y-[-7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            {menuOpen ? (
              <div className="absolute top-13 left-0 z-50 min-w-60 rounded-xl border border-[var(--border)] bg-white/96 p-2 backdrop-blur-xl">
                <nav className="grid gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-[#1d1d1f] transition hover:bg-[var(--accent-soft)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            ) : null}
          </div>

          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
            <Image src="/media/logo.png" alt="Aurum Global Group logo" width={154} height={48} className="h-11 w-auto object-contain" />
          </div>

          <div className="flex justify-end">
            <a
              href="#projects"
              className="premium-cta grid h-10 w-10 place-items-center rounded-md md:h-auto md:w-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
              aria-label="Смотреть проекты"
            >
              <svg
                className="h-4 w-4 md:hidden"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden md:inline">Смотреть проекты</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative space-y-2 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/media/gallery-1.jpg"
            alt=""
            width={900}
            height={700}
            className="absolute top-[14%] -left-28 hidden h-[320px] w-[420px] rounded-[28px] object-cover opacity-14 saturate-110 md:block"
            aria-hidden
          />
          <Image
            src="/media/gallery-3.jpg"
            alt=""
            width={900}
            height={700}
            className="absolute top-[44%] -right-24 hidden h-[360px] w-[460px] rounded-[30px] object-cover opacity-12 saturate-110 md:block"
            aria-hidden
          />
          <Image
            src="/media/gallery-4.jpg"
            alt=""
            width={900}
            height={700}
            className="absolute bottom-[8%] left-[14%] hidden h-[300px] w-[420px] rounded-[26px] object-cover opacity-10 saturate-110 lg:block"
            aria-hidden
          />
        </div>
        <section className="container-grid pt-4 pb-2 md:pt-6 md:pb-4">
          <div className="reveal relative overflow-hidden rounded-[28px] bg-[#141d2b]">
            <Image
              src="/media/hero.jpg"
              alt="Промышленный пейзаж"
              width={1920}
              height={1200}
              className="h-[62vh] min-h-[420px] w-full object-cover opacity-75 saturate-110 contrast-110"
              priority
            />
            <div className="hero-overlay absolute inset-0" />
            <div className="absolute inset-0 flex items-end p-6 md:p-10">
              <div className="max-w-4xl text-[#f4ecde]">
                <h1 className="mt-5 text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl">Aurum Global Group</h1>
                <p className="mt-4 text-2xl md:text-3xl">Добыча, за которой стоит будущее.</p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d1d8e5] md:text-lg">{aboutParagraphs[0]}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 px-4 md:grid-cols-4 md:px-8">
            {kpi.map((item) => (
              <article key={item.label} className="modern-card rounded-[20px] p-5 backdrop-blur">
                <p className="text-2xl font-semibold text-[#11161e] md:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.09em] text-[#42516a]">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <article className="modern-card reveal relative overflow-hidden rounded-[24px] p-7 md:p-9">
              <Image
                src="/media/gallery-2.jpg"
                alt="Фон о компании"
                width={1400}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-white/86" />
              <div className="relative">
                <h2 className="section-title font-semibold">О компании</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#2e3643]">
                  {aboutParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
            <article
              className="modern-card reveal relative overflow-hidden rounded-[24px] p-7 md:p-9"
              style={{ "--reveal-delay": "90ms" } as CSSProperties}
            >
              <Image
                src="/media/project-sarybulak.jpg"
                alt="Производственные мощности"
                width={1400}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover opacity-25 saturate-110"
              />
              <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]" />
              <div className="relative">
                <h3 className="text-2xl font-semibold">Мы строим новый стандарт добычи ископаемых опираясь на:</h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#2e3643]">
                  {standards.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <h2 className="section-title font-semibold">Наши проекты</h2>
          <div className="mt-9 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => {
                const isActive = index === activeProjectIndex;

                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    className={`rounded-[22px] p-6 text-left transition ${
                      isActive
                        ? "bg-[var(--accent-soft)] text-[#1d1d1f]"
                        : "modern-card bg-white hover:bg-[#f7f9ff]"
                    }`}
                  >
                    <p className="text-2xl font-semibold">{project.title}</p>
                    <p className={`mt-2 text-sm leading-relaxed ${isActive ? "text-[#1d1d1f]" : "text-[#334056]"}`}>
                      {project.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            <article className="modern-card fade-in-up overflow-hidden rounded-[24px] bg-white/92">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                width={1400}
                height={1000}
                className="h-72 w-full object-cover saturate-115 contrast-110"
              />
              <div className="grid gap-6 p-6 md:p-7">
                <div>
                  <h3 className="text-3xl font-semibold">{activeProject.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#2e3643]">
                    {activeProject.points.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                {activeProject.production.length > 0 ? (
                  <div className="modern-card rounded-[18px] bg-white/85 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#57647c]">Производственный этап:</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#2e3643]">
                      {activeProject.production.map((step) => (
                        <li key={step}>→ {step}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          </div>
        </section>

        <section id="gallery" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <h2 className="section-title font-semibold">Галерея</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <article
                key={image.src}
                className="group reveal overflow-hidden rounded-[22px] bg-white/92"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1400}
                  height={1000}
                  className="h-64 w-full object-cover saturate-115 contrast-110 transition duration-300 group-hover:scale-[1.03]"
                />
              </article>
            ))}
          </div>
        </section>

        <section id="exploration" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <div className="modern-card reveal relative overflow-hidden rounded-[28px] p-8 text-[#1d1d1f] md:p-10">
            <Image
              src="/media/gallery-3.jpg"
              alt="Фон блока разведки"
              width={1400}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover opacity-12"
            />
            <div className="absolute inset-0 bg-white/84" />
            <div className="relative">
              <h2 className="section-title font-semibold">Наш подход к разведке</h2>
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#3d4655]">
                Наша стратегия базируется на комбинации геологических гипотез и современных технологий, включая:
              </p>
              <div className="mt-9 grid gap-5 md:grid-cols-3">
                {explorationSections.map((section) => (
                  <article key={section.title} className="modern-card reveal rounded-[20px] p-6">
                    <h3 className="text-2xl font-semibold text-[#1d1d1f]">{section.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#3d4655]">
                      {section.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <p className="mt-7 max-w-5xl text-sm leading-relaxed text-[#3d4655] md:text-base">
                Мы сотрудничаем с ведущими мировыми экспертами (например, Richard Goldfarb, Jeffrey Hedenquist) для
                повышения точности моделирования и оценки рудных тел.
              </p>
            </div>
          </div>
        </section>

        <section id="esg" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div className="modern-card reveal relative overflow-hidden rounded-[24px]">
              <Image
                src="/media/esg.jpg"
                alt="Экологическая ответственность"
                width={1400}
                height={1000}
                className="h-full min-h-[320px] w-full object-cover opacity-38 saturate-110 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/82 to-white/30 p-6 md:p-8">
                <h2 className="section-title font-semibold text-[#1d1d1f]">Раздел «ESG»</h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#3d4655] md:text-base">
                  ESG в Aurum Global Group: долгосрочное мышление — наша ценность
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3d4655] md:text-base">
                  Мы понимаем, что недропользование — это не только экономика, но и ответственность. Поэтому в основе
                  нашей стратегии лежат принципы устойчивого развития, охраны окружающей среды и открытого диалога с
                  сообществами.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <article className="modern-card reveal relative overflow-hidden rounded-[20px] p-6">
                <Image
                  src="/media/gallery-1.jpg"
                  alt="Фон ESG экология"
                  width={1200}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-white/86" />
                <div className="relative">
                  <h3 className="text-2xl font-semibold">Экологическая ответственность</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2e3643]">Мы внедряем технологии и процессы, минимизирующие экологический след:</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#2e3643] md:text-base">
                    {esgEnvironment.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </article>

              <article
                className="modern-card reveal relative overflow-hidden rounded-[20px] p-6"
                style={{ "--reveal-delay": "80ms" } as CSSProperties}
              >
                <Image
                  src="/media/gallery-4.jpg"
                  alt="Фон ESG управление"
                  width={1200}
                  height={900}
                  className="absolute inset-0 h-full w-full object-cover opacity-9"
                />
                <div className="absolute inset-0 bg-white/88" />
                <div className="relative">
                  <h3 className="text-2xl font-semibold">Корпоративное управление</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2e3643]">
                    Aurum Global Group придерживается этических норм и стандартов корпоративного управления:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#2e3643] md:text-base">
                    {esgGovernance.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </article>

              <article
                className="modern-card reveal rounded-[20px] p-6"
                style={{ "--reveal-delay": "160ms" } as CSSProperties}
              >
                <h3 className="text-2xl font-semibold">ESG — не дополнение, а основа</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2e3643] md:text-base">
                  Мы рассматриваем ESG как интегрированную часть нашей стратегии — от геологоразведки до эксплуатации и
                  рекультивации. Это не просто соблюдение норм — это создание устойчивого будущего.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="kinir" className="container-grid pt-3 pb-8 md:pt-4 md:pb-10">
          <article className="modern-card rounded-[28px] p-8 md:p-10">
            <h2 className="section-title font-semibold">Проект золотого рудника Кинир</h2>
            <div className="kinir-panel relative mt-8 overflow-hidden rounded-[24px] p-5 md:p-7">
              <Image
                src="/media/project-kinir.jpg"
                alt="Фон процесса Кинир"
                width={1400}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover opacity-7"
              />
              <div className="absolute inset-0 bg-white/88" />
              <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#57647c]">
                    Процесс реализации
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#1b2434]">
                    Шаг {activeKinirStep + 1} из {kinirNarrative.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goKinirPrev}
                    className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[#324156] transition hover:bg-[#f0f5ff]"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={goKinirNext}
                    className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    Далее
                  </button>
                </div>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-sm bg-[#d8dce4]">
                <div
                  className="h-full rounded-sm bg-gradient-to-r from-[#cda864] via-[#cda864] to-[#cda864] transition-all duration-500"
                  style={{ width: `${((activeKinirStep + 1) / kinirNarrative.length) * 100}%` }}
                />
              </div>

              <div className="mt-4 overflow-x-auto pb-1">
                <div className="flex min-w-max items-center gap-2">
                  {kinirNarrative.map((_, index) => {
                    const isActive = index === activeKinirStep;
                    return (
                      <button
                        key={`chip-${index}`}
                        type="button"
                        onClick={() => setActiveKinirStep(index)}
                        className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                          isActive
                            ? "bg-[var(--accent)] text-white"
                            : "bg-white text-[#4b5a70] hover:bg-[#f0f5ff]"
                        }`}
                        aria-label={`Шаг ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeKinirStep * 100}%)` }}
                >
                  {kinirNarrative.map((item, index) => (
                    <article key={`timeline-${index}`} className="min-w-full">
                      <div className="fade-in-up grid gap-3 rounded-[20px] bg-white/95 p-5 md:grid-cols-[48px_1fr]">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-[#2e3643] md:text-base">{item}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer className="container-grid border-t border-[var(--border)] pt-10 pb-4 text-sm text-[#3a4250]">
        <p>Aurum Global Group</p>
      </footer>
    </div>
  );
}
