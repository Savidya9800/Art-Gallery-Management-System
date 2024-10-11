const artWork = require("../Models/artWorkModel");
const ImgSchema = require("../Models/artWorkImgModel");
const nodemailer = require("nodemailer");
//Data Display
const getAllArtWorks = async (req, res) => {
  let artWorks;
  const email = req.query.email;
  console.log(email);
  //Get all artWorks

  try {
    if (email) {
      artWorks = await artWork.find({ email: email });
    } else {
      artWorks = await artWork.find();
    }
  } catch (err) {
    console.log(err);
  }

  //not found
  if (!artWorks) {
    return res.status(404).json({ message: "No artWorks found" });
  }

  //Display all artWorks
  return res.status(200).json({ artWorks });
};

//Data Insert
const addArtWorks = async (req, res, next) => {
  const {
    name,
    email,
    pNumber,
    website,
    biography,
    statement,
    title,
    medium,
    dimensions,
    date,
    description,
    place,
    tags,
    price,
  } = req.body;

  let artWorks;

  try {
    // Fetch the last uploaded image from the database
    const lastImage = await ImgSchema.findOne({}).sort({ createdAt: -1 });
    const img = lastImage ? lastImage.image : null;
    // const img = lastImage ? lastImage._id : null;

    artWorks = new artWork({
      name,
      email,
      pNumber,
      website,
      biography,
      statement,
      title,
      medium,
      dimensions,
      date,
      description,
      img,
      place,
      tags,
      price,
    });
    await artWorks.save();
  } catch (err) {
    console.log(err);
  }

  //not insert artWorks
  if (!artWorks) {
    return res.status(404).json({ message: "Unable to add artWorks" });
  }
  return res.status(200).json({ artWorks });
};

// Get Artwork by ID
const getById = async (req, res) => {
  const id = req.params.id; // Extract ID from request parameters

  let artWorks;

  try {
    // Attempt to find artwork by ID
    artWorks = await artWork.findById(id);
  } catch (err) {
    console.error("Error fetching artwork:", err);
    return res.status(500).json({ message: "Server Error" }); // Handle database errors
  }

  // If no artwork is found
  if (!artWorks) {
    return res.status(404).json({ message: "Artwork Not Found" }); // Return not found message
  }

  // Return the found artwork
  return res.status(200).json({ artWorks });
};

const updateArtWork = async (req, res, next) => {
  const id = req.params.id;
  let gemail;
  try {
    // Fetch the artwork by its ID
    const artworkf = await artWork.findById(id);

    // If no artwork is found, send an error response
    if (!artworkf) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Get the email from the fetched artwork
    gemail = artworkf.email;

    // Now, you can use the email variable for any further operations
    console.log("Email from artwork:", gemail);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }

  const {
    name,
    email,
    pNumber,
    website,
    biography,
    statement,
    title,
    medium,
    dimensions,
    date,
    description,
    img,
    place,
    tags,
    price,
    accepted,
  } = req.body;

  try {
    const updatedArtwork = await artWork.findByIdAndUpdate(
      id,
      {
        name,
        email,
        pNumber,
        website,
        biography,
        statement,
        title,
        medium,
        dimensions,
        date,
        description,
        img,
        place,
        tags,
        price,
        accepted,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedArtwork) {
      return res.status(404).json({ message: "Artwork Not Found" });
    }

    const useremail = "savidyajayalath@gmail.com";
    const pass = "rofk zebl vrwb gjti";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: useremail,
        pass: pass,
      },
    });

    const mailOptions = {
      from: useremail,
      to: gemail,
      subject: `Your Artwork has Been Accepted!`, // Assign artwork title in subject
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Artwork Accepted</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .header img {
                width: 100px;
              }
              .content {
                text-align: left;
              }
              .content h1 {
                font-size: 24px;
                color: #333;
              }
              .content p {
                font-size: 16px;
                color: #555;
                line-height: 1.6;
              }
              .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Congratulations!</h1>
              </div>
              <div class="content">
                <p>Dear Artist,</p>
                <p>We are pleased to inform you that your artwork  has been accepted into our collection at AWARNA Art Gallery.</p>
                <p>Thank you for your submission, and we are excited to showcase your work!</p>
                <p>For further inquiries, feel free to contact us.</p>
                <p>Best regards,<br/>AWARNA Art Gallery Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 AWARNA Art Gallery. All Rights Reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
      return res.status(409).json({ message: "Accepted, Email sent!" });
    });

    return res.status(200).json({ artwork: updatedArtwork });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Delete artwork
const deleteArtWork = async (req, res, next) => {
  const id = req.params.id;

  let gemail;
  try {
    // Fetch the artwork by its ID
    const artworkf = await artWork.findById(id);

    // If no artwork is found, send an error response
    if (!artworkf) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Get the email from the fetched artwork
    gemail = artworkf.email;

    // Now, you can use the email variable for any further operations
    console.log("Email from artwork:", gemail);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }

  let artworks;

  try {
    artworks = await artWork.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!artworks) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Artwork Details" });
  }

  const useremail = "savidyajayalath@gmail.com";
  const pass = "rofk zebl vrwb gjti";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: useremail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: useremail,
    to: gemail,
    subject: `Your Artwork Submission Status`, // Including artwork title in the subject
    html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Artwork Submission Status</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
              .header {
                text-align: center;
                padding-bottom: 20px;
              }
              .header img {
                width: 100px;
              }
              .content {
                text-align: left;
              }
              .content h1 {
                font-size: 24px;
                color: #333;
              }
              .content p {
                font-size: 16px;
                color: #555;
                line-height: 1.6;
              }
              .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Submission Update</h1>
              </div>
              <div class="content">
                <p>Dear Artist,</p>
                <p>We regret to inform you that your artwork was not accepted into our collection at AWARNA Art Gallery.</p>
                <p>We appreciate your submission and encourage you to continue creating and sharing your art. We look forward to future opportunities to collaborate.</p>
                <p>If you have any questions or would like feedback on your submission, please do not hesitate to reach out.</p>
                <p>Best regards,<br/>AWARNA Art Gallery Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 AWARNA Art Gallery. All Rights Reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);

    return res.status(409).json({ message: "Accepted, Email sent!" });
  });

  return res.status(200).json({ artworks });
};

exports.getAllArtWorks = getAllArtWorks;
exports.addArtWorks = addArtWorks;
exports.getById = getById;
exports.updateArtWork = updateArtWork;
exports.deleteArtWork = deleteArtWork;
