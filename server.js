require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const connectToMongo = require('./db');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());


const fileUpload = require("express-fileupload");
const  mongoose = require("mongoose");

app.use(fileUpload({useTempFiles: true,limits: {fileSize: 500*2024*1024}}))
app.use('/api/user',require("./router/User"));
app.use('/api/feed',require('./router/Feed'));
app.use('/api/order',require("./router/Order"));
app.use('/api/service', require("./router/Service"));
app.use('/api/subscription',require('./router/Subscription'));
app.use('/api/market', require("./router/MarketPlace"));
app.use('/api/cart', require("./router/Cart"));
app.use("/api/profile", require('./router/PetProfile'));
app.use("/api/post", require("./router/Post"));

const messageSchema = new mongoose.Schema({
  senderId: {type: String, required: true},
  receiverId: {type: String, required: true},
  message: {type: String, required: true},
  timestamp: {type: Date, required: Date.now}
})

const Message = mongoose.model("Message",messageSchema)

app.get("/chatHistory/:senderId/:receiverId",async(req,res)=>{
  const {senderId, receiverId} = req.params;
  try {
    const messages = await Message.find({
      $or:[
        {
        senderId,receiverId
      },
      {senderId: receiverId,receiverId:senderId},
    ]
    }).sort({timeStamp: -1});
    res.json(messages);
    
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch messages'})
  }
})


const users = {}; 
const onlineUsers = new Map();
io.on('connection',(socket)=>{
console.log('User connected:', socket.id);

socket.on('userLoggedIn',(data)=>{
users[data] = socket.id;
console.log(users);
});

socket.on('sendMessage',async(data)=>{
  // console.log('Received message:', data);
  const {senderId,receiverId,message,timestamp} = data;
  const newMessage = new Message({senderId,receiverId,timestamp,message});
  await newMessage.save();

 // Get receiver's socket ID
        const receiverSocketId = users[receiverId];
        console.log(receiverSocketId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", data);
            console.log('Message sent to:', receiverSocketId);
        } else {
            console.log('Receiver is offline or not registered.');
        }


//  io.to(receiverId).emit("receiveMessage",data);
});

  // Join a room based on user ID
  // socket.on('join', (userId) => {
  //   socket.join(userId);
  //   console.log(`User ${userId} joined their room`);
  // });

  // // Handle user online status
  // socket.on('online', (userId) => {
  //   console.log("user online pass id ->",userId);
  //   io.emit('user_status', { userId, status: 'online' });
  // });
  
  // // Handle user offline status
  // socket.on('offline', (userId) => {
  //   io.emit('user_status', { userId, status: 'offline' });
  // });

   socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
server.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT);
    connectToMongo();
})