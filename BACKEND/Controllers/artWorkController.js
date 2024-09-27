const artWork = require("../Models/artWorkModel");
const ImgSchema = require("../Models/artWorkImgModel");
const nodemailer = require("nodemailer");
//Data Display
const getAllArtWorks = async (req, res) => {
  let artWorks;

  //Get all artWorks
  try {
    artWorks = await artWork.find();
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
  console.log(accepted, "accccccccccccccccccccc");
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

//     const useremail = "savidyajayalath@gmail.com";
//   const pass = "rofk zebl vrwb gjti";

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: useremail,
//       pass: pass,
//     },
//   });


//   const mailOptions = {
//     from: useremail,
//     to: email,
//     subject: title,
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <body>
//           <p>Artwork Accepted</p>
//         </body>
//       </html>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Email sent: " + info.response);
//   });

    return res.status(200).json({ artwork: updatedArtwork });

  

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};


//Delete artwork
const deleteArtWork = async (req, res, next) => {
  const id = req.params.id;

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
  return res.status(200).json({ artworks });
};

exports.getAllArtWorks = getAllArtWorks;
exports.addArtWorks = addArtWorks;
exports.getById = getById;
exports.updateArtWork = updateArtWork;
exports.deleteArtWork = deleteArtWork;
