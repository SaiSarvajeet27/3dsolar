// src/components/Sidebar.jsx
import React from "react"

export default function Sidebar({ asteroids = [], selected = null, onSelect = () => {}, onClose = () => {} }) {
  return (
    <div style={{
      position: "absolute",
      right: 12,
      top: 12,
      width: 260,
      maxHeight: "80vh",
      overflow: "auto",
      zIndex: 40,
      background: "rgba(0,0,0,0.5)",
      padding: 10,
      borderRadius: 8,
      color: "#fff",
      fontSize: 13
    }}>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>Asteroids</div>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Filter id..."
          style={{ width: "100%", padding: 6, borderRadius: 6, border: "none", outline: "none", background: "rgba(255,255,255,0.03)", color:"#fff" }}
          onChange={() => {}}
        />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {asteroids.map(a => (
          <li key={a.id} style={{ marginBottom: 6 }}>
            <button
              onClick={() => onSelect(a, null)}
              style={{
                width: "100%",
                padding: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: selected && selected.id === a.id ? "rgba(255,255,255,0.06)" : "transparent",
                border: "none",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              <div style={{ fontWeight: 700 }}>{a.id}</div>
              <div style={{ fontSize: 12, color: "#ccc" }}>{Math.round(a.perigee_km).toLocaleString()} km</div>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800 }}>{selected.id}</div>
            <button onClick={onClose} style={{ background: "transparent", color: "#fff", border: "none", cursor: "pointer" }}>Close</button>
          </div>
          <div style={{ marginTop: 8, color: "#ddd" }}>
            <div>Perigee: <strong>{selected.perigee_km.toLocaleString()} km</strong></div>
            <div>Velocity: <strong>{selected.velocity_km_s} km/s</strong></div>
            <div>Inclination: <strong>{selected.inclination_deg}°</strong></div>
            <div style={{ marginTop: 8, color: "#bbb", fontSize: 12 }}>
              Click an asteroid in the scene or the list to follow it.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 12, color: "#bbb", fontSize: 12 }}>
          Click an asteroid to view details and follow.
        </div>
      )}
    </div>
  )
}
