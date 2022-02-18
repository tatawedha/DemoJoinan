<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <dl class="row">
              <dt class="col-sm-10">LOG DATA</dt>
              <dd class="col-sm-2">
                <ModalAdd @go="alert($event)" />
              </dd>
            </dl>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CDataTable
                  :items="usersData"
                  :fields="fields"
                  column-filter
                  items-per-page-select
                  :items-per-page="100"
                  hover
                  sorter
                  pagination
                  table-filter
                  cleaner
                >
                  <template #No="{index}">
                    <td class="text-center">{{ index + 1 }}</td>
                  </template>
                  <template #tanggal="{item}">
                    <td class="text-center">{{ moment(item.tanggal).format('ll') }}</td>
                  </template>
                  <template #Actions="{item}">
                    <td class="d-flex">
                      <!-- <ModalListA :item="item" @go="alert($event)" /> -->
                      <!-- <ModalEdit :item="item" @go="alert($event)" /> -->
                      <!-- <ModalDelete :item="item" @go="alert($event)" /> -->
                      {{item.actions}}
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
import ModalAdd from "@/views/Users/ModalAdd";
import ModalDelete from "@/views/Users/ModalDelete";
import ModalEdit from "@/views/Users/ModalEdit";
// import ModalDetail from "@/views/Users/ModalDetail";
// import ModalListA from "@/views/Users/ModalListA";
import moment from "moment";
import "moment/locale/id";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "judulKonten", label: "Judul", _style: "min-width:20%;text-align:center" },
  {
    key: "kegiatan",
    label: "Kegiatan",
    _style: "min-width:10%;text-align:center"
  },
  { key: "tanggal", label: "Tanggal", _style: "width:20%" },
  // { key: "beratBadan", label: "BB", _style: "width:5%" },
  // { key: "tinggiBadan", label: "TB", _style: "width:5%" },
  {
    key: "Actions",
    label: "",
    _style: "width:20%",
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
    // ModalListA
  },
  data() {
    return {
      moment,
      usersData: [],
      fields,
      hapus: false,
      collapseDuration: 0,
      notif: false,
      msg: "",
      color: ""
    };
  },
  created() {
    this.getLog();
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
    async getLog() {
      let log = await axios.get(ipBackend + "log/list");
      console.log(log.data.data);
      this.usersData = log.data.data.map(item => {
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
      this.getLog();
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
