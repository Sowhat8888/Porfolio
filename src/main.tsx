import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, CalendarDays, Clapperboard, Compass, Mountain, MousePointer2, PenTool, Play, X, type LucideIcon } from 'lucide-react';
import './style.css';
import './ux-gallery.css';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const capabilities = [
  { no: '01', icon: Compass, title: '品牌运营', desc: '从受众与市场洞察出发，梳理品牌定位和表达方式，让品牌在不同触点保持清晰、一致。' },
  { no: '02', icon: CalendarDays, title: '活动策划与执行', desc: '围绕活动目标设计主题、内容预热与现场流程，统筹传播节奏和关键节点，让参与感延伸到活动前后。' },
  { no: '03', icon: PenTool, title: '内容策划与制作', desc: '把品牌信息与用户需求转译成图文、短视频和活动内容，完成从选题脚本到制作交付。' },
  { no: '04', icon: MousePointer2, title: '用户与社群运营', desc: '梳理用户画像、使用场景与沟通路径，通过持续互动建立信任，推动活跃、转化和长期留存。' },
  { no: '05', icon: BarChart3, title: '数据复盘与优化', desc: '结合运营和内容数据复盘触达、互动与转化表现，提炼有效做法并迭代后续策略。' },
];

type ProjectCase = {
  title: string;
  english: string;
  type: string;
  year: string;
  icon: LucideIcon;
  tone: string;
  desc: string;
  stats: string[];
  screens?: { src: string; title: string }[];
};

const platformScreens = [
  ['01-home-recommendations.png', 'Home · Recommendations'],
  ['02-daily-picks.png', 'Daily Picks'],
  ['03-search-filters.png', 'Search Filters'],
  ['04-search-results.png', 'Search Results'],
  ['05-recipe-detail.png', 'Recipe Detail'],
  ['06-guided-cooking.png', 'Guided Cooking'],
  ['07-create-recipe.png', 'Create Recipe'],
  ['08-saved-recipes.png', 'Saved Recipes'],
  ['09-meal-planner.png', 'Meal Planner'],
  ['10-profile-preferences.png', 'Profile & Preferences'],
].map(([file, title]) => ({ src: assetUrl(`images/content-platform/${file}`), title }));

const projects: ProjectCase[] = [
  { title: '短视频内容创作', english: 'VIDEO CHALLENGE', type: '个人项目 · 总导演', year: '2022', icon: Clapperboard, tone: 'violet', desc: '带领 5 人团队完成短片从创意到交付。统筹分工与拍摄节点，打磨 3 版脚本，并独立完成剪辑、调色、音效与字幕包装。', stats: ['5 人团队统筹', '3 版脚本迭代', '全片后期制作'] },
  { title: '内容平台体验设计', english: 'CONTENT PLATFORM UX', type: '个人项目 · 产品体验', year: '2024', icon: MousePointer2, tone: 'lime', desc: '围绕内容消费场景设计浏览、搜索、收藏与分享路径；通过用户访谈梳理痛点，规划信息架构和首页推荐逻辑。', stats: ['12+ 核心功能', '30+ 高保真页面', '用户访谈研究'], screens: platformScreens },
  { title: '社交媒体内容分析', english: 'SOCIAL CONTENT DATA', type: '个人项目 · 数据分析', year: '2024', icon: BarChart3, tone: 'blue', desc: '使用 SPSS 与 R 分析万级社媒内容数据，从内容类型、发布时间和互动表现等 5 个维度挖掘规律，并输出 Tableau 看板与策略建议。', stats: ['10,000+ 条数据', '5 个分析维度', 'Tableau 运营看板'] },
];

const roles = [
  { company: '中信证券', role: '客户经理 · 拓展部', date: '2025.08 — 2026.04', place: '上海，中国', description: '负责 80+ 客户的分层运营与内容触达，研究 20+ 理财产品品类并转译为图文、短视频内容。通过数据复盘迭代服务策略，推动月均活跃率提升 15%，客户留存率保持 90% 以上。', result: '活跃率 +15% · 留存率 90%+' },
  { company: '阿里巴巴', role: '视频字幕编辑实习生 · 内容创作部', date: '2022.06 — 2022.08', place: '远程 · 英国谢菲尔德', description: '参与高考主题短视频全链路制作，完成选题、脚本、100+ 条素材搜集、剪辑和多平台发布；为品牌宣传片、系列账号内容及节日营销视频完成策划与制作。', result: '内容从 0 到 1 · 现场覆盖 300+ 师生' },
];

