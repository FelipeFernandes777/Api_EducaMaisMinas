import Aplication from "./app";

const server = new Aplication();
const PORT = process.env.PORT || 4000;

server.listen(Number(PORT), `server running on port: ${PORT}`)