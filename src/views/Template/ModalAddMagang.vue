<template>
  <CRow>
    <CCol>
      <CButton color="success" v-c-tooltip="'Tambah '" @click="myModal = true" class="mr-1">
        Tambah Data
      </CButton>
    </CCol>
    <CModal title="Register Kegiatan " size="lg" :show.sync="myModal">
      <FormInput  :tik="tik" :kontribs="kontribs" @tembak="tembak(),myModal = false" />
      <template #footer>
        <!-- <CButton @click="myModal = false" color="danger">Batal</CButton>
        <CButton @click="(myModal = false), addPeserta()" color="success"
          >Tambah</CButton -->
        <p></p>
      </template>
    </CModal>
  </CRow>
</template>
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";
import ipBackEnd from "@/ipBackEnd";
import FormInput from "@/views//FormInput";
export default {
  name: "ModalAdd",
  components: {
    FormInput
  },
  props:[
    'tik', 'kontribs'
  ],
  data() {
    return {
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
    tembak(){
      this.$emit('tembak')
    }
  },
  watch: {
    selected: function(val) {
      console.log(val);
    },
    myModal: function(val) {
      console.log(val);
    }
  }
};
</script>
