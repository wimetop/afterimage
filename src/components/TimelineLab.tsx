import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Pause,
  Play,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Media } from "./Media";
export function TimelineLab() {
  const [playing, setPlaying] = useState(false),
    [position, setPosition] = useState(18),
    [muted, setMuted] = useState(false);
  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now(),
        delta = (now - previous) / 80;
      previous = now;
      setPosition((p) => (p + delta) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, [playing]);
  const secs = Math.floor(position * 0.08),
    frame = Math.floor((position * 0.08 - secs) * 24);
  return (
    <section id="lab" className="lab-section">
      <div className="lab-copy">
        <span className="mono section-index">03 / INSIDE THE ENGINE</span>
        <h2>
          A LITTLE
          <br />
          METHOD.
          <br />
          <span>
            A LOT OF
            <br /> MADNESS.
          </span>
        </h2>
        <p>
          Every frame is a possibility.
          <br />
          Shape the motion. Follow the feeling.
          <br />
          Find something you didn’t know
          <br />
          you were looking for.
        </p>
        <a href="#create" className="lab-link">
          Make your first experiment <ArrowUpRight size={18} />
        </a>
        <span className="lab-side-note mono">PRECISION MEETS INTUITION.</span>
      </div>
      <div className="timeline-editor">
        <div className="editor-title mono">
          <span>
            <i className="status-dot" /> UNTITLED_PROJECT_04
          </span>
          <span>8 SEC / 24 FPS</span>
        </div>
        <div className={`editor-preview ${playing ? "playing" : ""}`}>
          <Media
            image="membrane"
            label="Timeline preview of an orange silk sculpture above a volcanic desert"
          />
          <span className="editor-preview-label mono">WORLD STUDY / 003</span>
          <span className="editor-frame mono">
            FRAME {String(Math.floor(position * 1.92)).padStart(3, "0")}
          </span>
          <div className="editor-crosshair" />
        </div>
        <div className="editor-transport">
          <div>
            <button
              className="icon-button"
              aria-label="Restart timeline"
              onClick={() => setPosition(0)}
            >
              <SkipBack size={15} />
            </button>
            <button
              className="icon-button"
              aria-label={playing ? "Pause timeline" : "Play timeline"}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <span className="mono timecode">
              00:0{secs}:{String(frame).padStart(2, "0")}
            </span>
          </div>
          <button
            className="icon-button"
            onClick={() => setMuted(!muted)}
            aria-label={
              muted
                ? "Enable sound track visualization"
                : "Mute sound track visualization"
            }
            aria-pressed={muted}
          >
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
        <div className="timeline-tracks">
          <div className="timeline-ruler mono">
            <span>00:00:00</span>
            <span>00:02:00</span>
            <span>00:04:00</span>
            <span>00:06:00</span>
          </div>
          <div className="track-row">
            <span className="track-label">PROMPT</span>
            <div className="prompt-clip">
              A world that breathes. Translucent silk unfolding… <span>↗</span>
            </div>
          </div>
          <div className="track-row">
            <span className="track-label">FRAMES</span>
            <div className="frames-track">
              {Array.from({ length: 7 }, (_, i) => (
                <Media key={i} image="membrane" />
              ))}
            </div>
          </div>
          <div className="track-row">
            <span className="track-label">MOTION</span>
            <div className="motion-track">
              <svg
                viewBox="0 0 600 30"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 23 C60 23 75 4 130 14 S210 32 260 13 S370 7 400 16 S510 25 600 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="130" cy="14" r="3" fill="currentColor" />
                <circle cx="400" cy="16" r="3" fill="currentColor" />
              </svg>
              <span>CINEMATIC / BEZIER</span>
            </div>
          </div>
          <div className={`track-row ${muted ? "track-muted" : ""}`}>
            <span className="track-label">SOUND</span>
            <div className="waveform-track" aria-hidden="true">
              {Array.from({ length: 100 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: `${4 + Math.abs(Math.sin(i * 0.67) * Math.cos(i * 0.17)) * 22}px`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="playhead-area" aria-hidden="true">
            <div className="playhead" style={{ left: `${position}%` }}>
              <i />
            </div>
          </div>
          <input
            className="timeline-seek"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Timeline position"
          />
        </div>
        <div className="editor-footer mono">
          <span>
            <i /> ALL FRAMES IN SYNC
          </span>
          <span>FRAME STUDY / LOCAL PREVIEW</span>
        </div>
      </div>
    </section>
  );
}
