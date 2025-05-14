<template>
  <header class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">Vue Blog</router-link>

      <nav>
        <ul class="flex space-x-6">
          <li>
            <router-link to="/" class="hover:text-blue-300">Home</router-link>
          </li>
          <li>
            <router-link to="/blog" class="hover:text-blue-300"
              >Blogs</router-link
            >
          </li>
          <template v-if="auth.state.isAuthenticated">
            <li>
              <router-link to="/create" class="hover:text-blue-300"
                >Create Post</router-link
              >
            </li>
            <li>
              <button @click="logout" class="hover:text-blue-300">
                Logout
              </button>
            </li>
          </template>
          <template v-else>
            <li>
              <router-link to="/login" class="hover:text-blue-300"
                >Login</router-link
              >
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";

const auth = useAuth();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>
