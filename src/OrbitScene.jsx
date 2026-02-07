import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Earth from "./components/Earth"
import OrbitPath from "./components/OrbitPath"
import Asteroid from "./Asteroid"

export default function OrbitScene({ orbit }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 6, 10], fov: 60 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />

      <Earth />
      <OrbitPath orbit={orbit} />
      <Asteroid orbit={orbit} />

      <OrbitControls />
    </Canvas>
  )
}
