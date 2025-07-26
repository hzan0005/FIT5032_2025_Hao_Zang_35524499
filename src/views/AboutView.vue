<!-- AboutView.vue -->
<template>
  <div>
    <!-- 页面内容主体 -->
    <div class="container mt-5 pt-4">
      <div class="text-center mb-4">
        <h1 class="fw-bold">{{ $t('nav.about') }}</h1>
        <p class="fs-5">
          We are dedicated to empowering older Australians with access to
          health, digital, and community services that enhance their quality of life.
        </p>
      </div>

      <hr />
      <div class="row g-4">
        <div class="col-md-6">
          <h4 class="fw-semibold">Our Mission</h4>
          <p>
            Our mission is to help seniors live healthier, more connected, and independent lives. We aim to bridge the digital divide,
            support chronic disease self-management, and create inclusive community spaces.
          </p>
        </div>
        <div class="col-md-6">
          <h4 class="fw-semibold">What We Offer</h4>
          <ul>
            <li>Trusted health advice and wellness tips</li>
            <li>Access to digital skills workshops and guides</li>
            <li>Community engagement programs to reduce isolation</li>
            <li>Resources for caregivers and family support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 顶部导航栏和辅助设置栏由 App.vue 全局渲染，始终置于页面最顶端
</script>