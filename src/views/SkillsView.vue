<template>
  <div class="wrapper">

    <!-- Page Title -->
    <section class="section center">
      <h1 class="title">Skills & Learning</h1>
      <p class="subtitle">
        Discover new skills and continue learning through free or low-cost online courses tailored for older adults.
      </p>
    </section>

    <!-- Skill Cards -->
    <section class="card-grid">
      <div class="card">
        <h3 class="card-title">Basic Computer Skills</h3>
        <p class="card-text">Learn to use email, browse the internet, and manage simple computer tasks confidently.</p>
        <span class="badge badge-beginner">Beginner</span>
      </div>
      <div class="card">
        <h3 class="card-title">Online Safety Essentials</h3>
        <p class="card-text">Understand how to protect your privacy, recognize scams, and shop safely online.</p>
        <span class="badge badge-intermediate">Intermediate</span>
      </div>
      <div class="card">
        <h3 class="card-title">Creative Skills</h3>
        <p class="card-text">Explore hobbies like photography, storytelling, or design using beginner-friendly tools.</p>
        <span class="badge badge-flexible">Flexible</span>
      </div>
    </section>

    <!-- Learning Methods -->
    <section class="section light">
      <h4 class="section-title">How to Start Learning</h4>
      <div class="step">1. Choose a topic that interests you and matches your comfort level.</div>
      <div class="step">2. Visit the platform and create a free account if needed.</div>
      <div class="step">3. Set a regular schedule to stay consistent and track your progress.</div>
    </section>

    <!-- Learning Platform Links -->
    <section class="section">
      <h4 class="section-title">Recommended Learning Platforms</h4>
      <p><a class="link" href="https://beconnected.esafety.gov.au/" target="_blank">Be Connected – Digital Skills for Older Australians</a></p>
      <p><a class="link" href="https://www.skillshare.com/" target="_blank">Skillshare – Creative and Practical Courses</a></p>
      <p><a class="link" href="https://www.open.edu.au/" target="_blank">Open Universities Australia – Free Online Courses</a></p>
    </section>

  </div>
</template>

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
  font-size: 2.4rem;
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
  flex: 1;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.card-text {
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.8rem;
}

.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: #fff;
}

.badge-beginner {
  background-color: #28a745;
}

.badge-intermediate {
  background-color: #ffc107;
  color: #000;
}

.badge-flexible {
  background-color: #007bff;
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

.step {
  font-size: 1rem;
  margin-bottom: 0.6rem;
}

.link {
  color: #1a6ed8;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
