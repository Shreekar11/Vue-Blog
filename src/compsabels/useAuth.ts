import { AuthState, User } from "@/types";
import { reactive, ref } from "vue";

export function useAuth() {
  const state = reactive<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const isLoading = ref(false);
  const error = ref("");

  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = "";

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email === "user@example.com" && password === "password") {
        state.user = {
          id: "1",
          name: "Demo User",
          email: "user@example.com",
          avatar: "https://placekitten.com/100/100",
        };
        state.isAuthenticated = true;
        return true;
      } else {
        error.value = "Invalid email or password";
        return false;
      }
    } catch (err) {
      error.value = "An error occurred during login";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    state.user = null;
    state.isAuthenticated = false;
  };

  return {
    state,
    login,
    logout,
  };
}
