import {get, put} from '@/helpers/api_helper'
import {ref} from 'vue'

export function useUsers(props) {
const users = ref([])


const fetchUsers =()=>{
  get('auth/users')
  .then(function(res){
    users.value = res
  })
  .catch(function(error){console.log(error);})
}

const updateRoleUsers =()=>{
  put('auth/users')
  .then(function(res){
    users.value = res
  })
  .catch(function(error){console.log(error);})
}

  return {
    users, fetchUsers
  }
}