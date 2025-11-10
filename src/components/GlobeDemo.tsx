import { motion } from "framer-motion";
import { World } from "./ui/globe";
import type { PinData } from "./ui/globe";

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 0.0025,
    globeColor: "#1a1a1a",
    showAtmosphere: true,
    atmosphereColor: "#444444",
    atmosphereAltitude: 0.05,
    emissive: "#000000",
    emissiveIntensity: 0,
    shininess: 20,
    polygonColor: "#ffffff",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    autoRotate: true,
    autoRotateSpeed: 0.3,
    markerColor: "#ff6b35",
  };

  const pins: PinData[] = [
    {
      id: 1,
      lat: 43.6,
      lng: 7.0,
      name: "Killian Hayes",
      details: "Detroit Pistons",
      location: "Monaco",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      lat: 36.5,
      lng: 36.3,
      name: "Faouzi Goulham",
      details: "Hatayspor",
      location: "Algérie",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      lat: 34.0,
      lng: -118.0,
      name: "Marcus Johnson",
      details: "Los Angeles Lakers",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      lat: 51.5,
      lng: -0.1,
      name: "James Sterling",
      details: "Chelsea FC",
      location: "London",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      lat: 28.6139,
      lng: 77.209,
      name: "Arjun Patel",
      details: "Mumbai Indians",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      lat: 35.6762,
      lng: 139.6503,
      name: "Yuki Tanaka",
      details: "Tokyo Giants",
      location: "Tokyo",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      lat: -33.8688,
      lng: 151.2093,
      name: "Jake Williams",
      details: "Sydney Swans",
      location: "Sydney",
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      lat: -23.5505,
      lng: -46.6333,
      name: "Carlos Silva",
      details: "São Paulo FC",
      location: "São Paulo",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto bg-black relative" style={{ width: '100%' }}>
      <div className="mx-auto relative overflow-hidden h-full md:h-[40rem] px-4" style={{ width: '100%', maxWidth: '100%' }}>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-white mb-2">
            Global Athletes Network
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-gray-400 max-w-md mt-2 mx-auto">
            Discover athletes from around the world - hover over the pins to see their profiles
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-black z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10" style={{ width: '100%' }}>
          <World pins={pins} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
