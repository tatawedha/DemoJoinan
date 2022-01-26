<template>
  <CContainer>
    <CRow class="mt-4">
      <CCol>
        <CCard>
          <CCardBody>
            <h3>{{ data.judulKonten }}</h3>
            <div></div>
            <div v-for="item in subs" :key="item.id">
              <div v-if="item.tipeSub == 'Artikel'" class="mt-2 mb-2">
                <div v-html="item.textKonten"></div>
              </div>
              <div
                v-if="item.tipeSub == 'Gambar' && item.gambarSubKonten != null"
                class="mt-2 mb-2"
              >
                <center>
                  <img :src="item.src" style="max-width:600px;max-height:400px" />
                </center>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
export default {
  props: ["kontenId", "change", "data"],
  data() {
    return {
      ipBackend,
      moment,
      subs: []
    };
  },
  methods: {
    async getSub() {
      let vm = this;
      let sub = await axios.get(
        ipBackend + "subKonten/listByKontenId/" + vm.kontenId
      );

      console.log(sub, "<< subpreview");
      vm.subs = sub.data.data.map(item => {
        item.src = ipBackend + item.gambarSubKonten;
        return item;
      });

      vm.subs.sort(function(a,b){return a.nomorSub - b.nomorSub})
    }
  },
  watch: {
    change: function(newVal, oldVal) {
      console.log(newVal);
      if (newVal != oldVal) {
        this.getSub();
      }
    }
  }
};
</script>

<style  scoped>
#editor-container {
    height: 500px;
    overflow-y: auto;
    font-size: 1rem;
}
</style>
