<template>
  <div>
    <NuxtLayout name="adminlayout">
    <div class="flex flex-1 flex-col md:pl-64">
     <main class="flex-1">
        <div class="pt-6">
        
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- 검색 -->
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">당원 목록</h1>
                <p class="mt-2 text-sm text-gray-700">당원 리스트입니다.</p>
              </div>
              <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">       
                <Nuxt-link to="/admin/user/create" class="inline-flex items-center justify-center border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto">당원 추가</Nuxt-link>
              </div>
            </div>
            <AdminSearch />
            <div class="px-4">
                            {{ user  }}
                <!-- table -->
                  <AdminUsertable />
                <!--table End -->
            </div>
            <!-- /End replace -->
            <div class=" mt-4">
              <AdminPaginations />
            </div>
          </div>
        </div>
      </main>
    </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
const user = useAuth();
</script>
