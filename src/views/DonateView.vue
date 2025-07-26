<template>
  <div class="container py-4">

    <!-- 标题 + 描述 -->
    <section class="text-center mb-5">
      <h1 class="fw-bold">{{ $t('nav.donate') }}</h1>
      <p class="text-muted fs-5">{{ $t('donate.description') }}</p>
      <p>{{ $t('donate.instructions') }}</p>
    </section>

    <!-- 捐赠方式 -->
    <section class="row justify-content-center mb-5">
      <div class="col-md-4 mb-3" v-for="method in donateMethods" :key="method.id">
        <div class="p-3 border rounded shadow-sm h-100">
          <div class="d-flex align-items-start gap-3">
            <div class="fs-2">{{ method.icon }}</div>
            <div>
              <h5 class="fw-semibold">{{ $t(`donate.${method.label}`) }}</h5>
              <p class="text-muted small">{{ $t(`donate.${method.label}_desc`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 感谢语 -->
    <section class="bg-light p-4 rounded text-center">
      <h4 class="fw-bold">{{ $t('donate.thankTitle') }}</h4>
      <p>{{ $t('donate.thankNote') }}</p>
    </section>

  </div>
</template>

<script setup>
const donateMethods = [
  { id: 1, icon: '🏦', label: 'bank' },
  { id: 2, icon: '💳', label: 'paypal' },
  { id: 3, icon: '📞', label: 'phone' }
]
</script>
