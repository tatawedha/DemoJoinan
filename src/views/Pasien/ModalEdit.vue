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
      <CModal title="Edit Pasien " size="lg" :show.sync="myModal" align="left">
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
                :value="dates(item.tanggalLahir)"
                @change="getDate($event)"
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
            </CForm>
          </CCol>
        </CRow>
        <CRow class="mb-3 mt-4">
          <CCol></CCol>
          <CCol class="col-md-4">
            <CButton @click="update()" color="success" :disabled="busy" block>
              <CSpinner v-if="busy" size="sm" /> SIMPAN
            </CButton>
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
  props: ["item"],
  data() {
    return {
      moment,
      busy: false,
      file1: "",
      src1: "",
      lahir: "",
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
      this.file1 = this.$refs.file1.$data.state[0];
      this.src1 = URL.createObjectURL(this.file1);
      console.log(this.file1);
    },
    sendDate(x) {
      return moment(x).format("YYYY/MM/DD");
    },
    dates(val) {
      return moment(val).format("YYYY-MM-DD");
    },
    getDate: function(x) {
      this.lahir = x;
    },
    async update() {
      let vm = this;
      let formData = new FormData();
      let x = vm.sendDate(vm.lahir);
      vm.busy = true;
      formData.append("id", vm.item.id);
      formData.append("nama", vm.item.nama);
      formData.append("jenisKelamin", vm.item.jenisKelamin);
      formData.append("alamat", vm.item.alamat);
      formData.append("tinggiBadan", vm.item.tinggiBadan);
      formData.append("beratBadan", vm.item.beratBadan);
      formData.append("golonganDarah", vm.item.golonganDarah);
      if (lahir) {
        formData.append("tanggalLahir", x);
      }
      if (vm.file1) {
        formData.append("file1", vm.file1);
      }
      formData.append("role", vm.item.role);
      formData.append("pekerjaan", vm.item.pekerjaan);
      let update = await axios.post(ipBackend + "users/update", formData);

      console.log(update);
      if (update.data.status == 200) {
        if (update.data.message == "sukses") {
          vm.$emit("go", {
            msg: "UPDATE PASIEN BERHASIL",
            color: "success"
          });
          vm.busy = false;
          vm.myModal = false;
        } else {
          vm.$emit("go", {
            msg: res.data.message.toUpperCase(),
            color: "warning"
          });
          vm.busy = false;
        }
      } else {
        vm.$emit("go", {
          msg: "TERJADI KESALAHAN PADA SERVER",
          color: "danger"
        });
        vm.busy = false;
      }
    },
    place() {
      if (this.file1 == "") {
        return "Pilih File";
      } else {
        return this.file1.name;
      }
    }
  }
};
</script>
