const path = require("path");

const express = require("express");
const app = express();

const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sent", (req, res) => {
  res.render("sent");
});

app.post("/sendemail", async (req, res) => {
  const { name, phone, email, message } = req.body;

  const from = "mushel@gmail.com";
  const to = "mushel@gmail.com";
  const subject = "Chance in Hell Snoballs website";
  const output = `
    <p>You have a new Contact Request from the Chance in Hell contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Phone: ${phone}</li>
      <li>Email: ${email}</li>
      <li>Message: ${message}</li>
    </ul>
  `;
  try {
    await sendEmail(to, from, subject, output);
    // res.redirect("/sent"); // want this to just redirect the component not to a new page view

    // Return a success response with data for the client
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      // Optional: Include data for the updated component
      // componentData: { /* Your data here */ },
    });
  } catch (error) {
    // Return an error response
    res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
