"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./screener.css";

const API_BASE = process.env.NEXT_PUBLIC_STOCK_API_URL || "https://stock-tool-tctq.onrender.com";

// Pulled directly from EquityQuery.valid_values on the backend (Yahoo
// validates against these exact strings, including the em dash "—" - not
// a hyphen - in names like "Software—Application"). This is a curated
// subset spanning multiple sectors, not the full list Yahoo supports.
const INDUSTRIES = [
  "Software\u2014Application",
  "Software\u2014Infrastructure",
  "Semiconductors",
  "Consumer Electronics",
  "Internet Content & Information",
  "Biotechnology",
  "Drug Manufacturers\u2014General",
  "Banks\u2014Regional",
  "Banks\u2014Diversified",
  "Insurance\u2014Diversified",
  "Oil & Gas E&P",
  "Utilities\u2014Regulated Electric",
  "Utilities\u2014Renewable",
  "Auto Manufacturers",
  "Aerospace & Defense",
  "Apparel Retail",
  "Restaurants",
  "Real Estate Services",
  "Asset Management",
  "Medical Devices",
  "Airlines",
  "REIT\u2014Residential",
  "Entertainment",
  "Packaged Foods",
];

// Each numeric filter gets a min slider + max slider, both mapped from a
// 0-100 slider position onto the field's real-world range. Market cap and
// volume use a log scale since they span many orders of magnitude - a
// linear slider would make it nearly impossible to select, say, $2B
// precisely when the top of the range is $3T.
const FILTERS = {
  marketCap: { label: "Market Cap", min: 0, max: 3_000_000_000_000, log: true, format: (v) => `$${(v / 1e9).toFixed(1)}B` },
  price: { label: "Price", min: 0, max: 2000, log: false, format: (v) => `$${v.toFixed(0)}` },
  beta: { label: "Beta", min: -2, max: 5, log: false, format: (v) => v.toFixed(2) },
  volume: { label: "Volume", min: 0, max: 500_000_000, log: true, format: (v) => v.toLocaleString() },
  dividend: { label: "Dividend Yield", min: 0, max: 15, log: false, format: (v) => `${v.toFixed(1)}%` },
  pe: { label: "P/E Ratio", min: 0, max: 100, log: false, format: (v) => v.toFixed(1) },
};

// Converts a 0-100 slider position to a real value, using a log curve for
// fields where that's enabled so precision is spread more usefully across
// the range (most stocks cluster at the smaller end of market cap/volume).
function sliderToValue(pos, { min, max, log }) {
  if (!log) return min + (pos / 100) * (max - min);
  const minLog = Math.log(Math.max(min, 1));
  const maxLog = Math.log(max);
  return Math.exp(minLog + (pos / 100) * (maxLog - minLog));
}

function valueToSlider(value, { min, max, log }) {
  if (!log) return ((value - min) / (max - min)) * 100;
  const minLog = Math.log(Math.max(min, 1));
  const maxLog = Math.log(max);
  return ((Math.log(Math.max(value, 1)) - minLog) / (maxLog - minLog)) * 100;
}

function RangeFilter({ filterKey, config, range, onChange }) {
  const minPos = valueToSlider(range.min, config);
  const maxPos = valueToSlider(range.max, config);

  function handleMinChange(pos) {
    const value = sliderToValue(Number(pos), config);
    onChange(filterKey, { ...range, min: Math.min(value, range.max) });
  }

  function handleMaxChange(pos) {
    const value = sliderToValue(Number(pos), config);
    onChange(filterKey, { ...range, max: Math.max(value, range.min) });
  }

  return (
    <div className="screener-filter">
      <div className="screener-filter-label">
        {config.label}: {config.format(range.min)} – {config.format(range.max)}
      </div>
      <div className="screener-filter-sliders">
        <input type="range" min={0} max={100} value={minPos} onChange={(e) => handleMinChange(e.target.value)} />
        <input type="range" min={0} max={100} value={maxPos} onChange={(e) => handleMaxChange(e.target.value)} />
      </div>
    </div>
  );
}

