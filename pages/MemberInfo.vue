<template>

  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <meta charset="utf-8">
  <!-- 타임라인 -->
  <div class="px-6">
    <!-- 위치에 따라 위치명 변경 -->
    <p class="text-lg font-medium text-gray-900">본인인증</p> 
    <div class="mt-6" aria-hidden="true">
      <div class="overflow-hidden rounded-full bg-gray-200">
        <!-- 위치에 따라 %변경, 본인인증 33.3%, 회원가입 66.6%, 가입완료 100%-->
        <div class="h-2 rounded-full bg-blue-600" style="width: 66.6%"></div>
      </div>
      <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
        <!-- 현 위치는 색생 text-Sky-600으로 변경-->
        <div class="text-center text-blue-600">본인인증</div>
        <div class="text-center text-blue-600">회원가입</div>
        <div class="text-center">가입완료</div>
      </div>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">자유통일당 당원 가입 신청서</h2>
      <div>
        <!-- 인증완료시 메세지 -->
        <div class="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative my-6" role="alert">
          <strong class="font-bold">인증완료되었습니다.</strong>
        </div>
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
            <label for="phone"  class="block text-sm font-medium text-gray-700">핸드폰번호 (11자리 숫자)</label>
            <div class="mt-1"> 
              <!-- 핸드폰 번호 11자 이상 입력되지 않게, 문자가 아닌 숫자만 입력되도록 설정-->
              <input type="text" readonly maxlength="11" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="phone" v-model="post.phone" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
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
                
                  <VueDaumPostcode @complete="oncomplete"/>
                
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
              <input name="address-detail" type="text" v-model="post.recommend" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-medium text-gray-700">추천자 연락처</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input name="address-detail" type="text" maxlength="11" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="post.recommend_phone" class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
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
            <button type="submit" @click="infosubmit()"
            class="mt-10 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-6 px-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-Sky-500 focus:ring-offset-2">
            가입하기           
            </button>
          </div>
        </form>
       
      </div>

    </div>
  </div>
  <AgreeMent v-if='showModal' @close="showModal=false"></AgreeMent>

  <!-- 팝업 개인약관 동의-->
  
</div>
</template>

<script>
import axios from 'axios';
import {VueDaumPostcode} from "vue-daum-postcode";
import AgreeMent from "../components/Agreement.vue";
import CanvasName from '../components/Canvas.vue';
export default {
  created(){
        this.name = this.$route.params.name,
        this.birth =this.$route.params.birth,
        this.phone = this.$route.params.phone,
        this.gender = this.$route.params.gender,
        this.req_seq = this.$route.params.req_seq,
        this.auth_type = this.$route.params.auth_type,
        this.mobile_co = this.$route.params.mobile_co
  },
  mounted(){
    // if(this.name === undefined || this.name == null || this.phone == undefined){
    //   this.$router.replace({name: "PageNotFound" });
    // }
  },
  data(){
    return{
      gender_list:[
          { name: "성별선택", value:"" },
          { name: "남성", value:"1" },
          { name: "여성", value:"0" },
          ],
        agree:false, 
        postOpen: false,
        showModal:false, 
      post:{
        name: this.$route.params.name,
        birth: this.$route.params.birth,
        phone: this.$route.params.phone,
        address:null,
        address_detail:null,
        recommend:null,
        recommend_phone:null,
        gender: this.$route.params.gender,
        signature:null,
        req_seq: this.$route.params.req_seq,
        auth_type: this.$route.params.auth_type,
        mobile_co: this.$route.params.mobile_co
      }
       
    };
  },
  components:{
    VueDaumPostcode,
    AgreeMent,
    CanvasName
  },
  methods: {
      search: function(){
        this.postOpen = true
      },
      agreementClick: function(){
        this.showModal = true
      },
      canvasData: function(params){  //sign데이터주소 받는 메소드
        this.post.signature = params;
      },
      oncomplete:function(result){
          //console.log(result)
        if(result.userSelectedType === 'R'){  // 도로명 주소 선택
          this.post.address = result.jibunAddress;
        }else{  // 지번 주소 선택
          this.post.address = result.jibunAddress; //도로명주소 검색되게함
        }
        this.postOpen = false
      },
      infosubmit:function(){
        if(this.post.name == "" || this.post.name == null){
          alert("이름을 입력해주세요.")
        } else if(this.post.phone == "" || this.post.phone == null){
          alert("전화번호를 입력해주세요.")
        } else if(this.post.address == "" || this.post.address == null){
          alert("주소를 입력해주세요.")
        } else if (this.agree == false){
          alert("이용약관을 동의해주세요.")
        }else if(this.post.signature == "" || this.post.signature == null){
          alert("사인을 입력해주세요.")
        } else {
          //console.log(this.post)
          this.form = new FormData;
          let formData = new FormData();
          formData.append('name',this.post.name);
          formData.append('phone',this.post.phone);
          formData.append('birth',this.post.birth);
          formData.append('gender',this.post.gender);
          formData.append('address',this.post.address);
          formData.append('address_detail',this.post.address_detail);
          formData.append('recommend',this.post.recommend);
          formData.append('recommend_phone',this.post.recommend_phone);
          formData.append('signature',this.post.signature);
          formData.append('req_seq',this.post.req_seq);
          formData.append('auth_type',this.post.auth_type);
          formData.append('mobile_co',this.post.mobile_co);
        
          axios.post(useRuntimeConfig().public.backendUrl + '/api/register', formData).then(() => {
              this.$router.replace({name: "CompleteSection" ,params: {
              req_seq: this.req_seq, auth_type: this.auth_type, mobile_co: this.mobile_co}});
          }); 
        
        }
      }
    },
  
}
</script>

<style>
</style>
