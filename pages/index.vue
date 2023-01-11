<template>
  <div class="h-full min-h-full">

    <div class="overflow-hidden">
      <main>
        <HeroSection />
        <LazyFeaturesSection class="hidden" />
        <LazyBlogSection class="hidden" />
      </main>

      <FooterSection class="hidden sm:block" />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })
</script>
