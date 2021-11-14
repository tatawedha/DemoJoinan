<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CTabs>
              <CTab title="Data Konten" active>
                <CForm class="mt-4">
                  <CInput label="Judul" horizontal :value.sync="data.judul" />
                  <CInput
                    label="Kategori"
                    horizontal
                    :value.sync="data.kategori"
                  />
                  <CInput label="Model" horizontal :value.sync="data.model" />
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
              </CTab>
              <CTab title="Image Konten">
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
                  <CImg :src="src" style="max-height: 400px; max-width:700px" />
                </center>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
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
  </CContainer>
</template>

<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
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
      tags: [],
      busy: false,
      src: ""
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
