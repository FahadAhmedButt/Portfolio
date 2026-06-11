import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // ─── NAV ────────────────────────────────────────────────────────────────────
  menuOpen = false;
  activeSection = 'home';
  scrolled = false;

  // ─── TYPING ANIMATION ────────────────────────────────────────────────────────
  roles = ['Data Analyst', 'Web Designer', 'Python Developer', 'Power BI Expert'];
  displayedRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: any;

  // ─── CONTACT FORM ────────────────────────────────────────────────────────────
  contactForm = { name: '', email: '', subject: '', message: '' };
  formSubmitted = false;
  formError = false;

  // ─── PROJECTS ────────────────────────────────────────────────────────────────
  projects = [
    {
      title: 'University LMS System',
      description:
        'Enterprise-grade Learning Management System for universities, featuring course management, student portals, attendance tracking, and academic reporting dashboards.',
      tech: ['Angular', 'Spring Boot', 'SQL Server', 'Jasper Reports'],
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'Full-Stack',
      image: 'assets/images/lms_project.png',
    },
    {
      title: 'E-commerce Website',
      description:
        'Full-featured Python Django e-commerce platform with product catalogue, cart management, secure payment gateway, and an admin panel for inventory management.',
      tech: ['Python', 'Django', 'MySQL', 'Bootstrap', 'HTML/CSS'],
      icon: '🛒',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      category: 'Web Design',
      image: 'assets/images/ecommerce_project.png',
    },
    {
      title: 'University Management System',
      description:
        'Comprehensive database-driven University Management System with HR, Accounting & Finance, student records, and multi-university ERP portal administration.',
      tech: ['SQL Server', 'Spring Boot', 'Angular', 'REST APIs'],
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      category: 'Database',
      image: 'assets/images/ums_project.png',
    },
    {
      title: 'Jasper Reports Design System',
      description:
        'Data-driven reporting solution using JasperSoft for university dashboards — fee receipts, marksheets, student progress reports, and financial analytics.',
      tech: ['JasperReports', 'JasperSoft', 'SQL Server', 'Java'],
      icon: '📊',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      category: 'Reporting',
      image: 'assets/images/jasper_reports.png',
    },
  ];

  // ─── SKILLS ──────────────────────────────────────────────────────────────────
  skillCategories = [
    {
      name: 'Frontend',
      icon: '🖥️',
      skills: ['Angular', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Responsive UI/UX'],
    },
    {
      name: 'Backend',
      icon: '⚙️',
      skills: ['Spring Boot', 'Django', 'Node.js', 'Express.js', 'PHP', 'REST API Integration'],
    },
    {
      name: 'Databases',
      icon: '🗄️',
      skills: ['SQL Server', 'MySQL', 'MongoDB', 'Query Optimization', 'Schema Design'],
    },
    {
      name: 'Reporting',
      icon: '📊',
      skills: ['JasperReports', 'JasperSoft', 'Data-Driven Reports', 'Dashboard Design'],
    },
    {
      name: 'ERP / LMS',
      icon: '🏛️',
      skills: ['University ERP Portals', 'LMS Administration', 'HR Modules', 'Finance Modules', 'Student Modules'],
    },
    {
      name: 'Dev Tools',
      icon: '🛠️',
      skills: ['IntelliJ IDEA', 'Git', 'VS Code', 'Postman'],
    },
  ];

  // ─── EXPERIENCE TIMELINE ─────────────────────────────────────────────────────
  experiences = [
    {
      role: 'Junior Software Developer',
      company: 'SyntaxMatic Technologies',
      period: 'Jan 2025 – Present',
      type: 'work',
      points: [
        'Administered and maintained ERP/LMS portals for 7 well-known universities across Pakistan and Saudi Arabia.',
        'Developed and maintained Angular-based frontend applications with responsive UI/UX for university portals.',
        'Designed and optimized SQL Server databases for ERP modules including CMS, HR, and Accounting & Finance.',
        'Built and integrated Jasper Reports for data-driven reporting across university dashboards.',
        'Integrated RESTful APIs using Spring Boot backend with Angular frontend for seamless data communication.',
        'Universities served: University of Agriculture Multan, UET Taxila, MNS University of Engineering, Punjab Tianjin University of Technology, Pakistan International School Al Khobar (Saudi Arabia), Fatima Jinnah Women University, University of Okara.',
      ],
    },
  ];

  education = [
    {
      degree: 'BS Computer Science',
      institution: 'GCU, Faisalabad',
      period: 'Sep 2021 – May 2025',
      coursework: 'Web Development, DBMS, AI, Mobile App Development, Software Lifecycle',
    },
  ];

  // ─── STATS ───────────────────────────────────────────────────────────────────
  stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '7', label: 'Universities Served' },
    { value: '4+', label: 'Major Projects' },
    { value: '10+', label: 'Technologies' },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  // ─── TYPING LOGIC ─────────────────────────────────────────────────────────────
  private startTyping(): void {
    const currentRole = this.roles[this.roleIndex];
    const typeSpeed = this.isDeleting ? 60 : 100;
    const pauseDuration = 1800;

    if (!this.isDeleting && this.charIndex < currentRole.length) {
      this.displayedRole = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingTimer = setTimeout(() => this.startTyping(), typeSpeed);
    } else if (this.isDeleting && this.charIndex > 0) {
      this.displayedRole = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingTimer = setTimeout(() => this.startTyping(), typeSpeed);
    } else if (!this.isDeleting && this.charIndex === currentRole.length) {
      this.isDeleting = true;
      this.typingTimer = setTimeout(() => this.startTyping(), pauseDuration);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      this.typingTimer = setTimeout(() => this.startTyping(), 400);
    }
  }

  // ─── SCROLL SPY ──────────────────────────────────────────────────────────────
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
    const sections = ['home', 'portfolio', 'about', 'resume', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  // ─── NAVIGATION ──────────────────────────────────────────────────────────────
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(sectionId: string): void {
    this.menuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ─── CONTACT FORM ─────────────────────────────────────────────────────────────
  submitForm(): void {
    const { name, email, subject, message } = this.contactForm;
    if (!name || !email || !subject || !message) {
      this.formError = true;
      setTimeout(() => (this.formError = false), 3000);
      return;
    }
    this.formSubmitted = true;
    this.contactForm = { name: '', email: '', subject: '', message: '' };
    setTimeout(() => (this.formSubmitted = false), 5000);
  }

  downloadResume(): void {
    // Placeholder – link to an actual resume PDF
    alert('Resume download will be available once you add your PDF to the assets folder!');
  }
}
