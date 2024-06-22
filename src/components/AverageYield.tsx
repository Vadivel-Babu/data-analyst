//@ts-nocheck
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import data from "../data.json";

const AverageYield = () => {
  const [cropAverages, setCropAverages] = useState([]);

  useEffect(() => {
    const processedData = processCropData(data);
    setCropAverages(processedData);
  }, []);

  const processCropData = (data) => {
    const cropData = {};

    // Iterate over each data item
    data.forEach((item) => {
      const cropName = item["Crop Name"];
      const yieldValue = parseFloat(
        item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
      );
      const cultivationArea = parseFloat(
        item["Area Under Cultivation (UOM:Ha(Hectares))"]
      );
      // Initialize crop data if it doesn't exist
      if (!cropData[cropName]) {
        cropData[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
      }

      // Accumulate yield values if valid
      if (!isNaN(yieldValue)) {
        cropData[cropName].totalYield += yieldValue;
      }
      // Accumulate cultivation area if valid
      if (!isNaN(cultivationArea)) {
        cropData[cropName].totalArea += cultivationArea;
      }

      // Increment the count of entries for this crop
      cropData[cropName].count += 1;
    });

    const averages = Object.keys(cropData).map((crop) => ({
      cropName: crop,
      avgYield: cropData[crop].totalYield / cropData[crop].count,
      avgArea: cropData[crop].totalArea / cropData[crop].count,
    }));

    return averages;
  };

  const rows = cropAverages.map((crop) => (
    <Table.Tr key={crop.cropName}>
      <Table.Td>{crop.cropName}</Table.Td>
      <Table.Td>{crop.avgYield.toFixed(2)}</Table.Td>
      <Table.Td>{crop.avgArea.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table
      stickyHeader
      horizontalSpacing={"md"}
      verticalSpacing={"md"}
      style={{ maxWidth: "550px" }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop </Table.Th>
          <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
          <Table.Th>
            Average Cultivation Area of the Crop between 1950-2020
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default AverageYield;
