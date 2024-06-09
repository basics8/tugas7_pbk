<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <input v-model="newTodo" placeholder="Add a new task" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <span :class="{ completed: todo.completed }" @click="toggleTodoCompletion(index)">
          {{ todo.text }}
        </span>
        <button @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
    <p>{{ incompleteTodos }} tasks remaining</p>
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todo';
import { computed, ref } from 'vue';

export default {
  setup() {
    const store = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const deleteTodo = (index) => {
      store.deleteTodo(index);
    };

    const toggleTodoCompletion = (index) => {
      store.toggleTodoCompletion(index);
    };

    return {
      newTodo,
      todos: computed(() => store.todos),
      addTodo,
      deleteTodo,
      toggleTodoCompletion,
      incompleteTodos: computed(() => store.incompleteTodos),
    };
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  width: calc(100% - 60px);
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

li .completed {
  text-decoration: line-through;
}

span {
  cursor: pointer;
}
</style>
