<template>
  <button
    :class="[
      'font-medium rounded-lg transition-colors',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md',
      fullWidth ? 'w-full' : '',
      className,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="inline-block mr-2">
      <div
        class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white inline-block"
      ></div>
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "danger", "success"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-blue-600 hover:bg-blue-700 text-white";
    case "secondary":
      return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    case "danger":
      return "bg-red-600 hover:bg-red-700 text-white";
    case "success":
      return "bg-green-600 hover:bg-green-700 text-white";
    default:
      return "bg-blue-600 hover:bg-blue-700 text-white";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1 px-3 text-sm";
    case "md":
      return "py-2 px-4 text-base";
    case "lg":
      return "py-3 px-6 text-lg";
    default:
      return "py-2 px-4 text-base";
  }
});
</script>
