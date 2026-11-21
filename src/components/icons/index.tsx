import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
  /** Quando informado, o ícone deixa de ser decorativo e ganha nome acessível. */
  title?: string
}

function createIcon(displayName: string, paths: ReactNode) {
  function Icon({ size = 20, title, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        focusable="false"
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </svg>
    )
  }
  Icon.displayName = displayName
  return Icon
}

export const SunIcon = createIcon(
  'SunIcon',
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
)

export const MoonIcon = createIcon(
  'MoonIcon',
  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
)

export const CartIcon = createIcon(
  'CartIcon',
  <>
    <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    <circle cx="10" cy="20.5" r="1.3" />
    <circle cx="18" cy="20.5" r="1.3" />
  </>,
)

export const MapPinIcon = createIcon(
  'MapPinIcon',
  <>
    <path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
)

export const MinusIcon = createIcon('MinusIcon', <path d="M5 12h14" />)

export const PlusIcon = createIcon('PlusIcon', <path d="M12 5v14M5 12h14" />)

export const TrashIcon = createIcon(
  'TrashIcon',
  <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />,
)

export const TimerIcon = createIcon(
  'TimerIcon',
  <>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" />
  </>,
)

export const PackageIcon = createIcon(
  'PackageIcon',
  <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />,
)

export const CoffeeIcon = createIcon(
  'CoffeeIcon',
  <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" />,
)

export const DollarIcon = createIcon(
  'DollarIcon',
  <path d="M12 2v20M17 6.5C17 5 15 4 12 4S7 5 7 7.5s2 3 5 3.5 5 1.5 5 4-2 3.5-5 3.5-5-1-5-2.5" />,
)

export const CreditCardIcon = createIcon(
  'CreditCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </>,
)

export const BankIcon = createIcon(
  'BankIcon',
  <path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />,
)

export const MoneyIcon = createIcon(
  'MoneyIcon',
  <>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </>,
)
