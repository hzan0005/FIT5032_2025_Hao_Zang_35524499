<template>
  <div class="container py-4">
    <div class="container mt-4">

      <h1 class="fw-bold mb-4">{{ $t('nav.health') }}</h1>

      <div class="mb-4">
        <p>{{ $t('health.description') }}</p>
      </div>

      <div class="row mb-5">
        <div class="col-md-4 mb-3" v-for="n in 3" :key="n">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-semibold">
                {{ $t(`health.tip${n}`) }}
              </h5>
              <p class="card-text">{{ $t(`health.tip${n}_desc`) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <h4 class="fw-bold">{{ $t('health.tipsTitle') }}</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="n in 3" :key="n">
            {{ $t(`health.bullet${n}`) }}
          </li>
        </ul>
      </div>

      <div>
        <h4 class="fw-bold mb-3">{{ $t('health.resourcesTitle') }}</h4>
        <ul>
          <li><a href="https://www.healthdirect.gov.au/" target="_blank" rel="noopener">{{ $t('health.resources.healthdirect') }}</a></li>
          <li><a href="https://www.beyondblue.org.au/" target="_blank" rel="noopener">{{ $t('health.resources.beyondblue') }}</a></li>
          <li><a href="https://www.seniorsonline.vic.gov.au/" target="_blank" rel="noopener">{{ $t('health.resources.seniorsonline') }}</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>
