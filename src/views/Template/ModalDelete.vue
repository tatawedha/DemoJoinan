<template>
  <CRow>
    <CCol>
      <CButton
        v-c-tooltip="'hapus Magang'"
        color="danger"
        @click="(myModal = true), setId(item)"
        class="mr-1"
      >
        <CIcon name="cil-trash" />
      </CButton>
    </CCol>
    <CModal title="Hapus Magang" size="lg" :show.sync="myModal">
      <H4>Apakah Anda Yakin Menghapus Data Magang?</H4>
      <template #footer>
        <CCol col="6" class="text-center">
          <CButton @click="(myModal = false), closeTick(ids)" color="success"
            >Yakin</CButton
          >
          <CButton @click="myModal = false" color="danger">Tidak</CButton>
        </CCol>
      </template>
    </CModal>
  </CRow>
</template>
<script>
import axios from "axios";
import ipBackEnd from "@/ipBackEnd";
export default {
  name: "ModalCloseMagang",
  props: ["item"],
  data() {
    return {
      myModal: false,
      ids: "",
      keterangan: ""
    };
  },
  mounted() {},
  methods: {
    tembak() {
      this.$emit("tembak");
    },
    setId(x) {
      this.ids = x.id;
    },
    closeTick(x) {
      console.log(x, "id close");
      axios
        .post(
          ipBackEnd + "magang/delete",
          {
            id: x,
          },
          {
            headers: {
              token: localStorage.getItem("tokenAdmin")
            }
          }
        )
        .then(res => {
          console.log(res);
          this.tembak();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {}
};
</script>
