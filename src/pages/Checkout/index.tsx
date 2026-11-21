import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CartItem } from '@/components/CartItem'
import { CartSummary } from '@/components/CartSummary'
import { DeliveryAddressForm } from '@/components/DeliveryAddressForm'
import { EmptyCart } from '@/components/EmptyCart'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'
import { useCart } from '@/hooks/useCart'
import { ROUTES } from '@/routes/paths'
import {
  checkoutDefaultValues,
  checkoutSchema,
  type CheckoutFormData,
  type CheckoutFormInput,
} from '@/schemas/checkoutSchema'
import { validateCartForCheckout } from '@/utils/cart'
import { createOrderSnapshot } from '@/utils/order'
import { saveLastOrder } from '@/utils/orderStorage'

const PageTitle = styled.h1`
  margin-top: ${({ theme }) => theme.space[8]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr) 28rem;
    align-items: start;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  min-width: 0;

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.subtitle};
  }
`

const OrderCard = styled.section`
  padding: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space[10]};
  }
`

const ItemList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  list-style: none;
`

const Alert = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[4]};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.errorSurface};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  button {
    margin-top: ${({ theme }) => theme.space[2]};
    color: ${({ theme }) => theme.colors.error};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-decoration: underline;
  }
`

const ConfirmButton = styled.button`
  width: 100%;
  min-height: 2.875rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onYellow};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  transition: filter ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }

  &:disabled {
    opacity: 0.6;
  }
`

export function Checkout() {
  const navigate = useNavigate()
  const {
    resolvedItems,
    subtotalInCents,
    deliveryFeeInCents,
    totalInCents,
    incrementItem,
    decrementItem,
    removeItem,
    items,
    missingCoffeeIds,
    clearCart,
  } = useCart()
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const methods = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutDefaultValues,
    mode: 'onTouched',
  })

  const isEmpty = resolvedItems.length === 0

  function removeUnavailableItems() {
    missingCoffeeIds.forEach(removeItem)
    setSubmitError(null)
  }

  function onSubmit(data: CheckoutFormData) {
    // Guarda final: o formulário já foi validado pelo Zod; agora o carrinho (RN-10).
    const check = validateCartForCheckout(items)
    if (!check.ok) {
      setSubmitError(
        check.reason === 'empty'
          ? t('checkout.errorEmpty')
          : t('checkout.errorUnavailable'),
      )
      return
    }

    // Ordem segura (RF-13): 1) snapshot  2) persistir  3) limpar carrinho  4) navegar.
    const order = createOrderSnapshot({ items: resolvedItems, form: data })
    if (!saveLastOrder(order)) {
      // Sem snapshot salvo, o carrinho NÃO é limpo: nada se perde.
      setSubmitError(t('checkout.errorSave'))
      return
    }
    setSubmitError(null)
    clearCart()
    navigate(ROUTES.success, { replace: true })
  }

  return (
    <>
      <PageTitle>{t('checkout.pageTitle')}</PageTitle>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate aria-label={t('checkout.pageTitle')}>
          <Column>
            <h2>{t('checkout.completeOrder')}</h2>
            <DeliveryAddressForm />
            <PaymentMethodSelector />
          </Column>

          <Column>
            <h2>{t('checkout.selectedCoffees')}</h2>
            <OrderCard aria-label={t('checkout.orderItems')}>
              {missingCoffeeIds.length > 0 ? (
                <Alert role="alert">
                  {t('checkout.unavailable', { count: missingCoffeeIds.length })}
                  <br />
                  <button type="button" onClick={removeUnavailableItems}>
                    {t('checkout.removeUnavailable')}
                  </button>
                </Alert>
              ) : null}
              {submitError ? <Alert role="alert">{submitError}</Alert> : null}
              {isEmpty ? (
                <EmptyCart />
              ) : (
                <>
                  <ItemList>
                    {resolvedItems.map((item) => (
                      <CartItem
                        key={item.coffee.id}
                        item={item}
                        onIncrement={incrementItem}
                        onDecrement={decrementItem}
                        onRemove={removeItem}
                      />
                    ))}
                  </ItemList>
                  <CartSummary
                    subtotalInCents={subtotalInCents}
                    deliveryFeeInCents={deliveryFeeInCents}
                    totalInCents={totalInCents}
                  >
                    <ConfirmButton
                      type="submit"
                      disabled={methods.formState.isSubmitting || missingCoffeeIds.length > 0}
                    >
                      {t('checkout.confirm')}
                    </ConfirmButton>
                  </CartSummary>
                </>
              )}
            </OrderCard>
          </Column>
        </Form>
      </FormProvider>
    </>
  )
}
