import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../style/Player.scss";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!song?.url || !audioRef.current) return;

    audioRef.current.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [song]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play audio", error);
      }
    }
  };

  const seek = (seconds) => {
    if (!audioRef.current) return;
    const nextTime = Math.min(
      Math.max(0, audioRef.current.currentTime + seconds),
      audioRef.current.duration || 0
    );
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const statusLabel = useMemo(() => {
    if (!song) return "No song loaded";
    return isPlaying ? "Playing" : "Paused";
  }, [song, isPlaying]);

  const displayTitle = song?.title || song?.mood || "No track selected";
  const displaySubtitle = song?.mood ? `Mood • ${song.mood}` : song?.url ? song.url : "";

  const handleSeekChange = (event) => {
    if (!audioRef.current) return;
    const nextTime = Number(event.target.value);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <section className="player">
      <div className="player__header">
        <div>
          <p className="player__title">Now playing</p>
          <h3 className="player__track">{displayTitle}</h3>
          {displaySubtitle && <p className="player__subtitle">{displaySubtitle}</p>}
        </div>
        <div className="player__status-badge">{statusLabel}</div>
      </div>

      {song?.posterUrl && (
        <div className="player__cover-wrap">
          <img
            className="player__cover"
            src={song.posterUrl}
            alt={song?.title || "Track cover"}
          />
        </div>
      )}

      <div className="player__progress">
        <input
          type="range"
          className="player__slider"
          min={0}
          max={duration || 0}
          step={0.01}
          value={currentTime}
          disabled={!song?.url || duration === 0}
          onChange={handleSeekChange}
        />
      </div>
      <div className="player__timecodes">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="player__controls">
        <button
          onClick={() => seek(-5)}
          disabled={!song?.url}
          className="player__button"
        >
          ◀ 5s
        </button>

        <button
          onClick={handlePlayPause}
          disabled={!song?.url}
          className="player__button player__button--primary"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={() => seek(5)}
          disabled={!song?.url}
          className="player__button"
        >
          5s ▶
        </button>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        {song?.url && <source src={song.url} type="audio/mpeg" />}
      </audio>
    </section>
  );
};

export default Player;

