import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/apiClient'
import type { BondListItem } from '@/types/bond'

export const useBondMarketStore = defineStore(
  'bondMarket',
  () => {
    const bondMarket: Ref<Array<BondListItem>> = ref(Array<BondListItem>())
    const isBondMarketEmpty = computed(() => bondMarket.value.length == 0)
    async function updateBondMarket() {
      try {
        toasts.value.push({content:'데이터 최신화 시작'})
        const data = await apiClient.get('/list').then((el) => el.data.result)
        bondMarket.value = data
        toasts.value.push({content:'데이터 최신화 완료'})
      } catch (err) {
        toasts.value.push({content:'데이터 최신화 실패'})
        console.error(err)
      }
    }
    const avgTradingVolume = computed(
      () =>
        bondMarket.value.map((el) => el.거래량).reduce((acc, cur) => acc + cur) /
        bondMarket.value.length
    )
    // TargetEarning
    const targetEarning = ref('6')
    const afterTax = ref(false)
    const handleToggleTax = () => {
      afterTax.value = !afterTax.value
    }

    // Items
    const tableItems = computed(() =>
      bondMarket.value
        .filter((el) => el.거래량 >= avgTradingVolume.value) // 평균 거래량 자르기
        // 회사채
        .filter((el) => el.상품구분.includes('회사채'))
        // 수익률
        .filter((el) => el.매수수익률 >= +targetEarning.value / (afterTax.value ? 1 - 0.154 : 1))
        // 신용도
        .filter(
          (el) =>
            el.신용도 &&
            (!el.신용도.includes('B') || (el.신용도.includes('BBB') && !el.신용도.includes('BBB-')))
        )
        // 위험상품 필터링
        .filter(
          (el) =>
            !(
              el.종목명.includes('자본') ||
              el.종목명.includes('신종') ||
              el.종목명.includes('CB') ||
              el.종목명.includes('(후)')
            )
        )
        // 만기일 필터링
        .filter((el) =>
          useExpiration.value ? el.상환일 <= expirationDate.value.replace('-', '') : el
        )
        .sort((a, b) => b.매수수익률 - a.매수수익률)
    )

    const itemShow = ref(10)
    const toasts: Ref<Array<any>> = ref([])
    const moreItems = () => {
      if (itemShow.value < tableItems.value.length) {
        itemShow.value += 10
      } else {
        toasts.value.push({
          content: '더 이상 표시할 채권이 없습니다!'
        })
      }
    }

    const expirationDate = ref('')
    const useExpiration = ref(false)
    const handleToggleExpiration = () => {
      useExpiration.value = !useExpiration.value
    }

    return {
      bondMarket,
      isBondMarketEmpty,
      updateBondMarket,
      handleToggleTax,
      targetEarning,
      tableItems,
      itemShow,
      moreItems,
      toasts,
      expirationDate,
      handleToggleExpiration
    }
  },
  { persist: true }
)
