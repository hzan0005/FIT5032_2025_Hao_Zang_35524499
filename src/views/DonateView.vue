<template>
  <div class="donate-page">
    <section class="hero-section text-center py-5">
      <div class="container">
        <h1 class="display-4 fw-bold">Support Our Mission</h1>
        <p class="lead text-muted my-4">
          Your generous donation empowers seniors in our community to live healthier, more connected, and independent lives. Every contribution, no matter the size, makes a real difference.
        </p>
        <img src="/images/donation-impact-hands.jpg" class="hero-image rounded shadow-lg" alt="Hands of different generations holding a plant, symbolizing growth and support.">
      </div>
    </section>

    <div class="container py-5">
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-4">Ways to Give</h2>
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="donate-card text-center p-4 h-100">
              <div class="fs-1">💳</div>
              <h4 class="fw-semibold my-3">Donate Online</h4>
              <p class="text-muted">The quickest and most secure way to make a difference. We accept all major credit cards and PayPal through our secure portal.</p>
              <button class="btn btn-primary mt-auto">Secure Online Donation</button>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="donate-card text-center p-4 h-100">
              <div class="fs-1">🏦</div>
              <h4 class="fw-semibold my-3">Bank Transfer</h4>
              <p class="text-muted">You can make a direct deposit to our bank account. Please use your name as the reference.</p>
              <div class="text-start bg-light p-3 rounded small mt-auto">
                <strong>Account Name:</strong> Healthy Seniors<br>
                <strong>BSB:</strong> 012-345<br>
                <strong>Account:</strong> 6789-1011
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="donate-card text-center p-4 h-100">
              <div class="fs-1">📞</div>
              <h4 class="fw-semibold my-3">By Phone</h4>
              <p class="text-muted">Our friendly team is happy to assist you with your donation over the phone during business hours.</p>
              <a href="tel:1800123456" class="btn btn-outline-primary mt-auto">Call Us: 1800 123 456</a>
            </div>
          </div>
        </div>
      </section>

      <section class="text-center bg-light p-5 rounded">
         <img src="/images/community-thank-you.jpg" class="thank-you-image mb-4" alt="A diverse group of happy seniors smiling and waving.">
        <h2 class="fw-bold">Thank You for Your Support</h2>
        <p class="fs-5 text-muted">
          Your kindness helps us provide essential services, from digital literacy workshops to community health programs. Together, we are building a stronger, more supportive community.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
// No script logic is needed for this static informational page.
</script>

<style scoped>
.donate-page {
  background-color: #ffffff;
}

.hero-section {
  background-color: #f8f9fa;
}

.hero-image {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
}

.donate-card {
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.donate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.thank-you-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid #ffffff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
</style>