import { Music2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/audio/aaha-kalyanam.mp3";

/**
 * Starts the invitation music as soon as the browser allows it. Browsers may
 * reject audible autoplay, so the same control also starts playback on the
 * visitor's first tap or key press.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const tryToPlay = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Audible autoplay is commonly blocked until the visitor interacts.
        setIsPlaying(false);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.42;
    tryToPlay();

    const resumeAfterInteraction = (event: PointerEvent | KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest(".background-music__button")) {
        return;
      }

      tryToPlay();
    };
    window.addEventListener("pointerdown", resumeAfterInteraction, { passive: true });
    window.addEventListener("keydown", resumeAfterInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", resumeAfterInteraction);
      window.removeEventListener("keydown", resumeAfterInteraction);
    };
  }, [tryToPlay]);

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      tryToPlay();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="background-music">
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src={MUSIC_SRC}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <button
        type="button"
        className="background-music__button"
        title="Aaha Kalyanam — play or pause"
        aria-label={isPlaying ? "Pause Aaha Kalyanam" : "Play Aaha Kalyanam"}
        aria-pressed={isPlaying}
        onClick={togglePlayback}
      >
        <span className="background-music__icon" aria-hidden="true">
          {hasError ? (
            <Music2 size={17} />
          ) : isPlaying ? (
            <Volume2 size={17} />
          ) : (
            <VolumeX size={17} />
          )}
        </span>
      </button>
    </div>
  );
}

export default BackgroundMusic;
