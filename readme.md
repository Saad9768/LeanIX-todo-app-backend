### Run the application

To instal the dependencies
```
npm install
```

To Run unit test case
```
npm test
```
To get all the coverage of the unit test in the code
```
npm test:coverage
```
To build the code in javascript
```
npm dev:build
```
RUN
```
docker compose up
```
This is required for the local db setup. There is no requirement of mongo db to be installed on the machine. 

```
mongo-init.js
```
The above file will setup a new db and create a new collection in the db.

After building the code one can run the javascript code

```
.env 
```
The .env file contains the credential which will be used to setup the credentials.

```
npm dev:serve
```
To Run the typescript code.
```
npm run dev
```


### Clean Architecture: TypeScript Express API
By employing clean architecture, you can design applications with very low coupling and independent of technical implementation details. That way, the application becomes easy to maintain and flexible to change. Clean architecture allows us to create architectural boundaries between dependencies which allows components to be swapped in and out and be intrinsically testable.


### The Plan
At a high level, we'd like our API to be structured in the following way

https://www.mermaidchart.com/raw/4b3ecb06-ec62-49c0-9e12-022cdfedf722?theme=light&version=v0.1&format=svg


### Folder Structure
Let's use files and folders to structure our application. Doing this allows us to communicate architecture intent:

```
/src
│── main.ts
│── server.ts
│── presentation
│   └── routers
│       └── todo-router.ts
│       └── index.ts
├── domain
│   ├── interfaces
│   │   ├── repositories
│   │   │    └── todo-repository.ts
│   │   └── use-cases
│   │       └── todo
│   │           ├── create-todo-use-case.ts
│   │           ├── delete-todo-use-case.ts
│   │           ├── get-all-todos-use-case.ts
│   │           ├── get-one-todos-use-case.ts
│   │           └── update-todo-use-case.ts
│   │           └── get-all-with-subtasks-todo-use-case.ts
│   ├── models
│   │   └── todo.ts
│   ├── repositories
│   │   └── todo-repository.ts
│   └── use-cases
│       └── todo
│           ├── create-todo.ts
│           ├── delete-todo.ts
│           ├── get-all-todos.ts
│           ├── get-one-todos.ts
│           └── update-todo.ts
│           └── get-all-with-subtasks-todo-use-case.ts
└── data
    ├── interfaces
    │   └── data-sources
    │       ├── nosql-database-wrapper.ts
    │       └── todo-data-source.ts
    └── data-sources
        ├── mongodb
            └── mongodb-todo-data-source.ts
            └── index.ts
```

The presentation layer would mainly be used for inputting and outputting user data (API routes).

The inner core domain layer holds all business logic (use cases, repositories).

The data layer holds all infrastructure implementations (data sources).

Below is the example of the db design

```
{
    "_id": "657f2d11e65eea401adb922b",
    "title": "parent",
    "description": "parent description",
    "completed": false,
    "parentId": null,
    "userId": "1234"
}
```
    The above object is a parent object that is the reason parentId is null
  ``` 
  {
        "_id": "657f2d24e65eea401adb922c",
        "title": "Child",
        "description": "Child description",
        "completed": false,
        "parentId": "657f2d11e65eea401adb922b",
        "userId": "1234"
    }

```
    The above object is a child object which has the respective parent Id

    Benefits of parentId in child object
    ```
    Very beneficial to handle each and every object.
    Updating,Deleting make it comfortable.
```

Future scope
Add authentication and authorization
Load in the docker file
linting should be added
monitoring tool such as grafana
logging tool such as kibana 

Futue scope Feature task
Completing the parent should complete the children as well.

