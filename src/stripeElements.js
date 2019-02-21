export const Stripe = {
  instance: null,
  createToken: null,
  createSource: null,
  retrieveSource: null,
  paymentRequest: null,
  redirectToCheckout: null,
  retrievePaymentIntent: null,
  handleCardPayment: null,
  // confirmPaymentIntent: null,
  elements: null
}

export const baseStyle = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontFamily: 'Helvetica Neue',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

function init(key, options = {}) {
  if (typeof key === "object" && typeof key.elements === "function") {
    Stripe.instance = key
  }

  if (window.Stripe === undefined && Stripe.instance === null) {
    console.error('Stripe V3 library not loaded!')
  } else if (Stripe.instance === null) {
    Stripe.instance = window.Stripe(key)
  }

  if (!Stripe.instance.elements) {
    console.error('Stripe V3 library not loaded!')
  } else if (Stripe.elements === null) {
    Stripe.elements = Stripe.instance.elements(options)
  }
}

export function create(elementType, key_or_stripe, options = {}) {
  init(key_or_stripe, options.elements || {})
  options.style = Object.assign(baseStyle, options.style || {})

  const element = Stripe.elements.create(elementType, options)

  Stripe.createToken = (options) => Stripe.instance.createToken(element, options)
  Stripe.createSource = (options) => Stripe.instance.createSource(element, options)
  Stripe.retrieveSource = (options) => Stripe.instance.retrieveSource(options)
  Stripe.paymentRequest = (options) => Stripe.instance.paymentRequest(options)
  Stripe.redirectToCheckout = (options) => Stripe.instance.redirectToCheckout(options)
  Stripe.retrievePaymentIntent = (options) => Stripe.instance.retrievePaymentIntent(options)
  Stripe.handleCardPayment = (options) => Stripe.instance.handleCardPayment(options, element)
  // Stripe.confirmPaymentIntent = (options) => Stripe.instance.confirmPaymentIntent(options, element)

  return element
}

export function destroy() {
    Stripe.instance = null
    Stripe.elements = null
    Stripe.createToken = null
    Stripe.createSource = null
    Stripe.retrieveSource = null
    Stripe.paymentRequest = null
    Stripe.redirectToCheckout = null
    Stripe.retrievePaymentIntent = null
    Stripe.handleCardPayment = null
    // Stripe.confirmPaymentIntent = null
}
