<template>
  <div class="container py-4">
    <h1 class="fw-bold mb-4">Interactive Data</h1>

    <section class="mb-5">
      <h3 class="mb-3">📅 Community Events</h3>
      <div class="table-responsive p-3 bg-white rounded shadow-sm">
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
          <tbody></tbody>
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
      <div class="table-responsive p-3 bg-white rounded shadow-sm">
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
          <tbody></tbody>
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
      <div class="table-responsive p-3 bg-white rounded shadow-sm">
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
          <tbody></tbody>
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
import $ from 'jquery';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import JSZip from 'jszip';

DataTable.Buttons.jszip(JSZip);

let tables = {};

// --- 通用的 DataTables 初始化函数 ---
// ***** 关键修改 1: 增加一个新参数 `exportFileName` *****
function initializeDataTable(selector, ajaxUrl, columns, searchableColumns, exportFileName) {
  const table = $(selector).DataTable({
    destroy: true,
    ajax: { url: ajaxUrl, dataSrc: '' },
    columns: columns,
    pageLength: 10,
    responsive: true,
    dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
         "<'row'<'col-sm-12'tr>>" +
         "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
         "<'row'<'col-sm-12 mt-3'B>>",
    buttons: [
      {
        extend: 'csv',
        text: 'Export to CSV',
        className: 'btn btn-primary',
        // ***** 关键修改 2: 使用传入的参数作为文件名 *****
        filename: exportFileName
      }
    ],
    initComplete: function () {
      this.api().columns(searchableColumns).every(function () {
        let column = this;
        let title = $(column.footer()).text();
        if (title) {
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
  return table;
}

onMounted(() => {
  // ***** 关键修改 3: 在调用函数时传入文件名 *****
  tables.eventsTable = initializeDataTable(
    '#eventsTable',
    '/data/community_events.json',
    [{ data: 'id' }, { data: 'event_name' }, { data: 'location' }, { data: 'date' }, { data: 'type' }, { data: 'registered' }],
    [1, 2, 4],
    'Community_Events_Export' // <-- 文件名
  );

  tables.volunteersTable = initializeDataTable(
    '#volunteersTable',
    '/data/volunteers.json',
    [{ data: 'id' }, { data: 'name' }, { data: 'email' }, { data: 'role' }, { data: 'join_date' }],
    [1, 2, 3],
    'Volunteers_List_Export' // <-- 文件名
  );
  
  tables.digitalSkillsTable = initializeDataTable(
    '#digitalSkillsTable',
    '/data/digital_skills.json',
    [{ data: 'id' }, { data: 'workshop_name' }, { data: 'skill_level' }, { data: 'instructor' }, { data: 'date' }, { data: 'spots_available' }],
    [1, 2, 3],
    'Digital_Skills_Hub_Export' // <-- 文件名
  );
});

onBeforeUnmount(() => {
  Object.values(tables).forEach(table => {
    if (table) table.destroy();
  });
});
</script>

<style>
tfoot input {
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
}
</style>