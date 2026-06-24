import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronRight, Award, BookOpen,
  Users, Zap, ShieldCheck, ArrowRight, Code,
  Cpu, Database, LayoutDashboard, MapPin, Mail, Phone,
  Star, Quote, Network, Sun, Moon
} from 'lucide-react';

const domainsData = {
  "vlsi": {
    id: "vlsi",
    title: "VLSI Design Architecture",
    iconId: "cpu",
    length: "40h Intensive",
    modules: 34,
    tag: "Hardware Core",
    focus: "Chip Design, RTL Coding, FPGA",
    techs: ["Verilog", "SystemVerilog", "ASIC"],
    syllabus: ["Digital Logic & CMOS", "Verilog RTL Design", "SystemVerilog Verification", "FPGA Prototyping", "Static Timing Analysis"],
    about: "Very-Large-Scale Integration (VLSI) is the process of creating an integrated circuit (IC) by combining millions or billions of MOS transistors onto a single chip. It is the absolute foundation of all modern electronics, from your smartphone to high-performance AI clusters.",
    whyChoose: "The world is experiencing a critical pivot towards specialized silicon. General-purpose CPUs are no longer sufficient for AI and machine learning workloads. Mastering VLSI puts you at the bleeding edge of the hardware revolution, designing the physical neural engines of tomorrow.",
    marketGrowth: "The global semiconductor market is projected to reach $1 Trillion by 2030. Unprecedented demand from the Electric Vehicle (EV), Artificial Intelligence, and Aerospace sectors has created an absolute vacuum of skilled ASIC/FPGA engineers.",
    hiring: "Entry-level compensation for RTL engineers has surged 40% globally since 2020. Top recruiters aggressively seeking these skills include NVIDIA, Apple, Intel, AMD, and Qualcomm."
  },
  "mongodb-django": {
    id: "mongodb-django",
    title: "MongoDB & Django Systems",
    iconId: "database",
    length: "40h Intensive",
    modules: 33,
    tag: "Backend Scalability",
    focus: "NoSQL, REST APIs, Microservices",
    techs: ["MongoDB", "Django", "Python"],
    syllabus: ["Python & Django Fundamentals", "RESTful API Architecture", "MongoDB Data Modeling", "Authentication & Security", "Microservices Deployment"],
    about: "This domain focuses on engineering robust, high-throughput backend systems. By pairing the rapid development capabilities of Python's Django framework with the massive horizontal scalability of MongoDB, you build systems capable of handling millions of concurrent operations.",
    whyChoose: "Data is the new oil, but unstructured data is the raw crude. Relational databases choke under modern, varied data loads. Mastering NoSQL (MongoDB) combined with a hardened backend framework (Django) makes you an architectural powerhouse capable of scaling startups to enterprise levels.",
    marketGrowth: "The cloud computing and backend infrastructure market is scaling at a 15% CAGR. Companies are migrating away from monolithic SQL structures to agile, microservice-based NoSQL architectures to handle Big Data.",
    hiring: "Backend architects utilizing Python and NoSQL are among the most consistently hired engineers worldwide. Major players like Instagram, Spotify, and Uber heavily rely on these exact tech stacks."
  },
  "embedded": {
    id: "embedded",
    title: "Embedded Systems Engineering",
    iconId: "cpu",
    length: "40h Intensive",
    modules: 26,
    tag: "Hardware Core",
    focus: "IoT, Microcontrollers, RTOS",
    techs: ["C++", "RTOS", "ARM Cortex"],
    syllabus: ["C/C++ for Embedded", "ARM Cortex-M Architecture", "RTOS Concepts & FreeRTOS", "I2C, SPI, UART Protocols", "IoT Edge Computing"],
    about: "Embedded systems sit at the critical junction between hardware and software. This is the engineering of dedicated computing systems within larger mechanical or electrical systems, specifically focusing on microcontrollers and Real-Time Operating Systems (RTOS).",
    whyChoose: "If you want your code to move physical objects, fly drones, or control medical devices, this is the domain. Embedded engineers write the incredibly efficient, low-latency C++ code that keeps the physical world functioning without crashing.",
    marketGrowth: "The Internet of Things (IoT) and automotive electronics (EV/Autonomous driving) are driving a $150 Billion expansion in the embedded market. Every physical device is becoming smart, requiring an embedded system.",
    hiring: "Massive talent shortage. Automotive giants (Tesla, Ford), aerospace (SpaceX, Boeing), and consumer electronics (Sony, Samsung) are fighting over a limited pool of engineers who truly understand memory-safe embedded C/C++."
  },
  "fullstack": {
    id: "fullstack",
    title: "Full Stack NodeJS Architecture",
    iconId: "code",
    length: "45h Intensive",
    modules: 42,
    tag: "Full Stack",
    focus: "React, Node, CI/CD pipelines",
    techs: ["React", "Node.js", "TypeScript"],
    syllabus: ["Advanced JavaScript/TypeScript", "React & State Management", "Node.js & Express Backends", "SQL & NoSQL Integration", "Docker & CI/CD Pipelines"],
    about: "End-to-end web architecture. You will master the entire modern JavaScript ecosystem, using TypeScript to enforce strict typing across both the React frontend and the highly asynchronous Node.js backend. This is the art of building complete platforms.",
    whyChoose: "Full Stack engineers are the ultimate generalists and the backbone of the tech industry. You don't just build a piece of the puzzle; you build, deploy, and scale the entire product yourself. It is the fastest path to becoming a CTO or technical founder.",
    marketGrowth: "The web development sector continues its unstoppable growth. The shift towards Single Page Applications (SPAs) and Serverless architectures has cemented the JavaScript/TypeScript ecosystem as the universal language of the web.",
    hiring: "Unmatched volume of opportunities. From Y-Combinator startups to Fortune 500 enterprises, every company needs full-stack engineers to maintain and scale their web products."
  },
  "ai": {
    id: "ai",
    title: "Applied Data Science & AI",
    iconId: "network",
    length: "50h Intensive",
    modules: 40,
    tag: "Intelligence",
    focus: "Deep Learning, PyTorch, MLOps",
    techs: ["Python", "PyTorch", "TensorFlow"],
    syllabus: ["Data Engineering & Pandas", "Machine Learning Algorithms", "Deep Learning & Neural Networks", "PyTorch & Computer Vision", "MLOps & Model Deployment"],
    about: "This is not just data analysis; this is Applied Artificial Intelligence. You will engineer deep neural networks using PyTorch, process massive datasets, and deploy intelligent models to production environments using modern MLOps practices.",
    whyChoose: "AI is no longer a research experiment; it is an industrial requirement. By mastering deep learning and the mathematics behind neural architectures, you position yourself at the forefront of the most significant technological paradigm shift since the internet.",
    marketGrowth: "The AI market is experiencing hyper-growth, projected to surpass $1.5 Trillion by 2030. The integration of LLMs (Large Language Models) and computer vision into legacy systems is driving unprecedented enterprise spending.",
    hiring: "Data Scientists and ML Engineers are commanding the highest compensation packages in the industry. OpenAI, Google DeepMind, Meta, and virtually every hedge fund are aggressively recruiting PyTorch experts."
  },
  "react-native": {
    id: "react-native",
    title: "React Native Ecosystems",
    iconId: "zap",
    length: "35h Intensive",
    modules: 28,
    tag: "Frontend Mobile",
    focus: "Cross-platform, Animations, Redux",
    techs: ["React Native", "Redux", "Swift"],
    syllabus: ["React Native Architecture", "Navigation & State (Redux)", "Native Device Features", "Complex Animations (Reanimated)", "App Store Deployment"],
    about: "Engineering cross-platform mobile applications that feel entirely native. You will bypass the need to write separate Swift and Kotlin codebases, using React Native to deliver 60fps mobile experiences to both iOS and Android from a single codebase.",
    whyChoose: "Mobile traffic dominates global internet usage. Companies cannot afford to maintain two separate mobile engineering teams. React Native solves this billion-dollar problem, making engineers who can write smooth, performant cross-platform code incredibly valuable.",
    marketGrowth: "The mobile app market generates over $400 Billion annually. As hardware limits are removed, the demand for complex, heavily animated, and high-performance mobile applications continues to skyrocket.",
    hiring: "React Native is heavily backed by Meta and utilized by giants like Shopify, Discord, and Uber Eats. The demand for engineers who can bridge the gap between web React and native mobile APIs is at an all-time high."
  }
};

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 6s ease-in-out 3s infinite;
  }
