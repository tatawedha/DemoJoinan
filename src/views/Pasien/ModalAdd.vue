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
              <CInput label="Username" horizontal :value.sync="data.username" />
              <CInput label="Password" horizontal :value.sync="data.password" />
              <CSelect
                :options="peran"
                label="Peran"
                horizontal
                :value.sync="data.role"
              />
              <CInput label="Nama" horizontal :value.sync="data.nama" />
              <CSelect
                :options="jk"
                label="Jenis Kelamin"
                horizontal
                :value.sync="data.jenisKelamin"
              />
              <CInput
                type="date"
                label="Tanggal Lahir"
                horizontal
                :value.sync="data.tanggalLahir"
                placeholder="DD-MM-YYYY"
              />

              <CSelect
                :options="gd"
                label="Golongan Darah"
                horizontal
                :value.sync="data.golonganDarah"
              />
              <CInput
                label="Tinggi Badan (Cm)"
                horizontal
                :value.sync="data.tinggiBadan"
              />
              <CInput
                label="Berat Badan (Kg)"
                horizontal
                :value.sync="data.beratBadan"
              />
              <CInput
                label="Pekerjaan"
                horizontal
                :value.sync="data.pekerjaan"
              />
              <CTextarea label="Alamat" horizontal :value.sync="data.Alamat" />
            </CForm>
          </CCol>
        </CRow>
        <CRow class="mb-3 mt-4">
          <CCol></CCol>
          <CCol class="col-md-4">
            <CButton color="primary" block @click="regis()">DAFTAR</CButton>
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
export default {
  name: "ModalAdd",
  components: {},
  props: [],
  data() {
    return {
      data: {
        username: "",
        password: "",
        nama: "",
        role: "",
        jenisKelamin: "",
        tanggalLahir: "",
        golonganDarah: "",
        tinggiBadan: "",
        beratBadan: "",
        pekerjaan: "",
        alamat: "",
        file1: ""
      },
      jk: [
        { value: null, label: "" },
        { value: "Laki-laki", label: "Laki-laki" },
        { value: "Perempuan", label: "Perempuan" }
      ],
      gd: [
        { value: null, label: "" },
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "O", laOel: "O" },
        { value: "AB", label: "AB" }
      ],
      peran: [
        { value: null, label: "" },
        { value: "Pasien", label: "Pasien" },
        { value: "Dokter", label: "Dokter" }
      ],
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
    sendDate(x) {
      return moment(x).format("YYYY/MM/DD");
    },
    async regis() {
      let vm = this;
      let x = vm.sendDate(vm.data.tanggalLahir);
      vm.data.tanggalLahir = x;
      let regis = await axios.post(ipBackend + "users/register", vm.data);

      console.log(regis);
      if (regis.data.status == 200) {
        if (res.data.message == "sukses") {
          vm.$emit("go", {
            msg: "PENDAFTARAN USER BERHASIL",
            color: "success"
          });
        } else {
          vm.$emit("go", {
            msg: res.data.message.toUpperCase(),
            color: "warning"
          });
        }
      } else {
        vm.$emit("go", {
          msg: "TERJADI KESALAHAN PADA SERVER",
          color: "danger"
        });
      }
    }
  }
};
</script>
