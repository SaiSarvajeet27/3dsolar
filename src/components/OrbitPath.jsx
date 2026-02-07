import React, { useMemo, useRef, useEffect } from "react"
import * as THREE from "three"

export default function OrbitPath({ a = 3, e = 0.2, inclination = 0, color="#888" }) {
  // Parametric ellipse in orbital plane (focus at origin if needed).
  const points = useMemo(() => {
    const pts = []
    const b = a * Math.sqrt(1 - e * e)
    const segments = 256
    for (let i=0;i<=segments;i++){
      const theta = (i/segments) * Math.PI * 2
      pts.push(new THREE.Vector3(a * Math.cos(theta), 0, b * Math.sin(theta)))
    }
    return pts
  }, [a,e])

  const geomRef = useRef()
  useEffect(() => {
    if (geomRef.current) geomRef.current.computeLineDistances()
  }, [points])

  // rotation for inclination: rotate around X axis by inclination rad
  return (
    <line ref={geomRef} geometry={new THREE.BufferGeometry().setFromPoints(points)} rotation={[inclination,0,0]}>
      <lineDashedMaterial attach="material" color={color} dashSize={0.2} gapSize={0.2} linewidth={1} />
    </line>
  )
}
