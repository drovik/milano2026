import { Link, Navigate } from 'react-router-dom'
import { Chevron } from '../components/Chevron'
import { TopBar } from '../components/TopBar'
import { personById } from '../data/people'
import { GENERELT, OPLEVELSER, TOPICS } from '../data/topics'
import type { Topic } from '../data/types'
import { useAnswers, useCurrentPerson } from '../lib/store'

function TopicRow({ topic, answered }: { topic: Topic; answered?: string }) {
  return (
    <Link to={`/topic/${topic.id}`} className="nav-row">
      <span className="nav-ico">{topic.emoji}</span>
      <span className="nav-body">
        <span className="nav-title">{topic.title}</span>
        <br />
        <span className="nav-sub">{answered ? `Dit svar: ${answered}` : topic.sub}</span>
      </span>
      {answered ? <span className="done-check">✓</span> : <Chevron />}
    </Link>
  )
}

export function SurveyPage() {
  const personId = useCurrentPerson()
  const person = personById(personId)
  const answers = useAnswers()

  if (!person) return <Navigate to="/" replace />

  const mine = answers[person.id] ?? {}
  const answered = Object.keys(mine).length
  const done = answered === TOPICS.length
  const pct = Math.round((answered / TOPICS.length) * 100)

  return (
    <>
      <TopBar title="Spørgeskemaet" sub={`Du svarer som ${person.name}`} />
      <div className="page">
        <div className="progress-card card">
          <div className="progress-head">
            <span>{answered} af {TOPICS.length} emner besvaret</span>
            <span className="progress-pct">{pct}&nbsp;%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          {done ? (
            <p className="progress-note done">
              🎉 Tak! Din 100&nbsp;% objektive evaluering er registreret.
              Konklusion: turen var fantastisk.
            </p>
          ) : (
            <p className="progress-note">
              Vurdér hvert emne på den officielle skala fra 5 til 5 stjerner.
            </p>
          )}
        </div>

        <div className="section-label">Oplevelser</div>
        <nav className="nav-list">
          {OPLEVELSER.map((t) => (
            <TopicRow key={t.id} topic={t} answered={mine[t.id]?.choice} />
          ))}
        </nav>

        <div className="section-label">Generelt</div>
        <nav className="nav-list">
          {GENERELT.map((t) => (
            <TopicRow key={t.id} topic={t} answered={mine[t.id]?.choice} />
          ))}
        </nav>

        {done && (
          <Link to="/results" className="cta-btn">
            Se resultaterne 🏆
          </Link>
        )}
      </div>
    </>
  )
}
