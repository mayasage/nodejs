# Performance

- [Performance](#performance)
  - [No Batch No Cache](#no-batch-no-cache)
  - [Yes Batch No Cache](#yes-batch-no-cache)
  - [No Batch Yes Cache](#no-batch-yes-cache)

## No Batch No Cache

Client

```sh
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
All completed in: 12128ms
```

Server

```sh
Processing query: ?product=book
totalSales() took: 570ms
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
totalSales() took: 2661ms
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
Processing query: ?product=book
totalSales() took: 4864ms
totalSales() took: 6527ms
totalSales() took: 7614ms
totalSales() took: 8181ms
totalSales() took: 8609ms
totalSales() took: 8904ms
totalSales() took: 9062ms
totalSales() took: 9167ms
totalSales() took: 9230ms
totalSales() took: 9235ms
totalSales() took: 9196ms
totalSales() took: 9137ms
totalSales() took: 9043ms
totalSales() took: 8948ms
totalSales() took: 8823ms
totalSales() took: 8696ms
totalSales() took: 8503ms
totalSales() took: 8328ms
totalSales() took: 8164ms
```

## Yes Batch No Cache

Client

```sh
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
200 { product: 'book', sum: 1025773 }
All completed in: 4355ms
```

Server

```sh
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 609ms
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 587ms
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 565ms
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 526ms
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 524ms
Processing query: ?product=book
Processing query: ?product=book
Batching
Processing query: ?product=book
Batching
totalSales() took: 527ms
Processing query: ?product=book
totalSales() took: 516ms
```

## No Batch Yes Cache

Client

```sh
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
200 { product: 'book', sum: 1017532 }
All completed in: 3850ms
```

Server

```sh
Processing query: ?product=book
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
totalSales() took: 564ms
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
Processing query: ?product=book
Cache hit
```
