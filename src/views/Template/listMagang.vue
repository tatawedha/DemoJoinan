<template>
  <CCard>
    <CCardHeader>
      <dl class="row">
        <dt class="col-sm-10">DAFTAR KEGIATAN MAGANG</dt>
        <dd class="col-sm-2">
          <ModalAddMagang @tembak="getMagang()" />
        </dd>
      </dl>
    </CCardHeader>
    <CCardBody>
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
          <td>
            {{ index + 1 }}
          </td>
        </template>
        <template #publish="{item}">
          <td>
            {{ getStatus(item.publish) }}
          </td>
        </template>
        <!-- <template #detail="{item, index}">
          <CRow> </CRow>
        </template> -->
        <template #Actions="{item, index}">
          <CRow class="d-flex justify-content-between">
            <CCol class="py-2" cols="2">
              <CButton
                color="primary"
                variant="outline"
                square
                @click="toggleDetails(item, index), getlistM(item.id, index)"
              >
                {{ Boolean(item._toggled) ? "Hide" : "Show" }}
              </CButton>
            </CCol>
            <CCol class="py-2" cols="2"><ModalListA :item="item"/></CCol>
            <CCol class="py-2" cols="2"
              ><ModalDetail :item="item" @tembak="get()"
            /></CCol>
            <CCol class="py-2" cols="2"
              ><ModalPublish :item="item" @tembak="get()"
            /></CCol>
            <CCol class="py-2" cols="2"
              ><ModalClose :item="item" @tembak="get()"
            /></CCol>
          </CRow>
        </template>
        <template #details="{item}">
          <CCollapse
            :show="Boolean(item._toggled)"
            :duration="collapseDuration"
          >
            <CCardBody class="text-white bg-secondary">
              <CDataTable
                :items="item.list"
                :fields="fields2"
                :items-per-page="5"
                hover
                pagination
              >
                <template #No="{index}">
                  <td>
                    {{ index + 1 }}
                  </td>
                </template>
                <template #Actions="{item}">
                  <CRow class="d-flex justify-content-between">
                    <CCol class="py-2" cols="2"
                      ><CButton
                        v-c-tooltip="'terima peserta'"
                        color="success"
                        @click="accept(item)"
                        class="mr-1"
                      >
                        <CIcon name="cil-check" /> </CButton
                    ></CCol>
                    <CCol class="py-2" cols="2"
                      ><CButton
                        v-c-tooltip="'tolak peserta'"
                        color="danger"
                        @click="reject(item)"
                        class="mr-1"
                      >
                        <CIcon name="cil-x-circle" /> </CButton
                    ></CCol>
                  </CRow>
                </template>
              </CDataTable>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import axios from "axios";
import ipBackEnd from "@/ipBackEnd";
import ModalAdd from "@/views//ModalAdd";
import ModalClose from "@/views//ModalClose";
import ModalPublish from "@/views//ModalPublish";
import ModalDetail from "@/views//ModalDetail";
import ModalListA from "@/views//ModalListA";
import moment from "moment";
import "moment/locale/id";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "judul", label: "Judul", _style: "min-width:40%" },
  { key: "deskripsiMagang", label: "Deskripsi", _style: "min-width:20%;" },
  { key: "publish", label: "Status", _style: "min-width:10%;" },
  {
    key: "Actions",
    label: "Actions",
    _style: "width:20%"
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
  name: "listMagang",
  components: {
    ModalAddMagang,
    ModalCloseMagang,
    ModalPublishMagang,
    ModalDetailMagang,
    ModalListMagangA
  },
  data() {
    return {
      usersData: [],
      fields,
      fields2,
      details: [],
      tempIndex:"",
      tempMId:"",
      collapseDuration: 0
    };
  },
  created() {
    this.getMagang();
  },
  methods: {
    getStatus(val) {
      if (val == 0) {
        return "Tidak Dipublikasi";
      } else if (val == 1) {
        return "Sedang di Publikasi";
      }
    },
    getMagang() {
      axios
        .get(ipBackEnd + "magang/list", {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
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
          this.usersData[y].list = res.data.data.map(item =>{
            return{...item, index: y, judulMagang: x.judulMagang}
          })
        })
        .catch(err => {
          console.log(res);
        });
    },
    accept(x) {
      console.log(x)
      let tempIndex = x.index
      let tempMId = x.magangId
      console.log(x, x.index, 'ini accept');
      axios
        .post(ipBackEnd + "poolMagang/accept", x, {
          headers: {
            token: localStorage.getItem("tokenAdmin")
          }
        })
        .then(res => {
          console.log(res);
          this.getlistM(tempMId, tempIndex );

        })
        .catch(err => {
          console.log(err);
        });
    },
    reject(x) {
       let tempIndex = x.index
       let tempMId = x.magangId
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
<style  scoped>
  .inside{
    background-color: grey;
  }
</style>
