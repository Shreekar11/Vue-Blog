<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-1 font-medium text-gray-700"
      >{{ label }}</label
    >
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-blue-500',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="helperText" class="mt-1 text-sm text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  helperText: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
});

defineEmits(["update:modelValue"]);
</script>
