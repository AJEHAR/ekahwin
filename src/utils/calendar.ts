/**
 * Jana fail .ics (format kalendar universal) secara client-side, tanpa
 * perlu library luar. Fail .ics boleh dibuka terus oleh Kalendar iOS,
 * Google Calendar, Outlook, dan hampir semua app kalendar lain.
 */

function toICSDate(date: Date): string {
  // Format ICS UTC: YYYYMMDDTHHMMSSZ
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
}

function escapeICSText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n")
}

export function downloadICS({
  title,
  description,
  location,
  startISO,
  durationHours = 4,
}: {
  title: string
  description: string
  location: string
  startISO: string
  durationHours?: number
}) {
  const start = new Date(startISO)
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000)

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//eWeddingCard//MS//",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@ewedding-card`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    `LOCATION:${escapeICSText(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "majlis-walimatul-urus.ics"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function googleCalendarUrl({
  title,
  description,
  location,
  startISO,
  durationHours = 4,
}: {
  title: string
  description: string
  location: string
  startISO: string
  durationHours?: number
}) {
  const start = new Date(startISO)
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: description,
    location: location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
