<template>
  <header class="top-nav">
    <div class="nav-container">
      <router-link v-if="!isHomePage" class="nav-logo" to="/">
        <img src="/influanswers-logo.png" alt="Influanswers logo" />
      </router-link>
      <a v-else class="nav-logo" href="#hero">
        <img src="/influanswers-logo.png" alt="Influanswers logo" />
      </a>
      <nav class="nav-links">
        <router-link v-if="!isHomePage" class="nav-link" to="/">Home</router-link>
        <a v-else class="nav-link" href="#hero">Home</a>
        <a class="nav-link" :href="isHomePage ? '#steps' : '/#steps'">How it works</a>
        <a class="nav-link" :href="isHomePage ? '#clients' : '/#clients'">Our clients</a>
        <a class="nav-link" :href="isHomePage ? '#pricing' : '/#pricing'">Pricing</a>
        <a class="nav-link" :href="isHomePage ? '#faq' : '/#faq'">FAQ</a>
      </nav>
      <div class="nav-actions">
        <router-link class="nav-button nav-button--ghost" to="/login">Login</router-link>
        <router-link class="nav-button nav-button--primary" to="/brief">Write your brief</router-link>
      </div>
      <Button
        class="mobile-menu-button"
        severity="secondary"
        outlined
        rounded
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="hamburger-icon" aria-hidden="true"></span>
      </Button>
      <Menu ref="menu" :model="menuItems" popup class="mobile-nav-menu" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'

const router = useRouter()
const route = useRoute()
const menu = ref()

const isHomePage = computed(() => route.path === '/')

const hideMenu = () => {
  menu.value?.hide()
}

const scrollToSection = (sectionId: string) => {
  if (isHomePage.value) {
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.hash = sectionId
    }
  } else {
    router.push('/').then(() => {
      setTimeout(() => {
        const target = document.getElementById(sectionId)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    })
  }
  hideMenu()
}

const navigateTo = (path: string) => {
  hideMenu()
  router.push(path)
}

const menuItems = ref<MenuItem[]>([
  { label: 'Home', command: () => (isHomePage.value ? scrollToSection('hero') : navigateTo('/')) },
  { label: 'How it works', command: () => scrollToSection('steps') },
  { label: 'Our clients', command: () => scrollToSection('clients') },
  { label: 'Pricing', command: () => scrollToSection('pricing') },
  { label: 'FAQ', command: () => scrollToSection('faq') },
  { separator: true },
  { label: 'Login', command: () => navigateTo('/login') },
  { label: 'Write your brief', command: () => navigateTo('/brief') },
])

const toggleMenu = (event: MouseEvent) => {
  menu.value?.toggle(event)
}
</script>

<style scoped>
.top-nav {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
}

.nav-logo img {
  height: 24px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #1a1a1a;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-menu-button {
  display: none;
  margin-left: auto;
  width: 44px;
  height: 44px;
  padding: 0;
  align-items: center;
  justify-content: center;
}

.mobile-menu-button .hamburger-icon {
  position: relative;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background-color: currentColor;
}

.mobile-menu-button .hamburger-icon::before,
.mobile-menu-button .hamburger-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background-color: currentColor;
}

.mobile-menu-button .hamburger-icon::before {
  top: -6px;
}

.mobile-menu-button .hamburger-icon::after {
  top: 6px;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.nav-button--ghost {
  color: #6348ed;
  border: 1px solid rgba(99, 72, 237, 0.4);
  background-color: transparent;
}

.nav-button--ghost:hover {
  border-color: #6348ed;
  background-color: rgba(99, 72, 237, 0.08);
}

.nav-button--primary {
  color: #ffffff;
  background-color: #6348ed;
  border: 1px solid #6348ed;
}

.nav-button--primary:hover {
  background-color: #5238d4;
  border-color: #5238d4;
}

@media (max-width: 768px) {
  .nav-container {
    flex-wrap: nowrap;
    gap: 16px;
  }

  .nav-links,
  .nav-actions {
    display: none;
  }

  .mobile-menu-button {
    display: inline-flex;
  }
}

@media (max-width: 640px) {
  .nav-container {
    padding: 14px 20px;
    gap: 12px;
  }

  .mobile-menu-button {
    width: 40px;
    height: 40px;
  }
}
</style>

