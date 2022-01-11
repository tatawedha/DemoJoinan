<template>
  <CContainer>
    <CRow class="mt-4">
      <CCol>
        <CCard>
          <CCardBody>
            <h3>{{ data.judulKonten }}</h3>
            <div></div>
            <div v-for="item in subs" :key="item.id">
              <div v-if="item.tipeSub == 'Artikel'">
                <div class="ql-editor" v-html="item.textKonten"></div>
              </div>
              <div v-if="(item.tipeSub == 'Gambar') && item.gambarSubKonten != null">
                <img :src="ipBackend + item.gambarSubKonten" />
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
  props: ["kontenId", "change", "data" ],
  data() {
    return {
      ipBackend,
      moment,
      subs:[]
    };
  },
  methods: {
    async getSub() {
      let vm = this;
      let sub = await axios.get(
        ipBackend + "subKonten/listByKontenId/" + vm.kontenId
      );

      console.log(sub, "<< subpreview");
      vm.subs = sub.data.data;
    }
  },
  watch: {
    change: function(newVal, oldVal) {
      console.log(newVal)
      if (newVal != oldVal) {
        this.getSub()
      }
    }
  }
};
</script>
