<template>
  <div>
    <Navbar />

  <!-- Hero Section -->
  <section id="home" class="section home-section fade-in">
    <div class="video-container">
      <img :src="videoSrc" alt="Hero Image" />
    </div>
    <div class="home-content">
      <h1>✨ Welcome to KHOHAV ✨</h1>
      <p>Discover the finest jewelry pieces for your collection.</p>
      <button id='btn' @click="scrollToProducts">Shop Now</button>
    </div>
  </section>

  <!-- About Us Section -->
  <section id="about" class="section fade-in black-background about-section">
    <h2 class="about-title">About Us</h2>
    <div class="about-container">
      <div class="about-image">
        <img :src="wear" alt="About Us" />
      </div>
      <div class="about-text">
        <p>
          KHOHAV Jewelry is a home for timeless beauty and elegance. We celebrate
          individuality with handpicked designs that tell stories through precision
          and passion. Our collections blend contemporary trends with classic artistry,
          making every creation a unique expression of your style.
          Jewelry is more than an accessory—it’s a statement, a memory, and a symbol
          of what matters most to you.
        </p>
      </div>
    </div>
  </section>

  <!-- Product Section -->
  <section id="products" class="section fade-in black-background">
    <h2 class="products">Our Products</h2>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
          :src="product.image"
          alt="Product Image"
          class="product-image"
          @click="buy(product)"
        />
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
        <button @click="buy(product)">Buy Now</button>
      </div>
    </div>
  </section>

  <!-- Checkout Section -->
  <section id="checkout" class="checkout-section">
    <div v-if="checkoutProduct" class="checkout-container">
      <!-- Left Side: Payment Form -->
      <div class="checkout-form">
        <h2>Cart / Checkout</h2>
        <h3>PAYMENT METHOD</h3>
        <div class="payment-methods">
          <button type="button" @click="selectedPayment = 'Mobile Money (MTN/Airtel)'" :class="{ active: selectedPayment === 'Mobile Money (MTN/Airtel)' }">Mobile Money (MTN/Airtel)</button>
          <button type="button" @click="selectedPayment = 'Cash on Delivery'" :class="{ active: selectedPayment === 'Cash on Delivery' }">Cash on Delivery</button>
          <button type="button" @click="selectedPayment = 'Card Payment'" :class="{ active: selectedPayment === 'Card Payment' }">Card Payment</button>
        </div>

        <h3>PAYMENT INFORMATION</h3>
        <form @submit.prevent="completeCheckout">
          <!-- Mobile Money Fields -->
          <div v-if="selectedPayment === 'Mobile Money (MTN/Airtel)'">
            <label>Phone Number (MTN/Airtel)</label>
            <input type="text" placeholder="+256 7XX XXX XXX" required />

            <div class="form-row">
              <div>
                <label>Network</label>
                <select required>
                  <option value="MTN">MTN</option>
                  <option value="Airtel">Airtel</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Card Payment Fields -->
          <div v-if="selectedPayment === 'Card Payment'">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" required />

            <div class="form-row">
              <div>
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </div>

          <h3>PERSONAL INFORMATION</h3>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Delivery Address</label>
          <input type="text" placeholder="Enter your address" required />

          <label>City</label>
          <input type="text" placeholder="Enter your city" required />

          <label>Country</label>
          <input type="text" placeholder="Enter your country" required />

          <button type="submit" class="confirm-btn">CONFIRM ORDER</button>
        </form>
      </div>

      <!-- Right Side: Image -->
      <div class="checkout-image">
        <img :src="checkoutProduct.image" alt="Checkout Image" />
      </div>
    </div>

    <div v-else class="empty-checkout">
      <p>No product selected. Please choose a product to proceed with checkout.</p>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="section fade-in black-background">
    <h2>Contact Us</h2>
    <div class="contact-container">
      <div class="contact-form-wrapper">
        <form @submit.prevent="handleContactSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// Assets
