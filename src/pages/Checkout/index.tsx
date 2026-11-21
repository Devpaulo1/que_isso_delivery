import { zodResolver } from '@hookform/resolvers/zod'
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
  } = useCart()

  const methods = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutDefaultValues,
    mode: 'onTouched',
  })

  const isEmpty = resolvedItems.length === 0

  function onSubmit() {
    navigate(ROUTES.success)
  }

  return (
    <>
      <PageTitle>Finalizar pedido</PageTitle>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate aria-label="Finalizar pedido">
          <Column>
            <h2>Complete seu pedido</h2>
            <DeliveryAddressForm />
            <PaymentMethodSelector />
          </Column>

          <Column>
            <h2>Cafés selecionados</h2>
            <OrderCard aria-label="Itens do pedido">
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
                    <ConfirmButton type="submit" disabled={methods.formState.isSubmitting}>
                      Confirmar pedido
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
