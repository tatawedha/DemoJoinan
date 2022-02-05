<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CCardBody>
              <!-- <b-form-group label-cols-md="3"> -->
              <!-- <template v-slot:label>
                Kelurahan <span class="text-danger">*</span>
              </template> -->
              <multiselect
                v-model="search"
                :options="konten"
                :multiple="false"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                label="judulKonten"
                track-By="kontenId"
                placeholder="-- Cari Judul --"
              ></multiselect>
              <!-- </b-form-group> -->
            </CCardBody>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <CTabs fluid>
              <CTab title="Data Konten" active>
                <Add :data="data" :tags="tags" @alert="setSub($event)"></Add>
              </CTab>
              <CTab title="Isi Konten" :disabled="kontenId == ''">
                <AddSub
                  :subs="subs"
                  :kontenId="kontenId"
                  @alert="change = !change"
                ></AddSub>
              </CTab>
              <CTab title="Preview" :disabled="kontenId == ''">
                <Preview
                  :kontenId="kontenId"
                  :data="data"
                  :change="change"
                ></Preview>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal
      title="Berhasil"
      size="sm"
      :show.sync="myModal1"
      hide-footer
      centered
    >
      <CCol col="12" class="text-center">
        <CButton :color="variant" @click="myModal1 = false">{{ msg }}</CButton>
      </CCol>
      <template #footer-wrapper> <span></span> </template>
    </CModal>
  </CContainer>
</template>

<script>
import Add from "@/views/Create/addKonten.vue";
import AddSub from "./addSubKonten.vue";
import Preview from "./PreviewKonten.vue";
import Vue from "vue";
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);
export default {
  components: { Multiselect, Add, AddSub, Preview },
  data() {
    return {
      data: {
        judulKonten: "",
        typeKonten: "",
        modelKonten: "",
        file: "",
        bulkTag: [],
        src: ""
      },
      search: "",
      kontenId: "",
      change: false,
      subs: [],
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
      ],
      tipe: [
        { value: "", label: "" },
        { value: "Artikel", label: "Artikel" },
        { value: "Gambar", label: "Gambar" }
      ],
      fields: [
        { key: "nomor", label: "No", _style: "width:1%" },
        {
          key: "judulSubKonten",
          label: "Judul",
          _style: "min-width:20%;text-align:center"
        },
        {
          key: "modelSub",
          label: "Model",
          _style: "min-width:10%;text-align:center"
        },
        { key: "typeKonten", label: "Type", _style: "width:10%" },
        { key: "linkSub", label: "Link", _style: "width:20%" },
        { key: "kreatorId", label: "Kreator", _style: "width:10%" },
        {
          key: "Actions",
          label: "Actions",
          _style: "max-width:10%",
          sorter: false,
          filter: false
        }
      ],
      tags: [],
      konten: [],
      msg: "",
      busy: false,
      variant: "",
      color: "",
      src: "",
      src1: "",
      myModal1: false
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
    setKonten(x) {
      // console.log(x);
      let vm = this;
      vm.kontenId = x.id;
      // vm.kontenId = x.kontenId;
      vm.data = x;
      vm.setSub(x);
      vm.change = !vm.change;
    },
    setSub(x) {
      // console.log(x);
      let vm = this;
      vm.kontenId = x.kontenId;
      vm.myModal1 = x.showing;
      vm.msg = x.msg;
      vm.variant = x.variant;
    },
    place() {},
    // async regis() {
    //   let konten = await axios.post(ipBackend + "konten/register");
    // },
    async getData() {
      let tags = await axios.get(ipBackend + "masterTags/list");

      console.log(tags);
      this.tags = tags.data.data;

      let konten = await axios.get(ipBackend + "konten/list");

      this.konten = konten.data.data.map(item => {
        item.kontenId = item.id;
        item.src = ipBackend + item.gambarKonten;
        return item;
      });
    },
    async getSub() {
      let vm = this;
      // vm.subs = [];
      // let sub = await axios.get(
      //   ipBackend + "subKonten/listByKontenId/" + vm.kontenId
      // );
      // // console.log(sub.data.data, "<<");
      // sub.data.data.forEach(ele => {
      //   vm.subs.push(ele);
      // });

      // let tags = await axios.get(
      //   ipBackend + "masterTags/listByKontenId/" + vm.kontenId
      // );
      // console.log(tags, "tagsss");
      // vm.data.bulkTag = tags.data.data;
    }
  },
  watch: {
    kontenId: function(newVal, oldVal) {
      if (newVal != oldVal) {
        // this.getData();
      }
    },
    search: function(val) {
      let vm = this;
      if (val == null) {
        vm.data = {
          judulKonten: "",
          typeKonten: "",
          modelKonten: "",
          file: "",
          bulkTag: ""
        };
      } else {
        vm.setKonten(vm.search);
      }
    }
  }
};
</script>

<style></style>
