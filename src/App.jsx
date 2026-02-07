import React, { useState } from "react"
import EarthScene from "./EarthScene"

export default function App() {
  const [speed, setSpeed] = useState(1)
  const [playing, setPlaying] = useState(true)

  return (
    <div className="canvas-wrap">
      <div className="controls-ui">
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={() => setPlaying(p => !p)}>{playing ? "Pause" : "Play"}</button>
          <label style={{marginLeft:6}}>Speed</label>
          <input type="range" min="0.1" max="10" step="0.1" value={speed} onChange={e=>setSpeed(Number(e.target.value))} />
          <span style={{marginLeft:6}}>{speed}×</span>
        </div>
        <div style={{marginTop:6, fontSize:12, color:"#ddd"}}>Asteroids shown as orbits around Earth (visualized)</div>
      </div>

      <div className="legend">
        <div style={{fontWeight:700}}>Asteroids around Earth</div>
        <div style={{fontSize:12, color:"#ccc"}}>Perigee distances visually scaled; not mission-grade physics</div>
      </div>

      <EarthScene speed={speed} playing={playing} />
    </div>
  )
}
