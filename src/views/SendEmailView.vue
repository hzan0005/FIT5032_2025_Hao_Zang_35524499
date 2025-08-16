<template>
  <div class="send-email-container py-5">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-7">
          <div class="form-wrapper p-4 p-md-5">
            <h1 class="display-5 fw-bold mb-3">Compose Email</h1>
            <p class="text-muted mb-4">
              As an administrator, use this form to send official communications to users.
            </p>

            <form ref="formRef" @submit.prevent="handleSendEmail" class="needs-validation" novalidate>
              <input type="hidden" name="from_name" value="The Healthy Seniors Team">

              <div class="mb-3">
                <label for="email-to" class="form-label">To (User's Email)</label>
                <input
                  id="email-to"
                  type="email"
                  name="user_email"
                  v-model="to"
                  class="form-control form-control-lg"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email-subject" class="form-label">Subject</label>
                <input
                  id="email-subject"
                  type="text"
                  name="subject"
                  v-model="subject"
                  class="form-control form-control-lg"
                  placeholder="e.g., Upcoming Event Reminder"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email-message" class="form-label">Message</label>
                <textarea
                  id="email-message"
                  name="message"
                  v-model="text"
                  class="form-control form-control-lg"
                  rows="5"
                  placeholder="Write your official message here..."
                  required
                ></textarea>
              </div>

              <div class="mb-4">
                <label for="email-attachment" class="form-label">Attachment</label>
                <input
                  id="email-attachment"
                  type="file"
                  name="my_file"
                  class="form-control"
                  accept=".txt,.json,.pdf,.png,.jpg,.jpeg"
                />
                <div class="form-text mt-2">Optional. Max file size: 2-5MB.</div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Sending...' : 'Send Email to User' }}
                </button>
              </div>

              <div class="mt-4" v-if="status">
                 <div class="alert" :class="status.includes('✅') ? 'alert-success' : 'alert-danger'" role="alert">
                    {{ status }}
                 </div>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-5 d-none d-lg-block">
          <div class="info-wrapper text-center">
            <img src="/images/contact-us-illustration.png" class="img-fluid mb-4" alt="Illustration of a person sending a message from a computer.">
            <h3 class="fw-bold">Admin Guidelines</h3>
            <p class="text-muted">
              Please ensure all communications are professional and adhere to our community standards.
            </p>
            <div class="list-group list-group-flush text-start mt-4">
              <div class="list-group-item">
                <strong class="text-primary">✓ Verify Email Address:</strong> Double-check the recipient's email before sending.
              </div>
              <div class="list-group-item">
                <strong class="text-primary">✓ Use Clear Subjects:</strong> Make the purpose of the email clear in the subject line.
              </div>
               <div class="list-group-item">
                <strong class="text-primary">✓ Proofread:</strong> Review your message for any spelling or grammar errors.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// The script block remains unchanged as the core logic is the same.
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_xrgsehe';
const EMAILJS_TEMPLATE_ID = 'template_jibo186';
const EMAILJS_PUBLIC_KEY  = 'B_2_mWXxDGVkkZDcT';

const to = ref('')
const subject = ref('')
const text = ref('')
const loading = ref(false)
const status = ref('')
const formRef = ref(null)

const handleSendEmail = async () => {
  if (!formRef.value.checkValidity()) {
    status.value = '❌ Please fill out all required fields.';
    formRef.value.classList.add('was-validated');
    return;
  }
  status.value = '';
  loading.value = true;
  try {
    const result = await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.value,
      { publicKey: EMAILJS_PUBLIC_KEY }
    );
    status.value = '✅ Email sent successfully!';
    console.log('SUCCESS!', result.status, result.text);
    to.value = '';
    subject.value = '';
    text.value = '';
    formRef.value.reset();
    formRef.value.classList.remove('was-validated');
  } catch (err) {
    status.value = '❌ Failed to send email: ' + (err?.text || err?.message || String(err));
    console.error('FAILED...', err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.send-email-container {
  background-color: #f0f2f5;
}
.form-wrapper {
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
.form-control-lg {
  padding: 0.8rem 1rem;
  font-size: 1rem;
}
.btn-lg {
  padding: 0.8rem 1.5rem;
  font-weight: 600;
}
</style>