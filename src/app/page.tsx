'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [countersVisible, setCountersVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Check if stats section is visible
      const statsSection = document.querySelector('.stats-section')
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setCountersVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Create particles
    const particlesContainer = document.getElementById('particles')
    if (particlesContainer) {
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
        particle.style.animationDelay = Math.random() * 15 + 's'
        particle.style.width = (Math.random() * 4 + 2) + 'px'
        particle.style.height = particle.style.width
        particlesContainer.appendChild(particle)
      }
    }

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const windowHeight = window.innerHeight
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', revealOnScroll)
    revealOnScroll()

    return () => window.removeEventListener('scroll', revealOnScroll)
  }, [])

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-dark: #0a0a0f;
          --secondary-dark: #12121a;
          --tertiary-dark: #1a1a2e;
          --neon-purple: #8b5cf6;
          --neon-cyan: #06b6d4;
          --neon-pink: #ec4899;
          --neon-blue: #3b82f6;
          --gradient-1: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
          --gradient-2: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          --text-primary: #ffffff;
          --text-secondary: #a1a1aa;
          --text-muted: #71717a;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: var(--primary-dark);
          color: var(--text-primary);
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--primary-dark);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--neon-purple);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--neon-cyan);
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        }

        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          letter-spacing: 2px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-1);
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          padding: 0.75rem 1.5rem;
          background: var(--gradient-1);
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-menu-btn span {
          width: 25px;
          height: 2px;
          background: var(--text-primary);
          transition: all 0.3s ease;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0 5%;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200') center/cover no-repeat;
          filter: brightness(0.3);
          z-index: -3;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 26, 46, 0.7) 100%);
          z-index: -2;
        }

        /* Particle Animation */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--neon-purple);
          border-radius: 50%;
          animation: float-particle 15s infinite;
          opacity: 0.6;
          box-shadow: 0 0 10px var(--neon-purple), 0 0 20px var(--neon-purple);
        }

        .particle:nth-child(odd) {
          background: var(--neon-cyan);
          box-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan);
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
            transform: scale(1);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) scale(0);
            opacity: 0;
          }
        }

        /* Floating Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orb-float 20s ease-in-out infinite;
          z-index: -1;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(139, 92, 246, 0.3);
          top: 10%;
          left: 10%;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(6, 182, 212, 0.3);
          top: 60%;
          right: 10%;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: rgba(236, 72, 153, 0.2);
          bottom: 10%;
          left: 30%;
          animation-delay: -10s;
        }

        @keyframes orb-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(50px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          75% {
            transform: translate(-50px, -20px) scale(1.05);
          }
        }

        .hero-content {
          text-align: center;
          max-width: 1000px;
          z-index: 1;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--neon-purple);
          margin-bottom: 1.5rem;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
          }
        }

        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .hero-title .gradient-text {
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-text {
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
                       0 0 40px rgba(139, 92, 246, 0.3),
                       0 0 60px rgba(139, 92, 246, 0.2);
          animation: text-glow 3s ease-in-out infinite alternate;
        }

        @keyframes text-glow {
          from {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
                         0 0 40px rgba(139, 92, 246, 0.3),
                         0 0 60px rgba(139, 92, 246, 0.2);
          }
          to {
            text-shadow: 0 0 30px rgba(6, 182, 212, 0.6),
                         0 0 60px rgba(6, 182, 212, 0.4),
                         0 0 90px rgba(6, 182, 212, 0.3);
          }
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 1rem 2.5rem;
          background: var(--gradient-1);
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
        }

        .btn-secondary {
          padding: 1rem 2.5rem;
          background: transparent;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-secondary:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: var(--neon-purple);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .scroll-indicator .mouse {
          width: 25px;
          height: 40px;
          border: 2px solid var(--text-muted);
          border-radius: 15px;
          position: relative;
        }

        .scroll-indicator .mouse::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: var(--neon-purple);
          border-radius: 2px;
          animation: scroll-wheel 2s ease-in-out infinite;
        }

        @keyframes scroll-wheel {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-50%) translateY(10px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }

        /* Marquee Section */
        .marquee-section {
          background: var(--secondary-dark);
          padding: 1.5rem 0;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          overflow: hidden;
        }

        .marquee-wrapper {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        .marquee-content {
          display: flex;
          gap: 3rem;
          padding: 0 1.5rem;
          white-space: nowrap;
        }

        .marquee-item {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .marquee-item span {
          color: var(--neon-purple);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* About Section */
        .about-section {
          padding: 8rem 5%;
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.85rem;
          color: var(--neon-cyan);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 1rem;
          display: block;
        }

        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .section-title .gradient-text {
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .about-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }

        .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 20px;
          transition: transform 0.5s ease;
        }

        .about-image:hover img {
          transform: scale(1.05);
        }

        .about-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, transparent 100%);
          z-index: 1;
          border-radius: 20px;
        }

        .about-image::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: var(--gradient-1);
          border-radius: 22px;
          z-index: -1;
          opacity: 0.5;
        }

        .about-content h3 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .about-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: var(--neon-purple);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
          transform: translateY(-3px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: var(--gradient-1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .feature-item span {
          font-weight: 500;
        }

        /* Stats Section */
        .stats-section {
          padding: 6rem 5%;
          background: var(--secondary-dark);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          z-index: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .stat-card:hover::before {
          left: 100%;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: var(--neon-purple);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
        }

        .stat-number {
          font-family: 'Orbitron', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 500;
        }

        /* Services Section */
        .services-section {
          padding: 8rem 5%;
          position: relative;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(18, 18, 26, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--gradient-1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: var(--neon-purple);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          background: var(--gradient-1);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        }

        .service-card h3 {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .service-card:hover h3 {
          color: var(--neon-cyan);
        }

        .service-card p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neon-purple);
          text-decoration: none;
          font-weight: 600;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-link:hover {
          color: var(--neon-cyan);
          gap: 1rem;
        }

        /* Portfolio Section */
        .portfolio-section {
          padding: 8rem 5%;
          background: var(--secondary-dark);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .portfolio-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
          group: portfolio;
        }

        .portfolio-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.9) 100%);
          opacity: 0;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
        }

        .portfolio-item:hover img {
          transform: scale(1.1);
        }

        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-overlay h4 {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .portfolio-overlay p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.2s;
        }

        .portfolio-item:hover .portfolio-overlay h4,
        .portfolio-item:hover .portfolio-overlay p {
          transform: translateY(0);
        }

        .portfolio-overlay .portfolio-tags {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .portfolio-tag {
          padding: 0.3rem 0.8rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--neon-purple);
        }

        /* Contact Section */
        .contact-section {
          padding: 8rem 5%;
          position: relative;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-info h3 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .contact-info p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-item-icon {
          width: 50px;
          height: 50px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-item-icon {
          background: var(--gradient-1);
          border-color: transparent;
          transform: rotate(5deg);
        }

        .contact-item-content h4 {
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }

        .contact-item-content p, .contact-item-content a {
          color: var(--text-secondary);
          font-size: 0.95rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item-content a:hover {
          color: var(--neon-cyan);
        }

        .contact-form {
          background: rgba(18, 18, 26, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          padding: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--neon-purple);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: var(--gradient-1);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 1px;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
        }

        /* Footer */
        .footer {
          background: var(--secondary-dark);
          padding: 4rem 5% 2rem;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto 3rem;
        }

        .footer-brand .logo {
          display: inline-block;
          margin-bottom: 1rem;
        }

        .footer-brand p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--gradient-1);
          border-color: transparent;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        }

        .footer-column h4 {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--neon-cyan);
          transform: translateX(5px);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
        }

        .footer-legal a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: var(--neon-purple);
        }

        /* Scroll Animations */
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s ease;
        }

        .reveal-left.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s ease;
        }

        .reveal-right.active {
          opacity: 1;
          transform: translateX(0);
        }

        /* Mobile Navigation */
        .mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          max-width: 400px;
          height: 100vh;
          background: rgba(10, 10, 15, 0.98);
          backdrop-filter: blur(20px);
          z-index: 999;
          padding: 6rem 2rem 2rem;
          transition: right 0.3s ease;
          border-left: 1px solid rgba(139, 92, 246, 0.2);
        }

        .mobile-nav.active {
          right: 0;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-links a {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 500;
          display: block;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
        }

        .mobile-nav-links a:hover {
          color: var(--neon-purple);
          transform: translateX(10px);
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-overlay.active {
          opacity: 1;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .about-image {
            order: -1;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-nav {
            display: block;
          }

          .mobile-overlay {
            display: block;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-legal {
            justify-content: center;
          }

          .about-features {
            grid-template-columns: 1fr;
          }

          .marquee-item {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <a href="#home" className="logo">YUMNA</a>
          <ul className="nav-links">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#services">Layanan</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
          <a href="#contact" className="nav-cta">Hubungi Kami</a>
          <div className="mobile-menu-btn" onClick={handleMobileMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={handleMobileMenuToggle}></div>
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Beranda</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>Tentang</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Layanan</a></li>
            <li><a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>Portfolio</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Kontak</a></li>
            <li><a href="#contact" className="nav-cta" style={{display: 'inline-block', marginTop: '1rem'}} onClick={(e) => handleNavClick(e, '#contact')}>Hubungi Kami</a></li>
          </ul>
        </div>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>

          {/* Particles */}
          <div className="particles" id="particles"></div>

          {/* Floating Orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>

          <div className="hero-content">
            <span className="hero-badge">Industri Pakaian Jadi Konveksi</span>
            <h1 className="hero-title">
              <span className="glow-text">Kami Produksi</span><br/>
              <span className="gradient-text">Pakaian Berkualitas</span>
            </h1>
            <p className="hero-description">
              Transformasi bisnis fashion Anda dengan solusi konveksi terpercaya. Kami memproduksi pakaian jadi berkualitas tinggi dengan desain modern dan bahan terbaik untuk kebutuhan industri tekstil Anda.
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn-primary">
                Lihat Produk
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Pesan Sekarang
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="mouse"></div>
            <span>Scroll Ke Bawah</span>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="marquee-section">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              <div className="marquee-item"><span>*</span> Konveksi Pakaian</div>
              <div className="marquee-item"><span>*</span> Garmen Berkualitas</div>
              <div className="marquee-item"><span>*</span> Tekstil Industri</div>
              <div className="marquee-item"><span>*</span> Custom Design</div>
              <div className="marquee-item"><span>*</span> Produksi Massal</div>
              <div className="marquee-item"><span>*</span> Kualitas Terjamin</div>
              <div className="marquee-item"><span>*</span> Konveksi Pakaian</div>
              <div className="marquee-item"><span>*</span> Garmen Berkualitas</div>
              <div className="marquee-item"><span>*</span> Tekstil Industri</div>
              <div className="marquee-item"><span>*</span> Custom Design</div>
              <div className="marquee-item"><span>*</span> Produksi Massal</div>
              <div className="marquee-item"><span>*</span> Kualitas Terjamin</div>
            </div>
            <div className="marquee-content">
              <div className="marquee-item"><span>*</span> Konveksi Pakaian</div>
              <div className="marquee-item"><span>*</span> Garmen Berkualitas</div>
              <div className="marquee-item"><span>*</span> Tekstil Industri</div>
              <div className="marquee-item"><span>*</span> Custom Design</div>
              <div className="marquee-item"><span>*</span> Produksi Massal</div>
              <div className="marquee-item"><span>*</span> Kualitas Terjamin</div>
              <div className="marquee-item"><span>*</span> Konveksi Pakaian</div>
              <div className="marquee-item"><span>*</span> Garmen Berkualitas</div>
              <div className="marquee-item"><span>*</span> Tekstil Industri</div>
              <div className="marquee-item"><span>*</span> Custom Design</div>
              <div className="marquee-item"><span>*</span> Produksi Massal</div>
              <div className="marquee-item"><span>*</span> Kualitas Terjamin</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="section-header reveal">
            <span className="section-label">Tentang Kami</span>
            <h2 className="section-title">Mengubah Kain Menjadi <span className="gradient-text">Karya Berkualitas</span></h2>
          </div>

          <div className="about-grid">
            <div className="about-image reveal-left">
              <img src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800" alt="Pabrik Konveksi Modern"/>
            </div>
            <div className="about-content reveal-right">
              <h3>Partner Terpercaya Industri Garmen</h3>
              <p>
                PT YUMNA NUSANTARA INDONESIA adalah perusahaan konveksi terkemuka yang berbasis di Bekasi. Kami mengkhususkan diri dalam memproduksi pakaian jadi berkualitas tinggi untuk berbagai kebutuhan industri tekstil.
              </p>
              <p>
                Dengan tim yang berpengalaman dan fasilitas produksi modern, kami menghadirkan solusi garmen yang menggabungkan kualitas terbaik dengan desain trendi untuk memberikan hasil yang memuaskan bagi klien kami.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <span>Produksi Cepat</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💎</div>
                  <span>Kualitas Premium</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏭</div>
                  <span>Kapasitas Besar</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <span>Hasil Terjamin</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card reveal">
              <div className="stat-number" data-target="1000">0</div>
              <div className="stat-label">Pcs/Hari</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number" data-target="50">0</div>
              <div className="stat-label">Klien Puas</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number" data-target="25">0</div>
              <div className="stat-label">Tenaga Ahli</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number" data-target="99">0</div>
              <div className="stat-label">Kualitas %</div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section" id="services">
          <div className="section-header reveal">
            <span className="section-label">Layanan Kami</span>
            <h2 className="section-title">Apa Yang <span className="gradient-text">Kami Tawarkan</span></h2>
          </div>

          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">👔</div>
              <h3>Kemeja & Pakaian Formal</h3>
              <p>Produksi kemeja, blouse, dan pakaian formal berkualitas dengan jahitan rapi dan bahan premium untuk kebutuhan kantor dan acara formal.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="service-card reveal">
              <div className="service-icon">👕</div>
              <h3>Kaos & T-Shirt</h3>
              <p>Produksi kaos dan t-shirt custom untuk berbagai keperluan seperti promosi, event, komunitas, dan brand clothing dengan kualitas sablon terbaik.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="service-card reveal">
              <div className="service-icon">👖</div>
              <h3>Celana & Rok</h3>
              <p>Produksi celana panjang, celana pendek, dan rok berbagai model dengan pola presisi dan kualitas jahitan yang tahan lama.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="service-card reveal">
              <div className="service-icon">🧥</div>
              <h3>Jaket & Hoodie</h3>
              <p>Produksi jaket, hoodie, dan sweater dengan berbagai pilihan bahan dan desain yang trendy untuk cuaca dingin atau fashion statement.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="service-card reveal">
              <div className="service-icon">🏪</div>
              <h3>Seragam & Wearpack</h3>
              <p>Produksi seragam kantor, seragam sekolah, dan wearpack industri dengan desain profesional dan bahan yang nyaman dipakai sehari-hari.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="service-card reveal">
              <div className="service-icon">🎨</div>
              <h3>Custom Design</h3>
              <p>Layanan desain custom sesuai kebutuhan klien, dari pemilihan bahan hingga finishing dengan quality control yang ketat.</p>
              <a href="#contact" className="service-link">
                Pelajari Lebih Lanjut
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio-section" id="portfolio">
          <div className="section-header reveal">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Produk <span className="gradient-text">Unggulan</span></h2>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600" alt="Kemeja Formal"/>
              <div className="portfolio-overlay">
                <h4>Kemeja Formal Premium</h4>
                <p>Kualitas jahitan terbaik untuk profesional</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Formal</span>
                  <span className="portfolio-tag">Premium</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600" alt="Kaos Custom"/>
              <div className="portfolio-overlay">
                <h4>Kaos Custom Brand</h4>
                <p>Desain eksklusif untuk brand clothing</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Custom</span>
                  <span className="portfolio-tag">Brand</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1544967003-f49b1941b76b?w=600" alt="Seragam Kantor"/>
              <div className="portfolio-overlay">
                <h4>Seragam Kantor Modern</h4>
                <p>Desain profesional dan nyaman</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Seragam</span>
                  <span className="portfolio-tag">Kantor</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1578912472789-72c2b2b7b584?w=600" alt="Jaket Fashion"/>
              <div className="portfolio-overlay">
                <h4>Jaket Fashion Trendy</h4>
                <p>Style modern dengan kualitas terbaik</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Fashion</span>
                  <span className="portfolio-tag">Trendy</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" alt="Wearpack Industri"/>
              <div className="portfolio-overlay">
                <h4>Wearpack Industri</h4>
                <p>Safety dan comfort untuk pekerja</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Industri</span>
                  <span className="portfolio-tag">Safety</span>
                </div>
              </div>
            </div>

            <div className="portfolio-item reveal">
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600" alt="Koleksi Fashion"/>
              <div className="portfolio-overlay">
                <h4>Koleksi Fashion Terbaru</h4>
                <p>Trend terkini dengan kualitas premium</p>
                <div className="portfolio-tags">
                  <span className="portfolio-tag">Fashion</span>
                  <span className="portfolio-tag">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="section-header reveal">
            <span className="section-label">Hubungi Kami</span>
            <h2 className="section-title">Mulai <span className="gradient-text">Proyek Anda</span></h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal-left">
              <h3>Siap Memproduksi Pakaian Berkualitas?</h3>
              <p>
                Kami siap membantu memenuhi kebutuhan produksi pakaian Anda. Baik untuk kebutuhan bisnis, seragam, maupun brand clothing, tim kami siap menghasilkan produk berkualitas tinggi.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-content">
                    <h4>Alamat Kantor</h4>
                    <p>Jl. Pintu Air Raya, Kel. Harapan Jaya,<br/>Kec. Medan Satria, Kota Bekasi,<br/>Prov. Jawa Barat</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📧</div>
                  <div className="contact-item-content">
                    <h4>Email Kami</h4>
                    <a href="mailto:info@yumnanusantara.com">info@yumnanusantara.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-content">
                    <h4>Telepon</h4>
                    <a href="tel:085285703497">0852 8570 3497</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">🏭</div>
                  <div className="contact-item-content">
                    <h4>Industri</h4>
                    <p>Pakaian Jadi (Konveksi) dari Tekstil</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form reveal-right">
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Telepon</label>
                    <input type="tel" id="phone" name="phone" placeholder="08xx xxxx xxxx"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Layanan</label>
                    <select id="service" name="service">
                      <option value="">Pilih layanan</option>
                      <option value="kemeja">Kemeja & Pakaian Formal</option>
                      <option value="kaos">Kaos & T-Shirt</option>
                      <option value="celana">Celana & Rok</option>
                      <option value="jaket">Jaket & Hoodie</option>
                      <option value="seragam">Seragam & Wearpack</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Jumlah Pesanan</label>
                  <select id="quantity" name="quantity">
                    <option value="">Pilih jumlah pesanan</option>
                    <option value="small">Di bawah 100 pcs</option>
                    <option value="medium">100 - 500 pcs</option>
                    <option value="large">500 - 1000 pcs</option>
                    <option value="enterprise">Di atas 1000 pcs</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Detail Pesanan</label>
                  <textarea id="message" name="message" placeholder="Jelaskan kebutuhan pesanan Anda..." required></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Kirim Pesan
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '0.5rem'}}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo">YUMNA</a>
              <p>PT YUMNA NUSANTARA INDONESIA adalah perusahaan konveksi terpercaya yang berdedikasi untuk memproduksi pakaian jadi berkualitas tinggi dengan bahan terbaik dan desain modern.</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Beranda</a></li>
                <li><a href="#about">Tentang Kami</a></li>
                <li><a href="#services">Layanan</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Kontak</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Layanan</h4>
              <ul className="footer-links">
                <li><a href="#services">Kemeja & Pakaian Formal</a></li>
                <li><a href="#services">Kaos & T-Shirt</a></li>
                <li><a href="#services">Celana & Rok</a></li>
                <li><a href="#services">Jaket & Hoodie</a></li>
                <li><a href="#services">Seragam & Wearpack</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Kontak</h4>
              <ul className="footer-links">
                <li><a href="mailto:info@yumnanusantara.com">info@yumnanusantara.com</a></li>
                <li><a href="tel:085285703497">0852 8570 3497</a></li>
                <li><a href="#">Bekasi, Jawa Barat</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 PT YUMNA NUSANTARA INDONESIA. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Syarat & Ketentuan</a>
            </div>
          </div>
        </footer>
      </div>

      <script jsx>{`
        // Counter Animation
        if (typeof window !== 'undefined') {
          const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target'));
              const duration = 2000;
              const increment = target / (duration / 16);
              let current = 0;
              
              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.textContent = Math.floor(current) + (counter.closest('.stat-card').querySelector('.stat-label').textContent.includes('%') ? '' : '+');
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target + (counter.closest('.stat-card').querySelector('.stat-label').textContent.includes('%') ? '%' : '+');
                }
              };
              
              if (countersVisible) {
                updateCounter();
              }
            });
          };
          
          animateCounters();
        }
      `}</script>
    </>
  )
}