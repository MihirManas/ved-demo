"use client";

import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// Reliable TopoJSON for India states
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

export default function IndiaMapWidget({ data }: { data: { name: string, value: number }[] }) {
  const [tooltipContent, setTooltipContent] = useState("");

  const colorScale = useMemo(() => {
    const maxVal = Math.max(...data.map(d => d.value), 1);
    return scaleLinear<string>()
      .domain([0, maxVal])
      .range(["#2a2a2a", "#E6C875"]);
  }, [data]);

  const dataMap = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(d => {
      // Normalize names a bit just in case
      map[d.name.toLowerCase()] = d.value;
    });
    return map;
  }, [data]);

  return (
    <div className="w-full h-full min-h-[400px] relative flex flex-col items-center">
      
      {tooltipContent && (
        <div className="absolute top-4 bg-black border border-neutral-700 text-white px-3 py-2 rounded-xl shadow-lg z-10 text-sm pointer-events-none transform -translate-x-1/2 left-1/2">
          {tooltipContent}
        </div>
      )}

      <div className="w-full flex-1 relative overflow-hidden flex justify-center items-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 850,
            center: [80, 22] // Center roughly over India
          }}
          className="w-full h-full max-h-[500px]"
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.NAME_1 || geo.properties.name || "";
                const val = dataMap[stateName.toLowerCase()] || 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={val ? colorScale(val) : "#1a1a1a"}
                    stroke="#333"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "all 250ms" },
                      hover: { fill: "#f0dfa8", outline: "none", cursor: "pointer", transition: "all 250ms" },
                      pressed: { outline: "none" }
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(`${stateName}: ${val} visits`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      <div className="w-full flex justify-between items-center text-xs text-neutral-500 mt-4 px-4">
        <span>Low Traffic</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-[#2a2a2a] to-[#E6C875] mx-4 rounded-full"></div>
        <span>High Traffic</span>
      </div>
    </div>
  );
}
