import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../CSS/RouteSelect.css";

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371.0;
  const toRadians = (angle) => (angle * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};
const placeCoordinates = {
  'New York': { lat: 40.7128, lon: -74.0060 },
  'Los Angeles': { lat: 34.0522, lon: -118.2437 },
  'Chicago': { lat: 41.8781, lon: -87.6298 },
  'San Francisco': { lat: 37.7749, lon: -122.4194 },
  'Seattle': { lat: 47.6062, lon: -122.3321 },
  'Miami': { lat: 25.7617, lon: -80.1918 },
  'Denver': { lat: 39.7392, lon: -104.9903 },
  'Austin': { lat: 30.2500, lon: -97.7500 },
  'Boston': { lat: 42.3601, lon: -71.0589 },
  'Atlanta': { lat: 33.7490, lon: -84.3880 },
  'Dallas': { lat: 32.7767, lon: -96.7970 },
  'Phoenix': { lat: 33.4484, lon: -112.0740 },
  'Toronto': { lat: 43.6532, lon: -79.3832 },
  'London': { lat: 51.5099, lon: -0.1180 },
  'Riyadh': { lat: 24.7136, lon: 46.6753 }, 
  'Cairo': { lat: 30.0444, lon: 31.2357 },  
  'Baghdad': { lat: 33.3152, lon: 44.3661 }, 
  'Amman': { lat: 31.9454, lon: 35.9284 },   
  'Kuwait City': { lat: 29.3759, lon: 47.9774 },   
  'Beirut': { lat: 33.8889, lon: 35.4944 }, 
  'Muscat': { lat: 23.6100, lon: 58.5400 },
   'Doha': { lat: 25.2769, lon: 51.5200 },  
   'Rabat': { lat: 34.0209, lon: -6.8417 }, 
  'Tunis': { lat: 36.8065, lon: 10.1815 }, 
  'Abu Dhabi': { lat: 24.4667, lon: 54.3667 },
  'Sanaa': { lat: 15.3694, lon: 44.1910 },
  
};

    const RouteSelector = () => {
          const { register, handleSubmit: tollCalculatorSubmit } = useForm();
          const [distance, setDistance] = useState(null);
          const [carType, setCarType] = useState('');
          const [tollRate, setTollRate] = useState({
            sedan: 0.15,   // Hypothetical toll rate for a sedan per kilometer
            suv: 0.20,     // Hypothetical toll rate for an SUV per kilometer
            motorcycle: 0.10,  // Hypothetical toll rate for a motorcycle per kilometer
            bike: 0.05,   // Hypothetical toll rate for a bike per kilometer
            taxi: 0.18,   // Hypothetical toll rate for a taxi per kilometer
            pickup: 0.25  // Hypothetical toll rate for a pickup per kilometer
          });
          const [totalToll, setTotalToll] = useState(null);
        
          const onSubmit = (data) => {
            const { sourceCity, destinationCity, carType} = data;
            
      
            const sourceCoordinates = placeCoordinates[sourceCity];
            const destinationCoordinates = placeCoordinates[destinationCity];
            //const calculatedDistance = haversine(lat1, lon1, lat2, lon2);
            if (sourceCoordinates && destinationCoordinates) {
              const calculatedDistance = haversine(
                sourceCoordinates.lat,
                sourceCoordinates.lon,
                destinationCoordinates.lat,
                destinationCoordinates.lon
              );
            if (calculatedDistance > 0) {
              const calculatedToll = calculatedDistance * tollRate[carType];
              setDistance(calculatedDistance);
              setTotalToll(calculatedToll);
            } else {
              // Handle invalid distance (e.g., negative distance)
              console.error('Invalid distance calculation');
            }
          }
          else {
            // Handle invalid place names
            console.error('Invalid place names');
          }
        };
        
          return (
            <div className="route-selector">
              <h1>Select Route</h1>
              <form onSubmit={tollCalculatorSubmit(onSubmit)}>
                <div>
                <label>
            Source City:
            <select {...register('sourceCity')} required>
              {Object.keys(placeCoordinates).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label>
            Destination City:
            <select {...register('destinationCity')} required>
              {Object.keys(placeCoordinates).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
                </div>
                <label>
                  Car Type:
                  <select
                    {...register('carType')}
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    required
                  >
                    <option value="">Select Car Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bike">Bike</option>
                    <option value="taxi">Taxi</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </label>
                <button type="submit">Calculate Toll</button>
              </form>
        
              {distance !== null && (
          <div>
            <h2>Calculated Distance:</h2>
            <p>{`The distance between the two places is ${distance.toFixed(2)} km.`}</p>
            {totalToll !== null && (
              <p>{`The total toll for the trip is $${totalToll.toFixed(2)}.`}</p>
            )}
          </div>
        )}
      </div>
    );
  };
  export default RouteSelector;