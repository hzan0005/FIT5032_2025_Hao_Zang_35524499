<!-- AboutView.vue -->
<template>
  <div>
    <!-- Main page content -->
    <div class="container mt-5 pt-4">
      <div class="text-center mb-4">
        <h1 class="fw-bold">{{ $t('nav.about') }}</h1>
        <p class="fs-5">
          We are dedicated to empowering older Australians with access to
          health, digital, and community services that enhance their quality of life.
        </p>
      </div>

      <hr />
      <div class="row g-4">
        <div class="col-md-6">
          <h4 class="fw-semibold">Our Mission</h4>
          <p>
            Our mission is to help seniors live healthier, more connected, and independent lives. We aim to bridge the digital divide,
            support chronic disease self-management, and create inclusive community spaces.
          </p>
        </div>
        <div class="col-md-6">
          <h4 class="fw-semibold">What We Offer</h4>
          <ul>
            <li>Trusted health advice and wellness tips</li>
            <li>Access to digital skills workshops and guides</li>
            <li>Community engagement programs to reduce isolation</li>
            <li>Resources for caregivers and family support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  background-color: #fdfdfd;
  padding: 2rem 1rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
}

h1.fw-bold {
  font-size: 2.2rem;
  color: #2c3e50;
}

p.fs-5 {
  color: #555;
  font-size: 1.1rem;
  max-width: 720px;
  margin: auto;
}

h4.fw-semibold {
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 1rem;
}

p, li {
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
}

ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}

ul li {
  margin-bottom: 0.6rem;
}
</style>
