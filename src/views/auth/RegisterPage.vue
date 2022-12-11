<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button color="light" default-href="home" text="رجوع"></ion-back-button>
        </ion-buttons>
        <ion-title color="light">فتح حساب</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <div class="row-4">
          <img id="image" :src="`${publicPath}assets/pictures/undraw_family.svg`" alt="Join the family"/>
        </div>
        <div class="row-8">
          <ion-item lines="none">
            <ion-label position="floating">المعرف الوحيد</ion-label>
            <ion-input type="number"  placeholder="المعرف الوحيد" v-model="reference" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !validateReference(reference) && reference">معرف وحيد غير صالح</ion-note>
            <ion-note color="danger" slot="helper" v-else-if="status === 400 && !reference">هذه الخانة مطلوبه</ion-note>
            <ion-note slot="helper">يتم توفير المعرف من قبل الإدارة</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="floating">البريد الإلكتروني</ion-label>
            <ion-input type="email"  placeholder="البريد الإلكتروني" v-model="email" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !validateEmail(email) && email">بريد إلكتروني غير صالح</ion-note>
            <ion-note color="danger" slot="helper" v-else-if="status === 400 && !email">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="floating">كلمة العبور</ion-label>
            <ion-input type="password"  placeholder="كلمة العبور" v-model="password" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && !password">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-item lines="none">
            <ion-label position="floating">تأكيد كلمة العبور</ion-label>
            <ion-input type="password"  placeholder="تأكيد كلمة العبور" v-model="passwordConfirmation" @input="status = 0"></ion-input>
            <ion-note color="danger" slot="helper" v-if="status === 400 && passwordConfirmation != password">كلمة العبور غير متطابقة</ion-note>
            <ion-note color="danger" slot="helper" v-else-if="status === 400 && !passwordConfirmation">هذه الخانة مطلوبه</ion-note>
          </ion-item>
          <ion-button size="large" @click="register">فتح</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import UrlResolver from '../../config/urls';
import { alertController, IonBackButton, IonButton, IonButtons, IonContent, IonInput, IonItem, IonLabel, IonNote, IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    IonBackButton, 
    IonButton, 
    IonButtons, 
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
        subHeader: 'فشل عملية التسجيل',
        message: message,
        buttons: ['حسنا'],
      });

      await alert.present();
    };


    return {
      publicPath: process.env.BASE_URL,

      showAlert,

      router,

      reference: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      status: 0, // 0: neutral, 100: processing, 200: ok, 400: invalid input, 500 rejected  
    }
  },
  methods: {
    register() {

      if (!this.validateReference(this.reference) || !this.validateEmail(this.email) || !this.password || this.password != this.passwordConfirmation) {
        this.status = 400;
        return;
      }
        
      let formData = new FormData();
      formData.append("role", UrlResolver.role);
      formData.append("reference", this.reference);
      formData.append("name", this.email.split('@')[0]);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);

      this.status = 100;

      this.$http.post(UrlResolver.register, formData, {
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
    validateReference(reference:string) {
      return reference.match(/^\d{16}$/);
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
