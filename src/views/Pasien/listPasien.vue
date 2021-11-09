<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <dl class="row">
              <dt class="col-sm-10">DAFTAR PASIEN</dt>
              <dd class="col-sm-2">
                <ModalAdd @tembak="getPasien()" />
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
                  <template #golonganDarah="{item}">
                    <td class="text-center">{{ item.golonganDarah }}</td>
                  </template>
                  <template #Actions="{item}">
                    <td class="d-flex">
                      <ModalDelete :hapus="hapus" :item="item" />
                      <ModalListA />
                    </td>
                  </template>
                </CDataTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  </CContainer>
</template>

<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import ModalAdd from "@/views/Pasien/ModalAdd";
import ModalDelete from "@/views/Pasien/ModalDelete";
import ModalPublish from "@/views/Pasien/ModalPublish";
// import ModalDetail from "@/views/Pasien/ModalDetail";
import ModalListA from "@/views/Pasien/ModalListA";
import moment from "moment";
import "moment/locale/id";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "nama", label: "Nama", _style: "min-width:20%;text-align:center" },
  {
    key: "jenisKelamin",
    label: "Jenis Kelamin",
    _style: "min-width:10%;text-align:center"
  },
  { key: "golonganDarah", label: "Gol. Darah", _style: "width:7%" },
  { key: "beratBadan", label: "BB", _style: "width:5%" },
  { key: "tinggiBadan", label: "TB", _style: "width:5%" },
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
    ModalPublish,
    // ModalDetail,
    ModalListA
  },
  data() {
    return {
      usersData: [],
      fields,
      hapus: false,
      collapseDuration: 0
    };
  },
  created() {
    this.getPasien();
  },
  methods: {
    show(){
      console.log(this.hapus)
    },
    getStatus(val) {
      if (val == 0) {
        return "Tidak Dipublikasi";
      } else if (val == 1) {
        return "Sedang di Publikasi";
      }
    },
    getPasien() {
      axios
        .get(ipBackend + "users/listByRole/Pasien", {})
        .then(res => {
          console.log(res, "inimagang");
          this.usersData = res.data.data.map(item => {
            return { ...item, list: [] };
          });
          console.log("pew pew");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlistM(x, y) {
      console.log(x);
      axios
        .get(ipBackEnd + "poolMagang/listUsersUnAccepted/" + x, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
          this.usersData[y].list = res.data.data.map(item => {
            return { ...item, index: y, judulMagang: x.judulMagang };
          });
        })
        .catch(err => {
          console.log(res);
        });
    },
    accept(x) {
      console.log(x);
      let tempIndex = x.index;
      let tempMId = x.magangId;
      console.log(x, x.index, "ini accept");
      axios
        .post(ipBackEnd + "poolMagang/accept", x, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
          this.getlistM(tempMId, tempIndex);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reject(x) {
      let tempIndex = x.index;
      let tempMId = x.magangId;
      axios
        .post(ipBackEnd + "poolMagang/reject", x, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
          this.getlistM(tempMId, tempIndex);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleDetails(item, index) {
      this.$set(item, "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
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
