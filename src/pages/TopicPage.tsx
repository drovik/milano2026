import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { TopBar } from '../components/TopBar'
import { TopicImage } from '../components/TopicImage'
import { CHOICES, FORBIDDEN_CHOICES, positivityCheck } from '../data/answers'
import { personById } from '../data/people'
import { TOPICS, topicById } from '../data/topics'
import { saveAnswer, useAnswers, useCurrentPerson } from '../lib/store'

export function TopicPage() {
  const { id } = useParams()
  const nav = useNavigate()
  const topic = topicById(id)
  const personId = useCurrentPerson()
  const person = personById(personId)
  const answers = useAnswers()

  const existing = person && topic ? answers[person.id]?.[topic.id] : undefined
  const [choice, setChoice] = useState<string | null>(existing?.choice ?? null)
  const [comment, setComment] = useState(existing?.comment ?? '')
  const [rejection, setRejection] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  // Nulstil formularen når man går videre til næste emne.
  useEffect(() => {
    setChoice(existing?.choice ?? null)
    setComment(existing?.comment ?? '')
    setRejection(null)
    setSaved(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!topic) return <Navigate to="/survey" replace />
  if (!person) return <Navigate to="/" replace />

  const mine = answers[person.id] ?? {}
  const idx = TOPICS.findIndex((t) => t.id === topic.id)
  const nextUnanswered =
    TOPICS.slice(idx + 1).find((t) => !mine[t.id]) ?? TOPICS.find((t) => !mine[t.id] && t.id !== topic.id)

  function submit() {
    if (!choice || !person || !topic) return
    const problem = comment.trim() ? positivityCheck(comment) : null
    if (problem) {
      setRejection(problem)
      return
    }
    setRejection(null)
    saveAnswer(person.id, topic.id, {
      choice,
      stars: 5,
      comment: comment.trim() || undefined,
      at: new Date().toISOString(),
    })
    setSaved(true)
  }

  return (
    <>
      <TopBar title={topic.title} sub={`Emne ${idx + 1} af ${TOPICS.length}`} />
      <div className="page">
        <div className="topic-hero">
          <TopicImage topic={topic} />
        </div>
        <p className="summary">{topic.blurb}</p>

        <h2 className="block-title">Din vurdering</h2>
        <div className="card slider-card">
          <div className="slider-head">
            <span>Vælg antal stjerner</span>
            <Stars />
          </div>
          <div
            className="five-slider"
            role="slider"
            aria-label="Antal stjerner"
            aria-valuemin={5}
            aria-valuemax={5}
            aria-valuenow={5}
            tabIndex={0}
          >
            <div className="five-slider-track" />
            <div className="five-slider-thumb" />
          </div>
          <div className="slider-scale">
            <span>5</span>
            <span>5</span>
            <span>5</span>
            <span>5</span>
            <span>5</span>
          </div>
          <p className="note">Skalaen går fra 5 til 5. Justér omhyggeligt.</p>
        </div>

        <h2 className="block-title">Dit svar</h2>
        <div className="choice-list">
          {CHOICES.map((c) => (
            <button
              key={c}
              className={`choice-btn${choice === c ? ' sel' : ''}`}
              onClick={() => {
                setChoice(c)
                setSaved(false)
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="forbidden-box">
          <div className="forbidden-head">🔒 Øvrige svarmuligheder</div>
          {FORBIDDEN_CHOICES.map((c) => (
            <button key={c} className="choice-btn forbidden" disabled>
              {c}
            </button>
          ))}
          <p className="note">Permanent deaktiveret af Dag, Torben &amp; Kuno.</p>
        </div>

        <h2 className="block-title">Positiv kommentar (valgfri)</h2>
        <textarea
          className="comment-box"
          rows={3}
          placeholder="Skriv noget begejstret her …"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
            setRejection(null)
            setSaved(false)
          }}
        />
        {rejection && <p className="rejection">🚫 {rejection}</p>}

        <button className="cta-btn" disabled={!choice} onClick={submit}>
          {saved ? 'Gemt! ✓' : existing ? 'Opdatér svar' : 'Gem svar'}
        </button>
        {saved && nextUnanswered && (
          <button className="cta-btn secondary" onClick={() => nav(`/topic/${nextUnanswered.id}`)}>
            Næste emne: {nextUnanswered.emoji} {nextUnanswered.title}
          </button>
        )}
        {saved && !nextUnanswered && (
          <button className="cta-btn secondary" onClick={() => nav('/results')}>
            Alle emner besvaret — se resultaterne 🏆
          </button>
        )}
      </div>
    </>
  )
}
