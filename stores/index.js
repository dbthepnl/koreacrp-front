import { defineStore } from 'pinia'
import axios from 'axios';
export const state = defineStore('info',{

    state: () => {
        return{
            name:"",
            phone:"",
            birth:"",
            gender:"",
            req_seq:"",
            auth_type:"",
            mobile_co:"",
            utf8name:""
        }
    },
    getters: {
    // Get the full name whenever we need it
       
    },
    actions: {
    
    }
})