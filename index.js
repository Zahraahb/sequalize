import express from 'express'
import connectionDB from './db/connectionDB.js'
import userRouter from './src/modules/users/user.routes.js'
import postRouter from './src/modules/posts/post.routes.js'
import commentRouter from './src/modules/comments/comment.routes.js'
const app = express()
const port = process.env.port || 3000

app.use(express.json())
connectionDB()

app.use('/users', userRouter )
app.use('/posts', postRouter )
app.use('/comments', commentRouter )


app.use('*', (req, res) => res.status(404).json({msg:"404 page not found"}))
app.listen(port, () => console.log(`server is running on port ${port}!`));