export default function Screener() {
  const router = useRouter();

  const [ranges, setRanges] = useState(
    Object.fromEntries(Object.entries(FILTERS).map(([key, cfg]) => [key, { min: cfg.min, max: cfg.max }]))
  );
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function updateRange(key, newRange) {
    setRanges((prev) => ({ ...prev, [key]: newRange }));
  }

  function toggleIndustry(name) {
    setSelectedIndustries((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  }

  async function runScreen() {
    setLoading(true);
    setError(null);
    setResults(null);

    // Only send a filter if it's been moved away from its full default
    // range - otherwise every search would send every field to the API.
    function isDefault(key) {
      const cfg = FILTERS[key];
      return ranges[key].min === cfg.min && ranges[key].max === cfg.max;
    }

    const params = new URLSearchParams();
    if (!isDefault("marketCap")) {
      params.set("market_cap_more_than", Math.round(ranges.marketCap.min));
      params.set("market_cap_lower_than", Math.round(ranges.marketCap.max));
    }
    if (!isDefault("price")) {
      params.set("price_more_than", ranges.price.min.toFixed(2));
      params.set("price_lower_than", ranges.price.max.toFixed(2));
    }
    if (!isDefault("beta")) {
      params.set("beta_more_than", ranges.beta.min.toFixed(2));
      params.set("beta_lower_than", ranges.beta.max.toFixed(2));
    }
    if (!isDefault("volume")) {
      params.set("volume_more_than", Math.round(ranges.volume.min));
      params.set("volume_lower_than", Math.round(ranges.volume.max));
    }
    if (!isDefault("dividend")) {
      params.set("dividend_more_than", ranges.dividend.min.toFixed(2));
      params.set("dividend_lower_than", ranges.dividend.max.toFixed(2));
    }
    if (!isDefault("pe")) {
      params.set("pe_more_than", ranges.pe.min.toFixed(1));
      params.set("pe_lower_than", ranges.pe.max.toFixed(1));
    }
    if (selectedIndustries.length > 0) {
      params.set("industries", selectedIndustries.join(","));
    }
    params.set("limit", "25");

    try {
      const res = await fetch(`${API_BASE}/screen?${params.toString()}`);
      if (!res.ok) throw new Error("Screener request failed - try widening your filters");
      const json = await res.json();
      setResults(json.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function goToTicker(symbol) {
    router.push(`/projects/stocktool?ticker=${symbol}`);
  }

  function formatMarketCap(v) {
    if (!v) return "N/A";
    return `$${(v / 1e9).toFixed(1)}B`;
  }

  return (
    <div className="page">
      <div className="screener-header">
        <h2>Stock / ETF / Fund Screener</h2>
        <p>Set your criteria and find the top 25 matches by market cap.</p>
        <Link href="/projects/stocktool" className="screener-nav-link">
          ← Back to Ticker Lookup
        </Link>
      </div>

      <div className="screener-filters-grid">
        {Object.entries(FILTERS).map(([key, config]) => (
          <RangeFilter key={key} filterKey={key} config={config} range={ranges[key]} onChange={updateRange} />
        ))}
      </div>

      <h3 className="screener-section-title">Industries (optional)</h3>
      <div className="screener-industry-checklist">
        {INDUSTRIES.map((name) => (
          <label key={name}>
            <input
              type="checkbox"
              checked={selectedIndustries.includes(name)}
              onChange={() => toggleIndustry(name)}
            />
            {name}
          </label>
        ))}
      </div>

      <button className="screener-run-button" onClick={runScreen}>
        Run Screen
      </button>

      {loading && <p className="screener-loading">Searching...</p>}
      {error && <p className="screener-error">{error}</p>}

      {results && (
        <div className="screener-results-table-container">
          {results.length === 0 ? (
            <p className="screener-loading">No matches - try widening your filters.</p>
          ) : (
            <table className="screener-results-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Sector</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  {results.some((r) => r.pe !== undefined) && <th>P/E</th>}
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.symbol} onClick={() => goToTicker(r.symbol)} className="screener-row">
                    <td>{r.symbol}</td>
                    <td>{r.companyName}</td>
                    <td>{r.sector || "—"}</td>
                    <td>{r.price ? `$${r.price}` : "—"}</td>
                    <td>{formatMarketCap(r.marketCap)}</td>
                    {results.some((row) => row.pe !== undefined) && <td>{r.pe?.toFixed(1) ?? "—"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
