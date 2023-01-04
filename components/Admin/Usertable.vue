<template>
  <div>

  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">ID</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">이름</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">생년월일</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">통신사</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">연락처</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">주소</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">가입일자</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">1</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Nuxt-link to="/admin/user/edit" class="text-indigo-600 hover:text-indigo-900">김영자</Nuxt-link>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">19621005</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">SKT</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">01022224444</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">서울 동작구 여의대방로44길</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2022-10-28</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>