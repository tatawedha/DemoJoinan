<template>
  <CContainer>
    <CButton
      v-c-tooltip="'Hapus Tags'"
      color="danger"
      @click="myModal = true"
      class="mr-1"
    >
      <CIcon name="cil-trash" />
    </CButton>
    <CModal title="Hapus Tags"  :show.sync="myModal">
      <H4>Apakah Anda Yakin Menghapus Data Tags?</H4>
      <template #footer>
        <CCol col="6" class="text-center">
          <CButton @click="(myModal = false), hapus(item.id)" color="success"
            >Yakin</CButton
          >
        </CCol>
        <CCol>
          <CButton @click="myModal = false" color="danger">Tidak</CButton>
        </CCol>
      </template>
    </CModal>
  </CContainer>
</template>
<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";
export default {
  name: "ModalDeleteTags",
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
    
    async hapus(x) {
      let vm = this
      let hapus = await axios.post(ipBackend + "masterTags/delete", {
        id: x
      });
      console.log(hapus);
      if (hapus.data.status == 200) {
        if (hapus.data.message == "sukses") {
          vm.$emit("go", {
            msg: "HAPUS TAG BERHASIL",
            color: "success"
          });
        } else {
          vm.$emit("go", {
            msg: res.data.message.toUpperCase(),
            color: "warning"
          });
        }
      } else {
        vm.$emit("go", {
          msg: "TERJADI KESALAHAN PADA SERVER",
          color: "danger"
        });
      }
    }
  },
  watch: {}
};
</script>
