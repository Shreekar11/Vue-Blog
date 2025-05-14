<template>
  <DefaultLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Create New Blog Post</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          v-model="form.title"
          label="Blog Title"
          placeholder="Enter a descriptive title"
          :error="errors.title"
        />

        <div>
          <label for="content" class="block mb-1 font-medium text-gray-700"
            >Content</label
          >
          <textarea
            id="content"
            v-model="form.content"
            rows="8"
            placeholder="Write your blog post content here..."
            class="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="errors.content ? 'border-red-500' : ''"
          ></textarea>
          <p v-if="errors.content" class="mt-1 text-sm text-red-600">
            {{ errors.content }}
          </p>
        </div>

        <BaseInput
          v-model="form.excerpt"
          label="Excerpt"
          placeholder="A short summary of your blog post"
          :error="errors.excerpt"
        />

        <div>
          <label class="block mb-1 font-medium text-gray-700">Tags</label>
          <div class="flex flex-wrap items-center gap-2">
            <div
              v-for="(tag, index) in form.tags"
              :key="index"
              class="bg-blue-100 px-3 py-1 rounded-full flex items-center"
            >
              <span class="text-blue-800">{{ tag }}</span>
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 text-blue-500 hover:text-blue-700"
              >
                &times;
              </button>
            </div>

            <div class="flex">
              <input
                v-model="newTag"
                type="text"
                placeholder="Add a tag"
                class="border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @keydown.enter.prevent="addTag"
              />
              <button
                type="button"
                @click="addTag"
                class="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
          <p v-if="errors.tags" class="mt-1 text-sm text-red-600">
            {{ errors.tags }}
          </p>
        </div>

        <BaseInput
          v-model="form.imageUrl"
          label="Image URL (Optional)"
          placeholder="Enter an image URL for your blog post"
        />

        <div class="flex justify-end space-x-4">
          <BaseButton type="button" variant="secondary" @click="$router.back()">
            Cancel
          </BaseButton>

          <BaseButton type="submit" :loading="isSubmitting">
            Publish Post
          </BaseButton>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import { useBlog } from "../../composables/useBlog";

const router = useRouter();
const { createBlog } = useBlog();

const form = reactive({
  title: "",
  content: "",
  excerpt: "",
  author: "Demo User", // In a real app, this would come from the user profile
  tags: [] as string[],
  imageUrl: "",
});

const errors = reactive({
  title: "",
  content: "",
  excerpt: "",
  tags: "",
});

const newTag = ref("");
const isSubmitting = ref(false);

const addTag = () => {
  if (newTag.value.trim() && !form.tags.includes(newTag.value.trim())) {
    form.tags.push(newTag.value.trim());
    newTag.value = "";
  }
};

const removeTag = (index: number) => {
  form.tags.splice(index, 1);
};

const validate = (): boolean => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });

  if (!form.title.trim()) {
    errors.title = "Title is required";
    isValid = false;
  }

  if (!form.content.trim()) {
    errors.content = "Content is required";
    isValid = false;
  } else if (form.content.trim().length < 50) {
    errors.content = "Content should be at least 50 characters";
    isValid = false;
  }

  if (!form.excerpt.trim()) {
    errors.excerpt = "Excerpt is required";
    isValid = false;
  }

  if (form.tags.length === 0) {
    errors.tags = "At least one tag is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;

  try {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newBlog = createBlog({
      title: form.title,
      content: form.content,
      excerpt: form.excerpt,
      author: form.author,
      tags: form.tags,
      imageUrl: form.imageUrl || undefined,
    });

    router.push({ name: "blog-detail", params: { id: newBlog.id } });
  } catch (error) {
    console.error("Error creating blog:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
