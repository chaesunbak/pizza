"use client";

import { useState, useRef, useEffect } from "react";

const TRACKS = [
  {
    id: "cheese-gravity",
    name: "Cheese Gravity",
    path: "/audios/Cheese Gravity.mp3",
  },
  {
    id: "plastic-weather",
    name: "Plastic Weather",
    path: "/audios/Plastic Weather.mp3",
  },
  {
    id: "salt-plug-sky",
    name: "Salt-Plug Sky",
    path: "/audios/Salt-Plug Sky.mp3",
  },
] as const;

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Randomly select one of the three tracks once on mount
    const selectedTrack = TRACKS[Math.floor(Math.random() * TRACKS.length)];

    const audio = new Audio(selectedTrack.path);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback failed:", err));
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={togglePlay}
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-500 ${
          isPlaying
            ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
            : "bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-black/30"
        }`}
      >
        {/* Visual Indicator */}
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-[3px] bg-white animate-[music-bar_0.6s_ease-in-out_infinite]" />
              <div className="w-[3px] bg-white animate-[music-bar_0.8s_ease-in-out_infinite_0.1s]" />
              <div className="w-[3px] bg-white animate-[music-bar_0.7s_ease-in-out_infinite_0.2s]" />
            </div>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4 text-white/40"
            >
              <polygon
                points="5 3 19 12 5 21 5 3"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          )}
        </div>

        {/* Subtle background glow when playing - reduced for a cleaner look */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-white/5 blur-md -z-10 animate-pulse" />
        )}
      </button>

      <style jsx global>{`
        @keyframes music-bar {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
}
