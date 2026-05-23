const fs = require("fs");
const csv = require("csv-parser");

const prisma = require("../prisma");

const results = [];

fs.createReadStream(
  "C:/Users/Acer/OneDrive/Desktop/Bluestock internship/all-india-village-api/data_processing/cleaned_data/cleaned_districts.csv"
)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {

    console.log("Importing districts...");

    try {

      for (const district of results) {

        // Find matching state
        const state = await prisma.state.findFirst({
          where: {
            code: district.state_code.toString()
          }
        });

        // Skip if state not found
        if (!state) {
          console.log(`State not found for district: ${district.district_name}`);
          continue;
        }

        // Create district
        await prisma.district.create({
          data: {
            code: district.district_code.toString(),
            name: district.district_name,
            stateId: state.id
          }
        });

      }

      console.log("Districts imported successfully");

    } catch (error) {

      console.error(error);

    } finally {

      await prisma.$disconnect();

    }

  });