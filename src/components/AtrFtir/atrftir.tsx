import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Sample data (replace with your actual JSON data)
const data =[
              {
                "Peak (cm–1)": "3619",
                "Peak Regions (cm–1)": "3614-3620",
                "Minerals": "Kaolinite",
                "Soil Samples": "BAH1, SH1"
              },
              {
                "Peak (cm–1)": "3618",
                "Peak Regions (cm–1)": "3614-3620",
                "Minerals": "Kaolinite",
                "Soil Samples": "P1, KA1"
              },
              {
                "Peak (cm–1)": "3616",
                "Peak Regions (cm–1)": "3614-3620",
                "Minerals": "Kaolinite",
                "Soil Samples": "BA1, U1"
              },
              {
                "Peak (cm–1)": "3614",
                "Peak Regions (cm–1)": "3614-3620",
                "Minerals": "Kaolinite",
                "Soil Samples": "SVD1"
              },
              {
                "Peak (cm–1)": "1744",
                "Peak Regions (cm–1)": "1744-1745",
                "Minerals": "Feldspar",
                "Soil Samples": "BA1"
              },
              {
                "Peak (cm–1)": "1648",
                "Peak Regions (cm–1)": "1645–1650",
                "Minerals": "Illite",
                "Soil Samples": "BA1"
              },
              {
                "Peak (cm–1)": "1645",
                "Peak Regions (cm–1)": "1640–1645",
                "Minerals": "Montmorillonite",
                "Soil Samples": "D1"
              },
              {
                "Peak (cm–1)": "1515",
                "Peak Regions (cm–1)": "1513-1515",
                "Minerals": "",
                "Soil Samples": "BAH1, D1, SH1, HO1"
              },
              {
                "Peak (cm–1)": "1514",
                "Peak Regions (cm–1)": "1513-1515",
                "Minerals": "",
                "Soil Samples": "H1, K1, P1, KA1, KAU1, U1"
              },
              {
                "Peak (cm–1)": "1513",
                "Peak Regions (cm–1)": "1513-1515",
                "Minerals": "",
                "Soil Samples": "BA1"
              },
              {
                "Peak (cm–1)": "1427",
                "Peak Regions (cm–1)": "1423-1428",
                "Minerals": "Calcite",
                "Soil Samples": "SO3"
              },
              {
                "Peak (cm–1)": "1033",
                "Peak Regions (cm–1)": "1031-1034",
                "Minerals": "Kaolinite",
                "Soil Samples": "BHA3"
              },
              {
                "Peak (cm–1)": "1032",
                "Peak Regions (cm–1)": "1031-1034",
                "Minerals": "Kaolinite",
                "Soil Samples": "S2, D2, BAH2, C2"
              },
              {
                "Peak (cm–1)": "1008",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "H1"
              },
              {
                "Peak (cm–1)": "1007",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "KO2, HO1"
              },
              {
                "Peak (cm–1)": "1006",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "BAH1"
              },
              {
                "Peak (cm–1)": "1004",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "S3, SA1, P1"
              },
              {
                "Peak (cm–1)": "1003",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "BHA3, KA1, SH1"
              },
              {
                "Peak (cm–1)": "1002",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "U1, KAU1, BA1"
              },
              {
                "Peak (cm–1)": "1001",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "S2, BAH2, C2, PH2, BHA1, SH2, KO1, K1"
              },
              {
                "Peak (cm–1)": "1000",
                "Peak Regions (cm–1)": "1000-1009",
                "Minerals": "Kaolinite",
                "Soil Samples": "HO3, BHA2, J2, KO2, MN2, S1, PH1"
              },
              {
                "Peak (cm–1)": "999",
                "Peak Regions (cm–1)": "991-1000",
                "Minerals": "Kaolinite",
                "Soil Samples": "D1"
              },
              {
                "Peak (cm–1)": "995",
                "Peak Regions (cm–1)": "990-995",
                "Minerals": "Feldspar albite",
                "Soil Samples": "MAU1"
              },
              {
                "Peak (cm–1)": "992",
                "Peak Regions (cm–1)": "990-995",
                "Minerals": "Feldspar albite",
                "Soil Samples": "U3, SA3, SO3, MN3, P2, KA2, SVD1"
              },
              {
                "Peak (cm–1)": "991",
                "Peak Regions (cm–1)": "990-995",
                "Minerals": "Feldspar albite",
                "Soil Samples": "SO1"
              },
              {
                "Peak (cm–1)": "778",
                "Peak Regions (cm–1)": "775-780",
                "Minerals": "Quartz",
                "Soil Samples": "HO1"
              },
              {
                "Peak (cm–1)": "777",
                "Peak Regions (cm–1)": "775-780",
                "Minerals": "Quartz",
                "Soil Samples": "PH3, SA3, SO2"
              },
              {
                "Peak (cm–1)": "776",
                "Peak Regions (cm–1)": "775-780",
                "Minerals": "Quartz",
                "Soil Samples": "KAU3, U3, M3, SH3, KO3, P3, SVD3, C3, K3, SVD2, KA2, KA1"
              }
            ];

const TableComponent = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Peak (cm–1)</TableCell>
            <TableCell>Peak Regions (cm–1)</TableCell>
            <TableCell>Minerals</TableCell>
            <TableCell>Soil Samples</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row["Peak (cm–1)"]}</TableCell>
              <TableCell>{row["Peak Regions (cm–1)"]}</TableCell>
              <TableCell>{row.Minerals}</TableCell>
              <TableCell>{row["Soil Samples"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
