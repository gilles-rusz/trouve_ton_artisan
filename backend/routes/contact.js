const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { Artisan } = require("../models");
const { body, validationResult } = require("express-validator");


const contactValidationRules = [
  body("artisanId").isInt().withMessage("ID d'artisan invalide"),
  body("nom").trim().notEmpty().withMessage("Le nom est obligatoire"),
  body("email").isEmail().withMessage("Email invalide"),
  body("objet").trim().notEmpty().withMessage("L'objet est obligatoire"),
  body("message").trim().notEmpty().withMessage("Le message est obligatoire"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/contact", contactValidationRules, validate, async (req, res) => {
  const { artisanId, nom, email, objet, message } = req.body;

  try {
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });
    if (!artisan.email) return res.status(400).json({ error: "Artisan sans adresse email" });

    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Envoi du mail
    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: artisan.email,
      subject: objet,
      text: message,
      replyTo: email,
    });

    res.json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
  }
});

module.exports = router;
