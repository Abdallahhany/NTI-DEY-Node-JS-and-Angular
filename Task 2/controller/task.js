const deal = require("./dealWithJson");
const heads = ["id", "title", "content", "dueDate", "status"];

// add new task to file
const add = (argv) => {
  const task = {};
  heads.forEach((head) => (task[head] = argv[head]));
  const allTasks = deal.readDataFromJson("task.json");
  allTasks.push(task);
  deal.writeDataToJson("author.json", allTasks);
};

// display all avilable tasks
const showAll = () => {
  const allTasks = deal.readDataFromJson("task.json");
  if (!allTasks.length) return console.log("no tasks yet");
  allTasks.forEach((task) => {
    console.log(
      `id=> ${task.id} - title=> ${task.title} - content => ${task.content} - dueDate => ${task.dueDate} - status => ${task.status}`
    );
  });
};

const single = (id) => {
  const allTasks = deal.readDataFromJson("task.json");
  const taskId = allTasks.findIndex((task) => task.id == id);
  if (taskId == -1) return console.log("no tasks with this id");
  console.log(
    `id=> ${allTasks[taskId].id} - title=> ${allTasks[taskId].title} - content => ${allTasks[taskId].content} - dueDate => ${allTasks[taskId].dueDate} - status => ${allTasks[taskId].status}`
  );
};
const editStatus = (id, status) => {
  const allTasks = deal.readDataFromJson("task.json");
  const taskId = allTasks.findIndex((task) => task.id == id);
  if (taskId == -1) return console.log("no tasks with this id");
  allTasks[taskId].status = status;
  deal.writeDataToJson("task.json", allTasks);
};
const dele = (id) => {
  const allTasks = deal.readDataFromJson("task.json");
  const afterDel = allTasks.filter((task) => task.id != id);
  if (allTasks.length == afterDel.length)
    return console.log("no tasks with this id");
  deal.writeDataToJson("task.json", afterDel);
  console.log("deleted");
};

module.exports = { add, showAll, single, edit: editStatus, dele };
