<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CTabs fluid>
              <CTab title="Data Konten" active>
                <Add :data="data" @alert="setSub($event)"></Add>
              </CTab>
              <CTab title="Isi Konten">
                <AddSub
                  :dataSub="dataSub"
                  :subs="subs"
                  :kontenId="kontenId"
                ></AddSub>
              </CTab>
              <CTab title="Preview">
                <Preview :data="data" :subs="subs"></Preview>
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
        <CButton @click="(myModal = false), lanjut()" :color="color" block
          >Masuk</CButton
        >
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
        bulkTag: ""
      },
      dataSub: {
        file1: "",
        modelSub: "",
        judulSubKonten: "",
        nomorSub: "",
        textKonten: "",
        linkSub: "",
        namaGambar: ""
      },
      kontenId: "",
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
      tags: "",
      busy: false,
      variant: "",
      color:"",
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
    setSub(x) {
      console.log(x);
      let vm = this;
      vm.kontenId = x.kontenId;
      vm.myModal1 = x.showing;
    },
    place() {},
    // async regis() {
    //   let konten = await axios.post(ipBackend + "konten/register");
    // },
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
  watch: {
    kontenId: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getSub();
      }
    }
  }
};
</script>

<style></style>
