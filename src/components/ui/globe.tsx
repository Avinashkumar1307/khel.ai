import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export interface PinData {
  id: number;
  lat: number;
  lng: number;
  name: string;
  details: string;
  location: string;
  image?: string;
}

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  markerColor?: string;
}

interface WorldProps {
  pins: PinData[];
  globeConfig: GlobeConfig;
}

// Convert lat/lng to 3D coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
};

// Animated Ring Component
const AnimatedRing = ({ radius, delay }: { radius: number; delay: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
      const opacity = Math.max(0, 1 - (scale - 1) * 2);
      ringRef.current.scale.set(scale, scale, 1);
      if (ringRef.current.material instanceof THREE.MeshBasicMaterial) {
        ringRef.current.material.opacity = opacity * 0.5;
      }
    }
  });

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#00d9ff" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Marker Component with Hover Popup
const Marker = ({ pin, radius, markerColor }: { pin: PinData; radius: number; markerColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  const position = useMemo(
    () => latLngToVector3(pin.lat, pin.lng, radius * 1.01),
    [pin.lat, pin.lng, radius]
  );

  // Calculate rotation to face outward from globe
  const rotation = useMemo(() => {
    const phi = (90 - pin.lat) * (Math.PI / 180);
    const theta = (pin.lng + 180) * (Math.PI / 180);
    return [phi, 0, -theta] as [number, number, number];
  }, [pin.lat, pin.lng]);

  useFrame((state) => {
    if (markerRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      markerRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Main glowing sphere */}
      <mesh
        ref={markerRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.03, 32, 32]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshBasicMaterial color={markerColor} transparent opacity={0.3} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshBasicMaterial color={markerColor} transparent opacity={0.15} />
      </mesh>

      {/* Animated Rings */}
      <AnimatedRing radius={0.08} delay={0} />
      <AnimatedRing radius={0.08} delay={Math.PI} />

      {/* Popup on Hover */}
      {hovered && (
        <Html
          distanceFactor={15}
          position={[0, 0.1, 0]}
          style={{ pointerEvents: "none" }}
          center
        >
          <div
            className="bg-cyan-500/80 border border-cyan-300/50 rounded-sm shadow-lg backdrop-blur-sm"
            style={{ width: '10px', height: '10px' }}
          />
        </Html>
      )}
    </group>
  );
};

// Globe Component
const GlobeComponent = ({ pins, globeConfig }: WorldProps) => {
  const globeRef = useRef<THREE.Group>(null);
  const [globeData, setGlobeData] = useState<any>(null);
  const radius = 1;

  useEffect(() => {
    // Load globe data
    fetch("/data/globe.json")
      .then((res) => res.json())
      .then((data) => setGlobeData(data))
      .catch((err) => console.error("Error loading globe data:", err));
  }, []);

  // Auto-rotate
  useFrame(() => {
    if (globeRef.current && globeConfig.autoRotate) {
      globeRef.current.rotation.y += (globeConfig.autoRotateSpeed || 0.5) * 0.001;
    }
  });

  // Create geometry for globe points
  const pointsGeometry = useMemo(() => {
    if (!globeData || !globeData.features) return null;

    const positions: number[] = [];
    globeData.features.forEach((feature: any) => {
      if (feature.geometry && feature.geometry.coordinates) {
        const coords = feature.geometry.coordinates[0];
        coords.forEach((coord: [number, number]) => {
          const [lng, lat] = coord;
          const [x, y, z] = latLngToVector3(lat, lng, radius * 1.002);
          positions.push(x, y, z);
        });
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [globeData, radius]);

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color={globeConfig.ambientLight || "#ffffff"} />

      {/* Directional Lights */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.3}
        color={globeConfig.directionalLeftLight || "#ffffff"}
      />
      <directionalLight
        position={[5, 5, -5]}
        intensity={0.3}
        color={globeConfig.directionalTopLight || "#ffffff"}
      />

      {/* Point Light */}
      <pointLight
        position={[0, 0, 5]}
        intensity={0.4}
        color={globeConfig.pointLight || "#ffffff"}
      />

      <group ref={globeRef}>
        {/* Globe Sphere */}
        <mesh>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshPhongMaterial
            color={globeConfig.globeColor || "#1a237e"}
            emissive={globeConfig.emissive || "#0a0f2e"}
            emissiveIntensity={globeConfig.emissiveIntensity || 0.2}
            shininess={globeConfig.shininess || 10}
            opacity={1}
            transparent={false}
          />
        </mesh>

        {/* Globe Data Points */}
        {pointsGeometry && (
          <points geometry={pointsGeometry}>
            <pointsMaterial
              size={globeConfig.pointSize || 0.003}
              color={globeConfig.polygonColor || "#4a90e2"}
              transparent
              opacity={0.6}
              sizeAttenuation={true}
            />
          </points>
        )}

        {/* Markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            pin={pin}
            radius={radius}
            markerColor={globeConfig.markerColor || "#00d9ff"}
          />
        ))}
      </group>

      {/* Atmosphere Glow */}
      {globeConfig.showAtmosphere && (
        <mesh>
          <sphereGeometry args={[radius + (globeConfig.atmosphereAltitude || 0.15), 64, 64]} />
          <meshBasicMaterial
            color={globeConfig.atmosphereColor || "#4a90e2"}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={1.8}
        maxDistance={4}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </>
  );
};

// Main World Component
export const World = ({ pins, globeConfig }: WorldProps) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: '100%', height: '100%' }}
      >
        <GlobeComponent pins={pins} globeConfig={globeConfig} />
      </Canvas>
    </div>
  );
};
