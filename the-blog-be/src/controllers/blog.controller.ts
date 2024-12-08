import { Request, Response } from "express";
import prisma from "../prisma";

export class BlogController {
  async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          thumbnail: true,
          createdAt: true,
          User: {
            select: {
              username: true,
              email: true,
              avatar: true,
            },
          },
        },
      });
      res.status(200).send({ blogs });
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async getBlogSlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const blog = await prisma.blog.findUnique({
        where: { slug },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          thumbnail: true,
          createdAt: true,
          opener: true,
          content: true,
          User: {
            select: {
              username: true,
              email: true,
              avatar: true,
            },
          },
        },
      });
      res.status(200).send({ blog });
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
