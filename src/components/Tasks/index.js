import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_tasks } from "../../reducers/tasks";
const Tasks = () => {
  const state = useSelector((state) => {
    return {
      signIn: state.signIn,
      task: state.task,
    };
  });

  const dispatch = useDispatch();

  const [id, setId] = useState(state.signIn.user._id);
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(state.signIn.token);
  const [edit, setEdit] = useState("");

  const [btn1, setBtn1] = useState(true);
  const [showHide, setShowHide] = useState(false);
  // eslint-disable-next-line
  const [adminTasks, setAdminTasks] = useState([]);
  // eslint-disable-next-line
  const [adminState, setAdminState] = useState(false);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const getTasks = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/todoss/${state.signIn.user._id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    console.log("res.data", res.data);
    const data = {
      tasks: res.data.map((item) => {
        return item;
      }),
    };
    dispatch(get_tasks({ data }));
  };

  const deleteTask = async (_id) => {
    // eslint-disable-next-line
    let deleteTask = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTask/${_id}`,
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    getTasks();
    getTasksAdmin();
  };

  const getTasksAdmin = async () => {
    // eslint-disable-next-line
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${state.signIn.token}` },
    });
    console.log("adminTask", res);
    setTasks(res.data);
  };

  useEffect(() => {
    getTasksAdmin();
    // eslint-disable-next-line
  }, [id]);

  const newTask = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // eslint-disable-next-line
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/newTask/${id}`,
      { task: e.target[0].value },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    e.target[0].value = "";
    getTasks();
  };

  const updateTask = async (e, idTask) => {
    e.preventDefault();
    // eslint-disable-next-line
    let newTask = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/upadteVal/${idTask}`,
      { task: edit },
      {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      }
    );
    setShowHide(!showHide);
    setBtn1(true);
    setEdit();
    getTasks();
  };

  const hide = () => {
    setShowHide(!showHide);
    setBtn1(false);
  };
  const logout = () => {
    localStorage.clear();
  };
  console.log("state.task.taskss", state.task.tasks);
  return (
    <div className="container">
      <form onSubmit={(e) => newTask(e)}>
        <input
          type="text"
          name="task"
          placeholder="New task"
          className="inpt"
        />
        <input
          type="submit"
          id="newTask"
          value="NEW TASK"
          className="btn btn-success inpt2"
        />
      </form>
      {state.task.tasks.length > 0 ? (
        <div className="cont">
          {state.task.tasks.map((item) => {
            return (
              <div key={item._id} className="task">
                {" "}
                <h1>{item.task}</h1>
                <button
                  className="btn btn-danger inpt2"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <form onSubmit={(e) => updateTask(e, item._id)}>
                  <div>
                    {btn1 ? (
                      <input
                        type="button"
                        value="Edit Task"
                        className="btn btn-info inpt2"
                        onClick={hide}
                      ></input>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <div>
                    {showHide ? (
                      <div>
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-success inpt2"
                          id="idSub"
                          onClick={(e) => updateTask(e, item._id)}
                        />
                        <input
                          type="text"
                          onChange={(e) => setEdit(e.target.value)}
                          placeholder=" New Task"
                          className="inpt"
                        />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </form>
              </div>
            );
          })}{" "}
        </div>
      ) : (
        <> No tasks</>
      )}
      <form>
        <button className="btn btn-dark" onClick={() => logout()}>
          Log out{" "}
        </button>
      </form>
    </div>
  );
};

export default Tasks;
