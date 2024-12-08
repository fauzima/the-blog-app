import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      console.log(req.user);
      const { search, page = 1, limit = 3 } = req.query;
      const filter: Prisma.UserWhereInput = {};
      if (search) {
        filter.OR = [
          {
            username: { contains: search as string, mode: "insensitive" },
          },
          {
            email: { contains: search as string, mode: "insensitive" },
          },
        ];
      }
      const countUser = await prisma.user.aggregate({ _count: { _all: true } });
      const total_page = Math.ceil(+countUser._count._all / +limit);
      const users = await prisma.user.findMany({
        where: filter,
        orderBy: { createdAt: "asc" },
        take: +limit,
        skip: +limit * (+page - 1),
      });
      res
        .status(200)
        .send({ total_page: total_page, page: page, users: users });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const users = await prisma.user.findUnique({
        where: { id: req.user?.id },
      });
      res.status(200).send({ users });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      await prisma.user.create({ data: req.body });
      res.status(201).send({ message: "New user is successfully created! ✅" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.update({ data: req.body, where: { id: +id } });
      res.status(200).send({ message: "User is successfully edited! ✅" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id: +id } });
      res.status(200).send({ message: "User is successfully deleted! ✅" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async editAvatar(req: Request, res: Response) {
    try {
      if (!req.file) throw { message: "No file!" };
      // const link = `http://localhost:1337/api/public/avatar/${req.file.filename}`;
      // await prisma.user.update({
      //   data: { avatar: link },
      //   where: { id: req.user?.id },
      // });
      res
        .status(200)
        .send({ message: "User's avatar is successfully changed! ✅" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
