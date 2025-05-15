<template>
  <DefaultLayout>
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">All Blog Posts</h1>

      <BlogSearch v-model="searchTerm" />

      <div v-if="isLoading">
        <div class="">Loading...</div>
      </div>
      <div v-else>
        <BlogList :blogs="filteredBlogs" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import BlogList from "../../components/blog/BlogList.vue";
import BlogSearch from "../../components/blog/BlogSearch.vue";
import { useBlog } from "../../composables/useBlog";

const { filteredBlogs, searchTerm, isLoading } = useBlog();
</script>
