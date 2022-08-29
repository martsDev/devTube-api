import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createUserServices, signinUserServices } from "../services/authServices";

export const signup = async (req: Request, res: Response) => {

    const { email, username, password } = req.body;

    const createdUser =  await createUserServices(email, username, password);

    if (createdUser?.error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(createdUser.message);

    res.status(StatusCodes.CREATED).send("User has been crated!");
};

export const signin = async (req: Request, res: Response) => {

   const { username, password } = req.body;

   const loginUser = await signinUserServices(username, password);

   if (loginUser?.accountError) return res.status(StatusCodes.NOT_FOUND).send(loginUser.message);

   if (loginUser?.passwordError) return res.status(StatusCodes.UNAUTHORIZED).send(loginUser.message);

   res.cookie("access_token", loginUser?.token, {
    httpOnly: true
   }).status(StatusCodes.OK).send(loginUser?.accountData);
};

export const googleAuth = async (req: Request, res: Response) => {

    const { name, email, img } = req.body;
 
    const loginUser = await signinUserServices(name, email, img);
 
    if (loginUser?.accountError) return res.status(StatusCodes.NOT_FOUND).send(loginUser.message);
 
    if (loginUser?.passwordError) return res.status(StatusCodes.UNAUTHORIZED).send(loginUser.message);
 
    res.cookie("access_token", loginUser?.token, {
     httpOnly: true
    }).status(StatusCodes.OK).send(loginUser?.accountData);
 };
