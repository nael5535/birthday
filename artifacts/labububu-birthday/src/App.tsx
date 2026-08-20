import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  Camera,
  ExternalLink,
  Gift,
  Heart,
  LockKeyhole,
  Music2,
  Sparkles,
  Star,
} from 'lucide-react';

const MUSIC_URL = 'https://youtu.be/mGUjVbsYG6E?list=RDmGUjVbsYG6E';

const timelineItems = [
  {
    date: '05 / 04 / 2025',
    title: 'The first hello',
    copy: 'From the very first word, I wanted to know you more. I had no idea that one small day would become the beginning of something so big in my heart.',
  },
  {
    date: 'A little while later',
    title: 'You laughed, and everything warmed up',
    copy: 'Somewhere between our endless conversations, I realized you are not just a beautiful detail in my life… you are the part that makes it lovable.',
  },
  {
    date: '22 / 08 / 2026',
    title: 'Labububu day',
    copy: 'Today is not just your birthday. It is the day the world decided to bring its sweetest person into it — and somehow make you my favorite part of everything.',
  },
];

const memoryCards = [
  { title: 'The first laugh', label: 'A photo from that day', icon: Camera },
  { title: 'Our place', label: 'A place that feels like us', icon: Star },
  { title: 'A tiny detail', label: 'A moment only we understand', icon: Sparkles },
  { title: 'You', label: 'Labububu in her element', icon: Heart },
  { title: 'Long conversations', label: 'A night we forgot to sleep', icon: Camera },
  { title: 'The best is ahead', label: 'A space for our next photo', icon: Gift },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BirthdayPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isStickerWiggling, setIsStickerWiggling] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isCelebrating || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#e66e5d', '#f2c463', '#33203f', '#8bc7bd', '#d6a6b4'];
    const pieces = Array.from({ length: 125 }, (_, index) => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 180,
      y: window.innerHeight * 0.56,
      size: 4 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 13,
      speedY: -7 - Math.random() * 13,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.24,
      gravity: 0.2 + Math.random() * 0.08,
      color: colors[index % colors.length],
      life: 1,
    }));

    let animationFrame = 0;
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      pieces.forEach((piece) => {
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.speedY += piece.gravity;
        piece.rotation += piece.rotationSpeed;
        piece.life -= 0.007;

        context.save();
        context.globalAlpha = Math.max(piece.life, 0);
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.55);
        context.restore();
      });

      if (pieces.some((piece) => piece.life > 0)) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isCelebrating]);

  const openMusic = () => {
    window.open(MUSIC_URL, '_blank', 'noopener,noreferrer');
    setIsMusicOpen(true);
  };

  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const wiggleSticker = () => {
    setIsStickerWiggling(false);
    window.setTimeout(() => setIsStickerWiggling(true), 20);
  };

  return (
    <main className="birthday-page" dir="ltr">
      <section className="hero" data-testid="section-hero">
        <span className="floating-particle particle-one" aria-hidden="true" />
        <span className="floating-particle particle-two" aria-hidden="true" />
        <span className="floating-particle particle-three" aria-hidden="true" />
        <span className="floating-particle particle-four" aria-hidden="true" />

        <nav className="topbar" aria-label="Main navigation">
          <div className="brand-mark" data-testid="text-brand">
            <span className="brand-seal" aria-hidden="true">
              <LockKeyhole size={17} strokeWidth={1.8} />
            </span>
            <span className="brand-copy">
              <strong>Labububu's little secret</strong>
              sealed with love
            </span>
          </div>
          <button
            className={`music-button ${isMusicOpen ? 'is-on' : ''}`}
            type="button"
            onClick={openMusic}
            data-testid="button-open-music"
            aria-label="Open our special song on YouTube"
          >
            <Music2 size={14} />
            <span>{isMusicOpen ? 'Song is open' : 'Play our song'}</span>
            <ExternalLink size={12} />
          </button>
        </nav>

        <div className="hero-inner">
          <span className="eyebrow" data-testid="text-hero-eyebrow">A letter meant for one person</span>
          <h1 data-testid="text-hero-title">
            I have a little
            <span className="warm">secret for you</span>
          </h1>
          <p className="hero-lede" data-testid="text-hero-lede">
            Labububu, if you made it here, you already know the only password: your heart.
          </p>

          <div className="envelope-wrap">
            <div className="envelope-shadow" aria-hidden="true" />
            <button
              className={`envelope ${isEnvelopeOpen ? 'is-open' : ''}`}
              type="button"
              onClick={openEnvelope}
              aria-expanded={isEnvelopeOpen}
              aria-label={isEnvelopeOpen ? 'The letter is open' : 'Open the secret envelope'}
              data-testid="button-open-envelope"
            >
              <span className="envelope-back" aria-hidden="true" />
              <span className="envelope-letter" aria-hidden="true">
                <p>For Labububu,<br />my sweetest coincidence.</p>
                <small>From someone who loves you more than words can say</small>
              </span>
              <span className="envelope-front" aria-hidden="true" />
              <span className="envelope-flap" aria-hidden="true" />
              <span className="envelope-seal" aria-hidden="true">
                <Heart size={20} fill="currentColor" strokeWidth={1.5} />
              </span>
            </button>
            <p className="envelope-instruction" data-testid="text-envelope-instruction">
              {isEnvelopeOpen ? 'The secret is open… keep scrolling, there is more below.' : 'Tap the seal to open the box'}
            </p>
          </div>
        </div>

        <button
          className="scroll-cue"
          type="button"
          onClick={() => scrollToSection('timeline')}
          data-testid="button-scroll-story"
          aria-label="Scroll to our story"
        >
          <span>Our story starts here</span>
          <ArrowDown size={16} />
        </button>
      </section>

      <section className="story-section" id="timeline" data-testid="section-timeline">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Chapter 01 / The beginning</span>
            <h2 data-testid="text-timeline-title">Three little moments,<br />one whole heart.</h2>
          </div>
          <p data-testid="text-timeline-intro">Not every date stays on a calendar. Some get a permanent place in the good part of your memory.</p>
        </div>

        <div className="timeline" role="tablist" aria-label="Milestones in our story">
          {timelineItems.map((item, index) => (
            <article className="timeline-item" key={item.date}>
              <button
                className="timeline-dot"
                type="button"
                onClick={() => setActiveStep(index)}
                role="tab"
                aria-selected={activeStep === index}
                aria-label={`Milestone ${index + 1}: ${item.title}`}
                data-testid={`button-timeline-${index + 1}`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
              <div className="timeline-card" data-testid={`card-timeline-${index + 1}`}>
                <span className="date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{activeStep === index ? item.copy : `${item.title} — tap the dot to read it.`}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section memory-section" id="memories" data-testid="section-memories">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Chapter 02 / Our album</span>
            <h2 data-testid="text-memories-title">Little spaces waiting<br />for our photos.</h2>
          </div>
          <p data-testid="text-memories-intro">These are not stock photos. They are tiny spaces waiting for the real ones, so this little box can become our album.</p>
        </div>

        <div className="memory-grid">
          {memoryCards.map((memory, index) => {
            const MemoryIcon = memory.icon;
            return (
              <article className="memory-card" key={memory.title} data-testid={`card-memory-${index + 1}`}>
                <div className="memory-frame">
                  <span className="memory-icon" aria-hidden="true">
                    <MemoryIcon size={18} strokeWidth={1.7} />
                  </span>
                  <strong>{memory.title}</strong>
                  <span>{memory.label}<br />Replace this space with one of us</span>
                </div>
              </article>
            );
          })}
        </div>
        <p className="memory-caption" data-testid="text-memory-caption">
          Six photos for now, and a lifetime of memories after them. Let the camera keep writing the story.
        </p>
      </section>

      <section className="story-section note-section" id="letter" data-testid="section-letter">
        <div className="note-copy">
          <span className="section-kicker">Chapter 03 / The letter</span>
          <h2 data-testid="text-note-title">Two years with you…<br /><span className="warm">and still not enough words.</span></h2>
          <p className="letter-intro" data-testid="text-note-copy">
            Some feelings are too big for one birthday card. So I made you a whole little world instead.
          </p>
          <button className="sticker-button" type="button" onClick={wiggleSticker} data-testid="button-wiggle-sticker">
            <span className={`sticker ${isStickerWiggling ? 'is-wiggling' : ''}`}>
              <Sparkles size={16} aria-hidden="true" />
              <span>Tap<br />me</span>
            </span>
            <span className="sticker-note" data-testid="text-sticker-note">
              {isStickerWiggling ? 'I knew you would tap it.' : 'A mischievous sticker. Do not trust it.'}
            </span>
          </button>
        </div>

        <div className="main-letter" data-testid="card-love-quote">
          <div className="letter-topline">
            <span>05.04.2025 → 22.08.2026</span>
            <Heart size={16} fill="currentColor" aria-hidden="true" />
          </div>
          <div className="letter-body">
            <p>Two years with you…</p>
            <p>and somehow, I still don’t have enough words to explain how lucky I feel to have you in my life.</p>
            <p>You are one of the most beautiful things that ever happened to me.</p>
            <p>I hope you achieve every dream you have, and I hope life gives you all the happiness you deserve.</p>
            <p>I hope you always keep that beautiful smile, because you don’t even know how much it means to me and how much brighter my days become when I see it.</p>
            <p className="letter-emphasis">I’ll love you now, tomorrow, and forever.</p>
            <p>And every single day, I’ll be more and more proud of you, proud of the person you are and the person you’re becoming.</p>
            <p>Thank you for every moment, every laugh, every memory, and for simply being you.</p>
            <p>Two years ago, we started writing our story…<br />and I still want every next page to be with you. <span aria-label="heart">❤️</span></p>
            <p className="letter-emphasis">And NEVER forget!!! 😭</p>
            <p className="letter-labububu">No matter how much you grow up,<br />you’ll always be my little LABUUBUBBUB. 🥹❤️</p>
            <p className="letter-signoff">I love you sooo much my butterfly</p>
          </div>
          <cite>— with all my love, always</cite>
        </div>
      </section>

      <section className="story-section reveal-section" id="birthday" data-testid="section-birthday">
        <canvas className="celebration-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="reveal-inner">
          <span className="section-kicker">The last chapter / A brand-new year</span>
          <span className="birthday-date" data-testid="text-birthday-date">22 August 2026</span>
          <h2 data-testid="text-birthday-title">Happy birthday<br />to my favorite coincidence.</h2>
          <p data-testid="text-birthday-copy">
            Open the final gift, Labububu. Not because it is big, but because it feels like you: warm, sweet,
            and able to make everything around it smile.
          </p>

          <div className="present" aria-hidden="true">
            <span className="present-ribbon" />
            <span className="present-lid" />
            <span className="present-box" />
          </div>

          {!isCelebrating ? (
            <button className="celebrate-button" type="button" onClick={() => setIsCelebrating(true)} data-testid="button-celebrate">
              <Gift size={17} />
              Untie the ribbon
            </button>
          ) : (
            <div className="celebration-message" data-testid="status-celebration">
              <strong>Happy birthday, my favorite person.</strong>
              <span>This year and every year, I choose you all over again.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="footer" data-testid="section-footer">
        <strong>Labububu's little secret</strong>
        <span>Made with love, with room for every photo we have not taken yet.</span>
      </footer>
    </main>
  );
}

function App() {
  return <BirthdayPage />;
}

export default App;