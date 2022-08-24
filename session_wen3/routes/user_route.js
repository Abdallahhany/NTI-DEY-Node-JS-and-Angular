const express = require("express");
const userRouter = express.Router();
const auth = require("../middelware/user_middelware");
const {
  edit,
  login,
  logout,
  profile,
  register,
  index,
  addTransaction,
  withdraw,
} = require("../controllers/user_controller");

userRouter.post("/register", register); //done
userRouter.post("/login", login); //done
userRouter.get("/", index); //done
userRouter.put("/single/:id", auth, edit);//done

userRouter.get("/profile", auth, profile);//done
userRouter.post("/logout", auth, logout);//done
userRouter.post("/addtransacton", auth, addTransaction);//done
userRouter.post("/withdraw", auth, withdraw);//done

module.exports = userRouter;
