# Kue

## Table of Contents

- [Kue](#kue)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Create and save a `Job` in redis](#create-and-save-a-job-in-redis)

## Usage

### Create and save a `Job` in redis

```js
const job = kue.create(type, options); // Creates a new Job
job.save(); // Saves it in redis
```
