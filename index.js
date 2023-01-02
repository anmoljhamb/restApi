const http = require("http");
const path = require("path");
const app = require("./app");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on the url: http://localhost:${PORT}`);
});
