<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <dl class="row">
              <dt class="col-sm-10">NEW KONTEN</dt>
              <dd class="col-sm-2">
                <!-- <ModalAdd @go="alert($event)" /> -->
              </dd>
            </dl>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CDataTable
                  :items="newKonten"
                  :fields="fields"
                  column-filter
                  items-per-page-select
                  :items-per-page="15"
                  hover
                  sorter
                  pagination
                  table-filter
                  cleaner
                >
                  <template #No="{index}">
                    <td class="text-center">{{ index + 1 }}</td>
                  </template>
                  <template #createdAt="{item}">
                    <td class="text-center">{{ moment(item.createdAt).format('ll')}}</td>
                  </template>
                  <template #Actions="{item}">
                    <td class="d-flex">
                      <ModalListA :item="item" @go="alert($event)" />
                      <ModalEdit :item="item" @go="alert($event)" />
                      <ModalDelete :item="item" @go="alert($event)" />
                    </td>
                  </template>
                </CDataTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal :show.sync="notif" title="" size="sm" centered>
      <CRow>
        <CCol align="center">
          <CButton :color="color" @click="notif = false">{{ msg }}</CButton>
        </CCol>
      </CRow>
      <template #header-wrapper>
        <span></span>
      </template>
      <template #footer-wrapper>
        <span></span>
      </template>
    </CModal>
  </CContainer>
</template>

<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import ModalAdd from "@/views/Tags/ModalAdd";
import ModalDelete from "@/views/Tags/ModalDelete";
import ModalEdit from "@/views/Tags/ModalEdit";
// import ModalDetail from "@/views/Tags/ModalDetail";
import ModalListA from "@/views/Tags/ModalListA";
import moment from "moment";
import "moment/locale/id";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "judulKonten", label: "Judul", _style: "min-width:20%;text-align:center" },
  {
    key: "modelKonten",
    label: "Model",
    _style: "min-width:10%;text-align:center"
  },
  { key: "typeKonten", label: "Type", _style: "width:10%" },
  { key: "createdAt", label: "created", _style: "width:20%" },
  { key: "kreatorId", label: "Kreator", _style: "width:10%" },
  {
    key: "Actions",
    label: "Actions",
    _style: "max-width:10%",
    sorter: false,
    filter: false
  }
];
const fields2 = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "nama", label: "Nama", _style: "min-width:40%" },
  { key: "email", label: "Email", _style: "min-width:20%;" },
  { key: "alamat", label: "Alamat", _style: "min-width:10%;" },
  { key: "fotoCV", label: "CV", _style: "min-width:10%;" },
  { key: "fotoKTP", label: "KTP", _style: "min-width:10%;" },
  { key: "status", label: "Status", _style: "min-width:10%;" },
  {
    key: "Actions",
    label: "Actions",
    _style: "width:5%"
  }
];

export default {
  name: "listUsers",
  components: {
    ModalAdd,
    ModalDelete,
    ModalEdit,
    ModalListA
  },
  data() {
    return {
      moment,
      newKonten: [],
      fields,
      hapus: false,
      collapseDuration: 0,
      notif: false,
      msg: "",
      color: ""
    };
  },
  created() {
    this.getKonten();
  },
  methods: {
    show() {
      console.log(this.hapus);
    },
    getStatus(val) {
      if (val == 0) {
        return "Tidak Dipublikasi";
      } else if (val == 1) {
        return "Sedang di Publikasi";
      }
    },
    async getKonten() {
      let konten = await axios.get(ipBackend + "konten/list");
      console.log(konten.data.data);
      this.newKonten = konten.data.data.map(item => {
        return { ...item };
      });
    },
    toggleDetails(item, index) {
      this.$set(item, "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    alert(x) {
      let vm = this;
      this.getKonten();
      vm.notif = true;
      vm.msg = x.msg;
      vm.color = x.color;
    }
  }
};
</script>
<style scoped>
.inside {
  background-color: grey;
}
.table td {
  text-align: center;
}
</style>