`;

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

const ParticleCanvas = ({ theme }) => {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.0 + 1.0;
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.colorType = Math.floor(Math.random() * 3);
        this.orbitRadius = Math.random() * 30 + 10;
      }

      update() {
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;

            const tangentialX = -forceDirectionY;
            const tangentialY = forceDirectionX;

            let radialForce = force * 0.35; // Stronger attraction to pull them closer
            if (distance < this.orbitRadius) {
              radialForce = -0.8 * ((this.orbitRadius - distance) / this.orbitRadius); // Restrictive boundary closer to the mouse
            }

            this.speedX += forceDirectionX * radialForce;
            this.speedY += forceDirectionY * radialForce;

            this.speedX += tangentialX * force * 0.3; // Slightly lower tangential speed for smooth tight orbit
            this.speedY += tangentialY * force * 0.3;
          } else {
            this.speedX += (this.baseSpeedX - this.speedX) * 0.03;
            this.speedY += (this.baseSpeedY - this.speedY) * 0.03;
          }
        } else {
          this.speedX += (this.baseSpeedX - this.speedX) * 0.03;
          this.speedY += (this.baseSpeedY - this.speedY) * 0.03;
        }

        this.speedX *= 0.97;
        this.speedY *= 0.97;

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
          this.baseSpeedX *= -1;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
          this.baseSpeedY *= -1;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }
      }

      draw() {
        const currentColors = themeRef.current === 'light'
          ? ['#E6C875', '#000000', '#555555']
          : ['#E6C875', '#ffffff', '#444444'];

        ctx.fillStyle = currentColors[this.colorType];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 160 : 450;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 90) {
            ctx.beginPath();
            ctx.strokeStyle = themeRef.current === 'light'
              ? `rgba(0, 0, 0, ${0.15 - distance / 600})`
              : `rgba(230, 200, 117, ${0.1 - distance / 900})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-40 dark:opacity-70 pointer-events-none z-0"
    />
  );
};

