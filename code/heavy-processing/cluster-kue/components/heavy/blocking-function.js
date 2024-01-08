// const blockingFunction = (job) => {
//   for (let i = 0; i < 9999999999; i++) {
//     if (i === 1) job.progress(1, 100);
//     if (i === 1111111111) job.progress(10, 100);
//     if (i === 2222222222) job.progress(20, 100);
//     if (i === 3333333333) job.progress(30, 100);
//     if (i === 4444444444) job.progress(40, 100);
//     if (i === 5555555555) job.progress(50, 100);
//     if (i === 6666666666) job.progress(70, 100);
//     if (i === 7777777777) job.progress(70, 100);
//     if (i === 8888888888) job.progress(80, 100);
//     if (i === 9999999999) job.progress(90, 100);
//   }
// };

const blockingFunction = (job) => {
  for (let i = 0; i < 6666666666; i++) {
    if (i === 1) job.progress(1, 100);

    if (i === 1111111111) {
      console.log(`1111111111 I ran once by pid ${process.pid}`);
      job.progress(15, 100);
    }

    if (i === 2222222222) {
      console.log(`2222222222 I ran once by pid ${process.pid}`);
      job.progress(30, 100);
    }

    if (i === 3333333333) {
      console.log(`3333333333 I ran once by pid ${process.pid}`);
      job.progress(45, 100);
    }

    if (i === 4444444444) {
      console.log(`4444444444 I ran once by pid ${process.pid}`);
      job.progress(70, 100);
    }

    if (i === 5555555555) {
      console.log(`5555555555 I ran once by pid ${process.pid}`);
      job.progress(90, 100);
    }
  }
};

module.exports = blockingFunction;
