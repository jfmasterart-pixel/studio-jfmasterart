
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
      } else {
        videoRef.current.src = LIVE_URL;
      }
    }
  }, [liveOpen]);

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"20px"}}>
      <h1>STUDIO JFMASTERART</h1>

      <button onClick={()=>setRadioPlaying(!radioPlaying)}>
        {radioPlaying ? "Pausar Rádio" : "Ouvir Rádio"}
      </button>

      {radioPlaying && <audio src={RADIO_URL} controls autoPlay />}

      <button onClick={()=>setLiveOpen(true)}>
        Assistir Live
      </button>

      {liveOpen && (
        <div>
          <button onClick={()=>setLiveOpen(false)}>Fechar</button>
          <video ref={videoRef} controls autoPlay style={{width:"100%"}}/>
        </div>
      )}
    </div>
  );
}
