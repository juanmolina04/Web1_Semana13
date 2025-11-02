<template>
  <div class="app">
    <header>
      <h1>📝 Gestor de Tareas</h1>
    </header>

    <main>
      <TaskForm @created="fetchTasks" />
      <TaskSummary :summary="summary" />

      <section class="task-list-section">
        <TaskList
          :tasks="tasks"
          @deleted="fetchTasks"
          @updated="fetchTasks"
          @statusChanged="fetchTasks"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import TaskSummary from './components/TaskSummary.vue'

const tasks = ref([])
const summary = ref({})

const fetchTasks = async () => {
  const res = await fetch('http://localhost:3000/tasks')
  tasks.value = await res.json()

  const summaryRes = await fetch('http://localhost:3000/tasks/summary')
  summary.value = await summaryRes.json()
}

onMounted(fetchTasks)
</script>

<style>
body {
  margin: 0;
  background-color: #f5f6fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app {
  max-width: 900px;
  margin: 30px auto;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

header {
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
}

main {
  padding: 20px;
}

.task-list-section {
  margin-top: 30px;
}
</style>
