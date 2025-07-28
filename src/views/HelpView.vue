<template>
  <div class="wrapper">

    <!-- Page Title & Introduction -->
    <section class="section center">
      <h1 class="title">Help & Support</h1>
      <p class="subtitle">Find answers to common questions and ways to get help using our senior wellbeing platform.</p>
    </section>

    <!-- FAQ Accordion -->
    <section class="section">
      <h4 class="section-title">❓ Frequently Asked Questions</h4>
      <div class="faq-list">
        <div class="faq-item" v-for="faq in faqs" :key="faq.id">
          <button class="faq-question" @click="toggleFAQ(faq.id)">
            {{ faq.question }}
            <span class="arrow">{{ activeFAQ === faq.id ? '▲' : '▼' }}</span>
          </button>
          <transition name="fade">
            <div v-if="activeFAQ === faq.id" class="faq-answer">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="section light">
      <h4 class="section-title">📞 Contact Us</h4>
      <div class="contact-item"><strong>Phone:</strong> 1800 123 456</div>
      <div class="contact-item"><strong>Email:</strong> support@healthyseniors.org</div>
      <div class="contact-item"><strong>Form:</strong> <a class="link" href="/contact">Contact Form</a></div>
    </section>

    <!-- Useful Links -->
    <section class="section">
      <h4 class="section-title">🌐 Useful Links</h4>
      <p><a class="link" href="https://www.servicesaustralia.gov.au/" target="_blank">Services Australia</a></p>
      <p><a class="link" href="https://www.myagedcare.gov.au/" target="_blank">My Aged Care</a></p>
      <p><a class="link" href="https://www.esafety.gov.au/seniors" target="_blank">eSafety for Seniors</a></p>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFAQ = ref(null)

const toggleFAQ = (id) => {
  activeFAQ.value = activeFAQ.value === id ? null : id
}

const faqs = [
  {
    id: 1,
    question: 'How do I create an account?',
    answer: 'Go to the Register page, fill in your details, and submit the form to create a new account.'
  },
  {
    id: 2,
    question: 'Can I update my information later?',
    answer: 'Yes, you can edit your profile information by going to the Settings page after logging in.'
  },
  {
    id: 3,
    question: 'Where can I get technical support?',
    answer: 'If you need technical help, please contact our support team via phone, email, or the contact form.'
  }
]
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

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e4e79;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.faq-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.faq-question {
  width: 100%;
  padding: 1rem;
  background-color: #e8f0f9;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1a3f66;
  transition: background-color 0.2s;
}

.faq-question:hover {
  background-color: #d7e8f5;
}

.faq-answer {
  padding: 1rem;
  background-color: #fff;
  color: #444;
  font-size: 0.95rem;
  border-top: 1px solid #ccc;
  line-height: 1.6;
}

.arrow {
  font-size: 1rem;
  color: #555;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.light {
  background-color: #f1f6fb;
  padding: 1.5rem;
  border-radius: 10px;
}

.contact-item {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.link {
  color: #0056b3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
