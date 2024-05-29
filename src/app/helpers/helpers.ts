  export const getLatLong = async (address: string) => {
    const apiKey = 'AIzaSyAMPbCkjXTAUlHfoxYBEyzk_ttZgilnfzM';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Geocoding failed. Please check your input.');
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  