// Import the express module
import express from "express";

// Create an instance of the express application
const app = express();

// Set the port number for the server to listen on
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Array to store the list of items
const items = [];

// Handle GET requests to the root URL
app.get("/", (req, res) => {
  // Render the index.ejs file and pass the list of items to it
  res.render("index.ejs", { newListItems: items });
});

// Handle POST requests to the root URL
app.post("/", (req, res) => {
  // Add the new item from the form to the items array
  items.push(req.body.newItem);
  // Redirect to the root URL after adding the item
  res.redirect("/");
});

// Handle POST requests to delete a task
app.post("/taskDelete/:id", (req, res) => {
  // Extract the task ID from the request parameters
  const taskId = req.params.id;
  // Remove the task with the specified ID from the items array
  items.splice(taskId, 1);
  // Redirect to the root URL after deleting the task
  res.redirect("/");
});

// Start the server and listen for incoming connections on the specified port
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
