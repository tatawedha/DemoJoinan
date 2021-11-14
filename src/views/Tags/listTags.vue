<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <dl class="row">
              <dt class="col-sm-10">DAFTAR DOKTER</dt>
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
  { key: "namamasterTags", label: "Nama Tags", _style: "min-width:20%;text-align:center" },
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
    ModalListA
  },
  data() {
    return {
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
    this.getTags();
  },
  methods: {
    show() {
      console.log(this.hapus);
    },
    async getTags() {
      let tags = await axios.get(ipBackend + "masterTags/list");
      console.log(tags.data.data);
      this.usersData = tags.data.data.map(item => {
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
      this.getTags();
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
