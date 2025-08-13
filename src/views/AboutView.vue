<template>
  <div class="about-us-page">
    <section class="header-section text-center py-5 bg-light">
      <div class="container">
        <h1 class="display-4 fw-bold">About Us</h1>
        <p class="lead text-muted mt-3 mx-auto" style="max-width: 800px;">
          We are a dedicated non-profit organization committed to empowering older Australians. Our goal is to enhance their quality of life by providing accessible health information, digital skills training, and vibrant community programs.
        </p>
      </div>
    </section>

    <section class="mission-section py-5">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <h2 class="fw-bold">Our Mission</h2>
            <p class="fs-5 text-secondary">
              To foster a society where seniors live with dignity, connection, and independence. We strive to bridge the digital divide, promote self-managed wellness, and build inclusive communities that celebrate the value and wisdom of every individual.
            </p>
          </div>
          <div class="col-lg-6">
            <img src="/images/our-mission-image.jpg" class="img-fluid rounded shadow-lg" alt="A group of smiling seniors engaged in a community activity.">
          </div>
        </div>
      </div>
    </section>

    <section class="values-section py-5 bg-light">
        <div class="container">
            <h2 class="text-center fw-bold mb-5">Our Core Values</h2>
            <div class="row text-center">
                <div class="col-md-4 mb-4">
                    <div class="value-card p-4 h-100">
                        <div class="icon-bg mb-3">❤️</div>
                        <h4 class="fw-semibold">Compassion</h4>
                        <p class="text-muted">We approach everything we do with empathy, kindness, and a deep respect for the individuals we serve.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="value-card p-4 h-100">
                         <div class="icon-bg mb-3">💡</div>
                        <h4 class="fw-semibold">Empowerment</h4>
                        <p class="text-muted">We provide the tools and knowledge necessary for seniors to feel confident and in control of their lives.</p>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="value-card p-4 h-100">
                         <div class="icon-bg mb-3">🤝</div>
                        <h4 class="fw-semibold">Community</h4>
                        <p class="text-muted">We believe in the power of connection and work to create a welcoming and supportive network for all.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="team-section py-5">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 order-lg-2">
            <h2 class="fw-bold">Meet Our Team</h2>
            <p class="fs-5 text-secondary">
             Our organization is powered by a dedicated team of passionate staff and volunteers. We are social workers, digital literacy trainers, program coordinators, and community members united by a common goal: to support and uplift seniors in our community.
            </p>
          </div>
          <div class="col-lg-6 order-lg-1">
            <img src="/images/our-team-image.jpg" class="img-fluid rounded shadow-lg" alt="A diverse and happy team of staff and volunteers.">
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// No script logic is needed.
</script>

<style scoped>
.about-us-page {
  background-color: #ffffff;
}
.header-section, .values-section {
  background-color: #f8f9fa;
}

.value-card {
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  transition: transform 0.3s, box-shadow 0.3s;
}
.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.07);
}
.icon-bg {
    font-size: 2.5rem;
    line-height: 1;
}

h2 {
    color: #343a40;
}
</style>