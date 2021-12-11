<template>
  <CContainer>
    <CRow class="mt-4">
      <CCol>
        <CCard>
          <CCardBody>
            <h3>{{ data.judulKonten }}</h3>
            <div></div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
    props:["data", 'subs'],
    data() {
        return{

        }
    },
}
</script>
