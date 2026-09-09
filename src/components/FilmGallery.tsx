import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Pause, X } from "lucide-react";
import type { Film } from "../data";
import { Media } from "./Media";
function FilmPreview({
  film,
  onClose,
}: {
  film: Film | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (film) {
      setPlaying(true);
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else dialog.current?.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [film]);
  return (
    <dialog
      className="film-dialog"
      ref={dialog}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="preview-title"
    >
      <div className="dialog-inner">
        {film && (
          <>
            <div className="dialog-heading">
              <span className="mono">{film.id} / FILM STUDY</span>
              <button
                className="icon-button"
                onClick={onClose}
                aria-label="Close preview"
                autoFocus
              >
                <X />
              </button>
            </div>
            <div className={`dialog-media ${playing ? "playing" : ""}`}>
              <Media image={film.image} label={film.title} />
              <button
                className="preview-play"
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? "Pause film study" : "Play film study"}
              >
                {playing ? <Pause /> : <Play />}
              </button>
              <span className="mono preview-disclaimer">
                ANIMATED FRAME STUDY · {film.duration} SEC
              </span>
            </div>
            <div className="dialog-description">
              <h2 id="preview-title">{film.title}</h2>
              <span className="mono">
                {film.ratio} / SEED {film.seed}
              </span>
              <p>{film.prompt}</p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
export function FilmGallery({ films }: { films: Film[] }) {
  const [filter, setFilter] = useState("All experiments"),
    [selected, setSelected] = useState<Film | null>(null);
  const visible = films.filter(
    (f) => filter === "All experiments" || f.category === filter,
  );
  return (
    <section id="library" className="gallery-section">
      <div className="section-topline mono">
        <span>02 / THE COLLECTIVE IMAGINATION</span>
        <span>IMPOSSIBLE, UNTIL IT ISN’T. ↙</span>
      </div>
      <div className="gallery-heading">
        <h2>
          A FEW THINGS
          <br />
          THAT <span>DIDN’T EXIST.</span>
        </h2>
        <div className="gallery-intro">
          <span className="mini-orbit" aria-hidden="true">
            ✳
          </span>
          <p>
            Strange places. New perspectives.
            <br />
            Small glimpses of what comes next.
          </p>
        </div>
      </div>
      <div className="gallery-toolbar">
        <div className="gallery-filters" aria-label="Filter experiments">
          {["All experiments", "Dreamscapes", "Abstract"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "All experiments" && (
                <span>{String(films.length).padStart(2, "0")}</span>
              )}
            </button>
          ))}
        </div>
        <span className="mono gallery-view">
          CONTACT SHEET <span>▦</span>
        </span>
      </div>
      <div
        className={`film-grid ${filter !== "All experiments" ? "is-filtered" : ""}`}
      >
        {visible.map((f, i) => (
          <article key={f.id} className={`film-entry entry-${f.image}`}>
            <div className="film-entry-header mono">
              <span>
                {f.id}{" "}
                <span className="entry-class">
                  /{" "}
                  {f.category === "Abstract"
                    ? "MATERIAL STUDY"
                    : "OTHER WORLDS"}
                </span>
              </span>
              <span>
                {f.ratio} <ArrowUpRight size={13} />
              </span>
            </div>
            <button
              className="film-thumb"
              aria-label={`Preview ${f.title}`}
              onClick={() => setSelected(f)}
            >
              <Media image={f.image} />
              <span className="film-duration mono">00:0{f.duration}</span>
              <span className="film-open">
                <Play size={14} fill="currentColor" />
              </span>
              <span className="hover-caption mono">
                ENTER THE FRAME <ArrowUpRight size={15} />
              </span>
              <span className="film-hover-timeline" />
            </button>
            <div className="film-entry-caption">
              <h3>{f.title}</h3>
              <span className="mono">SEED {f.seed}</span>
            </div>
            {i === 1 && filter === "All experiments" && (
              <div className="gallery-margin-note mono">
                <span>↳</span> NO CAMERA.
                <br />
                NO LOCATION.
                <br />
                JUST A WHAT IF.
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="archive-end mono">
        <span>
          <span className="status-dot" /> AN ONGOING EXPERIMENT
        </span>
        <a href="#create">
          YOUR IDEA COULD BE NEXT <ArrowUpRight size={14} />
        </a>
      </div>
      <FilmPreview film={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
