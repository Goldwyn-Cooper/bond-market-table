interface BondListItem {
  거래대금: number
  거래량: number
  등략률: number
  매도수익률: number
  매수수익률: number
  상품구분: string
  상환일: string
  신용도: string
  이자방법: string
  잔존만기연수: number
  잔존만기월수: number
  잔존만기일수: number
  잔존일: number
  전일종가: number
  종목명: string
  종목코드: string
  표면금리: number
  현재가: number
}

export type { BondListItem }
