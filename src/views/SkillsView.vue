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
            alt="A group of seniors learning how to use laptops in a bright, modern classroom">
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold">Unlock Your Digital Potential</h2>
          <p class="text-secondary fs-5">
            From sending your first email to shopping safely online, our workshops are designed to be friendly, patient, and practical. Join our classes to build new skills and stay connected with loved ones.
          </p>
          <a href="#digitalSkillsTable" class="btn btn-primary btn-lg mt-2">Browse Workshops</a>
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
            <tbody>
              </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Workshop Name</th>
                <th>Skill Level</th>
                <th>Instructor</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section class="row align-items-center bg-white p-4 rounded shadow-sm">
        <div class="col-lg-7">
          <h2 class="fw-bold mb-3">Flexible Learning Options</h2>
          <p class="text-secondary mb-4">
            We offer various ways to learn, catering to different preferences and paces. You can also explore these highly recommended platforms for self-guided learning.
          </p>
          <div class="list-group">
            <a href="https://beconnected.esafety.gov.au/" class="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel="noopener">
              <span class="fs-2">🔗</span>
              <div>
                <h5 class="mb-1">Be Connected</h5>
                <p class="mb-0 opacity-75">A fantastic Australian Government initiative for online safety and digital skills.</p>
              </div>
            </a>
             <a href="https://www.skillshare.com/" class="list-group-item list-group-item-action d-flex gap-3 py-3" target="_blank" rel="noopener">
              <span class="fs-2">🎨</span>
              <div>
                <h5 class="mb-1">Skillshare</h5>
                <p class="mb-0 opacity-75">Explore thousands of creative classes, from photography to graphic design.</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block mt-4 mt-lg-0">
           <img 
            src="/images/senior-online-safety.jpg" 
            class="img-fluid rounded shadow" 
            alt="A senior person using a tablet safely at home">
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
  // Prevent re-initialization
  if ($.fn.DataTable.isDataTable('#digitalSkillsTable')) {
    return;
  }

  try {
    const response = await fetch('/data/digital_skills.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    dataTable = $('#digitalSkillsTable').DataTable({
      data: data,
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'workshop_name', title: 'Workshop Name' },
        { data: 'skill_level', title: 'Skill Level' },
        { data: 'instructor', title: 'Instructor' },
        { data: 'date', title: 'Date' },
        { data: 'spots_available', title: 'Spots Available' }
      ],
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true,
      initComplete: function () {
        this.api()
          .columns([1, 2, 3]) // Search for Workshop, Level, and Instructor
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