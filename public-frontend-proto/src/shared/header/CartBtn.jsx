const CartBtn = () => {
  return (
    <button class="cart-btn" id="cartBtn" onclick="goToCart()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      <span class="cart-label">Lista de cotización</span>
      <div class="cart-count" id="cartCount">0</div>
    </button>
  )
}

export default CartBtn