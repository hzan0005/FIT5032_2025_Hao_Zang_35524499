<template>
  <div class="container py-5">
    <h2 class="mb-4 fw-bold">📧 Send Email with Attachment</h2>

    <form ref="formRef" @submit.prevent="handleSendEmail" class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label">To (Recipient Email)</label>
        <input
          type="email"
          name="user_email"
          v-model="to"
          class="form-control"
          placeholder="receiver@example.com"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Subject</label>
        <input
          type="text"
          name="subject"
          v-model="subject"
          class="form-control"
          placeholder="Subject here"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea
          name="message"
          v-model="text"
          class="form-control"
          rows="4"
          placeholder="Write your message..."
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Attachment</label>
        <input
          type="file"
          name="my_file"
          class="form-control"
          accept=".txt,.json,.pdf,.png,.jpg,.jpeg"
          required
        />
        <div class="form-text">免费额度的附件大小有限，建议小于 2-5MB。</div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Email' }}
      </button>

      <p class="mt-3" v-if="status">{{ status }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

// ★★★ 把这三个常量替换成你在 EmailJS 控制台的实际值 ★★★
const EMAILJS_SERVICE_ID  = 'service_xrgsehe';      // 替换成你的 Service ID
const EMAILJS_TEMPLATE_ID = 'template_jibo186';     // 替换成你的 Template ID
const EMAILJS_PUBLIC_KEY  = 'B_2_mWXxDGVkkZDcT';      // 替换成你的 Public Key

const to = ref('')
const subject = ref('')
const text = ref('')
const loading = ref(false)
const status = ref('')
const formRef = ref(null)

const handleSendEmail = async () => {
  if (!formRef.value || !formRef.value.checkValidity()) {
    status.value = '❌ Please fill out all required fields.';
    formRef.value.classList.add('was-validated');
    return;
  }
  loading.value = true
  status.value = ''

  try {
    // 直接把整个 <form> 的 DOM 元素交给 EmailJS
    // 它会自动收集表单数据（包括文件附件）并发送
    const result = await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.value,
      { publicKey: EMAILJS_PUBLIC_KEY }
    );

    status.value = '✅ Email sent successfully!';
    console.log('SUCCESS!', result.status, result.text);

    // 发送成功后清空表单
    to.value = '';
    subject.value = '';
    text.value = '';
    formRef.value.reset(); // 这个方法会清空所有输入，包括文件
    formRef.value.classList.remove('was-validated');

  } catch (err) {
    status.value = '❌ Failed to send email: ' + (err?.text || err?.message || String(err));
    console.error('FAILED...', err);
  } finally {
    loading.value = false;
  }
}
</script>