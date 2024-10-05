import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Planet3D from "../../components/Planet3D/Planet3D";
import "./ExoplanetDetails.css";

const textureUrls = {
  "OGLE-2016-BLG-1227L b":
    "https://images-assets.nasa.gov/image/PIA20690/PIA20690~large.jpg",
  "Kepler-276 c":
    "https://images-assets.nasa.gov/image/ACD20-0044-001/ACD20-0044-001~large.jpg",
  "Kepler-829 b":
    "https://images-assets.nasa.gov/image/PIA21473/PIA21473~orig.jpg",
  "Kepler-477 b":
    "https://images-assets.nasa.gov/image/PIA23689/PIA23689~large.jpg",
  "TOI-1260 c":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001417/GSFC_20171208_Archive_e001417~large.jpg",
  "HD 149143 b":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000132/GSFC_20171208_Archive_e000132~large.jpg",
};

const ExoplanetDetails = () => {
  const { planetName } = useParams();
  const navigate = useNavigate();
  const formattedPlanetName = planetName.replace(/-/g, " "); // Convert URL-friendly name back to original
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(
          http://localhost:3000/exoplanets?pl_name=${encodeURIComponent(formattedPlanetName)}
        );
        if (!response.ok) {
          throw new Error(Error: ${response.status});
        }
        const data = await response.json();
        if (data.length > 0) {
          setPlanet(data[0]); // Set the first item in the array if exists
        } else {
          throw new Error("No data found for this exoplanet.");
        }
      } catch (error) {
        console.error("Error fetching exoplanet details: ", error);
        setError("Failed to load exoplanet details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlanetDetails();
  }, [formattedPlanetName]); // Depend on formattedPlanetName

  if (loading) return <p>Loading exoplanet details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="exoplanet-details">
      <div className="backBtn" onClick={() => navigate(-1)}>
        Back
      </div>
      <div className="details">
        {planet && (
          <>
            <div className="exploreLeft">
              <Planet3D textureUrl={textureUrls[planet?.pl_name]} />
            </div>
            <div className="exploreRight">
              <h1>{planet.pl_name}</h1>
              <p>Host Star Name: {planet.hostname}</p>
              <p>Discovery Method: {planet.discoverymethod}</p>
              <p>Discovery Year: {planet.disc_year}</p>
              <p>Orbital Period: {planet.pl_orbper} days</p>
              <p>Planet Radius: {planet.pl_radj} Jupiter radii</p>
              <p>Stellar Mass: {planet.st_mass} solar masses</p>
              <p>Stellar Radius: {planet.st_rad} solar radii</p>
              <p>Equilibrium Temperature: {planet.pl_eqt} Kelvin</p>
              <p>System Distance From Earth: {planet.sy_dist} pc</p>
              <p>Planet Density: {planet.pl_dens} g/cm³</p>
              <p>Insolation Flux: {planet.pl_insol} Earth units</p>
              <p>
                Orbital Eccentricity: {planet.pl_orbeccen} (0 = circular, closer
                to 1 = more elongated)
              </p>
              <p>
                Orbital Semi-Major Axis: {planet.pl_orbsmax} astronomical units
                (AU)
              </p>
              <p>Radial Velocity Flag: {planet.pl_rvflag} </p>
              <p>Habitable Zone Distance: {planet.hz_dist} AU</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExoplanetDetails;