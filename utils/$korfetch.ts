import { $fetch, FetchOptions, FetchError } from "ohmyfetch";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

// ohmyfetch 추가적인 인터페이스
interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | "json";

type LarafetchOptions<R extends ResponseType> = FetchOptions<R> & {
  redirectIfNotAuthenticated?: boolean;
  redirectIfNotVerified?: boolean;
};

export async function $korfetch<T, R extends ResponseType = "json">(
  path: RequestInfo,
  {
    redirectIfNotAuthenticated = true,
    redirectIfNotVerified = true,
    ...options
  }: LarafetchOptions<R> = {}
) {
  const { backendUrl, frontendUrl } = useRuntimeConfig().public;
  const router = useRouter()

  let token = useCookie(CSRF_COOKIE).value;

  // 쿠기 가져오기
  if (
    process.client &&
    ["post", "delete", "put", "patch"].includes(options?.method?.toLowerCase() ?? '')
  ) {
    await initCsrf();
    // nuxt composable를 사용하지 못하는 문제점. 
    token = getCookie(CSRF_COOKIE);
  }

  let headers: any = {
    ...options?.headers,
    ...(token && { [CSRF_HEADER]: token }),
    accept: "application/json",
    "content-type": "application/json",
  };

  if (process.server) {
    headers = {
      ...headers,
      //...useRequestHeaders(["cookie"]),
      //referer: frontendUrl,
    };
  }

  try {
    return await $fetch<T, R>(path, {
      baseURL: backendUrl,
      ...options,
      headers,
      //credentials: "include",
    });
  } catch (error) {
    if (!(error instanceof FetchError)) throw error;


    const status = error.response?.status ?? -1;

    if (
      redirectIfNotAuthenticated &&
      [401, 419].includes(status)
    ) {
      await router.push('/login')
    }

    if (redirectIfNotVerified && [409].includes(status)) {
      await router.push('/verify-email')
    }

    if ([500].includes(status)) {
      console.error("Server Error]", error.data?.message, error.data);
    }

    throw error;
  }
}

async function initCsrf() {
  const { backendUrl } = useRuntimeConfig().public;

  await $fetch("/sanctum/csrf-cookie", {
    baseURL: backendUrl,
    credentials: "include",
  });
}

function getCookie(name: string) {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
  );
  return match ? decodeURIComponent(match[3]) : null;
}
