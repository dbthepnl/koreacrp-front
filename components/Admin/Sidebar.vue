<template>
<div>
    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-gray-800">
        <div class="flex h-16 flex-shrink-0 items-center border-b text-white nan border-gray-600 text-xl px-4">
          <h4 class="ohsquare-kr text-1xl">정당 관리 시스템</h4>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 space-y-1 px-2 py-4">
            <Nuxt-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </Nuxt-link>
          </nav>
        </div>
        <div class="flex flex-shrink-0 bg-gray-700 p-4">
          <a href="#" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ footer[0].name }}</p>
                <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">{{ footer[0].title }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import {
  FolderIcon,
  HomeIcon,
  NewspaperIcon,
  AnnotationIcon,
  UserGroupIcon,
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
  FolderOpenIcon,
  DocumentIcon
} from '@heroicons/vue/outline'


const navigation = [
  { name: '대시보드', href: '/admin', icon: ChartBarIcon, current: false },
  { name: '사용자관리', href: '/admin/user', icon: UserIcon, current: false },
]

const footer = [
  { name: '2022 Copyright@ KOREACRP', title: 'CMS 관리자 페이지'}
]

const sidebarOpen = ref(false)
</script>