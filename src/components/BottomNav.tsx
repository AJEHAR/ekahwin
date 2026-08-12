import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const tabs = [
  {
    href: "#top",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "#couple",
    label: "Couple",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"}>
        <path
          d="M12 20.5 3.6 12.6C1.5 10.6 1.7 7.3 4 5.6a5 5 0 0 1 6.7.7L12 7.6l1.3-1.3a5 5 0 0 1 6.7-.7c2.3 1.7 2.5 5 .4 7L12 20.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    href: "#details",
    label: "Details",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth={active ? 2 : 1.5} />
        <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "#rsvp",
    label: "RSVP",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth={active ? 2 : 1.5} />
        <path d="M15.5 15.5 17 17l3-3" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.5 4.5h4l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v4a1.5 1.5 0 0 1-1.6 1.5C10.6 20.6 3.4 13.4 3 6.1A1.5 1.5 0 0 1 4.5 4.5Z"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.5}
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const [active, setActive] = useState("#top")

  useEffect(() => {
    const sections = tabs
      .map((t) => document.querySelector(t.href))
      .filter((el): el is Element => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed bottom-0 inset-x-0 z-40 flex justify-center px-4"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 14px)" }}
    >
      <div className="glass-card flex items-center gap-1 px-2 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
        {tabs.map((t) => {
          const isActive = active === t.href
          return (
            <a
              key={t.href}
              href={t.href}
              className="active:scale-90 transition-transform relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl font-body min-w-[56px] min-h-[52px]"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-pill"
                  className="absolute inset-0 rounded-2xl bg-[var(--color-maroon)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className="relative"
                style={{ color: isActive ? "var(--color-gold)" : "var(--color-brown)", opacity: isActive ? 1 : 0.55 }}
              >
                {t.icon(isActive)}
              </span>
              <span
                className="relative text-[9px] tracking-[0.08em] uppercase"
                style={{ color: isActive ? "var(--color-ivory)" : "var(--color-brown)", opacity: isActive ? 1 : 0.5 }}
              >
                {t.label}
              </span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
