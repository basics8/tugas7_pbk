import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ text: todo, completed: false });
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodoCompletion(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
  },
  getters: {
    incompleteTodos() {
      return this.todos.filter(todo => !todo.completed).length;
    },
  },
});
