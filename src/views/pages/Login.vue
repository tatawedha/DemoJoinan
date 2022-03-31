<template>
  <div
    class="c-app flex-row align-items-center"
    :class="{ 'c-dark-theme': $store.state.darkMode }"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1 class="text-center text-muted">Mosoto Login</h1>
                  <!-- <p class="text-muted">Masuk</p> -->
                  <CInput
                    placeholder="Username"
                    autocomplete="username"
                    :value.sync="username"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    :value.sync="password"
                    @keyup.enter.prevent="login()"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-center mt-4">
                      <CButton
                        color="warning"
                        class="px-4 text-white"
                        block
                        @click="login()"
                        >LOGIN</CButton
                      >
                    </CCol>
                    <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>

      <CModal
        title="Berhasil Login"
        size="sm"
        :show.sync="myModal1"
        hide-footer
        centered
      >
        <CCol col="12" class="text-center">
          <CButton @click="(myModal = false), lanjut()" :color="color" block
            >Masuk</CButton
          >
        </CCol>
        <template #footer-wrapper> <span></span> </template>
      </CModal>

      <CModal
        title="Terjadi Kesalahan"
        :show.sync="myModal2"
        hide-footer
        centered
      >
      <CRow>
        <CCol class="text-center">
          <h4 class="text-strong text-warning mt-4 mb-4">{{ msg }}</h4>
        </CCol>
      </CRow>
        
        <template #footer-wrapper> <span></span> </template>
      </CModal>
    </CContainer>
  </div>
</template>

<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import { setToken } from "@/store/utils/auth.js";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      button: "LOGIN",
      busy: false,
      myModal1: false,
      myModal2: false,
      msg: "",
      color: ""
    };
  },
  // beforeMount() {
  //   if (localStorage.getItem("token")) {
  //     this.$router.push({ path: "/" });
  //   }
  // },
  methods: {
    async login() {
      let vm = this;
      vm.busy = true;
      let login = await axios.post(ipBackend + "user/login", {
        username: vm.username,
        password: vm.password
      });
      console.log(login);
      if (login.data.status == 200) {
        if (login.data.message == "sukses") {
          vm.button = "LOGIN";
          vm.busy = false;
          localStorage.setItem("MosotoPassport", login.data.token);
          setToken(login.data.token);
          this.$router.push({ path: "/" });
        } else {
          vm.button = "LOGIN";
          vm.busy = false;
          vm.myModal2 = true;
          vm.msg = login.data.message.toUpperCase();
          vm.color = "danger";
        }
      } else {
        vm.button = "LOGIN";
        vm.busy = false;
        vm.myModal2 = true;
        vm.msg = "TERJADI KESALAHAN PADA SERVER";
        vm.color = "warning";
      }
    },
    lanjut() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
