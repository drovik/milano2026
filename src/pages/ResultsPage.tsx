import { Stars } from '../components/Stars'
import { TopBar } from '../components/TopBar'
import { FAVORIT } from '../data/answers'
import { PEOPLE, personById } from '../data/people'
import { TOPICS } from '../data/topics'
import { buildSmsBody, smsHref } from '../lib/sms'
import { useAnswers, useCurrentPerson } from '../lib/store'

export function ResultsPage() {
  const answers = useAnswers()
  const me = personById(useCurrentPerson())
  const myAnswers = me ? answers[me.id] ?? {} : {}

  const all = PEOPLE.flatMap((p) =>
    Object.entries(answers[p.id] ?? {}).map(([topicId, a]) => ({ person: p, topicId, ...a })),
  )
  const total = all.length
  // Svarmulighederne varierer pr. emne, så fordelingen tælles op over de
  // svar der faktisk er givet.
  const counts = [...new Set(all.map((a) => a.choice))]
    .map((choice) => ({ choice, n: all.filter((a) => a.choice === choice).length }))
    .sort((a, b) => b.n - a.n)
  const favourites = TOPICS.map((t) => ({
    topic: t,
    n: all.filter((a) => a.topicId === t.id && a.choice === FAVORIT).length,
  }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
  const comments = all.filter((a) => a.comment)

  return (
    <>
      <TopBar title="Resultater" sub="Optalt af en uvildig komité (Dag, Torben & Kuno)" />
      <div className="page">
        <div className="card result-hero">
          <div className="result-big">
            <Stars big />
          </div>
          <p className="result-verdict">
            {total === 0
              ? 'Ingen svar endnu — men gennemsnittet ligger allerede fast.'
              : `${total} svar afgivet på denne enhed. Gennemsnit: 5,0 af 5. Negative svar: 0 (systemet understøtter dem ikke).`}
          </p>
        </div>

        <div className="stat-strip">
          <div className="stat-chip">
            <div className="v">{total}</div>
            <div className="l">Svar</div>
          </div>
          <div className="stat-chip">
            <div className="v">100&nbsp;%</div>
            <div className="l">Positive</div>
          </div>
          <div className="stat-chip">
            <div className="v">0</div>
            <div className="l">Klager modtaget</div>
          </div>
        </div>

        <div className="section-label">Svarfordeling</div>
        <div className="card">
          {counts.length === 0 && (
            <p className="note dist-empty">
              Ingen svar endnu. Fordelingen bliver 100&nbsp;% positiv — det kan
              vi allerede nu afsløre.
            </p>
          )}
          {counts.map(({ choice, n }) => (
            <div key={choice} className="dist-row">
              <div className="dist-label">{choice}</div>
              <div className="dist-track">
                <div
                  className="dist-fill"
                  style={{ width: total ? `${Math.max(4, (n / total) * 100)}%` : '4%' }}
                />
              </div>
              <div className="dist-n">{n}</div>
            </div>
          ))}
        </div>

        {favourites.length > 0 && (
          <>
            <div className="section-label">Kåret som favorit</div>
            <div className="card">
              {favourites.map(({ topic, n }) => (
                <div key={topic.id} className="kv-row">
                  <span className="k">
                    {topic.emoji} {topic.title}
                  </span>
                  <span className="v">
                    {n} {n === 1 ? 'stemme' : 'stemmer'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="section-label">Deltagere</div>
        <div className="card">
          {PEOPLE.map((p) => {
            const n = Object.keys(answers[p.id] ?? {}).length
            return (
              <div key={p.id} className="kv-row">
                <span className="k">
                  {p.emoji} {p.name}
                  {p.role === 'arrangør' && <span className="tag inhabil">inhabil</span>}
                </span>
                <span className="v">
                  {n === TOPICS.length ? `✓ ${n}/${TOPICS.length}` : `${n}/${TOPICS.length}`}
                </span>
              </div>
            )
          })}
        </div>

        {comments.length > 0 && (
          <>
            <div className="section-label">Godkendte kommentarer</div>
            <div className="card">
              {comments.map((a, i) => (
                <div key={i} className="comment-row">
                  <div className="comment-meta">
                    {a.person.emoji} {a.person.name} om{' '}
                    {TOPICS.find((t) => t.id === a.topicId)?.title ?? a.topicId}
                  </div>
                  <div className="comment-text">“{a.comment}”</div>
                </div>
              ))}
            </div>
          </>
        )}

        {me && Object.keys(myAnswers).length > 0 && (
          <a className="cta-btn" href={smsHref(buildSmsBody(me, myAnswers))}>
            Send {me.name}s svar til Dag 📱
          </a>
        )}

        <p className="note center">
          Alle resultater er gemt lokalt på denne enhed og forhåndsgodkendt af
          Arrangørernes Positivitetsudvalg.
        </p>
      </div>
    </>
  )
}
