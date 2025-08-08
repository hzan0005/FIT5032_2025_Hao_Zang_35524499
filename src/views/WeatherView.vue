<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
        <br>
        <br>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from "axios";
  const apikey = "36ce73a32e5970f4e5a0e2c3e1b2aacd"; //  OpenWeatherMap API key

  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      async searchByCity() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }
  }
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  margin-top: 3rem;
}
.header {
  text-align: center;
  margin-bottom: 1rem;
}
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-input {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 70%;
}
.search-button {
  padding: 0.5rem 1rem;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
main div[v-cloak],
main div[v-if] {
  text-align: center;
}
main img {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
