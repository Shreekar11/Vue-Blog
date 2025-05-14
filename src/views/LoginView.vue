<template>
  <DefaultLayout>
    <div class="max-w-md mx-auto">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Sign In</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <BaseInput
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            :error="errors.email"
          />

          <BaseInput
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            :error="errors.password"
          />

          <div v-if="auth.error" class="p-3 bg-red-100 text-red-700 rounded-md">
            {{ auth.error }}
          </div>

          <BaseButton type="submit" :loading="auth.isLoading" fullWidth>
            Sign In
          </BaseButton>
        </form>

        <div class="mt-6 text-center text-gray-600">
          <p>
            Demo credentials: <br />
            Email: user@example.com <br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const route = useRoute();
const auth = useAuth();

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const validate = (): boolean => {
  let isValid = true;

  // Reset errors
  errors.email = "";
  errors.password = "";

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;

  const success = await auth.login(form.email, form.password);

  if (success) {
    const redirectPath = (route.query.redirect as string) || "/";
    router.push(redirectPath);
  }
};
</script>
