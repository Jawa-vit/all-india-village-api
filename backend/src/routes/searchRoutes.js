const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const prisma = require("../prisma");

// SEARCH VILLAGES
router.get("/", async (req, res) => {

  try {

    const { q } = req.query;

    // Validation
    if (!q) {

      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });

    }

    // Search villages
    const villages = await prisma.village.findMany({

      where: {
        name: {
          contains: q,
          mode: "insensitive"
        }
      },

      take: 20

    });

    res.json({
      success: true,
      total: villages.length,
      data: villages
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Search failed"
    });

  }

});

module.exports = router;