import gold from './assets/gold.jpg'
import earings from './assets/earings.jpg'
import hear from './assets/hear.jpg'
import kin from './assets/kin.jpg'
import wear from './assets/wear.jpg'
import ten from './assets/ten.jpg'
import beauty from './assets/beauty.png'
import yey from './assets/yey.jpg'

const videoSrc = gold
const checkoutProduct = ref(null)
const selectedPayment = ref('Mobile Money (MTN/Airtel)')

const products = ref([
  { id: 1, name: 'Bracelet', price: 3000, image: gold },
  { id: 2, name: 'Diamond Ring', price: 8000, image: earings },
  { id: 3, name: 'Silver', price: 5000, image: hear },
  { id: 4, name: 'Earrings', price: 7000, image: kin },
  { id: 5, name: 'Bracelet', price: 3500, image: beauty },
  { id: 6, name: 'Bracelet', price: 5990, image: ten },
  { id: 7, name: 'Necklace', price: 299, image: wear },
  { id: 8, name: 'Silver Necklace', price: 199, image: yey }
])

function buy(product) {
  checkoutProduct.value = product
  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  window.location.hash = '#checkout'
}

function completeCheckout() {
  alert(`Thank you for purchasing ${checkoutProduct.value.name}!`)
  checkoutProduct.value = null
  window.location.hash = '#products'
}

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

function handleContactSubmit() {
  alert('Thank you for your message! We will get back to you soon.');
}
</script>

<style scoped>
/* Hero Section */
.home-section {
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.video-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-content {
  position: relative;
  z-index: 1;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 10px;
  font-size: 30px;
  color: #b4863a; /* Changed to gold */
}

.section {
  padding: 3rem 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.black-background {
  background-color: #000;
  color: #fff;
}

/* About Us Section */
.about-section {
  padding: 3rem 1rem;
}

.about-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #b4863a; /* Gold heading */
}

.about-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  gap: 2rem;
  width: 100%;
}

.about-image img {
  width: 400px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.about-text {
  color: #fff;
  max-width: 500px;
  text-align: left;
}

.about-text p {
  font-size: 1.2rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
    text-align: center;
  }
  .about-image img {
    width: 90%;
  }
  .about-text {
    text-align: center;
  }
}

/* Product Section */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.products {
  color: white;
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 30px rgba(184, 134, 58, 0.4);
  border: 2px solid #b4863a;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
}

button {
  background-color: #b4863a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
}

button:hover {
  background-color: #d4a353;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Checkout Section Styling */
.checkout-section {
  background-color: #000;
  color: #fff;
  padding: 3rem;
  display: flex;
  justify-content: center;
}

.checkout-container {
  display: flex;
  max-width: 1100px;
  width: 100%;
  gap: 3rem;
}

.checkout-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.checkout-form h2,
.checkout-form h3 {
  margin-bottom: 1rem;
  font-weight: bold;
}

.payment-methods {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.payment-methods button {
  background: transparent;
  border: 1px solid #555;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.payment-methods button.active {
  border: 1px solid #b4863a;
  color: #b4863a;
}

.checkout-form label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  display: block;
}

.checkout-form input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: #111;
  border: 1px solid #333;
  color: #fff;
  font-size: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.confirm-btn {
  background-color: #b4863a;
  color: #fff;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #d4a353;
}

.checkout-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-image img {
  width: 100%;
  max-width: 400px;
  object-fit: contain;
}

.empty-checkout {
  text-align: center;
  font-size: 1.2rem;
  color: #ccc;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-content {
    font-size: 20px;
    padding: 1rem;
  }

  .section {
    padding: 2rem 1rem;
  }

  .checkout-container {
    flex-direction: column;
  }

  .checkout-section {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* Contact Section */
.contact-container {
  display: flex;
  justify-content: center;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contact-form-wrapper {
  max-width: 600px;
  width: 100%;
  background: #111;
  padding: 2rem;
  border-radius: 10px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #b4863a;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #333;
  background: #111;
  color: #fff;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.contact-btn {
  background-color: #b4863a;
  color: #fff;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-btn:hover {
  background-color: #d4a353;
}

</style>



















