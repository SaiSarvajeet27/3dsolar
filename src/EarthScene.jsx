// src/EarthScene.jsx
import React, { useEffect, useMemo, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"

import Earth from "./components/Earth"
import AsteroidOrbit from "./components/AsteroidOrbit"
import { fetchAsteroids } from "./services/fetchAsteroids"

// visualization constants
const EARTH_RADIUS_KM = 6371
const SCENE_SCALE = 1 / 80000 // 1 scene unit = 80,000 km

export default function EarthScene({ speed = 1, playing = true }) {
  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchAsteroids()
      .then((list) => {
        if (!mounted) return
        setAsteroids(list)
      })
      .catch((err) => {
        console.error("fetchAsteroids error:", err)
        if (!mounted) return
        setError("Failed to load asteroid data")
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const scaledAsteroids = useMemo(() => {
    return asteroids.map((a) => {
      const perigeeFromCenterKm = EARTH_RADIUS_KM + (a.perigee_km || 0)
      return {
        ...a,
        radius_scene: perigeeFromCenterKm * SCENE_SCALE,
        inclination_rad: ((a.inclination_deg || 0) * Math.PI) / 180,
      }
    })
  }, [asteroids])

  if (loading) {
    return <div style={{ color: "#fff", padding: 20 }}>Loading asteroid data…</div>
  }
  if (error) {
    return <div style={{ color: "salmon", padding: 20 }}>{error}</div>
  }

  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 10, 6]} intensity={1.1} />

      <Stars radius={120} depth={60} count={6000} factor={4} fade />

      <Earth scale={1} />

      {scaledAsteroids.map((ast) => (
        <AsteroidOrbit
          key={ast.id}
          data={ast}
          radius={ast.radius_scene}
          color={ast.is_potentially_hazardous_asteroid ? "#ff4d4d" : "#4dff88"}
          eccentricity={ast.eccentricity}
          inclination={ast.inclination_rad}
          speed={speed}
          playing={playing}
        />
      ))}

      <OrbitControls enablePan enableZoom enableDamping dampingFactor={0.08} minDistance={3} maxDistance={45} />
    </Canvas>
  )
}
