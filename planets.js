const express = require("express");
const router = express.Router();
const Joi = require("joi");

// database finto
let planets = [
  { id: 1, name: "Mercurio" },
  { id: 2, name: "Venere" },
  { id: 3, name: "Terra" },
];

// validazione con Joi
const planetSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

// GET tutti i pianeti
router.get("/", (req, res) => {
  res.status(200).json(planets);
});

// GET pianeta per ID
router.get("/:id", (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Pianeta non trovato" });
  res.status(200).json(planet);
});

// POST crea nuovo pianeta
router.post("/planet", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: "Pianeta creato con successo" });
});

// PUT aggiorna un pianeta
router.put("/:id", (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Pianeta non trovato" });

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: "Pianeta aggiornato con successo" });
});

// DELETE elimina un pianeta
router.delete("/:id", (req, res) => {
  const index = planets.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ msg: "Pianeta non trovato" });

  planets.splice(index, 1);
  res.status(200).json({ msg: "Pianeta eliminato con successo" });
});

module.exports = router;
