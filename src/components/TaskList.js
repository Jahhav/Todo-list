import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-regular-svg-icons";
import { faPen, faExclamation } from "@fortawesome/free-solid-svg-icons";
import "./TaskList.css";

const TaskList = ({
  tasks,
  onDelete,
  onFinished,
  onIncomplete,
  onEdit,
  onEditProps: { editIndex, setEditIndex, editText, setEditText },
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (editIndex !== null) {
          onEdit(editIndex, editText);
          setEditIndex(null);
          setEditText("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editIndex, editText, onEdit, setEditIndex, setEditText]);

  const handleEditClick = (index) => {
    if (editIndex === index) {
      onEdit(editIndex, editText);
      setEditIndex(null);
      setEditText("");
    } else {
      setEditIndex(index);
      setEditText(tasks[index].text);
    }
  };

  const handleBlur = () => {
    if (editIndex !== null) {
      onEdit(editIndex, editText);
      setEditIndex(null);
      setEditText("");
    }
  };

  return (
    <div className="tasks-list">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            className="task-item-line"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.1 }}
            layout
          >
            <div className="task-icons-left">
              <FontAwesomeIcon
                className={`incomplete-icon ${task.incomplete ? "active" : ""}`}
                icon={faExclamation}
                onClick={() => onIncomplete(index)}
              />
              <div
                className="completed-icons"
                onClick={() => onFinished(index)}
              >
                {task.completed ? (
                  <FontAwesomeIcon icon={faCircleDot} />
                ) : (
                  <FontAwesomeIcon icon={faCircle} />
                )}
              </div>
            </div>
            <div
              className={`task-item ${task.completed ? "completed" : ""} ${
                task.incomplete ? "incomplete" : ""
              }`}
            >
              <div className="task-text">
                {editIndex === index ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onEdit(editIndex, editText);
                        setEditIndex(null);
                        setEditText("");
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <h3>{task.text}</h3>
                )}
              </div>
            </div>
            <div className="task-icons-right">
              <FontAwesomeIcon
                className="edit-icon"
                icon={faPen}
                onClick={() => handleEditClick(index)}
              />
              <FontAwesomeIcon
                className="delete-icon"
                icon={faCircleXmark}
                onClick={() => onDelete(index)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
