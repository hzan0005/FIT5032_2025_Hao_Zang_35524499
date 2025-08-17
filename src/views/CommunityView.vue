<template>
  <div class="community-view py-5" style="background-color: #f8f9fa;">
    <div class="container">
      <section class="text-center mb-5">
        <h1 class="display-5 fw-bold">Community Programs</h1>
        <p class="lead text-muted mt-3">
          Fostering connection, learning, and well-being within our senior community.
        </p>
      </section>
      <section class="row align-items-center mb-5 pb-5 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="/images/community-event.jpg" 
            class="img-fluid rounded shadow-lg" 
            alt="A group of seniors happily participating in a community event">
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold">A Vibrant Community Awaits</h2>
          <p class="text-secondary fs-5">
            Browse our list of activities below, then head to our interactive calendar to book your spot and join the fun!
          </p>
          <router-link to="/booking" class="btn btn-primary btn-lg mt-2">Go to Booking Calendar</router-link>
        </div>
      </section>
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-4">📅 Upcoming Activities List</h2>
        <div class="table-responsive shadow-sm bg-white p-3 rounded">
          <table id="eventsTable" class="table table-hover table-bordered" style="width:100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Type</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

let dataTable = null;

onMounted(async () => {
  if ($.fn.DataTable.isDataTable('#eventsTable')) {
    $('#eventsTable').DataTable().destroy();
  }
  try {
    const response = await fetch('/data/community_events.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    dataTable = $('#eventsTable').DataTable({
      data: data,
      columns: [
        { data: 'id' }, { data: 'event_name' }, { data: 'location' },
        { data: 'date' }, { data: 'type' }, { data: 'registered' }
      ],
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      responsive: true
    });
  } catch (error) {
    console.error("Failed to load community events data:", error);
  }
});

onBeforeUnmount(() => {
  if (dataTable) {
    dataTable.destroy();
    dataTable = null;
  }
});
</script>

<style scoped>
.community-view {
  font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
.table-hover tbody tr:hover {
  background-color: #e9ecef;
}
:deep(tfoot input) {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
</style>