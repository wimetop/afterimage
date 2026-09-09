import { useCallback, useState } from "react";
import { Navigation } from "./components/Navigation";
import { GenerationChamber } from "./components/GenerationChamber";
import { FilmGallery } from "./components/FilmGallery";
import { TimelineLab } from "./components/TimelineLab";
import { FinalPortal } from "./components/FinalPortal";
import { films as initialFilms, type Film } from "./data";
export default function App() {
  const [films, setFilms] = useState(initialFilms),
    [ambient, setAmbient] = useState(true);
  const addFilm = useCallback(
    (film: Film) => setFilms((current) => [film, ...current]),
    [],
  );
  return (
    <div className={`app ${ambient ? "" : "motion-paused"}`}>
      <a className="skip-link" href="#create">
        Skip to creation studio
      </a>
      <Navigation ambient={ambient} onAmbient={() => setAmbient((v) => !v)} />
      <main>
        <GenerationChamber onComplete={addFilm} />
        <FilmGallery films={films} />
        <TimelineLab />
        <FinalPortal />
      </main>
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
