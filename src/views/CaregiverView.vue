<template>
  <div class="caregiver-view py-5" style="background-color: #f8f9fa;">
    <div class="container">

      <section class="text-center mb-5">
        <h1 class="display-5 fw-bold">Support for Carers</h1>
        <p class="lead text-muted mt-3">
          Providing resources and connections to support our invaluable community caregivers.
        </p>
      </section>

      <section class="row align-items-center mb-5 pb-5 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="/images/caregiver-support.jpg" 
            class="img-fluid rounded shadow-lg" 
            alt="A kind caregiver smiling with a happy senior person">
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold">Your Well-being Matters</h2>
          <p class="text-secondary fs-5">
            Caregiving is a journey that requires strength, compassion, and support. We've curated a list of essential resources and tips to help you navigate your role and take care of yourself along the way.
          </p>
          <a href="#volunteerTable" class="btn btn-primary btn-lg mt-2">Find Support Volunteers</a>
        </div>
      </section>

      <section class="mb-5">
        <h2 class="text-center fw-bold mb-4">🤝 Our Volunteer Network</h2>
        <div class="table-responsive bg-white p-4 rounded shadow-sm">
          <table id="volunteerTable" class="table table-hover" style="width:100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section class="row align-items-center bg-white p-4 rounded shadow-sm">
        <div class="col-lg-7">
          <h2 class="fw-bold mb-3">Essential Resources</h2>
           <p class="text-secondary mb-4">
            Connect with government services and specialized organizations dedicated to caregiver support and mental health.
          </p>
           <div class="list-group">
            <a
              class="list-group-item list-group-item-action d-flex gap-3 py-3"
              v-for="(link, key) in caregiverLinks"
              :key="key"
              :href="link.url"
              target="_blank"
              rel="noopener"
            >
              <span class="fs-2">🌐</span>
              <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h5 class="mb-1">{{ link.text }}</h5>
                  <p class="mb-0 opacity-75">{{ link.description }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block mt-4 mt-lg-0">
           <img 
            src="/images/caregiver-helping-senior.jpg" 
            class="img-fluid rounded shadow" 
            alt="A compassionate caregiver assisting an elderly person with daily tasks">
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

const caregiverLinks = {
  carerGateway: {
    text: "Carer Gateway – Australian Government Support",
    description: "Access a range of services, including counseling, peer support, and financial assistance.",
    url: "https://www.carergateway.gov.au/"
  },
  dementiaAustralia: {
    text: "Dementia Australia – Resources & Helpline",
    description: "Provides information and support for people living with dementia and their carers.",
    url: "https://www.dementia.org.au/"
  },
  headtohealth: {
    text: "Head to Health – Mental Wellbeing Support",
    description: "Find trusted information and digital resources for mental health and well-being.",
    url: "https://www.headtohealth.gov.au/"
  }
};

onMounted(async () => {
  if ($.fn.DataTable.isDataTable('#volunteerTable')) {
    $('#volunteerTable').DataTable().destroy();
  }

  try {
    const response = await fetch('/data/volunteers.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    dataTable = $('#volunteerTable').DataTable({
      data: data,
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'name', title: 'Name' },
        { data: 'email', title: 'Email' },
        { data: 'role', title: 'Role' },
        { data: 'join_date', title: 'Join Date' }
      ],
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      responsive: true,
      initComplete: function () {
        this.api()
          .columns([1, 2, 3]) 
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
    console.error("Failed to load volunteers data:", error);
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
.caregiver-view {
  font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.table-hover tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

/* Deep selectors for DataTable styling */
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