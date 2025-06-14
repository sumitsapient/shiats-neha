"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExaminationResult {
  image?: string;
  result: string;
}

interface ColorObservation {
  observation: string;
  result: string;
}

interface PHData {
  pHValue: string;
  pHRange: string;
}

interface DensityData {
  column: string;
  density: string;
}

interface ParticleSizeEntry {
  sieveSize: string;
  weightRetained: string;
  percentRetained: string;
  cumulativeRetained: string;
  percentFiner: string;
}

interface SoilConsistency {
  stickiness: string;
  plasticity: string;
}

interface SoilTexture {
  sand: string;
  silt: string;
  clay: string;
  textureClass: string;
}
interface MetalConcentration {
  Zn: string;
  Cu: string;
  Fe: string;
  Mn: string;
}

interface LocationSoilData {
  MicroscopeExamination: Record<"Block" | "Playground" | "Agriculture", ExaminationResult>;
  ColorExaminationDry: Record<"Block" | "Playground" | "Agriculture", ColorObservation>;
  ColorExaminationWet: Record<"Block" | "Playground" | "Agriculture", ColorObservation>;
  PHExamination: Record<"Block" | "Playground" | "Agriculture", PHData>;
  DensityExamination: Record<"Block" | "Playground" | "Agriculture", DensityData>;
  ParticleSizeDistribution: Record<"Block" | "Playground" | "Agriculture", ParticleSizeEntry[]>;
  PercentageOrganicContent: Record<"Block" | "Playground" | "Agriculture", string>;
  SoilConsistencyEstimation: Record<"Block" | "Playground" | "Agriculture", SoilConsistency>;
  SoilTextureExamination: Record<"Block" | "Playground" | "Agriculture", SoilTexture>;
  HeavyMetalConcentration: Record<"Block" | "Playground" | "Agriculture", MetalConcentration>;
}

interface SoilDataJSON {
  [locationName: string]: LocationSoilData;
}
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

