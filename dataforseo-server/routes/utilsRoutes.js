const express = require("express");
const axios = require("axios");
const Language = require("../models/Language"); 
const Country = require("../models/Country");
const Location = require("../models/Location"); 

require("dotenv").config();

const router = express.Router();
Location.collection.createIndex({ location_name: "text" });

router.get("/get_language", async (req, res) => {
  try {
    const languagesInDb = await Language.find({});

    if (languagesInDb.length > 0) {
      return res.json({ source: "database", tasks: languagesInDb });
    }

    const response = await axios({
      method: "get",
      url: "https://api.dataforseo.com/v3/serp/google/organic/languages",
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    const languages = response.data.tasks[0].result;

    const savedLanguages = await Language.insertMany(
      languages.map((lang) => ({
        language_code: lang.language_code,
        language_name: lang.language_name,
      }))
    );

    res.json({ source: "api", tasks: savedLanguages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get_countries", async (req, res) => {
  try {
    const countriesInDb = await Country.find({});

    if (countriesInDb.length > 0) {
      return res.json({ source: "database", tasks: countriesInDb });
    }

    else {
      return res.json({ source: "database", tasks: [] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get_location", async (req, res) => {
  try {
    let country = req.query.country;
    country = country.toLowerCase()
    console.log(country,"country")
    const response = await axios({
      method: "get",
      url: `https://api.dataforseo.com/v3/serp/google/locations/${country}`,
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
      headers: {
        "content-type": "application/json",
      },
    });

    console.log(response.data.tasks[0].result,"dataattatat")

    return res.json({
      source: "api",
      tasks: response.data.tasks[0].result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search_location", async (req, res) => {
  try {
    const { query, page = 1, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const searchQuery = { $text: { $search: query } };

    // Apply pagination
    const locations = await Location.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      results: locations,
      currentPage: page,
      totalResults: locations.length,
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
