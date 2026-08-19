'use client';

import * as React from 'react';

const CODE128_START_B = 104;
const CODE128_STOP = 106;
const CODE128_B_PATTERNS: number[] = [
  1740, 1644, 1638, 1176, 1164, 1100, 1224, 1220, 1124, 1608, 1604, 1572,
  1436, 1244, 1230, 1484, 1260, 1254, 1650, 1628, 1614, 1764, 1652, 1902,
  1868, 1836, 1830, 1892, 1844, 1842, 1752, 1734, 1590, 1304, 1118, 1112,
  1094, 1416, 1128, 1122, 1672, 1576, 1570, 1464, 1412, 1268, 1266, 1588,
  1556, 1142, 1114, 1110, 1106, 1788, 1762, 1746, 1742, 1738, 1518, 1502,
  1494, 1490, 1482, 1474, 1430, 1406, 1402, 1364, 1358, 1352, 1344, 1214,
  1182, 1174, 1086, 1082, 1074, 1974, 1612, 1516, 1508, 1500, 1498, 1492,
  1486, 1480, 1478, 1470, 1462, 1454, 1446, 1414, 1398, 1388, 1382, 1368,
  1362, 1354, 1348, 1346, 1342, 1222, 1206, 1198, 1192, 1186, 1158, 1150,
  1148, 1134, 1130, 1126,
];

function code128Encode(text: string): number[] {
  const codes: number[] = [CODE128_START_B];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 32 && c <= 127) {
      codes.push(c - 32);
    } else {
      codes.push(75);
    }
  }
  let checksum = codes[0];
  for (let i = 1; i < codes.length; i++) {
    checksum += codes[i] * i;
  }
  checksum = checksum % 103;
  codes.push(checksum);
  codes.push(CODE128_STOP);
  return codes;
}

function patternToBars(pattern: number): boolean[] {
  const bars: boolean[] = [];
  let bit = 10;
  while (bit >= 0) {
    bars.push(((pattern >> bit) & 1) === 1);
    bit--;
  }
  return bars;
}

export interface Code128SvgProps {
  value: string;
  heightPx?: number;
  barWidthPx?: number;
  showText?: boolean;
  fontSizePx?: number;
  quietZonePx?: number;
}

export function Code128Svg({
  value,
  heightPx = 40,
  barWidthPx = 1,
  showText = true,
  fontSizePx = 10,
  quietZonePx = 4,
}: Code128SvgProps) {
  const text = value?.trim() ?? '';
  const codes = React.useMemo(() => code128Encode(text), [text]);
  const { viewBoxWidth, barWidth, totalWidth, textOffsetY } = React.useMemo(() => {
    const totalBars = codes.length * 11 + 2;
    const qz = Math.max(0, quietZonePx);
    const w = totalBars * barWidthPx + qz * 2;
    const h = heightPx + (showText ? fontSizePx + 2 : 0);
    return {
      viewBoxWidth: w,
      barWidth: barWidthPx,
      totalWidth: w,
      textOffsetY: heightPx + fontSizePx,
      _totalHeight: h,
    };
  }, [codes.length, barWidthPx, heightPx, showText, fontSizePx, quietZonePx]);
  const totalHeight = heightPx + (showText ? fontSizePx + 2 : 0);
  const pathParts: string[] = [];
  let x = quietZonePx;
  codes.forEach((code, idx) => {
    const pattern = code < CODE128_B_PATTERNS.length ? CODE128_B_PATTERNS[code] : (idx === codes.length - 1 ? 6371 : 1740);
    const bars = patternToBars(pattern);
    bars.forEach((b) => {
      if (b) {
        pathParts.push(`M${x.toFixed(2)},0 h${barWidth.toFixed(2)} v${heightPx} h-${barWidth.toFixed(2)} z`);
      }
      x += barWidth;
    });
  });
  if (codes.length > 0) {
    const last = patternToBars(6371).slice(0, 2);
    last.forEach((b) => {
      if (b) {
        pathParts.push(`M${x.toFixed(2)},0 h${barWidth.toFixed(2)} v${heightPx} h-${barWidth.toFixed(2)} z`);
      }
      x += barWidth;
    });
  }
  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      viewBox={`0 0 ${viewBoxWidth} ${totalHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Barcode: ${text}`}
    >
      <rect width="100%" height="100%" fill="#ffffff" />
      <path d={pathParts.join(' ')} fill="#000000" shapeRendering="crispEdges" />
      {showText && (
        <text
          x={viewBoxWidth / 2}
          y={textOffsetY}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={fontSizePx}
          fill="#000000"
          letterSpacing="1"
        >
          {text}
        </text>
      )}
    </svg>
  );
}
