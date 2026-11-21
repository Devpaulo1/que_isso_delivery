import { useState, type ImgHTMLAttributes } from 'react'
import styled from 'styled-components'
import { CoffeeIcon } from '@/components/icons'

const Fallback = styled.span<{ $size: number }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandYellowLight};
  color: ${({ theme }) => theme.colors.tagText};
`

export interface ProductImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string
  size: number
}

/**
 * Imagem de produto com fallback: se o arquivo não carregar (ou a URL estiver
 * vazia), exibe um ícone em vez de uma imagem quebrada.
 */
export function ProductImage({ src, size, alt = '', className, ...rest }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <Fallback
        $size={size}
        className={className}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <CoffeeIcon size={Math.round(size * 0.5)} />
      </Fallback>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setFailedSrc(src)}
      {...rest}
    />
  )
}
