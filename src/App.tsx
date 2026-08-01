import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = 'landing' | 'login' | 'dashboard' | 'workflow' | 'section11' | 'section19' | 'reports' | 'documents' | 'maps' | 'projects' | 'users'
type Role = 'patwari' | 'naib-tehsildar' | 'tehsildar' | 'sdm' | 'admin'

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Projects: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Workflow: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Documents: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Reports: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Maps: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Alert: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Upload: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Land: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18 L7 10 L12 14 L17 6 L21 10"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Rupee: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 8h12M6 13l8 8M6 13h4a4 4 0 0 0 0-5H6"/>
    </svg>
  ),
  Audit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  Help: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
}

// ─── Government Emblem SVG ────────────────────────────────────────────────────
function GovEmblem({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" stroke="#d4a84b" strokeWidth="2" fill="rgba(212,168,75,0.08)"/>
      <circle cx="40" cy="40" r="30" stroke="#d4a84b" strokeWidth="1" strokeDasharray="3 3" fill="none"/>
      {/* Lotus petals */}
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <ellipse key={i}
          cx={40 + 18 * Math.sin(a * Math.PI / 180)}
          cy={40 - 18 * Math.cos(a * Math.PI / 180)}
          rx="5" ry="9"
          fill="rgba(212,168,75,0.3)"
          stroke="#d4a84b"
          strokeWidth="0.8"
          transform={`rotate(${a}, ${40 + 18 * Math.sin(a * Math.PI / 180)}, ${40 - 18 * Math.cos(a * Math.PI / 180)})`}
        />
      ))}
      {/* Center */}
      <circle cx="40" cy="40" r="10" fill="rgba(212,168,75,0.2)" stroke="#d4a84b" strokeWidth="1.5"/>
      <circle cx="40" cy="40" r="5" fill="#d4a84b"/>
      {/* Lions suggestion */}
      <text x="40" y="72" textAnchor="middle" fontSize="5" fill="#d4a84b" fontFamily="serif" letterSpacing="1">J&amp;K</text>
    </svg>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = document.getElementById('landing-scroll')
    if (!el) return
    const handler = () => setScrolled(el.scrollTop > 40)
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const quickLinks = [
    { label: 'Circulars', icon: '📋' },
    { label: 'Govt. Orders', icon: '📜' },
    { label: 'Acts & Rules', icon: '⚖️' },
    { label: 'Downloads', icon: '⬇️' },
    { label: 'Helpdesk', icon: '🎧' },
    { label: 'FAQ', icon: '❓' },
    { label: 'Contact', icon: '📞' },
    { label: 'RTI Portal', icon: '🔍' },
  ]

  const features = [
    { icon: '🗺️', title: 'Revenue Maps', desc: 'Interactive GIS-enabled Khasra mapping with village boundary overlays and project highlights.' },
    { icon: '📁', title: 'Digital Records', desc: 'Centralized Jamabandi, Tatima, and mutation records with full version history.' },
    { icon: '⚡', title: 'Smart Workflow', desc: 'Automated multi-stage approval chain from Section 11 to Final Award with role-locked access.' },
    { icon: '💳', title: 'Payment Tracking', desc: 'End-to-end compensation disbursement with UTR tracking and treasury integration.' },
  ]

  const stats = [
    { label: 'Projects Tracked', value: '1,248' },
    { label: 'Villages Covered', value: '342' },
    { label: 'Cases Closed', value: '876' },
    { label: 'Compensation Released', value: '₹ 48.6 Cr' },
  ]

  const notifications = [
    { date: '28 Jul 2026', text: 'Circular No. RC-2026/142 — Revised market rate notification for Kathua District issued.' },
    { date: '22 Jul 2026', text: 'GO No. 452-Rev — New procedure for apportionment in joint ownership cases.' },
    { date: '15 Jul 2026', text: 'High Court Order — Compliance required for all pending Section 21 hearings by Aug 10.' },
    { date: '08 Jul 2026', text: 'Training workshop on LCMS digital workflow for all Patwaris — Aug 3, Hiranagar.' },
  ]

  return (
    <div id="landing-scroll" style={{ height: '100vh', overflowY: 'auto' }} className="bg-mesh">
      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl' : ''}`}
        style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <GovEmblem size={48} />
              <div>
                <div className="serif" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#d4a84b', lineHeight: 1.2 }}>
                  Revenue Department
                </div>
                <div style={{ fontSize: '0.72rem', color: '#8ba3cc', letterSpacing: '0.05em' }}>
                  SUB-DIVISION HIRANAGAR · KATHUA · J&K
                </div>
              </div>
            </div>
            {/* Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {['Home', 'About', 'Circulars', 'Acts & Rules', 'Contact'].map(l => (
                <button key={l} onClick={() => setActiveLink(l)}
                  className="nav-item"
                  style={{ color: activeLink === l ? '#60a5fa' : undefined }}>
                  {l}
                </button>
              ))}
              <button onClick={onLogin} className="btn-primary" style={{ marginLeft: '1rem' }}>
                Officer Login →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="animate-fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 20, padding: '4px 14px', marginBottom: '1.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }}/>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600, letterSpacing: '0.05em' }}>LIVE SYSTEM · HIRANAGAR SUB-DIVISION</span>
            </div>
            <h1 className="serif" style={{ fontSize: '3.4rem', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', color: '#f0f4ff' }}>
              Land Compensation<br />
              <span style={{ color: '#d4a84b' }}>Management</span> System
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#8ba3cc', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 480 }}>
              Enterprise-grade digital governance for land acquisition and compensation management. Powered by NIC India. Serving the Revenue Department, Jammu &amp; Kashmir.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={onLogin} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.95rem' }}>
                Access LCMS Portal
              </button>
              <button className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem' }}>
                Download User Guide
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              {/* Grid map illustration */}
              <svg width="100%" viewBox="0 0 420 300" style={{ borderRadius: 12 }}>
                <defs>
                  <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d1e40"/>
                    <stop offset="100%" stopColor="#07122a"/>
                  </linearGradient>
                </defs>
                <rect width="420" height="300" fill="url(#mapGrad)" rx="12"/>
                {/* Grid lines */}
                {[0,60,120,180,240,300,360,420].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="rgba(37,99,235,0.15)" strokeWidth="1"/>
                ))}
                {[0,50,100,150,200,250,300].map(y => (
                  <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="rgba(37,99,235,0.15)" strokeWidth="1"/>
                ))}
                {/* Village boundary */}
                <polygon points="60,40 200,25 340,60 360,180 280,260 120,240 50,150"
                  fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.5)" strokeWidth="2"/>
                {/* Khasra plots */}
                {[
                  { points: "100,80 160,75 165,130 105,135", color: "rgba(5,150,105,0.3)", label: "K-124" },
                  { points: "165,75 220,70 225,125 165,130", color: "rgba(217,119,6,0.3)", label: "K-125" },
                  { points: "220,70 275,68 280,120 225,125", color: "rgba(37,99,235,0.3)", label: "K-126" },
                  { points: "105,135 165,130 168,185 108,188", color: "rgba(5,150,105,0.3)", label: "K-127" },
                  { points: "165,130 225,125 228,180 168,185", color: "rgba(225,29,72,0.3)", label: "K-128" },
                  { points: "225,125 280,120 285,175 228,180", color: "rgba(37,99,235,0.3)", label: "K-129" },
                ].map((p, i) => (
                  <g key={i}>
                    <polygon points={p.points} fill={p.color} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <text x={p.points.split(" ").reduce((acc, pt) => acc + parseInt(pt.split(",")[0]), 0) / 6}
                      y={p.points.split(" ").reduce((acc, pt) => acc + parseInt(pt.split(",")[1]), 0) / 6}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono">
                      {p.label}
                    </text>
                  </g>
                ))}
                {/* Acquisition overlay */}
                <polygon points="165,75 280,68 285,175 168,185 165,130 165,75"
                  fill="none" stroke="#d4a84b" strokeWidth="2" strokeDasharray="6 3"/>
                <text x="225" y="55" textAnchor="middle" fontSize="10" fill="#d4a84b" fontWeight="bold">
                  NH-44 Widening Project
                </text>
                {/* Legend */}
                <rect x="10" y="255" width="130" height="38" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
                <rect x="18" y="263" width="10" height="10" rx="2" fill="rgba(225,29,72,0.5)"/>
                <text x="32" y="272" fontSize="8" fill="#c5d3ef">Acquisition Zone</text>
                <rect x="18" y="277" width="10" height="10" rx="2" fill="rgba(5,150,105,0.5)"/>
                <text x="32" y="286" fontSize="8" fill="#c5d3ef">Award Finalized</text>
                {/* Status pins */}
                <circle cx="228" cy="155" r="6" fill="#d4a84b" className="animate-pulse-glow"/>
                <line x1="228" y1="149" x2="228" y2="130" stroke="#d4a84b" strokeWidth="1"/>
                <rect x="198" y="114" width="62" height="18" rx="4" fill="rgba(212,168,75,0.2)" stroke="#d4a84b"/>
                <text x="229" y="127" textAnchor="middle" fontSize="8" fill="#d4a84b">Section 11 Pending</text>
                {/* Scale */}
                <line x1="340" y1="275" x2="400" y2="275" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <line x1="340" y1="271" x2="340" y2="279" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <line x1="400" y1="271" x2="400" y2="279" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <text x="370" y="268" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">500m</text>
              </svg>
              {/* Overlay chips */}
              <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="status-badge status-progress">● 14 Active Projects</div>
                <div className="status-badge status-pending">● 6 Pending Approval</div>
                <div className="status-badge status-approved">● 8 Awards Finalized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem 3rem' }}>
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '1.75rem 2rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', padding: '0.5rem 1rem' }}>
              <div className="mono" style={{ fontSize: '2rem', fontWeight: 700, color: '#d4a84b', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#8ba3cc', marginTop: 4, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '1rem 2rem 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="serif" style={{ fontSize: '2rem', color: '#f0f4ff', marginBottom: '0.75rem' }}>
            Digital Governance Platform
          </h2>
          <p style={{ color: '#8ba3cc', maxWidth: 540, margin: '0 auto' }}>
            Streamlining land acquisition from notification to final payment with complete auditability.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '0.6rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.83rem', color: '#8ba3cc', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Links + Notifications ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.25rem', letterSpacing: '0.03em' }}>
            QUICK LINKS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {quickLinks.map((l, i) => (
              <button key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.9rem 1.1rem', border: 'none', cursor: 'pointer', color: '#c5d3ef', fontSize: '0.875rem', textAlign: 'left' }}>
                <span style={{ fontSize: '1.2rem' }}>{l.icon}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.25rem', letterSpacing: '0.03em' }}>
            LATEST NOTIFICATIONS
          </h3>
          <div className="glass-card" style={{ padding: '0.5rem' }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: i < notifications.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', borderRadius: 10, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div className="mono" style={{ fontSize: '0.72rem', color: '#d4a84b', whiteSpace: 'nowrap', paddingTop: 2 }}>{n.date}</div>
                <div style={{ fontSize: '0.83rem', color: '#c5d3ef', lineHeight: 1.6 }}>{n.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="glass" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <GovEmblem size={36} />
            <div>
              <div style={{ fontSize: '0.8rem', color: '#c5d3ef', fontWeight: 600 }}>Revenue Department, J&K</div>
              <div style={{ fontSize: '0.72rem', color: '#8ba3cc' }}>Sub-Division Hiranagar, District Kathua</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms', 'Sitemap', 'Accessibility'].map(l => (
              <span key={l} style={{ fontSize: '0.78rem', color: '#8ba3cc', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#8ba3cc' }}>
            Powered by <span style={{ color: '#d4a84b' }}>NIC India</span> · © 2026 Govt. of J&K
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [authMode, setAuthMode] = useState<'password' | 'otp' | 'dsc'>('password')
  const [step, setStep] = useState<'select' | 'auth'>('select')
  const [captchaInput, setCaptchaInput] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const roles: { id: Role; label: string; subtitle: string; icon: string; color: string }[] = [
    { id: 'patwari', label: 'Patwari', subtitle: 'Village Level Officer', icon: '📋', color: '#2563eb' },
    { id: 'naib-tehsildar', label: 'Naib Tehsildar', subtitle: 'Section Review & Approval', icon: '✅', color: '#059669' },
    { id: 'tehsildar', label: 'Tehsildar', subtitle: 'Award & Apportionment', icon: '⚖️', color: '#7c3aed' },
    { id: 'sdm', label: 'SDM / Collector', subtitle: 'Final Award Authority', icon: '🏛️', color: '#d97706' },
    { id: 'admin', label: 'Administrator', subtitle: 'System Administration', icon: '🔧', color: '#e11d48' },
  ]

  return (
    <div className="bg-mesh" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <GovEmblem size={72} />
        <h1 className="serif" style={{ fontSize: '1.5rem', color: '#f0f4ff', marginTop: '1rem', fontWeight: 700 }}>
          Land Compensation Management System
        </h1>
        <p style={{ fontSize: '0.83rem', color: '#8ba3cc', marginTop: 4 }}>
          Revenue Department · Sub-Division Hiranagar · Kathua · J&K
        </p>
      </div>

      {step === 'select' ? (
        <div style={{ width: '100%', maxWidth: 760 }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', textAlign: 'center', marginBottom: '1.75rem', letterSpacing: '0.05em' }}>
              SELECT YOUR ROLE TO CONTINUE
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {roles.map(r => (
                <button key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  style={{
                    padding: '1.25rem 0.75rem',
                    borderRadius: 14,
                    border: selectedRole === r.id ? `2px solid ${r.color}` : '1px solid rgba(255,255,255,0.1)',
                    background: selectedRole === r.id ? `${r.color}22` : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxShadow: selectedRole === r.id ? `0 0 0 4px ${r.color}22` : 'none',
                  }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f0f4ff' }}>{r.label}</div>
                  <div style={{ fontSize: '0.68rem', color: '#8ba3cc', marginTop: 2, lineHeight: 1.4 }}>{r.subtitle}</div>
                </button>
              ))}
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: selectedRole ? 1 : 0.5 }}
              disabled={!selectedRole}
              onClick={() => setStep('auth')}>
              Continue →
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 480 }}>
          <button onClick={() => setStep('select')} className="btn-secondary" style={{ marginBottom: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
            ← Back
          </button>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.75rem' }}>{roles.find(r => r.id === selectedRole)?.icon}</div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff' }}>{roles.find(r => r.id === selectedRole)?.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#8ba3cc' }}>Secure Government Login</div>
              </div>
            </div>

            {/* Auth mode tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '4px' }}>
              {(['password', 'otp', 'dsc'] as const).map(m => (
                <button key={m} onClick={() => setAuthMode(m)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: 8, border: 'none', background: authMode === m ? 'rgba(37,99,235,0.4)' : 'transparent', color: authMode === m ? '#60a5fa' : '#8ba3cc', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em' }}>
                  {m === 'password' ? 'PASSWORD' : m === 'otp' ? 'OTP LOGIN' : 'DSC / e-Sign'}
                </button>
              ))}
            </div>

            {authMode === 'password' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>USER ID / EMPLOYEE CODE</label>
                  <input className="input-field" placeholder="e.g. PAT-JK-2024-0142" defaultValue="PAT-JK-2024-0142"/>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>PASSWORD</label>
                  <input className="input-field" type="password" placeholder="••••••••••" defaultValue="••••••••"/>
                </div>
                {/* Captcha */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>CAPTCHA VERIFICATION</label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className="mono" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '1.2rem', letterSpacing: '0.25em', color: '#60a5fa', fontWeight: 700, userSelect: 'none', textDecoration: 'line-through', textDecorationStyle: 'wavy' }}>
                      K7X2M9
                    </div>
                    <input className="input-field" style={{ flex: 1 }} placeholder="Enter captcha" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}/>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#8ba3cc', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb' }}/> Remember this device
                  </label>
                  <span style={{ fontSize: '0.78rem', color: '#60a5fa', cursor: 'pointer' }}>Forgot Password?</span>
                </div>
              </div>
            )}

            {authMode === 'otp' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>REGISTERED MOBILE NUMBER</label>
                  <input className="input-field" placeholder="+91 94191 XXXXX" defaultValue="+91 94191 XXXXX"/>
                </div>
                <button className="btn-secondary" style={{ fontSize: '0.82rem' }}>Send OTP →</button>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>ENTER 6-DIGIT OTP</label>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {otp.map((v, i) => (
                      <input key={i} className="input-field mono" style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 700, padding: '0.6rem' }}
                        maxLength={1} value={v}
                        onChange={e => { const n = [...otp]; n[i] = e.target.value; setOtp(n) }}/>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {authMode === 'dsc' && (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                <h3 style={{ color: '#f0f4ff', marginBottom: '0.5rem' }}>Digital Signature Certificate</h3>
                <p style={{ fontSize: '0.83rem', color: '#8ba3cc', marginBottom: '1.5rem' }}>Insert your DSC token and click below to authenticate using NIC e-Sign infrastructure.</p>
                <button className="btn-primary" style={{ width: '100%' }}>Detect DSC Token</button>
                <div style={{ marginTop: '1rem' }}>
                  <button className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    🖐 Biometric Login (STQC Certified)
                  </button>
                </div>
              </div>
            )}

            {authMode !== 'dsc' && (
              <button
                className="btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', marginTop: '1.25rem' }}
                onClick={() => selectedRole && onLogin(selectedRole)}>
                Secure Login →
              </button>
            )}

            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: 10, fontSize: '0.75rem', color: '#8ba3cc', textAlign: 'center' }}>
              🔒 Secured by NIC India — 256-bit SSL · ISO 27001 Certified
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── App Shell (Sidebar + Header) ─────────────────────────────────────────────
function AppShell({ role, page, setPage, onLogout, children }: {
  role: Role; page: Page; setPage: (p: Page) => void; onLogout: () => void; children: React.ReactNode
}) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const roleInfo = {
    'patwari': { label: 'Patwari', name: 'Sh. Ramesh Kumar', code: 'PAT-0142', village: 'Hiranagar Circle', color: '#2563eb' },
    'naib-tehsildar': { label: 'Naib Tehsildar', name: 'Sh. Anil Sharma', code: 'NT-0024', village: 'Tehsil Hiranagar', color: '#059669' },
    'tehsildar': { label: 'Tehsildar', name: 'Sh. Vikram Singh', code: 'TEH-0008', village: 'Hiranagar Tehsil', color: '#7c3aed' },
    'sdm': { label: 'SDM / Collector', name: 'Sh. J.P. Gupta, IAS', code: 'SDM-0003', village: 'Sub-Division Hiranagar', color: '#d97706' },
    'admin': { label: 'System Admin', name: 'NIC Admin', code: 'ADMIN-001', village: 'System', color: '#e11d48' },
  }[role]

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: Icon.Dashboard },
    { id: 'projects', label: 'Projects', Icon: Icon.Projects },
    { id: 'workflow', label: 'Workflow', Icon: Icon.Workflow },
    { id: 'section11', label: 'Section 11', Icon: Icon.FileText },
    { id: 'documents', label: 'Documents', Icon: Icon.Documents },
    { id: 'maps', label: 'Revenue Maps', Icon: Icon.Maps },
    { id: 'reports', label: 'Reports', Icon: Icon.Reports },
    { id: 'users', label: 'Users', Icon: Icon.Users },
  ]

  const notifications = [
    { text: 'Section 11 approved for Khasra 128 — NH-44', time: '2 min ago', type: 'approved' },
    { text: 'Draft Award returned by Naib Tehsildar — Village Sarna', time: '45 min ago', type: 'returned' },
    { text: 'Deadline alert: Section 19 hearing — Aug 5, 2026', time: '2 hr ago', type: 'alert' },
    { text: 'Payment UTR confirmed — Owner Sh. Mohan Lal', time: '1 day ago', type: 'approved' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ width: 224, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GovEmblem size={36} />
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#d4a84b', lineHeight: 1.2 }}>LCMS</div>
              <div style={{ fontSize: '0.62rem', color: '#8ba3cc' }}>Revenue Dept. J&K</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0.5rem', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id as Page)}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', marginBottom: 2 }}>
              <item.Icon /> {item.label}
            </button>
          ))}
          <div style={{ margin: '0.75rem 0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}/>
          <button className="nav-item" style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}>
            <Icon.Audit /> Audit Logs
          </button>
          <button className="nav-item" style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}>
            <Icon.Help /> Help & Support
          </button>
        </nav>

        {/* User card */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="glass-card" style={{ padding: '0.75rem', marginBottom: '0.5rem', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${roleInfo.color}33`, border: `1px solid ${roleInfo.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>👤</div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f0f4ff', lineHeight: 1.2 }}>{roleInfo.name}</div>
                <div style={{ fontSize: '0.65rem', color: '#8ba3cc' }}>{roleInfo.label}</div>
              </div>
            </div>
            <div className="mono" style={{ fontSize: '0.65rem', color: '#8ba3cc' }}>{roleInfo.code}</div>
          </div>
          <button onClick={onLogout} className="btn-secondary" style={{ width: '100%', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Icon.LogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header className="glass" style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8ba3cc' }}>
              <Icon.Search />
            </span>
            <input className="input-field" style={{ paddingLeft: '2.25rem', maxWidth: 440, borderRadius: 10 }}
              placeholder="Search by Khasra, Owner, Project, Village..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            <div style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>Fri, 1 Aug 2026</div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setNotifOpen(!notifOpen)}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c5d3ef', position: 'relative' }}>
                <Icon.Bell />
                <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: '#e11d48', borderRadius: '50%', border: '1.5px solid #07122a' }}/>
              </button>
              {notifOpen && (
                <div className="glass-strong" style={{ position: 'absolute', right: 0, top: 46, width: 340, borderRadius: 14, padding: '0.75rem', zIndex: 100, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>NOTIFICATIONS</div>
                  {notifications.map((n, i) => (
                    <div key={i} style={{ padding: '0.7rem', borderRadius: 10, marginBottom: '0.4rem', background: 'rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                      <div style={{ fontSize: '0.8rem', color: '#c5d3ef', marginBottom: 3 }}>{n.text}</div>
                      <div style={{ fontSize: '0.7rem', color: '#8ba3cc' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ height: 32, width: 32, borderRadius: '50%', background: `${roleInfo.color}33`, border: `1.5px solid ${roleInfo.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              {role === 'patwari' ? '📋' : role === 'naib-tehsildar' ? '✅' : role === 'tehsildar' ? '⚖️' : role === 'sdm' ? '🏛️' : '🔧'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ role }: { role: Role }) {
  const patwariStats = [
    { label: 'Pending Cases', value: '12', icon: '⏳', color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
    { label: 'Completed', value: '48', icon: '✅', color: '#059669', bg: 'rgba(5,150,105,0.15)' },
    { label: 'Drafts Saved', value: '7', icon: '📝', color: '#2563eb', bg: 'rgba(37,99,235,0.15)' },
    { label: 'Projects Assigned', value: '14', icon: '📁', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  ]
  const sdmStats = [
    { label: 'Pending Final Awards', value: '5', icon: '⚖️', color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
    { label: 'Pending Payments', value: '8', icon: '💳', color: '#e11d48', bg: 'rgba(225,29,72,0.15)' },
    { label: 'District Projects', value: '62', icon: '📊', color: '#2563eb', bg: 'rgba(37,99,235,0.15)' },
    { label: 'Total Disbursed', value: '₹48.6Cr', icon: '🏦', color: '#059669', bg: 'rgba(5,150,105,0.15)' },
  ]
  const ntStats = [
    { label: 'Pending Sec.11 Approvals', value: '9', icon: '📋', color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
    { label: 'Pending Draft Awards', value: '4', icon: '📄', color: '#e11d48', bg: 'rgba(225,29,72,0.15)' },
    { label: 'Returned Cases', value: '3', icon: '↩️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    { label: 'Approved This Month', value: '21', icon: '✅', color: '#059669', bg: 'rgba(5,150,105,0.15)' },
  ]
  const tehStats = [
    { label: 'Pending Sec.19', value: '6', icon: '📋', color: '#d97706', bg: 'rgba(217,119,6,0.15)' },
    { label: 'Draft Awards', value: '3', icon: '📄', color: '#e11d48', bg: 'rgba(225,29,72,0.15)' },
    { label: 'Apportionment Q.', value: '2', icon: '⚖️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    { label: 'Approved This Month', value: '18', icon: '✅', color: '#059669', bg: 'rgba(5,150,105,0.15)' },
  ]

  const stats = role === 'sdm' ? sdmStats : role === 'naib-tehsildar' ? ntStats : role === 'tehsildar' ? tehStats : patwariStats

  const recentCases = [
    { id: 'LCMS-2026-0142', project: 'NH-44 Widening', village: 'Sarna', khasra: '124/1', owner: 'Sh. Mohan Lal', stage: 'Section 11', status: 'pending', date: '31 Jul 2026' },
    { id: 'LCMS-2026-0138', project: 'AIIMS Access Road', village: 'Samba', khasra: '256/2', owner: 'Smt. Radha Devi', stage: 'Draft Award', status: 'approved', date: '29 Jul 2026' },
    { id: 'LCMS-2026-0131', project: 'Power Grid Tower', village: 'Bein', khasra: '89/A', owner: 'Sh. Gurmail Singh', stage: 'Section 19', status: 'returned', date: '28 Jul 2026' },
    { id: 'LCMS-2026-0124', project: 'NH-44 Widening', village: 'Hiranagar', khasra: '310/3', owner: 'Sh. Ram Chand', stage: 'Final Award', status: 'approved', date: '25 Jul 2026' },
    { id: 'LCMS-2026-0118', project: 'Irrigation Canal', village: 'Fatehpur', khasra: '177/1', owner: 'Sh. Satpal Singh', stage: 'Payment', status: 'progress', date: '22 Jul 2026' },
  ]

  const quickActions = role === 'patwari' ? [
    { label: 'New Project', icon: '➕', color: '#2563eb' },
    { label: 'Continue Draft', icon: '📝', color: '#8b5cf6' },
    { label: 'Gen. Sec. 11', icon: '📋', color: '#059669' },
    { label: 'Generate Notice', icon: '📨', color: '#d97706' },
    { label: 'Upload Docs', icon: '📤', color: '#0891b2' },
    { label: 'Search Khasra', icon: '🔍', color: '#7c3aed' },
  ] : role === 'naib-tehsildar' ? [
    { label: 'Review Sec. 11', icon: '📋', color: '#d97706' },
    { label: 'Digital Sign', icon: '🔐', color: '#059669' },
    { label: 'Return Case', icon: '↩️', color: '#e11d48' },
    { label: 'View Comments', icon: '💬', color: '#2563eb' },
  ] : role === 'tehsildar' ? [
    { label: 'Review Sec. 19', icon: '📋', color: '#d97706' },
    { label: 'Apportionment', icon: '⚖️', color: '#059669' },
    { label: 'View Analytics', icon: '📊', color: '#2563eb' },
    { label: 'Generate Award', icon: '📄', color: '#7c3aed' },
  ] : [
    { label: 'Final Award', icon: '🏛️', color: '#d97706' },
    { label: 'District Report', icon: '📊', color: '#2563eb' },
    { label: 'Payment Auth.', icon: '💳', color: '#059669' },
    { label: 'View All Cases', icon: '📁', color: '#8b5cf6' },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Dashboard</span>
      </div>

      {/* Welcome */}
      <div className="glass-card" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(212,168,75,0.08) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="serif" style={{ fontSize: '1.5rem', color: '#f0f4ff', marginBottom: '0.3rem' }}>
            Welcome back — {
              role === 'patwari' ? 'Sh. Ramesh Kumar' :
              role === 'naib-tehsildar' ? 'Sh. Anil Sharma' :
              role === 'tehsildar' ? 'Sh. Vikram Singh' :
              role === 'sdm' ? 'Sh. J.P. Gupta, IAS' : 'System Admin'
            }
          </h1>
          <p style={{ fontSize: '0.83rem', color: '#8ba3cc' }}>
            {role === 'patwari' ? 'Patwari · Hiranagar Circle · 12 cases pending your action' :
             role === 'naib-tehsildar' ? 'Naib Tehsildar · 9 Section 11 approvals awaiting review' :
             role === 'tehsildar' ? 'Tehsildar · 6 Section 19 cases in approval queue' :
             role === 'sdm' ? 'Sub Divisional Magistrate · 5 Final Awards pending signature' :
             'System Administrator · All systems operational'}
          </p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#8ba3cc' }}>
          <div>Friday, 1 August 2026</div>
          <div style={{ color: '#34d399', marginTop: 2 }}>● All systems online</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{s.icon}</div>
              <div className="mono" style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        {/* Recent cases */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.04em' }}>RECENT CASES</h2>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.9rem', fontSize: '0.75rem' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Case ID', 'Project', 'Village', 'Khasra', 'Owner', 'Stage', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ fontSize: '0.7rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.06em', padding: '0.5rem 0.75rem', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c, i) => (
                <tr key={i} className="table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.15s' }}>
                  <td className="mono" style={{ fontSize: '0.72rem', color: '#60a5fa', padding: '0.75rem' }}>{c.id}</td>
                  <td style={{ fontSize: '0.8rem', color: '#c5d3ef', padding: '0.75rem', whiteSpace: 'nowrap' }}>{c.project}</td>
                  <td style={{ fontSize: '0.8rem', color: '#8ba3cc', padding: '0.75rem' }}>{c.village}</td>
                  <td className="mono" style={{ fontSize: '0.78rem', color: '#c5d3ef', padding: '0.75rem' }}>{c.khasra}</td>
                  <td style={{ fontSize: '0.8rem', color: '#c5d3ef', padding: '0.75rem', whiteSpace: 'nowrap' }}>{c.owner}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6, color: '#c5d3ef' }}>{c.stage}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={`status-badge status-${c.status}`}>
                      {c.status === 'approved' ? '✓ Approved' : c.status === 'pending' ? '○ Pending' : c.status === 'returned' ? '↩ Returned' : '● In Progress'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.72rem', color: '#8ba3cc', padding: '0.75rem', whiteSpace: 'nowrap' }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions + Mini Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.04em', marginBottom: '1rem' }}>QUICK ACTIONS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {quickActions.map((a, i) => (
                <button key={i}
                  style={{ background: `${a.color}18`, border: `1px solid ${a.color}44`, borderRadius: 10, padding: '0.75rem 0.5rem', cursor: 'pointer', color: '#c5d3ef', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a.color}33`; e.currentTarget.style.color = '#f0f4ff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${a.color}18`; e.currentTarget.style.color = '#c5d3ef' }}>
                  <span style={{ fontSize: '1rem' }}>{a.icon}</span>{a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming deadlines */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.04em', marginBottom: '1rem' }}>UPCOMING DEADLINES</h2>
            {[
              { date: 'Aug 05', event: 'Section 19 Hearing — Village Sarna', urgent: true },
              { date: 'Aug 10', event: 'High Court Compliance — Sec. 21', urgent: true },
              { date: 'Aug 15', event: 'Award Payment — Sh. Gurmail Singh', urgent: false },
              { date: 'Aug 22', event: 'Jamabandi Update — Circle Hiranagar', urgent: false },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                <div className="mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: d.urgent ? '#fbbf24' : '#8ba3cc', background: d.urgent ? 'rgba(217,119,6,0.15)' : 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>{d.date}</div>
                <div style={{ fontSize: '0.78rem', color: '#c5d3ef', lineHeight: 1.5 }}>{d.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Workflow Timeline ─────────────────────────────────────────────────────────
function WorkflowPage() {
  const [activeCase, setActiveCase] = useState('LCMS-2026-0142')

  const stages = [
    { id: 1, label: 'Project\nCreated', officer: 'Patwari', status: 'done', date: '10 Jun 2026', remarks: 'NH-44 Widening — Khasra 124/1, Village Sarna' },
    { id: 2, label: 'Section 11\nInitiated', officer: 'Patwari', status: 'done', date: '12 Jun 2026', remarks: 'Revenue documents uploaded. Notification issued.' },
    { id: 3, label: 'Sec.11\nApproved', officer: 'Naib Tehsildar', status: 'done', date: '20 Jun 2026', remarks: 'Approved with remarks. Jamabandi verified.' },
    { id: 4, label: 'Section 19\nOpened', officer: 'Patwari', status: 'done', date: '22 Jun 2026', remarks: 'Objection hearing scheduled for Jul 12.' },
    { id: 5, label: 'Sec.19\nApproved', officer: 'Tehsildar', status: 'done', date: '15 Jul 2026', remarks: 'Objection dismissed. Proceeding to Sec.21.' },
    { id: 6, label: 'Section 21\nOpened', officer: 'Auto-System', status: 'active', date: '18 Jul 2026', remarks: 'Market value determination in progress.' },
    { id: 7, label: 'Draft\nAward', officer: 'Patwari', status: 'pending', date: '—', remarks: '' },
    { id: 8, label: 'Draft\nApproved (NT)', officer: 'Naib Tehsildar', status: 'pending', date: '—', remarks: '' },
    { id: 9, label: 'Draft\nApproved (T)', officer: 'Tehsildar', status: 'pending', date: '—', remarks: '' },
    { id: 10, label: 'Apportion-\nment', officer: 'Patwari', status: 'pending', date: '—', remarks: '' },
    { id: 11, label: 'Final\nAward', officer: 'SDM', status: 'pending', date: '—', remarks: '' },
    { id: 12, label: 'Payment\n& Closure', officer: 'System', status: 'pending', date: '—', remarks: '' },
  ]

  const colorMap = { done: '#059669', active: '#2563eb', pending: '#4b5563' }
  const bgMap = { done: 'rgba(5,150,105,0.15)', active: 'rgba(37,99,235,0.2)', pending: 'rgba(255,255,255,0.04)' }
  const textMap = { done: '#34d399', active: '#60a5fa', pending: '#6b7280' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Workflow Timeline</span>
      </div>

      {/* Case selector */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="mono" style={{ fontSize: '0.72rem', color: '#8ba3cc' }}>CASE ID</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 4 }}>
            <span className="mono" style={{ fontSize: '1rem', color: '#60a5fa', fontWeight: 700 }}>{activeCase}</span>
            <span style={{ fontSize: '0.83rem', color: '#c5d3ef' }}>NH-44 Widening Project · Khasra 124/1, Village Sarna</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#8ba3cc', marginTop: 2 }}>Owner: Sh. Mohan Lal s/o Sh. Ram Nath · Tehsil Hiranagar</div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="status-badge status-progress">● Section 21 In Progress</span>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>Change Case</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>Overall Progress</span>
          <span className="mono" style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 700 }}>5 / 12 Stages Complete</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(5/12)*100}%`, background: 'linear-gradient(90deg, #059669, #34d399)', borderRadius: 4, transition: 'width 0.8s ease' }}/>
        </div>
      </div>

      {/* Workflow visual */}
      <div className="glass-card" style={{ padding: '2rem 1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: 'max-content', position: 'relative' }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 110 }}>
                {/* Step circle */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: bgMap[s.status],
                  border: `2px solid ${colorMap[s.status]}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 700, color: textMap[s.status],
                  boxShadow: s.status === 'active' ? '0 0 0 6px rgba(37,99,235,0.2)' : 'none',
                  position: 'relative', zIndex: 2, transition: 'all 0.3s',
                  cursor: 'pointer',
                }}>
                  {s.status === 'done' ? '✓' : s.status === 'active' ? '◉' : s.id}
                </div>
                {/* Label */}
                <div style={{ marginTop: '0.6rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: textMap[s.status], whiteSpace: 'pre-line', lineHeight: 1.3, marginBottom: 3 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: '#8ba3cc', background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: '1px 6px' }}>{s.officer}</div>
                  {s.date !== '—' && (
                    <div className="mono" style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: 3 }}>{s.date}</div>
                  )}
                </div>
              </div>
              {/* Connector */}
              {i < stages.length - 1 && (
                <div style={{ height: 2, width: 28, background: i < 5 ? '#059669' : i === 5 ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.1)', marginTop: 25, flexShrink: 0, borderRadius: 1 }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Timeline log */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>ACTIVITY TIMELINE</h3>
          <div style={{ position: 'relative' }}>
            {stages.filter(s => s.status === 'done' || s.status === 'active').map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.status === 'active' ? '#2563eb' : '#059669', border: s.status === 'active' ? '2px solid rgba(37,99,235,0.5)' : 'none', marginTop: 3 }}/>
                  {i < stages.filter(s => s.status === 'done' || s.status === 'active').length - 1 && (
                    <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.08)', marginTop: 4 }}/>
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: s.status === 'active' ? '#60a5fa' : '#c5d3ef' }}>{s.label.replace('\n', ' ')}</span>
                    <span className="mono" style={{ fontSize: '0.68rem', color: '#8ba3cc' }}>{s.date}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#8ba3cc', marginBottom: 3 }}>By: {s.officer}</div>
                  {s.remarks && <div style={{ fontSize: '0.75rem', color: '#c5d3ef', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '6px 10px' }}>{s.remarks}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current action panel */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>CURRENT STAGE — SECTION 21</h3>
          <div style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.83rem', color: '#c5d3ef', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#60a5fa' }}>Section 21</strong> — Collector's Award determination. Market value and compensation components are being evaluated. The Patwari must enter compensation details to proceed.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Market Value (Circle Rate)', value: '₹ 12,45,000 / Kanal', status: 'filled' },
              { label: 'Structure Value', value: '₹ 1,80,000', status: 'filled' },
              { label: 'Crop Compensation', value: '₹ 24,500', status: 'filled' },
              { label: 'Solatium (100%)', value: '₹ 12,45,000', status: 'computed' },
              { label: 'Interest (12% p.a.)', value: '₹ 2,18,400', status: 'computed' },
              { label: 'Total Compensation', value: '₹ 29,12,900', status: 'total' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: 8, background: f.status === 'total' ? 'rgba(212,168,75,0.1)' : 'rgba(255,255,255,0.04)', border: f.status === 'total' ? '1px solid rgba(212,168,75,0.25)' : 'none' }}>
                <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>{f.label}</span>
                <span className="mono" style={{ fontSize: '0.82rem', fontWeight: f.status === 'total' ? 700 : 600, color: f.status === 'total' ? '#d4a84b' : f.status === 'computed' ? '#60a5fa' : '#c5d3ef' }}>{f.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-success" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon.Check /> Generate Draft Award
            </button>
            <button className="btn-secondary">
              <Icon.Download />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section 11 Form ──────────────────────────────────────────────────────────
function Section11Page() {
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'preview'>('details')

  const fieldGroups = [
    {
      title: 'Project Details',
      fields: [
        { label: 'Serial Number', value: 'LCMS-2026-0142', disabled: true },
        { label: 'District', value: 'Kathua', type: 'select', options: ['Kathua', 'Samba', 'Jammu', 'Udhampur'] },
        { label: 'Collectorate', value: 'Kathua Collectorate', disabled: true },
        { label: 'Sub-Division', value: 'Hiranagar', disabled: true },
        { label: 'Tehsil', value: 'Hiranagar', type: 'select', options: ['Hiranagar', 'Basohli', 'Bani', 'Billawar'] },
        { label: 'Village', value: 'Sarna' },
        { label: 'Revenue Village', value: 'Sarna' },
        { label: 'Project Name', value: 'NH-44 Widening (Km 42–58)' },
        { label: 'Executing Agency', value: 'NHAI' },
        { label: 'Quantum of Land (Kanals)', value: '2.4' },
        { label: 'Notification Date', value: '2026-06-10', type: 'date' },
        { label: 'Expected Completion', value: '2026-12-31', type: 'date' },
      ]
    },
    {
      title: 'Revenue Record Details',
      fields: [
        { label: 'Khewat Number', value: '124' },
        { label: 'Khata Number', value: '78' },
        { label: 'Khasra Number', value: '124/1' },
        { label: 'Owner Name', value: 'Sh. Mohan Lal' },
        { label: "Father's Name", value: 'Sh. Ram Nath' },
        { label: 'Kasht Column', value: 'Self-Cultivated', type: 'select', options: ['Self-Cultivated', 'Tenant', 'Government', 'Waste'] },
        { label: 'Ownership Type', value: 'Absolute', type: 'select', options: ['Absolute', 'Joint', 'Mortgaged', 'Disputed'] },
        { label: 'Share Holder Quantum', value: '1/1' },
        { label: 'Area of Khasra', value: '4 Kanals 8 Marlas' },
        { label: 'Land Type', value: 'Chahi (Irrigated)', type: 'select', options: ['Chahi (Irrigated)', 'Barani (Rainfed)', 'Banjar (Waste)', 'Shamilat', 'Forest'] },
        { label: 'Jamabandi Year', value: '2022-23', type: 'select', options: ['2024-25', '2023-24', '2022-23', '2021-22'] },
        { label: 'Mutation Number', value: 'MUT-2024-1842' },
      ]
    }
  ]

  return (
    <div>
      {/* Breadcrumb & title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>Projects</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Section 11 — LCMS-2026-0142</span>
      </div>

      {/* Sticky action bar */}
      <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 20, borderRadius: 14, marginBottom: '1.5rem', padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0f4ff' }}>Section 11 — Land Acquisition Notification</h2>
            <span className="status-badge status-progress">● In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="mono" style={{ fontSize: '0.72rem', color: saveStatus === 'saved' ? '#34d399' : saveStatus === 'saving' ? '#fbbf24' : '#8ba3cc' }}>
              {saveStatus === 'saved' ? '✓ Auto-saved 2 min ago' : saveStatus === 'saving' ? '⟳ Saving...' : '○ Unsaved changes'}
            </div>
            <button className="btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}><Icon.Download /> Preview PDF</button>
            <button className="btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }} onClick={() => setSaveStatus('saving')}>Save Draft</button>
            <button className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>Submit to Naib Tehsildar →</button>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: '0.75rem', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '65%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', borderRadius: 2 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: '0.68rem', color: '#8ba3cc' }}>65% complete</span>
          <span style={{ fontSize: '0.68rem', color: '#8ba3cc' }}>Documents pending upload</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['details', 'documents', 'preview'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ padding: '0.5rem 1.25rem', borderRadius: 10, border: 'none', background: activeTab === t ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.05)', color: activeTab === t ? '#60a5fa' : '#8ba3cc', fontSize: '0.83rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', borderBottom: activeTab === t ? '2px solid #2563eb' : '2px solid transparent' }}>
            {t === 'details' ? '📋 Form Details' : t === 'documents' ? '📎 Documents' : '👁 Preview'}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {fieldGroups.map((group, gi) => (
            <div key={gi} className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d4a84b', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>{group.title.toUpperCase()}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {group.fields.map((f, fi) => (
                  <div key={fi}>
                    <label style={{ fontSize: '0.72rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
                      {f.label.toUpperCase()}
                    </label>
                    {f.type === 'select' ? (
                      <select className="input-field" defaultValue={f.value} style={{ appearance: 'none', cursor: 'pointer' }}>
                        {f.options?.map(o => <option key={o} value={o} style={{ background: '#0d1e40' }}>{o}</option>)}
                      </select>
                    ) : (
                      <input className="input-field" type={f.type || 'text'} defaultValue={f.value} disabled={f.disabled}
                        style={{ opacity: f.disabled ? 0.6 : 1, cursor: f.disabled ? 'not-allowed' : 'text' }}/>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Remarks */}
          <div className="glass-card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d4a84b', letterSpacing: '0.06em', marginBottom: '1rem' }}>REMARKS & ADDITIONAL NOTES</h3>
            <textarea className="input-field" style={{ height: 100, resize: 'vertical', lineHeight: 1.6 }}
              defaultValue="Land falls adjacent to NH-44 alignment. One boundary wall structure present. Owner has been verbally informed. Objection period expires on 2026-07-10."/>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { name: 'Jamabandi (Revenue Record)', required: true, uploaded: true, filename: 'Jamabandi_Sarna_2022-23.pdf', size: '2.4 MB' },
            { name: 'Tatima (Field Measurement)', required: true, uploaded: false },
            { name: 'Revenue Map (Shajra)', required: true, uploaded: true, filename: 'Map_Khasra124_Sarna.pdf', size: '8.1 MB' },
            { name: 'Field Photographs', required: false, uploaded: true, filename: 'Photos_NH44_K124.zip', size: '14.2 MB' },
            { name: 'Section 4 Gazette Notification', required: true, uploaded: false },
            { name: 'Ownership Certificate', required: true, uploaded: true, filename: 'Ownership_Mohan_Lal.pdf', size: '0.9 MB' },
          ].map((doc, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0f4ff' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.72rem', color: doc.required ? '#fbbf24' : '#8ba3cc', marginTop: 2 }}>
                    {doc.required ? '* Required' : 'Optional'}
                  </div>
                </div>
                {doc.uploaded ? (
                  <span className="status-badge status-approved">✓ Uploaded</span>
                ) : (
                  <span className="status-badge status-pending">○ Pending</span>
                )}
              </div>
              {doc.uploaded ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 8, padding: '0.5rem 0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#34d399' }}>📄 {doc.filename}</div>
                    <div className="mono" style={{ fontSize: '0.65rem', color: '#8ba3cc' }}>{doc.size}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>View</button>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>Replace</button>
                  </div>
                </div>
              ) : (
                <div style={{ border: '2px dashed rgba(255,255,255,0.15)', borderRadius: 10, padding: '1.25rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>📤</div>
                  <div style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>Click to upload or drag & drop</div>
                  <div style={{ fontSize: '0.68rem', color: '#6b7280', marginTop: 3 }}>PDF, JPG, PNG — Max 25MB</div>
                </div>
              )}
            </div>
          ))}
          {/* AI Check */}
          <div className="glass-card" style={{ padding: '1.25rem', gridColumn: '1 / -1', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a78bfa' }}>AI Document Quality Check</div>
                <div style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>OCR-assisted verification — automatically validates Jamabandi entries against submitted form data</div>
              </div>
              <button className="btn-secondary" style={{ marginLeft: 'auto', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.3)' }}>Run AI Verification</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="glass-card" style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          {/* PDF Preview */}
          <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 12, padding: '3rem', color: '#1a1a1a' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #1a3a6b', paddingBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#1a3a6b' }}>
                GOVERNMENT OF JAMMU & KASHMIR
              </div>
              <div style={{ fontSize: '0.75rem', color: '#333', marginTop: 4 }}>
                Revenue Department — Sub-Division Hiranagar, District Kathua
              </div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1rem', color: '#1a3a6b', fontFamily: 'serif' }}>
                NOTIFICATION UNDER SECTION 11
              </h1>
              <div style={{ fontSize: '0.75rem', color: '#555', marginTop: 4 }}>
                Land Acquisition Act (J&K) · File No. REV/HNR/LA/2026/0142
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.9, color: '#333' }}>
              <p>In exercise of the powers conferred under Section 11 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (as extended to UT of J&K), the Sub-Divisional Collector, Hiranagar is pleased to notify the following land proposed for acquisition:</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: '0.8rem' }}>
                {[
                  ['District', 'Kathua'], ['Tehsil', 'Hiranagar'], ['Village', 'Sarna'],
                  ['Khasra No.', '124/1'], ['Area', '2 Kanals 4 Marlas'], ['Owner', 'Sh. Mohan Lal s/o Sh. Ram Nath'],
                  ['Purpose', 'NH-44 Widening (Km 42–58)'], ['Executing Agency', 'NHAI'],
                ].map(([k, v], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#f8f8f8' : 'white' }}>
                    <td style={{ padding: '0.4rem 0.75rem', border: '1px solid #ddd', fontWeight: 600, width: '35%', color: '#1a3a6b' }}>{k}</td>
                    <td style={{ padding: '0.4rem 0.75rem', border: '1px solid #ddd' }}>{v}</td>
                  </tr>
                ))}
              </table>
              <p style={{ marginTop: '1rem', fontSize: '0.82rem' }}>Any person having an objection to the above acquisition may file the same before the Sub-Divisional Collector, Hiranagar within 60 days of this notification.</p>
              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 120, height: 40, borderBottom: '1px solid #333', marginBottom: 6 }}/>
                  <div style={{ fontSize: '0.75rem' }}>Patwari Halqa Sarna</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 120, height: 40, borderBottom: '1px solid #333', marginBottom: 6 }}/>
                  <div style={{ fontSize: '0.75rem' }}>Sub-Divisional Collector, Hiranagar</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            <button className="btn-primary"><Icon.Download /> Download PDF</button>
            <button className="btn-secondary">Print Preview</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
function ReportsPage() {
  const [filterPeriod, setFilterPeriod] = useState('2026')
  const [filterVillage, setFilterVillage] = useState('All Villages')

  const barData = [
    { month: 'Jan', cases: 18, amount: 12.4 },
    { month: 'Feb', cases: 22, amount: 15.8 },
    { month: 'Mar', cases: 31, amount: 22.1 },
    { month: 'Apr', cases: 26, amount: 18.6 },
    { month: 'May', cases: 28, amount: 19.9 },
    { month: 'Jun', cases: 35, amount: 28.4 },
    { month: 'Jul', cases: 29, amount: 21.3 },
  ]
  const maxCases = Math.max(...barData.map(d => d.cases))

  const summaryStats = [
    { label: 'Total Projects', value: '62', icon: '📁' },
    { label: 'Active Cases', value: '14', icon: '⚡' },
    { label: 'Closed This Year', value: '38', icon: '✅' },
    { label: 'Total Compensation', value: '₹ 48.6 Cr', icon: '💰' },
    { label: 'Villages Covered', value: '28', icon: '🏘️' },
    { label: 'Pending Payments', value: '8', icon: '⏳' },
  ]

  const projectTable = [
    { project: 'NH-44 Widening (Ph.1)', village: 'Sarna, Fatehpur', cases: 24, awarded: 18, pending: 4, paid: '₹ 12.4 Cr', status: 'progress' },
    { project: 'AIIMS Access Road', village: 'Samba, Vijaypur', cases: 12, awarded: 12, pending: 0, paid: '₹ 6.8 Cr', status: 'approved' },
    { project: 'Power Grid Tower', village: 'Bein, Marheen', cases: 8, awarded: 5, pending: 2, paid: '₹ 3.2 Cr', status: 'progress' },
    { project: 'Irrigation Canal Ph.2', village: 'Hiranagar', cases: 31, awarded: 20, pending: 8, paid: '₹ 18.1 Cr', status: 'progress' },
    { project: 'Railway Doubling', village: 'Kathua, Samba', cases: 18, awarded: 18, pending: 0, paid: '₹ 8.1 Cr', status: 'approved' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Reports & Analytics</span>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc', fontWeight: 600 }}>FILTERS:</span>
        <select className="input-field" style={{ width: 'auto', fontSize: '0.82rem' }} value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)}>
          {['2026', '2025', '2024'].map(y => <option key={y} value={y} style={{ background: '#0d1e40' }}>{y}</option>)}
        </select>
        <select className="input-field" style={{ width: 'auto', fontSize: '0.82rem' }} value={filterVillage} onChange={e => setFilterVillage(e.target.value)}>
          {['All Villages', 'Sarna', 'Fatehpur', 'Hiranagar', 'Bein', 'Marheen'].map(v => <option key={v} value={v} style={{ background: '#0d1e40' }}>{v}</option>)}
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon.Download /> Export PDF
          </button>
          <button className="btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon.Download /> Export Excel
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {summaryStats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{s.icon}</div>
            <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d4a84b' }}>{s.value}</div>
            <div style={{ fontSize: '0.7rem', color: '#8ba3cc', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Bar chart */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.5rem', letterSpacing: '0.04em' }}>MONTHLY CASE DISPOSITION — {filterPeriod}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: 180, paddingBottom: '0.5rem' }}>
            {barData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div className="mono" style={{ fontSize: '0.65rem', color: '#60a5fa' }}>{d.cases}</div>
                <div style={{ width: '100%', background: 'linear-gradient(180deg, #2563eb, #1d4ed8)', borderRadius: '4px 4px 0 0', height: `${(d.cases / maxCases) * 140}px`, position: 'relative', overflow: 'hidden', transition: 'height 0.5s ease' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(d.amount / d.cases) * 10}%`, background: 'rgba(212,168,75,0.4)' }}/>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#8ba3cc' }}>{d.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#8ba3cc' }}>
              <div style={{ width: 10, height: 10, background: '#2563eb', borderRadius: 2 }}/> Cases Processed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#8ba3cc' }}>
              <div style={{ width: 10, height: 10, background: '#d4a84b', borderRadius: 2 }}/> Compensation (₹ Cr)
            </div>
          </div>
        </div>

        {/* Status donut */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.5rem', letterSpacing: '0.04em' }}>STATUS DISTRIBUTION</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Donut segments */}
              {[
                { pct: 0.38, color: '#059669', label: 'Approved', offset: 0 },
                { pct: 0.23, color: '#2563eb', label: 'In Progress', offset: 0.38 },
                { pct: 0.18, color: '#d97706', label: 'Pending', offset: 0.61 },
                { pct: 0.14, color: '#e11d48', label: 'Returned', offset: 0.79 },
                { pct: 0.07, color: '#6b7280', label: 'Closed', offset: 0.93 },
              ].map((seg, i) => {
                const r = 62, cx = 80, cy = 80
                const startAngle = seg.offset * 2 * Math.PI - Math.PI / 2
                const endAngle = (seg.offset + seg.pct) * 2 * Math.PI - Math.PI / 2
                const x1 = cx + r * Math.cos(startAngle)
                const y1 = cy + r * Math.sin(startAngle)
                const x2 = cx + r * Math.cos(endAngle)
                const y2 = cy + r * Math.sin(endAngle)
                const large = seg.pct > 0.5 ? 1 : 0
                return (
                  <path key={i}
                    d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                    fill={seg.color} opacity="0.85"
                    stroke="#07122a" strokeWidth="2"/>
                )
              })}
              <circle cx="80" cy="80" r="40" fill="#07122a"/>
              <text x="80" y="76" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f0f4ff" fontFamily="JetBrains Mono">62</text>
              <text x="80" y="90" textAnchor="middle" fontSize="9" fill="#8ba3cc">Projects</text>
            </svg>
          </div>
          {[
            { label: 'Approved', count: 24, color: '#059669' },
            { label: 'In Progress', count: 14, color: '#2563eb' },
            { label: 'Pending Approval', count: 11, color: '#d97706' },
            { label: 'Returned', count: 9, color: '#e11d48' },
            { label: 'Closed', count: 4, color: '#6b7280' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#c5d3ef' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }}/>
                {item.label}
              </div>
              <span className="mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.04em' }}>PROJECT-WISE SUMMARY — {filterPeriod}</h3>
          <div style={{ position: 'relative' }}>
            <Icon.Search />
            <input className="input-field" style={{ paddingLeft: '2.25rem', width: 220, fontSize: '0.82rem' }} placeholder="Search projects..."/>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Project Name', 'Villages', 'Total Cases', 'Awarded', 'Pending', 'Paid Amount', 'Status'].map(h => (
                <th key={h} style={{ fontSize: '0.7rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.06em', padding: '0.5rem 0.75rem', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projectTable.map((p, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: '#c5d3ef', fontWeight: 600 }}>{p.project}</td>
                <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.78rem', color: '#8ba3cc' }}>{p.village}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: '#f0f4ff', textAlign: 'center' }}>{p.cases}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: '#34d399', textAlign: 'center' }}>{p.awarded}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: p.pending > 0 ? '#fbbf24' : '#6b7280', textAlign: 'center' }}>{p.pending}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: '#d4a84b', fontWeight: 700 }}>{p.paid}</td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <span className={`status-badge status-${p.status}`}>
                    {p.status === 'approved' ? '✓ Complete' : '● Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Documents Page ────────────────────────────────────────────────────────────
function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Section 11', 'Section 19', 'Section 21', 'Draft Awards', 'Final Awards', 'Revenue Maps', 'Jamabandi', 'Govt. Orders']

  const documents = [
    { name: 'Section 11 Notification — LCMS-2026-0142', category: 'Section 11', date: '12 Jun 2026', size: '1.2 MB', status: 'final', project: 'NH-44 Widening' },
    { name: 'Jamabandi Sarna 2022-23 (Khasra 124)', category: 'Jamabandi', date: '10 Jun 2026', size: '2.4 MB', status: 'final', project: 'NH-44 Widening' },
    { name: 'Revenue Map — Village Sarna', category: 'Revenue Maps', date: '10 Jun 2026', size: '8.1 MB', status: 'final', project: 'NH-44 Widening' },
    { name: 'Draft Award — LCMS-2026-0138', category: 'Draft Awards', date: '29 Jul 2026', size: '0.9 MB', status: 'approved', project: 'AIIMS Access Road' },
    { name: 'Final Award — LCMS-2026-0124', category: 'Final Awards', date: '25 Jul 2026', size: '1.1 MB', status: 'approved', project: 'NH-44 Widening' },
    { name: 'GO No. 452-Rev — Apportionment Procedure', category: 'Govt. Orders', date: '22 Jul 2026', size: '0.4 MB', status: 'final', project: '—' },
    { name: 'Section 19 Hearing Record — LCMS-2026-0131', category: 'Section 19', date: '28 Jul 2026', size: '0.7 MB', status: 'draft', project: 'Power Grid Tower' },
    { name: 'Section 21 Award Draft — LCMS-2026-0142', category: 'Section 21', date: '18 Jul 2026', size: '1.5 MB', status: 'draft', project: 'NH-44 Widening' },
  ]

  const filtered = activeCategory === 'All' ? documents : documents.filter(d => d.category === activeCategory)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Document Repository</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 480 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8ba3cc' }}><Icon.Search /></span>
          <input className="input-field" style={{ paddingLeft: '2.25rem' }} placeholder="Search documents, cases, projects..."/>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon.Upload /> Upload Document
        </button>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            style={{ padding: '0.35rem 0.85rem', borderRadius: 20, border: 'none', background: activeCategory === c ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)', color: activeCategory === c ? '#60a5fa' : '#8ba3cc', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', borderBottom: activeCategory === c ? '2px solid #2563eb' : '2px solid transparent' }}>
            {c}
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Document Name', 'Category', 'Project', 'Date', 'Size', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ fontSize: '0.7rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.06em', padding: '0.6rem 0.75rem', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.1rem' }}>📄</span>
                    <span style={{ fontSize: '0.83rem', color: '#c5d3ef', fontWeight: 500 }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(37,99,235,0.15)', color: '#60a5fa', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{d.category}</span>
                </td>
                <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.78rem', color: '#8ba3cc' }}>{d.project}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.72rem', color: '#8ba3cc', whiteSpace: 'nowrap' }}>{d.date}</td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.72rem', color: '#8ba3cc' }}>{d.size}</td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <span className={`status-badge ${d.status === 'approved' ? 'status-approved' : d.status === 'final' ? 'status-closed' : 'status-pending'}`}>
                    {d.status === 'approved' ? '✓ Approved' : d.status === 'final' ? '○ Final' : '✎ Draft'}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>View</button>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}><Icon.Download /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Revenue Maps Page ─────────────────────────────────────────────────────────
function MapsPage() {
  const [selectedKhasra, setSelectedKhasra] = useState<string | null>('124/1')
  const [mapMode, setMapMode] = useState<'revenue' | 'satellite'>('revenue')

  const khasraData: Record<string, { owner: string; area: string; type: string; status: string; project: string }> = {
    '124/1': { owner: 'Sh. Mohan Lal', area: '2 Kanals 4 Marlas', type: 'Chahi', status: 'pending', project: 'NH-44 Widening' },
    '124/2': { owner: 'Sh. Ram Chand', area: '1 Kanal 8 Marlas', type: 'Barani', status: 'approved', project: 'NH-44 Widening' },
    '125/1': { owner: 'Smt. Radha Devi', area: '3 Kanals', type: 'Chahi', status: 'closed', project: 'AIIMS Road' },
    '125/2': { owner: 'Sh. Gurmail Singh', area: '2 Kanals 2 Marlas', type: 'Barani', status: 'returned', project: 'Power Grid' },
    '126/1': { owner: 'Sh. Satpal Singh', area: '4 Kanals', type: 'Chahi', status: 'progress', project: 'NH-44 Widening' },
    '126/2': { owner: 'J&K Govt. (Shamilat)', area: '1 Kanal 4 Marlas', type: 'Shamilat', status: 'approved', project: 'NH-44 Widening' },
  }

  const statusColors: Record<string, string> = {
    pending: 'rgba(217,119,6,0.4)',
    approved: 'rgba(5,150,105,0.4)',
    progress: 'rgba(37,99,235,0.4)',
    returned: 'rgba(225,29,72,0.4)',
    closed: 'rgba(100,116,139,0.4)',
  }

  const plots = [
    { id: '124/1', points: "100,80 160,75 165,130 105,135" },
    { id: '124/2', points: "165,75 220,70 225,125 165,130" },
    { id: '125/1', points: "220,70 275,68 280,120 225,125" },
    { id: '125/2', points: "105,135 165,130 168,185 108,188" },
    { id: '126/1', points: "165,130 225,125 228,180 168,185" },
    { id: '126/2', points: "225,125 280,120 285,175 228,180" },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Revenue Village Map — Sarna</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
        {/* Map */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['revenue', 'satellite'] as const).map(m => (
                <button key={m} onClick={() => setMapMode(m)}
                  style={{ padding: '0.35rem 0.85rem', borderRadius: 8, border: 'none', background: mapMode === m ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)', color: mapMode === m ? '#60a5fa' : '#8ba3cc', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  {m === 'revenue' ? '📋 Revenue Map' : '🛰 Satellite'}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>+ Zoom</button>
              <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>− Zoom</button>
              <button className="btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}>Reset</button>
            </div>
          </div>
          <svg width="100%" viewBox="0 0 520 380" style={{ borderRadius: 12, cursor: 'crosshair' }}>
            <defs>
              <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapMode === 'satellite' ? '#1a2a1a' : '#0d1e40'}/>
                <stop offset="100%" stopColor={mapMode === 'satellite' ? '#0d1a0d' : '#07122a'}/>
              </linearGradient>
            </defs>
            <rect width="520" height="380" fill="url(#mapBg)" rx="12"/>
            {/* Grid */}
            {[0,65,130,195,260,325,390,455,520].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="380" stroke="rgba(100,116,139,0.15)" strokeWidth="1"/>
            ))}
            {[0,60,120,180,240,300,360].map(y => (
              <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(100,116,139,0.15)" strokeWidth="1"/>
            ))}
            {/* Village boundary */}
            <polygon points="70,40 250,25 430,55 450,220 340,330 140,310 55,200"
              fill={mapMode === 'satellite' ? 'rgba(34,197,94,0.06)' : 'rgba(37,99,235,0.05)'}
              stroke={mapMode === 'satellite' ? 'rgba(34,197,94,0.5)' : 'rgba(37,99,235,0.4)'}
              strokeWidth="2" strokeDasharray="8 4"/>
            <text x="250" y="18" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)" fontWeight="600">VILLAGE SARNA</text>
            {/* Khasra plots */}
            {plots.map(p => {
              const kd = khasraData[p.id]
              const isSelected = selectedKhasra === p.id
              return (
                <g key={p.id} onClick={() => setSelectedKhasra(p.id)} style={{ cursor: 'pointer' }}>
                  <polygon
                    points={p.points.split(' ').map(pt => {
                      const [x, y] = pt.split(',')
                      return `${parseInt(x) + 30},${parseInt(y) + 30}`
                    }).join(' ')}
                    fill={isSelected ? `${statusColors[kd.status]}` : `${statusColors[kd.status]}`.replace('0.4', '0.25')}
                    stroke={isSelected ? 'white' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text
                    x={p.points.split(' ').reduce((acc, pt) => acc + parseInt(pt.split(',')[0]), 0) / 4 + 30}
                    y={p.points.split(' ').reduce((acc, pt) => acc + parseInt(pt.split(',')[1]), 0) / 4 + 30}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono" fontWeight="600">
                    {p.id}
                  </text>
                </g>
              )
            })}
            {/* Acquisition overlay */}
            <polygon
              points="195,105 305,98 312,215 198,215"
              fill="none" stroke="#d4a84b" strokeWidth="2.5" strokeDasharray="8 4"/>
            <text x="253" y="92" textAnchor="middle" fontSize="9" fill="#d4a84b" fontWeight="700">NH-44 ALIGNMENT</text>
            {/* North arrow */}
            <g transform="translate(480, 50)">
              <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)"/>
              <polygon points="0,-12 -5,4 0,0 5,4" fill="white"/>
              <text x="0" y="8" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)">N</text>
            </g>
            {/* Legend */}
            <rect x="10" y="310" width="140" height="65" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)"/>
            {[
              { color: 'rgba(217,119,6,0.6)', label: 'Pending Award' },
              { color: 'rgba(5,150,105,0.6)', label: 'Award Finalized' },
              { color: 'rgba(37,99,235,0.6)', label: 'In Progress' },
              { color: 'rgba(225,29,72,0.6)', label: 'Returned' },
            ].map((l, i) => (
              <g key={i} transform={`translate(15, ${315 + i * 14})`}>
                <rect width="10" height="10" rx="2" fill={l.color}/>
                <text x="14" y="9" fontSize="8" fill="#c5d3ef">{l.label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Sidebar info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search */}
          <div className="glass-card" style={{ padding: '1rem' }}>
            <label style={{ fontSize: '0.72rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>SEARCH KHASRA / OWNER</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8ba3cc' }}><Icon.Search /></span>
              <input className="input-field" style={{ paddingLeft: '2.25rem' }} placeholder="e.g. 124/1 or Mohan Lal"/>
            </div>
          </div>

          {/* Selected Khasra info */}
          {selectedKhasra && khasraData[selectedKhasra] && (
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#60a5fa' }}>Khasra {selectedKhasra}</h3>
                <span className={`status-badge status-${khasraData[selectedKhasra].status}`}>
                  {khasraData[selectedKhasra].status}
                </span>
              </div>
              {[
                { label: 'Owner', value: khasraData[selectedKhasra].owner },
                { label: 'Area', value: khasraData[selectedKhasra].area },
                { label: 'Land Type', value: khasraData[selectedKhasra].type },
                { label: 'Project', value: khasraData[selectedKhasra].project },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8ba3cc' }}>{f.label}</span>
                  <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600, textAlign: 'right', maxWidth: 160 }}>{f.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem' }}>View Case</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.78rem' }}><Icon.Download /></button>
              </div>
            </div>
          )}

          {/* All khasras */}
          <div className="glass-card" style={{ padding: '1.25rem', flex: 1 }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1rem', letterSpacing: '0.04em' }}>ALL KHASRA NUMBERS</h3>
            {Object.entries(khasraData).map(([kno, kd]) => (
              <div key={kno} onClick={() => setSelectedKhasra(kno)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.5rem', borderRadius: 8, marginBottom: 4, cursor: 'pointer', background: selectedKhasra === kno ? 'rgba(37,99,235,0.15)' : 'transparent', transition: 'background 0.2s' }}>
                <div>
                  <span className="mono" style={{ fontSize: '0.82rem', color: selectedKhasra === kno ? '#60a5fa' : '#c5d3ef', fontWeight: 700 }}>{kno}</span>
                  <div style={{ fontSize: '0.68rem', color: '#8ba3cc' }}>{kd.owner}</div>
                </div>
                <span className={`status-badge status-${kd.status}`} style={{ fontSize: '0.62rem' }}>
                  {kd.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Projects Page ─────────────────────────────────────────────────────────────
function ProjectsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)

  const projects = [
    { id: 'NH-44-PH1', name: 'NH-44 Widening (Phase 1)', agency: 'NHAI', budget: '₹ 24.8 Cr', cases: 24, status: 'progress', tehsil: 'Hiranagar', villages: 'Sarna, Fatehpur', date: '10 Jun 2026' },
    { id: 'AIIMS-RD', name: 'AIIMS Access Road', agency: 'JKPWD', budget: '₹ 8.2 Cr', cases: 12, status: 'approved', tehsil: 'Samba', villages: 'Samba, Vijaypur', date: '15 Mar 2026' },
    { id: 'PG-TWR-3', name: 'Power Grid Tower Line', agency: 'PGCIL', budget: '₹ 4.1 Cr', cases: 8, status: 'pending', tehsil: 'Hiranagar', villages: 'Bein, Marheen', date: '02 May 2026' },
    { id: 'IRR-C-PH2', name: 'Irrigation Canal Phase 2', agency: 'Irrigation Dept.', budget: '₹ 18.6 Cr', cases: 31, status: 'progress', tehsil: 'Hiranagar', villages: 'Hiranagar, Palhore', date: '28 Jan 2026' },
  ]

  const wizardFields = [
    { step: 1, label: 'Basic Details', fields: ['Project Name', 'District', 'Collectorate', 'Sub-Division', 'Tehsil'] },
    { step: 2, label: 'Location', fields: ['Village', 'Revenue Village', 'Estimated Area (Kanals)'] },
    { step: 3, label: 'Project Info', fields: ['Project Type', 'Executing Agency', 'Estimated Budget (₹)', 'Notification Date'] },
    { step: 4, label: 'Review & Create', fields: [] },
  ]

  if (showWizard) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#8ba3cc', cursor: 'pointer' }} onClick={() => setShowWizard(false)}>Projects</span>
          <Icon.ChevronRight />
          <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>New Project Wizard</span>
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            {wizardFields.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < wizardFields.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: wizardStep > s.step ? 'rgba(5,150,105,0.3)' : wizardStep === s.step ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)', border: `2px solid ${wizardStep > s.step ? '#059669' : wizardStep === s.step ? '#2563eb' : 'rgba(255,255,255,0.15)'}`, color: wizardStep > s.step ? '#34d399' : wizardStep === s.step ? '#60a5fa' : '#8ba3cc', fontSize: '0.85rem', fontWeight: 700 }}>
                    {wizardStep > s.step ? '✓' : s.step}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: wizardStep >= s.step ? '#c5d3ef' : '#8ba3cc', whiteSpace: 'nowrap' }}>{s.label}</div>
                </div>
                {i < wizardFields.length - 1 && <div style={{ flex: 1, height: 2, background: wizardStep > s.step + 1 ? '#059669' : 'rgba(255,255,255,0.1)', margin: '0 8px', marginBottom: 20 }}/>}
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            {wizardStep < 4 ? (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.5rem' }}>Step {wizardStep}: {wizardFields[wizardStep-1].label}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {wizardFields[wizardStep-1].fields.map(f => (
                    <div key={f}>
                      <label style={{ fontSize: '0.72rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>{f.toUpperCase()}</label>
                      {f === 'District' || f === 'Project Type' ? (
                        <select className="input-field" style={{ appearance: 'none' }}>
                          {f === 'District' ? ['Kathua', 'Samba', 'Jammu'].map(o => <option key={o} style={{ background: '#0d1e40' }}>{o}</option>)
                          : ['Road / Highway', 'Railway', 'Power Transmission', 'Irrigation', 'Airport', 'Defence', 'Other'].map(o => <option key={o} style={{ background: '#0d1e40' }}>{o}</option>)}
                        </select>
                      ) : (
                        <input className="input-field" placeholder={`Enter ${f.toLowerCase()}`}
                          defaultValue={f === 'Collectorate' ? 'Kathua Collectorate' : f === 'Sub-Division' ? 'Hiranagar' : ''}/>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn-secondary" onClick={() => wizardStep > 1 ? setWizardStep(w => w - 1) : setShowWizard(false)}>
                    ← {wizardStep > 1 ? 'Previous' : 'Cancel'}
                  </button>
                  <button className="btn-primary" onClick={() => setWizardStep(w => w + 1)}>
                    Next Step →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '1.25rem' }}>Review & Confirm</h3>
                <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'rgba(5,150,105,0.08)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[['Project Name', 'NH-44 Widening Phase 2'], ['District', 'Kathua'], ['Tehsil', 'Hiranagar'], ['Village', 'Sarna'], ['Agency', 'NHAI'], ['Budget', '₹ 12 Crore']].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: '0.7rem', color: '#8ba3cc' }}>{k}</div>
                        <div style={{ fontSize: '0.85rem', color: '#c5d3ef', fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button className="btn-secondary" onClick={() => setWizardStep(3)}>← Back</button>
                  <button className="btn-success" onClick={() => { setShowWizard(false); setWizardStep(1) }}>Create Project & Begin Section 11</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>Projects</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8ba3cc' }}><Icon.Search /></span>
          <input className="input-field" style={{ paddingLeft: '2.25rem', width: 320 }} placeholder="Search projects..."/>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setShowWizard(true)}>
          <Icon.Plus /> New Project
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {projects.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => setPage('workflow')}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <div className="mono" style={{ fontSize: '0.68rem', color: '#8ba3cc', marginBottom: 4 }}>{p.id}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0f4ff' }}>{p.name}</h3>
              </div>
              <span className={`status-badge status-${p.status}`}>
                {p.status === 'approved' ? '✓ Complete' : p.status === 'pending' ? '○ Pending' : '● Active'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
              {[
                { label: 'Agency', value: p.agency },
                { label: 'Budget', value: p.budget },
                { label: 'Tehsil', value: p.tehsil },
                { label: 'Cases', value: p.cases.toString() },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: '0.68rem', color: '#8ba3cc', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#c5d3ef', fontWeight: 600 }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-primary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.78rem' }}>View Workflow →</button>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>Docs</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Users Page ────────────────────────────────────────────────────────────────
function UsersPage() {
  const users = [
    { name: 'Sh. Ramesh Kumar', role: 'Patwari', code: 'PAT-0142', circle: 'Hiranagar', status: 'active', last: '1 Aug 2026' },
    { name: 'Sh. Anil Sharma', role: 'Naib Tehsildar', code: 'NT-0024', circle: 'Tehsil Hiranagar', status: 'active', last: '1 Aug 2026' },
    { name: 'Sh. Vikram Singh', role: 'Tehsildar', code: 'TEH-0008', circle: 'Hiranagar Tehsil', status: 'active', last: '31 Jul 2026' },
    { name: 'Sh. J.P. Gupta, IAS', role: 'SDM', code: 'SDM-0003', circle: 'Sub-Division Hiranagar', status: 'active', last: '1 Aug 2026' },
    { name: 'Sh. Harbans Lal', role: 'Patwari', code: 'PAT-0143', circle: 'Sarna Circle', status: 'inactive', last: '25 Jul 2026' },
    { name: 'Smt. Anita Sharma', role: 'Naib Tehsildar', code: 'NT-0025', circle: 'Tehsil Hiranagar', status: 'active', last: '1 Aug 2026' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#8ba3cc' }}>LCMS</span>
        <Icon.ChevronRight />
        <span style={{ fontSize: '0.78rem', color: '#c5d3ef', fontWeight: 600 }}>User Management</span>
      </div>
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.04em' }}>ALL OFFICERS</h3>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>
            <Icon.Plus /> Add Officer
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Officer Name', 'Role', 'Code', 'Circle / Jurisdiction', 'Status', 'Last Login', 'Actions'].map(h => (
                <th key={h} style={{ fontSize: '0.7rem', color: '#8ba3cc', fontWeight: 600, letterSpacing: '0.06em', padding: '0.5rem 0.75rem', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.83rem', color: '#f0f4ff', fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(37,99,235,0.15)', color: '#60a5fa', padding: '2px 8px', borderRadius: 6 }}>{u.role}</span>
                </td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.75rem', color: '#8ba3cc' }}>{u.code}</td>
                <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.78rem', color: '#8ba3cc' }}>{u.circle}</td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <span className={`status-badge ${u.status === 'active' ? 'status-approved' : 'status-closed'}`}>
                    {u.status === 'active' ? '● Active' : '○ Inactive'}
                  </span>
                </td>
                <td className="mono" style={{ padding: '0.85rem 0.75rem', fontSize: '0.72rem', color: '#8ba3cc' }}>{u.last}</td>
                <td style={{ padding: '0.85rem 0.75rem' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>Edit</button>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>Reset PWD</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('landing')
  const [role, setRole] = useState<Role>('patwari')

  const handleLogin = (r: Role) => {
    setRole(r)
    setPage('dashboard')
  }

  if (page === 'landing') return <LandingPage onLogin={() => setPage('login')} />
  if (page === 'login') return <LoginPage onLogin={handleLogin} />

  return (
    <AppShell role={role} page={page} setPage={setPage} onLogout={() => setPage('landing')}>
      {page === 'dashboard' && <Dashboard role={role} />}
      {page === 'workflow' && <WorkflowPage />}
      {page === 'section11' && <Section11Page />}
      {page === 'reports' && <ReportsPage />}
      {page === 'documents' && <DocumentsPage />}
      {page === 'maps' && <MapsPage />}
      {page === 'projects' && <ProjectsPage setPage={setPage} />}
      {page === 'users' && <UsersPage />}
    </AppShell>
  )
}
