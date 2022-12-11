<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button color="light" default-href="home" text="رجوع"></ion-back-button>
        </ion-buttons>
        <ion-title color="light">إعادة تعيين كلمة العبور</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="row-4">
          <img id="image" :src="`${publicPath}assets/pictures/undraw_forgot_password.svg`" alt="Forgot Password ?"/>
        </div>
        <div class="row-8" style="justify-content: start">
          <ion-label class="description">نسيت كلمة العبور؟ لا مشكلة. فقط أخبرنا بعنوان بريدك الإلكتروني وسنرسل لك عبر البريد الإلكتروني رابط إعادة تعيين كلمة العبور الذي سيسمح لك باختيار واحدة جديدة.</ion-label>
          <ion-item lines="none">
            <ion-label position="floating">البريد الإلكتروني</ion-label>
            <ion-input :class="emailInputClassList" type="email"  placeholder="البريد الإلكتروني" v-model="email" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !validateEmail(email) && email">بريد إلكتروني غير صالح</ion-note>
            <ion-note color="danger" slot="helper" v-else-if="status === 400 && !email">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-button size="large" @click="sendLink">إرسال</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import UrlResolver from '../../config/urls';
import { alertController, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonPage, IonToolbar, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ForgotPasswordPage',
  components: {
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonContent, 
    IonHeader,
    IonInput, 
    IonItem, 
    IonLabel, 
    IonNote,
    IonPage,
    IonToolbar
  },
  data () {

    const router = useIonRouter();
    const showAlert = async (header:string, subHeader:string, message:string) => {
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
      status: 0, // 0: neutral, 100: processing, 200: ok, 400: invalid input, 500 rejected  
    }
  },
  methods: {
    sendLink() {

      if (!this.validateEmail(this.email)) {
        this.status = 400;
        return;
      }
        
      let formData = new FormData();
      formData.append("email", this.email);

      this.status = 100;

      this.$http.post(UrlResolver.forgotPassword, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {
        if (response.data.failed){
          this.status = 500;
          this.showAlert('تحذير', 'فشل عملية الإرسال', response.data.message);
        }
        else{            
          this.status = 200;
          this.showAlert('تم إرسال الرابط', 'تحقق من بريدك الوارد', response.data.message);
        }

      }).catch((reason) => {
        console.log(reason)
          this.status = 500;
          this.showAlert('تحذير', 'فشل عملية الإرسال', "لا يمكن الإتصال بمقدم الخدمة، الرجاء التثبت هل أن الموقع الرسمي متاح");
      });
    },


    validateEmail(email:string) {
      return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    },
  }
});
</script>

<style scoped>

ion-toolbar {
  --background: var(--ion-color-primary);
}

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
ion-label.description {
  width: 90vw;
  text-align: justify;
  margin-bottom: 56px;
}

#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.row-4 {
  display: flex;
  flex-direction: column;
  flex: 1 1 33.3333333%;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.row-8 {
  display: flex;
  flex-direction: column;
  flex: 1 1 66.6666666%;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

#image {
  height: 20vh;
}
</style>
