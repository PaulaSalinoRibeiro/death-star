import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"

import './index.css'

const Animation = () => {
  const ref = useRef();

  const [active, setActive] = useState(false)

  const props = useTexture({
    map: 'material_map.jpeg',
    displacementMap: 'material_displacementMap.png',
    normalMap: 'material_normalMap.jpeg',
    roughnessMap: 'material_metallicRoughness.png',
    aoMap: 'material_aoMap.png'
  })

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    ref.current.rotation.y = a;
  });

  return (
    <mesh scale={active ? 1.5 : 1} ref={ref} onPointerOver={() => setActive(!active)}>
      <sphereGeometry args={[-1, 32, 32]} />
      <meshStandardMaterial displacementScale={0.2} {...props} />    
    </mesh>
  )
}

createRoot(document.getElementById('root')).render(
  <Canvas>
      <ambientLight intensity={0.01} />
      <directionalLight color="light_grey" position={[0, -1, 2]} />
      <Animation />
  </Canvas>
)
