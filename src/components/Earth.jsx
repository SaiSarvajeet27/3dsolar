// src/components/Earth.jsx
import React from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { TextureLoader } from "three"

export default function Earth({ scale = 1 }) {
  // If you added textures to public/textures, the useLoader will load them.
  // If you did not add textures, replace this file with the "fallback" version provided below.
  const [colorMap, normalMap, specMap] = useLoader(TextureLoader, [
    "/textures/earth_color.jpg",
    "/textures/earth_normal.jpg",
    "/textures/earth_specular.jpg"
  ])

  return (
    <>
      {/* Earth with texture */}
      <mesh>
        <sphereGeometry args={[1 * scale, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.05}
          roughness={0.95}
        />
      </mesh>

      {/* subtle atmosphere rim: slightly larger, additive */}
      <mesh renderOrder={99}>
        <sphereGeometry args={[1.02 * scale, 64, 64]} />
        <meshBasicMaterial
          color="#66a3ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  )
}
