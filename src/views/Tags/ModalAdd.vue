<template>
  <CContainer>
    <CRow>
      <CCol align="right">
        <CButton
          color="success"
          v-c-tooltip="'Tambah Pasien'"
          @click="myModal = true"
          class="mr-1"
        >
          Tambah Data
        </CButton>
      </CCol>
      <CModal title="Register Pasien " size="lg" :show.sync="myModal">
        <CRow>
          <CCol>
            <CForm>
              <CInput
                label="Nama Tags"
                horizontal
                :value.sync="data.namamasterTags"
              />
            </CForm>
          </CCol>
        </CRow>
        <CRow class="mb-3 mt-4">
          <CCol></CCol>
          <CCol class="col-md-4">
            <CButton block @click="regis()" color="success" :disabled="busy">
              <CSpinner v-if="busy" size="sm" /> DAFTAR</CButton
            >
          </CCol>
          <CCol></CCol>
        </CRow>
        <template #footer-wrapper>
          <span></span>
        </template>
      </CModal>
    </CRow>
  </CContainer>
</template>
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import moment from "moment";
import "moment/locale/id";
export default {
  name: "ModalAdd",
  components: {},
  props: [],
  data() {
    return {
      moment,
      data: {
        namamasterTags: ""
      },
      src1: "",
      timeout: 4000,
      busy: false,
      myModal: false,
      selected: [],
      options: [],
      multi: null
    };
  },
  created() {
    // this.getPeserta();
  },
  methods: {
    tembak() {
      this.$emit("tembak");
    },
    handleFile() {
      this.data.file1 = this.$refs.file1.$data.state[0];
      this.src1 = URL.createObjectURL(this.data.file1);
    },
    sendDate(x) {
      return moment(x).format("YYYY/MM/DD");
    },
    async regis() {
      let vm = this;
      let regis = await axios.post(
        ipBackend + "masterTags/register",
        vm.data
      );

      console.log(regis);
      if (regis.data.status == 200) {
        if (regis.data.message == "sukses") {
          vm.busy = false;
          vm.$emit("go", {
            msg: "PENDAFTARAN TAGS BERHASIL",
            color: "success"
          });
          vm.myModal = false;
        } else {
          vm.busy = false;
          vm.$emit("go", {
            msg: regis.data.message.toUpperCase(),
            color: "warning"
          });
        }
      } else {
        vm.busy = false;
        vm.$emit("go", {
          msg: "TERJADI KESALAHAN PADA SERVER",
          color: "danger"
        });
      }
    },
    place() {
      if (this.data.file1 == "") {
        return "Pilih File";
      } else {
        return this.data.file1.name;
      }
    }
  }
};
</script>
