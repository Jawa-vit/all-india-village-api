const fs = require("fs");
const csv = require("csv-parser");

const prisma = require("../prisma");

const results = [];

fs.createReadStream(
  "C:/Users/Acer/OneDrive/Desktop/Bluestock internship/all-india-village-api/data_processing/cleaned_data/cleaned_subdistricts.csv"
)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {

    console.log("Importing subdistricts...");

    try {

      // Get all districts
      const districts = await prisma.district.findMany();

      // Create district lookup map
      const districtMap = {};

      districts.forEach((district) => {
        districtMap[district.code] = district.id;
      });

      // Prepare bulk insert data
      const subdistrictData = results
        .map((subdistrict) => {

          const districtId =
            districtMap[subdistrict.district_code];

          if (!districtId) return null;

          return {
            code: subdistrict.subdistrict_code.toString(),
            name: subdistrict.subdistrict_name,
            districtId: districtId
          };

        })
        .filter(Boolean);

      // Bulk insert
      await prisma.subDistrict.createMany({
        data: subdistrictData,
        skipDuplicates: true
      });

      console.log("SubDistricts imported successfully");

    } catch (error) {

      console.error(error);

    } finally {

      await prisma.$disconnect();

    }

  });