<template>
  <DefaultLayout>
    <div v-if="isLoading" class="flex justify-center">
      <LoadingSpinner />
    </div>

    <div v-else-if="!blog" class="text-center py-10">
      <h2 class="text-2xl font-bold mb-4">Blog post not found</h2>
      <p class="text-gray-600 mb-6">
        The blog post you're looking for doesn't exist or has been removed.
      </p>
      <router-link to="/blog" class="text-blue-500 hover:underline">
        Go back to all blogs
      </router-link>
    </div>

    <div v-else class="max-w-3xl mx-auto">
      <img
        v-if="blog.imageUrl"
        :src="blog.imageUrl"
        :alt="blog.title"
        class="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 class="text-3xl font-bold mb-4">{{ blog.title }}</h1>

      <div class="flex items-center space-x-2 mb-6 text-gray-600">
        <span class="text-sm">By {{ blog.author }}</span>
        <span class="text-gray-400">•</span>
        <span class="text-sm">{{ formatDate(blog.createdAt) }}</span>
      </div>

      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tag in blog.tags"
          :key="tag"
          class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
        >
          {{ tag }}
        </span>
      </div>

      <div class="prose max-w-none">
        <p>{{ blog.content }}</p>
      </div>

      <div class="mt-10 pt-6 border-t border-gray-200">
        <router-link
          to="/blog"
          class="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all blogs
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { useBlog } from "../../composables/useBlog";
import type { Blog } from "../../types";

const route = useRoute();
const { getBlogById } = useBlog();
const blog = ref<Blog | undefined>(undefined);
const isLoading = ref(true);

onMounted(() => {
  const id = route.params.id as string;
  setTimeout(() => {
    blog.value = getBlogById(id);
    isLoading.value = false;
  }, 500); // Simulate API call
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
</script>
