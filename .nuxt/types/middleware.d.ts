import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest" | "unverified" | "verified"
declare module "/Users/jeongseongmin/Korea-Crp-Front/koreacrp-front/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}