<template>
  <div class="skills-view-container py-5" style="background-color: #f8f9fa;">
    <div class="container">
      <section class="text-center mb-5">
        <h1 class="display-5 fw-bold">Digital Skills Hub</h1>
        <p class="lead text-muted mt-3">
          Empowering you with the skills to confidently navigate the digital world.
        </p>
      </section>
      <section class="row align-items-center mb-5 pb-5 border-bottom">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="/images/seniors-learning-computer.jpg" 
            class="img-fluid rounded shadow-lg" 
            alt="A group of seniors learning how to use laptops">
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold">Unlock Your Digital Potential</h2>
          <p class="text-secondary fs-5">
            Check out our workshops below. When you're ready to book, visit our interactive calendar.
          </p>
          <router-link to="/booking" class="btn btn-primary btn-lg mt-2">Go to Booking Calendar</router-link>
        </div>
      </section>
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-4">🖥️ Our Workshop Schedule</h2>
        <div class="table-responsive bg-white p-4 rounded shadow-sm">
          <table id="digitalSkillsTable" class="table table-hover" style="width:100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workshop Name</th>
                <th>Skill Level</th>
                <th>Instructor</th>
                <th>Date</th>
                <th>Spots Available</th>
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
  if ($.fn.DataTable.isDataTable('#digitalSkillsTable')) return;
  try {
    const response = await fetch('/data/digital_skills.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    dataTable = $('#digitalSkillsTable').DataTable({
      data: data,
      columns: [
        { data: 'id' }, { data: 'workshop_name' }, { data: 'skill_level' },
        { data: 'instructor' }, { data: 'date' }, { data: 'spots_available' }
      ],
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true
    });
  } catch (error) {
    console.error("Failed to load digital skills data:", error);
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
.skills-view-container {
  font-family: 'system-ui', sans-serif;
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