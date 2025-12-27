import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Code2,
  Trophy,
  BookOpen,
  ChevronRight,
  Layers,
  Settings,
  X,
  Heart,
  Globe,
  Cpu,
  Monitor,
  Database,
  Terminal as TerminalIcon,
  Send,
  User as UserIcon,
  Briefcase,
  Eye,
  Award,
  MessageSquare,
} from 'lucide-react';
import AnimatedShaderBackground from './components/ui/animated-shader-background';
import { Spotlight } from './components/ui/spotlight';
import { SplineScene } from './components/ui/splite';
import { cn } from './lib/utils';
import Magnetic from './components/ui/magnetic';
import { FloatingNav } from './components/ui/floating-navbar';
import { HeroHighlight } from './components/ui/hero-highlight';
import { AIChatbot } from './components/ui/ai-chatbot';
import { supabase } from './lib/supabase';
import type { Language } from './lib/translations';
import { translations, LANGUAGES } from './lib/translations';
import { ThemeToggle } from './components/ui/theme-toggle';
import { RatingInteraction } from './components/ui/emoji-rating';
import DialogLogout from './components/ui/dialog-deactivate';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline';
import DisplayCards from './components/ui/display-cards';
import { GlowingEffect } from './components/ui/glowing-effect';
import AnimatedShaderHero from './components/ui/animated-shader-hero';

// Assets from provided images
const ASSETS = {
  profile: '/assets/varun_suit.png',
  about1: '/assets/varun_sweater.jpg',
  about2: '/assets/varun_glasses_shop.jpg',
  resume: '/assets/resume.jpg',
  internshipCert: '/assets/internship_cert.png',
  marks12th: '/assets/marks_12th.png',
  marks10th: '/assets/marks_10th.png',
  projectRental1: '/assets/project_rental_1.png',
  projectRental2: '/assets/project_rental_2.png',
  projectPortfolio1: '/assets/project_portfolio_1.png',
  projectPortfolio2: '/assets/project_portfolio_2.png',
  projectCashPulse: '/assets/project_cashpulse.png',
  certSystemtron: '/assets/cert_systemtron.png',
  certApprotech: '/assets/cert_approtech.png',
  certShadowfox: '/assets/cert_shadowfox.png',
  certInfosys: '/assets/cert_infosys_java.png',
  certUdemy: '/assets/cert_udemy_web.png',
  certTyping: '/assets/cert_typing.png',
  certNovitech: '/assets/cert_novitech_ml.png',
  certTcs: '/assets/cert_tcs_comm.png',
  certNptel: '/assets/cert_nptel_iot.png',
  hoverProfile: '/assets/varun_hover.png',
  heroVideo: '/assets/login_bg.mp4',
};

