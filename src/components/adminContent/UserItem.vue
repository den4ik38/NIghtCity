<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__item">Name user: {{user.username}}</div>
      <div class="header__item">Mail: {{user.usermail}}</div>
      <div class="header__item">Registration date:{{user.registrDate}}</div>
    </div>
    <div class="body">
      <div class="bodi__item">User Phone: {{user.phone}}</div>
      <div class="bodi__item"> Telegram: {{user.telegram}}</div>
      <div class="bodi__item">Birthday: {{user.birthday}}</div>
      <div class="roles__section">
        <div class="roles">Use Roles: {{user.roles}}</div>
        <select name="roles" id="roles" class="role__select">
          <option value="" disabled selected class="roles__option">Choice Role</option>
          <option value="MODERATOR" class="roles__option">MODERATOR</option>
          <option value="MANAGER" class="roles__option">MANAGER</option>
          <option value="ADMIN" class="roles__option">ADMIN</option>   
        </select>
        <button class="button">ADD ROLE</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 0 5px lightgrey;
  }
  .header {
    display: flex;
    justify-content: space-evenly;
    background-color:#a4c52d83;
    padding: 10px;
  }
  .body {
    display: flex;
    width: 100%;
    padding: 15px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .header__item {
    text-align: center;
  }
  .roles__section {
    display: flex;
    width: 100%;
    margin: 15px 10px 0;
  }
  .roles {
    padding: 5px;
  }
  .role__select {
    margin: 0 15px;
  }
  .button {
    padding: 5px 10px;
  }
  @media screen and (max-width:500px) {
    .wrapper {
      font-size: 12px;
    }
  }
  @media screen and (max-width:360px) {
    .roles__section {
      flex-direction: column;
    }
    .role__select {
      margin: 10px auto;
    }
  }
</style>