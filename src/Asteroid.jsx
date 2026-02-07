import React from "react"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Asteroid({ orbit }) {
  const meshRef = useRef()
  const angleRef = useRef(0)

  useFrame(() => {
    angleRef.current += 0.01
    const a = orbit.a
    const b = a * Math.sqrt(1 - orbit.e ** 2)

    meshRef.current.position.set(
      a * Math.cos(angleRef.current),
      0,
      b * Math.sin(angleRef.current)
    )
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
