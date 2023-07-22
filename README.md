# Next.js OpenJira App

To run locally, a db is needed.
Assuming docker is installed, run:

```
    docker-compose up -d
```

## Env var config:

```
    Rename **.env.template** to **.env**
```

db connection url:

```
    mongodb://localhost:27017/entriesdb
```

# Node packages install:

```
    yarn install
```

# Local testing:

```
    yarn dev
```

## insert test data in bbdd:

```
    http://localhost:3000/api/seed
```
