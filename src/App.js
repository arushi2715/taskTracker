import logo from './logo.svg';
import './App.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [isDone, setIsDone] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const onDragEnd = (result) => {
    const newItems = Array.from(allTasks);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setAllTasks(newItems);
  };

  const handleAddTask = () => {
    let newTaskItem = {
      task: newTask,
    };

    let newTaskArr = [...allTasks];
    newTaskArr.push(newTaskItem);
    setAllTasks(newTaskArr);
    localStorage.setItem("taskList", JSON.stringify(newTaskArr));
  };

  useEffect(() => {
    let savedTask = JSON.parse(localStorage.getItem("taskList"));

    let savedCompletedTask = JSON.parse(localStorage.getItem("completedTasks"));
    if (savedTask) {
      setAllTasks(savedTask);
    }

    if (savedCompletedTask) {
      setCompletedTasks(savedCompletedTask);
    }
  }, []);

  const handleDelete = (index) => {
    let reducedTask = [...allTasks];
    console.log(index);
    reducedTask.splice(index, 1);

    // reducedTask.map((item, index) => {
    //   console.log(item, index);
    // });

    localStorage.setItem("taskList", JSON.stringify(reducedTask));
    setAllTasks(reducedTask);
  };

  const handleCompletedTaskDelete = (index) => {
    let reducedCompletedTodos = [...completedTasks];
    reducedCompletedTodos.splice(index);
    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTasks(reducedCompletedTodos);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let completedOn =
      date +
      "-" +
      month +
      "-" +
      year +
      " " +
      "at" +
      hour +
      ":" +
      minutes +
      ":" +
      seconds;

    let filteredItem = {
      ...allTasks[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTasks, filteredItem];
    // updatedCompletedArr.push(filteredItem);
    setCompletedTasks(updatedCompletedArr);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedArr));
    handleDelete(index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Task Tracker</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Task</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="type your task here"
              />
            </div>
            <div className="add-btn">
              <button
                type="button"
                onClick={handleAddTask}
                className="primary-btn"
              >
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`secondaryBtn ${isDone === false && `active`}`}
              onClick={() => setIsDone(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${isDone === true && `active`}`}
              onClick={() => setIsDone(true)}
            >
              Completed
            </button>
          </div>
          <div className="todo-list">
            {isDone === false &&
              allTasks.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.task}</h3>
                    </div>

                    <div>
                      <AiOutlineDelete
                        title="Delete"
                        className="icon"
                        onClick={() => handleDelete(index)}
                      />
                      <BsCheckLg
                        title="Completed"
                        className=" check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                );
              })}
            {isDone === true &&
              completedTasks.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.task}</h3>
                      <p>
                        <small>Completed on :{item.completedOn}</small>
                      </p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        title="Delete"
                        className="icon"
                        onClick={() => handleCompletedTaskDelete(index)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;



