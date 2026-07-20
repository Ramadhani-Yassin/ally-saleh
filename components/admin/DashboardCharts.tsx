"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ArchiveWork } from "@/lib/archive-data";

type Props = {
  works: ArchiveWork[];
  isDark: boolean;
};

export function DashboardCharts({ works, isDark }: Props) {
  const axisColor = isDark ? "#9aaebf" : "#5a6f84";
  const gridColor = isDark ? "#2d313a" : "#e2e8f0";
  const tooltipBg = isDark ? "#1f2128" : "#ffffff";
  const tooltipBorder = isDark ? "#2d313a" : "#e2e8f0";
  const shortStoryColor = isDark ? "#3b82f6" : "#1a4d8c";
  const poetryColor = isDark ? "#a78bfa" : "#6b46c1";
  const resourceColor = isDark ? "#34d399" : "#047857";
  const lineColor = isDark ? "#48bb78" : "#2c7a4d";

  const categoryData = useMemo(() => {
    const poetry = works.filter((w) => w.category === "poetry").length;
    const shortStory = works.filter((w) => w.category === "short-story").length;
    const resource = works.filter((w) => w.category === "resource").length;
    const p = isDark ? "#a78bfa" : "#6b46c1";
    const s = isDark ? "#3b82f6" : "#1a4d8c";
    const r = isDark ? "#34d399" : "#047857";
    return [
      { name: "Poetry", value: poetry, fill: p },
      { name: "Short stories", value: shortStory, fill: s },
      { name: "Online", value: resource, fill: r },
    ];
  }, [works, isDark]);

  const barData = useMemo(
    () =>
      categoryData.map((d) => ({
        name: d.name,
        count: d.value,
      })),
    [categoryData]
  );

  const cumulativeData = useMemo(() => {
    return works.map((_, i) => ({
      step: i + 1,
      cumulative: i + 1,
    }));
  }, [works]);

  if (works.length === 0) {
    return (
      <p className="admin-chart-empty">
        Add works in Library to see charts.
      </p>
    );
  }

  return (
    <div className="admin-charts-section">
      <h2 className="admin-charts-heading">Publication insights</h2>
      <div className="admin-charts-grid">
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">By format (bar)</h3>
          <div className="admin-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        i === 0
                          ? poetryColor
                          : i === 1
                            ? shortStoryColor
                            : resourceColor
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card">
          <h3 className="admin-chart-title">Archive growth (line)</h3>
          <div className="admin-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="step" tick={{ fill: axisColor, fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  name="Cumulative entries"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card admin-chart-card--wide">
          <h3 className="admin-chart-title">By category (pie)</h3>
          <div className="admin-chart-area admin-chart-area--pie">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={88}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: tooltipBg,
                    border: `1px solid ${tooltipBorder}`,
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
