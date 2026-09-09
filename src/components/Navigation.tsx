import { ArrowUpRight, AudioLines } from "lucide-react";
import { BrandMark } from "./Media";
export function Navigation({
  ambient,
  onAmbient,
}: {
  ambient: boolean;
  onAmbient: () => void;
}) {
  return (
    <header className="navigation">
      <a href="#create" className="wordmark" aria-label="Afterimage home">
        <BrandMark />
        <span>
          afterimage<span className="brand-dot">®</span>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#create" className="nav-create">
          <span className="status-dot" />
          Create
        </a>
        <a href="#library">
          Library <span className="nav-count">04</span>
        </a>
        <a href="#lab">
          The lab <ArrowUpRight size={13} />
        </a>
      </nav>
      <div className="nav-end">
        <span className="engine-status">
          <i />
          ENGINE ONLINE
        </span>
        <button
          className="ambient-button"
          onClick={onAmbient}
          aria-pressed={ambient}
          aria-label={
            ambient ? "Pause ambient motion" : "Enable ambient motion"
          }
          title="Toggle ambient motion"
        >
          <AudioLines size={19} />
        </button>
        <a className="profile" href="#lab" aria-label="Open your project">
          JD
        </a>
      </div>
    </header>
  );
}