const SOCIALS = [
  { icon: Linkedin, url: 'https://www.linkedin.com/in/penjendruvarun/', label: 'LinkedIn' },
  { icon: Github, url: 'https://github.com/penjendru01varun', label: 'GitHub' },
  { icon: Twitter, url: 'https://x.com/varun38259', label: 'Twitter' },
  { icon: Code2, url: 'https://leetcode.com/u/penjendru01varun/', label: 'LeetCode' },
  { icon: TerminalIcon, url: 'https://www.hackerrank.com/profile/penjcs127', label: 'HackerRank' },
  { icon: BookOpen, url: 'https://coddy.tech/profile', label: 'Coddy' },
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', query: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeTheme, setActiveTheme] = useState<'black' | 'white' | 'blue' | 'purple' | 'red'>('black');
  const [photoToggle, setPhotoToggle] = useState(0);
  const [viewCert, setViewCert] = useState<string | null>(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const t = translations[language] || translations.en;

  const bgStyles: Record<string, string> = {
    black: 'bg-black text-white',
    white: 'bg-white text-black',
    blue: 'bg-blue-950 text-white',
    purple: 'bg-purple-950 text-white',
    red: 'bg-red-950 text-white'
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          full_name: contactForm.name,
          email: contactForm.email,
          queries: contactForm.query
        }]);

      if (error) throw error;
      setSendSuccess(true);
      setContactForm({ name: '', email: '', query: '' });
      setTimeout(() => setSendSuccess(false), 3000);
    } catch (err: any) {
      alert("Error sending message: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Toggle for About section side photo
    const interval = setInterval(() => {
      setPhotoToggle((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };


  const INTERNSHIPS = [
    {
      company: "SystemTron",
      role: "C++ Programming Intern",
      date: "Jan 2024 – Feb 2024",
      cert: ASSETS.certSystemtron,
      link: "https://www.systemtron.com/",
      description: "Focused on system-level programming and algorithm optimization using C++.",
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      company: "ApproTech R&D Solutions",
      role: "UI/UX Designer Intern",
      date: "June 2025 – July 2025",
      cert: ASSETS.certApprotech,
      link: "https://www.figma.com/design/2XBL2rHonZYOMKZPiQwDae/Approtech-final-project?t=E7ATyvBpo8ojmaqH-1",
      description: "Designed a Home-Made Food Delivery App in Figma with user-centric principles.",
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
    },
    {
      company: "Shadow Fox",
      role: "UI/UX Designer Intern",
      date: "August 2025",
      cert: ASSETS.certShadowfox,
      link: "https://www.figma.com/design/ykHHaef9CUc1mJIut0sQZw/Portfilio?node-id=23-11&t=E7ATyvBpo8ojmaqH-1",
      description: "Completed a virtual internship specializing in UI/UX Design and micro-interactions.",
      area: "md:[grid-area:2/1/3/13] xl:[grid-area:1/9/2/13]"
    }
  ];

  const CERTIFICATES = [
    {
      title: "Java Foundation Certification",
      issuer: "Infosys Springboard",
      date: "March 2025",
      image: ASSETS.certInfosys,
      description: "Comprehensive foundation in Java programming, object-oriented concepts, and data structures.",
      icon: <Award className="w-5 h-5 text-zinc-400" />
    },
    {
      title: "HTML & CSS From Scratch",
      issuer: "Udemy",
      date: "June 2024",
      image: ASSETS.certUdemy,
      description: "Mastered modern web layout techniques, responsive design, and CSS animations.",
      icon: <Globe className="w-5 h-5 text-zinc-400" />
    },
    {
      title: "Typing Mastery (97% Accuracy)",
      issuer: "Typing.com",
      date: "Jan 2024",
      image: ASSETS.certTyping,
      description: "Achieved professional-grade typing speed and precision through rigorous testing.",
      icon: <TerminalIcon className="w-5 h-5 text-zinc-400" />
    },
    {
      title: "Machine Learning Workshop",
      issuer: "NoviTech R&D",
      date: "June 2024",
      image: ASSETS.certNovitech,
      description: "Intensive 2-hour bootcamp focusing on Unsupervised Learning and model architectures.",
      icon: <Cpu className="w-5 h-5 text-zinc-400" />
    },
    {
      title: "Communication Skills",
      issuer: "TCS iON",
      date: "Dec 2024",
      image: ASSETS.certTcs,
      description: "Enhanced professional communication, verbal clarity, and corporate etiquette.",
      icon: <MessageSquare className="w-5 h-5 text-zinc-400" />
    },
    {
      title: "Introduction to Internet of Things",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "Jul-Oct 2025",
      image: ASSETS.certNptel,
      description: "Elite Certification with a consolidated score of 87%. Recognized in the Top 5% of candidates (Topper).",
      icon: <Trophy className="w-5 h-5 text-zinc-400" />
    }
  ];

  return (
    <div className={cn("min-h-screen selection:bg-purple-500/30 transition-colors duration-700", bgStyles[activeTheme])}>
      <CustomCursor />

      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled ? "bg-black/80 backdrop-blur-md py-3 border-white/10" : "bg-transparent py-6 border-transparent"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Magnetic>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold tracking-tighter cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              VARUN<span className="text-purple-500">.</span>
            </motion.div>
          </Magnetic>
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            {['Home', 'About', 'Education', 'Projects', 'Certificates', 'Internships', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '')}`}
                className="hover:text-white transition-colors uppercase tracking-widest text-[10px]"
              >
                {t.nav[item.toLowerCase().replace(' ', '') as keyof typeof t.nav]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle onToggle={(isDark) => setActiveTheme(isDark ? 'black' : 'white')} isDark={activeTheme === 'black'} />
            <Magnetic>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-current" />
              </button>
            </Magnetic>
            <Magnetic>
              <motion.a
                href={ASSETS.resume}
                download="Varun_Resume.jpg"
                target="_blank"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-5 py-2 rounded-full text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: activeTheme === 'white' ? 'black' : 'white', color: activeTheme === 'white' ? 'white' : 'black' }}
              >
                {t.nav.resume} <Download className="w-3 h-3" />
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={ASSETS.heroVideo} type="video/mp4" />
          </video>
        </div>
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="purple" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              className="relative w-40 h-40 mx-auto mb-8 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={isProfileHovered ? 'hover' : 'default'}
                  src={isProfileHovered ? ASSETS.hoverProfile : ASSETS.profile}
                  alt="Varun"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full rounded-full object-cover border-4 border-white/10 group-hover:border-purple-500 transition-all relative z-10 shadow-2xl"
                />
              </AnimatePresence>
            </motion.div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-bold tracking-[0.2em] mb-6 animate-pulse uppercase">
              {t.hero.role}
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase"
            >
              {t.hero.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
              {t.hero.bio}
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 text-sm uppercase tracking-widest">
                  {t.hero.viewProjects} <ChevronRight className="w-4 h-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors backdrop-blur-sm text-sm uppercase tracking-widest">
                  {t.hero.contactMe}
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent mx-auto mb-2" />
        </motion.div>
      </section>

      {/* About Me Section (Main About Section) */}
      <section id="aboutme" className="py-32 relative overflow-hidden bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-sm font-bold tracking-[0.3em] text-purple-500 mb-4 uppercase">{t.about.title}</h2>
              <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter">{t.about.subtitle}</h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={photoToggle}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-neutral-400 text-xl mb-8 leading-relaxed font-light">
                    {photoToggle === 1 ? t.about.description1 : t.about.description2}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm">
                  <h4 className="text-3xl font-bold mb-2 text-purple-400">8.18</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">{t.about.cgpa}</p>
                </div>
                <div className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm">
                  <h4 className="text-3xl font-bold mb-2 text-blue-400">2027</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">{t.about.gradYear}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={photoToggle}
                  src={photoToggle === 1 ? ASSETS.about1 : ASSETS.about2} // Switching photos
                  alt="Varun"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                <p className="text-white font-bold text-xs tracking-widest uppercase opacity-60">
                  {photoToggle === 1 ? "Professional" : "Casual"} Perspective
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-neutral-900/10">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-sm font-bold tracking-[0.3em] text-purple-500 mb-4 uppercase text-center">{t.nav.education}</motion.h2>
          <motion.h3 {...fadeIn} className="text-4xl font-bold mb-24 text-center tracking-tighter">{t.education.title}</motion.h3>
          <div className="flex justify-center">
            <DisplayCards cards={[
              {
                icon: <Trophy className="size-4 text-purple-400" />,
                title: "B.E CSE",
                description: "RMKCET Engineering",
                date: "2023 - 2027",
                link: "https://www.rmkcet.ac.in/",
                className: "[grid-area:stack] hover:-translate-y-10 transition-all cursor-pointer",
                titleClassName: "text-purple-400"
              },
              {
                icon: <BookOpen className="size-4 text-blue-400" />,
                title: "12th Grade",
                description: "Velammal Nexus",
                date: "2021 - 2023",
                link: "https://velammalnexus.com/",
                className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-2 transition-all cursor-pointer",
                titleClassName: "text-blue-400"
              },
              {
                icon: <Layers className="size-4 text-teal-400" />,
                title: "10th Grade",
                description: "Narayana Schools",
                date: "2015 - 2021",
                link: "https://www.narayanaschools.in/",
                className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-6 transition-all cursor-pointer",
                titleClassName: "text-teal-400"
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Projects Timeline Section */}
      <section id="projects" className="py-32 bg-black">
        <div className="container mx-auto px-6 mb-16">
          <motion.h2 {...fadeIn} className="text-sm font-bold tracking-[0.3em] text-purple-500 mb-4 uppercase">{t.nav.projects}</motion.h2>
          <motion.h3 {...fadeIn} className="text-5xl font-bold tracking-tighter">{t.projects.title}</motion.h3>
        </div>
        <Timeline data={[
          {
            title: "June - July",
            content: (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold text-white uppercase italic">Rental Room Website <span className="text-sm font-normal text-purple-500 lowercase not-italic">(Design Phase)</span></h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Interactive prototype designed for a symposium competition. Features a comprehensive booking system, room categories, and custom-tailored user experience.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img src={ASSETS.projectRental1} alt="Rental 1" className="rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all shadow-2xl" />
                  <img src={ASSETS.projectRental2} alt="Rental 2" className="rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all shadow-2xl" />
                </div>
                <a href="https://www.figma.com/design/7dJmRhoY4Vj6giFREx5yWJ/Untitled?t=E7ATyvBpo8ojmaqH-1" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                  View Figma Design <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )
          },
          {
            title: "Jan - Feb",
            content: (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold text-white uppercase italic">Personal Portfolio</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    A minimal and elegant showcase of my creative journey. This project involved deep exploration into UI motion and glassmorphism layouts to present skills and certificates effectively.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img src={ASSETS.projectPortfolio1} alt="Portfolio 1" className="rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all shadow-2xl" />
                  <img src={ASSETS.projectPortfolio2} alt="Portfolio 2" className="rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all shadow-2xl" />
                </div>
                <a href="https://www.figma.com/design/ykHHaef9CUc1mJIut0sQZw/Portfilio?node-id=23-11&t=E7ATyvBpo8ojmaqH-1" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                  View Figma Design <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )
          },
          {
            title: "20 - 21 Dec 2025",
            content: (
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold text-white uppercase italic">CashPulse</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    A powerful financial management platform for MSMEs. Built during a high-stakes 36-hour hackathon, focusing on automated cash flow tracking and smart financial insights.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/50 transition-all shadow-2xl">
                  <img src={ASSETS.projectCashPulse} alt="CashPulse" className="w-full h-auto" />
                </div>
                <a href="https://cashpulse.vercel.app/" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                  Visit Application <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )
          }
        ]} />
      </section>

      {/* Certificates Section using the new Animated Shader Hero component logic as requested */}
      <section id="certificates" className="relative min-h-screen bg-black overflow-hidden">
        <AnimatedShaderHero
          trustBadge={{
            text: "Globally Recognized Honors",
            icons: ["✦"]
          }}
          headline={{
            line1: "Professional",
            line2: "Certifications"
          }}
          subtitle="A demonstration of continuous learning and mastery across multiple technical domains."
          className="h-auto py-20"
        />

        <div className="container mx-auto px-6 relative z-20 -mt-32 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-full rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-8 overflow-hidden transition-all hover:bg-black/60 shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                    {cert.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-1 italic text-white group-hover:text-purple-400 transition-colors">{cert.title}</h4>
                  <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{cert.issuer} • {cert.date}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8">{cert.description}</p>

                  <button
                    onClick={() => setViewCert(cert.image)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                  >
                    View Document <ChevronRight size={12} className="text-purple-500" />
                  </button>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] text-purple-500 mb-4 uppercase">{t.nav.internships}</h2>
            <h3 className="text-5xl font-bold tracking-tighter">Professional Journey</h3>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Robot */}
            <div className="lg:col-span-4 h-[500px] relative group">
              <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all" />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full relative z-10"
              />
            </div>

            {/* Right side: Glowing Cards Grid */}
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {INTERNSHIPS.map((item, idx) => (
                  <li key={idx} className="relative group">
                    <div className="relative h-full rounded-[2rem] border border-white/10 bg-neutral-900/40 p-8 overflow-hidden backdrop-blur-xl transition-all hover:bg-neutral-900/60">
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                      />
                      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                              <Briefcase className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 italic">
                              {item.date}
                            </span>
                          </div>
                          <h4 className="text-2xl font-bold mb-2 tracking-tight">{item.company}</h4>
                          <p className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-4 italic">{item.role}</p>
                          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setViewCert(item.cert)}
                            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                          >
                            <Eye className="w-3 h-3" /> View Certificate
                          </button>
                          <a
                            href={item.link}
                            target="_blank"
                            className="flex-1 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest text-purple-400 hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 text-center"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit Link
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] text-purple-500 mb-4 uppercase">{t.nav.skills}</h2>
            <h3 className="text-5xl font-bold tracking-tighter text-white">{t.skills.title}</h3>
          </motion.div>

          <RadialOrbitalTimeline timelineData={[
            { id: 1, title: 'Python', date: 'Core', content: 'Advanced scripting, AI/ML integration and data processing.', category: 'Language', icon: Cpu, relatedIds: [2], status: 'completed', energy: 90 },
            { id: 2, title: 'Java', date: 'Core', content: 'Started in 2nd semester. Focused on OOP concepts and backend scalability.', category: 'Language', icon: Monitor, relatedIds: [1, 3], status: 'completed', energy: 50 },
            { id: 3, title: 'C++', date: 'Core', content: 'Data structures, algorithm optimization and system level programming.', category: 'Language', icon: TerminalIcon, relatedIds: [2], status: 'completed', energy: 85 },
            { id: 4, title: 'React', date: 'Framework', content: 'Building dynamic SPAs with motion and state management.', category: 'Framework', icon: Globe, relatedIds: [5], status: 'completed', energy: 95 },
            { id: 5, title: 'Next.js', date: 'Framework', content: 'SSR, ISR and modern full-stack application development.', category: 'Framework', icon: Layers, relatedIds: [4, 6], status: 'in-progress', energy: 80 },
            { id: 6, title: 'Node.js', date: 'Platform', content: 'Scalable backend services and RESTful API architecture.', category: 'Platform', icon: Database, relatedIds: [5], status: 'completed', energy: 75 }
          ]} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-neutral-900/80 to-black border border-white/10 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="grid md:grid-cols-2 gap-20 relative z-10">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent uppercase text-left">
                  {t.contact.title}
                </h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{t.contact.email}</p>
                      <a href="mailto:penccs127@rmkcet.ac.in" className="text-lg font-medium hover:text-purple-400 transition-colors">pencs127@rmkcet.ac.in</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Phone</p>
                      <a href="tel:+918838149983" className="text-lg font-medium hover:text-purple-400 transition-colors">+91 8838149983</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">{t.contact.name}</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                      <input
                        type="text"
                        required
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">{t.contact.email}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                      <input
                        type="email"
                        required
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">{t.contact.message}</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-purple-500/50 transition-all text-sm resize-none"
                      value={contactForm.query}
                      onChange={(e) => setContactForm({ ...contactForm, query: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-4 rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all ${sendSuccess ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-neutral-200 active:scale-95'
                      }`}
                  >
                    {isSending ? 'Sending...' : sendSuccess ? 'Message Sent!' : (
                      <>
                        {t.contact.send}
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Socials Grid */}
            <div className="mt-20">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] mb-10 text-center italic">Connect with me globally</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {SOCIALS.map((social, i) => (
                  <Magnetic key={i}>
                    <a
                      href={social.url}
                      target="_blank"
                      className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center group"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {viewCert && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewCert(null)}
              className="absolute inset-0 bg-black/99 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-neutral-900 rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setViewCert(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={24} />
              </button>
              <img src={viewCert} alt="Certificate" className="w-full h-auto rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl h-[90vh] bg-neutral-900 rounded-[2.5rem] border border-white/10 relative overflow-hidden flex flex-col"
          >
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-8 right-8 z-[110] p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <ContainerScroll
              titleComponent={
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">{t.settings.title}</h2>
                  <p className="text-neutral-500 text-sm font-bold uppercase tracking-[0.3em]">Personalize your experience</p>
                </div>
              }
            >
              <div className="h-full w-full bg-neutral-900 p-8 overflow-y-auto custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-purple-500">{t.settings.bg}</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {['black', 'white', 'blue', 'purple', 'red'].map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setActiveTheme(color as any);
                          }}
                          className={cn(
                            "w-full aspect-square rounded-2xl border-2 transition-all",
                            color === 'black' ? 'bg-black' : color === 'white' ? 'bg-white' : color === 'blue' ? 'bg-blue-900' : color === 'purple' ? 'bg-purple-900' : 'bg-red-900',
                            activeTheme === color ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/20' : 'border-white/10 hover:border-white/30'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">{t.settings.lang}</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto px-2 custom-scrollbar">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-left transition-all",
                            language === lang.code ? 'bg-white text-black' : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-full border-t border-white/5 pt-12 text-center space-y-8">
                    <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl group hover:border-red-500/50 transition-all">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-6 italic">Secure Session Terminal</p>
                      <DialogLogout onLogout={async () => {
                        await supabase.auth.signOut();
                        setIsAuthenticated(false);
                        setIsSettingsOpen(false);
                      }} />
                      <p className="text-[10px] text-neutral-600 uppercase font-medium mt-6 flex items-center justify-center gap-2">
                        Warning: This will terminate your current active session
                      </p>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-4">
                      <RatingInteraction />
                      <p className="text-[10px] text-neutral-600 uppercase font-medium flex items-center gap-1 mt-4">
                        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Antigravity AI
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ContainerScroll>
          </motion.div>
        </div>
      )}

      <AIChatbot />
    </div>
  );
};

export default App;
