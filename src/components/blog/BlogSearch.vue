<template>
  <div class="mb-6">
    <div class="relative">
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search blog posts..."
        class="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="onSearch"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const searchValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    searchValue.value = newValue;
  }
);

const onSearch = () => {
  emit("update:modelValue", searchValue.value);
};
</script>
