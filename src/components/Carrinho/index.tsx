import { FormEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { fechar, limpar, remover } from '../../store/reducers/carrinho'
import {
  Aside,
  Botao,
  BotaoSecundario,
  Form,
  Grid2,
  Item,
  Lista,
  Overlay,
  Resumo,
  Texto,
  Titulo
} from './styles'

type Step = 'cart' | 'delivery' | 'payment' | 'confirm'

type DeliveryForm = {
  receiver: string
  address: string
  city: string
  zipCode: string
  number: string
  complement: string
}

type PaymentForm = {
  cardName: string
  cardNumber: string
  cardCode: string
  expiresMonth: string
  expiresYear: string
}

const Carrinho = () => {
  const dispatch = useDispatch()
  const { itens, isOpen } = useSelector((state: RootState) => state.carrinho)

  const [step, setStep] = useState<Step>('cart')
  const [orderId, setOrderId] = useState('')

  const [delivery, setDelivery] = useState<DeliveryForm>({
    receiver: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })

  const [payment, setPayment] = useState<PaymentForm>({
    cardName: '',
    cardNumber: '',
    cardCode: '',
    expiresMonth: '',
    expiresYear: ''
  })

  const total = useMemo(
    () => itens.reduce((acc, item) => acc + item.preco, 0),
    [itens]
  )

  const closeAll = () => {
    dispatch(fechar())
    setStep('cart')
    setOrderId('')
  }

  const goDelivery = () => setStep('delivery')
  const goPayment = () => setStep('payment')
  const goConfirm = () => setStep('confirm')
  const backToCart = () => setStep('cart')
  const backToDelivery = () => setStep('delivery')

  const isDeliveryValid =
    delivery.receiver.trim() &&
    delivery.address.trim() &&
    delivery.city.trim() &&
    delivery.zipCode.trim() &&
    delivery.number.trim()

  const isPaymentValid =
    payment.cardName.trim() &&
    payment.cardNumber.trim() &&
    payment.cardCode.trim() &&
    payment.expiresMonth.trim() &&
    payment.expiresYear.trim()

  async function finalizarPagamento(e: FormEvent) {
    e.preventDefault()

    if (!isDeliveryValid) {
      setStep('delivery')
      return
    }
    if (!isPaymentValid) return
    if (itens.length === 0) return

    const body = {
      products: itens.map((item) => ({
        id: item.id,
        price: item.preco
      })),
      delivery: {
        receiver: delivery.receiver,
        address: {
          description: delivery.address,
          city: delivery.city,
          zipCode: delivery.zipCode,
          number: Number(delivery.number),
          complement: delivery.complement
        }
      },
      payment: {
        card: {
          name: payment.cardName,
          number: payment.cardNumber,
          code: Number(payment.cardCode),
          expires: {
            month: Number(payment.expiresMonth),
            year: Number(payment.expiresYear)
          }
        }
      }
    }

    const response = await fetch(
      'https://api-ebac.vercel.app/api/efood/checkout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) {
      alert('Ops! Não foi possível finalizar o pedido. Tente novamente.')
      return
    }

    const data = await response.json()
    setOrderId(data.orderId)
    dispatch(limpar())
    goConfirm()
  }

  if (!isOpen) return null

  return (
    <Overlay onClick={closeAll}>
      <Aside onClick={(e) => e.stopPropagation()}>
        {step === 'cart' && (
          <>
            <Lista>
              {itens.map((item) => (
                <Item key={item.cartId}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h4>{item.nome}</h4>
                    <p>R$ {item.preco.toFixed(2)}</p>
                  </div>

                  <button
                    type="button"
                    aria-label="Remover"
                    onClick={() => dispatch(remover(item.cartId))}
                  >
                    x
                  </button>
                </Item>
              ))}
            </Lista>

            <Resumo>
              <span>Valor total</span>
              <span>R$ {total.toFixed(2)}</span>
            </Resumo>

            <Botao
              type="button"
              disabled={itens.length === 0}
              onClick={goDelivery}
            >
              Continuar com a entrega
            </Botao>
          </>
        )}

        {step === 'delivery' && (
          <>
            <Titulo>Entrega</Titulo>

            <Form>
              <label>
                Quem irá receber
                <input
                  value={delivery.receiver}
                  onChange={(e) =>
                    setDelivery({ ...delivery, receiver: e.target.value })
                  }
                />
              </label>

              <label>
                Endereço
                <input
                  value={delivery.address}
                  onChange={(e) =>
                    setDelivery({ ...delivery, address: e.target.value })
                  }
                />
              </label>

              <label>
                Cidade
                <input
                  value={delivery.city}
                  onChange={(e) =>
                    setDelivery({ ...delivery, city: e.target.value })
                  }
                />
              </label>

              <Grid2>
                <label>
                  CEP
                  <input
                    value={delivery.zipCode}
                    onChange={(e) =>
                      setDelivery({ ...delivery, zipCode: e.target.value })
                    }
                  />
                </label>

                <label>
                  Número
                  <input
                    value={delivery.number}
                    onChange={(e) =>
                      setDelivery({ ...delivery, number: e.target.value })
                    }
                  />
                </label>
              </Grid2>

              <label>
                Complemento (opcional)
                <input
                  value={delivery.complement}
                  onChange={(e) =>
                    setDelivery({ ...delivery, complement: e.target.value })
                  }
                />
              </label>

              <Botao
                type="button"
                disabled={!isDeliveryValid}
                onClick={goPayment}
              >
                Continuar com o pagamento
              </Botao>

              <BotaoSecundario type="button" onClick={backToCart}>
                Voltar para o carrinho
              </BotaoSecundario>
            </Form>
          </>
        )}

        {step === 'payment' && (
          <>
            <Titulo>Pagamento - Valor a pagar R$ {total.toFixed(2)}</Titulo>

            <Form onSubmit={finalizarPagamento}>
              <label>
                Nome no cartão
                <input
                  value={payment.cardName}
                  onChange={(e) =>
                    setPayment({ ...payment, cardName: e.target.value })
                  }
                />
              </label>

              <Grid2>
                <label>
                  Número do cartão
                  <input
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({ ...payment, cardNumber: e.target.value })
                    }
                  />
                </label>

                <label>
                  CVV
                  <input
                    value={payment.cardCode}
                    onChange={(e) =>
                      setPayment({ ...payment, cardCode: e.target.value })
                    }
                  />
                </label>
              </Grid2>

              <Grid2>
                <label>
                  Mês de vencimento
                  <input
                    value={payment.expiresMonth}
                    onChange={(e) =>
                      setPayment({ ...payment, expiresMonth: e.target.value })
                    }
                  />
                </label>

                <label>
                  Ano de vencimento
                  <input
                    value={payment.expiresYear}
                    onChange={(e) =>
                      setPayment({ ...payment, expiresYear: e.target.value })
                    }
                  />
                </label>
              </Grid2>

              <Botao type="submit" disabled={!isPaymentValid}>
                Finalizar pagamento
              </Botao>

              <BotaoSecundario type="button" onClick={backToDelivery}>
                Voltar para a edição de endereço
              </BotaoSecundario>
            </Form>
          </>
        )}

        {step === 'confirm' && (
          <>
            <Titulo>Pedido realizado - {orderId}</Titulo>

            <Texto>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
              <br />
              <br />
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
              <br />
              <br />
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
              <br />
              <br />
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </Texto>

            <Botao type="button" onClick={closeAll}>
              Concluir
            </Botao>
          </>
        )}
      </Aside>
    </Overlay>
  )
}

export default Carrinho
