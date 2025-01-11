import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { mappingData } from "./seedingData";

export const uploadMapping = async (req: Request, res: Response) => {
  const data = req.file;

  try {
    if (!data) {
      return;
    }

    const filePath = data.path;
    const result: { 'Sub Category': string; 'Combined Category': string; 'Category': string }[] = [];

    const stream = fs.createReadStream(filePath);

    stream
    .pipe(csv())
  .on('data', (data) => {
    // Handle combined header
    if (data['Sub Category,Combined Category,Category']) {
      const [subCategory, combinedCategory, category] = data['Sub Category,Combined Category,Category'].split(',');

      result.push({
        'Sub Category': subCategory.trim(),
        'Combined Category': combinedCategory.trim(),
        'Category': category.trim(),
      });
    }
  })
      .on("end", async () => {
        try {
          for (const record of result) {
            await mappingData(record);
          }

          // Clean up the uploaded file after processing
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete file", err);
          });

          res.status(200).json({ message: "Mappings uploaded and processed successfully!" });
        } catch (error) {
          console.error("Error during database operations:", error);
          res.status(500).json({ error: "Error during database operations" });
        }
      })
      .on("error", (error) => {
        console.error("Error processing mapping CSV:", error);
        res.status(500).json({ error: "Error processing CSV file" });
      });
      console.log(result)
  } catch (error) {
    console.error("Error processing mapping CSV:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
