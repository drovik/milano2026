// Fem guldstjerner. Der findes ikke andre antal på denne rejse.
export function Stars({ big }: { big?: boolean }) {
  return (
    <span className={`rating${big ? ' big' : ''}`} title="5,0 — skalaen går fra 5 til 5">
      <span className="num">5,0</span>
      <span className="stars" aria-hidden>
        <span className="stars-on-full">★★★★★</span>
      </span>
    </span>
  )
}
