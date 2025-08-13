<template>
  <div class="home-page">
    <section class="hero-section text-center text-white d-flex align-items-center justify-content-center">
      <div class="hero-content">
        <h1 class="display-3 fw-bold">Live Healthier, Happier & Connected</h1>
        <p class="lead my-4 mx-auto" style="max-width: 700px;">
          Welcome to Healthy Seniors, your trusted partner in navigating a vibrant and independent life.
        </p>
        <router-link to="/about" class="btn btn-primary btn-lg">Learn More About Us</router-link>
        <router-link to="/donate" class="btn btn-light btn-lg ms-2">Support Our Cause</router-link>
      </div>
    </section>

    <section class="services-section py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Explore Our Core Services</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="card in cards" :key="card.title">
            <div class="service-card text-center p-4 h-100">
              <img :src="card.icon" :alt="card.title" class="service-icon mb-3">
              <h4 class="fw-semibold">{{ card.title }}</h4>
              <p class="text-muted">{{ card.description }}</p>
              <router-link :to="card.link" class="stretched-link"></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="impact-section py-5 bg-light">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <h2 class="fw-bold">Making a Tangible Difference</h2>
            <p class="fs-5 text-secondary">
              For over a decade, we have been at the forefront of senior support, creating programs that foster health, skill development, and community bonds. Your support helps us continue this vital work.
            </p>
            <div class="d-flex mt-4">
              <div class="me-4">
                <div class="fs-2 fw-bold text-primary">10,000+</div>
                <div class="text-muted">Seniors Supported</div>
              </div>
              <div>
                <div class="fs-2 fw-bold text-primary">500+</div>
                <div class="text-muted">Workshops Hosted</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <img src="/images/our-impact-section.jpg" class="img-fluid rounded shadow-lg" alt="A collage of happy seniors participating in various activities.">
          </div>
        </div>
      </div>
    </section>

     <section class="news-section py-5">
        <div class="container">
            <h2 class="text-center fw-bold mb-5">Latest News & Updates</h2>
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="news-card p-4">
                        <p class="text-muted small"><strong>July 2025</strong></p>
                        <h5 class="fw-semibold">New Walking Group Launched in Victoria!</h5>
                        <p class="text-secondary">Join us every Wednesday morning for a refreshing walk and social chat. A great way to stay active and meet new people.</p>
                        <a href="#" class="text-primary">Read More</a>
                    </div>
                </div>
                <div class="col-md-6">
                     <div class="news-card p-4">
                        <p class="text-muted small"><strong>June 2025</strong></p>
                        <h5 class="fw-semibold">Updated Senior Mental Health Guide Now Available</h5>
                        <p class="text-secondary">Access our comprehensive new guide filled with practical tips and resources for maintaining mental well-being.</p>
                        <a href="#" class="text-primary">Download Guide</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup>
const cards = [
  { title: 'Health & Wellness', description: 'Access trusted health tips and wellness guides.', icon: '/images/icon-health.png', link: '/health' },
  { title: 'Community Programs', description: 'Join local social events to stay connected.', icon: '/images/icon-community.png', link: '/community' },
  { title: 'Digital Skills', description: 'Learn to use devices and stay safe online.', icon: '/images/icon-skills.png', link: '/skills' },
  { title: 'Caregiver Support', description: 'Find resources for family members and carers.', icon: '/images/icon-caregiver.png', link: '/caregiver' }
]
</script>

<style scoped>
.hero-section {
  min-height: 70vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/homepage-hero-banner.jpg');
  background-size: cover;
  background-position: center;
}

.hero-content {
  max-width: 800px;
}

.service-card {
  background: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}
.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.service-icon {
    width: 80px;
    height: 80px;
}
.stretched-link::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: "";
}

.news-card {
    background-color: #f8f9fa;
    border-radius: 1rem;
    border: 1px solid #e9ecef;
}
</style>