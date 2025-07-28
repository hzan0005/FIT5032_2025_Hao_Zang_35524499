<template>
  <div class="wrapper">

    <!-- Title & Introduction -->
    <section class="section center">
      <h1 class="title">Community Connections</h1>
      <p class="subtitle">
        Stay socially connected through community events, support groups, and volunteering opportunities tailored for seniors.
      </p>
    </section>

    <!-- Activities Display Area -->
    <section class="section">
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon">👥</div>
          <div class="activity-info">
            <h3 class="activity-title">Weekly Walking Groups</h3>
            <p class="activity-desc">Join other seniors for a gentle walk in the local park every Thursday morning.</p>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">🎨</div>
          <div class="activity-info">
            <h3 class="activity-title">Craft & Chat Sessions</h3>
            <p class="activity-desc">Enjoy knitting, painting, or simply chatting over tea every Tuesday afternoon.</p>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">💻</div>
          <div class="activity-info">
            <h3 class="activity-title">Tech Help for Seniors</h3>
            <p class="activity-desc">Get support learning smartphones, email, and online services every Saturday.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Participate -->
    <section class="section tips">
      <h4 class="section-title">How to Get Involved</h4>
      <div class="step">1. Check the event schedule on local community center websites.</div>
      <div class="step">2. Register online or call ahead to reserve your spot.</div>
      <div class="step">3. Bring a friend or meet new people at the venue!</div>
    </section>

    <!-- Resource Links -->
    <section class="section">
      <h4 class="section-title">Useful Community Resources</h4>
      <p><a class="link" href="https://www.seniorsonline.vic.gov.au/social" target="_blank" rel="noopener">Seniors Online Victoria – Social Events</a></p>
      <p><a class="link" href="https://www.meetup.com/topics/seniors/" target="_blank" rel="noopener">Meetup – Find Local Senior Events</a></p>
      <p><a class="link" href="https://www.volunteer.vic.gov.au/" target="_blank" rel="noopener">Volunteer Victoria – Give Back to the Community</a></p>
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
  background-color: #fff;
  color: #222;
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

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 1rem;
  border-radius: 10px;
  background-color: #f8fafd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;
}

.activity-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.activity-icon {
  font-size: 2rem;
  color: #2a6fa1;
  flex-shrink: 0;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-size: 1.15rem;
  font-weight: bold;
  margin: 0 0 0.3rem;
  color: #333;
}

.activity-desc {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

.tips {
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
  margin-bottom: 0.5rem;
  padding-left: 0.4rem;
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
