<template>
  <div class="health-view-page">

    <section class="hero-section text-white text-center d-flex align-items-center justify-content-center">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="display-4 fw-bold">Your Guide to Healthy Aging</h1>
        <p class="lead mt-3">Embrace vitality at every stage with our expert tips on fitness, nutrition, and well-being.</p>
      </div>
    </section>

    <div class="container py-5">
      <section class="mb-5 text-center">
        <h2 class="fw-bold mb-5">The Three Pillars of Senior Wellness</h2>
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="health-card h-100 p-4">
              <div class="icon-circle bg-primary mb-3">🏃</div>
              <h4 class="fw-semibold">Stay Active</h4>
              <p class="text-muted">Regular, gentle exercise boosts energy, improves balance, and strengthens your heart. Discover activities you love, from walking to yoga.</p>
               <img src="/images/senior-activity.jpg" alt="Senior exercising" class="img-fluid rounded mt-3">
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="health-card h-100 p-4">
              <div class="icon-circle bg-success mb-3">🍎</div>
              <h4 class="fw-semibold">Eat Well</h4>
              <p class="text-muted">A balanced diet rich in fruits, vegetables, and lean protein is essential for maintaining health. Fuel your body with the right nutrients.</p>
               <img src="/images/senior-nutrition.jpg" alt="Healthy food" class="img-fluid rounded mt-3">
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="health-card h-100 p-4">
              <div class="icon-circle bg-info mb-3">🧠</div>
              <h4 class="fw-semibold">Nourish Your Mind</h4>
              <p class="text-muted">Keep your mind sharp and spirits high by staying socially connected, learning new things, and practicing mindfulness.</p>
              <img src="/images/senior-mental-wellbeing.jpg" alt="Senior socializing" class="img-fluid rounded mt-3">
            </div>
          </div>
        </div>
      </section>

      <section class="bg-light p-4 p-md-5 rounded">
        <h2 class="text-center fw-bold mb-4">Trusted Health Resources</h2>
        <div class="list-group">
          <a href="https://www.healthdirect.gov.au/" class="list-group-item list-group-item-action fs-5 p-3" target="_blank" rel="noopener">
            HealthDirect – Trusted medical advice from the Australian government.
          </a>
          <a href="https://www.beyondblue.org.au/" class="list-group-item list-group-item-action fs-5 p-3" target="_blank" rel="noopener">
            Beyond Blue – Leading mental health support for all Australians.
          </a>
          <a href="https://www.seniorsonline.vic.gov.au/" class="list-group-item list-group-item-action fs-5 p-3" target="_blank" rel="noopener">
            Seniors Online Victoria – State-specific news, events, and resources.
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this content-focused page.
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 40vh;
  background-image: url('/images/senior-health-banner.jpg');
  background-size: cover;
  background-position: center 30%;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 86, 179, 0.5); /* A calming blue overlay */
}

.hero-content {
  position: relative; /* Ensures content is above the overlay */
  z-index: 1;
}

.health-card {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.health-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.list-group-item {
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #e9ecef;
}
</style>