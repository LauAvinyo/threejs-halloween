import { Sparkles, Center, OrbitControls, useGLTF, useTexture, shaderMaterial, Float, MeshTransmissionMaterial} from '@react-three/drei'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper, SpotLightHelper} from 'three'
import { useEffect } from 'react'

// const PortalMaterial = shaderMaterial(
//     {
//         uTime: 0,
//         uColorStart: new THREE.Color("#ffffff"),
//         uColorEnd: new THREE.Color("#000000")
//     },
//     portalVertexShader, 
//     portalFragmentShader
// )
// extend({PortalMaterial})


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

    // useEffect(() => {
    //     if (light.current) {
    //         light.current.target.position.set(-1, -3, 0); // Target position (e.g., origin)
    //         light.current.target.updateMatrixWorld();
    //     }
    //   }, [])


    return <>

        {/* Background */}
        <color args={ [ '#030202' ] } attach='background'/>

        <OrbitControls makeDefault />

        {/* Works */}
        <ambientLight intensity={1} color="white" />
        {/* DOES NOT */}
        <spotLight
            ref={light}
            intensity={1}
            position={[0, 1, 1]}
        />

        <Center>
            {/* Main model */}
            <mesh receiveShadow geometry={nodes.Baked.geometry }>
                <meshStandardMaterial  map={bakedTexture}/>
            </mesh>

            {/* Green potion */}
             <mesh 
                geometry={nodes.Potion.geometry} 
                // position={[2.108, 1.5, -4.55]}
                position={nodes.Potion.position}
                rotation={nodes.Potion.rotation}  
            >
                <meshBasicMaterial color="#0CFF50" />
            </mesh>

            <mesh 
                geometry={nodes.Text.geometry} 
                position={nodes.Text.position}
                rotation={nodes.Text.rotation}  
            >
                <meshBasicMaterial color="#0CFF50" />
            </mesh>

            {/* Book */}
            <Float
                speed={4}
                rotationIntensity={0.2}
            >
                <mesh 
                    geometry={nodes.Book.geometry }
                    position={nodes.Book.position}
                    rotation={nodes.Book.rotation}
                >
                    <meshBasicMaterial color="#E5DCBF" />
                </mesh>
            </Float>

            {/* Candle */}
            <Float
                speed={6}
                rotationIntensity={0.3}
            >
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

            {/* A-Baner */}
            <Float
                speed={2}
                rotationIntensity={0.3}
            >
                <mesh 
                    geometry={nodes["A-Board"].geometry }
                    position={nodes["A-Board"].position}
                    rotation={nodes["A-Board"].rotation}
                >
                    <meshBasicMaterial color="#E5DCBF" />
                    {/* <meshStandardMaterial color="#0CFF50" /> */}
                </mesh>
            </Float>


            {/* Bottles */}

            <mesh 
                geometry={nodes.Bottles.geometry }
                position={nodes.Bottles.position}
            >
                <meshBasicMaterial transparent opacity={0.1} />
            </mesh>

            <mesh 
                geometry={nodes["InsidePotion-Bottle"].geometry }
                position={nodes["InsidePotion-Bottle"].position}
            >
                <meshBasicMaterial transparent opacity={0.1} />
            </mesh>

            {/* Fireflights */} 
            <Sparkles 
                size={4}
                scale={[12, 4, 8]}
                position-y={2}
                position-z={6}
                speed={0.5}
                count={64}
                color={"#C1ACFF"}
            />


            
        </Center>


    </>
}