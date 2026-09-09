import {
  ArrowUpRight,
  SlidersHorizontal,
  Shuffle,
  Plus,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { defaultPrompt } from "../data";
export type Settings = {
  model: string;
  duration: string;
  ratio: string;
  motion: string;
  seed: string;
};
const ideas = [
  defaultPrompt,
  "A glass city dissolving into clouds. Pale morning light, impossible reflections, a slow orbit through the skyline.",
  "Liquid chrome flowers blooming in the dark. Macro photography, soft violet reflections, delicate organic motion.",
  "A lone traveler crossing an endless red desert. Wind lifting the sand, an unfamiliar sun, wide anamorphic framing.",
];
function RenderControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="render-control">
      <span>{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </label>
  );
}
export function PromptComposer({
  busy,
  onGenerate,
  onCancel,
}: {
  busy: boolean;
  onGenerate: (prompt: string, settings: Settings) => void;
  onCancel: () => void;
}) {
  const [prompt, setPrompt] = useState(defaultPrompt),
    [error, setError] = useState(""),
    [advanced, setAdvanced] = useState(false),
    [reference, setReference] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    model: "Afterimage 03",
    duration: "6 sec",
    ratio: "16:9",
    motion: "Cinematic",
    seed: "481291",
  });
  const input = useRef<HTMLTextAreaElement>(null),
    file = useRef<HTMLInputElement>(null);
  const update = (key: keyof Settings, value: string) =>
    setSettings((s) => ({ ...s, [key]: value }));
  return (
    <form
      className={`composer ${busy ? "composer-busy" : ""}`}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (busy) return;
        if (!prompt.trim()) {
          setError("Give your imagination a starting point.");
          input.current?.focus();
          return;
        }
        setError("");
        onGenerate(prompt, settings);
      }}
    >
      <div className="composer-topline">
        <label htmlFor="scene-prompt">
          <span className="cross">＋</span> YOUR IMAGINATION STARTS HERE
        </label>
        <button
          type="button"
          className="text-button inspire"
          disabled={busy}
          onClick={() => {
            setPrompt(ideas[(ideas.indexOf(prompt) + 1) % ideas.length]);
            setError("");
          }}
        >
          <Shuffle size={13} /> Surprise me
        </button>
      </div>
      <div className="prompt-row">
        <textarea
          className="resize-none"
          ref={input}
          id="scene-prompt"
          aria-label="Describe your scene"
          aria-invalid={!!error}
          aria-describedby="prompt-help"
          value={prompt}
          maxLength={1200}
          disabled={busy}
          style={{ resize: "none" }}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (error) setError("");
          }}
        />
        <span className="prompt-cursor" aria-hidden="true">
          ↵
        </span>
      </div>
      <div
        id="prompt-help"
        className={`prompt-help ${error ? "error" : ""}`}
        aria-live="polite"
      >
        {error || "Describe the impossible. We’ll find the frames."}
      </div>
      <div className="composer-bottom">
        <div className="render-settings">
          <RenderControl
            label="MODEL"
            value={settings.model}
            options={["Afterimage 03", "Afterimage 02"]}
            onChange={(v) => update("model", v)}
          />
          <RenderControl
            label="RATIO"
            value={settings.ratio}
            options={["16:9", "9:16", "1:1"]}
            onChange={(v) => update("ratio", v)}
          />
          <RenderControl
            label="DURATION"
            value={settings.duration}
            options={["4 sec", "6 sec", "8 sec"]}
            onChange={(v) => update("duration", v)}
          />
          <button
            type="button"
            className={`settings-button ${advanced ? "selected" : ""}`}
            aria-label="Advanced render settings"
            aria-expanded={advanced}
            onClick={() => setAdvanced(!advanced)}
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
        <button
          type={busy ? "button" : "submit"}
          className="generate-button"
          aria-label={busy ? "Cancel render" : "Generate film"}
          onClick={
            busy
              ? (e) => {
                  e.preventDefault();
                  onCancel();
                }
              : undefined
          }
        >
          <span>
            {busy ? "Cancel render" : "Generate"}
            <small>{busy ? "RETURN TO IDEA" : "LET IT EXIST"}</small>
          </span>
          {busy ? <X size={25} /> : <ArrowUpRight size={28} />}
        </button>
      </div>
      {advanced && (
        <div className="advanced-settings">
          <RenderControl
            label="MOTION"
            value={settings.motion}
            options={["Cinematic", "Dynamic", "Still"]}
            onChange={(v) => update("motion", v)}
          />
          <label className="seed-field">
            SEED
            <input
              aria-label="Seed"
              value={settings.seed}
              maxLength={9}
              onChange={(e) =>
                update("seed", e.target.value.replace(/\D/g, ""))
              }
            />
          </label>
          <button
            type="button"
            className="text-button"
            onClick={() =>
              update(
                "seed",
                String(Math.floor(100000 + Math.random() * 899999)),
              )
            }
          >
            <Shuffle size={14} /> Random seed
          </button>
        </div>
      )}
      <div className="composer-foot">
        <input
          ref={file}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              if (!f.type.startsWith("image/")) {
                setError("Choose a PNG, JPEG, or WebP image.");
                return;
              }
              setReference(f.name);
            }
          }}
        />
        <button
          type="button"
          className="text-button"
          disabled={busy}
          onClick={() => file.current?.click()}
        >
          <Plus size={13} />
          {reference ? `Reference: ${reference}` : "Add a reference"}
        </button>
        <span>
          EXPERIMENTAL PREVIEW <span className="foot-separator">/</span> NO
          CREDITS NEEDED
        </span>
      </div>
    </form>
  );
}