const schools = [
  { degree: '硕士 · MSc', name: '曼彻斯特大学', major: '数字媒体、文化与社会', dates: '2023 — 2024', city: '英国 · 曼彻斯特' },
  { degree: '学士 · BA', name: '谢菲尔德大学', major: '数字媒体与社会', dates: '2020 — 2023', city: '英国 · 谢菲尔德' },
];

const videoSamples = [
  { id: 'sep18', date: '09.18', label: '游戏视频剪辑 01', src: assetUrl('videos/game-edit-09-18.mp4'), accent: 'violet' },
  { id: '3977', date: '3977!', label: '游戏视频剪辑 02', src: assetUrl('videos/game-edit-3977.mp4'), accent: 'lime' },
  { id: 'oct08', date: '10.08', label: '游戏视频剪辑 03', src: assetUrl('videos/game-edit-10-08.mp4'), accent: 'blue' },
];

function ContactButton({ compact = false }: { compact?: boolean }) {
  return <a className={`contact-pill${compact ? ' compact' : ''}`} href="mailto:Ronniegeyizhao@163.com"><span>联系我</span><ArrowUpRight size={compact ? 15 : 17}/></a>;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['-10%', '7%'] : ['7%', '-10%']);
  const items = reverse ? ['品牌', 'STORYTELLING', '活动', 'CAMPAIGN', '用户', 'COMMUNITY', '体验', 'CULTURE'] : ['BRAND STRATEGY', '品牌建设', 'CAMPAIGN', '活动策划', 'CONTENT & STORY', '内容创作', 'USER FIRST', '数据复盘'];
  return <div className={`marquee-row${reverse ? ' reverse' : ''}`} ref={ref}><motion.div className="marquee-track" style={{ x }}>{[0, 1, 2].map(copy => <div className="marquee-group" key={copy}>{items.map((item, i) => <span className={`marquee-chip chip-${(i + copy) % 4}`} key={`${copy}-${item}`}><i>{['✳', '↗', '◌', '✦'][(i + copy) % 4]}</i>{item}</span>)}</div>)}</motion.div></div>;
}

function CharacterReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.25'] });
  const chars = Array.from(text);
  return <p className="reveal-text" ref={ref} aria-label={text}>{chars.map((char, index) => <RevealChar key={index} progress={scrollYProgress} index={index} total={chars.length} char={char}/>)}</p>;
}

function RevealChar({ progress, index, total, char }: { progress: MotionValue<number>; index: number; total: number; char: string }) {
  const start = index / total;
  const end = Math.min(1, start + 0.045);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return <motion.span style={{ opacity }}>{char === ' ' ? '\u00a0' : char}</motion.span>;
}

function Hero() {
  const magnet = useRef<HTMLDivElement>(null);
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!magnet.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = magnet.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    if (Math.abs(dx) < rect.width / 2 + 150 && Math.abs(dy) < rect.height / 2 + 150) magnet.current.style.transform = `translate3d(${dx / 22}px, ${dy / 22}px, 0)`;
  };
  const resetMagnet = () => { if (magnet.current) magnet.current.style.transform = 'translate3d(0, 0, 0)'; };
  return <section className="hero" id="top" onMouseMove={onMove} onMouseLeave={resetMagnet}>
    <motion.nav className="nav-bar" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <a className="nav-logo" href="#top">RONNIE<span>✳</span></a><div className="nav-links"><a href="#about">关于</a><a href="#services">能力</a><a href="#projects">项目</a><a href="#game-edits">游戏剪辑</a></div><ContactButton compact/>
    </motion.nav>
    <div className="hero-title-wrap"><motion.h1 className="hero-heading" initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}>RONNIE<span className="hero-star">✳</span></motion.h1><span className="hero-role">BRAND · CONTENT · CAMPAIGNS</span></div>
    <div className="hero-orbit" aria-hidden="true"><div className="orbit-line orbit-line-1"/><div className="orbit-line orbit-line-2"/><div className="orbit-line orbit-line-3"/><div className="orbit-disc"><img src={assetUrl('images/ronnie-3d-head.png')} alt="赵哿仪的 3D 头像"/><span>R</span></div><span className="orbit-label orbit-label-a">CONTENT<br/>× PEOPLE</span><span className="orbit-label orbit-label-b">洞察 · 表达 · 增长</span><span className="orbit-dot dot-a"/><span className="orbit-dot dot-b"/><span className="orbit-dot dot-c"/></div>
    <div className="hero-bottom"><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .32 }}>让品牌被记住，<br/>让活动被参与。<small>品牌运营 · 活动策划 · 内容创作</small></motion.p><motion.a className="hero-scroll" href="#marquee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}><span>向下探索</span><ArrowDown size={16}/></motion.a><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .45 }}><ContactButton/></motion.div></div>
    <span className="hero-index">SHANGHAI · 31°14&apos;N 121°28&apos;E</span>
  </section>;
}

