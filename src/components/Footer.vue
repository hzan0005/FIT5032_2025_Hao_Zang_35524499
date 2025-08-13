<template>
  <footer class="bg-light p-3 mt-4">
    <div class="container-fixed text-center">
      <div class="row">
        <div class="col-md-4">
          <strong>Healthy Seniors</strong><br />
          <small>{{ $t('update1') }}</small>
        </div>
        <div class="col-md-4">
          <strong>{{ $t('explore') }}</strong><br />
          <small>
            {{ $t('Health Info') }}<br />
            {{ $t('Community Programs') }}<br />
            {{ $t('Digital Skills') }}
          </small>
        </div>
        <div class="col-md-4">
          <strong>{{ $t('support') }}</strong><br />
          <small>
            {{ $t('Caregiver Tools') }}<br />
            {{ $t('Help Centre') }}<br />
            Donate
          </small>
        </div>
      </div>
      <div class="text-center mt-3 small text-muted">
        © 2025 Healthy Seniors Charity — <a href="#">Privacy</a> | <a href="#">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
</style>
