<template>
  <div class="container py-4">
    <h1 class="fw-bold mb-4">Interactive Data</h1>

    <section class="mb-5">
      <h3 class="mb-3">📅 Community Events</h3>
      <div class="table-responsive">
        <table id="eventsTable" class="table table-striped table-bordered" style="width:100%">
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

    <section class="mb-5">
      <h3 class="mb-3">🤝 Volunteers List</h3>
      <div class="table-responsive">
        <table id="volunteersTable" class="table table-striped table-bordered" style="width:100%">
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

    <section>
      <h3 class="mb-3">💻 Digital Skills Hub</h3>
      <div class="table-responsive">
        <table id="digitalSkillsTable" class="table table-striped table-bordered" style="width:100%">
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
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// 导入 JQuery 和 DataTables
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

let tables = {};

onMounted(async () => {
  // 确保旧的表格实例在重新创建前被销毁
  if (tables.eventsTable) tables.eventsTable.destroy();
  if (tables.volunteersTable) tables.volunteersTable.destroy();
  if (tables.digitalSkillsTable) tables.digitalSkillsTable.destroy();

  // --- 初始化社区活动表格 ---
  const eventsResponse = await fetch('/data/community_events.json');
  const eventsData = await eventsResponse.json();
  
  tables.eventsTable = $('#eventsTable').DataTable({
    data: eventsData,
    columns: [
      { data: 'id' },
      { data: 'event_name' },
      { data: 'location' },
      { data: 'date' },
      { data: 'type' },
      { data: 'registered' }
    ],
    pageLength: 10,
    responsive: true,
    initComplete: function () {
      this.api()
        .columns([1, 2, 4])
        .every(function () {
          let column = this;
          let title = $(column.footer()).text();
          if(title) {
            $('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />')
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

  // --- 初始化志愿者表格 ---
  const volunteersResponse = await fetch('/data/volunteers.json');
  const volunteersData = await volunteersResponse.json();

  tables.volunteersTable = $('#volunteersTable').DataTable({
    data: volunteersData,
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'email' },
      { data: 'role' },
      { data: 'join_date' }
    ],
    pageLength: 10,
    responsive: true,
    initComplete: function () {
      this.api()
        .columns([1, 2, 3])
        .every(function () {
          let column = this;
          let title = $(column.footer()).text();
          if(title) {
            $('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />')
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

  // --- 初始化数字技能表格 (新增) ---
  const digitalSkillsResponse = await fetch('/data/digital_skills.json');
  const digitalSkillsData = await digitalSkillsResponse.json();

  tables.digitalSkillsTable = $('#digitalSkillsTable').DataTable({
    data: digitalSkillsData,
    columns: [
      { data: 'id' },
      { data: 'workshop_name' },
      { data: 'skill_level' },
      { data: 'instructor' },
      { data: 'date' },
      { data: 'spots_available' }
    ],
    pageLength: 10,
    responsive: true,
    initComplete: function () {
      this.api()
        .columns([1, 2, 3])
        .every(function () {
          let column = this;
          let title = $(column.footer()).text();
          if(title) {
            $('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />')
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
});

onBeforeUnmount(() => {
  if (tables.eventsTable) tables.eventsTable.destroy();
  if (tables.volunteersTable) tables.volunteersTable.destroy();
  if (tables.digitalSkillsTable) tables.digitalSkillsTable.destroy();
});
</script>

<style>
tfoot input {
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
}
</style>