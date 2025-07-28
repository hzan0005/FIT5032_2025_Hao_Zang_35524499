<template>
  <div class="wrapper">

    <!-- Page Title & Introduction -->
    <section class="section center">
      <h1 class="title">Health & Wellbeing</h1>
      <p class="subtitle">
        Practical health advice and official resources tailored for senior wellbeing.
        This page helps older adults maintain physical, mental, and emotional health with simple tips and useful links.
      </p>
    </section>

    <!-- Three Health Cards -->
    <section class="card-grid">
      <div class="card">
        <h3 class="card-title">Stay Physically Active</h3>
        <p class="card-text">Regular walking, gardening, or gentle exercises can help maintain mobility, improve balance, and reduce joint pain.</p>
      </div>
      <div class="card">
        <h3 class="card-title">Eat a Balanced Diet</h3>
        <p class="card-text">Choose high-fiber foods, fresh vegetables, whole grains, and lean proteins to support digestion and overall health.</p>
      </div>
      <div class="card">
        <h3 class="card-title">Stay Mentally Engaged</h3>
        <p class="card-text">Keep your mind active by reading, solving puzzles, talking to friends, and learning new skills or hobbies.</p>
      </div>
    </section>

    <!-- Helpful Tips -->
    <section class="section tips">
      <h4 class="section-title">Helpful Tips</h4>
      <div class="tip">🩺 Schedule regular health checkups with your GP.</div>
      <div class="tip">💊 Take your medications on time and keep a daily checklist.</div>
      <div class="tip">💧 Stay hydrated, especially during warmer months.</div>
    </section>

    <!-- Official Resources -->
    <section class="section">
      <h4 class="section-title">Trusted Health Resources</h4>
      <p><a class="link" href="https://www.healthdirect.gov.au/" target="_blank" rel="noopener">Healthdirect – Government Health Advice</a></p>
      <p><a class="link" href="https://www.beyondblue.org.au/" target="_blank" rel="noopener">Beyond Blue – Mental Health Support</a></p>
      <p><a class="link" href="https://www.seniorsonline.vic.gov.au/" target="_blank" rel="noopener">Seniors Online – Victoria's Senior Services</a></p>
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
  font-family: 'Segoe UI', Tahoma, sans-serif;
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
  font-size: 2.5rem;
  font-weight: bold;
  color: #2a6fa1;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
  max-width: 720px;
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
  background: #fdfdfd;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex: 1;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2a6fa1;
}

.card-text {
  font-size: 0.96rem;
  color: #444;
  line-height: 1.5;
}

.tips {
  background-color: #f4f8fc;
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
  margin-bottom: 0.6rem;
  padding-left: 0.3rem;
}

.link {
  color: #1a6ed8;
  text-decoration: none;
  font-size: 1rem;
}

.link:hover {
  text-decoration: underline;
}
</style>
