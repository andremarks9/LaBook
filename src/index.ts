import { app } from "./controller/app";
import { postRouter } from "./router/PostRouter";
import { userRouter } from "./router/UserRouter";

app.use("/user", userRouter)
app.use("/post", postRouter)

// app.get("/user/feed", postController.getPostSignedUp)
// app.get("/user/feed/type", postController.getPostByType)
// app.get("/user/post/:id", postController.getPostById)
// app.get("/user/post/type", postController.getPostByType)
// app.post("/user/friendship/:id", userController.handleFriendshipById)
// app.post("/signup", userController.signup)
// app.post("/login", userController.login)
// app.post("/user/post", postController.likeDeslikePost)
// app.post("/user/post", postController.createPost)
// app.post("/user/post/:id", postController.postComment)
// app.delete("/user/post/:id", postController.deleteComment)
