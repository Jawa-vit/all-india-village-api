const express = require("express");

const router = express.Router();

const prisma = require("../prisma");

// GET STATES WITH PAGINATION
router.get("/", async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // Total states
    const totalStates = await prisma.state.count();

    // Fetch paginated states
    const states = await prisma.state.findMany({

      skip: skip,

      take: limit,

      orderBy: {
        name: "asc"
      }

    });

    res.json({

      success: true,

      page,

      limit,

      totalStates,

      totalPages: Math.ceil(totalStates / limit),

      data: states

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch states"
    });

  }

});

module.exports = router;