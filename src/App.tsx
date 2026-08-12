import { useState } from "react"
import Splash from "./components/Splash"
import BottomNav from "./components/BottomNav"
import MusicPlayer from "./components/MusicPlayer"
import HeroCouple from "./components/HeroCouple"
import Salam from "./components/Salam"
import QuranVerse from "./components/QuranVerse"
import Countdown from "./components/Countdown"
import WeddingDetails from "./components/WeddingDetails"
import MapSection from "./components/MapSection"
import RSVP from "./components/RSVP"
import Wishes from "./components/Wishes"
import Gifts from "./components/Gifts"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function App() {
  const [open, setOpen] = useState(false)
  const [wishesRefresh, setWishesRefresh] = useState(0)

  return (
    <div id="top" className="min-h-screen bg-[var(--color-ivory)]">
      <Splash open={open} onOpen={() => setOpen(true)} />
      {open && (
        <>
          <MusicPlayer />
          <main className="pb-24">
            <HeroCouple />
            <Salam />
            <QuranVerse />
            <Countdown />
            <WeddingDetails />
            <MapSection />
            <RSVP onSubmitted={() => setWishesRefresh((n) => n + 1)} />
            <Wishes refreshTrigger={wishesRefresh} />
            <Gifts />
            <Contact />
          </main>
          <Footer />
          <BottomNav />
        </>
      )}
    </div>
  )
}
