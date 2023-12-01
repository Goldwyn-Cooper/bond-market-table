<template>
  <CToaster placement="middle" visible>
    <CToast :delay="3000" v-for="(toast, index) in toasts" :key="index" visible>
      <CToastBody>
        {{ toast.content }}
      </CToastBody>
    </CToast>
  </CToaster>
  <CContainer fluid class="px-5 pb-3">
    <BondListHeader />
    <BondListTable />
  </CContainer>
</template>

<script setup lang="ts">
// STORE
import { useBondMarketStore } from '@/stores/bond'
import { storeToRefs } from 'pinia'
const bondMarketStore = useBondMarketStore()
const { updateBondMarket } = bondMarketStore
const { toasts, tableItems, itemShow } = storeToRefs(bondMarketStore)
onMounted(() => {
  toasts.value = []
  itemShow.value = 10
  updateBondMarket()
})
watch(tableItems, () => {
  itemShow.value = 10
})
// COMPONENT
import { onMounted, watch } from 'vue'
import { CContainer, CToast, CToastBody, CToaster } from '@coreui/vue'
import BondListTable from '@/components/BondList/BondListTable.vue'
import BondListHeader from '@/components/BondList/BondListHeader.vue'
</script>
