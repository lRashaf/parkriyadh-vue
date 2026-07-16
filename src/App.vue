<script setup>
import { ref, computed } from 'vue'
import NavBar from './components/NavBar.vue'
import NotificationsPanel from './components/NotificationsPanel.vue'
import HomeView from './views/HomeView.vue'
import DetailsView from './views/DetailsView.vue'
import BookingFlow from './views/BookingFlow.vue'
import QRView from './views/QRView.vue'
import ReservationsView from './views/ReservationsView.vue'
import DashboardView from './views/DashboardView.vue'
import AdminView from './views/AdminView.vue'
import { NOTIFICATIONS } from './data.js'

const isDark = ref(true)
const view = ref('home')
const selectedParking = ref(null)
const showNotif = ref(false)
const resId = ref(`PRK-2024-${Math.floor(Math.random() * 9000) + 1000}`)

const unread = computed(() => NOTIFICATIONS.filter(n => !n.read).length)

function navigate(v) {
  view.value = v
  selectedParking.value = null
}
function selectParking(p) {
  selectedParking.value = p
  view.value = 'details'
}
function book(p) {
  selectedParking.value = p
  view.value = 'booking'
}
function bookingComplete() {
  view.value = 'qr'
}
</script>

<template>
  <div :class="isDark ? 'dark' : ''" style="font-family: 'Manrope', sans-serif;">
    <div class="bg-background text-foreground min-h-screen">
      <NavBar
        :isDark="isDark"
        :view="view"
        :unread="unread"
        @toggle-dark="isDark = !isDark"
        @navigate="navigate"
        @notif-click="showNotif = !showNotif"
      />

      <Transition name="fade" mode="out-in">
        <HomeView v-if="view === 'home'" key="home" :isDark="isDark"
          @select-parking="selectParking" @book="book" />

        <DetailsView v-else-if="view === 'details' && selectedParking" key="details"
          :p="selectedParking" :isDark="isDark" @back="view = 'home'" @book="book(selectedParking)"
          @switch="selectedParking = $event" />

        <BookingFlow v-else-if="view === 'booking' && selectedParking" key="booking"
          :p="selectedParking" @back="view = selectedParking ? 'details' : 'home'" @complete="bookingComplete" />

        <QRView v-else-if="view === 'qr' && selectedParking" key="qr"
          :p="selectedParking" :resId="resId" @home="view = 'home'; selectedParking = null" />

        <ReservationsView v-else-if="view === 'reservations'" key="reservations" />

        <DashboardView v-else-if="view === 'dashboard'" key="dashboard" />

        <AdminView v-else-if="view === 'admin'" key="admin" />
      </Transition>

      <Transition name="fade">
        <NotificationsPanel v-if="showNotif" @close="showNotif = false" />
      </Transition>
    </div>
  </div>
</template>
