import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const ALLOWED_NAME = 'amel'  // ubah ini untuk nama/password login nanti

const HER_NAME = 'Amel'  // ubah ini untuk nama dia
const YOUR_NAME = 'Clayton Puqi'  // ubah ini untuk nama kamu
const FOOTER_YEAR = '2025'  // ubah ini untuk tahun footer

const HERO_MESSAGE = `There are so many things I want to tell you, but I never found the right moment.
So I made this page, just for you.`

const LETTER_PARAGRAPHS = [
  `I'm not the best with words, and maybe this isn't the most romantic letter ever written.
But every word here is honest, from the deepest part of me.`,
  `You are the person who made me believe that good things can come without being searched for.
You came slowly, but your presence changed everything.`,
  `I love every version of you. The happy one, the tired one, the annoyed one,
and even the quiet one. All of them. Because all of them are you.`,
  `And if you ask why I made this, the answer is simple:
because I want you to know that you matter. More than you think.`,
]

const MUSIC_URL = '/Ryan Beatty - Phantom.mp3'

function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.4
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <button className="music-btn" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
        <span className={`music-icon ${playing ? 'playing' : ''}`}>
          <span /><span /><span /><span />
        </span>
      </button>
    </>
  )
}

function FloatingOrbs() {
  return (
    <div className="floating-orbs">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
    </div>
  )
}

function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

function FakeErrorPage({ onContinue }) {
  const [leaving, setLeaving] = useState(false)

  const handleContinue = () => {
    setLeaving(true)
    setTimeout(onContinue, 550)
  }

  return (
    <div className={`fake-error-page ${leaving ? 'leaving' : ''}`}>
      <div className="fake-error-content">
        <button className="dino-button" onClick={handleContinue} aria-label="Open page">
          <span className="dino-body" />
          <span className="dino-head" />
          <span className="dino-leg dino-leg-left" />
          <span className="dino-leg dino-leg-right" />
          <span className="dino-tail" />
        </button>
        <h1>This site can't be reached</h1>
        <p className="fake-error-main">The page took too long to respond.</p>
        <p className="fake-error-code">ERR_CONNECTION_TIMED_OUT</p>
        <p className="fake-error-hint">Tap the dinosaur to retry.</p>
      </div>
    </div>
  )
}

function LoginPage({ onLogin }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim().toLowerCase() === ALLOWED_NAME) {
      onLogin(name.trim())
    } else {
      setError('Hmm, this page is not for you...')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="login-page">
      <FloatingOrbs />
      <div className={`login-container ${shake ? 'shake' : ''}`}>
        <span className="login-icon">&#9825;</span>
        <h1 className="login-title">Only For You</h1>
        <p className="login-subtitle">a private page</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-wrapper">
            <input
              className="login-input"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              autoFocus
              autoComplete="off"
            />
          </div>
          <button className="login-btn" type="submit">
            Open
          </button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <p className="login-hint">This page was made for someone special.</p>
      </div>
    </div>
  )
}

function MainContent() {
  const contentRef = useReveal()

  const loveList = [
    { text: <><strong>Your smile</strong> always makes my days feel brighter, even on the hardest ones.</> },
    { text: <><strong>The way you laugh</strong> especially when you try to hold it in, somehow makes you even more adorable.</> },
    { text: <><strong>Your little acts of care</strong> that may seem simple, but always mean so much to me.</> },
    { text: <><strong>Your courage</strong> to be yourself. You never try to be someone else, and that's something I truly admire.</> },
    { text: <><strong>Your eyes</strong> that always feel honest. I can see so much in them, and all of it is beautiful.</> },
    { text: <><strong>Your voice</strong> somehow always calms me down, whether you're being serious or just joking around.</> },
  ]

  const timeline = [
    { date: 'The Beginning', title: 'The first time we met', desc: `Back then, I didn't know you would become someone so meaningful in my life.` },
    { date: 'Over Time', title: 'We grew closer', desc: `Every conversation and every laugh slowly made me realize how comfortable I feel with you.` },
    { date: 'Right Now', title: `I'm sure`, desc: `It wasn't a coincidence that we met. And now, I want to say something I've been keeping inside.` },
  ]

  return (
    <div className="main-content" ref={contentRef}>
      <FloatingOrbs />
      <MusicPlayer />
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-greeting">Hello, Dear</p>
          <h1 className="hero-name">{HER_NAME}</h1>
          <div className="hero-divider" />
          <p className="hero-message">
            {HERO_MESSAGE}
          </p>
        </div>
        <span className="hero-scroll">scroll down</span>
      </section>

      <section className="section">
        <div className="reveal">
          <p className="section-label">01</p>
          <h2 className="section-title">Things I Love About You</h2>
        </div>
        <ul className="love-list">
          {loveList.map((item, i) => (
            <li key={i} className="love-item reveal">
              <span className="love-number">{String(i + 1).padStart(2, '0')}</span>
              <p className="love-text">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="reveal">
          <p className="section-label">02</p>
          <h2 className="section-title">Our Story</h2>
        </div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item reveal">
              <p className="timeline-date">{item.date}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section letter-section">
        <div className="reveal">
          <p className="section-label">03</p>
          <h2 className="section-title">A Letter For You</h2>
        </div>
        <div className="letter-card reveal">
          <div className="letter-body">
            <p>Dear {HER_NAME},</p>
            {LETTER_PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="letter-sign">
            <p className="letter-sign-text">With all my heart,</p>
            <p className="letter-sign-name">{YOUR_NAME}</p>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="reveal">
          <span className="final-heart">&#9825;</span>
          <h2 className="final-title">
            You are the only reason<br />
            this page exists.
          </h2>
          <p className="final-subtitle">Made with love, only for you.</p>
        </div>
        <p className="final-footer">&#9825; {YOUR_NAME} &mdash; {FOOTER_YEAR}</p>
      </section>
    </div>
  )
}

function App() {
  const [errorCleared, setErrorCleared] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  if (!errorCleared) {
    return <FakeErrorPage onContinue={() => setErrorCleared(true)} />
  }

  return loggedIn ? <MainContent /> : <LoginPage onLogin={() => setLoggedIn(true)} />
}

export default App
