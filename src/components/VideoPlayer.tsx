import { useState } from "react";

interface VideoPlayerProps {
  src: string;
  overlayClass?: string;
  videoClass?: string;
}

export default function VideoPlayer({
  src,
  overlayClass = "PostMedia_videoOverlay__B8ltN",
  videoClass = "Lightbox_media__1JER5",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={overlayClass} onClick={handlePlay}>
      {!isPlaying && (
        <button className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/50">
          <svg className="w-16 h-16 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
      <video
        className={videoClass}
        controls={isPlaying}
        autoPlay={isPlaying}
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
