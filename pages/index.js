import Head from 'next/head';
import { useState, useRef } from 'react';

const RESULTS = [
  {
    label: '非茄子…',
    prob: 0.05,
    buy: false,
    color: '#4a5568',
    glow: '#718096',
    emoji: '😞',
    message: '今日じゃない…が明日は…',
  },
  {
    label: 'ボキ崎がマウントをとってきた！\n避難のため非茄子…',
    prob: 0.05,
    buy: false,
    color: '#7b0000',
    glow: '#ff1a1a',
    emoji: '😈',
    message: 'ボ○キアラート発令！総員待避せよ！！',
    evil: true,
  },
  {
    label: '祝福茄子！！！',
    prob: 0.10,
    buy: true,
    color: '#b7791f',
    glow: '#f6e05e',
    emoji: '🍆✨',
    message: '一竿二アンプ三茄子',
    special: true,
  },
  {
    label: '茄子！！',
    prob: 0.16,
    buy: true,
    color: '#c05621',
    glow: '#ed8936',
    emoji: '🍆',
    message: 'may the nace be with you.',
  },
  {
    label: 'カウシカ',
    prob: 0.16,
    buy: true,
    color: '#276749',
    glow: '#48bb78',
    emoji: '🐄',
    message: '買って。/カウシカ',
  },
  {
    label: '回収してから考える',
    prob: 0.16,
    buy: true,
    color: '#2c5282',
    glow: '#63b3ed',
    emoji: '💸',
    message: '考えるだけ時間の無駄',
  },
  {
    label: '汝、破産のハサンなり',
    prob: 0.16,
    buy: true,
    color: '#6b46c1',
    glow: '#b794f4',
    emoji: '💀',
    message: '最速購入（ザバーニーヤ）',
  },
  {
    label: 'なすですな',
    prob: 0.16,
    buy: true,
    color: '#553c9a',
    glow: '#d6bcfa',
    emoji: '🧓',
    message: 'なすですな',
  },
];

function pick() {
  const r = Math.random();
  let acc = 0;
  for (const item of RESULTS) {
    acc += item.prob;
    if (r < acc) return item;
  }
  return RESULTS[RESULTS.length - 1];
}

function Particle({ x, y, color, angle, speed }) {
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: color,
    animation: 'particle 1.2s ease-out forwards',
    '--dx': `${Math.cos(angle) * speed}px`,
    '--dy': `${Math.sin(angle) * speed}px`,
    pointerEvents: 'none',
  };
  return <div style={style} />;
}

