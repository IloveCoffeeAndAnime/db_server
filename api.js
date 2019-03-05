var dotenv = require("dotenv").config(),
  express = require("express"),
  pg = require("pg"),
  cors = require("cors"),
  app = express();
  
  const port = process.env.PORT || 5000;


//Allowed cors in localhost
app.use(cors());

//Database Config .env
const config = {
   user: 'vkamxiku',
  host: 'baasu.db.elephantsql.com',
  database: 'vkamxiku',
  password: 'Nihwj0iyScZ7nJkCK6e_0HTNxaHbL7n6',
  port: '5432'
};

//Documentation for node-postgres: https://node-postgres.com/
const pool = new pg.Pool(config);

app.get("/api.json", (req, res, next) => {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Can not connect to the DB because of " + err);
    }
    client.query("SELECT * FROM users", function(err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});
 
 
//Server
app.listen(port, function() {
  console.log("API listening on http://localhost:8080/api.json");
});