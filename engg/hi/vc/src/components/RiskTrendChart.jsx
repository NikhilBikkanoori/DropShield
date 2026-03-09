import React from 'react';

/**
 * A highly styled SVG-based trend chart for risk prediction.
 * Features:
 * - Smooth cubic bezier interpolation
 * - Gradient area filling
 * - Grid lines and data points
 */
const RiskTrendChart = ({
    data = [],
    color = '#A2F4F9',
    height = 180,
    width = '100%',
    maxVal = 100,
    minVal = 0
}) => {
    if (!data || data.length < 2) return <div style={{ height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7b7b8a' }}>Insufficient data</div>;

    const padding = 20;
    const svgWidth = 400; // Reference coordinate system
    const svgHeight = 200;

    const innerWidth = svgWidth - (padding * 2);
    const innerHeight = svgHeight - (padding * 2);

    // Scaling functions
    const xLoc = (idx) => padding + (idx * (innerWidth / (data.length - 1)));
    const yLoc = (val) => {
        const ratio = (val - minVal) / (maxVal - minVal);
        return padding + (innerHeight - (ratio * innerHeight));
    };

    // Generate path points
    const points = data.map((val, i) => ({ x: xLoc(i), y: yLoc(val) }));

    // Generate smooth cubic bezier path
    const getPath = () => {
        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            const cp1y = p0.y;
            const cp2x = p0.x + (p1.x - p0.x) / 2;
            const cp2y = p1.y;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
        }
        return d;
    };

    const linePath = getPath();
    const areaPath = `${linePath} V ${svgHeight - padding} H ${padding} Z`;

    return (
        <div style={{ width, height, position: 'relative' }}>
            <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                    <line
                        key={tick}
                        x1={padding}
                        y1={padding + (tick * innerHeight)}
                        x2={svgWidth - padding}
                        y2={padding + (tick * innerHeight)}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}

                {/* Area Fill */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Main Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#262C53"
                        stroke={color}
                        strokeWidth="2"
                    />
                ))}
            </svg>
        </div>
    );
};

export default RiskTrendChart;
