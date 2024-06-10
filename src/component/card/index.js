import "../card/Card.css";
import Button from "../button";
import React, { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const Card = (props) => {
  const [task, setTask] = useState(props.value.task);
  const [dayTime, setDayTime] = useState(props.value.dayTime);

  const [editing, setEdit] = useState(false);

  const handleEditTask = () => {
    let obj = props.value;
    obj.task = task;
    obj.dayTime = dayTime;

    props.editTask(obj);
    setEdit(false);
  }

  return (
    <>
      <section className="card">
        {!editing && (
          <>
            <div>
              <h3>{props.value.task}</h3>
              <p>{props.value.dayTime}</p>
            </div>
            <div>
              <Button
                className="btn-delete"
                onClick={() => props.deleteTask(props.value.id)}
              >
                <FaRegTrashAlt size={24} />
              </Button>

              <Button className="btn-edit" onClick={() => setEdit(true)}>
                <HiOutlinePencilSquare size={24} />
              </Button>
              {/* <button className="button"> seta </button> */}
            </div>
          </>
        )}

        {editing && (
          <>
            <div className="form-control">
              <input type="text" value={task}  onChange={(e) => setTask(e.target.value)}/>
              <input type="datetime-local" value={dayTime} onChange={(e) => setDayTime(e.target.value)}/>
            </div>
            <div className="box-button">
              <Button className="confirm-edit" onClick={() => handleEditTask()}>
                <FaCheck size={24} />
              </Button>
              <Button className="cancel-edit" onClick={() => setEdit(false)}>
                <MdOutlineCancel size={24} />
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Card;
