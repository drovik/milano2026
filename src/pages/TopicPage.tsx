import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Stars } from '../components/Stars'
import { TopBar } from '../components/TopBar'
import { TopicImage } from '../components/TopicImage'
import { FORBIDDEN_CHOICES, positivityCheck } from '../data/answers'
import { personById } from '../data/people'
import { TOPICS, topicById } from '../data/topics'
import { buildSmsBody, smsHref } from '../lib/sms'
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
  const [sliderPokes, setSliderPokes] = useState(0)
  const [sliderValue, setSliderValue] = useState(5)

  const sliderAnim = useRef<number | null>(null)
  function cancelSliderAnim() {
    if (sliderAnim.current !== null) {
      cancelAnimationFrame(sliderAnim.current)
      sliderAnim.current = null
    }
  }

  // Slip af slideren: alt under 5 afvises — og den glider langsomt,
  // men ubønhørligt, op på 5 igen.
  function sliderRelease() {
    if (sliderValue < 5) {
      setSliderPokes((n) => n + 1)
      const from = sliderValue
      const duration = 1100
      const start = performance.now()
      cancelSliderAnim()
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - k, 3) // easeOutCubic
        setSliderValue(from + (5 - from) * eased)
        sliderAnim.current = k < 1 ? requestAnimationFrame(tick) : null
      }
      sliderAnim.current = requestAnimationFrame(tick)
    }
  }

  // Nulstil formularen når man går videre til næste emne.
  useEffect(() => {
    setChoice(existing?.choice ?? null)
    setComment(existing?.comment ?? '')
    setRejection(null)
    setSaved(false)
    setSliderPokes(0)
    cancelSliderAnim()
    setSliderValue(5)
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
          {/* Ligner en helt almindelig 1-5-skala og starter på 5 — men slipper
              man den på 1-4, glider den langsomt op på 5 igen. Native input,
              så den virker også på iOS Safari. step=0.01 giver den glidende
              animation frem for hak. */}
          <input
            className="five-slider"
            type="range"
            min={1}
            max={5}
            step={0.01}
            value={sliderValue}
            onChange={(e) => {
              cancelSliderAnim()
              setSliderValue(Number(e.target.value))
            }}
            onPointerUp={sliderRelease}
            onTouchEnd={sliderRelease}
            onMouseUp={sliderRelease}
            onKeyUp={sliderRelease}
            onBlur={sliderRelease}
            aria-label="Antal stjerner (alt under 5 afvises)"
          />
          <div className="slider-scale">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <p className="note">
            {sliderPokes === 0
              ? 'Vurdér frit på skalaen fra 1 til 5.'
              : sliderPokes < 4
                ? 'Godt forsøg! Alt under 5 afvises automatisk. 🔒'
                : 'Den ender på 5 hver gang. Ligesom turen. 😌'}
          </p>
        </div>

        <h2 className="block-title">Dit svar</h2>
        <div className="choice-list">
          {topic.choices.map((c) => (
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
          <>
            <a className="cta-btn secondary" href={smsHref(buildSmsBody(person, mine))}>
              Alle emner besvaret — send dine svar til Dag 📱
            </a>
            <button className="cta-btn secondary" onClick={() => nav('/results')}>
              Se resultaterne 🏆
            </button>
          </>
        )}
      </div>
    </>
  )
}
