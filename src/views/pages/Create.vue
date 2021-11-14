<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CTabs fluid fade>
              <CTab title="Data Konten" active>
                <CForm class="mt-4">
                  <CInput label="Judul" horizontal :value.sync="data.judul" />
                  <CSelect
                    label="Kategori"
                    horizontal
                    :options="kate"
                    :value.sync="data.kategori"
                  />
                  <CSelect
                    label="Model"
                    horizontal
                    :value.sync="data.model"
                    :options="model"
                  />
                  <CRow>
                    <CCol class="col-md-3"><p class="mt-3">Tags</p> </CCol>
                    <CCol class="col-md-9 pl-1 mt-2"
                      ><multiselect
                        v-model="data.tags"
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
                    <CButton
                      block
                      @click="regis()"
                      color="success"
                      :disabled="busy"
                    >
                      <CSpinner v-if="busy" size="sm" /> DAFTAR</CButton
                    >
                  </CCol>
                  <CCol></CCol>
                </CRow>
              </CTab>
              <!-- <CTab title="Image Konten"> </CTab> -->
              <CTab title="Isi Konten">
                <CRow>
                  <CCol>
                    <CForm class="mt-4">
                      <CInput label="Type" horizontal :value.sync="isi.type" />
                      <CInput label="Title" horizontal :value.sync="isi.type" />
                      <CInputFile
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
                    <CRow v-if="src1 != ''" class="mb-4">
                      <CCol class="col-md-3"></CCol>
                      <CCol class="col-md-9">
                        <center>
                          <CImg
                            :src="src1"
                            style="max-height: 200px; max-width:500px;"
                          />
                        </center>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol class="col-md-3 pt-4 mt-4">Konten</CCol>
                      <CCol class="col-md-9 pl-2"
                        ><quill-editor v-model="isi.konten"
                      /></CCol>
                    </CRow>
                    <CRow class="mb-3 mt-4">
                      <CCol></CCol>
                      <CCol class="col-md-4">
                        <CButton
                          block
                          @click="regis()"
                          color="success"
                          :disabled="busy"
                        >
                          <CSpinner v-if="busy" size="sm" /> TAMBAHKAN</CButton
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
                        <CDataTable
                          :items="items"
                          :fields="fields"
                        ></CDataTable>
                      </CCardBody> </CCard></CCol
                ></CRow>
              </CTab>
              <CTab title="Preview">
                <CRow class="mt-4">
                  <CCol>
                    <CCard>
                      <CCardBody>
                        <h3>{{ data.judul }}</h3>
                        <div></div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
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
  components: { Multiselect },
  data() {
    return {
      data: {
        judul: "",
        kategori: "",
        model: "",
        file: "",
        tags: ""
      },
      isi: {
        type: ""
      },
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
      tags: [],
      busy: false,
      src: "",
      src1: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleFile() {
      this.data.file = this.$refs.file.$data.state[0];
      this.src = URL.createObjectURL(this.data.file);
    },
    handleFile1() {
      this.data.file1 = this.$refs.file1.$data.state[0];
      this.src1 = URL.createObjectURL(this.data.file1);
    },
    place() {},
    async regis() {
      let konten = await axios.post(ipBackend + "konten/register");
    },
    async regis() {
      let vm = this;
      let formData = new FormData();
      formData.append("file1", vm.data.file);
      formData.append("judul", vm.data.judul);
      formData.append("kategori", vm.data.kategori);
      formData.append("model", vm.data.model);
      formData.append("tags", vm.data.model);
      let regis = await axios.post(ipBackend + "konten/register", formData);
      console.log(regis.data.data);
    },
    async getData() {
      let tags = await axios.get(ipBackend + "masterTags/list");

      console.log(tags);
      this.tags = tags.data.data;
    }
  }
};
</script>

<style></style>
