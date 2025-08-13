<template>
  <div class="container py-5">
    <h2 class="mb-4 fw-bold">📧 Send Email with Attachment</h2>

    <form ref="formRef" @submit.prevent="handleSendEmail" class="needs-validation" novalidate>
      <!-- 收件人（写入模板变量，也可放入 message 中） -->
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

      <!-- 附件：name 必须有；EmailJS 会自动把文件作为附件 -->
      <div class="mb-3">
        <label class="form-label">Attachment</label>
        <input
          type="file"
          name="my_file"
          class="form-control"
          accept=".txt,.json,.pdf,.png,.jpg,.jpeg"
          required
        />
        <div class="form-text">常见免费额度附件大小有限，建议 < 2–5MB。</div>
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
const EMAILJS_SERVICE_ID  = 'service_xxx'
const EMAILJS_TEMPLATE_ID = 'template_xxx'
const EMAILJS_PUBLIC_KEY  = 'mYpUbLiCkEy'

const to = ref('')
const subject = ref('')
const text = ref('')
const loading = ref(false)
const status = ref('')
const formRef = ref(null)

const handleSendEmail = async () => {
  if (!formRef.value) return
  loading.value = true
  status.value = ''

  try {
    // 直接把整个 <form> 交给 EmailJS，它会连附件一起发送
    const result = await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.value,
      { publicKey: EMAILJS_PUBLIC_KEY }
    )

    // 这里的 result.text 通常为 "OK"
    status.value = '✅ Email sent successfully!'
    // 成功后清空
    to.value = ''
    subject.value = ''
    text.value = ''
    // 直接清空表单里的文件
    formRef.value.reset()
  } catch (err) {
    status.value = '❌ Failed to send email: ' + (err?.text || err?.message || String(err))
  } finally {
    loading.value = false
  }
}
</script>
