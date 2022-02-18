<template>
  <CContainer>
    <CRow>
      <CCol>
        <CForm class="mt-4">
          <CInput
            label="Nomor Konten"
            horizontal
            :value.sync="dataSub.nomorSub"
          />
          <CSelect
            :options="tipe"
            label="Tipe  Sub Konten"
            horizontal
            :value.sync="dataSub.tipeSub"
          />
          <CInput
            label="Judul Sub"
            horizontal
            :value.sync="dataSub.judulSubKonten"
          />
          <CInput
            label="Link Sub"
            horizontal
            :value.sync="dataSub.linkSub"
            v-if="dataSub.tipeSub == 'Link'"
          />
          <CInput
            v-if="dataSub.tipeSub == 'Gambar'"
            label="Nama Gambar"
            horizontal
            :value.sync="dataSub.namaGambar"
          />
          <CInputFile
            v-if="dataSub.tipeSub == 'Gambar'"
            class="mt-4 mb-4"
            accept="image/jpeg, image/png, image/gif"
            label="Images"
            id="file1"
            custom
            horizontal
            ref="file1"
            @change="handleFile1()"
            :placeholder="place()"
          />
        </CForm>
        <CRow v-if="src != ''" class="mb-4">
          <CCol class="col-md-3"></CCol>
          <CCol class="col-md-9">
            <center>
              <CImg v-if="src" :src="src" style="max-height: 200px; max-width:500px;" />
            </center>
          </CCol>
        </CRow>
        <!-- <CRow>
          <CCol class="col-md-3 pt-4 mt-4">Konten</CCol>
          <CCol class="col-md-9 pl-2"
            ><quill-editor v-model="dataSub.textKonten"
          /></CCol>
        </CRow> -->
        <CRow>
          <CCol class="col-md-3 pt-4 mt-4">Konten</CCol>
          <CCol class="col-md-9 pl-2"
            ><VueEditor
              v-model="dataSub.textKonten"
          ></VueEditor></CCol>
        </CRow>
        <CRow class="mb-3 mt-4">
          <CCol></CCol>
          <CCol class="col-md-4">
            <CButton
              v-if="dataSub.id == null"
              block
              @click="regisSub()"
              color="success"
              :disabled="busy"
            >
              <CSpinner v-if="busy" size="sm" /> TAMBAHKAN</CButton
            >
            <CButton
              v-else
              block
              @click="updateSub()"
              color="success"
              :disabled="busy"
            >
              <CSpinner v-if="busy" size="sm" /> UPDATE</CButton
            >
          </CCol>
          <CCol></CCol>
        </CRow>
      </CCol>
    </CRow>
    <CRow
      ><CCol>
        <CCard>
          <CCardBody>
            <CDataTable :items="subs" :fields="fields" striped>
              <template #Actions="{item}">
                <CButton
                  color="warning"
                  v-c-tooltip="'Edit Sub Konten'"
                  @click="dataSub = item, src= ipBackend + item.gambarSubKonten"
                  class="mr-1"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
                <CButton
                  color="danger"
                  v-c-tooltip="'Hapus Konten'"
                  class="mr-1"
                  @click="myModal = true, dataSub = item"
                >
                  <CIcon name="cil-trash" />
                </CButton>
              </template>
            </CDataTable>
          </CCardBody> </CCard></CCol
    ></CRow>

    <CModal title="Hapus Sub Konten" :show.sync="myModal">
      <H5>Apakah Anda Yakin Menghapus Data Sub Konten?</H5>
      <template #footer>
        <CCol col="6" class="text-center">
          <CButton @click="(myModal = false), hapus()" color="success"
            >Yakin</CButton
          >
        </CCol>
        <CCol>
          <CButton @click="myModal = false" color="danger">Tidak</CButton>
        </CCol>
      </template>
    </CModal>
  </CContainer>
</template>

<script>
import Vue from "vue";
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import Multiselect from "vue-multiselect";
// import richtexteditor from "vue-rich-text-editor"
// import "vue-multiselect/dist/vue-multiselect.min.css";
import VueQuillEditor from "vue-quill-editor";
import { VueEditor, Quill } from "vue2-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {resizeImage} from "@/resize.js"

