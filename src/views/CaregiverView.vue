<template>
  <div class="container py-4">

    <!-- 简介 -->
    <section class="text-center mb-5">
      <h1 class="fw-bold">{{ $t('nav.caregiver') }}</h1>
      <p class="text-muted fs-5">{{ $t('caregiver.description') }}</p>
    </section>

    <!-- 常用资源区块 -->
    <section class="row mb-5">
      <div class="col-md-4 mb-4" v-for="n in 3" :key="n">
        <div class="p-3 border rounded shadow-sm h-100">
          <div class="d-flex align-items-start gap-3">
            <div class="fs-1">🧰</div>
            <div>
              <h5 class="fw-semibold">{{ $t(`caregiver.resource${n}`) }}</h5>
              <p class="text-muted small">{{ $t(`caregiver.resource${n}_desc`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关怀建议 -->
    <section class="bg-light p-4 rounded mb-5">
      <h4 class="fw-bold mb-3">💡 {{ $t('caregiver.tipsTitle') }}</h4>
      <ul class="mb-0">
        <li class="mb-2">{{ $t('caregiver.tip1') }}</li>
        <li class="mb-2">{{ $t('caregiver.tip2') }}</li>
        <li class="mb-2">{{ $t('caregiver.tip3') }}</li>
      </ul>
    </section>

    <!-- 推荐平台 -->
    <section>
      <h4 class="fw-bold mb-3">{{ $t('caregiver.linksTitle') }}</h4>
      <div class="list-group">
        <a
          class="list-group-item list-group-item-action"
          v-for="(link, key) in caregiverLinks"
          :key="key"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          🌐 {{ link.text }}
        </a>
      </div>
    </section>

  </div>
</template>

<script setup>
const caregiverLinks = {
  carerGateway: {
    text: "Carer Gateway – Australian Government Support",
    url: "https://www.carergateway.gov.au/"
  },
  dementiaAustralia: {
    text: "Dementia Australia – Resources & Helpline",
    url: "https://www.dementia.org.au/"
  },
  headtohealth: {
    text: "Head to Health – Mental Wellbeing Support",
    url: "https://www.headtohealth.gov.au/"
  }
}
</script>
