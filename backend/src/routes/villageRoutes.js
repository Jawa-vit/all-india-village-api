const express = require("express");

const router = express.Router();

const prisma = require("../prisma");

// GET VILLAGES WITH PAGINATION
router.get("/:subDistrictId", async (req, res) => {

  try {

    const { subDistrictId } = req.params;

    // Pagination
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // Total villages count
    const totalVillages = await prisma.village.count({
      where: {
        subDistrictId: parseInt(subDistrictId)
      }
    });

    // Fetch paginated villages
    const villages = await prisma.village.findMany({

      where: {
        subDistrictId: parseInt(subDistrictId)
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

      totalVillages,

      totalPages: Math.ceil(totalVillages / limit),

      data: villages

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch villages"
    });

  }

});

module.exports = router;