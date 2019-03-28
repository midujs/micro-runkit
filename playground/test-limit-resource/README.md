# Limit memory usage by container

Limit container of `node:test` image to `5MB`

But inside we test what `os.totalmem()` see, still equal to HOST

```sh
docker run --memory 5000000 node:test
```
