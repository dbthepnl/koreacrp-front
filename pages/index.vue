<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'
const niceFetch = ref('');
//const { isLoggedIn } = useAuth();
const response = await axios.get(useRuntimeConfig().public.backendUrl + '/api/certify');
const response2 = await $korfetch('/api/certify')
// 첫번째 경로, 2번째 데이터 3번쨰 post, get 빈칸이면 get
console.log(response2)
niceFetch.value = response.data
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="px-6">
        <!-- 위치에 따라 위치명 변경 -->
        <p class="text-lg font-medium text-gray-900">본인인증</p> 
        <div class="mt-6" aria-hidden="true">
        <div class="overflow-hidden rounded-full bg-gray-200">
            <!-- 위치에 따라 %변경, 본인인증 33.3%, 회원가입 66.6%, 가입완료 100%-->
            <div class="h-2 rounded-full bg-blue-600" style="width: 33.3%"></div>
        </div>
        <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
            <!-- 현 위치는 색생 text-Sky-600으로 변경-->
            <div class="text-blue-600">본인인증</div>
            <div class="text-center">회원가입</div>
            <div class="text-center">가입완료</div>
            {{ response2 }}
        </div>
        </div>
    </div>
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">자유통일당 당원 가입 신청서</h2>
      <p class="my-6 text-center text-md tracking-tight text-gray-900">
        당원가입은 본인인증이 필요합니다.<br />
        아래 버튼을 클릭하세요.</p>
      <div>
        <!-- 클릭시 인증페이지로 이동 -->
        <form name="form_chk" method="POST" action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb">
          <input type="hidden" name="m" value="checkplusService">				<!-- 필수 데이타로, 누락하시면 안됩니다. -->
          <input type="hidden" name="EncodeData" :value="niceFetch" >		<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
          <input type ="hidden" name="recvMethodType" value ="get">
          <button type="submit" @click="formChk"
          class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-6 px-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-Sky-500 focus:ring-offset-2">
          안심본인인증 클릭
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-check ml-2" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
          </svg>      
          </button>
        </form>
      </div>
    </div>
  </div>
  <footer class="text-center text-white" style="background-color: #0a4275; bottom: 0px !important; margin-top: 28%;">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
        <p style="text-align: center; padding-top: 10px; color: #f2f2f2; font-size: 12px">
        자유통일당, 서울특별시 영등포구 국회대로 70길 15-1, 극동VIP 914호 <br>
        | Tel.1544-5556 | Fax. 070-7611-6248 | E-mail. info@koreacrp.com | 부대표 : 고영일<br>
        고유번호 : 219-82-61344 <br>
        <b>Copyright @자유통일당 Corp. All rights reserved.</b>
    </p>
    </div>
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2022 Copyright: 자유통일당
    </div>
  </footer> 
</template>