function ScreenshotGallery({ images }: { images: { src: string; title: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedImage = selected === null ? null : images[selected];

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected(current => current === null ? null : (current + 1) % images.length);
      if (event.key === 'ArrowLeft') setSelected(current => current === null ? null : (current + images.length - 1) % images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selected, images.length]);

  return <div className="ux-gallery-wrap">
    <div className="ux-gallery-heading"><span>FIGMA SCREENS · 10 KEY FLOWS</span><span>点击页面放大查看 ↗</span></div>
    <div className="ux-gallery" aria-label="内容平台 Figma 页面展示">{images.map((image, index) => <button className="gallery-shot" key={image.src} onClick={() => setSelected(index)} aria-label={`放大查看 ${image.title}`}><img src={image.src} alt={`${image.title} 页面设计`} loading="lazy"/><span><i>{String(index + 1).padStart(2, '0')}</i>{image.title}</span></button>)}</div>
    {selectedImage ? createPortal(<div className="ux-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedImage.title} 页面大图`} onClick={() => setSelected(null)}>
      <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭预览"><X size={20}/></button>
      <button className="lightbox-arrow previous" onClick={event => { event.stopPropagation(); setSelected((selected! + images.length - 1) % images.length); }} aria-label="上一张"><ArrowLeft size={20}/></button>
      <div className="lightbox-content" onClick={event => event.stopPropagation()}><img src={selectedImage.src} alt={`${selectedImage.title}页面设计大图`}/><div><span>{String(selected! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span><strong>{selectedImage.title}</strong></div></div>
      <button className="lightbox-arrow next" onClick={event => { event.stopPropagation(); setSelected((selected! + 1) % images.length); }} aria-label="下一张"><ArrowRight size={20}/></button>
    </div>, document.body) : null}
  </div>;
}

function ProjectCard({ item, index, progress }: { item: ProjectCase; index: number; progress: MotionValue<number> }) {
  const targetScale = 1 - (projects.length - index - 1) * 0.035;
  const scale = useTransform(progress, [index * 0.28, 1], [1, targetScale]);
  const Icon = item.icon;
  return <div className="project-card-wrap"><motion.article className={`project-card ${item.tone}`} style={{ scale, top: `calc(6rem + ${index * 23}px)` }}>
    <div className="project-card-head"><div className="project-card-title"><span className="project-number">0{index + 1}</span><div><span className="project-category">{item.english}</span><h3>{item.title}</h3><span className="project-type">{item.type} <i>·</i> {item.year}</span></div></div><span className="project-pill">{item.screens ? '10 SCREENS' : 'CASE STUDY'} <ArrowUpRight size={14}/></span></div>
    {item.screens ? <ScreenshotGallery images={item.screens}/> : <div className="case-art"><div className="case-art-copy"><span className="case-label">{item.english} / 0{index + 1}</span><Icon className="case-icon" strokeWidth={1}/><strong>{index === 0 ? <>故事<br/>如何发生<span>？</span></> : <>数字<br/>正在说<span>。</span></>}</strong><span className="case-art-caption">RONNIE ZHAO · SELECTED WORK</span></div><div className="case-art-side"><span className="side-orbit side-orbit-a"/><span className="side-orbit side-orbit-b"/><span className="side-core">{index === 0 ? 'PLAY' : 'DATA'}</span><span className="side-mark">✳</span><span className="side-year">{item.year}</span></div></div>}
    <div className="project-card-foot"><p>{item.desc}</p><div className="project-stats">{item.stats.map(stat => <span key={stat}><i/>{stat}</span>)}</div></div>
  </motion.article></div>;
}

function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return <section className="projects-section" id="projects"><div className="projects-top"><FadeIn><span className="eyebrow">SELECTED WORK · 2022 — 2024</span><h2 className="hero-heading">PROJECTS<span>✳</span></h2></FadeIn><p>每一个项目，都是一次<br/>让内容更有效的尝试。</p></div><div className="project-stack" ref={ref}>{projects.map((item, index) => <ProjectCard item={item} index={index} progress={scrollYProgress} key={item.title}/>)}</div></section>;
}

function VideoSample({ item, index }: { item: typeof videoSamples[number]; index: number }) {
  const [playing, setPlaying] = useState(false);
  return <article className={`video-card ${item.accent}`}>
    <div className="video-frame">
      {playing ? <><video src={item.src} controls autoPlay playsInline preload="metadata" aria-label={`${item.label}预览`}/><button className="video-close" onClick={() => setPlaying(false)} aria-label="关闭视频预览"><X size={15}/></button></> : <><div className="video-cover"><span className="cover-corner">GAMEPLAY EDIT / 0{index + 1}</span><span className="cover-sigil">{index === 0 ? 'CUT' : index === 1 ? 'PLAY' : 'GG'}</span><span className="cover-wave">{Array.from({ length: 31 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17 + index * 13) % 64)}%` }}/>)}</span><span className="cover-date">{item.date}</span></div><button className="video-play" onClick={() => setPlaying(true)} aria-label={`播放${item.label}`}><Play size={20} fill="currentColor"/><span>播放片段</span></button></>}
    </div>
    <div className="video-meta"><div><span className="video-index">0{index + 1} / PERSONAL EDIT</span><h3>{item.label}</h3></div><span className="video-date">{item.date}</span></div>
    <div className="video-tags"><span>游戏视频</span><span>兴趣创作</span><span>剪辑练习</span></div>
  </article>;
}

function ClimbJournalShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [isOpen]);
  return <article className="climb-showcase">
    <div className="climb-copy"><span className="climb-eyebrow"><Mountain size={14}/> 02 / CLIMB JOURNAL · AI CONCEPT</span><h3>每一条线路，<br/>都值得记下来。</h3><p>攀岩是我在日常之外的另一种热爱。我用 AI 辅助设计了一款轻量的攀爬记录小程序，记下每次尝试的线路与等级，留给自己回看和复盘。</p><div className="climb-tags"><span>攀爬等级</span><span>线路记录</span><span>个人日志</span></div><span className="climb-note">只为记录自己的每一次向上</span></div>
    <button className="climb-screen" onClick={() => setIsOpen(true)} aria-label="放大查看岩迹攀爬记录小程序界面"><img src={assetUrl('images/climb-journal.png')} alt="岩迹攀爬记录小程序首页，展示攀爬日志和线路记录" loading="lazy"/><span>点击查看界面 <ArrowUpRight size={14}/></span></button>
    {isOpen ? createPortal(<div className="climb-lightbox" role="dialog" aria-modal="true" aria-label="岩迹攀爬记录小程序界面大图" onClick={() => setIsOpen(false)}><button className="climb-lightbox-close" onClick={() => setIsOpen(false)} aria-label="关闭预览"><X size={20}/></button><img src={assetUrl('images/climb-journal.png')} alt="岩迹攀爬记录小程序界面大图" onClick={event => event.stopPropagation()}/></div>, document.body) : null}
  </article>;
}

function GameEdits() {
  return <section className="game-edits" id="game-edits"><div className="game-edits-heading"><FadeIn><span className="eyebrow">AFTER HOURS · PERSONAL INTERESTS</span><h2>记录热爱，<br/><span>也记录向上。</span></h2></FadeIn><p>从游戏剪辑的节奏感，到攀岩线路的每次尝试。<br/>用自己的方式，留下喜欢的瞬间。<small>PERSONAL INTERESTS · GAME / CLIMB</small></p></div><div className="interest-divider"><span>01 / GAMEPLAY EDITS</span><span>游戏视频剪辑 · 个人兴趣创作</span></div><div className="video-grid">{videoSamples.map((item, index) => <FadeIn delay={index * .08} key={item.id}><VideoSample item={item} index={index}/></FadeIn>)}</div><ClimbJournalShowcase/><div className="game-edits-foot"><span>兴趣 · 剪辑 · 攀爬</span><span>MY OWN PACE · MY OWN NOTES <ArrowUpRight size={13}/></span></div></section>;
}

function App() {
  return <main className="site-shell">
    <Hero/>
    <section className="marquee-section" id="marquee"><div className="marquee-heading"><span>WHAT I BELIEVE IN</span><span>滚动，继续探索 ↘</span></div><MarqueeRow/><MarqueeRow reverse/><div className="marquee-foot"><span>策略性的好奇心</span><span>✳</span><span>以人为中心的表达</span><span>✳</span><span>可衡量的成长</span></div></section>
    <section className="about-section" id="about"><div className="about-deco deco-moon">◒</div><div className="about-deco deco-asterisk">✳</div><div className="about-orb orb-1"/><div className="about-orb orb-2"/><div className="about-content"><FadeIn><span className="eyebrow">A LITTLE ABOUT ME</span><h2 className="hero-heading">ABOUT<br/>RONNIE<span>✳</span></h2></FadeIn><CharacterReveal text="我叫赵哿仪，拥有曼彻斯特大学数字媒体、文化与社会硕士背景。我关注品牌如何通过内容、活动和用户体验与人建立连接：从洞察需求、梳理表达，到设计触点，再用数据复盘效果。"/><FadeIn delay={.2}><a className="text-link" href="#experience">认识我的经历 <ArrowDown size={16}/></a></FadeIn></div><span className="about-coordinate">DIGITAL MEDIA · CULTURE · PEOPLE</span></section>
    <section className="services-section" id="services"><div className="services-heading"><FadeIn><span className="eyebrow">WHAT I BRING TO THE TABLE</span><h2>我能做的<span>。</span></h2></FadeIn><p>从品牌表达，<br/>到活动体验与增长。</p></div><div className="service-list">{capabilities.map((item, index) => {const Icon = item.icon; return <FadeIn delay={index * .07} key={item.no}><article className="service-row"><span className="service-no">{item.no}</span><div className="service-main"><span className="service-icon"><Icon size={20}/></span><div><h3>{item.title}</h3><p>{item.desc}</p></div></div><ArrowUpRight className="service-arrow" size={19}/></article></FadeIn>;})}</div><div className="skill-footer"><span>TOOLKIT & LANGUAGES</span><p>R / SPSS <i>·</i> Tableau <i>·</i> Excel <i>·</i> Figma <i>·</i> Photoshop <i>·</i> Adobe Animate <i>·</i> 中文母语 / English fluent</p></div></section>
    <Projects/>
    <GameEdits/>
    <section className="experience-section" id="experience"><div className="experience-heading"><FadeIn><span className="eyebrow">THE JOURNEY SO FAR</span><h2 className="hero-heading">EXPERIENCE<span>✳</span></h2></FadeIn><span className="section-count">工作与教育 / 2020 — 2026</span></div><div className="experience-list">{roles.map((role, i) => <FadeIn delay={i * .08} key={role.company}><article className="experience-row"><span className="experience-no">0{i + 1}</span><div className="experience-main"><span className="experience-date">{role.date} <i>·</i> {role.place}</span><h3>{role.company}</h3><span className="experience-role">{role.role}</span><p>{role.description}</p><strong>{role.result}</strong></div><ArrowUpRight size={18}/></article></FadeIn>)}</div><div className="education-grid"><div className="education-label"><span className="eyebrow">EDUCATION</span><h3>学习的地方。</h3></div>{schools.map(school => <article className="school-card" key={school.name}><span>{school.degree}</span><h4>{school.name}</h4><p>{school.major}</p><small>{school.dates} <i>·</i> {school.city}</small></article>)}</div></section>
    <footer className="footer"><span className="footer-star">✳</span><span className="eyebrow">A GOOD STORY STARTS WITH A HELLO</span><h2>一起做点<span>有意思的。</span></h2><ContactButton/><div className="footer-bottom"><a href="#top" className="nav-logo">RONNIE<span>✳</span></a><span>赵哿仪 · 品牌运营 / 活动策划 / 内容创作</span><span>© 2026 RONNIE ZHAO</span></div></footer>
  </main>;
}

createRoot(document.getElementById('root')!).render(<App/>);
