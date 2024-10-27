import { Sparkles, Center, OrbitControls, useGLTF, useTexture, shaderMaterial, Float, MeshTransmissionMaterial} from '@react-three/drei'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useHelper } from '@react-three/drei'


export default function Experience()
{   
    // Reference
    const light = useRef()
    useHelper(light, SpotLightHelper, 1, "red")

    // Get the elements of the model
    const { nodes } = useGLTF('./model/scene.glb')
    console.log(nodes)
    
    // Get the textures
    const bakedTexture = useTexture('./model/texture.jpg')
    bakedTexture.flipY = false


    return <>

        {/* Background */}
        <color args={ [ '#030202' ] } attach='background'/>

        <OrbitControls makeDefault />

        {/* Works */}
        <ambientLight intensity={3} color="purple" />
        {/* DOES NOT */}
        <spotLight
            ref={light}
            intensity={10}
            position={[-10, 10, 10]}
        />

        <Center>
            {/* Main model */}
            {/* Shadows should show here */}
            <mesh receiveShadow geometry={nodes.Baked.geometry }>
                <meshStandardMaterial  map={bakedTexture}/>
            </mesh>

            {/* Candle */}
            {/* Should be lighted and cast shadows */}
            <Float speed={6} rotationIntensity={0.3}>
                <mesh 
                    geometry={nodes.Candle.geometry }
                    position={nodes.Candle.position}
                    rotation={nodes.Candle.rotation}
                    castShadow
                >
                    <meshStandardMaterial color="#E5DCBF" />
                    {/* <meshBasicMaterial color="#E5DCBF" /> */}
                </mesh>
            </Float>
        </Center>
    </>
}