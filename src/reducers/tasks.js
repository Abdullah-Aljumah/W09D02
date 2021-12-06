const insitialState = {
  tasks: [],
};

const task = (state = insitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET":
      const { tasks } = payload;
      return { tasks };

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

