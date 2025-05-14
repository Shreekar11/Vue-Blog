import { useAuth } from "../composables/useAuth";
import HomeView from "../views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/blog/BlogView.vue"),
  },
  {
    path: "/blog/:id",
    name: "blog-detail",
    component: () => import("../views/blog/BlogDetailView.vue"),
    props: true,
  },
  {
    path: "/create",
    name: "create-blog",
    component: () => import("../views/blog/CreateBlogView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { state } = useAuth();
  
  if (to.meta.requiresAuth && !state.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
