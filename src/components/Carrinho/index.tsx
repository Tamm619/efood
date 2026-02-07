import { FormEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { fechar, limpar, remover } from '../../store/reducers/carrinho'
import {
  Aside,
  Botao,
  BotaoSecundario,
  Erro,
  Footer,
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

type DeliveryTouched = Record<keyof DeliveryForm, boolean>
type PaymentTouched = Record<keyof PaymentForm, boolean>

const onlyDigits = (v: string) => v.replace(/\D/g, '')

const isLettersAndSpaces = (v: string) =>
  /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(v.trim()) && v.trim().length > 0

const validateDelivery = (d: DeliveryForm) => {
  const zip = onlyDigits(d.zipCode)
  const num = onlyDigits(d.number)

  const errors: Partial<Record<keyof DeliveryForm, string>> = {}

  if (d.receiver.trim().length < 3 || !isLettersAndSpaces(d.receiver)) {
    errors.receiver = 'Informe um nome válido (apenas letras e espaços).'
  }

  if (d.address.trim().length < 3) {
    errors.address = 'Informe um endereço válido.'
  }

  if (d.city.trim().length < 2 || !isLettersAndSpaces(d.city)) {
    errors.city = 'Informe uma cidade válida (apenas letras e espaços).'
  }

  if (zip.length !== 8) {
    errors.zipCode = 'CEP inválido (use 8 números).'
  }

  if (num.length < 1) {
    errors.number = 'Número inválido (apenas números).'
  }

  return errors
}

const normalizeYear = (y: string) => {
  const digits = onlyDigits(y)
  if (digits.length === 2) return 2000 + Number(digits)
  if (digits.length === 4) return Number(digits)
  return NaN
}

const validatePayment = (p: PaymentForm) => {
  const cardNum = onlyDigits(p.cardNumber)
  const cvv = onlyDigits(p.cardCode)
  const monthDigits = onlyDigits(p.expiresMonth)
  const yearNum = normalizeYear(p.expiresYear)

  const errors: Partial<Record<keyof PaymentForm, string>> = {}

  if (p.cardName.trim().length < 3 || !isLettersAndSpaces(p.cardName)) {
    errors.cardName = 'Nome inválido (apenas letras e espaços).'
  }

  if (cardNum.length < 13 || cardNum.length > 19) {
    errors.cardNumber = 'Número do cartão inválido (13 a 19 dígitos).'
  }

  if (cvv.length !== 3) {
    errors.cardCode = 'CVV inválido (3 dígitos).'
  }

  const month = Number(monthDigits)
  if (!monthDigits || Number.isNaN(month) || month < 1 || month > 12) {
    errors.expiresMonth = 'Mês inválido (1 a 12).'
  }

  if (!p.expiresYear.trim()) {
    errors.expiresYear = 'Ano inválido.'
  } else if (Number.isNaN(yearNum)) {
    errors.expiresYear = 'Ano inválido (use 2 ou 4 dígitos).'
  } else {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    if (!errors.expiresMonth) {
      if (yearNum < currentYear) {
        errors.expiresYear = 'Cartão vencido.'
      } else if (yearNum === currentYear && month < currentMonth) {
        errors.expiresYear = 'Cartão vencido.'
      }
    }
  }

  return errors
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

  const [deliveryTouched, setDeliveryTouched] = useState<DeliveryTouched>({
    receiver: false,
    address: false,
    city: false,
    zipCode: false,
    number: false,
    complement: false
  })

  const [paymentTouched, setPaymentTouched] = useState<PaymentTouched>({
    cardName: false,
    cardNumber: false,
    cardCode: false,
    expiresMonth: false,
    expiresYear: false
  })

  const total = useMemo(
    () => itens.reduce((acc, item) => acc + item.preco, 0),
    [itens]
  )

  const deliveryErrors = useMemo(() => validateDelivery(delivery), [delivery])
  const paymentErrors = useMemo(() => validatePayment(payment), [payment])

  const isDeliveryValid = Object.keys(deliveryErrors).length === 0
  const isPaymentValid = Object.keys(paymentErrors).length === 0

  const closeAll = () => {
    dispatch(fechar())
    setStep('cart')
    setOrderId('')
    setDeliveryTouched({
      receiver: false,
      address: false,
      city: false,
      zipCode: false,
      number: false,
      complement: false
    })
    setPaymentTouched({
      cardName: false,
      cardNumber: false,
      cardCode: false,
      expiresMonth: false,
      expiresYear: false
    })
  }

  const goDelivery = () => setStep('delivery')

  const goPayment = () => {
    setDeliveryTouched({
      receiver: true,
      address: true,
      city: true,
      zipCode: true,
      number: true,
      complement: true
    })

    if (!isDeliveryValid) return
    setStep('payment')
  }

  const goConfirm = () => setStep('confirm')
  const backToCart = () => setStep('cart')
  const backToDelivery = () => setStep('delivery')

  const showDeliveryError = (field: keyof DeliveryForm) =>
    deliveryTouched[field] && deliveryErrors[field]

  const showPaymentError = (field: keyof PaymentForm) =>
    paymentTouched[field] && paymentErrors[field]

  async function finalizarPagamento(e: FormEvent) {
    e.preventDefault()

    setPaymentTouched({
      cardName: true,
      cardNumber: true,
      cardCode: true,
      expiresMonth: true,
      expiresYear: true
    })

    setDeliveryTouched({
      receiver: true,
      address: true,
      city: true,
      zipCode: true,
      number: true,
      complement: true
    })

    if (!isDeliveryValid) {
      setStep('delivery')
      return
    }
    if (!isPaymentValid) return
    if (itens.length === 0) return

    const zip = onlyDigits(delivery.zipCode)
    const number = Number(onlyDigits(delivery.number))

    const cardNumber = onlyDigits(payment.cardNumber)
    const cardCode = Number(onlyDigits(payment.cardCode))
    const month = Number(onlyDigits(payment.expiresMonth))
    const year = normalizeYear(payment.expiresYear)

    const body = {
      products: itens.map((item) => ({
        id: item.id,
        price: item.preco
      })),
      delivery: {
        receiver: delivery.receiver.trim(),
        address: {
          description: delivery.address.trim(),
          city: delivery.city.trim(),
          zipCode: zip,
          number,
          complement: delivery.complement.trim()
        }
      },
      payment: {
        card: {
          name: payment.cardName.trim(),
          number: cardNumber,
          code: cardCode,
          expires: {
            month,
            year
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

            <Footer>
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

              <BotaoSecundario type="button" onClick={closeAll}>
                Fechar carrinho
              </BotaoSecundario>
            </Footer>
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
                  onBlur={() =>
                    setDeliveryTouched({ ...deliveryTouched, receiver: true })
                  }
                  onChange={(e) =>
                    setDelivery({ ...delivery, receiver: e.target.value })
                  }
                />
                {showDeliveryError('receiver') && (
                  <Erro>{showDeliveryError('receiver')}</Erro>
                )}
              </label>

              <label>
                Endereço
                <input
                  value={delivery.address}
                  onBlur={() =>
                    setDeliveryTouched({ ...deliveryTouched, address: true })
                  }
                  onChange={(e) =>
                    setDelivery({ ...delivery, address: e.target.value })
                  }
                />
                {showDeliveryError('address') && (
                  <Erro>{showDeliveryError('address')}</Erro>
                )}
              </label>

              <label>
                Cidade
                <input
                  value={delivery.city}
                  onBlur={() =>
                    setDeliveryTouched({ ...deliveryTouched, city: true })
                  }
                  onChange={(e) =>
                    setDelivery({ ...delivery, city: e.target.value })
                  }
                />
                {showDeliveryError('city') && (
                  <Erro>{showDeliveryError('city')}</Erro>
                )}
              </label>

              <Grid2>
                <label>
                  CEP
                  <input
                    inputMode="numeric"
                    value={delivery.zipCode}
                    onBlur={() =>
                      setDeliveryTouched({ ...deliveryTouched, zipCode: true })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 8)
                      setDelivery({ ...delivery, zipCode: digits })
                    }}
                  />
                  {showDeliveryError('zipCode') && (
                    <Erro>{showDeliveryError('zipCode')}</Erro>
                  )}
                </label>

                <label>
                  Número
                  <input
                    inputMode="numeric"
                    value={delivery.number}
                    onBlur={() =>
                      setDeliveryTouched({ ...deliveryTouched, number: true })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 8)
                      setDelivery({ ...delivery, number: digits })
                    }}
                  />
                  {showDeliveryError('number') && (
                    <Erro>{showDeliveryError('number')}</Erro>
                  )}
                </label>
              </Grid2>

              <label>
                Complemento (opcional)
                <input
                  value={delivery.complement}
                  onBlur={() =>
                    setDeliveryTouched({
                      ...deliveryTouched,
                      complement: true
                    })
                  }
                  onChange={(e) =>
                    setDelivery({ ...delivery, complement: e.target.value })
                  }
                />
              </label>

              <Botao type="button" onClick={goPayment}>
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
                  onBlur={() =>
                    setPaymentTouched({ ...paymentTouched, cardName: true })
                  }
                  onChange={(e) =>
                    setPayment({ ...payment, cardName: e.target.value })
                  }
                />
                {showPaymentError('cardName') && (
                  <Erro>{showPaymentError('cardName')}</Erro>
                )}
              </label>

              <Grid2>
                <label>
                  Número do cartão
                  <input
                    inputMode="numeric"
                    value={payment.cardNumber}
                    onBlur={() =>
                      setPaymentTouched({ ...paymentTouched, cardNumber: true })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 19)
                      setPayment({ ...payment, cardNumber: digits })
                    }}
                  />
                  {showPaymentError('cardNumber') && (
                    <Erro>{showPaymentError('cardNumber')}</Erro>
                  )}
                </label>

                <label>
                  CVV
                  <input
                    inputMode="numeric"
                    value={payment.cardCode}
                    onBlur={() =>
                      setPaymentTouched({ ...paymentTouched, cardCode: true })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 3)
                      setPayment({ ...payment, cardCode: digits })
                    }}
                  />
                  {showPaymentError('cardCode') && (
                    <Erro>{showPaymentError('cardCode')}</Erro>
                  )}
                </label>
              </Grid2>

              <Grid2>
                <label>
                  Mês de vencimento
                  <input
                    inputMode="numeric"
                    value={payment.expiresMonth}
                    onBlur={() =>
                      setPaymentTouched({
                        ...paymentTouched,
                        expiresMonth: true
                      })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 2)
                      setPayment({ ...payment, expiresMonth: digits })
                    }}
                  />
                  {showPaymentError('expiresMonth') && (
                    <Erro>{showPaymentError('expiresMonth')}</Erro>
                  )}
                </label>

                <label>
                  Ano de vencimento
                  <input
                    inputMode="numeric"
                    value={payment.expiresYear}
                    onBlur={() =>
                      setPaymentTouched({
                        ...paymentTouched,
                        expiresYear: true
                      })
                    }
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 4)
                      setPayment({ ...payment, expiresYear: digits })
                    }}
                  />
                  {showPaymentError('expiresYear') && (
                    <Erro>{showPaymentError('expiresYear')}</Erro>
                  )}
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
