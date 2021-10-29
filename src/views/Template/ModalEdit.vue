<template>
  <CRow>
    <CCol>
      <CButton
        v-c-tooltip="'Edit Magang'"
        color="primary"
        @click="(myModal = true)"
        class="mr-1"
      >
        <CIcon name="cil-pencil" />
      </CButton>
    </CCol>
    <CModal title="" size="lg" :show.sync="myModal">
      <FormEdit
        :item="item"
        @tembak="tembak()"
      />
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
import FormEdit from "@/views/FormEdit";
export default {
  name: "ModalDetail",
  components: {
    FormEdit
  },
  props: ["item"],
  data() {
    return {
      myModal: false,
      selected: [],
      options: [],
      multi: null,
    };
  },
  created() {
    // this.getPeserta();
  },
  methods: {
    tembak() {
      this.$emit("tembak");
  }
  }
};
</script>
