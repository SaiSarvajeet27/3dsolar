ASTEROIDS AROUND EARTH – 3D VISUALIZATION
=======================================

This project is an interactive 3D visualization that shows how Near-Earth
Asteroids (NEOs) pass close to Earth. The visualization is Earth-centered
and focuses on intuitive understanding of asteroid close approaches rather
than mission-grade orbital simulation.

The application is built using React and Three.js (via React Three Fiber).

---------------------------------------------------------------------------
FEATURES
---------------------------------------------------------------------------

• Interactive 3D Earth-centered scene
• Asteroids visualized as elliptical orbits around Earth
• Hover over an asteroid to view its details:
  - Asteroid name / ID
  - Closest approach distance (Perigee)
  - Relative velocity
  - Orbital inclination
• Color-coded asteroids:
  - Red: Potentially hazardous
  - Green: Non-hazardous
• Smooth camera controls (zoom, rotate, pan)
• Stable WebGL rendering (no heavy post-processing)

---------------------------------------------------------------------------
DATA SOURCE & FORMAT
---------------------------------------------------------------------------

The application uses data structured in the same format as NASA’s
NeoWs (Near-Earth Object Web Service) API.

For local testing and development:
• A sample dataset is provided in:
  src/data/sample_neows.json

This file follows the official NASA NeoWs response structure:

{
  "near_earth_objects": {
    "YYYY-MM-DD": [
      {
        "name": "...",
        "is_potentially_hazardous_asteroid": true/false,
        "orbital_data": {
          "inclination": "...",
          "eccentricity": "..."
        },
        "close_approach_data": [
          {
            "miss_distance": { "kilometers": "..." },
            "relative_velocity": { "kilometers_per_second": "..." }
          }
        ]
      }
    ]
  }
}

The frontend is designed so that a backend can later replace this sample
file and provide real NeoWs data without changing the visualization logic.

---------------------------------------------------------------------------
IMPORTANT CONCEPTS
---------------------------------------------------------------------------

Perigee:
• Perigee is the point in an asteroid’s trajectory where it comes closest
  to Earth.
• It is the most important parameter for assessing potential risk.
• Smaller perigee distance = closer Earth approach.

NOTE:
Most asteroids do NOT permanently orbit Earth.
This Earth-centered view is a visualization technique used to compare
close-approach distances in an intuitive way.

---------------------------------------------------------------------------
TECH STACK
---------------------------------------------------------------------------

Frontend:
• React
• Vite
• Three.js
• @react-three/fiber
• @react-three/drei

Rendering:
• WebGL (via Three.js)
• No heavy post-processing to ensure stability across systems

---------------------------------------------------------------------------
PROJECT STRUCTURE
---------------------------------------------------------------------------

src/
 ├─ components/
 │   ├─ Earth.jsx
 │   ├─ AsteroidOrbit.jsx
 │   └─ OrbitPath.jsx
 │
 ├─ data/
 │   └─ sample_neows.json
 │
 ├─ services/
 │   └─ fetchAsteroids.js
 │
 ├─ EarthScene.jsx
 ├─ App.jsx
 └─ main.jsx

---------------------------------------------------------------------------
HOW TO RUN LOCALLY
---------------------------------------------------------------------------

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Open in browser:
   http://localhost:5173

---------------------------------------------------------------------------
DISCLAIMER
---------------------------------------------------------------------------

• This visualization is for educational and demonstration purposes.
• Orbital paths are visually scaled and simplified.
• It is NOT intended for mission planning or real-time hazard prediction.

---------------------------------------------------------------------------
FUTURE EXTENSIONS
---------------------------------------------------------------------------

• Backend integration with live NASA NeoWs API
• Time-based filtering (today / week / month)
• Risk score visualization
• Closest-approach line from Earth to asteroid
• Performance optimizations for large asteroid datasets

---------------------------------------------------------------------------
END OF README
---------------------------------------------------------------------------

