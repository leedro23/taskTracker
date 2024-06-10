import React, { useState, useEffect, useRef } from "react";
import "./Body.css";
import Button from "../button";
import Header from "../header";
// import axios from "axios";
import Card from "../card";
import Footer from "../footer";

const Body = () => {
  const [task, setTask] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [tasks, setTasks] = useState([]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  }, [tasks]);

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = (task) => {
    let data = {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3001/tasks", data)
      .then((res) => res.json())
      .then((data) => {
        getTasks();
      })
      .catch((error) => console.log(error));
  };

  const getTasks = () => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.log(error));
  };

  const editTask = (task) => {
    let data = {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    };

    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3001/tasks/${task.id}`, data)
        .then((res) => res.json())
        .then((data) => {
          getTasks();
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteTask = (task) => {
    let data = {
      method: "DELETE",
    };

    let confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      fetch(`http://localhost:3001/tasks/${task}`, data)
        .then((res) => res.json())
        .then((data) => {
          getTasks();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;

    if (!task || !dayTime) {
      alert("Please add a task name and date/time");
      return;
    }

    addTask({ task, dayTime, reminder });

    setTask("");
    setDayTime("");
    setReminder(false);
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Header />
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            placeholder="Add task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="dayTime">Day & Time</label>
          <input
            type="datetime-local"
            id="dayTime"
            value={dayTime}
            onChange={(e) => setDayTime(e.target.value)}
          />
        </div>
        <div className="form-control form-control-check">
          <label htmlFor="reminder">Set Reminder</label>
          <input
            type="checkbox"
            id="reminder"
            checked={reminder}
            className="formcontrol--check"
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        <Button
          type="submit"
          disabled={task == null && dayTime == null && reminder == null}
          className="btn-save"
        >
          Save Task{" "}
        </Button>
      </form>
      <div className="form-control-cards">
        {tasks.length !== 0 &&
          tasks.map((item, index, array) => {
            return (
              <Card
                value={item}
                key={item.id}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Body;
