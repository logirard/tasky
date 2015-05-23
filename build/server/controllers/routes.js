// Generated by CoffeeScript 1.9.2
var index, tags, tasks;

index = require('./index');

tasks = require('./tasks');

tags = require('./tags');

module.exports = {
  '': {
    get: index.main
  },
  'tasks': {
    get: tasks.all,
    post: [tasks.reindexationMiddleware, tasks.create]
  },
  'taskID': {
    param: tasks.fetch
  },
  'tasks/:taskID': {
    put: [tasks.reindexationMiddleware, tasks.update],
    "delete": tasks["delete"]
  },
  'tasks/reindex': {
    post: tasks.reindex
  },
  'tags': {
    post: tags.create,
    "delete": tags["delete"]
  }
};
