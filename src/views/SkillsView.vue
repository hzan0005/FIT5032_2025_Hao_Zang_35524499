<template>
  <div class="container py-4">

    <!-- 标题 + 描述 -->
    <section class="text-center mb-5">
      <h1 class="fw-bold">{{ $t('nav.skills') }}</h1>
      <p class="text-muted fs-5">{{ $t('skills.description') }}</p>
    </section>

    <!-- 技能课程卡片 -->
    <section class="row mb-5">
      <div class="col-md-4 mb-4" v-for="n in 3" :key="n">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title">{{ $t(`skills.course${n}`) }}</h5>
            <p class="card-text">{{ $t(`skills.course${n}_desc`) }}</p>
            <span class="badge bg-secondary">{{ $t(`skills.level${n}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 学习方式 -->
    <section class="bg-light p-4 rounded mb-5">
      <h4 class="fw-bold mb-3">{{ $t('skills.howTitle') }}</h4>
      <ul class="mb-0">
        <li>{{ $t('skills.how1') }}</li>
        <li>{{ $t('skills.how2') }}</li>
        <li>{{ $t('skills.how3') }}</li>
      </ul>
    </section>

    <!-- 推荐平台链接 -->
    <section>
      <h4 class="fw-bold mb-3">{{ $t('skills.linksTitle') }}</h4>
      <ul>
        <li><a href="https://beconnected.esafety.gov.au/" target="_blank" rel="noopener">{{ $t('skills.links.beconnected') }}</a></li>
        <li><a href="https://www.skillshare.com/" target="_blank" rel="noopener">{{ $t('skills.links.skillshare') }}</a></li>
        <li><a href="https://www.open.edu.au/" target="_blank" rel="noopener">{{ $t('skills.links.openuni') }}</a></li>
      </ul>
    </section>

  </div>
</template>

<script setup>
// 无需 JS 逻辑
</script>
