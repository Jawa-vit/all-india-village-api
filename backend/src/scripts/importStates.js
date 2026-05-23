const fs = require("fs");
const csv = require("csv-parser");

const prisma = require("../prisma");

const results = [];

fs.createReadStream("C:/Users/Acer/OneDrive/Desktop/Bluestock internship/all-india-village-api/data_processing/cleaned_data/cleaned_states.csv")  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {

    console.log("Importing states...");

    try {

      for (const state of results) {

        await prisma.state.create({
          data: {
            code: state.state_code.toString(),
            name: state.state_name,
            countryId: 1
          }
        });

      }

      console.log("States imported successfully");

    } catch (error) {

      console.error(error);

    } finally {

      await prisma.$disconnect();

    }

  });