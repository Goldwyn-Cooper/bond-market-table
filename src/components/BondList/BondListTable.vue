<template>
  <CTable responsive :columns="columns" :items="items" />
  <CButton @click="moreItems" color="dark">더 보기</CButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Store
import { useBondMarketStore } from '@/stores/bond'
import { storeToRefs } from 'pinia'
const bondMarketStore = useBondMarketStore()
const { moreItems } = bondMarketStore
const { tableItems, itemShow } = storeToRefs(bondMarketStore)
// Components
import { CTable, CButton } from '@coreui/vue'
const columns = ['종목명', '신용도', '매수수익률']
const items = computed(() => tableItems.value.slice(0, itemShow.value))
</script>
