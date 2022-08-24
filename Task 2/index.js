const yargs = require("yargs");
const task = require("./controller/task");

yargs.command({
  command: "add",
  builder: {
    id: { default: Date.now() },
    title: { type: "string", demandOption: true },
    content: { type: "string", demandOption: false },
    dueDate: { type: "date", default: Date.now() + 7 },
    status: { type: "boolean", default: false },
  },
  handler: (argv) => {
    task.add(argv);
  },
});

yargs.command({
  command: "showAll",
  handler: () => {
    task.showAll();
  },
});

yargs.command({
  command: "single",
  builder: {
    id: { type: "number", demandOption: true },
  },
  handler: (argv) => {
    task.single(argv.id);
  },
});
yargs.command({
  command: "delete",
  builder: {
    id: { type: "number", demandOption: true },
  },
  handler: (argv) => {
    task.dele(argv.id);
  },
});
yargs.command({
  command: "changeStatus",
  builder: {
    id: { type: "number", demandOption: true },
    status: { type: "boolean" },
  },
  handler: (argv) => {
    task.editStatus(argv.id, argv.status);
  },
});
yargs.argv;
