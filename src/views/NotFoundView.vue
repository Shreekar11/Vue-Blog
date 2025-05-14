<template>
  <DefaultLayout>
    <div class="max-w-md mx-auto text-center py-12">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p class="text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <BaseButton @click="$router.push('/')"> Go to Homepage </BaseButton>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import BaseButton from "../components/ui/BaseButton.vue";
</script>
