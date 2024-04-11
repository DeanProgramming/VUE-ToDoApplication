
<template>
  <div>
    <p>Tasks Need Doing - Remaining Total : {{ remainingCount }}</p>
 
    <ul v-for="(group, deadline) in groupedTodos" :key="deadline">
      <h4 v-if="getRemainingCount(deadline) === 0">
        DeadLine - {{ deadline }} - Completed every entry
      </h4>
      <h4 v-else>
        DeadLine - {{ deadline }} ({{ getRemainingCount(deadline) }} items remaining)
      </h4>

      <li v-for="todo in group" :key="todo.id">     
  <span :class="{ 'strikeThrough': todo.isDone }"> 
    <input type="checkbox" v-model="todo.isDone" @click="toggleCompleted(todo)" />
    <span @click="toggleCompleted(todo)">
      {{ todo.Title }} Priority = <span class="spacing">{{ todo.Priority }}</span>
    </span>
    <button @click="setDescriptionInfo(todo)">View Description</button>
    <button @click="deleteEntry(todo)">Delete Entry</button>
    <button @click="setEditEntry(todo)">Edit Entry</button>
  </span>
</li>
    </ul>   

    <div v-if="currentState == pageState.States.ShowDescription">
      <h1>Description</h1>
      <p>
        {{ taskTitle }} {{ taskDescription }}
      </p> 
    </div>

    <template v-if="currentState !== pageState.States.NewEntry">
        <button @click="setupNewEntry()">Create New Entry</button>
      </template>
    <div>
      <template v-if="currentState === pageState.States.NewEntry || currentState === pageState.States.Edit">
        <h1 v-if="currentState === pageState.States.Edit">Edit Entry</h1>
        <h1 v-else>Add New Entry</h1>
        <p>
          <span class="spacing">
            Title 
          </span>
          <input  v-model="newTitle" placeholder="Title" /> 
        </p>
        <p>
          <span class="spacing">
          Description
          </span>
          <textarea class="description-textarea" v-model="newDescription" placeholder="Description of Task"></textarea>
        </p>
        <p>
          <span class="spacing">
          Completed Already ?
          </span>
          <input type="checkbox" v-model="isNewCompleted" />
        </p>
        <p>
          <span class="spacing">
          Date
          </span>
          <input type="date" v-model="newDate" :placeholder="currentDatePlaceholder" />
        </p>
        <p>
          <span class="spacing">
          Priority
          </span>
          <input type="number" v-model="newPriority" :placeholder="1"/>
        </p>
        <button @click="currentState === pageState.States.Edit ? confirmEdit() : addNewEntry()">
          {{ currentState === pageState.States.Edit ? 'Confirm Edit' : 'Add Task' }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import pageState from './PageState.js';
import { ToDoItem, ToDoListManager } from './Tasks.js';


export default {
  data() {
    return {
      pageState: pageState,
      currentState: pageState.States.Nothing, 
      toDoList: new ToDoListManager().ToDoList,
      newTitle: "",
      newDescription: "",
      isNewCompleted: false, 
      newDate: new Date().toISOString().slice(0, 10), 
      newPriority: 1,
      taskTitle: "",
      taskDescription : "",
      selectedTask: ToDoItem,
    }
  },
  computed: {
    currentDatePlaceholder() { 
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding the month
      let day = currentDate.getDate().toString().padStart(2, '0'); // Zero-padding the day  
      return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    },
    
    groupedTodos() {
      this.toDoList.items.sort((a, b) => {
      // First, sort by Deadline in ascending order
      if (a.DeadLine < b.DeadLine) return -1;
      if (a.DeadLine > b.DeadLine) return 1;

      // If Deadlines are equal, sort by Priority in descending order
      return b.Priority - a.Priority;
      });

      let grouped = {};
      this.toDoList.items.forEach(todo => { 
        const deadline = todo.DeadLine.toISOString().slice(0, 10);
        if (!grouped[deadline]) {
          grouped[deadline] = [];
        }
        grouped[deadline].push(todo);
      }); 

      return grouped;
    },    
    remainingCount() {
      return this.toDoList.items.filter(todo => !todo.isDone).length;
    },
  },
  methods: {
    toggleCompleted(item){  
      item.isDone = !item.isDone; 
    },
    
    setState(state){ 
      this.currentState = state;
    },

    setupNewEntry(){
      this.newTitle = "";
      this.newDescription = "";
      this.isNewCompleted = false;
      this.newDate = this.currentDatePlaceholder;
      this.newPriority = 1;
      this.setState(pageState.States.NewEntry);
    },
    
    addNewEntry(title, description, isDone, deadline, priority){  
      let newEntry = new ToDoItem(title, description, isDone, deadline, priority);
      this.toDoList.items[ToDoList.items.length] = newEntry;
      
      this.newTitle = "";
      this.newDescription = "";
      this.isNewCompleted = false;
      this.newDate = this.currentDatePlaceholder;
      this.newPriority = 1;
      this.setState(pageState.States.Nothing);
    },
    
    getRemainingCount(deadline) {
      let total = 0;
      if (this.groupedTodos[deadline]) {
        total = this.groupedTodos[deadline].filter(todo => !todo.isDone).length;
      }
      return total;
    },

    setDescriptionInfo(item){
      this.taskDescription = item.Description;
      this.taskTitle = item.Title;
      this.setState(pageState.States.ShowDescription);
    },

    deleteEntry(item){
      const index = this.toDoList.items.findIndex(t => t === item);
      if (index !== -1) {
        this.toDoList.items.splice(index, 1);
      }
      
      this.setState(pageState.States.Nothing);
    },

    setEditEntry(item){
      this.ToDoItem = item;
      this.newTitle = this.ToDoItem.Title;
      this.newDescription = this.ToDoItem.Description;
      this.isNewCompleted = this.ToDoItem.isDone;
      this.newDate = this.ToDoItem.DeadLine.toISOString().slice(0, 10);  
      this.newPriority = this.ToDoItem.Priority; 
      this.setState(pageState.States.Edit);
    },

    confirmEdit(){
      this.ToDoItem.Title = this.newTitle;
      this.ToDoItem.Description = this.newDescription ;
      this.ToDoItem.isDone = this.isNewCompleted;
      this.ToDoItem.DeadLine = new Date(this.newDate);
      this.ToDoItem.Priority = this.newPriority; 
      this.setState(pageState.States.Nothing);
    }
  }
}
</script>  