export default function Home() {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [particles, setParticles] = useState([]);
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [evil, setEvil] = useState(false);
  const btnRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setParticles([]);
    setShake(false);
    setEvil(false);

    setTimeout(() => {
      const r = pick();
      setResult(r);
      setSpinning(false);
      setHistory((h) => [r, ...h].slice(0, 5));

      if (r.special) {
        const colors = ['#f6e05e', '#ed8936', '#f6ad55', '#fff', '#b7791f'];
        const ps = Array.from({ length: 40 }, (_, i) => ({
          id: i,
          x: '50%',
          y: '50%',
          color: colors[i % colors.length],
          angle: (i / 40) * Math.PI * 2,
          speed: 60 + Math.random() * 80,
        }));
        setParticles(ps);
        setTimeout(() => setParticles([]), 1400);
      } else if (r.evil) {
        setEvil(true);
        const ps = Array.from({ length: 24 }, (_, i) => ({
          id: i,
          x: '50%',
          y: '50%',
          color: ['#ff1a1a', '#7b0000', '#ff4444', '#330000'][i % 4],
          angle: (i / 24) * Math.PI * 2,
          speed: 40 + Math.random() * 60,
        }));
        setParticles(ps);
        setTimeout(() => setParticles([]), 1400);
        setShake(true);
        setTimeout(() => setShake(false), 800);
      } else if (!r.buy) {
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 1000);
  };

  const reset = () => {
    setResult(null);
    setParticles([]);
    setShake(false);
    setEvil(false);
  };

  return (
    <>
      <Head>
        <title>茄子を占う</title>
        <meta name="description" content="買うか買わないか、茄子が決める" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* OGP */}
        <meta property="og:title" content="茄子を占う" />
        <meta property="og:description" content="買うか買わないか、茄子が決める" />
        <meta property="og:type" content="website" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700;900&display=swap');

        .app {
          min-height: 100vh;
          background: radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a14 60%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
          font-family: 'Noto Sans JP', sans-serif;
        }

        .title {
          font-size: clamp(13px, 3.5vw, 18px);
          color: #9f7aea;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0.8;
        }

        .subtitle {
          font-size: clamp(28px, 8vw, 52px);
          font-weight: 900;
          color: #e9d8fd;
          letter-spacing: 0.05em;
          margin-bottom: 40px;
          text-shadow: 0 0 30px #6b46c133;
        }

        .stage {
          width: min(420px, 92vw);
          min-height: 200px;
          border: 1px solid #2d2060;
          border-radius: 20px;
          background: #100d22;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          position: relative;
          margin-bottom: 28px;
          overflow: hidden;
          transition: box-shadow 0.4s;
        }

        .stage.buy {
          box-shadow: 0 0 40px var(--glow-color, #ed893633);
          border-color: var(--glow-color, #ed8936);
        }

        .stage.nobuy {
          box-shadow: 0 0 20px #4a556855;
          border-color: #4a5568;
        }

        .stage.special {
          animation: specialPulse 0.8s ease-out 3;
        }

        @keyframes specialPulse {
          0%, 100% { box-shadow: 0 0 40px #f6e05e66; }
          50% { box-shadow: 0 0 80px #f6e05e, 0 0 120px #ed893666; }
        }

        .idle-text {
          font-size: 48px;
          opacity: 0.15;
          user-select: none;
        }

        .spinning-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid #2d2060;
          border-top-color: #9f7aea;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinning-label {
          font-size: 14px;
          color: #9f7aea;
          letter-spacing: 0.2em;
        }

        .result-emoji {
          font-size: 52px;
          margin-bottom: 12px;
          animation: popIn 0.4s cubic-bezier(.17,.67,.38,1.35) both;
        }

        .result-label {
          font-size: clamp(18px, 5vw, 28px);
          font-weight: 900;
          text-align: center;
          white-space: pre-line;
          line-height: 1.4;
          color: #fff;
          animation: popIn 0.4s 0.1s cubic-bezier(.17,.67,.38,1.35) both;
          text-shadow: 0 0 20px var(--glow-color, #fff4);
        }

        .result-msg {
          margin-top: 10px;
          font-size: 13px;
          letter-spacing: 0.15em;
          opacity: 0.6;
          color: #e9d8fd;
          animation: fadeUp 0.4s 0.25s ease both;
        }

        .result-badge {
          margin-top: 14px;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          animation: fadeUp 0.4s 0.3s ease both;
        }

        .badge-buy {
          background: #276749;
          color: #9ae6b4;
        }

        .badge-nobuy {
          background: #2d3748;
          color: #a0aec0;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .shake {
          animation: shakeIt 0.5s ease;
        }

        @keyframes shakeIt {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }

        .btn {
          width: min(420px, 92vw);
          padding: 18px;
          font-size: clamp(18px, 5vw, 24px);
          font-weight: 900;
          font-family: inherit;
          letter-spacing: 0.2em;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          background: linear-gradient(135deg, #6b46c1, #553c9a);
          color: #e9d8fd;
          box-shadow: 0 4px 24px #6b46c155;
          transition: all 0.15s;
          position: relative;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px #9f7aea88;
          background: linear-gradient(135deg, #7c3aed, #6b46c1);
        }

        .btn:not(:disabled):active {
          transform: translateY(1px);
          box-shadow: 0 2px 8px #6b46c155;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .history-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          color: #553c9a;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .history-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .history-chip {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 999px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .stage.evil {
          animation: evilPulse 0.6s ease-out 4;
          border-color: #ff1a1a !important;
          background: #1a0000;
        }

        @keyframes evilPulse {
          0%, 100% { box-shadow: 0 0 20px #ff1a1a44; }
          50% { box-shadow: 0 0 60px #ff1a1a, 0 0 100px #7b000088; }
        }

        .evil-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            #ff1a1a08 8px,
            #ff1a1a08 9px
          );
          pointer-events: none;
          border-radius: 20px;
          animation: scanline 3s linear infinite;
        }

        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        .result-label.evil-text {
          color: #ff4444;
          text-shadow: 0 0 10px #ff0000, 0 0 30px #7b0000;
          animation: evilFlicker 0.15s steps(1) infinite, popIn 0.4s 0.1s cubic-bezier(.17,.67,.38,1.35) both;
        }

        @keyframes evilFlicker {
          0%, 90% { opacity: 1; }
          95% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        .badge-evil {
          background: #7b0000;
          color: #ff8080;
          border: 1px solid #ff1a1a44;
        }

        .btn-retry {
          width: min(420px, 92vw);
          padding: 12px;
          font-size: clamp(14px, 4vw, 18px);
          font-weight: 700;
          font-family: inherit;
          letter-spacing: 0.15em;
          border: 1px solid #553c9a;
          border-radius: 14px;
          cursor: pointer;
          background: transparent;
          color: #9f7aea;
          transition: all 0.15s;
          margin-bottom: 16px;
        }

        .btn-retry:hover {
          background: #1a1040;
          border-color: #9f7aea;
          color: #e9d8fd;
        }

        .btn-retry:active {
          transform: translateY(1px);
        }

        @keyframes particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
      `}</style>

      <div className="app">
        <div className="title">破産機材部</div>
        <div className="subtitle">茄子を占う</div>

        <div
          className={`stage ${result ? (result.buy ? 'buy' : 'nobuy') : ''} ${result?.special ? 'special' : ''} ${result?.evil ? 'evil' : ''} ${shake ? 'shake' : ''}`}
          style={{ '--glow-color': result?.glow || '#6b46c1' }}
        >
          {evil && <div className="evil-overlay" />}

          {particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}

          {!result && !spinning && (
            <div className="idle-text">🍆</div>
          )}

          {spinning && (
            <div className="spinning-wrap">
              <div className="spinner" />
              <div className="spinning-label">占い中…</div>
            </div>
          )}

          {result && !spinning && (
            <>
              <div className="result-emoji">{result.emoji}</div>
              <div
                className={`result-label${result.evil ? ' evil-text' : ''}`}
                style={{ '--glow-color': result.glow }}
              >
                {result.label}
              </div>
              <div className="result-msg">{result.message}</div>
              <div className={`result-badge ${result.buy ? 'badge-buy' : result.evil ? 'badge-evil' : 'badge-nobuy'}`}>
                {result.buy ? '✅ 茄子（買え）' : result.evil ? '☠️ 大外れ（ボキ崎）' : '❌ 非茄子（やめとけ）'}
              </div>
            </>
          )}
        </div>

        <button
          ref={btnRef}
          className="btn"
          onClick={spin}
          disabled={spinning}
        >
          🍆 茄子を占う
        </button>

        {result && !spinning && (
          <button className="btn-retry" onClick={reset}>
            🔄 もう一度占う
          </button>
        )}

        {history.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div className="history-label">最近の結果</div>
            <div className="history-row">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="history-chip"
                  style={{
                    background: h.buy ? '#276749' : '#2d3748',
                    color: h.buy ? '#9ae6b4' : '#a0aec0',
                  }}
                >
                  {h.emoji} {h.label.split('\n')[0].slice(0, 8)}…
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
