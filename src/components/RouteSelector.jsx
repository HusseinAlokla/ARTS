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
  'Miniyeh': { lat: 34.475417, lon: 35.926515},
  'Al Beddaaoui': { lat: 34.449977, lon: 35.859591 },
  'Jamal Abdul Nasser Hwy': { lat:34.428690, lon:  35.815212 },
  'Coastal Hwy Tripoli': { lat: 34.410910,lon: 35.820899 },
  'Tripoli-Btaroun Hwy': { lat:34.408534, lon :35.820292 },
  'Anfe': { lat: 34.360436,lon: 35.745253 },
  'Chekka': { lat: 34.329701,lon: 35.735693 },
  'Deir Nourieh': { lat: 34.281131, lon:35.695145 },
  'Batroun': { lat: 34.266383, lon:35.670972 },
  'Batroun-jbeil Hwy': { lat: 34.244946,lon: 35.664939 },
  'fghal': { lat: 34.209428, lon: 35.650684 },
  'Amchit': { lat: 34.145620, lon: 35.634580 },
  'Jbeil-Jounieh': { lat: 34.117847, lon:35.651587 },
  'Halat': { lat: 34.073298,lon: 35.645070 },
  'Ghazir': { lat:34.013054, lon:35.648120 }, 
  'Zouq Mosbeh': { lat: 33.961890, lon:35.604814 },  
  'Dbayeh': { lat: 33.927259, lon:35.587453 }, 
  'Pierre Gemayel': { lat: 33.897154,lon: 35.536265 },   
  'General DE Gaulle': { lat: 33.898687, lon:35.470829 },   
  'Beirut-Saida Hwy': { lat:33.811359, lon:35.482374 }, 
  'Saida-Tyre Hwy': { lat: 33.551667, lon:35.378052 },
   'Sarafand': { lat: 33.461150,lon: 35.316662 },  
   'El-Buss': { lat: 33.270100, lon:35.214592}, 
  'Tyre-Naqoura Hwy': { lat: 33.196376,lon: 35.205119}, 
  'Burj El Naqoura': { lat:33.102940,lon: 35.108453 },
 
  
};

    const RouteSelector = () => {
          const { register, handleSubmit: tollCalculatorSubmit } = useForm();
          const [sourceCity, setSourceCity] = useState('');
          const [destinationCity, setDestinationCity] = useState('');
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
            <select {...register('sourceCity')}onChange={(e) => setSourceCity(e.target.value)} required>
              {Object.keys(placeCoordinates).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label>
            Destination City:
            <select {...register('destinationCity')} onChange={(e) => setDestinationCity(e.target.value)} required>
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
            <p>{`The distance between ${sourceCity} and ${destinationCity} is ${distance.toFixed(2)} km.`}</p>
            {totalToll !== null && (
              <p>{`The total toll for the trip is $${totalToll.toFixed(2)}.`}</p>
            )}
          </div>
        )}
      </div>
    );
  };
  export default RouteSelector;