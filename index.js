//import server module
const server = require("./API/server");
//activate server on port 4000
server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
