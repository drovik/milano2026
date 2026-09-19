import { useNavigate } from 'react-router-dom'

export function TopBar({ title, sub }: { title: string; sub?: string }) {
  const nav = useNavigate()
  return (
    <div className="topbar">
      <button className="iconbtn" aria-label="Tilbage" onClick={() => nav(-1)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="topbar-titles">
        <div className="topbar-title">{title}</div>
        {sub && <div className="topbar-sub">{sub}</div>}
      </div>
    </div>
  )
}
