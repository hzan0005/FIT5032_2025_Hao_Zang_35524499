<!-- HomeView.vue -->
<template>
  <div class="container mt-5">
    <div class="text-center mb-4">
      <h1 class="fw-bold">{{ $t('welcome') }}</h1>
      <p class="fs-5">{{ $t('subtitle') }}</p>
    </div>

    <hr />
    <h4 class="mb-3">{{ $t('explore') }}</h4>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="col" v-for="card in cards" :key="card.title">
        <div class="border p-3 h-100 text-center">
          <div class="border border-secondary-subtle bg-light p-2 mb-3">Image Placeholder</div>
          <h5 class="fw-semibold">{{ $t(card.title) }}</h5>
          <p class="text-muted small">{{ $t(card.description) }}</p>
        </div>
      </div>
    </div>

    <hr class="my-4" />
    <div class="row">
      <div class="col-md-6 mb-4">
        <h5 class="fw-semibold">{{ $t('updates') }}</h5>
        <p><strong>July 2025:</strong> {{ $t('update1') }}</p>
        <p><strong>June 2025:</strong> {{ $t('update2') }}</p>
      </div>
      <div class="col-md-6 mb-4">
        <h5 class="fw-semibold">{{ $t('search') }}</h5>
        <input type="text" class="form-control" :placeholder="$t('searchPlaceholder')" />
      </div>
    </div>

    <hr />
    <footer class="bg-light p-3 mt-4">
      <div class="row">
        <div class="col-md-4">
          <strong>Healthy Seniors</strong><br />
          <small>{{ $t('update1') }}</small>
        </div>
        <div class="col-md-4">
          <strong>{{ $t('explore') }}</strong><br />
          <small>{{ $t('Health Info') }}<br />{{ $t('Community Programs') }}<br />{{ $t('Digital Skills') }}</small>
        </div>
        <div class="col-md-4">
          <strong>{{ $t('support') }}</strong><br />
          <small>{{ $t('Caregiver Tools') }}<br />{{ $t('Help Centre') }}<br />Donate</small>
        </div>
      </div>
      <div class="text-center mt-3 small text-muted">
        © 2025 Healthy Seniors Charity — <a href="#">Privacy</a> | <a href="#">Terms</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
const cards = [
  { title: 'Health Info', description: 'desc1' },
  { title: 'Community Programs', description: 'desc2' },
  { title: 'Digital Skills', description: 'desc3' },
  { title: 'Caregiver Tools', description: 'desc4' }
]
</script>