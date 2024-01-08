
# Table Of Contents

- [Table Of Contents](#table-of-contents)
  - [Load Testing](#load-testing)
    - [8 Clusters 64 Threads](#8-clusters-64-threads)
    - [7 Clusters 56 Threads](#7-clusters-56-threads)

## Load Testing

### 8 Clusters 64 Threads

| Command | Time Taken (s) |
| :-----: | :------------: |
| `loadtest -c 10000 -n 10000 http://localhost:3000/heavy` | 21 |
| `loadtest -c 20000 -n 20000 http://localhost:3000/heavy` | 53 |
| `loadtest -c 30000 -n 30000 http://localhost:3000/heavy` | 103 |

### 7 Clusters 56 Threads

| Command | Time Taken (s) |
| :-----: | :------------: |
| `loadtest -c 10000 -n 10000 http://localhost:3000/heavy` | 23 |
| `loadtest -c 20000 -n 20000 http://localhost:3000/heavy` | 112 |
| `loadtest -c 30000 -n 30000 http://localhost:3000/heavy` | 188 |
