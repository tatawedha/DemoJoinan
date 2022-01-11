<template>
  <CContainer>
    <CForm class="mt-4">
      <CInput label="Judul" horizontal :value.sync="data.judulKonten" />
      <CSelect
        label="Type"
        horizontal
        :options="kate"
        :value.sync="data.typeKonten"
      />
      <CSelect
        label="Model"
        horizontal
        :value.sync="data.modelKonten"
        :options="model"
      />
      <CRow>
        <CCol class="col-md-3"><p class="mt-3">Tags</p> </CCol>
        <CCol class="col-md-9 pl-1 mt-2"
          ><multiselect
            v-model="data.bulkTag"
            :options="tags"
            :multiple="true"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            track-by="id"
            label="namamasterTags"
            placeholder="-- Pilih Tags --"
          ></multiselect
        ></CCol>
      </CRow>
    </CForm>

    <CInputFile
      class="mt-4 mb-4"
      accept="image/jpeg, image/png, image/gif"
      label="Foto"
      id="file"
      custom
      horizontal
      ref="file"
      @change="handleFile()"
      :placeholder="place()"
    />
    <center>
      <CImg
        v-if="src != ''"
        :src="src"
        style="max-height: 400px; max-width:700px;"
      />
    </center>

    <CRow class="mb-3 mt-4">
      <CCol></CCol>
      <CCol class="col-md-4">
        <CButton v-if="data.id ==null" block @click="regis()" color="success" :disabled="busy">
          <CSpinner v-if="busy" size="sm" /> DAFTAR</CButton
        >
        <CButton  v-if="data.id != null" block @click="regis()" color="success" :disabled="busy">
          <CSpinner v-if="busy" size="sm" /> UPDATE</CButton
        >
      </CCol>
      <CCol></CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {Multiselect},
  props:["data"],
  data() {
    return {
      tags: [],
      busy: false,
      src:"",
      kate: [
        { value: "", label: "" },
        { value: "Absurb", label: "Absurb" },
        { value: "Story", label: "Story" },
        { value: "History", label: "History" },
        { value: "Edukasi", label: "Edukasi" },
        { value: "30s F", label: "30s Fact" }
      ],
      model: [
        { value: "", label: "" },
        { value: "List", label: "List" },
        { value: "30Seconds", label: "30Seconds" },
        { value: "Artikel", label: "Artikel" }
      ]
    };
  },
  computed: {
    bulkT() {
      return this.data.bulkTag.map(item => {
        console.log(item);
        return { masterTagId: item.id };
      });
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleFile() {
      this.data.file = this.$refs.file.$data.state[0];
      this.src = URL.createObjectURL(this.data.file);
    },
    place() {},
    // async regis() {
    //   let konten = await axios.post(ipBackend + "konten/register");
    // },
    async regis() {
      let vm = this;
      let formData = new FormData();
      //   console.log(vm.bulkT);
      formData.append("file1", vm.data.file);
      formData.append("judulKonten", vm.data.judulKonten);
      formData.append("typeKonten", vm.data.typeKonten);
      formData.append("modelKonten", vm.data.modelKonten);
      formData.append("bulkTagString", JSON.stringify(vm.bulkT));
      let regis = await axios.post(ipBackend + "konten/register", formData);
      console.log(regis, "ini");

      if (regis.data.status == 200) {
        if (regis.data.message == "sukses") {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "success",
            msg: "BERHASIL MENAMBAH KONTEN BARU",
            kontenId: regis.data.data.id,
            showing: true
          });
        } else {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "danger",
            msg: _.toUpper(res.data.message),
            showing: true
          });
        }
      } else {
          vm.busy= false
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
      let sub = await axios.get(
        ipBackend + "subKonten/listByKontenId/" + vm.kontenId
      );

      console.log(sub);
      vm.subs = sub.data.data;
    }
  },
  resetSub() {
    vm.dataSub = {
      file1: "",
      modelSub: "",
      judulSubKonten: "",
      nomorSub: "",
      textKonten: "",
      linkSub: "",
      namaGambar: ""
    };
  }
};
</script>
