function updateTicker() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
  
    document.getElementById('date-time').textContent = `Date: ${dateString} | Time: ${timeString} | `;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById('location-display').textContent = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Use a reverse geocoding service (like OpenStreetMap Nominatim) to get the location name
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
          document.getElementById('location-display').textContent = `Location: ${data.display_name} | `;
        } else {
          document.getElementById('location-display').textContent = `Location: Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)} | `;
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        document.getElementById('location-display').textContent = `Location: Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)} | `;
      });
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById("location-display").textContent = "User denied the request for Geolocation. | ";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById("location-display").textContent = "Location information is unavailable. | ";
        break;
      case error.TIMEOUT:
        document.getElementById("location-display").textContent = "The request to get user location timed out. | ";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById("location-display").textContent = "An unknown error occurred. | ";
        break;
    }
  }
  
  updateTicker(); // Initial update
  setInterval(updateTicker, 1000);