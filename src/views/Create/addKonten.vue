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
            v-model="bulkTag"
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
      <CImg v-if="data.src != ''" :src="data.src" />
    </center>

    <CRow class="mb-3 mt-4">
      <CCol></CCol>
      <CCol class="col-md-4">
        <CButton
          v-if="data.id == null"
          block
          @click="regis()"
          color="success"
          :disabled="busy"
        >
          <CSpinner v-if="busy" size="sm" /> DAFTAR</CButton
        >
        <CButton
          v-if="data.id != null"
          block
          @click="update()"
          color="success"
          :disabled="busy"
        >
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
import { resizeImage } from "@/resize.js";
export default {
  components: { Multiselect },
  props: ["data", "tags"],
  data() {
    return {
      busy: false,
      variant: "",
      namaGambar:"",
      bulkTag:[],
      file:"",
      kate: [
        { value: "", label: "" },
        { value: "Absurb", label: "Absurb" },
        { value: "Story", label: "Story" },
        { value: "History", label: "History" },
        { value: "Edukasi", label: "Edukasi" },
        { value: "30s F", label: "30s Fact" },
        { value: "Something", label:"Something"},
        { value: "Pengumuman", label:"Pengumuman"}
      ],
      model: [
        { value: "", label: "" },
        { value: "List", label: "List" },
        { value: "30Seconds", label: "30Seconds" },
        { value: "Artikel", label: "Artikel" },
      ]
    };
  },
  computed: {
    bulkT() {
      let vm = this;
      if (vm.bulkTag != []) {
        return vm.bulkTag.map(item => {
          return { masterTagId: item.id };
        });
      }
    }
  },
  created() {
    // this.getData();
  },
  methods: {
    handleFile() {
      this.file = this.$refs.file.$data.state[0];
      this.namaGambar = this.$refs.file.$data.state[0].name
      resizeImage({
        file: this.file,
        maxSize: 700
      })
        .then(res => {
          // console.log(res, this.namaGambar);
          this.file = res;
          this.data.src = URL.createObjectURL(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    place() {},
    // async regis() {
    //   let konten = await axios.post(ipBackend + "konten/register");
    // },
    async regis() {
      let vm = this;
      let formData = new FormData();
      //   console.log(vm.bulkT);
      formData.append("file1", vm.file);
      formData.append("judulKonten", vm.data.judulKonten);
      formData.append("typeKonten", vm.data.typeKonten);
      formData.append("modelKonten", vm.data.modelKonten);
      formData.append("bulkTagString", JSON.stringify(vm.bulkT));
      let regis = await axios.post(ipBackend + "konten/register", formData);
      // console.log(regis.data.data.id, "ini");

      if (regis.data.status == 200) {
        if (regis.data.message == "sukses") {
          vm.busy = false;
          vm.file= ""
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
            msg: res.data.message.toUpper(),
            showing: true
          });
        }
      } else {
        vm.busy = false;
        vm.$emit("alert", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true
        });
      }
    },
    async update() {
      let vm = this;
      let formData = new FormData();
      // console.log(vm.bulkT);
      formData.append("kontenId", vm.data.id);
      if(vm.file != ""){
        formData.append("file1", vm.file, vm.namaGambar );
      }
      formData.append("judulKonten", vm.data.judulKonten);
      formData.append("typeKonten", vm.data.typeKonten);
      formData.append("modelKonten", vm.data.modelKonten);
        formData.append("bulkTagString", JSON.stringify(vm.bulkT));
      let regis = await axios.post(ipBackend + "konten/update", formData);
      // console.log(regis.data.data, "ini update");
      if (regis.data.status == 200) {
        if (regis.data.message == "sukses") {
          vm.busy = false;
          vm.file= ""
          vm.$emit("alert", {
            variant: "success",
            msg: "BERHASIL MENGUPDATE KONTEN ",
            kontenId: regis.data.data.id,
            showing: true
          });
        } else {
          vm.busy = false;
          vm.$emit("alert", {
            variant: "danger",
            msg: res.data.message.toUpper(),
            showing: true
          });
        }
      } else {
        vm.busy = false;
        vm.$emit("alert", {
          variant: "danger",
          msg: "TERJADI KESALAHAN PADA SERVER",
          showing: true
        });
      }
    }
  },
  watch: {
    data: async function(val) {
      let vm = this;
      if (val) {
        let tags = await axios.get(
          ipBackend + "masterTags/listByKontenId/" + val.id
        )
          vm.bulkTag = tags.data.data;
        console.log(tags.data.data)
        
        // this.$forceUpdate();
      }
    }
  }
};
</script>
