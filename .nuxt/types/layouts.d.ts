import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "adminlayout" | "app-layout" | "default"
declare module "/Users/sungjunahn/Documents/sanctum/dbkoreacrp/koreacrp-front/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}