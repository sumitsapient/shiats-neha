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
}

interface SoilDataJSON {
  [locationName: string]: LocationSoilData;
}

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

    </div>
  );
}
