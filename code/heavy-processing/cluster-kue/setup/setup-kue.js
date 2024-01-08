const kue = require("kue");

let config = {
  jobEvents: false,
};
if (process.env.NODE_ENV === "production") {
  config.redis = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASS,
  };
} else {
  // Default Redis Config Everywhere
  config.redis = {
    port: 6379,
    host: "localhost",
    auth: null,
  };
}

class Kue {
  constructor(config, options = {}) {
    this._kue = kue.createQueue(config);
    if (options.setGlobalKueEvents === "true") this._setupGlobalKueEvents();
  }

  getKue() {
    return this._kue;
  }

  removeJob(id) {
    return new Promise((resolve, reject) => {
      this._kue.Job.get(id, (err, job) => {
        if (err) return reject(err);
        job.remove((err) => {
          if (err) return reject(err);
          resolve(job.id);
        });
      });
    });
  }

  _setupGlobalKueEvents() {
    this._kue.on("ready", () => console.log(`Kue is ready !`));

    this._kue.on("error", (err) => {
      console.error(
        `Child ${process.pid} says: There was an error in the main queue!`
      );
      console.error(err);
      console.error(err.stack);
    });

    this._kue.on("job enqueue", (id, type) => {
      console.log(
        `Child ${process.pid} says: job enqueue: id: ${id}, type: ${type}`
      );
    });

    this._kue.on("job start", (id, type) => {
      console.log(
        `Child ${process.pid} says: job start: id: ${id}, type: ${type}`
      );
    });

    this._kue.on("job promotion", (id, type) => {
      console.log(
        `Child ${process.pid} says: job promotion: id: ${id}, type: ${type}`
      );
    });

    this._kue.on("job progress", (id, progress, data) => {
      console.log(
        `Child ${process.pid} says: job progress: id: ${id}, progress: ${progress}, data: ${data}`
      );
    });

    this._kue.on(
      "job failed attempt",
      (id, type, errorMessage, doneAttempts) => {
        console.log(
          `Child ${process.pid} says: job failed attempt: id: ${id}, type: ${type}, errorMessage: ${errorMessage}, doneAttempts: ${doneAttempts}`
        );
      }
    );

    this._kue.on("job failed", (id, type, errorMessage) => {
      console.log(
        `Child ${process.pid} says: job failed: id: ${id}, type: ${type}, errorMessage: ${errorMessage}`
      );
    });

    this._kue.on("job complete", (id) => {
      console.log(`Child ${process.pid} says: job complete: id: ${id}`);
    });

    this._kue.on("job remove", (id, type) => {
      console.log(
        `Child ${process.pid} says: job remove: id: ${id}, type: ${type}`
      );
    });
  }
}

let instance;

const setupKue = (options = {}) => {
  const { app, setGlobalKueEvents } = options;

  if (!instance) {
    instance = new Kue(config, { setGlobalKueEvents });
    if (app) app.use("/queue", kue.app);
  }

  return instance;
};

module.exports = setupKue;
