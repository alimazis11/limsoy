import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import './App.css'

import heroPhoto from './assets/hero.png'
import groomPhoto from './assets/groom.png'
import bridePhoto from './assets/bride.png'
import bunga1 from './assets/bunga1.png'
import bunga2 from './assets/bunga2.png'

import gallery1 from './assets/gallery/1.jpeg'
import gallery2 from './assets/gallery/2.png'
import gallery3 from './assets/gallery/3.jpeg'
import gallery4 from './assets/gallery/4.jpeg'
import gallery5 from './assets/gallery/5.jpeg'
import gallery6 from './assets/gallery/6.jpeg'
import gallery7 from './assets/gallery/7.jpeg'

function FlowerPetals() {
  return null
}

function FloatingFlowerDecorations({ showOnly = false }) {
  if (!showOnly) return null
  return null
}

function CornerFlowers({ position }) {
  const cls = `corner-flowers corner-flowers--${position}`
  return (
    <div className={cls} aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 10C62 30 70 50 60 60C50 50 40 30 42 10C44 5 52 2 60 10Z" fill="currentColor" opacity="0.15"/>
        <path d="M95 35C90 45 78 52 78 52C78 52 80 38 85 30C88 27 93 30 95 35Z" fill="currentColor" opacity="0.12"/>
        <path d="M25 35C30 45 42 52 42 52C42 52 40 38 35 30C32 27 27 30 25 35Z" fill="currentColor" opacity="0.12"/>
        <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.2"/>
      </svg>
    </div>
  )
}

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7]
const galleryLabels = ['Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh']
const galleryPositions = ['center', 'center', 'center', 'center', 'center', 'center', 'center 30%']
const events = [
  {
    title: 'Akad Nikah',
    time: '10.00 WIB - selesai',
    place: 'Kediaman Mempelai Perempuan',
    address: 'Jl. Melati No. 24, Gorontalo',
  },
  {
    title: 'Resepsi Pernikahan',
    time: '19.00 WIB - selesai',
    place: 'Gedung Grand Palace Convention Center',
    address: 'Jl. Prof. DR. Jhon Aryo Katili No.42, Gorontalo',
  },
]

const WEDDING_DATE = new Date('2026-08-24T10:00:00+07:00')
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.969759883098!2d123.06148107349154!3d0.5686223635918758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792ca7161487ef%3A0x5c4b18600999f275!2sGrand%20Palace%20Convention%20Center!5e1!3m2!1sen!2sid!4v1784790896052!5m2!1sen!2sid'

