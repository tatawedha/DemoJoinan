<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <center>
            <h3>FORM REGISTER MAGANG</h3>
          </center>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CInput label="Judul Magang" horizontal :value.sync="judul" />
            <CTextarea
              label="Deskripsi Magang"
              :value.sync="deskripsi"
              rows="7"
            />
            <CInputFile
              accept="image/jpeg, image/png, image/gif"
              label="Upload Dokumen"
              id="file"
              custom
              horizontal
              ref="file"
              @change="handleFile()"
              :placeholder="place()"
            />
            <p></p>
            <CCol col="12" class="text-center">
              <CButton color="primary" class="px-4" @click="regisMagang()"
                >Simpan</CButton
              >
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "axios";
import ipBackend from "@/ipBackend";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import moment from "moment";
import "moment/locale/id";
export default {
  name: "FormAddMagang",
  components: {
    Multiselect
  },
  props: ["tik", "kontribs"],
  data() {
    return {
      judul: "",
      file: "",
      deskripsi: ""
    };
  },
  methods: {
    handleFile() {
      this.file = this.$refs.file.$data.state[0];
      console.log(this.file);
    },
    regisMagang() {
      let vm = this;
      let formData = new FormData();
      formData.append("file", vm.file);
      formData.append("deskripsiMagang", vm.deskripsi);
      formData.append("judulMagang", vm.judul);
      axios
        .post(ipBackEnd + "magang/register", formData , {
          headers: {
            token: localStorage.getItem("tokenAdmin"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          this.$emit("tembak");
        })
        .catch(err => {
          console.log(err);
        });
    },
    place(){
      if(this.file == ""){
        return 'Pilih File'
      }else{
        return this.file.name
      }
    }
  },
  watch: {
    deskripsi: function(val) {
      console.log(val);
    },
    judul: function(val) {
      console.log(val);
    }
  }
};
</script>
<style>
.upload {
  margin-bottom: 15px;
}
</style>
