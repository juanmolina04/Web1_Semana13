<template>
  <form class="task-form" @submit.prevent="createTask">
    <input
      v-model="title"
      placeholder="Título de la tarea"
      class="input"
      required
    />
    <input
      v-model="description"
      placeholder="Descripción"
      class="input"
    />
    <button type="submit" class="btn">➕ Agregar tarea</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const emit = defineEmits(['created'])

const createTask = async () => {
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value, description: description.value }),
  })
  title.value = ''
  description.value = ''
  emit('created')
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
