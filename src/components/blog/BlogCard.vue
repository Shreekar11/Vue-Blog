<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
  >
    <img
      v-if="blog.imageUrl"
      :src="blog.imageUrl"
      :alt="blog.title"
      class="w-full h-48 object-cover"
    />

    <div class="p-5">
      <div class="flex items-center space-x-2 mb-2">
        <span
          v-for="tag in blog.tags.slice(0, 2)"
          :key="tag"
          class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
        >
          {{ tag }}
        </span>
        <span
          v-if="blog.tags.length > 2"
          class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
        >
          +{{ blog.tags.length - 2 }}
        </span>
      </div>

      <h3 class="text-xl font-bold mb-2 hover:text-blue-600">
        <router-link :to="{ name: 'blog-detail', params: { id: blog.id } }">
          {{ blog.title }}
        </router-link>
      </h3>

      <p class="text-gray-600 mb-4">{{ blog.excerpt }}</p>

      <div class="flex justify-between items-center">
        <span class="text-gray-500 text-sm">
          {{ formatDate(blog.createdAt) }}
        </span>
        <router-link
          :to="{ name: 'blog-detail', params: { id: blog.id } }"
          class="text-blue-600 hover:text-blue-800 flex items-center"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Blog } from "../../types";

const props = defineProps<{
  blog: Blog;
}>();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
</script>