export default function SoilAnalysisPage() {
  const { location } = useParams();
  const [soilData, setSoilData] = useState<LocationSoilData | null>(null);

  useEffect(() => {
    fetch("/data/soil-analysis-data.json")
      .then((res) => res.json())
      .then((data: SoilDataJSON) => {
        if (location && data[location as string]) {
          setSoilData(data[location as string]);
        }
      })
      .catch((error) => console.error("Error loading soil data:", error));
  }, [location]);

  const locations: Array<"Block" | "Playground" | "Agriculture"> = [
    "Block",
    "Playground",
    "Agriculture",
  ];

  if (!soilData) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
        <p>Loading soil analysis...</p>
      </div>
    );
  }

  const renderByLocation = (
    title: string,
    renderFn: (loc: "Block" | "Playground" | "Agriculture") => React.ReactNode
  ) => (
    <Accordion sx={{ backgroundColor: '#F1F5F9' }}>
      <AccordionSummary sx={{
        backgroundColor: '#add8e6',
        color: '#000',
        '&:hover': {
          backgroundColor: '#f0f8ff',
        },
      }} expandIcon={<ExpandMoreIcon sx={{ color: '#000' }} />}>
        <Typography sx={{ color: '#000' }} variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ color: '#374151' }}>
        {locations.map((loc) => (
          <div key={loc} style={{ marginBottom: "1rem" }}>
            <Typography variant="subtitle1">{loc}</Typography>
            {renderFn(loc)}
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "1rem" }}>
      <h1 style={{ margin: "auto", padding: "1rem", textAlign: "center", fontSize: "20px" }}>
        Soil Analysis for <b>{location}</b>
      </h1>

      {renderByLocation("Microscope Examination", (loc) => (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="microscope examination table">
            <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Result</TableCell>
                <TableCell sx={{ color: "#fff" }}>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{soilData.MicroscopeExamination[loc].result}</TableCell>
                <TableCell>
                  {soilData.MicroscopeExamination[loc].image ? (
                    <img
                      src={soilData.MicroscopeExamination[loc].image}
                      alt={`${loc} Microscope`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}

{renderByLocation("Color Examination - Dry", (loc) => (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table aria-label="color examination dry table">
      <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
        <TableRow>
          <TableCell sx={{ color: "#fff" }}>Result</TableCell>
          <TableCell sx={{ color: "#fff" }}>Observation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{soilData.ColorExaminationDry[loc].result}</TableCell>
          <TableCell>{soilData.ColorExaminationDry[loc].observation}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
))}


{renderByLocation("Color Examination - Wet", (loc) => (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table aria-label="color examination wet table">
      <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
        <TableRow>
          <TableCell sx={{ color: "#fff" }}>Result</TableCell>
          <TableCell sx={{ color: "#fff" }}>Observation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{soilData.ColorExaminationWet[loc].result}</TableCell>
          <TableCell>{soilData.ColorExaminationWet[loc].observation}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
))}


      {renderByLocation("pH Examination", (loc) => (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="pH examination table">
            <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>pH Value</TableCell>
                <TableCell sx={{ color: "#fff" }}>pH Range</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{soilData.PHExamination[loc].pHValue}</TableCell>
                <TableCell>{soilData.PHExamination[loc].pHRange}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}


     {renderByLocation("Density Examination", (loc) => (
       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
         <Table aria-label="density examination table">
           <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
             <TableRow>
               <TableCell sx={{ color: "#fff" }}>Column</TableCell>
               <TableCell sx={{ color: "#fff" }}>Density</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             <TableRow>
               <TableCell>{soilData.DensityExamination[loc].column}</TableCell>
               <TableCell>{soilData.DensityExamination[loc].density}</TableCell>
             </TableRow>
           </TableBody>
         </Table>
       </TableContainer>
     ))}


      {renderByLocation("Particle Size Distribution", (loc) => (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="particle size table">
            <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Sieve Size</TableCell>
                <TableCell sx={{ color: "#fff" }}>Weight Retained</TableCell>
                <TableCell sx={{ color: "#fff" }}>% Retained</TableCell>
                <TableCell sx={{ color: "#fff" }}>Cumulative %</TableCell>
                <TableCell sx={{ color: "#fff" }}>% Finer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soilData.ParticleSizeDistribution[loc].map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{entry.sieveSize}</TableCell>
                  <TableCell>{entry.weightRetained}</TableCell>
                  <TableCell>{entry.percentRetained}</TableCell>
                  <TableCell>{entry.cumulativeRetained}</TableCell>
                  <TableCell>{entry.percentFiner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}

      {renderByLocation("Percentage Organic Content", (loc) => (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="percentage organic content table">
            <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Location</TableCell>
                <TableCell sx={{ color: "#fff" }}>Organic Content (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{loc}</TableCell>
                <TableCell>{soilData.PercentageOrganicContent[loc]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}


      {renderByLocation("Soil Consistency Estimation", (loc) => (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="soil consistency table">
            <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Location</TableCell>
                <TableCell sx={{ color: "#fff" }}>Stickiness</TableCell>
                <TableCell sx={{ color: "#fff" }}>Plasticity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{loc}</TableCell>
                <TableCell>{soilData.SoilConsistencyEstimation[loc].stickiness}</TableCell>
                <TableCell>{soilData.SoilConsistencyEstimation[loc].plasticity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}


{renderByLocation("Soil Texture Examination", (loc) => (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table aria-label="soil texture table">
      <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
        <TableRow>
          <TableCell sx={{ color: "#fff" }}>Location</TableCell>
          <TableCell sx={{ color: "#fff" }}>Sand (%)</TableCell>
          <TableCell sx={{ color: "#fff" }}>Silt (%)</TableCell>
          <TableCell sx={{ color: "#fff" }}>Clay (%)</TableCell>
          <TableCell sx={{ color: "#fff" }}>Texture Class</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{loc}</TableCell>
          <TableCell>{soilData.SoilTextureExamination[loc].sand}</TableCell>
          <TableCell>{soilData.SoilTextureExamination[loc].silt}</TableCell>
          <TableCell>{soilData.SoilTextureExamination[loc].clay}</TableCell>
          <TableCell>{soilData.SoilTextureExamination[loc].textureClass}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
))}

{renderByLocation("Heavy Metal Concentration", (loc) => (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table aria-label="soil texture table">
      <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
        <TableRow>

          <TableCell sx={{ color: "#fff" }}>Zn</TableCell>
          <TableCell sx={{ color: "#fff" }}>Cu</TableCell>
          <TableCell sx={{ color: "#fff" }}>Fe</TableCell>
          <TableCell sx={{ color: "#fff" }}>Mn</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>

          <TableCell>{soilData.HeavyMetalConcentration[loc].Zn}</TableCell>
          <TableCell>{soilData.HeavyMetalConcentration[loc].Cu}</TableCell>
          <TableCell>{soilData.HeavyMetalConcentration[loc].Fe}</TableCell>
          <TableCell>{soilData.HeavyMetalConcentration[loc].Mn}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
))}
{/* Accordion to display the Peak Samples Table */}
      <Accordion sx={{ backgroundColor: "#F1F5F9" }}>
        <AccordionSummary
          sx={{
            backgroundColor: "#add8e6",
            color: "#000",
            "&:hover": {
              backgroundColor: "#f0f8ff",
            },
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
        >
          <Typography sx={{ color: "#000" }} variant="h6">
            ATR-FTIR Data Interpretation
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#374151" }}>
          {/* Table inside Accordion */}
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1E3A8A" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Peak (cm–1)</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Peak Regions (cm–1)</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Minerals</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Soil Samples</TableCell>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
