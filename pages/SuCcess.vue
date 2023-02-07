<template>
  <div> 
    {{name}}ㄴㅇㄴㅇㄴㅇㄴ
    {{req_seq}}
    {{mobile_co}}
  </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref } from 'vue' 
    import axios from 'axios';
    const route = useRoute();
    const router = useRouter();
    const name = ref('');
    const phone = ref('');
    const birth = ref('');
    const gender = ref('');
    //const info = ref('');
    const req_seq = ref('');
    const mobile_co = ref('');
    const auth_type = ref('');
    const utf8name = ref('');
    
    onMounted(() => {
        userCheckFunc();
    })
    function change() {
        name.value = decodeURIComponent(utf8name.value);
    }
    async function certifyFunc() {
          //인증하기
          const response = await axios.get(useRuntimeConfig().public.backendUrl + '/api/decode', { params: {
              encodeData : route.query.EncodeData
          }});
                const info = response.data;
                birth.value = info.split(':')[10].slice(2,-1);
                phone.value = info.split(':')[18].slice(0,-1);
                gender.value = info.split(':')[12].slice(0,1);
                name.value = info.split(':')[8].slice(0,-1);
                utf8name.value = info.split(':')[22];
                req_seq.value = info.split(':')[2].slice(0,-1);
                auth_type.value = info.split(':')[6].slice(0,-1);
                mobile_co.value = info.split(':')[16].slice(0,-1);
                console.log("성공")
                change();
                return phone;
    }


    async function userCheckFunc() {
       const data = await certifyFunc();

       await axios.get(useRuntimeConfig().public.backendUrl + '/api/userCheck', { 
            params: {
            phone: data
            }
        })
        .then( () => {
            router.push({ name: "MemberInfo", params: {name: name.value, phone: phone.value, gender: gender.value, birth: birth.value,
                req_seq: req_seq.value, auth_type: auth_type.value, mobile_co: mobile_co.value}})

        })
        .catch( (e) => {
            console.log(e)
            alert("이미 가입된 번호 입니다.");
            router.replace({name: "index"})
        })
    }
    
</script>
