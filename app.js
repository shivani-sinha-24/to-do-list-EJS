const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname+'/date.js')

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const day = date.getDate()

  res.render("list", {
    listTitle: day,
    newItems: items,
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (req.body.newItem !== "") {
    if (req.body.list == "Work") {
      workItems.push(item);
      res.redirect("/work");

    } else {
      items.push(item);
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newItems: workItems,
  });
});

app.post("/work", (req, res) => {
  const item = req.body.newItem;

  if (req.body.newItem !== "") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    res.redirect("/work");
  }
});

app.get('/about',(req,res)=>{
  res.render("about")
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});
