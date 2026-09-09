export function Media({
  image,
  className = "",
  label,
}: {
  image: string;
  className?: string;
  label?: string;
}) {
  const regions: Record<string, string> = {
    portal: "0 0 768 512",
    chrome: "768 0 768 512",
    dunes: "0 512 768 512",
    glass: "768 512 768 512",
  };
  return (
    <div
      className={`film-media media-${image} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {image === "membrane" ? (
        <img src="/assets/membrane.webp" alt="" draggable={false} />
      ) : (
        <svg
          viewBox={regions[image]}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <image href="/assets/contact-sheet.webp" width="1536" height="1024" />
        </svg>
      )}
    </div>
  );
}
export function BrandMark() {
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true">
      <path
        d="M1 28 12 5h5L7 28Zm11 0L23 5h5L18 28Zm11 0 6-13 5 13Z"
        fill="currentColor"
      />
    </svg>
  );
}
