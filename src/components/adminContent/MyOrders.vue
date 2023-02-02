<template>
  <div class="wrapper">
    <div v-if="isVisible === 0" class="section">
      <div v-for="order in newOrders" :key="order.id" class="order">
        <div class="header">
          <div class="name__user">{{order.сustomer}}</div>
          <div class="date__order">{{order.date}}</div>
        </div>
        <div class="order__content">
          <div class="product__list">
            <div v-for="item in order.products" class="order__item">
              <div class="item__name">Product: {{item.name}}</div>
              <div class="item__quan">{{item.quantity}} pc</div>
              <div class="item__price">Price: {{item.price}} ฿</div>
              <div class="item__cost">Cost: {{item.total}} ฿</div>
            </div>
          </div>
          <div class="adress">Адрес доставки: {{order.address}}</div>
        </div>
        <div class="footer">
          <div class="total"> <span class="total__span">Total order: {{order.costValue}} ฿</span> </div>
          <button @click.prevent="setInWork(order.date, order.belongId)" class="button">Взять в работу</button>
        </div>
      </div>
    </div>
    <div v-if="isVisible === 1" class="section">
      <div v-for="order in workOrders" :key="order.id" class="order">
        <div class="header">
          <div class="name__user">{{order.сustomer}}</div>
          <div class="date__order">{{order.date}}</div>
        </div>
        <div class="order__content">
          <div class="product__list">
            <div v-for="item in order.products" class="order__item">
              <div class="item__name">Product: {{item.name}}</div>
              <div class="item__quan">{{item.quantity}} pc</div>
              <div class="item__price">Price: {{item.price}} ฿</div>
              <div class="item__cost">Cost: {{item.total}} ฿</div>
            </div>
          </div>
          <div class="adress">Адрес доставки: {{order.address}}</div>
        </div>
        <div class="footer">
          <div class="total"> <span class="total__span">Total order: {{order.costValue}} ฿</span> </div>
          <button @click.prevent="setSend(order.date, order.belongId)" class="button">Order send</button>
        </div>
      </div>
    </div>
    <div v-if="isVisible === 2" class="section">
      <div v-for="order in sendOrders" :key="order.id" class="order">
        <div class="header">
          <div class="name__user">{{order.сustomer}}</div>
          <div class="date__order">{{order.date}}</div>
        </div>
        <div class="order__content">
          <div class="product__list">
            <div v-for="item in order.products" class="order__item">
              <div class="item__name">Product: {{item.name}}</div>
              <div class="item__quan">{{item.quantity}} pc</div>
              <div class="item__price">Price: {{item.price}} ฿</div>
              <div class="item__cost">Cost: {{item.total}} ฿</div>
            </div>
          </div>
          <div class="adress">Адрес доставки: {{order.address}}</div>
        </div>
        <div class="footer">
          <div class="total"> <span class="total__span">Total order: {{order.costValue}} ฿</span> </div>
          <button @click.prevent="setConfirm(order.date, order.belongId)" class="button">Заказ оплачен</button>
        </div>
      </div>
    </div>
    <my-alert v-model:showAlert="showAlert">
      {{alertMessage}}
    </my-alert>
  </div>
</template>
<script>
import {useOrders} from '@/hooks/useOrders'
export default {
  props: {
    isVisible: {
    type: Number,
    required: true}
  },
  data(){
    return {
      showAlert: false,
      alertMessage: ''
    }
  },
  methods:{
    async setInWork(date, belongId){
      const answer = await this.setInWorkStatus(date, belongId)
      this.alertMessage = answer.message
      this.showAlert = true
    },
    async setSend(date, belongId){
      const answer = await this.setSendStatus(date, belongId)
      this.alertMessage = answer.message
      this.showAlert = true
    },
    async setConfirm(date, belongId){
      const answer = await this.setConfirmStatus(date, belongId)
      this.alertMessage = answer.message
      this.showAlert = true
    }
  },
  mounted(){
    this.fetchNotInWorkOrders()
  },
  setup() {
    const {newOrders, workOrders, sendOrders, setInWorkStatus, setConfirmStatus, setSendStatus, fetchNotInWorkOrders} = useOrders()
    return {
      newOrders, workOrders, sendOrders, setInWorkStatus, setConfirmStatus, setSendStatus, fetchNotInWorkOrders
    }
  }
}
</script>
<style scoped>
  .wrapper {
    width: 100%;
  }
  .order {
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin-top: 10px;
    box-shadow: 0 0 5px lightgrey;
    font-size: 18px;
  }
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color:#a4c52d83;
    padding: 10px;
  }
  .name__user {
    padding-left: 20px;
  }
  .date__order {
    padding-right: 20px;
  }
  .product__list {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
  }
  .order__item {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid lightgrey;
  }

  .adress {
    padding: 10px;
    background-color: rgba(211, 211, 211, 0.5);
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0 15px;
    align-items: center;
  }
  .total__span {
    font-weight: bold;
  }
  .button {
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #a3c52d;
    color:grey;
    box-shadow: 0 0 5px lightgrey;
    padding: 5px 10px;
    cursor: pointer;
  }
  .button:hover {
    color:white;
    background-color:#a3c52d;
  }
  @media screen and (max-width:450px) {
    .order {
      padding: 10px 0;
      font-size: 15px;
    }
  }
  @media screen and (max-width:360px) {
    .date__order {
      width: 190px;
      padding-right: 0;
    }
    .name__user {
      padding-left: 0;
    }
    .order__item {
      padding: 5px;
      font-size: 12px;
    }
    .item__name {
      text-align:center;
    }
    .item__quan {
      text-align:center;
    }
    .item__price {
      text-align:center;
    }
    .item__cost {
      text-align:center;
    }
  }
</style>