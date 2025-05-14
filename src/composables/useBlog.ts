import { Blog } from "@/types";
import { computed, ref } from "vue";

const sampleBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Vue 3",
    content:
      "Vue 3 brings many exciting features including the Composition API...",
    excerpt: "Learn how to start using Vue 3 with the Composition API",
    author: "Jane Doe",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    tags: ["Vue", "JavaScript", "Frontend"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: "2",
    title: "Understanding TypeScript with Vue",
    content:
      "TypeScript adds static typing to JavaScript, making your code more robust...",
    excerpt: "Learn how to use TypeScript effectively with Vue",
    author: "John Smith",
    createdAt: "2025-02-10T14:30:00Z",
    updatedAt: "2025-02-11T09:15:00Z",
    tags: ["TypeScript", "Vue", "Development"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: "3",
    title: "Styling Your Vue App with Tailwind CSS",
    content:
      "Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom designs...",
    excerpt:
      "Learn how to integrate and use Tailwind CSS in your Vue applications",
    author: "Alex Johnson",
    createdAt: "2025-03-05T11:45:00Z",
    updatedAt: "2025-03-05T11:45:00Z",
    tags: ["CSS", "Tailwind", "Design"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
];

export function useBlog() {
  const blogs = ref<Blog[]>(sampleBlogs);
  const isLoading = ref<boolean>(false);
  const searchTerm = ref<string>("");

  const filteredBlogs = computed(() => {
    if (!searchTerm.value) return blogs.value;

    const query = searchTerm.value.toLowerCase();
    return blogs.value.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const getBlogById = (id: string): Blog | undefined => {
    return blogs.value.find((blog) => id === blog.id);
  };

  const createBlog = (blog: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    const newBlog: Blog = {
      ...blog,
      id: `${blogs.value.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogs.value.push(newBlog);
    return newBlog;
  };

  return {
    blogs,
    isLoading,
    searchTerm,
    filteredBlogs,
    getBlogById,
    createBlog,
  };
}
