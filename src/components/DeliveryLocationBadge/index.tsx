import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

/* Pin do SVG do Figma: mantido exatamente, inclusive as cores. */
const PIN_PATH =
  'M19 9.375C16.995 9.37727 15.0728 10.1748 13.655 11.5925C12.2373 13.0103 11.4398 14.9325 11.4375 16.9375C11.4375 23.4086 18.3125 28.2984 18.6047 28.5047C18.7218 28.5827 18.8593 28.6243 19 28.6243C19.1407 28.6243 19.2782 28.5827 19.3953 28.5047C19.6875 28.2984 26.5625 23.4086 26.5625 16.9375C26.5602 14.9325 25.7627 13.0103 24.345 11.5925C22.9272 10.1748 21.005 9.37727 19 9.375V9.375ZM19 14.1875C19.5439 14.1875 20.0756 14.3488 20.5278 14.651C20.9801 14.9531 21.3325 15.3826 21.5407 15.8851C21.7488 16.3876 21.8033 16.9406 21.6972 17.474C21.5911 18.0074 21.3291 18.4974 20.9445 18.882C20.5599 19.2666 20.0699 19.5286 19.5365 19.6347C19.0031 19.7408 18.4501 19.6863 17.9476 19.4782C17.4451 19.27 17.0156 18.9176 16.7135 18.4653C16.4113 18.0131 16.25 17.4814 16.25 16.9375C16.25 16.2082 16.5397 15.5087 17.0555 14.993C17.5712 14.4772 18.2707 14.1875 19 14.1875V14.1875Z'

const Badge = styled.svg`
  display: block;
  flex-shrink: 1;
  width: 104px;
  height: 28px;

  ${({ theme }) => theme.media.sm} {
    width: 143px;
    height: 38px;
  }
`

/** Selo exibido no Header quando o CEP consultado é de São Paulo/SP. */
export function DeliveryLocationBadge() {
  const { t } = useTranslation()

  return (
    <Badge
      role="img"
      aria-label={t('header.locationSaoPaulo')}
      width={143}
      height={38}
      viewBox="0 0 143 38"
      fill="none"
    >
      <rect width="143" height="38" rx="6" fill="#EBE5F9" />
      <path d={PIN_PATH} fill="#8047F8" />
      <text
        x="35"
        y="24"
        fill="#4B2995"
        fontFamily="Baloo 2, sans-serif"
        fontSize="16"
        fontWeight="700"
      >
        São Paulo, SP
      </text>
    </Badge>
  )
}
