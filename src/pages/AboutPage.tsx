import { TopBar } from '../components/TopBar'
import { ARRANGOERER, MEDREJSENDE } from '../data/people'

export function AboutPage() {
  return (
    <>
      <TopBar title="Om undersøgelsen" sub="Milano · september 2026" />
      <div className="page">
        <p className="summary">
          Denne videnskabeligt funderede undersøgelse evaluerer fællesturen til
          Milano i september 2026. Undersøgelsen er udarbejdet efter alle
          kunstens regler — dog med én enkelt metodisk finesse: der findes
          ingen negative svarmuligheder.
        </p>

        <div className="section-label">Arrangører</div>
        <div className="card">
          {ARRANGOERER.map((p) => (
            <div key={p.id} className="kv-row">
              <span className="k">
                {p.emoji} {p.name}
              </span>
              <span className="v">Arrangør · fuldstændig inhabil</span>
            </div>
          ))}
        </div>

        <div className="section-label">Medrejsende (panelet)</div>
        <div className="card">
          {MEDREJSENDE.map((p) => (
            <div key={p.id} className="kv-row">
              <span className="k">
                {p.emoji} {p.name}
              </span>
              <span className="v">Uafhængig ekspertdommer</span>
            </div>
          ))}
        </div>

        <div className="section-label">Metode</div>
        <div className="card method-card">
          <p>
            <strong>Skala:</strong> Alle emner vurderes på den internationalt
            anerkendte skala fra 5 til 5 stjerner.
          </p>
          <p>
            <strong>Svarmuligheder:</strong> Nøje udvalgt af arrangørerne for at
            sikre et retvisende billede af en fejlfri tur.
          </p>
          <p>
            <strong>Kommentarer:</strong> Gennemgås automatisk af Arrangørernes
            Positivitetsudvalg. Negative gloser returneres til afsender med
            venlig hilsen.
          </p>
          <p>
            <strong>Databehandling:</strong> Alle svar gemmes udelukkende lokalt
            på din egen enhed (localStorage) — de sendes ingen steder hen.
            Anonymiteten er total, bortset fra at du har skrevet dit navn.
          </p>
          <p>
            <strong>Habilitet:</strong> Arrangørerne erklærer sig hermed
            inhabile, hvilket ingen indflydelse har på noget som helst.
          </p>
        </div>

        <p className="note center">
          Milano 2026 · En tur arrangeret af Dag, Torben &amp; Kuno · Klager
          henvises til Piba Bar (rundt om hjørnet)
        </p>
      </div>
    </>
  )
}
