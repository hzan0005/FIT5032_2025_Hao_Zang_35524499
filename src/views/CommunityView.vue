<template>
  <div class="container py-4">

    <!-- 标题 + 简介 -->
    <section class="mb-5 text-center">
      <h1 class="fw-bold">{{ $t('nav.community') }}</h1>
      <p class="text-muted fs-5 mt-2">{{ $t('community.description') }}</p>
    </section>

    <!-- 活动展示（创新横向排列） -->
    <section class="mb-5">
      <div class="d-flex flex-column gap-4">
        <div class="d-flex align-items-start gap-3 border-bottom pb-3" v-for="n in 3" :key="n">
          <div class="fs-2 text-primary">👥</div>
          <div>
            <h5 class="mb-1 text-dark">{{ $t(`community.event${n}`) }}</h5>
            <p class="mb-0 text-secondary">{{ $t(`community.event${n}_desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 如何参与 -->
    <section class="bg-light rounded p-4 mb-5">
      <h4 class="fw-bold mb-3">{{ $t('community.joinTitle') }}</h4>
      <ol class="ps-3">
        <li class="mb-2">{{ $t('community.join1') }}</li>
        <li class="mb-2">{{ $t('community.join2') }}</li>
        <li class="mb-2">{{ $t('community.join3') }}</li>
      </ol>
    </section>

    <!-- 资源链接 -->
    <section>
      <h4 class="fw-bold mb-3">{{ $t('community.linksTitle') }}</h4>
      <div class="list-group">
        <a
          class="list-group-item list-group-item-action"
          v-for="(label, key) in communityLinks"
          :key="key"
          :href="label.url"
          target="_blank"
          rel="noopener"
        >
          🌐 {{ label.text }}
        </a>
      </div>
    </section>

  </div>
</template>

<script setup>
const communityLinks = {
  seniorsOnline: {
    text: 'Seniors Online Victoria – Social Events',
    url: 'https://www.seniorsonline.vic.gov.au/social'
  },
  meetup: {
    text: 'Meetup – Find Local Senior Events',
    url: 'https://www.meetup.com/topics/seniors/'
  },
  volunteer: {
    text: 'Volunteer Victoria – Give Back to the Community',
    url: 'https://www.volunteer.vic.gov.au/'
  }
}
</script>
