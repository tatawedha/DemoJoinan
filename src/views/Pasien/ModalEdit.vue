<template>
  <CContainer>
    <CRow>
      <CCol>
        <CButton
          color="warning"
          v-c-tooltip="'Edit Pasien'"
          @click="myModal = true"
          class="mr-1"
        >
          <CIcon name="cil-pencil" />
        </CButton>
      </CCol>
      <CModal title="Edit Pasien " size="lg" :show.sync="myModal">
        <CRow>
          <CCol>
            <CForm>
              <CInput label="Nama" horizontal :value.sync="item.nama" />
              <CSelect
                :options="jk"
                label="Jenis Kelamin"
                horizontal
                :value.sync="item.jenisKelamin"
              />
              <CInput
                type="date"
                label="Tanggal Lahir"
                horizontal
                :value="moment(item.tanggalLahir).format('dd/mm/yyyy')"
              />

              <CSelect
                :options="gd"
                label="Golongan Darah"
                horizontal
                :value.sync="item.golonganDarah"
              />
              <CInput
                label="Tinggi Badan (Cm)"
                horizontal
                :value.sync="item.tinggiBadan"
              />
              <CInput
                label="Berat Badan (Kg)"
                horizontal
                :value.sync="item.beratBadan"
              />
              <CInput
                label="Pekerjaan"
                horizontal
                :value.sync="item.pekerjaan"
              />
              <CTextarea label="Alamat" horizontal :value.sync="item.alamat" />
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
  props: ["item"],
  data() {
    return {
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
      let x = vm.sendDate(vm.item.tanggalLahir);
      vm.item.tanggalLahir = x;
      let regis = await axios.post(ipBackend + "users/update", vm.item);

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
