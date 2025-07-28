<template>
  <div class="container">

    <!-- Welcome Title -->
    <section class="text-center mt-1 mb-4">
      <h1 class="title">{{ $t('welcome') }}</h1>
      <p class="subtitle">{{ $t('subtitle') }}</p>
    </section>

    <hr />

    <!-- Cards -->
    <section>
      <h4 class="section-heading">{{ $t('explore') }}</h4>
      <div class="card-grid">
        <div class="card-item" v-for="card in cards" :key="card.title">
          <div class="card-placeholder">Image Placeholder</div>
          <h5 class="card-title">{{ $t(card.title) }}</h5>
          <p class="card-desc">{{ $t(card.description) }}</p>
        </div>
      </div>
    </section>

    <hr class="my-4" />

    <!-- Updates & Search -->
    <section class="row-section">
      <div class="half">
        <h5 class="section-heading">{{ $t('updates') }}</h5>
        <p><strong>July 2025:</strong> {{ $t('update1') }}</p>
        <p><strong>June 2025:</strong> {{ $t('update2') }}</p>
      </div>
      <div class="half">
        <h5 class="section-heading">{{ $t('search') }}</h5>
        <input type="text" class="search-input" :placeholder="$t('searchPlaceholder')" />
      </div>
    </section>

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
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  color: #222;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2a6fa1;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
  max-width: 680px;
  margin: 0 auto;
}

.section-heading {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1e4e79;
  margin-bottom: 1rem;
}

/* Card layout */
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-bottom: 2rem;
}

.card-item {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s;
  text-align: center;
}

.card-item:hover {
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
}

.card-placeholder {
  height: 120px;
  background-color: #f1f6fb;
  color: #889;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.95rem;
  color: #666;
}

/* Update & Search section */
.row-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .row-section {
    flex-direction: row;
  }
}

.half {
  flex: 1;
}

.half p {
  font-size: 0.95rem;
  color: #444;
}

.search-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2a6fa1;
  box-shadow: 0 0 0 0.15rem rgba(42, 111, 161, 0.2);
}
</style>
