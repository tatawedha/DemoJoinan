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
      title="Hapus Magang"
      size="lg"
      :show.sync="myModal"
    >
      <H4>Apakah Anda Yakin Menghapus Data Magang?</H4>
      <template #footer>
        <CCol col="6" class="text-center">
          <CButton @click="(myModal = false), hapus(item.id)" color="success"
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
    hapus(x) {
      axios
        .post(
          ipBackEnd + "users/delete",
          {
            id: x
          },
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
