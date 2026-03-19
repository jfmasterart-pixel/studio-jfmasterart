"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function App() {
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);
  const videoRef = useRef(null);

  const RADIO_URL = "https://jfmasterart.com.br:8443/live";
  const LIVE_URL = "https://jfmasterart.com.br/live/app.m3u8";

  useEffect(() => {
    if (videoRef.current && liveOpen) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(LIVE_URL);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current.play();
        });

      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = LIVE_URL;
        videoRef.current.addEventListener("loadedmetadata", function () {
          videoRef.current.play();
        });
      }
    }
  }, [liveOpen]);

  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px"
    }}>
      
      <h1 style={{ fontSize: "20px" }}>STUDIO JFMASTERART</h1>

      {/* RADIO */}
      <button onClick={() => setRadioPlaying(!radioPlaying)}>
        {radioPlaying ? "Pausar Rádio" : "Ouvir Rádio"}
      </button>

      {radioPlaying && (
        <audio src={RADIO_URL} controls autoPlay />
      )}

      {/* LIVE */}
      <button onClick={() => setLiveOpen(true)}>
        Assistir Live
      </button>

      {liveOpen && (
        <div style={{ width: "100%" }}>
          <button onClick={() => setLiveOpen(false)}>Fechar</button>
          <video
            ref={videoRef}
            controls
            autoPlay
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
      )}

    </div>
  );
}