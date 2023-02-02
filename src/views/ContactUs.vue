<template>
  <div class="wrapper">
    <div class="line"></div>
    <div class="container">
      <div class="contact__title">Contact us or come in person</div>
      <div class="contact__section">
        <div class="contact__half">
          <contact-form/>
        </div>
        <hr class="contact__separator">
        <div class="contact__half contact__half_right">
          <div>
            <div class="location_info">
              You can also visit us in person. The entire range presented on the site, you will find in stock, and you can personally verify the high quality of our products. Also inside you will find board games, Playstation, cozy and comfortable environment. 
            </div>
            <div class="location">We will be glad to see you every day from 10:00 to 02:00. Our address: Pattaya, Phra Tam Nak soi 4, 'Night City' freedom club. </div>
          </div>
          <div class="map">
            <iframe class="map_big" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.32748761688356!2d100.85886809376767!3d12.914924081539603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297b5c9a8acef%3A0x2899575acc0f32f3!2sNight%20City%20Freedom%20Cub!5e0!3m2!1sru!2sth!4v1673928724444!5m2!1sru!2sth" width="550" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe class="map_small" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.32748761688356!2d100.85886809376767!3d12.914924081539603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297b5c9a8acef%3A0x2899575acc0f32f3!2sNight%20City%20Freedom%20Cub!5e0!3m2!1sru!2sth!4v1673928724444!5m2!1sru!2sth" width="350" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <iframe class="map_min" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.32748761688356!2d100.85886809376767!3d12.914924081539603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297b5c9a8acef%3A0x2899575acc0f32f3!2sNight%20City%20Freedom%20Cub!5e0!3m2!1sru!2sth!4v1673928724444!5m2!1sru!2sth" width="270" height="270" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from '@/components/ContactForm.vue';
export default {
  components: {
    ContactForm
  }
}
</script>
<style scoped>

  .line {
    width: 100%;
    height: 60px;
    background-color:rgb(72, 72, 72);
  }
  .container {
    width: 100%;
    display: flex;
    padding: 30px;
    flex-wrap: wrap;
  }
  .contact__title {
    margin: 20px auto;
    font-size: 42px;
    font-weight: 500;
    width: 100%;
    text-align: center;
    color:#a3c52d;

  }
  .contact__section {
    max-width: 1140px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .contact__half {
    max-width: 49%;
    width: 100%;
  }
  .contact__separator {
    width: 1px;
    height: 100%;
    color: lightgrey;
    background-color:lightgrey;
  }
  .location_info {
    font-size: 19px;
    font-weight: 400;
    padding: 10px;
    color: grey;
  }
  .location {
    font-size: 17px;
    font-weight: 500;
    color: grey;
    padding: 10px;
  }
  .map {
    border: 2px solid grey;
    padding: 4px;
  }
  .map_small {
    display: none;
  }
  .map_min {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    .contact__section {
      flex-direction: column;
    }
    .contact__half {
      max-width:100%;
    }
    .contact__half_right {
      display: flex;
    }
  }
  @media screen and (max-width: 1200px) {
    .contact__half_right {
      flex-direction: column;
    }
    .map {
      width: fit-content;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 620px) {
    .container {
      padding: 30px 0;
    }
  }
  @media screen and (max-width: 560px) {
    .contact__title {
      font-size: 32px;
    }
    .map {
      padding: 1px;
    }
    .map_big {
      display: none;
    }
    .map_small {
      display: block;
    }
  }
  @media screen and (max-width: 360px) {
    .map_small {
      display: none;
    }
    .map_min {
      display: block;
    }
  }
</style>