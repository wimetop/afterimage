import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Maximize2, Pause, Play } from "lucide-react";
import { Media } from "./Media";
import { PromptComposer, type Settings } from "./PromptComposer";
import { stages, type Film } from "../data";
export function GenerationChamber({
  onComplete,
}: {
  onComplete: (film: Film) => void;
}) {
  const [progress, setProgress] = useState<number | null>(null),
    [done, setDone] = useState(false),
    [preview, setPreview] = useState(true),
    [notice, setNotice] = useState("");
  const pending = useRef<{ prompt: string; settings: Settings } | null>(null),
    count = useRef(4),
    stage = useRef<HTMLDivElement>(null);
  const busy = progress !== null;
  useEffect(() => {
    if (progress === null) return;
    const timer = window.setTimeout(() => {
      if (progress >= 100) {
        const p = pending.current!;
        count.current++;
        onComplete({
          id: `A0${count.current}`,
          title: "Untitled experiment",
          category: "Dreamscapes",
          image: "membrane",
          duration: parseInt(p.settings.duration),
          ratio: p.settings.ratio,
          seed: p.settings.seed,
          prompt: p.prompt,
        });
        setProgress(null);
        setDone(true);
        setNotice("Your imagination, rendered.");
      } else setProgress(Math.min(100, progress + 2));
    }, 140);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const distance = Math.max(
          0,
          Math.min(1, -el.getBoundingClientRect().top / 600),
        );
        el.style.setProperty(
          "--scene-scroll",
          reduced ? "0" : String(distance),
        );
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        e.pointerType === "touch"
      )
        return;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--pointer-x",
        `${(e.clientX - r.left - r.width / 2) / 55}deg`,
      );
      el.style.setProperty(
        "--pointer-y",
        `${-(e.clientY - r.top - r.height / 2) / 80}deg`,
      );
    };
    const reset = () => {
      el.style.setProperty("--pointer-x", "0deg");
      el.style.setProperty("--pointer-y", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);
  const step = busy ? Math.min(5, Math.floor(progress / 17)) : 0;
  return (
    <section id="create" className={`chamber ${busy ? "is-rendering" : ""}`}>
      <div className="chamber-eyebrow">
        <span>
          <span className="tiny-cross">✳</span> A NEW MEDIUM FOR YOUR MIND
        </span>
        <span>
          AI MOTION SYSTEM <i>—</i> VOL. 003
        </span>
      </div>
      <div className="generation-stage" ref={stage}>
        <div className="stage-copy">
          <h1>
            MAKE
            <br />
            THE <span className="outline-word">UNREAL</span>
            <br />
            <span className="real-word">
              REAL<span className="period">.</span>
            </span>
          </h1>
          <p>
            Some things only exist in your head.
            <br />
            Let’s change that.
          </p>
        </div>
        <div className={`frame-sculpture ${preview ? "is-playing" : ""}`}>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="sculpture-coordinate">
            X 048.28
            <br />Y 012.04
          </span>
          <div className="frame-plane plane-back">
            <Media image="chrome" />
            <span>LATENT FIELD / 001</span>
          </div>
          <div className="frame-plane plane-middle">
            <Media image="portal" />
            <span>WORLD STUDY / 002</span>
          </div>
          <div className="frame-plane plane-main">
            <div className="frame-top">
              <span>
                <span className="record-dot" />{" "}
                {busy
                  ? "SYNTHESIZING"
                  : done
                    ? "RENDER COMPLETE"
                    : "LIVE IMAGINATION"}
              </span>
              <Maximize2 size={12} />
            </div>
            <Media
              image="membrane"
              label="An enormous luminous silk form hovering over a volcanic landscape"
            />
            <div className="frame-scan" />
            <div className="frame-bottom">
              <span>AFTERIMAGE_003</span>
              <span>
                00:00:
                {busy
                  ? String(Math.floor(progress * 1.44)).padStart(3, "0")
                  : "024"}
              </span>
            </div>
            <div className="image-target target-tl" />
            <div className="image-target target-br" />
          </div>
          <span className="sculpture-caption">
            FIG. 01 <span>THOUGHT → MATTER</span>
          </span>
          <button
            className="stage-play"
            onClick={() => setPreview(!preview)}
            aria-label={
              preview ? "Pause preview motion" : "Play preview motion"
            }
          >
            {preview ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <div className="film-strip" aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => (
              <Media key={i} image="membrane" />
            ))}
          </div>
        </div>
        <div className="side-annotation">
          UNLIMITED POSSIBILITIES / ONE STARTING POINT
        </div>
      </div>
      <div className="chamber-console">
        <div className="console-note">
          <span className="mono section-index">
            01 / THE GENERATION CHAMBER
          </span>
          <h2>
            From a passing thought
            <br />
            to a moving image.
          </h2>
          <div className="signal-diagram" aria-hidden="true">
            {Array.from({ length: 38 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${6 + Math.sin(i * 0.7) ** 2 * 30}px`,
                  animationDelay: `${i * 0.07}s`,
                }}
              />
            ))}
          </div>
          <span className="mono console-small">
            LANGUAGE IN. <span>WORLDS OUT.</span>
          </span>
        </div>
        <PromptComposer
          busy={busy}
          onCancel={() => {
            setProgress(null);
            setNotice("Render cancelled. Your idea is still here.");
          }}
          onGenerate={(prompt, settings) => {
            pending.current = { prompt, settings };
            setDone(false);
            setNotice("");
            setProgress(0);
          }}
        />
      </div>
      {busy && (
        <div className="render-sequence">
          <div className="render-heading">
            <span className="mono">
              {String(step + 1).padStart(2, "0")} / {stages[step].toUpperCase()}
            </span>
            <span className="render-percent">
              {progress}
              <small>%</small>
            </span>
          </div>
          <div
            className="render-progress"
            role="progressbar"
            aria-label="Simulated render progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="render-steps">
            {stages.map((s, i) => (
              <span key={s} className={i <= step ? "active" : ""}>
                {String(i + 1).padStart(2, "0")} {s}
              </span>
            ))}
          </div>
          <p className="mono">
            FRAME {String(Math.round(progress * 1.44)).padStart(3, "0")} / 144{" "}
            <span>PREVIEW SIMULATION</span>
          </p>
        </div>
      )}
      <div className="completion-message" role="status">
        {notice}
        {done && (
          <a href="#library">
            View your frame <ArrowUpRight size={14} />
          </a>
        )}
      </div>
      <div className="chamber-bottom mono">
        <span>
          <i className="status-dot" /> BUILT FOR THE BEAUTIFULLY UNEXPECTED
        </span>
        <a href="#library">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
        <span>24 FPS / INFINITE DIRECTIONS</span>
      </div>
    </section>
  );
}
