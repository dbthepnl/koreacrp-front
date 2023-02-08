<template>
  <div> 
  </div>
</template>

<script setup>
    import {state} from '../stores/index'
    import axios from 'axios'
     import { useRoute, useRouter } from 'vue-router'
    const route = useRoute();
    const router = useRouter();
    const store = state();

    async function certifyFunc() {
        const response = await axios.get(useRuntimeConfig().public.backendUrl + '/api/decode', { params: {
              encodeData : route.query.EncodeData
        }});
        const info = response.data;
        store.$patch({
        birth : info.split(':')[10].slice(2,-1),
        phone : info.split(':')[18].slice(0,-1),
        gender : info.split(':')[12].slice(0,1),
        name : info.split(':')[8].slice(0,-1),
        utf8name : info.split(':')[22],
        req_seq : info.split(':')[2].slice(0,-1),
        auth_type : info.split(':')[6].slice(0,-1),
        mobile_co : info.split(':')[16].slice(0,-1),
        })
        change();
        return store.$state.phone;
    }
    async function userCheckFunc() {
       const data = await certifyFunc();

       await axios.get(useRuntimeConfig().public.backendUrl + '/api/userCheck', { 
            params: {
            phone: data
            }
        })
        .then( () => {
            router.replace({name: "member-info"})
        })
        .catch( (e) => {
            alert("이미 가입된 번호 입니다.");
            router.replace({name: "index"})
        })
    } 
        
    function change () {
        store.$state.name = decodeURIComponent(store.$state.utf8name);
        return store.$state.name;
    }    
   
    onMounted(() => {
        userCheckFunc();
    })
   
    
</script>
