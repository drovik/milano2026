import { useState } from 'react'
import type { Topic } from '../data/types'

// Viser billedet fra public/images/<topic-id>.jpg hvis det findes; falder
// ellers pænt tilbage til emoji-hero. Billederne tilføjes efterhånden som
// arrangørerne godkender dem.
export function TopicImage({ topic }: { topic: Topic }) {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <div className="topic-hero-emoji" aria-hidden>
        {topic.emoji}
      </div>
    )
  }
  return (
    <img
      className="topic-hero-img"
      src={`./images/${topic.id}.jpg`}
      alt={topic.title}
      onError={() => setMissing(true)}
    />
  )
}

// Valgfrit ekstra billede (public/images/<topic-id>-2.jpg) under
// beskrivelsen — vises kun, hvis filen findes.
export function TopicExtraImage({ topic }: { topic: Topic }) {
  const [loaded, setLoaded] = useState(false)
  const [missing, setMissing] = useState(false)
  if (missing) return null
  return (
    <div className="topic-hero" style={loaded ? undefined : { display: 'none' }}>
      <img
        className="topic-hero-img"
        src={`./images/${topic.id}-2.jpg`}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setMissing(true)}
      />
    </div>
  )
}
