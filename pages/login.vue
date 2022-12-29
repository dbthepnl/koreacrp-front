<template>
  <AuthCard>

    <!-- 세션 status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <form @submit.prevent="submitForm">
      <!-- 이메일 input -->
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="data.email"
          :errors="errors.email?.[0]"
          required
          autoFocus
        />
      </div>

      <!-- 비밀번호 input -->
      <div class="mt-4">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          :errors="errors.password"
          required
          autoComplete="current-password"
        />
      </div>

      <!-- 기억하기 -->
      <div class="block mt-4">
        <label for="remember" class="inline-flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember"
          />
          <span class="ml-2 text-sm text-gray-600"> 기억하기 </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          href="/forgot-password"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          비밀번호를 잊으셨습니까?
        </NuxtLink>

        <Button class="ml-3">로그인</Button>
      </div>
    </form>
  </AuthCard>
</template>
<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const data = reactive({
  email: null,
  password: null,
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);
const errors = ref<Record<string, string[]>>({});

async function submitForm() {
  errors.value = {};
  status.value = "";

  submitRequest(
    login(data),
    () => {
      router.push("/dashboard");
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {};
    }
  );
}
</script>
