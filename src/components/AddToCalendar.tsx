import { weddingConfig } from "../data/weddingConfig"
import { downloadICS, googleCalendarUrl } from "../utils/calendar"

export default function AddToCalendar() {
  const eventDetails = {
    title: `${weddingConfig.event.eventName} — ${weddingConfig.couple.groomFull} & ${weddingConfig.couple.brideFull}`,
    description: `Jemputan rasmi ${weddingConfig.event.eventName} ${weddingConfig.couple.groomShort} & ${weddingConfig.couple.brideShort}.`,
    location: `${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`,
    startISO: weddingConfig.event.date,
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      <button
        onClick={() => downloadICS(eventDetails)}
        className="active:scale-95 transition-transform px-5 py-2.5 rounded-full border border-[var(--color-maroon)] text-[var(--color-maroon)] text-xs sm:text-sm tracking-wide font-body min-h-[44px]"
      >
        📅 Tambah ke Kalendar (iOS/Outlook)
      </button>
      <a
        href={googleCalendarUrl(eventDetails)}
        target="_blank"
        rel="noopener noreferrer"
        className="active:scale-95 transition-transform px-5 py-2.5 rounded-full border border-[var(--color-maroon)] text-[var(--color-maroon)] text-xs sm:text-sm tracking-wide font-body min-h-[44px] flex items-center"
      >
        📅 Google Calendar
      </a>
    </div>
  )
}
