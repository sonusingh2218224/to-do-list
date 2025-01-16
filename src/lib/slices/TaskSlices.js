import { createSlice } from "@reduxjs/toolkit";

const updateTaskFn = (state, action, field) => {
  const taskFind = state.find((item) => item.id === action.payload.id);
  if (taskFind) {
    taskFind.field = action.payload.field;
  } else {
    console.error(`Did not find task with ID: ${action.payload.id}`);
  }
};

const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    createTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        task: action.payload.task,
        isCompleted: false,
        isStarred: action.payload.isStarred,
        dueDate: action.payload.dueDate,
      };
      state.push(newTask);
    },
    updateTask: (state, action) => {
      const taskFind = state.find((item) => item.id === action.payload.id);
      if (taskFind) {
        taskFind.task = action.payload.task;
      } else {
        console.error(`Task did not found with id ${action.payload.id} to update task.`);
      }
    },
    updateTaskDueDate: (state, action) => {
      const taskFind = state.find((item) => item.id === action.payload.id);
      if (taskFind) {
        taskFind.dueDate = action.payload.dueDate;
      } else {
        console.error(`Task did not found with id ${action.payload.id} to update task due date.`);
      }
    },
    taskCompleted: (state, action) => {
      console.log("State before update:", state);
      const taskFind = state.find((item) => item.id === action.payload.id);
      if (taskFind) {
        taskFind.isCompleted = action.payload.isCompleted;
      } else {
        console.error(`Task did not found with id ${action.payload.id} to update task completion.`);
      }
    },
    taskStarred: (state, action) => {
        const taskFind = state.find((item) => item.id === action.payload.id);
      if (taskFind) {
        taskFind.isStarred = action.payload.isStarred;
      } else {
        console.error(`Task did not found with id ${action.payload.id} to update important task.`);
      }
    },
  },
});

export const { createTask, updateTask, updateTaskDueDate, taskCompleted, taskStarred } = taskSlice.actions;
export default taskSlice.reducer;
