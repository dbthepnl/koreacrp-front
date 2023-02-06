import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
  ],
  runtimeConfig: {
    public: {
      backendUrl: "http://ec2-13-209-67-110.ap-northeast-2.compute.amazonaws.com",
      frontendUrl: "http://localhost:3000",
    },
  },
  imports: {
    dirs: ["./utils"],
  },
  plugins: [
  ],
  build: {   
    transpile: [
      '@heroicons/vue',
      '@nuxtjs/feed',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      '@nuxtjs/axios',
    ]
  },
});
