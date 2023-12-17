db = db.getSiblingDB("admin");
db.auth("root", "password");
db = db.getSiblingDB("todo");
db.createCollection("todo");
