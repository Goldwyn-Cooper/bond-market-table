<template>
  <header class="position-sticky fixed-top bg-white py-2">
    <CForm class="row g-3">
      <div class="col-auto">
        <CFormLabel for="targetEarning">목표수익률</CFormLabel>
        <CFormInput
          id="targetEarning"
          placeholder="ex) 4.0, 6.5"
          :min="0"
          :step="0.1"
          type="number"
          :model-value="`${targetEarning}`"
          @update:model-value="handleTargetEarning"
        />
        <CFormCheck class="mt-2" label="세후" @input="handleToggleTax" />
      </div>
      <div class="col-auto">
        <CFormLabel for="expirationDate">만기일</CFormLabel>
        <CFormInput
          id="expirationDate"
          type="date"
          :model-value="expirationDate"
          @update:model-value="handleExpirationDate"
        />
        <CFormCheck class="mt-2" label="적용" @input="handleToggleExpiration" />
      </div>
    </CForm>
  </header>
</template>

<script setup lang="ts">
import { CForm, CFormCheck, CFormInput, CFormLabel } from '@coreui/vue'
import { useBondMarketStore } from '@/stores/bond'
import { storeToRefs } from 'pinia'
const bondMarketStore = useBondMarketStore()
const { handleToggleTax, handleToggleExpiration } = bondMarketStore
const { targetEarning, expirationDate } = storeToRefs(bondMarketStore)
const handleTargetEarning = (newValue: string) => {
  targetEarning.value = newValue
}
const handleExpirationDate = (newValue: string) => {
  expirationDate.value = newValue
}
</script>
