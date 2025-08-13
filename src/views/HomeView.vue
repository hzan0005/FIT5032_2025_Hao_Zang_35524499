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
<style scoped>
/* Card overall styling */
.border.p-3.h-100 {
  border-radius: 12px;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

.border.p-3.h-100:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

/* Image placeholder styling */
.border.bg-light.p-2.mb-3 {
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 0.9rem;
}

/* Title bold adjustment */
h5.fw-semibold {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

/* Responsive spacing adjustment */
.row-cols-1 .col,
.row-cols-md-2 .col,
.row-cols-lg-4 .col {
  padding-bottom: 1rem;
}

/* Update content style */
.col-md-6 p {
  font-size: 0.95rem;
}

/* Search input style */
input.form-control {
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s;
}

input.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.1);
}
</style>
