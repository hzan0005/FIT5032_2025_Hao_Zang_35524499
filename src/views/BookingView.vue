<template>
  <div class="booking-container py-5">
    <div class="container">
      <section class="text-center mb-5">
        <h1 class="display-5 fw-bold">Event & Workshop Calendar</h1>
        <p class="lead text-muted mt-3">
          Browse our upcoming events and workshops. Click on any event to manage your booking.
        </p>
        <div class="legend d-flex justify-content-center flex-wrap gap-4 mt-4">
            <span><span class="legend-color-box community"></span> Community Event</span>
            <span><span class="legend-color-box workshop"></span> Workshop</span>
            <span><span class="legend-color-box booked"></span> Your Booked Events</span>
        </div>
      </section>

      <section class="calendar-wrapper p-4 bg-white rounded shadow-lg">
        <FullCalendar :options="calendarOptions" />
      </section>

      <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="eventModalLabel">
                {{ selectedEvent?.extendedProps.isBooked ? 'Booking Details' : 'Confirm Your Booking' }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="selectedEvent">
              <p v-if="!selectedEvent.extendedProps.isBooked">You are about to book a spot for:</p>
              <h4 class="fw-bold">{{ selectedEvent.title }}</h4>
              <hr>
              <p><strong>Date:</strong> {{ selectedEvent.startStr }}</p>
              <p v-if="selectedEvent.extendedProps.location">
                <strong>Location:</strong> {{ selectedEvent.extendedProps.location }}
              </p>
               <p v-if="selectedEvent.extendedProps.skill_level">
                <strong>Skill Level:</strong> {{ selectedEvent.extendedProps.skill_level }}
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button v-if="!selectedEvent?.extendedProps.isBooked" type="button" class="btn btn-primary" @click="confirmBooking">Confirm Booking</button>
              <button v-else type="button" class="btn btn-danger" @click="confirmCancellation">Cancel Booking</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="notificationModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notificationModalLabel">{{ notification.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ notification.message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'bootstrap';

const selectedEvent = ref(null);
let eventModal = null;
let notificationModal = null; 
const allEvents = ref([]);
const userBookings = reactive({
    ids: new Set(),
    dates: new Set()
});
const notification = reactive({
    title: '',
    message: ''
});

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: { /* ... */ },
  events: [],
  eventClick: handleEventClick,
});

onMounted(async () => {
  eventModal = new Modal(document.getElementById('eventModal'));
  notificationModal = new Modal(document.getElementById('notificationModal')); 
  await loadAndProcessEvents();
});

function showNotification(title, message) {
    notification.title = title;
    notification.message = message;
    notificationModal.show();
}

function updateUserBookings() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        userBookings.ids.clear();
        userBookings.dates.clear();
        return;
    }
    const userEmail = JSON.parse(userData).email;
    const allBookings = JSON.parse(localStorage.getItem('bookedEvents') || '{}');
    const userBookedIds = allBookings[userEmail] || [];
    
    userBookings.ids = new Set(userBookedIds);
    userBookings.dates.clear();
    
    allEvents.value.forEach(event => {
        if (userBookings.ids.has(event.id)) {
            userBookings.dates.add(event.start);
        }
    });
}

async function loadAndProcessEvents() {
  try {
    const [eventsResponse, workshopsResponse] = await Promise.all([
      fetch('/data/community_events.json'),
      fetch('/data/digital_skills.json')
    ]);
    const communityEvents = await eventsResponse.json();
    const workshopEvents = await workshopsResponse.json();
    
    const formattedEvents = communityEvents.map(event => ({ id: `community_${event.id}`, title: event.event_name, start: event.date, extendedProps: { type: 'Community Event', location: event.location } }));
    const formattedWorkshops = workshopEvents.map(event => ({ id: `workshop_${event.id}`, title: event.workshop_name, start: event.date, extendedProps: { type: 'Workshop', skill_level: event.skill_level } }));

    allEvents.value = [...formattedEvents, ...formattedWorkshops];
    updateUserBookings();
    renderCalendarEvents();
  } catch (error) {
    console.error("Failed to load event data:", error);
  }
}

function renderCalendarEvents() {
    calendarOptions.value.events = allEvents.value.map(event => {
        const isBooked = userBookings.ids.has(event.id);
        let color = event.extendedProps.type === 'Workshop' ? '#fd7e14' : '#0d6efd';
        if (isBooked) color = '#198754';
        return { ...event, backgroundColor: color, borderColor: color, extendedProps: { ...event.extendedProps, isBooked } };
    });
}

function handleEventClick(clickInfo) {
  const eventDateStr = clickInfo.event.startStr.split('T')[0];
  
  if (clickInfo.event.extendedProps.isBooked) {
    selectedEvent.value = { id: clickInfo.event.id, title: clickInfo.event.title, startStr: clickInfo.event.start.toLocaleDateString('en-AU'), extendedProps: clickInfo.event.extendedProps };
    eventModal.show();
    return;
  }
  
  if (userBookings.dates.has(eventDateStr)) {
    showNotification("Booking Conflict", "You have another event scheduled for this day. Please cancel the existing booking first.");
    return;
  }
  
  selectedEvent.value = { id: clickInfo.event.id, title: clickInfo.event.title, startStr: clickInfo.event.start.toLocaleDateString('en-AU'), extendedProps: clickInfo.event.extendedProps };
  eventModal.show();
}

function confirmBooking() {
  const eventId = selectedEvent.value.id;
  const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;
  
  let allBookings = JSON.parse(localStorage.getItem('bookedEvents') || '{}');
  if (!allBookings[userEmail]) allBookings[userEmail] = [];

  if (!allBookings[userEmail].includes(eventId)) {
    allBookings[userEmail].push(eventId);
    localStorage.setItem('bookedEvents', JSON.stringify(allBookings));
    
    updateUserBookings();
    renderCalendarEvents();
    
    showNotification("Booking Successful", `You have successfully booked a spot for "${selectedEvent.value.title}".`);
  }
  eventModal.hide();
  selectedEvent.value = null;
}

function confirmCancellation() {
    const eventId = selectedEvent.value.id;
    const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    let allBookings = JSON.parse(localStorage.getItem('bookedEvents') || '{}');
    if (allBookings[userEmail]) {
        allBookings[userEmail] = allBookings[userEmail].filter(id => id !== eventId);
        localStorage.setItem('bookedEvents', JSON.stringify(allBookings));
        
        updateUserBookings();
        renderCalendarEvents();
        showNotification("Cancellation Successful", `Your booking for "${selectedEvent.value.title}" has been cancelled.`);
    }
    
    eventModal.hide();
    selectedEvent.value = null;
}
</script>

<style>
.booking-container {
  background-color: #f0f2f5;
}
.calendar-wrapper {
  min-height: 80vh;
}
.fc-event {
  cursor: pointer;
  transition: opacity 0.2s;
}
.fc-event:hover {
  opacity: 0.8;
}
.legend-color-box {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    border-radius: 3px;
    vertical-align: middle;
}
.legend-color-box.community { background-color: #0d6efd; }
.legend-color-box.workshop { background-color: #fd7e14; }
.legend-color-box.booked { background-color: #198754; }
</style>