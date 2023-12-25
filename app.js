const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const loginRouter = require("./routes/loginRouter");
const teamRouter = require("./routes/teamRouter");

const app = express();
app.use(cors());

app.set("port", process.env.PORT || 5000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/team", teamRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});