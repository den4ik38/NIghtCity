<template>
  <div class="wrapper">
  <div class="line"></div>
    <div v-if="user"  class="user__container">
      <div class="user__hello">Welcome Back {{user.username}}</div>
      <div class="info">
        <div class="user_info">
          <div class="user_info__title">Personal Information</div>
          <div class="user_info__row">
            <div class="iser_info__param">Name:</div>
            <div type="text" class="user_info__value">{{user.username}}</div>
          </div>
          <div class="user_info__row">
            <div class="iser_info__param">Birthday:</div>
            <div class="user_info__value">{{user.birthday}}</div>
          </div>
          <div class="user_info__row">
              <div class="iser_info__param">Email:</div>
              <div type="text" class="user_info__value">{{user.usermail}}</div>
          </div>
          <div class="user_info__row">
              <div class="iser_info__param">Phone number:</div>
              <div type="text" class="user_info__value">{{user.phone}}</div>
          </div>
          <div v-if="user.telegram" class="user_info__row">
              <div class="iser_info__param">Telegram:</div>
              <div type="text" class="user_info__value">{{user.telegram}}</div>
          </div>
        </div>
        <div class="orders">
          <div class="orders__title">Orders history</div>
          <div class="orders__headers">
            <div @click="swicthHeader(0)" :class="{checkedHeader: isActive === 0}" class="order__header">Orders in work</div>
            <div @click="swicthHeader(1)" :class="{checkedHeader: isActive === 1}" class="order__header">Completed orders</div>
          </div>
          <div class="orders__container">
            <div v-if="isActive === 0" class="orders_in_work">
              <div v-if="userNotConfirmOrders.length === 0" class="orders_in_work__empty">You currently have no orders in progress...</div>
              <div v-for="order in userNotConfirmOrders" :key="order.id" class="order__container">
                <div class="item__header">
                  <div class="order__date">Date: {{order.date}}</div>
                  <div class="order__status">Status: {{chechStatus(order.send, order.inWork)}}</div>
                </div>
                <div v-for="product in order.products" :key="product.name" class="order__row">
                  <div class="order__name_product">Product: {{product.name}}</div>
                  <div class="order__quantity">Things: {{product.quantity}}</div>
                  <div class="order__price">Price: {{product.price}}฿</div>
                  <div class="order__subtotal">Subtotal: {{product.total}}฿</div>
                </div>
                <div class="order__footer">
                  <div class="order__adress">Address: {{order.address}}</div>
                  <div class="order__total">Total: {{order.costValue}}฿</div>
                </div>
              </div>
            </div>
            <div v-if="isActive === 1" class="orders_completed">
              <div v-if="userOrdersHistory.length === 0" class="orders_completed__empty">You don't have any completed orders yet...</div>
              <div v-for="order in userOrdersHistory" :key="order.id" class="order__container">
                <div class="item__header">
                  <div class="order__date">Date: {{order.date}}</div>
                  <div class="order__status">Status: Done</div>
                </div>
                <div v-for="product in order.products" :key="product.name" class="order__row">
                  <div class="order__name_product">Product: {{product.name}}</div>
                  <div class="order__quantity">Things: {{product.quantity}}</div>
                  <div class="order__price">Price: {{product.price}}฿</div>
                  <div class="order__subtotal">Subtotal: {{product.total}}฿</div>
                </div>
                <div class="order__footer">
                  <div class="order__adress">Address: {{order.address}}</div>
                  <div class="order__total">Total: {{order.costValue}}฿</div>
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
import { useAuth } from '@/hooks/useAuth'
import { useOrders } from '@/hooks/useOrders'
export default {
  data(){
    return {
      isActive:0
    }
  },
  methods:{
    swicthHeader(num) {
      this.isActive = num
    },
    chechStatus(send, inWork) {
      if(send === false && inWork === false){
        return 'Create'
      } else if (send === false && inWork === true) {
        return 'In work'
      } else if (send === true && inWork === true){
        return 'Has been send'
      }
    }
  },
  mounted(){
    this.getUser()
    this.fetchUserNotConfirmOrders()
    this.fetchUseOrdersHistory()
  },
  setup(){
    const {fetchUseOrdersHistory, fetchUserNotConfirmOrders, userNotConfirmOrders, userOrdersHistory} = useOrders()
    const {getUser, user} = useAuth()
    return {
      getUser, user, fetchUseOrdersHistory, fetchUserNotConfirmOrders, userNotConfirmOrders, userOrdersHistory
    }
  }
}
</script>
<style scoped>
  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .user__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 10px;
    max-width: 1140px;
    margin: 0 auto;
  }
  .user__hello {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }
  .info {
    display: flex;
  }
  .user_info {
    width: 100%;
    padding: 15px;
    max-width: 460px;
  }
  .user_info__title {
    font-size: 24px;
    font-weight: 500;
    padding-left: 30px;
  }
  .user_info__row {
    display: flex;
    margin: 10px;
  }
  .iser_info__param {
    margin: 10px;
    font-size: 19px;
    font-weight: 400;
    width: 200px;
  }
  .user_info__value {
    width: auto;
    margin: 10px;
    font-size: 19px;
    font-weight: 400;
    border:none;
    border-bottom: 2px solid lightgrey;
    outline: 0;
  }
  .user_info__value:focus {
    border-bottom: 2px solid #a3c52d;
  }
  .orders {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
  }
  .orders__title {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }
  .orders__headers {
    display: flex;
    justify-content: center;
  }
  .order__header {
    width: 160px;
    margin: 20px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
  }
  .checkedHeader {
    border-bottom: 2px solid #a3c52d;
    color:#a3c52d;
  }
  .orders__container {
    width: 100%;
  }
  .orders_in_work__empty {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }
  .orders_completed__empty {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }

  .order__container {
    padding: 15px;
    border-bottom:1px solid lightgrey;
    margin: 10px 0;
    box-shadow: 0 0 3px lightgrey;
    font-size: 17px;
  }
  .item__header {
    display: flex;
    padding: 6px 10px;
    justify-content: space-between;
    background-color:#a3c52d;
  }
  .order__date {
    font-weight: 400;
  }
  .order__status {
    font-weight: 400;
  }
  .order__row {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .order__name_product {
    font-weight: 400;
  }
  .order__quantity {
    font-weight: 400;
  }
  .order__price {
    font-weight: 400;
  }
  .order__subtotal {
    font-weight: 400;
  }
  .order__footer {
    display: flex;
    justify-content: space-between;
    background-color: lightgrey;
    padding: 6px 10px;
  }

  @media screen and (max-width:925px) {
    .info {
      flex-direction: column;
    }
    .user_info {
      max-width: 100%;
    }
    .user_info__title {
      text-align: center;
    }
    .user_info__row {
      justify-content: space-evenly;
    }
    .iser_info__param {
      width: 200px;
    }
    .user_info__value {
      width: 200px;
    }
  }
  @media screen and (max-width:540px) {
    .orders {
      padding: 0;
    }
    .order__name_product {
      text-align: center;
    }
    .order__quantity {
      text-align: center;
    }
    .order__price {
      text-align: center;
    }
    .order__subtotal {
      text-align: center;
    }
    .user_info__title {
      padding-left: 0;
    }
  }
  @media screen and (max-width:420px) {
    .user_info__row {
      justify-content: space-between;
    }
    .iser_info__param {
      width: auto;
    }
    .user_info__value {
      width: auto;
    }
    .order__container {
      padding: 10px 0;
    }
    .order__container {
      font-size: 15px;
    }
  }
  @media screen and (max-width:360px) {
    .user_info {
      padding: 0;
    }
    .user_info__row {
      margin: 10px 0;
    }
    .order__row {
      padding: 10px 0;
    }
    .order__container {
      font-size: 13px;
    }
  }
</style>