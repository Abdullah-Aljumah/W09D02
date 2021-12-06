const insitialState = {
  tasks: [],
};

const task = (state = insitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { tasks } = payload;
      return { tasks };

      case "DELETE":
        const { del } = payload;
        return state

    default:
      return state;
  }
};

export default task;

export const get_tasks = (data) => {
  console.log("data",data.data);
  return {
    type: "GET",
    payload: data.data,
  };
};

export const delete_tasks = (data) => {
  // console.log("data",data.data);
  return {
    type: "DELETE",
    payload: "",
  };
};


