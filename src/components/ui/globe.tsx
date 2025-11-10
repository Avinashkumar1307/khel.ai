import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  icon?: string;
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

// Marker Component with Hover Popup
const Marker = ({ pin, radius, markerColor }: { pin: PinData; radius: number; markerColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const { camera } = useThree();

  const position = useMemo(
    () => latLngToVector3(pin.lat, pin.lng, radius * 1.015),
    [pin.lat, pin.lng, radius]
  );

  // Calculate rotation to face outward from globe
  const rotation = useMemo(() => {
    const phi = (90 - pin.lat) * (Math.PI / 180);
    const theta = (pin.lng + 180) * (Math.PI / 180);
    return [phi, 0, -theta] as [number, number, number];
  }, [pin.lat, pin.lng]);

  // Check if marker is visible (on front side of globe)
  useFrame(() => {
    const markerWorldPos = new THREE.Vector3(...position);
    const cameraDir = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(0, 0, 0)).normalize();
    const markerDir = markerWorldPos.clone().normalize();
    const dot = cameraDir.dot(markerDir);
    setVisible(dot > 0.1);
  });

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation}>
      {/* Pin Circle Background */}
      <mesh
        position={[0, 0, 0.001]}
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
        <circleGeometry args={[0.022, 32]} />
        <meshBasicMaterial color={markerColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Pin Icon */}
      <Html
        distanceFactor={10}
        position={[0, 0, 0.002]}
        center
        style={{ pointerEvents: "none" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </Html>

      {/* Hover Card */}
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0, 0.08, 0]}
          style={{ pointerEvents: "none" }}
          center
        >
          <div
            className="bg-gray-900/95 rounded overflow-hidden shadow-lg backdrop-blur-sm border border-gray-700"
            style={{ width: '100px', maxHeight: '100px' }}
          >
            {pin.image && (
              <div className="relative" style={{ height: '60px' }}>
                <img
                  src={pin.image}
                  alt={pin.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            )}
            <div className="p-1 bg-gray-900/95" style={{ maxHeight: '40px' }}>
              <h3 className="text-white font-semibold text-[8px] mb-0 leading-tight truncate">{pin.name}</h3>
              <p className="text-gray-400 text-[7px] mb-0.5 leading-tight truncate">{pin.details}</p>
              <div className="flex items-center gap-0.5 text-gray-500 text-[6px] truncate">
                <span className="text-[8px]">📍</span>
                <span className="truncate">{pin.location}</span>
              </div>
            </div>
          </div>
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

  // Create geometry for globe points - only front-facing
  const pointsGeometry = useMemo(() => {
    if (!globeData || !globeData.features) return null;

    const positions: number[] = [];
    globeData.features.forEach((feature: any) => {
      if (feature.geometry && feature.geometry.coordinates) {
        const coords = feature.geometry.coordinates[0];
        coords.forEach((coord: [number, number]) => {
          const [lng, lat] = coord;
          const [x, y, z] = latLngToVector3(lat, lng, radius * 1.001);
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
      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Directional Lights */}
      <directionalLight position={[-8, 5, 8]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[8, 5, -8]} intensity={0.5} color="#ffffff" />

      {/* Point Light */}
      <pointLight position={[0, 8, 5]} intensity={0.4} color="#ffffff" />

      <group ref={globeRef}>
        {/* Globe Sphere - Completely opaque */}
        <mesh>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshPhongMaterial
            color={globeConfig.globeColor || "#1a1a1a"}
            emissive="#000000"
            emissiveIntensity={0}
            shininess={20}
            opacity={1}
            transparent={false}
            side={THREE.FrontSide}
            depthWrite={true}
            depthTest={true}
          />
        </mesh>

        {/* Globe Data Points (White dots for continents) */}
        {pointsGeometry && (
          <points geometry={pointsGeometry}>
            <pointsMaterial
              size={globeConfig.pointSize || 0.0025}
              color={globeConfig.polygonColor || "#ffffff"}
              transparent
              opacity={0.85}
              sizeAttenuation={true}
              depthTest={true}
              depthWrite={false}
            />
          </points>
        )}

        {/* Markers */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            pin={pin}
            radius={radius}
            markerColor={globeConfig.markerColor || "#ff6b35"}
          />
        ))}
      </group>

      {/* Atmosphere Glow */}
      {globeConfig.showAtmosphere && (
        <mesh>
          <sphereGeometry args={[radius + 0.05, 64, 64]} />
          <meshBasicMaterial
            color={globeConfig.atmosphereColor || "#444444"}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        rotateSpeed={0.8}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

// Main World Component
export const World = ({ pins, globeConfig }: WorldProps) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 1.8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: '100%', height: '100%' }}
      >
        <GlobeComponent pins={pins} globeConfig={globeConfig} />
      </Canvas>
    </div>
  );
};
