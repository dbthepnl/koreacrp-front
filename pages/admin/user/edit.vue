<template>
  <div>
    <NuxtLayout name="adminlayout">
      <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <meta charset="utf-8">
  <!-- 타임라인 -->
  <div>

  </div>
  <div class="mt-8 ml-72">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 class="text-xl font-bold tracking-tight text-gray-900 mb-6">당원 수정</h2>
      <div>
        <form class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" @submit.prevent="">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">이름(필수)</label>
            <div class="mt-1">
              <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
              <input type="text" readonly name="name" v-model="post.name" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div>
            <label for="birth" class="block text-sm font-medium text-gray-700">생년월일(필수)</label>
            <div class="mt-1">
              <!-- 인증완료시 발급되는 생년월일로 등록, 수정안되도록 설정-->
              <input type="text" readonly maxlength="6" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="birth" v-model="post.birth" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div>
            <label for="phone" readonly class="block text-sm font-medium text-gray-700">핸드폰번호 (11자리 숫자)</label>
            <div class="mt-1"> 
              <!-- 핸드폰 번호 11자 이상 입력되지 않게, 문자가 아닌 숫자만 입력되도록 설정-->
              <input type="text" maxlength="11" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="phone" v-model="post.phone" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div>
            <label for="phone"  class="block text-sm font-medium text-gray-700">성별</label>
            <div class="mt-1"> 
              <!-- 핸드폰 번호 11자 이상 입력되지 않게, 문자가 아닌 숫자만 입력되도록 설정-->
              <select v-model="post.gender"  class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option disabled
                  v-for="(item, index) in gender_list"
                  :key="index"
                  :value="item.value"
                  >{{ item.name }}</option
                >
              </select>
            </div>
          </div>
          <div class="sm:col-span-2">
              <label for="address" class="block text-sm font-medium text-gray-700">주소(필수)</label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <button class="py-1 px-3" type="button" @click="search()">주소찾기</button>
                </div>
                <input type="text" name="address" v-model="post.address" readonly class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500" placeholder="서울시 종로구 ...">
              </div>
              <div class="post-box" v-if="postOpen == true">
                <template>
                  <VueDaumPostcode @complete="oncomplete" />
                </template>
              </div>
          </div>
          
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-700">상세주소(필수 아님)</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input name="address-detail" v-model="post.address_detail" type="text" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>

          <h1 class="text-md font-bold border-b-2 border-blue-400 pb-4">추천인 (필수 아님)</h1>
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-700">추천자 이름</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input name="address-detail" type="text" v-model="post.recommender" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-700">추천자 연락처</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input name="address-detail" type="text" maxlength="11" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="post.recommender_phone" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="signature" class="block text-sm font-medium text-gray-700">사인하기(필수)</label>
            <CanvasName v-on:childEvent="canvasData"></CanvasName>
              <!--여기에 필기사인 가능하도록 설정 
              사인 모듈 공유: https://jsfiddle.net/jq9cyzuc/
              -->

          </div>
          <div class="sm:col-span-2">
            <div class="flex flex-row items-center justify-between">
              <div class="basis-1/2 text-sm w-auto">
                <!-- 개인 약관 클릭시에 agreement.html에 나와있는 팝업이 가입페이지에 노출-->
                <span @click="agreementClick" class="font-medium text-blue-600 hover:text-blue-500">개인약관에 동의하시겠습니까?</span>
              </div>
              <div class="basis-1/2 flex items-center">
                <!-- 동의 버튼 -->
                <input id="agree" name="agree" type="checkbox" v-model="agree" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="agree" class="ml-2 block text-sm text-gray-900">동의 체크</label>
              </div>
            </div>
            <!-- 필수사항이 입력되지 않은 경우 에러 메세지 나오기, 입력 성공시 > 1. 가입정보 관리자로 전송 > 2. 가입회원에게 가입완료 문자 보내기 > 3. 완료 complete.html으로 이동-->
            <div class="flex flex-wrap -mx-3 mb-10 mt-10" >
        <div class="w-full px-3 ">
          <div>
            <button type="submit" class="bg-sky-700 text-white text-md shadow-sm rounded-sm px-4 py-2" >수정하기</button>      
            <Nuxt-link to="/admin/user" class=" text-md shadow-sm rounded-sm px-4 py-2" >취소</Nuxt-link>      
          </div> 
        </div>
      </div>
     
          </div>
        </form>
       
      </div>

    </div>
  </div>

  
</div>
    </NuxtLayout>
  </div>
</template>
<script setup>
definePageMeta({ middleware: ["auth"] });
</script>
<script>
export default {
  data(){
    return{
      gender_list:[
          { name: "성별선택", value:"" },
          { name: "남성", value:"1" },
          { name: "여성", value:"0" },
          ],
        agree:false, 
        postOpen:"",
        showModal:false, 
      post:{
        name: this.$route.params.name,
        birth: this.$route.params.birth,
        phone: this.$route.params.phone,
        address:null,
        address_detail:null,
        recommender:null,
        recommender_phone:null,
        gender: this.$route.params.gender,
        signature:null,
        req_seq: this.$route.params.req_seq,
        auth_type: this.$route.params.auth_type,
        mobile_co: this.$route.params.mobile_co
      }
       
    };
  }
}
</script>