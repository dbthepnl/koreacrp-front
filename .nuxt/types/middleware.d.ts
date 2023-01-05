import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest" | "unverified" | "verified"
declare module "/Users/sungjunahn/Documents/sanctum/dbkoreacrp/koreacrp-front/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}