<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <center>
            <h3>FORM UPDATE MAGANG</h3>
          </center>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CInput
              label="Judul Magang"
              horizontal
              :value.sync="item.judulMagang"
            />
            <CTextarea
              label="Deskripsi Magang"
              :value.sync="item.deskripsiMagang"
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
              <CButton color="primary" class="px-4" @click="editMagang()"
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
  name: "FormEditMagang",
  components: {
    Multiselect
  },
  props: ["item"],
  data() {
    return {
      file: "",
      status: 0
    };
  },

  async mounted() {},
  methods: {
    handleFile() {
      this.file = this.$refs.file.$data.state[0];
      console.log(this.$refs.file.$data.state[0]);
    },
    editMagang() {
      this.changeFoto();
      axios
        .post(ipBackEnd + "magang/update", this.item, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
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
    changeFoto() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", this.item.id);
      axios
        .post(ipBackEnd + "magang/changeFoto", formData, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
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
  }
};
</script>
<style>
.upload {
  margin-bottom: 15px;
}
</style>
