import { Link } from 'react-router-dom'
import { Chevron } from '../components/Chevron'
import { ARRANGOERER, MEDREJSENDE, personById } from '../data/people'
import { TOPICS } from '../data/topics'
import { setCurrentPerson, useAnswers, useCurrentPerson } from '../lib/store'

export function Landing() {
  const answers = useAnswers()
  const personId = useCurrentPerson()
  const person = personById(personId)
  const answered = person ? Object.keys(answers[person.id] ?? {}).length : 0

  return (
    <div className="page">
      <header className="hero">
        <img className="hero-duomo" src="./favicon.svg" alt="" />
        <h1>Milano 2026</h1>
        <p>
          Det officielle spørgeskema for fællesturen til Milano, september 2026.
          <br />
          100&nbsp;% anonymt*&nbsp;·&nbsp;100&nbsp;% frivilligt*&nbsp;·&nbsp;100&nbsp;% positivt
        </p>
        <p className="hero-fine">*Nej.</p>
      </header>

      <div className="stat-strip">
        <div className="stat-chip">
          <div className="v">{TOPICS.length}</div>
          <div className="l">Emner</div>
        </div>
        <div className="stat-chip">
          <div className="v">{person ? `${answered}/${TOPICS.length}` : '–'}</div>
          <div className="l">Besvaret</div>
        </div>
        <div className="stat-chip">
          <div className="v">5,0</div>
          <div className="l">Snit (garanteret)</div>
        </div>
      </div>

      <div className="section-label">Hvem er du?</div>
      <div className="person-grid">
        {MEDREJSENDE.map((p) => (
          <button
            key={p.id}
            className={`person-chip${personId === p.id ? ' sel' : ''}`}
            onClick={() => setCurrentPerson(p.id)}
          >
            <span className="person-emoji">{p.emoji}</span>
            <span className="person-name">{p.name}</span>
            <span className="person-role">medrejsende</span>
          </button>
        ))}
        {ARRANGOERER.map((p) => (
          <button
            key={p.id}
            className={`person-chip${personId === p.id ? ' sel' : ''}`}
            onClick={() => setCurrentPerson(p.id)}
          >
            <span className="person-emoji">{p.emoji}</span>
            <span className="person-name">{p.name}</span>
            <span className="person-role">arrangør · inhabil</span>
          </button>
        ))}
      </div>
      {person?.role === 'arrangør' && (
        <p className="note">
          Som arrangør er du naturligvis fuldstændig inhabil. Du må gerne svare
          alligevel — resultatet er alligevel givet på forhånd.
        </p>
      )}

      <div className="section-label">Kom i gang</div>
      <nav className="nav-list">
        <Link to="/survey" className={`nav-row${person ? '' : ' dim'}`}>
          <span className="nav-ico">📝</span>
          <span className="nav-body">
            <span className="nav-title">Start spørgeskemaet</span>
            <br />
            <span className="nav-sub">
              {person
                ? `${person.name} · ${answered} af ${TOPICS.length} emner besvaret`
                : 'Vælg først hvem du er ovenfor'}
            </span>
          </span>
          <Chevron />
        </Link>
        <Link to="/results" className="nav-row">
          <span className="nav-ico">🏆</span>
          <span className="nav-body">
            <span className="nav-title">Resultater</span>
            <br />
            <span className="nav-sub">Foreløbig stilling: fantastisk</span>
          </span>
          <Chevron />
        </Link>
        <Link to="/about" className="nav-row">
          <span className="nav-ico">ℹ️</span>
          <span className="nav-body">
            <span className="nav-title">Om undersøgelsen</span>
            <br />
            <span className="nav-sub">Metode, habilitet og andre formaliteter</span>
          </span>
          <Chevron />
        </Link>
      </nav>
    </div>
  )
}
