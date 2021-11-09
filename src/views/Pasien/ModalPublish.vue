<template>
  <CRow>
    <CCol>
      <CButton
        v-if="item.publish == 0"
        v-c-tooltip="'Publish Info Magang'"
        color="success"
        @click="(myModal = true), setId(item)"
        class="mr-1"
      >
        <CIcon name="cil-check" />
      </CButton>
      <CButton
      v-if="item.publish == 1"
        v-c-tooltip="'Unpublish Info Magang'"
        color="warning"
        @click="(myModal = true), setId(item)"
        class="mr-1"
      >
        <CIcon name="cil-ban" />
      </CButton>
    </CCol>
    <CModal title="Hapus Magang" size="lg" :show.sync="myModal">
      <H4>Apakah Anda Mempublish Informasi Magang?</H4>
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
    setId(x) {
      this.ids = x.id;
    },
    closeTick(x) {
      let y = this.item.publish
      if ( y == 0){
        y = 1
      }else if (y == 1){
        y = 0
      }
      axios
        .post(
          ipBackEnd + "magang/publish",
          {
            id: x,
            publish: y
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
