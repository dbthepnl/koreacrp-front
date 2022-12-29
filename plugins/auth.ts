import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const user = useUser();

  // user 데이터 값이 있는 경우 생략
  if (user.value !== undefined) return;

  user.value = await fetchCurrentUser();
});
