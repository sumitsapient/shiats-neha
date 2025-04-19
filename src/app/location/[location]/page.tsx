"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
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
                              backgroundColor: '#1E3A8A',
                              color: '#FFFFFF',
                              '&:hover': {
                                backgroundColor: '#1E40AF', // Darker shade on hover
                              },
                            }} expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ color: '#FFFFFF' }} variant="h6">{title}</Typography>
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
      <h1 style={{ margin: "auto", padding: "1rem",textAlign:"center" ,fontSize:"20px"}}>Soil Analysis for <b>{location}</b></h1>

      {renderByLocation("Microscope Examination", (loc) => (
        <div>
          <p>{soilData.MicroscopeExamination[loc].result}</p>
          {soilData.MicroscopeExamination[loc].image && (
            <img
              src={soilData.MicroscopeExamination[loc].image}
              alt={`${loc} Microscope`}
              style={{ maxWidth: "100%", marginTop: "0.5rem" }}
            />
          )}
        </div>
      ))}

      {renderByLocation("Color Examination - Dry", (loc) => (
        <>
          <p>Result: {soilData.ColorExaminationDry[loc].result}</p>
          <p>Observation: {soilData.ColorExaminationDry[loc].observation}</p>
        </>
      ))}

      {renderByLocation("Color Examination - Wet", (loc) => (
        <>
          <p>Result: {soilData.ColorExaminationWet[loc].result}</p>
          <p>Observation: {soilData.ColorExaminationWet[loc].observation}</p>
        </>
      ))}

      {renderByLocation("pH Examination", (loc) => (
        <>
          <p>pH Value: {soilData.PHExamination[loc].pHValue}</p>
          <p>pH Range: {soilData.PHExamination[loc].pHRange}</p>
        </>
      ))}

      {renderByLocation("Density Examination", (loc) => (
        <>
          <p>Column: {soilData.DensityExamination[loc].column}</p>
          <p>Density: {soilData.DensityExamination[loc].density}</p>
        </>
      ))}

      {renderByLocation("Particle Size Distribution", (loc) => (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Sieve Size</th>
              <th>Weight Retained</th>
              <th>% Retained</th>
              <th>Cumulative %</th>
              <th>% Finer</th>
            </tr>
          </thead>
          <tbody>
            {soilData.ParticleSizeDistribution[loc].map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.sieveSize}</td>
                <td>{entry.weightRetained}</td>
                <td>{entry.percentRetained}</td>
                <td>{entry.cumulativeRetained}</td>
                <td>{entry.percentFiner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      {renderByLocation("Percentage Organic Content", (loc) => (
        <p>{soilData.PercentageOrganicContent[loc]}</p>
      ))}

      {renderByLocation("Soil Consistency Estimation", (loc) => (
        <>
          <p>Stickiness: {soilData.SoilConsistencyEstimation[loc].stickiness}</p>
          <p>Plasticity: {soilData.SoilConsistencyEstimation[loc].plasticity}</p>
        </>
      ))}

      {renderByLocation("Soil Texture Examination", (loc) => (
        <>
          <p>Sand: {soilData.SoilTextureExamination[loc].sand}</p>
          <p>Silt: {soilData.SoilTextureExamination[loc].silt}</p>
          <p>Clay: {soilData.SoilTextureExamination[loc].clay}</p>
          <p>Texture Class: {soilData.SoilTextureExamination[loc].textureClass}</p>
        </>
      ))}
    </div>
  );
}
