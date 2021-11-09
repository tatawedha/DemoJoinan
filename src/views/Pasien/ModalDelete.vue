<template>
  <CContainer>
    <CButton
      v-c-tooltip="'Hapus Pasien'"
      color="danger"
      @click="myModal = true"
      class="mr-1"
    >
      <CIcon name="cil-trash" />
    </CButton>
    <CModal
      id="hapus"
      title="Hapus Magang"
      size="lg"
      :show.sync="myModal"
      @close="myModal = false"
    >
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
  </CContainer>
</template>
<script>
import axios from "axios";
import ipBackend from "@/ipBackend";
export default {
  name: "ModalCloseMagang",
  props: ["item", "hapus"],
  data() {
    return {
      myModal: false,
      ids: "",
      keterangan: ""
    };
  },
  mounted() {},
  watch: {
    hapus: function(newVal, oldVal) {
      console.log(newVal, oldVal, "<<");
      myModal = true;
      console.log(item);
    }
  },
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
            id: x
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
