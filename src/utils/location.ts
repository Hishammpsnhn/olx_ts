interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export const locationCatch = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject("Failed to get location");
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject("Geolocation not supported");
      }
    });
  };
  