<template>
  <div>
    <h2>📋 Tareas</h2>

    <div class="filter">
      <label>Filtrar por estado:</label>
      <select v-model="filter" @change="fetchFiltered">
        <option value="">Todas</option>
        <option value="todo">Pendientes</option>
        <option value="doing">En progreso</option>
        <option value="done">Completadas</option>
      </select>
    </div>

    <div class="task-grid">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <div class="task-header">
          <h3>{{ task.title }}</h3>
          <span :class="['status', task.status]">{{ task.status }}</span>
        </div>
        <p>{{ task.description }}</p>
        <div class="actions">
          <button @click="changeStatus(task)" class="btn small">🔁 Estado</button>
          <button @click="remove(task.id)" class="btn small delete">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ tasks: Array })
const emit = defineEmits(['deleted', 'statusChanged'])

const filter = ref('')

const fetchFiltered = async () => {
  const url = filter.value
    ? `http://localhost:3000/tasks?status=${filter.value}`
    : 'http://localhost:3000/tasks'
  const res = await fetch(url)
  const data = await res.json()
  props.tasks.splice(0, props.tasks.length, ...data)
}

const changeStatus = async (task) => {
  const next =
    task.status === 'todo'
      ? 'doing'
      : task.status === 'doing'
      ? 'done'
      : 'todo'
  await fetch(`http://localhost:3000/tasks/${task.id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: next }),
  })
  emit('statusChanged')
}

const remove = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
  emit('deleted')
}
</script>

<style scoped>
.filter {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.task-card {
  background: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-3px);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 4px 8px;
  border-radius: 5px;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 12px;
}

.status.todo {
  background: #ffeeba;
  color: #856404;
}

.status.doing {
  background: #b8daff;
  color: #004085;
}

.status.done {
  background: #c3e6cb;
  color: #155724;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn.small {
  padding: 6px 10px;
  font-size: 13px;
}

.btn.delete {
  background: #dc3545;
}

.btn.delete:hover {
  background: #b52a36;
}
</style>
