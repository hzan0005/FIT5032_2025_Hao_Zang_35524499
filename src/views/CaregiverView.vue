<template>
  <div class="wrapper">

    <!-- Title & Introduction -->
    <section class="section center">
      <h1 class="title">Caregiver Support</h1>
      <p class="subtitle">
        Find practical resources, mental health support, and helpful tips to assist in caring for your loved ones.
      </p>
    </section>

    <!-- Common Resource Cards -->
    <section class="card-grid">
      <div class="card">
        <div class="card-icon">🧰</div>
        <div class="card-content">
          <h3 class="card-title">Carer Payments & Services</h3>
          <p class="card-text">Learn about financial support and respite services available for caregivers in Australia.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-icon">🧰</div>
        <div class="card-content">
          <h3 class="card-title">Caring for Dementia</h3>
          <p class="card-text">Understand common dementia symptoms and how to support individuals living with dementia.</p>
        </div>
      </div>
      <div class="card">
        <div class="card-icon">🧰</div>
        <div class="card-content">
          <h3 class="card-title">Caregiver Mental Health</h3>
          <p class="card-text">Access tools to manage stress, burnout, and emotional fatigue as a long-term caregiver.</p>
        </div>
      </div>
    </section>

    <!-- Caregiving Tips -->
    <section class="section light">
      <h4 class="section-title">💡 Caregiving Tips</h4>
      <div class="tip">1. Set boundaries and take short breaks to avoid burnout.</div>
      <div class="tip">2. Join a local or online caregiver support group.</div>
      <div class="tip">3. Keep a daily care journal to monitor needs and progress.</div>
    </section>

    <!-- Recommended Links -->
    <section class="section">
      <h4 class="section-title">Recommended Resources</h4>
      <p><a class="link" href="https://www.carergateway.gov.au/" target="_blank" rel="noopener">Carer Gateway – Australian Government Support</a></p>
      <p><a class="link" href="https://www.dementia.org.au/" target="_blank" rel="noopener">Dementia Australia – Resources & Helpline</a></p>
      <p><a class="link" href="https://www.headtohealth.gov.au/" target="_blank" rel="noopener">Head to Health – Mental Wellbeing Support</a></p>
    </section>

  </div>
</template>

<script setup>
// No logic
</script>

<style scoped>
.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  color: #222;
  background-color: #fff;
}

.section {
  margin-bottom: 3rem;
}

.center {
  text-align: center;
}

.title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2a6fa1;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.card-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .card-grid {
    flex-direction: row;
  }
}

.card {
  flex: 1;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-icon {
  font-size: 2rem;
  margin-top: 0.2rem;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
}

.card-text {
  font-size: 0.95rem;
  color: #444;
}

.light {
  background-color: #f1f6fb;
  padding: 1.5rem;
  border-radius: 10px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e4e79;
}

.tip {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.link {
  color: #0056b3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
