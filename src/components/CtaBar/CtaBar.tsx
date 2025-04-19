import React from "react";
import Link from "next/link"; // Import Link component
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const locationData = [
  {
    product_id: "VAY-001",
    slug: "location",
    product_name: "LOCATION",
    subproducts: [
      { name: "Chaka Block", slug: "chaka" },
      { name: "Karchana", slug: "karchana" },
      { name: "Sankargarh", slug: "sankargarh" },
      { name: "Dhanupur", slug: "dhanupur" },
      { name: "Jasara", slug: "jasara" },
      { name: "Kaundhiyara", slug: "kaundhiyara" },
      { name: "Meja", slug: "meja" },
      { name: "Uruva", slug: "uruva" },
      { name: "Koraon", slug: "koraon" },
      { name: "Manda", slug: "manda" },
      { name: "Saidabad", slug: "saidabad" },
      { name: "Handia", slug: "handia" },
      { name: "Pratapur", slug: "pratapur" },
      { name: "Shasho", slug: "shasho" },
      { name: "Phulpur", slug: "phulpur" },
      { name: "Bahariya", slug: "bahariya" },
      { name: "Bahadurpur", slug: "bahadurpur" },
      { name: "SVD", slug: "SVD" },
      { name: "Soraon", slug: "soraon" },
      { name: "Kaurihara", slug: "kaurihara" },
      { name: "Maumima", slug: "maumima" },
      { name: "Holagarh", slug: "holagarh" },
      { name: "Bhagwatpur", slug: "Bhagwatpur" },
    ],
  },
];

const CtaBar = () => {
  return (
    <>
      <section className="section section-cta-bar">
        <div className="container">
          {/* Header with text */}
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
            Forensic characterization of soil from regions of Prayagraj
          </Typography>

          {/* Table */}
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>S.No</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Location Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locationData[0].subproducts.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/location/${location.slug}`} passHref>
                        {location.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  );
};

export default CtaBar;
