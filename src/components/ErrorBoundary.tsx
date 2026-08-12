import { Component, type ReactNode } from "react"

/**
 * Error Boundary — tangkap sebarang ralat render tak dijangka dalam
 * mana-mana komponen, papar fallback mesra (bukan skrin putih kosong).
 * Tanpa ni, satu ralat kecil dalam mana-mana section boleh buat seluruh
 * website "hilang" terus pada tetamu.
 */
type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Log ke console untuk debugging — tak ganggu tetamu.
    console.error("Ralat tidak dijangka:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
            background: "#FBF8F2",
            color: "#433A36",
            fontFamily: "Georgia, serif",
          }}
        >
          <p style={{ fontSize: "2rem", marginBottom: "12px", color: "#6A2E39" }}>💐</p>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "#6A2E39" }}>
            Maaf, ada sedikit masalah teknikal
          </h1>
          <p style={{ fontSize: "0.95rem", marginBottom: "24px", opacity: 0.8, maxWidth: "320px" }}>
            Sila cuba muat semula halaman ini. Kalau masalah berterusan, hubungi kami terus.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#6A2E39",
              color: "#FBF8F2",
              border: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Muat Semula
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
