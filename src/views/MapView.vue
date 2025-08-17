<template>
  <div class="map-container container-fluid p-0">
    <div class="control-panel shadow">
      <h4 class="mb-3">Map Navigator</h4>

      <div class="mb-4">
        <label class="form-label fw-semibold">📍 Find a Location</label>
        <div class="input-group">
          <input type="text" v-model="searchQuery" @keyup.enter="searchLocation" class="form-control" placeholder="e.g., Monash University">
          <button @click="searchLocation" class="btn btn-primary">Search</button>
        </div>
      </div>

      <div>
        <label class="form-label fw-semibold">🚗 Plan a Route</label>
        <p class="small text-muted">Click on the map to set a start and end point.</p>
        <div class="d-grid gap-2">
            <button @click="getRoute" class="btn btn-success" :disabled="!startPoint || !endPoint">Get Directions</button>
            <button @click="clearRoute" class="btn btn-outline-secondary">Clear</button>
        </div>
        <div v-if="routeInfo" class="mt-3 alert alert-info small">
            <strong>Distance:</strong> {{ routeInfo.distance }} km<br>
            <strong>Duration:</strong> {{ routeInfo.duration }} minutes
        </div>
      </div>
    </div>

    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk5OTBhMjI5NDY1NzQ2ZDA4OWEyZGVhYTliYzg5ZmVlIiwiaCI6Im11cm11cjY0In0=';

let map = null;
const searchQuery = ref('');
const startPoint = ref(null);
const endPoint = ref(null);
const routeInfo = ref(null);
let routeLayer = null;
let startMarker = null;
let endMarker = null;

onMounted(() => {
  map = L.map('map').setView([-37.8136, 144.9631], 13); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  map.on('click', handleMapClick);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});

const searchLocation = async () => {
  if (!searchQuery.value) return;
  try {
    const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
      params: {
        api_key: apiKey,
        text: searchQuery.value,
        'boundary.country': 'AU' 
      }
    });
    const coords = response.data.features[0].geometry.coordinates;
    const latLng = [coords[1], coords[0]]; 
    map.setView(latLng, 15);
    L.marker(latLng).addTo(map).bindPopup(`<b>${searchQuery.value}</b>`).openPopup();
  } catch (error) {
    console.error('Geocoding error:', error);
    alert('Could not find location.');
  }
};

const handleMapClick = (e) => {
  if (!startPoint.value) {
    startPoint.value = e.latlng;
    startMarker = L.marker(e.latlng, { draggable: true }).addTo(map).bindPopup('Start Point');
    startMarker.on('dragend', (event) => { startPoint.value = event.target.getLatLng(); });
  } else if (!endPoint.value) {
    endPoint.value = e.latlng;
    endMarker = L.marker(e.latlng, { draggable: true }).addTo(map).bindPopup('End Point');
    endMarker.on('dragend', (event) => { endPoint.value = event.target.getLatLng(); });
  }
};

const getRoute = async () => {
  if (!startPoint.value || !endPoint.value) return;
  try {
    const response = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      coordinates: [
        [startPoint.value.lng, startPoint.value.lat],
        [endPoint.value.lng, endPoint.value.lat]
      ]
    }, {
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    const routeData = response.data.features[0];
    const { distance, duration } = routeData.properties.summary;

    routeInfo.value = {
      distance: (distance / 1000).toFixed(2), 
      duration: (duration / 60).toFixed(0) 
    };

    if (routeLayer) map.removeLayer(routeLayer);
    routeLayer = L.geoJSON(routeData.geometry).addTo(map);
    
  } catch (error) {
    console.error('Routing error:', error);
    alert('Could not calculate route.');
  }
};

const clearRoute = () => {
    startPoint.value = null;
    endPoint.value = null;
    routeInfo.value = null;
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeLayer) map.removeLayer(routeLayer);
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 56px); 
}
#map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
.control-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
}
</style>