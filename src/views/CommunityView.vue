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
            We believe that staying socially active is a cornerstone of a happy and healthy life. Our programs are designed to help you connect with peers, discover new hobbies, and engage in meaningful activities.
          </p>
          <a href="#eventsTable" class="btn btn-primary btn-lg mt-2">Explore Upcoming Events</a>
        </div>
      </section>
      
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-4">📅 Upcoming Events Calendar</h2>
        <div class="table-responsive bg-white p-4 rounded shadow-sm">
          <table id="eventsTable" class="table table-hover" style="width:100%">
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
            <tbody>
              </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Event Name</th>
                <th>Location</th>
                <th></th>
                <th>Type</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section class="row align-items-center bg-white p-4 rounded shadow-sm">
        <div class="col-lg-7">
          <h2 class="fw-bold mb-3">Get Involved Today!</h2>
           <p class="text-secondary mb-4">
            Joining our community is simple. Whether you want to participate in an event or lend a hand as a volunteer, here’s how you can connect with us and other valuable resources.
          </p>
           <div class="list-group">
            <a href="https://www.volunteer.vic.gov.au/" class="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel="noopener">
              <span class="fs-2">🤝</span>
              <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h5 class="mb-1">Become a Volunteer</h5>
                  <p class="mb-0 opacity-75">Find rewarding opportunities to give back at Volunteer Victoria.</p>
                </div>
              </div>
            </a>
            <a href="https://www.seniorsonline.vic.gov.au/social" class="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel="noopener">
               <span class="fs-2">🌐</span>
              <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h5 class="mb-1">Seniors Online Victoria</h5>
                  <p class="mb-0 opacity-75">Explore more official social events and state-wide resources.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block mt-4 mt-lg-0">
           <img 
            src="/images/volunteering.jpg" 
            class="img-fluid rounded shadow" 
            alt="A happy senior woman volunteering and organizing donations">
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
        { data: 'id', title: 'ID' },
        { data: 'event_name', title: 'Event Name' },
        { data: 'location', title: 'Location' },
        { data: 'date', title: 'Date' },
        { data: 'type', title: 'Type' },
        { data: 'registered', title: 'Registered' }
      ],
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      responsive: true,
      initComplete: function () {
        this.api()
          .columns([1, 2, 4]) 
          .every(function () {
            const column = this;
            const title = $(column.header()).text();
            if (title) {
              const input = $(`<input type="text" class="form-control form-control-sm" placeholder="Search ${title}" />`)
                .appendTo($(column.footer()).empty())
                .on('keyup change clear', function () {
                  if (column.search() !== this.value) {
                    column.search(this.value).draw();
                  }
                });
            }
          });
      },
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
  cursor: pointer;
}

:deep(.dataTables_wrapper .dataTables_length),
:deep(.dataTables_wrapper .dataTables_filter) {
  margin-bottom: 1rem;
}

:deep(tfoot input) {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

.list-group-item-action:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;
}
</style>