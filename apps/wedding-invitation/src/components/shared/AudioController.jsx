import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import './AudioController.css';

/**
 * Floating audio play/pause button.
 * Exposes a `play()` method via ref so the cover can trigger it.
 */
const AudioController = forwardRef(function AudioController(_, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audio } = weddingConfig;

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current && audio.enabled) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked — user will use the button
        });
      }
    },
  }));

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying]);

  const toggle = () => {
    if (!audio.enabled || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audio.src} loop preload="none" />
      <button
        className={`audio-controller ${isPlaying ? 'audio-controller--playing' : ''} ${!audio.enabled ? 'audio-controller--disabled' : ''}`}
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={!audio.enabled ? 'Music coming soon' : isPlaying ? 'Pause' : 'Play'}
        id="audio-toggle"
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </>
  );
});

export default AudioController;
