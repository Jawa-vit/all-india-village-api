const express = require("express");

const router = express.Router();

const prisma = require("../prisma");

// GET DISTRICTS BY STATE ID
router.get("/:stateId", async (req, res) => {

  try {

    const { stateId } = req.params;

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // Total districts
    const totalDistricts = await prisma.district.count({
      where: {
        stateId: parseInt(stateId)
      }
    });

    // Fetch paginated districts
    const districts = await prisma.district.findMany({

      where: {
        stateId: parseInt(stateId)
      },

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

      totalDistricts,

      totalPages: Math.ceil(totalDistricts / limit),

      data: districts

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch districts"
    });

  }

});

module.exports = router;