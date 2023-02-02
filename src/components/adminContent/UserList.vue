<template>
  <div class="container">
    <div v-if="users.length > 0" class="wrapper">
      <user-item v-for="user in users" :key="user.id" :user="user"/>
    </div>
    <div v-if="users.length === 0" class="loader">
      <div class="loader__text">Loading...</div>
      <div class="preloader-7"> 
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserItem from '@/components/adminContent/UserItem.vue'
import {useUsers} from '@/hooks/useUsers'
export default {
  components: {UserItem},
   mounted() {
    this.fetchUsers()
   },
   setup() {
    const {users, fetchUsers} = useUsers()
    return {
      users, fetchUsers
    }
   }
}
</script>
<style scoped>
.container {
  display: flex;
}
.loader {
    margin: 20px auto;
  }
  .loader__text {
    font-size: 32px;
    text-align: center;
    color: grey;
  }
  .preloader-7 div {
    border: 14px inset #FFF;
    border-radius: 100%;
    padding: 4px;
    animation: preloader-7-spin 15s linear infinite;
  }
  @keyframes preloader-7-spin {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
  }
</style>