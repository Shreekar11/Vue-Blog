<template>
    <DefaultLayout>
      <div class="max-w-4xl mx-auto">
        <section class="mb-12 text-center">
          <h1 class="text-4xl font-bold mb-4">Welcome to Vue Blog Platform</h1>
          <p class="text-xl text-gray-600">
            A simple frontend blog platform built with Vue 3, TypeScript & Tailwind CSS
          </p>
          <div class="mt-8">
            <BaseButton @click="navigateToBlog" size="lg">
              Browse Blog Posts
            </BaseButton>
          </div>
        </section>
        
        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6">Featured Posts</h2>
          <BlogList :blogs="featuredBlogs" />
        </section>
        
        <section>
          <div class="bg-blue-50 p-8 rounded-lg">
            <h2 class="text-2xl font-bold mb-4">Want to write your own blog?</h2>
            <p class="text-gray-600 mb-6">
              Join our community and share your thoughts with the world.
            </p>
            <BaseButton v-if="!auth.state.isAuthenticated" @click="navigateToLogin">
              Sign In to Start Writing
            </BaseButton>
            <BaseButton v-else @click="navigateToCreate">
              Create New Post
            </BaseButton>
          </div>
        </section>
      </div>
    </DefaultLayout>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import DefaultLayout from '../layouts/DefaultLayout.vue';
  import BlogList from '../components/blog/BlogList.vue';
  import BaseButton from '../components/ui/BaseButton.vue';
  import { useBlog } from '../composables/useBlog';
  import { useAuth } from '../composables/useAuth';
  
  const router = useRouter();
  const { blogs } = useBlog();
  const auth = useAuth();
  
  const featuredBlogs = computed(() => {
    return blogs.value.slice(0, 3);
  });
  
  const navigateToBlog = () => {
    router.push({ name: 'blog' });
  };
  
  const navigateToLogin = () => {
    router.push({ name: 'login' });
  };
  
  const navigateToCreate = () => {
    router.push({ name: 'create-blog' });
  };
  </script>