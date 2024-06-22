//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import data from "../data.json";
import { Crop } from "../types/crop";

const CropProduction = () => {
  const [yearlyData, setYearlyData] = useState({});
  useEffect(() => {
    const processedData = processCropData(data);
    setYearlyData(processedData);
  }, []);
  console.log(yearlyData);

  const rows = Object.keys(yearlyData).map((year, i) => (
    <Table.Tr key={i}>
      <Table.Td>{year}</Table.Td>
      <Table.Td>
        {yearlyData[year].max["Crop Production (UOM:t(Tonnes))"]}
      </Table.Td>
      <Table.Td>
        {" "}
        {yearlyData[year].min["Crop Production (UOM:t(Tonnes))"] || 0}
      </Table.Td>
    </Table.Tr>
  ));
  const processCropData = (data) => {
    const yearlyData = {};
    data.forEach((item: Crop) => {
      const year = item.Year.split(",")[1];
      const production = item["Crop Production (UOM:t(Tonnes))"];
      if (!isNaN(production)) {
        // Initialize the year data if it doesn't exist
        if (!yearlyData[year]) {
          yearlyData[year] = { max: item, min: item };
        } else {
          if (
            production >
            parseFloat(yearlyData[year].max["Crop Production (UOM:t(Tonnes))"])
          ) {
            yearlyData[year].max = item;
          }
          if (
            production <
            parseFloat(yearlyData[year].min["Crop Production (UOM:t(Tonnes))"])
          ) {
            yearlyData[year].min = item;
          }
        }
      }
    });
    return yearlyData;
  };

  return (
    <Table
      stickyHeader
      horizontalSpacing={"md"}
      verticalSpacing={"md"}
      style={{ maxWidth: "550px" }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production in that Year</Table.Th>
          <Table.Th>Crop with Minimum Production in that Year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default CropProduction;
