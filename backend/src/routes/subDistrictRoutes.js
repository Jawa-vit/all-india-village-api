const express = require("express");

const router = express.Router();

const prisma = require("../prisma");

// GET SUBDISTRICTS BY DISTRICT ID
router.get("/:districtId", async (req, res) => {

  try {

    const { districtId } = req.params;

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // Total subdistricts
    const totalSubDistricts = await prisma.subDistrict.count({
      where: {
        districtId: parseInt(districtId)
      }
    });

    // Fetch paginated subdistricts
    const subdistricts = await prisma.subDistrict.findMany({

      where: {
        districtId: parseInt(districtId)
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

      totalSubDistricts,

      totalPages: Math.ceil(totalSubDistricts / limit),

      data: subdistricts

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subdistricts"
    });

  }

});

module.exports = router;