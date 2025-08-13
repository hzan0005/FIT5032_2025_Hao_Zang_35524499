<template>
  <div class="help-view-container py-5">
    <div class="container">

      <section class="text-center mb-5">
        <h1 class="display-5 fw-bold">Help & Support Center</h1>
        <p class="lead text-muted mt-3">
          We're here to help. Find answers to your questions and learn how to get the most out of our services.
        </p>
      </section>

      <div class="row g-5">
        <div class="col-lg-8">
          <h2 class="fw-bold mb-4">Frequently Asked Questions</h2>
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="faqHeading1">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1">
                  How do I register for an event or workshop?
                </button>
              </h2>
              <div id="faqCollapse1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  You can register for any event by navigating to the "Community" or "Digital Skills" page. Find the event you're interested in and click the "Register" or "Learn More" button. You must be logged into your account to complete the registration.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="faqHeading2">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2">
                  Is my personal information secure?
                </button>
              </h2>
              <div id="faqCollapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  Absolutely. We take your privacy very seriously. All personal data is encrypted and stored securely. We never share your information with third parties without your explicit consent. You can read our full Privacy Policy for more details.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="faqHeading3">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3">
                  How can I become a volunteer?
                </button>
              </h2>
              <div id="faqCollapse3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  We're thrilled you're interested in volunteering! Please visit our "Caregiver & Support" page to see our volunteer roles and find a link to the Volunteer Victoria portal where you can apply. We're always looking for passionate individuals to join our team.
                </div>
              </div>
            </div>
          </div>
           <div class="mt-4">
              <img src="/images/faq-section-image.jpg" class="img-fluid rounded" alt="A group of diverse people in a discussion.">
           </div>
        </div>

        <div class="col-lg-4">
          <div class="support-card p-4 mb-4 text-center">
            <img src="/images/friendly-support-staff.jpg" class="support-avatar mb-3" alt="A friendly support staff member">
            <h4 class="fw-bold">Need Direct Assistance?</h4>
            <p class="text-muted">Our support team is ready to help you with any issue.</p>
            <div class="d-grid gap-2">
               <a href="tel:1800123456" class="btn btn-primary">📞 Call Us: 1800 123 456</a>
               <a href="mailto:support@healthyseniors.org" class="btn btn-outline-primary">✉️ Email Us</a>
            </div>
          </div>

          <div class="support-card p-4">
            <h4 class="fw-bold mb-3">Quick Links</h4>
            <div class="list-group list-group-flush">
              <a href="https://www.servicesaustralia.gov.au/" class="list-group-item list-group-item-action" target="_blank">Services Australia</a>
              <a href="https://www.myagedcare.gov.au/" class="list-group-item list-group-item-action" target="_blank">My Aged Care</a>
              <a href="https://www.esafety.gov.au/seniors" class="list-group-item list-group-item-action" target="_blank">eSafety for Seniors</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// No JS logic is needed for this page.
</script>

<style scoped>
.help-view-container {
  background-color: #ffffff;
}

.accordion-button:not(.collapsed) {
  color: #0d6efd;
  background-color: #e7f1ff;
}

.accordion-item {
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  margin-bottom: 1rem;
}
.accordion-header {
  border-radius: 0.5rem;
}
.accordion-button {
  border-radius: 0.5rem;
}

.support-card {
  background-color: #f8f9fa;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
}

.support-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>