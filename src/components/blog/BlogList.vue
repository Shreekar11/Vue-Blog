<template>
  <div>
    <div v-if="isLoading">
      <div class="">Loading...</div>
    </div>

    <div v-else-if="blogs.length === 0" class="text-center py-10">
      <p class="text-gray-500">No blog posts found.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Blog } from "../../types";
import BlogCard from "./BlogCard.vue";

defineProps<{
  blogs: Blog[];
  isLoading?: boolean;
}>();
</script>
