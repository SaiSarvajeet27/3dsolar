// src/components/AsteroidOrbit.jsx
import React, { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import OrbitPath from "./OrbitPath"

export default function AsteroidOrbit({
  data,
  radius = 3,
  eccentricity = 0.2,
  inclination = 0,
  color = "#ff6b6b",
  speed = 1,
  playing = true,
}) {
  const meshRef = useRef()
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const [hovered, setHovered] = useState(false)

  const b = useMemo(
    () => radius * Math.sqrt(Math.max(0, 1 - eccentricity * eccentricity)),
    [radius, eccentricity]
  )

  const size = Math.max(0.04, Math.min(0.18, radius * 0.04))

  // Update orbit motion
  useFrame((_, delta) => {
    if (playing) {
      const angularSpeed = 0.4 * (1 / Math.max(0.1, radius)) * speed
      angleRef.current += angularSpeed * delta * 60
    }

    const a = radius
    const t = angleRef.current

    const pos = new THREE.Vector3(
      a * Math.cos(t),
      0,
      b * Math.sin(t)
    )

    pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), inclination)

    if (meshRef.current) {
      meshRef.current.position.copy(pos)
      meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <>
      {/* Orbit path */}
      <OrbitPath
        a={radius}
        e={eccentricity}
        inclination={inclination}
        color={color}
      />

      {/* Asteroid mesh */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#ffe066" : color} />
      </mesh>

      {/* 🔥 TOOLTIP (WORLD-SPACE, ALWAYS VISIBLE) */}
      {hovered && meshRef.current && (
        <Html
          position={[
            meshRef.current.position.x,
            meshRef.current.position.y + size + 0.25,
            meshRef.current.position.z
          ]}
          transform={false}
          center
          zIndexRange={[1000, 0]}
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: "8px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              minWidth: "180px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>
              🪨 {data.id}
            </div>
            <div style={{ fontSize: 12, color: "#ddd" }}>
              Perigee: <b>{data.perigee_km.toLocaleString()} km</b>
            </div>
            <div style={{ fontSize: 12, color: "#ddd" }}>
              Velocity: <b>{data.velocity_km_s} km/s</b>
            </div>
            <div style={{ fontSize: 12, color: "#aaa" }}>
              Inclination: {data.inclination_deg}°
            </div>
          </div>
        </Html>
      )}
    </>
  )
}
