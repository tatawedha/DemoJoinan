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
              <CTextarea label="Alamat" horizontal :value.sync="data.alamat" />
            </CForm>
            <CInputFile
              accept="image/jpeg, image/png, image/gif"
              label="Foto"
              id="file1"
              custom
              horizontal
              ref="file1"
              @change="handleFile()"
              :placeholder="place()"
            />
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
        username: "",
        password: "",
        nama: "",
        role: "Pasien",
        jenisKelamin: "",
        tanggalLahir: "",
        golonganDarah: "",
        tinggiBadan: "",
        beratBadan: "",
        pekerjaan: "",
        alamat: "",
        file1: ""
      },
      src1: "",
      timeout: 4000,
      busy: false,
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
    handleFile() {
      this.data.file1 = this.$refs.file1.$data.state[0];
      this.src1 = URL.createObjectURL(this.data.file1);
    },
    sendDate(x) {
      return moment(x).format("YYYY/MM/DD");
    },
    async regis() {
      let vm = this;
      vm.busy = true;
      let formData = new FormData();
      formData.append("username", vm.data.username);
      formData.append("password", vm.data.password);
      formData.append("nama", vm.data.nama);
      formData.append("jenisKelamin", vm.data.jenisKelamin);
      formData.append("alamat", vm.data.alamat);
      formData.append("tinggiBadan", vm.data.tinggiBadan);
      formData.append("beratBadan", vm.data.beratBadan);
      formData.append("golonganDarah", vm.data.golonganDarah);
      formData.append("tanggalLahir", vm.sendDate(vm.data.tanggalLahir));
      formData.append("file1", vm.data.file1);
      formData.append("role", vm.data.role);
      formData.append("pekerjaan", vm.data.pekerjaan);
      let regis = await axios.post(ipBackend + "users/register", vm.data);

      console.log(regis);
      if (regis.data.status == 200) {
        if (regis.data.message == "sukses") {
          vm.busy = false;
          vm.$emit("go", {
            msg: "PENDAFTARAN USER BERHASIL",
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
