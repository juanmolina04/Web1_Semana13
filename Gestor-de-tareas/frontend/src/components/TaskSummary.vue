<template>
  <div class="summary">
    <h2>📊 Resumen</h2>
    <div class="cards">
      <div class="summary-card todo">
        <h3>Pendientes</h3>
        <p>{{ summary.todo || 0 }}</p>
      </div>
      <div class="summary-card doing">
        <h3>En progreso</h3>
        <p>{{ summary.doing || 0 }}</p>
      </div>
      <div class="summary-card done">
        <h3>Completadas</h3>
        <p>{{ summary.done || 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ summary: Object })
</script>

<style scoped>
.summary {
  margin: 20px 0;
}

.cards {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.summary-card {
  flex: 1;
  min-width: 150px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.summary-card h3 {
  margin: 0;
}

.summary-card p {
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
}

.todo {
  border-left: 5px solid #ffc107;
}

.doing {
  border-left: 5px solid #17a2b8;
}

.done {
  border-left: 5px solid #28a745;
}
</style>
