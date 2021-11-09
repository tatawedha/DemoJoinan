<template>
  <CContainer>
    <CRow>
      <CCol>
        <CButton
          v-c-tooltip="'list Peserta'"
          color="success"
          @click="(myModal = true), getListA(item.id)"
          class="mr-1"
        >
          <CIcon name="cil-User" />
        </CButton>
      </CCol>
      <CModal title="Daftar Peserta Magang" size="xl" :show.sync="myModal">
        <CDataTable :items="listA" :fields="fields" hover sorter cleaner>
          <template #No="{index}">
            <td>
              {{ index + 1 }}
            </td>
          </template></CDataTable
        >
        <template #footer>
          <!-- <CCol col="6" class="text-center">
          <CButton @click="(myModal = false), closeTick(ids)" color="success"
            >Yakin</CButton
          >
          <CButton @click="myModal = false" color="danger">Tidak</CButton>
        </CCol> -->
          <p></p>
        </template>
      </CModal>
    </CRow>
  </CContainer>
</template>
<script>
import axios from "axios";
import ipBackend from "@/ipBackend";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "nama", label: "Nama", _style: "min-width:40%" },
  { key: "email", label: "Email", _style: "min-width:20%;" },
  { key: "alamat", label: "Alamat", _style: "min-width:10%;" },
  { key: "fotoCV", label: "CV", _style: "min-width:10%;" },
  { key: "fotoKTP", label: "KTP", _style: "min-width:10%;" },
  { key: "status", label: "Status", _style: "min-width:10%;" }
];
export default {
  name: "ModalListMagangA",
  props: ["item"],
  data() {
    return {
      myModal: false,
      listA: [],
      fields
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
    getListA(x) {
      this.listA = [];
      axios
        .get(ipBackEnd + "poolMagang/listUsersMagang/" + x, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
          this.listA = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {}
};
</script>
