<template>
  <CContainer>
    <CRow>
      <CCol>
        <CButton
          v-c-tooltip="'Detail'"
          color="success"
          @click="(myModal = true), getListA(item.id)"
          class="mr-1"
        >
          <CIcon name="cil-User" />
        </CButton>
      </CCol>
      <CModal title="Detail Dokter" size="lg" :show.sync="myModal">
        <CTabs>
          <CTab title="Biodata Dokter" active>
            <CCard>
              <div class="bd-example text-left mt-4 mb-4">
                <dl class="row">
                  <dt class="col-sm-3 text-truncate">Nama</dt>
                  <dd class="col-sm-9">: {{ profil.nama }}</dd>
                  <dt class="col-sm-3 text-truncate">Jenis Kelamin</dt>
                  <dd class="col-sm-9">: {{ profil.jenisKelamin }}</dd>
                  <dt class="col-sm-3 text-truncate">Tanggal Lahir</dt>
                  <dd class="col-sm-9">: {{ profil.tanggalLahir }}</dd>
                  <dt class="col-sm-3 text-truncate">Pekerjaan</dt>
                  <dd class="col-sm-9">: {{ profil.pekerjaan }}</dd>
                  <dt class="col-sm-3 text-truncate">Golongan Darah</dt>
                  <dd class="col-sm-9">: {{ profil.golonganDarah }}</dd>
                  <dt class="col-sm-3 text-truncate">Tinggi Badan</dt>
                  <dd class="col-sm-9">: {{ profil.tinggiBadan }} Cm</dd>
                  <dt class="col-sm-3 text-truncate">Berat Badan</dt>
                  <dd class="col-sm-9">: {{ profil.beratBadan }} Kg</dd>
                </dl>
              </div>
            </CCard>
          </CTab>
          <CTab title="Jadwal Dokter">
            <CDataTable :items="listA" :fields="fields" hover sorter cleaner>
              <template #No="{index}">
                <td class="text-center">
                  {{ index + 1 }}
                </td>
              </template>
              <template #tanggalJadwal="{item}">
                <td class="text-center">
                  {{ moment(item.tanggalJadwal).format("ll") }}
                </td>
              </template>
            </CDataTable>
          </CTab>
        </CTabs>
        <template #footer-wrapper>
          <span></span>
        </template>
      </CModal>
    </CRow>
  </CContainer>
</template>
<script>
import axios from "axios";
import { ipBackend } from "@/ipBackend";
import moment from "moment";
import "moment/locale/id";

const fields = [
  { key: "No", label: "No", _style: "width:1%" },
  { key: "tanggalJadwal", label: "Tanggal", _style: "min-width:40%" },
  { key: "jamMulai", label: "Mulai", _style: "min-width:20%;" },
  { key: "jamSelesai", label: "Selesai", _style: "min-width:10%;" },
  { key: "statusJadwal", label: "Status", _style: "min-width:10%;" }
];
export default {
  name: "ModalDetailDokter",
  props: ["item"],
  data() {
    return {
      moment,
      myModal: false,
      listA: [],
      profil: "",
      fields
    };
  },
  mounted() {},
  methods: {
    tembak() {
      this.$emit("tembak");
    },
    async getListA(x) {
      let profil = await axios.get(ipBackend + "users/detailsUsersById/" + x);
      console.log(profil);
      this.profil = profil.data.data[0];

      let scan = await axios.get(ipBackend + "jadwal/listByDokterId/" + x);
      console.log(scan);
      this.listA = scan.data.data;
    }
  },
  watch: {}
};
</script>
