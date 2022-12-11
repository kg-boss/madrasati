<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="row-4">
          <img id="image" :src="`${publicPath}assets/pictures/undraw_back_to_school.svg`" alt="Back to school :)"/>
        </div>
        <div class="row-4">
          <ion-item lines="none">
            <ion-label position="floating">البريد الإلكتروني</ion-label>
            <ion-input :class="emailInputClassList" type="email"  placeholder="البريد الإلكتروني" v-model="email" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !validateEmail(email) && email">بريد إلكتروني غير صالح</ion-note>
            <ion-note color="danger" slot="helper" v-else-if="status === 400 && !email">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="floating">كلمة العبور</ion-label>
            <ion-input :class="passwordInputClassList" type="password"  placeholder="كلمة العبور" v-model="password" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !password">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-label color="primary" router-link="/forgot-password">هل نسيت كلمة العبور؟</ion-label>
        </div>
        <div class="row-4">
          <ion-button size="large" @click="login">دخول</ion-button>
          <div class="divider">أو</div>
          <ion-button size="large" router-link="/register">فتح حساب</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import UrlResolver from '../../config/urls';
import { alertController, IonButton, IonContent, IonInput, IonItem, IonLabel, IonNote, IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonButton,
    IonContent, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonNote,
    IonPage
  },
  data () {

    const router = useIonRouter();
    const showAlert = async (message:string) => {
      const alert = await alertController.create({
        header: 'تحذير',
        subHeader: 'فشل عملية الدخول',
        message: message,
        buttons: ['حسنا'],
      });

      await alert.present();
    };


    return {
      publicPath: process.env.BASE_URL,

      showAlert,

      router,

      email: "",
      password: "",
      status: 0, // 0: neutral, 100: processing, 200: ok, 400: invalid input, 500 rejected  
    }
  },
  methods: {
    login() {

      if (!this.validateEmail(this.email) || !this.password) {
        this.status = 400;
        return;
      }
        
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);

      this.status = 100;

      this.$http.post(UrlResolver.login, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {
        if (response.data.failed){
          this.status = 500;
          this.showAlert(response.data.message);
        }
        else{            
          this.status = 200;
          this.router.push({name:'Home', params: {token: response.data.token}});
        }

      }).catch((reason) => {
        console.log(reason)
        this.status = 500;
        if (reason.response.status === 422)
          this.showAlert(reason.response.data.message);
        else
          this.showAlert("لا يمكن الإتصال بمقدم الخدمة، الرجاء التثبت هل أن الموقع الرسمي متاح");
      });
    },


    validateEmail(email:string) {
      return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    },
  }
});
</script>

<style scoped>

ion-item::part(native) {
  width: 90vw;
  background: #f5f5f5;

  border-color: #f3f3f3;
  border-width: 2px;

  border-radius: 12px;
}

ion-button::part(native) {
  width: 60vw;
  font-weight: 300;
  border-radius: 100vmax;
}

#container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.row-4 {
  display: flex;
  flex-direction: column;
  flex: 1 1 33.3333333%;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

#image {
  height: 20vh;
}

.divider {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  color: #b4b4b4;
}

.divider::before, .divider::after {
  content: "";
  display: block;
  height: 2px;
  background-color: #b4b4b4;
  flex: 1 1 50%;
  margin: 0.5em 0.6em 0;
}
</style>
