import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
import { validateLogin, validateRegisterUser } from "../validators/userValidator";

const route = Router();

route.post("/registerUser", async (req, res, next) => {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const validUser = validateRegisterUser(name, email, password, res);

    if (validUser.status == 500) {  //status code 
        return res.status(500).json(validUser);
    }
    else {
        const user = await registerUser(name, email, password);
        return res.status(user.status).json({
            status: user.status,
            message: user.message,
            user: user.user,
        });
    }
});
route.post("/login", async (req, res, next) => {
    const { email, password }: { email: string, password: string } = req.body
    const validLogin = validateLogin(email, password, res);
    if (validLogin.status == 500) {
        return res.status(500).json(validLogin);
    } else {
        const user = await loginUser(email, password);
        console.log("User ", user);

        return res.status(user.status).json({
            status: user.status,
            message: user.message,
            user: user.user
        })
    }
})
export default route