import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "adminlayout" | "app-layout" | "default"
declare module "/Users/jeongseongmin/Korea-Crp-Front/koreacrp-front/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}