const fs = require("fs");
const csv = require("csv-parser");

const prisma = require("../prisma");

const results = [];

fs.createReadStream(
  "C:/Users/Acer/OneDrive/Desktop/Bluestock internship/all-india-village-api/data_processing/cleaned_data/cleaned_villages.csv"
)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {

    console.log("Importing villages...");

    try {

      // =========================
      // GET ALL SUBDISTRICTS
      // =========================

      const subdistricts = await prisma.subDistrict.findMany();

      // =========================
      // CREATE LOOKUP MAP
      // =========================

      const subdistrictMap = {};

      subdistricts.forEach((subdistrict) => {
        subdistrictMap[subdistrict.code] = subdistrict.id;
      });

      // =========================
      // PREPARE VILLAGE DATA
      // =========================

      const villageData = results
        .map((village) => {

          const subDistrictId =
            subdistrictMap[village.subdistrict_code];

          // Skip invalid villages
          if (!subDistrictId) return null;

          return {
            code: village.village_code.toString(),
            name: village.village_name,
            subDistrictId: subDistrictId
          };

        })
        .filter(Boolean);

      console.log(
        `Prepared ${villageData.length} villages for import`
      );

      // =========================
      // IMPORT IN BATCHES
      // =========================

      const batchSize = 100000;

      for (let i = 0; i < villageData.length; i += batchSize) {

        const batch = villageData.slice(i, i + batchSize);

        await prisma.village.createMany({
          data: batch,
          skipDuplicates: true
        });

        console.log(
          `${Math.min(i + batchSize, villageData.length)} villages imported`
        );

      }

      console.log("Villages imported successfully");

    } catch (error) {

      console.error(error);

    } finally {

      await prisma.$disconnect();

    }

  });