const Navbar = ({ currentRoute, setRoute, theme, toggleTheme, bootComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'courses', label: 'Domains' },
    { id: 'verify', label: 'Verifier' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    setRoute(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-b border-gray-200 dark:border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="flex flex-col">
              <span id="navbar-logo" className={`text-3xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center ${bootComplete === false ? 'opacity-0' : 'opacity-100'}`}>
                Ved<span className="text-[#E6C875] mx-1 font-light">/</span>Upskilling
              </span>
            </div>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-sm uppercase tracking-[0.15em] transition-all duration-500 ease-out ${currentRoute === link.id || currentRoute.startsWith('course:') && link.id === 'courses' ? 'text-[#E6C875] font-semibold' : 'text-gray-500 dark:text-white/60 hover:text-black dark:hover:text-white'
                  }`}
              >
                {link.label}
              </button>
            ))}

            <button onClick={toggleTheme} className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors mr-2">
              <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme === 'dark' ? 'translate-y-10 -translate-x-10 opacity-0 -rotate-90' : 'translate-y-0 translate-x-0 opacity-100 rotate-0'}`}>
                <Sun size={20} className="text-[#E6C875]" />
              </div>
              <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme === 'dark' ? 'translate-y-0 translate-x-0 opacity-100 rotate-0' : 'translate-y-10 translate-x-10 opacity-0 rotate-90'}`}>
                <Moon size={20} className="text-gray-500 dark:text-white/80" />
              </div>
            </button>

            <button
              onClick={() => handleNav('apply')}
              className="bg-black dark:bg-white hover:bg-[#E6C875] dark:hover:bg-[#E6C875] text-white dark:text-black px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-500 ease-out shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[#E6C875]/30">
              Apply
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme === 'dark' ? 'translate-y-10 -translate-x-10 opacity-0 -rotate-90' : 'translate-y-0 translate-x-0 opacity-100 rotate-0'}`}>
                <Sun size={24} className="text-[#E6C875]" />
              </div>
              <div className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${theme === 'dark' ? 'translate-y-0 translate-x-0 opacity-100 rotate-0' : 'translate-y-10 translate-x-10 opacity-0 rotate-90'}`}>
                <Moon size={24} className="text-gray-500 dark:text-white/80" />
              </div>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-white/80 transition-colors">
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-3xl border-b border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left text-xl tracking-wide ${currentRoute === link.id || currentRoute.startsWith('course:') && link.id === 'courses' ? 'text-[#E6C875]' : 'text-gray-700 dark:text-white/70'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const HomeView = ({ setRoute }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroContent = [
    {
      text: <span key="0">Stop Sending Resumes. <span className="text-[#E6C875]">Start Proving</span> Competence.</span>,
      buttonText: "Build Your Proof",
      route: "courses"
    },
    {
      text: <span key="1">Stop applying randomly. <span className="text-[#E6C875]">Find out exactly</span> why you are not getting interview calls.</span>,
      buttonText: "Analyse Your Resume",
      route: "analyse"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const reviews = [
    { name: "Siddharth V.", role: "Lead AI Engineer", initials: "SV", bg: "from-[#E6C875] to-yellow-800", quote: "The curriculum bridges the gap between academic theory and hardcore industry execution. Within 4 months of the Applied AI program, I spearheaded a machine learning transition at my firm." },
    { name: "Priya M.", role: "Senior Software Architect", initials: "PM", bg: "from-gray-300 dark:from-white to-gray-500 dark:to-gray-400", quote: "Ved Upskilling stripped away the unnecessary fluff. The 1-on-1 mentorship felt like I was already working as a Senior Full Stack Developer. It fundamentally changed how I write code." },
    { name: "Rahul D.", role: "Embedded Systems Lead", initials: "RD", bg: "from-[#E6C875]/60 to-yellow-900", quote: "The rigorous focus on actual hardware architecture rather than just theory allowed me to confidently clear the technical rounds at a top semiconductor firm. Unmatched quality." },
    { name: "Ananya K.", role: "Data Scientist", initials: "AK", bg: "from-gray-200 dark:from-gray-300 to-gray-400 dark:to-gray-600", quote: "I transitioned from a basic analytics role to building highly scalable PyTorch models. The Execution Protocol is intense, but the resulting career trajectory is undeniable." }
  ];

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <div className="relative min-h-screen flex flex-col justify-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={100}>
              <div>
                <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse shadow-[0_0_10px_#E6C875]"></span>
                  <span className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-[0.25em]">Admissions Open 2026</span>
                </div>

                <div className="h-[240px] sm:h-[180px] md:h-[220px] lg:h-[260px] flex items-center relative mb-4">
                  {heroContent.map((item, idx) => (
                    <h1 
                      key={idx}
                      className={`absolute top-0 left-0 w-full text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 dark:text-white tracking-tighter leading-[1.05] transition-all duration-700 ease-in-out ${idx === heroIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                    >
                      {item.text}
                    </h1>
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 mb-12 font-light leading-relaxed tracking-wide max-w-xl">
                  A minimalist, practitioner-led ecosystem. Master AI, Full Stack, and Embedded Systems through precision engineering and real-world execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                  <button
                    onClick={() => setRoute(heroContent[heroIndex].route)}
                    className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  >
                    <span className="transition-all duration-500">{heroContent[heroIndex].buttonText}</span>
                    <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => setRoute('about')}
                    className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
                  >
                    Discover Our Method
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-bold text-gray-900 dark:text-white/80">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.6</span> <span>Google</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.89</span> <span>Course Report</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.97</span> <span>Switchup</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#E6C875]">⭐ 4.7</span> <span>Career Karma</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="relative min-h-[600px] py-12 md:py-0 rounded-[3rem] border border-gray-200 dark:border-white/5 flex items-center justify-center group overflow-hidden bg-gradient-to-br from-black/[0.02] dark:from-white/[0.03] to-transparent backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(230,200,117,0.05)]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E6C875]/10 rounded-full blur-[80px] group-hover:bg-[#E6C875]/20 group-hover:scale-110 transition-all duration-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-200/50 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-gray-300/50 dark:group-hover:bg-white/10 group-hover:scale-110 transition-all duration-1000"></div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 w-full max-w-[450px]">
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:translate-y-8 animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Code className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Architecture</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Systems built for immense, unbounded scale.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl transform sm:-translate-y-8 animate-float-delayed shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-500">
                    <Zap className="text-gray-900 dark:text-white w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Execution</h4>
                    <p className="text-gray-600 dark:text-white/50 text-sm mt-3 font-light leading-relaxed">Flawless, high-performance rapid delivery.</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-[#E6C875]/10 to-transparent border border-[#E6C875]/30 p-8 rounded-[2rem] backdrop-blur-xl animate-float shadow-lg dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[#E6C875]/50 transition-colors duration-500">
                    <ShieldCheck className="text-[#E6C875] w-10 h-10 mb-6" strokeWidth={1.5} />
                    <h4 className="text-gray-900 dark:text-white font-medium text-lg">Verification</h4>
                    <p className="text-[#D4AF37] dark:text-[#E6C875]/70 text-sm mt-3 font-light leading-relaxed">Cryptographically secured achievements backed by Wipro DICE ID.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gradient-to-b from-gray-50 dark:from-black to-white dark:to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Designed for Mastery.</h2>
              <p className="text-gray-600 dark:text-white/60 text-2xl max-w-3xl mx-auto font-light leading-relaxed">Precision curriculums engineered by industry veterans, built for those who demand absolute excellence.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 auto-rows-[350px]">
            <ScrollReveal delay={100}>
              <div className="h-full md:col-span-2 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 relative overflow-hidden group backdrop-blur-2xl transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10">
                <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110 duration-1000 ease-out text-gray-900 dark:text-white">
                  <Users size={400} strokeWidth={0.5} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#E6C875]/20 to-transparent text-[#E6C875] rounded-full flex items-center justify-center backdrop-blur-xl border border-[#E6C875]/20 shadow-[0_0_30px_rgba(230,200,117,0.1)]">
                    <Users size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Industry Pioneer Mentorship.</h3>
                    <p className="text-gray-600 dark:text-white/60 max-w-xl font-light text-xl leading-relaxed">Direct 1-on-1 guidance from professionals shaping the future at top multinationals. No teaching assistants, only absolute experts.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="h-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10 backdrop-blur-2xl flex flex-col justify-between">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent text-gray-900 dark:text-white rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <LayoutDashboard size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Advanced LMS.</h3>
                  <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed">A seamless, proprietary dashboard tracking your true technical progress.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="h-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 transition-all duration-700 hover:shadow-xl dark:hover:bg-white/[0.04] dark:hover:border-white/10 backdrop-blur-2xl flex flex-col justify-between">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent text-gray-900 dark:text-white rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <Zap size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Dynamic Sync.</h3>
                  <p className="text-gray-600 dark:text-white/60 font-light text-lg leading-relaxed">Live, interactive sessions strictly adapting to your intensive professional schedule.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="h-full md:col-span-2 bg-[#E6C875]/[0.05] dark:bg-[#E6C875]/[0.03] border border-[#E6C875]/30 dark:border-[#E6C875]/10 rounded-[3rem] p-16 relative overflow-hidden transition-all duration-700 hover:shadow-xl dark:hover:bg-[#E6C875]/[0.05] dark:hover:border-[#E6C875]/20 backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E6C875]/10 dark:from-[#E6C875]/5 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-20 h-20 bg-white dark:bg-[#E6C875]/10 text-[#E6C875] rounded-full flex items-center justify-center border border-[#E6C875]/30 dark:border-[#E6C875]/20 shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                    <ShieldCheck size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Cryptographic Credentials.</h3>
                    <p className="text-[#B8860B] dark:text-[#E6C875]/80 max-w-xl font-light text-xl leading-relaxed">Verified via DICE ID blockchain. Universally trusted and instantly verifiable by global tech recruiters.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="py-40 relative z-10 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Proven Trajectories.</h2>
                <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed">Our alumni don't just find jobs; they dictate the architectural decisions at the world's leading technological firms.</p>
              </div>
              <div className="mt-12 lg:mt-0 flex space-x-12 text-[#E6C875]">
                <div className="text-right">
                  <p className="text-6xl font-medium tracking-tighter">94%</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] mt-3 font-semibold">Placement Rate</p>
                </div>
                <div className="text-right">
                  <p className="text-6xl font-medium tracking-tighter">2.4x</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] mt-3 font-semibold">Avg Salary Bump</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            {reviews.slice(0, showAllReviews ? 4 : 2).map((review, idx) => (
              <ScrollReveal key={idx} delay={(idx % 2 + 1) * 100}>
                <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-12 rounded-[3rem] shadow-xl dark:shadow-none hover:shadow-2xl dark:hover:bg-white/[0.03] transition-all backdrop-blur-xl h-full flex flex-col justify-between">
                  <div>
                    <Quote className="text-[#E6C875]/50 dark:text-[#E6C875]/30 w-12 h-12 mb-8" />
                    <p className="text-gray-700 dark:text-white/80 text-xl font-light leading-relaxed mb-12">
                      "{review.quote}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-6 border-t border-gray-200 dark:border-white/10 pt-8 mt-auto">
                    <div className={`w-16 h-16 bg-gradient-to-br ${review.bg} rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center overflow-hidden shadow-lg dark:shadow-[0_0_20px_rgba(230,200,117,0.2)]`}>
                      <span className="text-white dark:text-black font-bold text-xl tracking-widest">{review.initials}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium text-xl">{review.name}</h4>
                      <p className="text-[#B8860B] dark:text-[#E6C875]/70 text-sm mt-1 uppercase tracking-widest font-semibold">{review.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {!showAllReviews && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setShowAllReviews(true)}
                className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-500 ease-out"
              >
                Read More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CoursesView = ({ setRoute }) => {
  return (
    <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-12 border-b border-gray-200 dark:border-white/10">
            <div>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Elite Domains.</h1>
              <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-4xl leading-relaxed">Curriculum engineered relentlessly for the next generation of technological leaders. Filter out the noise and master the essence.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.values(domainsData).map((course, idx) => {

            const IconComponent = () => {
              if (course.iconId === 'cpu') return <Cpu size={160} strokeWidth={1} />;
              if (course.iconId === 'database') return <Database size={160} strokeWidth={1} />;
              if (course.iconId === 'code') return <Code size={160} strokeWidth={1} />;
              if (course.iconId === 'network') return <Network size={160} strokeWidth={1} />;
              if (course.iconId === 'zap') return <Zap size={160} strokeWidth={1} />;
              return <Cpu size={160} strokeWidth={1} />;
            };

            return (
              <ScrollReveal key={course.id} delay={idx * 100}>
                <div
                  className="group bg-white dark:bg-white/[0.02] rounded-[3rem] border border-gray-200 dark:border-white/[0.05] overflow-hidden hover:shadow-2xl dark:hover:bg-white/[0.04] dark:hover:border-[#E6C875]/30 transition-all duration-700 ease-out backdrop-blur-xl flex flex-col h-full shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer"
                  onClick={() => setRoute(`course:${course.id}`)}
                >
                  <div className="h-64 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 dark:from-white/[0.01] to-transparent border-b border-gray-100 dark:border-white/[0.02]">
                    <div className="text-gray-200 dark:text-white/10 transform group-hover:scale-125 group-hover:text-[#E6C875]/30 transition-all duration-1000 ease-out">
                      <IconComponent />
                    </div>
                    <div className="absolute top-8 left-8 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 px-5 py-2 rounded-full flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">{course.length}</span>
                    </div>
                  </div>

                  <div className="p-12 relative z-20 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E6C875] mb-5">{course.tag}</div>
                      <h3 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white mb-5 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">{course.title}</h3>
                      <p className="text-gray-600 dark:text-white/50 font-light text-lg mb-6 leading-relaxed">Focus: {course.focus}</p>

                      <div className="flex flex-wrap gap-3 mb-8">
                        {course.techs.map(tech => (
                          <div key={tech} className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-white/70 shadow-inner group-hover:border-[#E6C875]/50 group-hover:text-[#B8860B] dark:group-hover:text-white transition-colors duration-500">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-8 mt-4">
                      <div className="flex items-center text-gray-700 dark:text-white/70 text-base font-semibold">
                        <BookOpen size={20} strokeWidth={2} className="mr-3 text-[#E6C875]" />
                        {course.modules} Modules
                      </div>
                      <button className="text-gray-900 dark:text-white group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] font-bold text-sm uppercase tracking-widest flex items-center transition-colors duration-300">
                        View Domain Details <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const CourseDetailView = ({ courseId, setRoute }) => {
  const course = domainsData[courseId];
  if (!course) return <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white text-3xl">Domain Not Found</div>;

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => setRoute('courses')}
          className="flex items-center text-gray-500 dark:text-white/50 hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-bold group"
        >
          <ChevronRight size={18} className="rotate-180 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Domains Catalog
        </button>

        <ScrollReveal>
          <div className="mb-32">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-[#E6C875] mb-6">{course.tag}</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-gray-900 dark:text-white mb-10 leading-[1.05]">{course.title}</h1>
            <p className="text-gray-600 dark:text-white/60 text-2xl font-light max-w-5xl leading-relaxed">{course.about}</p>

            <div className="flex flex-wrap gap-4 mt-12">
              {course.techs.map(tech => (
                <div key={tech} className="px-6 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/20 rounded-full text-sm font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white shadow-inner dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 mb-32">
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Star className="text-[#E6C875] mr-5" size={32} /> Why Choose This Stack?</h3>
              <p className="text-gray-600 dark:text-white/60 font-light text-xl leading-relaxed">{course.whyChoose}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Network className="text-[#E6C875] mr-5" size={32} /> Market Trajectory</h3>
              <p className="text-gray-600 dark:text-white/60 font-light text-xl leading-relaxed">{course.marketGrowth}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="md:col-span-2 bg-gradient-to-r from-gray-50 dark:from-white/[0.02] to-[#E6C875]/[0.05] border border-[#E6C875]/30 dark:border-[#E6C875]/20 rounded-[3rem] p-16 backdrop-blur-2xl h-full shadow-xl dark:shadow-[0_0_50px_rgba(230,200,117,0.1)]">
              <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 flex items-center"><Users className="text-[#E6C875] mr-5" size={32} /> Hiring Landscape</h3>
              <p className="text-[#B8860B] dark:text-[#E6C875]/80 font-light text-2xl leading-relaxed">{course.hiring}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="border-t border-gray-200 dark:border-white/10 pt-32 mb-32">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-20 text-center">Execution Protocol.</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-black/60 border border-gray-200 dark:border-white/10 rounded-3xl p-10 flex items-center hover:border-[#E6C875]/50 dark:hover:border-[#E6C875]/50 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-500 shadow-md dark:shadow-lg">
                  <div className="text-6xl font-medium text-gray-200 dark:text-white/5 mr-10 w-24 text-right">{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className="text-2xl text-gray-800 dark:text-white/80 font-light">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[4rem] p-24 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <h2 className="text-5xl font-medium text-gray-900 dark:text-white mb-10">Ready to master {course.tag}?</h2>
            <p className="text-gray-600 dark:text-white/50 text-xl font-light mb-12 max-w-2xl mx-auto">Admissions for the upcoming intensive cohort are strictly limited. Submit your credentials for evaluation.</p>
            <button
              onClick={() => setRoute('apply')}
              className="bg-black dark:bg-white text-white dark:text-black px-16 py-6 rounded-full font-bold uppercase tracking-widest text-xl hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-105 transition-all duration-500 ease-out shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Apply For Domain
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

const AboutView = () => (
  <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out relative overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#E6C875]/5 rounded-full blur-[150px] pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto text-center mb-40">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">Redefining Learning.</h1>
          <p className="text-3xl text-gray-600 dark:text-white/60 leading-relaxed font-light">
            We break barriers to engineer your success. A singular focus on bridging the chasm between theoretical academia and aggressive industry demands.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="w-full h-[500px] rounded-[4rem] overflow-hidden mb-40 border border-gray-200 dark:border-white/[0.05] relative bg-white dark:bg-white/[0.02] backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E6C875]/20 dark:from-[#E6C875]/10 to-transparent rounded-full blur-[100px] pointer-events-none group-hover:bg-[#E6C875]/30 dark:group-hover:bg-[#E6C875]/15 transition-colors duration-1000"></div>

          <div className="w-32 h-32 mb-10 rounded-full border border-[#E6C875]/50 dark:border-[#E6C875]/30 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-[#E6C875]/30 dark:border-[#E6C875]/10 animate-ping" style={{ animationDuration: '3s' }}></div>
            <Network className="text-[#E6C875] w-12 h-12" strokeWidth={1} />
          </div>

          <h3 className="text-5xl text-gray-900 dark:text-white font-medium mb-6 relative z-10 tracking-tight">The Ved Ecosystem</h3>
          <p className="text-gray-600 dark:text-white/50 text-2xl font-light max-w-2xl relative z-10 leading-relaxed">An uncompromising environment where theory is aggressively tested against reality.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-12 mb-40">
        <ScrollReveal delay={100}>
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
            <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Mission.</h3>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-2xl">
              Blending profound innovation with elite industry expertise. We craft an educational ecosystem that transforms raw potential into executing professionals capable of building highly scalable infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] p-16 rounded-[4rem] backdrop-blur-2xl hover:shadow-xl dark:hover:bg-white/[0.03] transition-all shadow-lg dark:shadow-none">
            <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-8">Our Vision.</h3>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed font-light text-2xl">
              Universal access to world-class, rigorous tech education. Making mastery deeply engaging and undeniably impactful for the dedicated learner. We completely reject mediocrity.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={100}>
        <div className="border-t border-gray-200 dark:border-white/5 pt-32 text-center">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-24">The Elite Faculty.</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border border-gray-200 dark:border-white/[0.05] mb-10 relative bg-gradient-to-br from-gray-50 dark:from-white/[0.02] to-gray-100 dark:to-white/[0.05] flex items-center justify-center backdrop-blur-2xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-[#E6C875]/50 dark:group-hover:border-[#E6C875]/30 transition-all duration-700">
                  <div className="absolute inset-0 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <span className="text-5xl text-gray-300 dark:text-white/20 font-light group-hover:text-[#E6C875] transition-colors duration-700">0{item}</span>
                </div>
                <h4 className="text-3xl font-medium text-gray-900 dark:text-white mb-4">Senior Architect</h4>
                <p className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6">Ex-FAANG</p>
                <p className="text-gray-600 dark:text-white/50 font-light text-lg leading-relaxed max-w-xs mx-auto">Specializing in high-throughput systems and advanced algorithmic design.</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

const mockCertificates = {
  "VED-2026-AI-001": {
    name: "Siddharth V.",
    position: "Lead AI Engineer @ Oracle",
    stack: "Applied Data Science & AI",
    date: "March 15, 2026",
    id: "VED-2026-AI-001"
  },
  "VED-2026-FS-882": {
    name: "Priya M.",
    position: "Software Architect @ Meta",
    stack: "Full Stack NodeJS Architecture",
    date: "April 02, 2026",
    id: "VED-2026-FS-882"
  },
  "VED-2026-VL-104": {
    name: "Rahul D.",
    position: "Hardware Engineer @ NVIDIA",
    stack: "VLSI Design Architecture",
    date: "January 20, 2026",
    id: "VED-2026-VL-104"
  }
};

const VerifierView = () => {
  const [state, setState] = useState('idle'); // idle, loading, verified, review, success
  const [certId, setCertId] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setState('loading');
    setError('');

    setTimeout(() => {
      const data = mockCertificates[certId.trim().toUpperCase()];
      if (data) {
        setProfile(data);
        setState('verified');
      } else {
        setError('Cryptographic verification failed. Invalid Certificate ID.');
        setState('idle');
      }
    }, 1200);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center animate-in fade-in duration-1000 ease-out">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">

        {state === 'idle' || state === 'loading' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-16 md:p-24 backdrop-blur-3xl relative overflow-hidden text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#E6C875]/10 rounded-full blur-[150px] pointer-events-none"></div>

              <div className="relative z-10">
                <div className="inline-flex justify-center items-center w-28 h-28 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-12 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                  <ShieldCheck size={50} strokeWidth={1} className={state === 'loading' ? 'text-[#E6C875] animate-pulse' : 'text-[#E6C875]'} />
                </div>

                <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-10">
                  {state === 'loading' ? 'Verifying Ledger...' : 'Verify Protocol.'}
                </h2>
                <p className="text-gray-600 dark:text-white/60 mb-16 max-w-2xl mx-auto font-light text-2xl leading-relaxed">
                  Confirm cryptographic authenticity. Issued in exclusive partnership with Wipro DICE ID blockchain infrastructure.
                </p>

                <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleVerify}>
                  <div>
                    <input
                      type="text"
                      value={certId}
                      onChange={(e) => setCertId(e.target.value)}
                      disabled={state === 'loading'}
                      placeholder="e.g. VED-2026-AI-001"
                      className="w-full bg-gray-50 dark:bg-black/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-10 py-8 text-center text-xl focus:outline-none focus:border-[#E6C875] dark:focus:border-[#E6C875] transition-all duration-500 font-light tracking-[0.2em] placeholder:text-gray-400 dark:placeholder:text-white/20 shadow-inner"
                    />
                  </div>

                  {error && <p className="text-red-500 font-bold tracking-widest text-sm uppercase animate-in fade-in">{error}</p>}

                  <button disabled={state === 'loading'} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-lg rounded-[2rem] px-10 py-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:hover:scale-100">
                    {state === 'loading' ? 'Querying Blockchain...' : 'Consult Ledger'}
                  </button>
                </form>

                <div className="mt-20 flex items-center justify-center space-x-3 text-sm text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase font-bold">
                  <ShieldCheck size={20} />
                  <span>Secured by Blockchain Validation</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : state === 'verified' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-12 md:p-16 backdrop-blur-3xl relative overflow-hidden shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6C875]/10 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="text-center mb-12 relative z-10 border-b border-gray-200 dark:border-white/10 pb-12">
                <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-8 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                  <Award size={36} strokeWidth={1.5} className="text-[#E6C875]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Cryptographic Identity Verified.</h2>
                <p className="text-[#E6C875] font-bold tracking-[0.2em] uppercase text-sm">Ledger Match Confirmed</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
                <div>
                  <h4 className="text-gray-500 dark:text-white/50 text-sm uppercase tracking-[0.2em] font-bold mb-8">Alumni Profile</h4>
                  <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-2">{profile.name}</h3>
                  <p className="text-xl text-gray-600 dark:text-white/70 font-light mb-8">{profile.position}</p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center space-x-4">
                      <Code className="text-[#E6C875]" size={20} />
                      <span className="text-gray-700 dark:text-white/80 font-medium">{profile.stack}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="text-[#E6C875]" size={20} />
                      <span className="text-gray-700 dark:text-white/80 font-medium">Issued: {profile.date}</span>
                    </div>
                  </div>

                  <button onClick={() => setState('review')} className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-500 shadow-xl w-full md:w-auto">
                    Write Domain Review
                  </button>
                </div>

                {/* Digital Certificate Visual */}
                <div className="bg-gradient-to-br from-gray-50 dark:from-white/[0.03] to-gray-200 dark:to-transparent border border-gray-300 dark:border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-2 border border-[#E6C875]/30 rounded-2xl pointer-events-none"></div>
                  <div className="text-center pt-6 pb-10">
                    <h5 className="text-[#E6C875] tracking-[0.4em] uppercase text-xs font-bold mb-6">Ved / Upskilling</h5>
                    <h3 className="text-2xl text-gray-900 dark:text-white font-medium mb-1">Certificate of Execution</h3>
                    <p className="text-gray-500 dark:text-white/50 text-[10px] tracking-widest uppercase mb-8">Blockchain Verified</p>

                    <h2 className="text-3xl text-[#B8860B] dark:text-[#E6C875] font-serif italic mb-6">{profile.name}</h2>

                    <div className="w-16 h-[1px] bg-[#E6C875]/50 mx-auto mb-6"></div>
                    <p className="text-gray-700 dark:text-white/80 text-sm max-w-[200px] mx-auto leading-relaxed">
                      Has successfully mastered the architecture and engineering of <br /><span className="font-bold">{profile.stack}</span>.
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-t border-gray-300 dark:border-white/10 pt-4 mt-4 px-2">
                    <span className="text-[9px] text-gray-400 dark:text-white/30 uppercase tracking-widest font-bold">ID: {profile.id}</span>
                    <ShieldCheck size={20} className="text-[#E6C875]/50" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : state === 'review' ? (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-12 md:p-16 backdrop-blur-3xl relative shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <button onClick={() => setState('verified')} className="text-gray-500 dark:text-white/50 hover:text-[#E6C875] uppercase tracking-widest text-xs font-bold mb-10 flex items-center transition-colors">
                <ChevronRight size={16} className="rotate-180 mr-2" /> Back to Certificate
              </button>

              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">Post Execution Review.</h2>
              <p className="text-gray-600 dark:text-white/60 mb-12 font-light text-xl">Share your experience mastering the <span className="font-bold text-[#E6C875]">{profile.stack}</span> architecture.</p>

              <form className="space-y-8" onSubmit={handleReviewSubmit}>
                <div>
                  <label className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-4 block">Current Position</label>
                  <input type="text" defaultValue={profile.position} className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-4 block">Execution Review</label>
                  <textarea rows="5" placeholder="Detail your learning trajectory, the mentorship quality, and your ultimate placement outcome..." className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light resize-none"></textarea>
                </div>
                <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-lg rounded-2xl px-8 py-6 mt-4 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] transition-all duration-500 shadow-xl">
                  Publish to Public Ledger
                </button>
              </form>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-16 md:p-24 backdrop-blur-3xl text-center shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-gray-50 dark:bg-black/50 border border-[#E6C875]/50 dark:border-[#E6C875]/30 mb-10 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(230,200,117,0.15)]">
                <Star size={40} strokeWidth={1.5} className="text-[#E6C875]" />
              </div>
              <h2 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Review Published.</h2>
              <p className="text-gray-600 dark:text-white/60 mb-12 font-light text-2xl max-w-xl mx-auto">Your execution review has been successfully broadcast to the global alumni network.</p>
              <button onClick={() => setState('verified')} className="bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-500">
                Return to Certificate
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

const ApplyView = () => (
  <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">Application Protocol.</h1>
          <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed">Admission to Ved Upskilling is strictly merit-based. Submit your credentials for evaluation.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-12 md:p-16 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>

            <div>
              <h4 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">01. Identity Matrix</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Legal First Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
                <input type="text" placeholder="Legal Last Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
              </div>
            </div>

            <div>
              <h4 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">02. Communication Vectors</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="email" placeholder="Professional Email Address" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
                <input type="tel" placeholder="Mobile Number" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light" />
              </div>
            </div>

            <div>
              <h4 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">03. Target Architecture</h4>
              <select className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/70 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light">
                <option>Select Target Domain</option>
                <option>VLSI Design Architecture</option>
                <option>MongoDB & Django Systems</option>
                <option>Embedded Systems Engineering</option>
                <option>Full Stack NodeJS Architecture</option>
                <option>Applied Data Science & AI</option>
              </select>
            </div>

            <div>
              <h4 className="text-[#E6C875] text-sm uppercase tracking-[0.2em] font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">04. Current Baseline</h4>
              <textarea rows="4" placeholder="Briefly describe your current technical proficiency and what you are building..." className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light resize-none"></textarea>
            </div>

            <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-lg rounded-2xl px-8 py-6 mt-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Transmit Application
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

const ContactView = () => (
  <div className="min-h-screen pt-40 pb-40 animate-in fade-in duration-1000 ease-out">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <ScrollReveal>
          <div>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 dark:text-white mb-12">Initiate Contact.</h1>
            <p className="text-gray-600 dark:text-white/60 text-2xl font-light leading-relaxed mb-20 max-w-lg">
              Our admissions engineering team is ready to perfectly align your trajectory with the right technological domain.
            </p>

            <div className="space-y-16">
              <div className="flex items-start space-x-10 group">
                <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                  <MapPin size={40} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Global Headquarters</h4>
                  <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">Ved Upskilling Campus<br />Bengaluru, Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-10 group">
                <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                  <Mail size={40} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Digital Comms</h4>
                  <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">admissions@vedupskilling.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-10 group">
                <div className="mt-1 text-gray-400 dark:text-white/20 group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-700">
                  <Phone size={40} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-medium text-3xl tracking-wide mb-4">Direct Line</h4>
                  <p className="text-gray-600 dark:text-white/50 font-light text-xl leading-relaxed">+91 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[4rem] p-16 backdrop-blur-3xl shadow-2xl dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E6C875]/10 dark:bg-[#E6C875]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <h3 className="text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-12 relative z-10">Request Callback.</h3>

            <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <input type="text" placeholder="First Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
                </div>
                <div>
                  <input type="text" placeholder="Last Name" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
                </div>
              </div>
              <div>
                <input type="email" placeholder="Professional Email" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 transition-colors font-light placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>
              <div>
                <select className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 rounded-[2rem] px-8 py-6 text-xl focus:outline-none focus:border-[#E6C875]/50 appearance-none font-light cursor-pointer">
                  <option>Select Domain of Interest</option>
                  <option>Full Stack Architecture</option>
                  <option>Applied AI & Data Science</option>
                  <option>Embedded Systems</option>
                </select>
              </div>
              <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-lg rounded-[2rem] px-8 py-7 mt-8 hover:bg-[#E6C875] dark:hover:bg-[#E6C875] hover:scale-[1.02] transition-all duration-500 shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Submit Inquiry
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-white/5 pt-32 pb-16 relative z-10 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-20 mb-24">
        <div className="md:col-span-2">
          <span className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white flex items-center mb-10">
            Ved<span className="text-[#E6C875] mx-2 font-light">/</span>Upskilling
          </span>
          <p className="text-gray-600 dark:text-white/50 max-w-lg font-light text-xl leading-relaxed">
            Elevating careers through precision engineering, rigorous curriculums, and real-world execution. The apex of technical education.
          </p>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Architecture</h4>
          <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">About Mission</li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Elite Domains</li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Credential Verifier</li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Initiate Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-bold tracking-[0.2em] uppercase text-sm mb-10">Legal Ledger</h4>
          <ul className="space-y-6 text-gray-600 dark:text-white/50 font-light text-lg">
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Privacy Protocol</li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Terms of Service</li>
            <li className="hover:text-gray-900 dark:hover:text-white hover:translate-x-2 transform transition-all cursor-pointer">Refund Policy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-white/30 font-bold tracking-[0.2em] uppercase">
        <p>© 2026 Ved Upskilling. All Rights Reserved.</p>
        <p className="mt-6 md:mt-0">Engineered for Elite Performance.</p>
      </div>
    </div>
  </footer>
);

// --- INTRO BOOT SEQUENCE ---
const BootSequence = ({ onComplete, theme }) => {
  const [phase, setPhase] = useState(0);
  const [targetTransform, setTargetTransform] = useState('translate(0px, 0px) scale(1)');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300); // Line appears
    const t2 = setTimeout(() => setPhase(2), 1000); // Text slides in
    const t3 = setTimeout(() => setPhase(3), 2400); // Hold
    const t4 = setTimeout(() => {
      // Calculate exact transform to navbar logo
      const target = document.getElementById('navbar-logo');
      const bootLogo = document.getElementById('boot-logo');
      if (target && bootLogo) {
        const targetRect = target.getBoundingClientRect();
        const bootRect = bootLogo.getBoundingClientRect();

        // Calculate scale ratio based on width for exact font scaling match
        const scale = targetRect.width / bootRect.width;

        // Calculate centers to avoid baseline alignment issues
        const targetCx = targetRect.left + targetRect.width / 2;
        const targetCy = targetRect.top + targetRect.height / 2;
        const bootCx = bootRect.left + bootRect.width / 2;
        const bootCy = bootRect.top + bootRect.height / 2;

        // Calculate translation needed to move center to center
        const dx = targetCx - bootCx;
        const dy = targetCy - bootCy;

        setTargetTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
      }
      setPhase(4);
    }, 3000); // Fly to target
    const t5 = setTimeout(() => onComplete(), 4000); // Unmount

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-1000 ${theme === 'dark' ? 'bg-black' : 'bg-[#F8F9FA]'} ${phase === 4 ? 'bg-transparent pointer-events-none' : ''}`}
    >
      <div
        id="boot-logo"
        style={{
          transformOrigin: 'center',
          transform: phase === 4 ? targetTransform : 'translate(0px, 0px) scale(1)'
        }}
        className={`flex items-center text-5xl md:text-7xl font-medium tracking-tight transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}
      >
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 2 ? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          Ved
        </div>

        <div
          className={`mx-1 md:mx-2 text-[#E6C875] font-light transition-all duration-700 ease-out transform ${phase >= 1 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
        >
          /
        </div>

        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${phase >= 2 ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          Upskilling
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderView = () => {
    if (currentRoute.startsWith('course:')) {
      const courseId = currentRoute.split(':')[1];
      return <CourseDetailView courseId={courseId} setRoute={setCurrentRoute} />;
    }

    switch (currentRoute) {
      case 'home': return <HomeView setRoute={setCurrentRoute} />;
      case 'courses': return <CoursesView setRoute={setCurrentRoute} />;
      case 'about': return <AboutView />;
      case 'verify': return <VerifierView />;
      case 'contact': return <ContactView />;
      case 'apply': return <ApplyView />;
      default: return <HomeView setRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-[#E6C875]/30 selection:text-[#E6C875] overflow-x-clip transition-colors duration-1000">
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} theme={theme} />}
      {/* Sunrise Overlay Gradient */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/10 via-[#F8F9FA]/50 to-white/80 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 bg-gradient-to-tr from-[#E6C875]/5 via-black to-black/80 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
      />

      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* GLOBAL PARTICLES BACKGROUND */}
      <ParticleCanvas key={currentRoute} theme={theme} />

      <Navbar currentRoute={currentRoute} setRoute={setCurrentRoute} theme={theme} toggleTheme={toggleTheme} bootComplete={bootComplete} />

      <main className="relative z-10 pt-24">
        {renderView()}
      </main>

      <Footer />

      {/* Floating Action Protocol */}
      <a href="#" className="fixed bottom-10 right-10 w-20 h-20 bg-white dark:bg-white/[0.05] backdrop-blur-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#E6C875]/10 hover:border-[#E6C875]/50 dark:hover:border-[#E6C875]/30 rounded-full flex items-center justify-center transition-all duration-700 ease-out hover:scale-110 z-50 group shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white group-hover:text-[#E6C875] dark:group-hover:text-[#E6C875] transition-colors duration-500">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>
  );
}