function useCountdown(target) {
  const [time, setTime] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setTime({
        hari: Math.floor(diff / 86400000),
        jam: Math.floor((diff % 86400000) / 3600000),
        menit: Math.floor((diff % 3600000) / 60000),
        detik: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

const dirs = ['up', 'down', 'left', 'right', 'scale', 'rotate']
function Reveal({ children, className = '', delay = 0, dir }) {
  const ref = useRef(null)
  const cls = useMemo(() => {
    const d = dir || dirs[Math.floor(Math.random() * dirs.length)]
    return `reveal reveal--${d}`
  }, [dir])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${cls} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [coverLoaded, setCoverLoaded] = useState(false)
  const [coupleInView, setCoupleInView] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [guestName, setGuestName] = useState('')
  const [guestWish, setGuestWish] = useState('')
  const [wishes, setWishes] = useState([])
  const [attendance, setAttendance] = useState({ hadir: 5, tidakHadir: 3, ragu: 0 })
  const audioRef = useRef(null)
  const coupleRef = useRef(null)
  const countdown = useCountdown(WEDDING_DATE)

  useEffect(() => {
    const savedWishes = localStorage.getItem('wedding_wishes')
    const savedAttendance = localStorage.getItem('wedding_attendance')
    if (savedWishes) setWishes(JSON.parse(savedWishes))
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance))
    
    fetchWishes()
    fetchStats()
  }, [])

  const fetchWishes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishes')
      if (response.ok) {
        const data = await response.json()
        setWishes(data)
      }
    } catch (error) {
      console.log('Backend tidak tersedia, menggunakan localStorage')
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishes/stats')
      if (response.ok) {
        const stats = await response.json()
        setAttendance(stats)
      }
    } catch (error) {
      console.log('Backend tidak tersedia')
    }
  }

  const updateAttendanceCount = (wishesData) => {
    const counts = { hadir: 5, tidakHadir: 3, ragu: 0 }
    wishesData.forEach(wish => {
      if (wish.status === 'hadir') counts.hadir += 1
      else if (wish.status === 'tidakHadir') counts.tidakHadir += 1
      else if (wish.status === 'ragu') counts.ragu += 1
    })
    setAttendance(counts)
  }

  useEffect(() => {
    const t = setTimeout(() => setCoverLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCoupleInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (coupleRef.current) {
      observer.observe(coupleRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!coupleInView) return
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [coupleInView])

  const handleOpen = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
    setTimeout(() => {
      document.getElementById('home2')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  const openLightbox = useCallback((i) => setLightbox(i), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevLightbox = useCallback(() => setLightbox((p) => (p > 0 ? p - 1 : galleryImages.length - 1)), [])
  const nextLightbox = useCallback(() => setLightbox((p) => (p < galleryImages.length - 1 ? p + 1 : 0)), [])

  const handleWishSubmit = (status) => {
    if (!guestName.trim()) {
      alert('Nama harus diisi')
      return
    }
    const newWish = {
      name: guestName,
      wish: guestWish,
      status: status,
      date: new Date().toLocaleDateString('id-ID')
    }
    
    submitWishToBackend(newWish)
    
    setGuestName('')
    setGuestWish('')
  }

  const submitWishToBackend = async (newWish) => {
    try {
      const response = await fetch('http://localhost:5000/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWish)
      })
      
      if (response.ok) {
        const savedWish = await response.json()
        fetchWishes()
        fetchStats()
        localStorage.setItem('wedding_wishes', JSON.stringify([savedWish, ...wishes]))
      }
    } catch (error) {
      console.log('Backend tidak tersedia, menyimpan ke localStorage')
      const updatedWishes = [{ ...newWish, id: Date.now() }, ...wishes]
      setWishes(updatedWishes)
      updateAttendanceCount(updatedWishes)
      localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes))
    }
  }

  return (
    <main className={isOpen ? 'opened' : ''}>
      <FlowerPetals />
      <audio ref={audioRef} src="/Bercanda.mp3" loop />

      <section className={`cover ${coverLoaded ? 'cover--ready' : ''}`} id="home" style={{ backgroundImage: `url(${heroPhoto})` }}>
        <div className="cover-inner">
          <div className={`cover-text ${coverLoaded ? 'cover-text--in' : ''}`}>
            <p>The Wedding of</p>
            <h1>Johan & Yunisa</h1>
            <span>Sabtu, 24 Agustus 2026</span>
          </div>
          <div className={`guest-card ${coverLoaded ? 'guest-card--in' : ''}`}>
            <small>Kpd Bpk/Ibu/Saudara/i</small>
            <strong>Tamu Undangan</strong>
            <p>Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri acara pernikahan kami.</p>
            <button type="button" onClick={handleOpen}>Buka Undangan</button>
          </div>
        </div>
      </section>

      <section className="home-panel" id="home2" style={{ backgroundImage: `url(${heroPhoto})` }}>
        <Reveal>
          <p>We invited you to celebrate our wedding</p>
          <h2>Johan & Yunisa</h2>
          <a href="#date">Save The Date</a>
          <span>Sabtu, 24 Agustus 2026</span>
        </Reveal>
      </section>

      <section className="opening" id="couple">
        <CornerFlowers position="top-left" />
        <CornerFlowers position="bottom-right" />
        <div className="section-divider"><span>❀</span></div>
        <Reveal>
          <h3>Assalamualaikum Wr. Wb.</h3>
          <p>Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam rangkaian acara resepsi pernikahan kami:</p>
        </Reveal>
      </section>

      <section className="couple" id="couple" ref={coupleRef}>
        <CornerFlowers position="top-left" />
        <CornerFlowers position="bottom-right" />
        <Reveal className="couple-article" dir="left">
          <article>
            <div className="photo-wrapper groom-wrapper">
              <div className="photo groom" style={{ backgroundImage: `url(${groomPhoto})` }}></div>
            </div>
            <h3>Johan Arya Harun</h3>
            <p><strong>Putra Pertama</strong><br />Bapak Ahmad - Ibu Siti</p>
          </article>
        </Reveal>
        <div className="and">
          <Reveal dir="scale">&</Reveal>
        </div>
        <Reveal className="couple-article" delay={200} dir="right">
          <article>
            <div className="photo-wrapper bride-wrapper">
              <div className="photo bride" style={{ backgroundImage: `url(${bridePhoto})` }}></div>
            </div>
            <h3>Yunisa Bakari</h3>
            <p><strong>Putri Kedua</strong><br />Bapak Rahman - Ibu Aminah</p>
          </article>
        </Reveal>
      </section>

      <section className="gallery" id="galeri">
        <Reveal>
          <h3>Our Wedding Gallery</h3>
        </Reveal>
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <Reveal key={galleryLabels[i]} delay={i * 80}>
              <div
                className="gallery-item"
                style={{ backgroundImage: `url(${img})`, backgroundPosition: galleryPositions[i] }}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                {galleryLabels[i]}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button type="button" className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <button type="button" className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevLightbox() }}>&lsaquo;</button>
          <img src={galleryImages[lightbox]} alt={galleryLabels[lightbox]} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextLightbox() }}>&rsaquo;</button>
        </div>
      )}

      <section className="verse">
        <CornerFlowers position="top-left" />
        <CornerFlowers position="bottom-right" />
        <div className="section-divider"><span>❀</span></div>
        <Reveal>
          <p>&ldquo;Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapatkan ketenangan hati dan dijadikan-Nya kasih sayang di antara kamu.&rdquo;</p>
          <strong>- Q.S. Ar-Rum: 21 -</strong>
        </Reveal>
      </section>

      <section className="date" id="date">
        <CornerFlowers position="top-left" />
        <CornerFlowers position="bottom-right" />
        <div className="section-divider"><span>❀</span></div>
        <Reveal>
          <span>Our Special</span>
          <h3>Wedding Event</h3>
        </Reveal>
        <Reveal delay={100}>
          <div className="countdown">
            {Object.entries(countdown).map(([label, val]) => (
              <div key={label}>
                <strong>{String(val).padStart(2, '0')}</strong>
                <small>{label.charAt(0).toUpperCase() + label.slice(1)}</small>
              </div>
            ))}
          </div>
        </Reveal>
        {events.map((item, i) => (
          <Reveal key={item.title} delay={200 + i * 150}>
            <article className="event-card">
              <h4>{item.title}</h4>
              <p><strong>Sabtu,</strong><br />24 Agustus 2026</p>
              <p><strong>{item.time}</strong></p>
              <p><strong>{item.place}</strong><br />{item.address}</p>
            </article>
          </Reveal>
        ))}
        {MAP_EMBED_URL && (
          <Reveal delay={500}>
            <div className="map-wrap">
              <iframe
                src={MAP_EMBED_URL}
                title="Lokasi Acara"
                className="map-embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        )}
      </section>

      <section className="thanks">
        <Reveal>
          <p>Tiada yang dapat kami ungkapkan selain rasa terima kasih dari hati yang tulus apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.</p>
        </Reveal>
      </section>

      <section className="wish" id="wish">
        <Reveal>
          <div className="attendance"><span>{attendance.hadir} Hadir</span><span>{attendance.tidakHadir} Tidak hadir</span><span>{attendance.ragu} Masih Ragu</span></div>
          <h3>Konfirmasi Kehadiran</h3>
          <input 
            placeholder="Nama" 
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <textarea 
            placeholder="Ucapan dan doa"
            value={guestWish}
            onChange={(e) => setGuestWish(e.target.value)}
          />
          <div>
            <button type="button" onClick={() => handleWishSubmit('hadir')}>Datang</button>
            <button type="button" onClick={() => handleWishSubmit('tidakHadir')}>Absen</button>
            <button type="button" onClick={() => handleWishSubmit('ragu')}>Mungkin</button>
          </div>
          {wishes.length > 0 && (
            <div className="wishes-list">
              <div className="wishes-header">
                <h4>Ucapan dari Tamu</h4>
                <p>{wishes.length} ucapan telah masuk</p>
              </div>
              {wishes.map((wish) => (
                <div key={wish.id} className="wish-item">
                  <div className="wish-content">
                    <div className="wish-header">
                      <p className="wish-name">{wish.name}</p>
                      <span className={`wish-status ${wish.status}`}>
                        {wish.status === 'hadir' ? '✓ Hadir' : wish.status === 'tidakHadir' ? '✗ Tidak Hadir' : '? Mungkin'}
                      </span>
                    </div>
                    {wish.wish && <p className="wish-message">"{wish.wish}"</p>}
                    <div className="wish-footer">
                      <span className="wish-date">{wish.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <section className="gift">
        <Reveal>
          <h3>Amplop Digital</h3>
          <p>Terima kasih telah melakukan konfirmasi kehadiran. Doa Bapak/Ibu/Saudara/i sudah merupakan hadiah terbaik bagi kami.</p>
          <div className="bank-card"><span>Nomor Rekening</span><strong>1234567890</strong><button type="button">Salin</button><span>Atas Nama</span><strong>Johan & Yunisa</strong></div>
        </Reveal>
      </section>

      <nav>
        <a href="#home">Home</a>
        <a href="#couple">Couple</a>
        <a href="#date">Event</a>
        <a href="#galeri">Gallery</a>
        <a href="#wish">Wishes</a>
      </nav>

      {isOpen && (
        <button type="button" className="music-toggle" onClick={toggleMusic}>
          {isMuted ? '\u{1F507}' : '\u{1F3B5}'}
        </button>
      )}
    </main>
  )
}

export default App
