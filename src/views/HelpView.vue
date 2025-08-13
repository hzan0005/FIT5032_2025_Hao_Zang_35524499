<template>
  <div class="container py-4">

    <!-- Title -->
    <section class="text-center mb-5">
      <h1 class="fw-bold">{{ $t('nav.help') }}</h1>
      <p class="text-muted fs-5">{{ $t('help.description') }}</p>
    </section>

    <!-- FAQ Accordion -->
    <section class="mb-5">
      <h4 class="fw-bold mb-3">❓ {{ $t('help.faqTitle') }}</h4>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item" v-for="n in 3" :key="n">
          <h2 class="accordion-header" :id="`faqHeading${n}`">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#faqCollapse${n}`" aria-expanded="false" :aria-controls="`faqCollapse${n}`">
              {{ $t(`help.faq${n}`) }}
            </button>
          </h2>
          <div :id="`faqCollapse${n}`" class="accordion-collapse collapse" :aria-labelledby="`faqHeading${n}`"
               data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              {{ $t(`help.faq${n}_answer`) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="bg-light p-4 rounded mb-5">
      <h4 class="fw-bold mb-3">📞 {{ $t('help.contactTitle') }}</h4>
      <ul class="mb-0">
        <li>{{ $t('help.phone') }}: 1800 123 456</li>
        <li>{{ $t('help.email') }}: support@healthyseniors.org</li>
        <li>{{ $t('help.form') }}: <a href="/contact">{{ $t('help.contactForm') }}</a></li>
      </ul>
    </section>

    <!-- Useful Links -->
    <section>
      <h4 class="fw-bold mb-3">🌐 {{ $t('help.linksTitle') }}</h4>
      <div class="list-group">
        <a class="list-group-item list-group-item-action" href="https://www.servicesaustralia.gov.au/" target="_blank">Services Australia</a>
        <a class="list-group-item list-group-item-action" href="https://www.myagedcare.gov.au/" target="_blank">My Aged Care</a>
        <a class="list-group-item list-group-item-action" href="https://www.esafety.gov.au/seniors" target="_blank">eSafety for Seniors</a>
      </div>
    </section>

  </div>
</template>

<script setup>
// No JS needed
</script>

