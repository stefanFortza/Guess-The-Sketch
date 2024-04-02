app.set("views", path.join(path.dirname(), "views"));
// app.use(cors());

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://127.0.0.1:8080"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("draw-line", ({ prevPoint, currentPoint, color }) => {
//     console.log({ prevPoint, currentPoint, color });
//     socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
//   });

//   socket.on("clear-canvas", () => {
//     socket.broadcast.emit("clear-canvas");
//   });

//   socket.on("guess", (data) => {
//     // socket.broadcast.emit("message", data);
//     io.emit("message", data);
//     console.log(data);
//   });
// });

// app.use("/", (req, res) => {
//   res.render("a.ejs");
// });

// server.listen(5000, () => {
//   console.log("server running at http://localhost:5000");
// });
