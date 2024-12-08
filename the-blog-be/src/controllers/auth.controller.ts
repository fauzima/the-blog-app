import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from "bcrypt";
import { findRefCode, findUniqueUser } from "../services/user.sevice";
import { sign, verify } from "jsonwebtoken";
import { generator, transporter } from "../services/auth.service";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

export class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      if (password != confirmPassword)
        throw { message: "Password doesn't match!" };

      const user = await findUniqueUser(username, email);
      if (user)
        throw { message: "Username or email has already been registered!" };

      const salt = await genSalt();
      const hashPass = await hash(password, salt);
      let newRefCode = generator();

      const refCode = await findRefCode(newRefCode);
      if (refCode) newRefCode = generator();

      const newUser = await prisma.user.create({
        data: { username, email, password: hashPass, refCode: newRefCode },
      });

      const payload = { id: newUser.id, role: newUser.role };
      const token = sign(payload, process.env.JWT_KEY!, { expiresIn: "10m" });
      const link = `http://localhost:1337/verify/${token}`;
      // const link = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`;

      const templatePath = path.join(__dirname, "../templates", "verify.hbs");
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ username, link: link });

      await transporter.sendMail({
        from: "fauzimakarimsiregar@gmail.com",
        to: email,
        subject: "Welcome to The Blog",
        html,
      });

      res
        .status(201)
        .send({ message: "Registration process was successful! ✅" });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { data, password } = req.body;
      const user = await findUniqueUser(data, data);

      if (!user) throw { message: "User not found!" };
      if (!user.isVerified) throw { message: "User is not yet verified!" };

      const isPassValid = await compare(password, user.password);
      if (!isPassValid) throw { message: "Incorrect password!" };

      const payload = { id: user.id, role: user.role };
      const token = sign(payload, process.env.JWT_KEY!, { expiresIn: "1d" });

      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 86400000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        })
        .send({ message: "Login process was successful! ✅", user });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async verifyUser(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const verifiedUser: any = verify(token, process.env.JWT_KEY!);
      await prisma.user.update({
        data: { isVerified: true },
        where: { id: verifiedUser.id },
      });
      res
        .status(200)
        .send({ message: "User's verification process was successful! ✅" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
