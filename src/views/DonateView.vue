<template>
  <div class="wrapper">

    <!-- Page Title & Introduction -->
    <section class="section center">
      <h1 class="title">Make a Donation</h1>
      <p class="subtitle">Support our senior community by contributing to programs that promote health, skills, and social connections.</p>
      <p class="paragraph">Your donations help us organize more events, offer training, and provide assistance to those in need.</p>
    </section>

    <!-- Donation Methods Display -->
    <section class="donation-grid">
      <div class="donation-card" v-for="method in donateMethods" :key="method.id">
        <div class="donation-icon">{{ method.icon }}</div>
        <div>
          <h3 class="donation-title">{{ method.title }}</h3>
          <p class="donation-desc">{{ method.description }}</p>
        </div>
      </div>
    </section>

    <!-- Thank You Message -->
    <section class="section light center">
      <h4 class="section-title">🙏 Thank You for Your Support!</h4>
      <p class="paragraph">Every contribution, big or small, makes a difference in the lives of older adults in our community.</p>
    </section>

  </div>
</template>

<script setup>
const donateMethods = [
  {
    id: 1,
    icon: '🏦',
    title: 'Direct Bank Transfer',
    description: 'Donate directly to our organization’s bank account. Contact us for banking details.'
  },
  {
    id: 2,
    icon: '💳',
    title: 'PayPal or Credit Card',
    description: 'Use our secure online platform to donate via PayPal or major credit cards.'
  },
  {
    id: 3,
    icon: '📞',
    title: 'Phone Donation',
    description: 'Call us and donate over the phone with the assistance of a support team member.'
  }
]
</script>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  color: #222;
  background-color: #fafafa;
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
  margin: 0 auto 1rem;
  line-height: 1.6;
}

.paragraph {
  font-size: 1rem;
  color: #444;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

.donation-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .donation-grid {
    flex-direction: row;
  }
}

.donation-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1;
  transition: transform 0.2s ease;
}

.donation-card:hover {
  transform: translateY(-2px);
}

.donation-icon {
  font-size: 2rem;
}

.donation-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
}

.donation-desc {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
}

.light {
  background-color: #f1f6fb;
  padding: 1.5rem;
  border-radius: 10px;
}

.section-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1e4e79;
}
</style>
