"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// Reliable GeoJSON for India states
const INDIA_GEO_JSON = "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

export default function IndiaMapWidget({ data }: { data: { name: string, value: number }[] }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  
  const minColor = isDark ? "#2a2a2a" : "#e5e7eb";
  const emptyColor = isDark ? "#1a1a1a" : "#f3f4f6";
  const strokeColor = isDark ? "#333" : "#d1d5db";
  
  const colorScale = useMemo(() => {
    const maxVal = Math.max(...data.map(d => d.value), 1);
    return scaleLinear<string>()
      .domain([0, maxVal])
      .range([minColor, "#E6C875"]);
  }, [data, minColor]);

  const dataMap = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(d => {
      // Normalize names a bit just in case
      map[d.name.toLowerCase()] = d.value;
    });
    return map;
  }, [data]);

  if (!mounted) return <div className="w-full h-full min-h-[400px]" />;

  return (
    <div className="w-full h-full min-h-[400px] relative flex flex-col items-center">
      
      {tooltipContent && (
        <div className="absolute top-4 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white px-3 py-2 rounded-xl shadow-lg z-10 text-sm pointer-events-none transform -translate-x-1/2 left-1/2">
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
          <Geographies geography={INDIA_GEO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.NAME_1 || geo.properties.name || "";
                const val = dataMap[stateName.toLowerCase()] || 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={val ? colorScale(val) : emptyColor}
                    stroke={strokeColor}
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
      
      <div className="w-full flex justify-between items-center text-xs text-gray-500 dark:text-neutral-500 mt-4 px-4">
        <span>Low Traffic</span>
        <div className={`flex-1 h-2 bg-gradient-to-r ${isDark ? 'from-[#2a2a2a]' : 'from-gray-200'} to-[#E6C875] mx-4 rounded-full`}></div>
        <span>High Traffic</span>
      </div>
    </div>
  );
}
