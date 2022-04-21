import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router();
const postController = new PostController()

postRouter.get("/feed", postController.getPostSignedUp)
postRouter.get("/feed/type", postController.getPostByType)
postRouter.get("/:id", postController.getPostById)
postRouter.post("/", postController.likeDeslikePost)
postRouter.post("/post", postController.createPost)
postRouter.post("/:id", postController.postComment)
postRouter.delete("/:id", postController.deleteComment)