Vue.use(VueQuillEditor);
export default {
  components: { Multiselect, VueEditor},
  props: ["kontenId"],
  data() {
    return {
      ipBackend,
      subs: [],
      dataSub: {
        file1: "",
        tipeSub: "",
        judulSubKonten: "",
        nomorSub: "",
        textKonten: "",
        linkSub: "",
      },
      namaGambar: "",
      tipe: [
        { value: "", label: "" },
        { value: "Artikel", label: "Artikel" },
        { value: "Gambar", label: "Gambar" },
        { value: "Link", label: "Link" }
      ],
      fields: [
        { key: "nomorSub", label: "No", _style: "width:1%" },
        {
          key: "judulSubKonten",
          label: "Judul",
          _style: "min-width:20%"
        },
        {
          key: "tipeSub",
          label: "Model",
          _style: "min-width:10%"
        },
        { key: "namaGambar", label: "Nama Gambar", _style: "width:10%" },
        { key: "linkSub", label: "Link", _style: "width:20%" },
        { key: "kreatorId", label: "Kreator", _style: "width:10%" },
        {
          key: "Actions",
          label: "Actions",
          _style: "max-width:5%",
          sorter: false,
          filter: false
        }
      ],
      busy: false,
      src: "",
      myModal: false
    };
  },
  computed: {},
  created() {},
  methods: {
    handleFile() {
      this.data.file = this.$refs.file.$data.state[0];
      this.src = URL.createObjectURL(this.data.file);
    },
    handleFile1() {
      this.dataSub.file1 = this.$refs.file1.$data.state[0];
      this.namaGambar = this.$refs.file1.$data.state[0].name
      resizeImage({
        file: this.dataSub.file1,
        maxSize:700,
      }).then(res=>{
        // console.log(res)
        this.dataSub.file1 = res
        this.src = URL.createObjectURL(res);
      }).catch(err=>{
        console.log(err)
      })
    },
    place() {},
    // async regis() {
    //   let konten = await axios.post(ipBackend + "konten/register");
    // },
    async regisSub() {
      let vm = this;
      let formData = new FormData();
      if (vm.dataSub.file1) {
        formData.append("file1", vm.dataSub.file1, vm.namaGambar);
      }
      formData.append("judulSubKonten", vm.dataSub.judulSubKonten);
      formData.append("textKonten", vm.dataSub.textKonten);
      formData.append("tipeSub", vm.dataSub.tipeSub);
      formData.append("linkSub", vm.dataSub.linkSub);
      formData.append("kontenId", vm.kontenId);
      formData.append("nomorSub", vm.dataSub.nomorSub);
      formData.append("namaGambar", vm.dataSub.namaGambar);
      let regisSub = await axios.post(
        ipBackend + "subKonten/register",
        formData
      );
      console.log(regisSub);
      if (regisSub.data.status == 200) {
        if (regisSub.data.message == "sukses") {
          vm.busy = false;
          vm.resetSub();
          vm.$emit("alert", {
            variant: "success",
            msg: "BERHASIL MENAMBAH/MENGUBAH SUB KONTEN",
            showing: true
          });
          vm.getSub();
        } else {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "danger",
            msg: regisSub.data.message.toUpper(),
            showing: true
          });
        }
      } else {
        vm.$emit("alert", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true
        });
      }
    },
    async updateSub() {
      let vm = this;
      let formData = new FormData();
      if (vm.dataSub.file1 != "") {
        formData.append("file1", vm.dataSub.file1, vm.namaGambar);
      }
      formData.append("id", vm.dataSub.id);
      formData.append("judulSubKonten", vm.dataSub.judulSubKonten);
      formData.append("textKonten", vm.dataSub.textKonten);
      formData.append("tipeSub", vm.dataSub.tipeSub);
      formData.append("linkSub", vm.dataSub.linkSub);
      formData.append("nomorSub", vm.dataSub.nomorSub);
      formData.append("namaGambar", vm.dataSub.namaGambar);
      let regisSub = await axios.post(ipBackend + "subKonten/update", formData);
      console.log(regisSub);
      if (regisSub.data.status == 200) {
        if (regisSub.data.message == "sukses") {
          vm.busy = false;
          vm.resetSub();
          vm.$emit("alert", {
            variant: "success",
            msg: "BERHASIL MENAMBAH/MENGUBAH SUB KONTEN",
            showing: true
          });
          vm.getSub();
        } else {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "danger",
            msg: _.toUpper(regisSub.data.message),
            showing: true
          });
        }
      } else {
        vm.$emit("alert", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true
        });
      }
    },
    async hapus() {
      let vm = this;
      vm.busy = true
      let hapus = await axios.post(ipBackend + "subKonten/delete", vm.dataSub);
      console.log(hapus);
      if (hapus.data.status == 200) {
        if (hapus.data.message == "sukses") {
          vm.busy = false;
          vm.resetSub();
          vm.$emit("alert", {
            variant: "success",
            msg: "BERHASIL MENAMBAH/MENGUBAH SUB KONTEN",
            showing: true
          });
          vm.getSub();
        } else {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "danger",
            msg: _.toUpper(hapus.data.message),
            showing: true
          });
        }
      } else {
        vm.$emit("alert", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true
        });
      }
    },
    async getData() {
      let tags = await axios.get(ipBackend + "masterTags/list");

      console.log(tags);
      this.tags = tags.data.data;
    },
    async getSub() {
      let vm = this;
      let sub = await axios.get(
        ipBackend + "subKonten/listByKontenId/" + vm.kontenId
      );

      // console.log(sub, "<< sub");
      vm.subs = sub.data.data;
      vm.subs.sort(function(a, b) {
        return a.nomorSub - b.nomorSub;
      });
    },
    resetSub() {
      let vm = this;
      vm.dataSub = {
        file1: "",
        tipeSub: "",
        judulSubKonten: "",
        nomorSub: "",
        textKonten: "",
        linkSub: "",
        namaGambar: ""
      };
    }
  },

  watch: {
    kontenId: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getSub();
      }
    }
  }
};
</script>

<style scoped>
/* @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css"; */
#editor-container {
  max-height: 500px;
  overflow-y: auto;
  font-size: 1rem;
}
</style>
