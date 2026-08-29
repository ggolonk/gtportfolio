"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./stocktool.css";

// Point this at your deployed FastAPI backend (e.g. https://stocktool-api.onrender.com)
const API_BASE = process.env.NEXT_PUBLIC_STOCK_API_URL || "http://localhost:8000";

const PERIOD_OPTIONS = [
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
  { label: "2Y", value: "2y" },
  { label: "5Y", value: "5y" },
  { label: "10Y", value: "10y" },
];

const BENCHMARKS = ["S&P 500", "NASDAQ", "Dow Jones", "Russell 2000"];

const FIELD_LABELS = {
  name: "Name",
  price: "Price",
  market_cap: "Market Cap",
  pe_ratio: "P/E Ratio",
  "52w_high": "52W High",
  "52w_low": "52W Low",
  dividend_yield: "Dividend Yield",
  sector: "Sector",
  asset_type: "Type",
};

function formatValue(field, value) {
  if (value === null || value === undefined) return "N/A";
  if (field === "market_cap") return `$${(value / 1e9).toFixed(2)}B`;
  if (field === "dividend_yield") return `${value}%`;
  if (field === "price" || field === "52w_high" || field === "52w_low") return `$${value}`;
  return value;
}

// Reads a CSS custom property's resolved value (e.g. "--primary") so it can
// be passed to Recharts, which needs an actual color string, not "var(...)".
function useCssVar(varName, fallback = "#111") {
  const [color, setColor] = useState(fallback);
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    if (value) setColor(value);
  }, [varName]);
  return color;
}

function StockToolInner() {
  const [ticker, setTicker] = useState("");
  const [searchedTicker, setSearchedTicker] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [compareTicker, setCompareTicker] = useState("");
  const [selectedBenchmarks, setSelectedBenchmarks] = useState(["S&P 500"]);
  const [periodIndex, setPeriodIndex] = useState(3); // default "1Y"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const period = PERIOD_OPTIONS[periodIndex].value;
  const primaryColor = useCssVar("--primary", "rgb(28, 87, 38)");
  const searchParams = useSearchParams();

  // Built from the actual variables in globals.css - no --accent/--secondary
  // exist there, so this uses --primary plus its light/dark variants and the
  // semantic warning/error colors, which together give visually distinct lines.
  const compareColors = [
    useCssVar("--primary", "rgb(28, 87, 38)"),
    useCssVar("--error", "rgb(87, 28, 28)"),
    useCssVar("--warning", "rgb(87, 87, 28)"),
    useCssVar("--primary-light", "rgb(40, 126, 55)"),
    useCssVar("--primary-dark", "rgb(16, 48, 21)"),
    useCssVar("--copy-light", "rgb(97, 107, 99)"),
    useCssVar("--copy-lighter", "rgb(135, 146, 136)"),
  ];

  // Shared by both the manual search form and the ?ticker=XYZ auto-search
  // below, so a screener row click and a typed search behave identically.
  const runSearch = useCallback(async (symbol) => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    setCompareData(null);

    try {
      const stockRes = await fetch(`${API_BASE}/stock/${symbol}`);
      if (!stockRes.ok) throw new Error(`Couldn't find data for "${symbol}"`);
      const stockJson = await stockRes.json();

      setStockData(stockJson);
      setSearchedTicker(symbol); // triggers the history-loading effect below
    } catch (err) {
      setError(err.message);
      setStockData(null);
      setHistoryData(null);
      setSearchedTicker(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search when arriving via a link like /projects/stocktool?ticker=AAPL
  // (e.g. clicking a row in the screener results table).
  useEffect(() => {
    const paramTicker = searchParams.get("ticker");
    if (paramTicker) {
      const symbol = paramTicker.trim().toUpperCase();
      setTicker(symbol);
      runSearch(symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!ticker.trim()) return;
    runSearch(ticker.trim().toUpperCase());
  }

  // Re-fetches price history whenever the searched ticker OR the timeframe
  // slider changes. This is what makes the slider actually reload the chart -
  // it must live at the component's top level, not inside another function.
  useEffect(() => {
    if (!searchedTicker) return;

    async function updateHistory() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/history/${searchedTicker}?period=${period}`);
        if (!res.ok) throw new Error(`Couldn't find price history for "${searchedTicker}"`);
        const json = await res.json();
        setHistoryData(json.history);
      } catch (err) {
        setError(err.message);
        setHistoryData(null);
      } finally {
        setLoading(false);
      }
    }

    updateHistory();
  }, [periodIndex, searchedTicker]);

  async function handleCompare() {
    if (!searchedTicker) return;

    // Split on commas, trim whitespace, uppercase, drop empties, and
    // de-duplicate in case the user repeats a ticker or re-enters the
    // one already being viewed.
    const extraTickers = compareTicker
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);

    const tickers = [...new Set([searchedTicker, ...extraTickers])];

    if (selectedBenchmarks.length === 0 && tickers.length === 1) {
      setError("Select at least one benchmark or enter a comparison ticker.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        tickers: tickers.join(","),
        period,
      });
      if (selectedBenchmarks.length > 0) {
        params.set("benchmarks", selectedBenchmarks.join(","));
      }

      const res = await fetch(`${API_BASE}/compare?${params.toString()}`);
      if (!res.ok) throw new Error("Comparison failed - check the ticker symbol");
      const json = await res.json();

      // Reshape { dates, series: { AAPL: [...], "S&P 500": [...] } }
      // into an array of row objects for Recharts: [{ date, AAPL, "S&P 500" }, ...]
      const rows = json.dates.map((date, i) => {
        const row = { date };
        for (const [label, values] of Object.entries(json.series)) {
          row[label] = values[i];
        }
        return row;
      });

      setCompareData({ rows, seriesNames: Object.keys(json.series) });
    } catch (err) {
      setError(err.message);
      setCompareData(null);
    } finally {
      setLoading(false);
    }
  }

  function toggleBenchmark(name) {
    setSelectedBenchmarks((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );
  }

  return (
    <div className="page">
      <div className="stock-header">
        <h2>Stock / ETF / Fund Lookup</h2>
        <p>Search a ticker to see fundamentals, price history, and benchmark comparisons.</p>
        <Link href="/projects/screener" className="stock-nav-link">
          Looking for something specific? Try the Screener →
        </Link>
      </div>

      <form className="stock-search-row" onSubmit={handleSearch}>
        <input
          className="stock-search-input"
          type="text"
          placeholder="e.g. AAPL, SPY, VFIAX"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button className="stock-search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="stock-loading">Loading...</p>}
      {error && <p className="stock-error">{error}</p>}

      {stockData && (
        <div className="stock-summary-card">
          <div className="stock-summary-title">{stockData.fields.name?.yfinance || searchedTicker}</div>
          <div className="stock-summary-ticker">{searchedTicker}</div>
          <div className="stock-fields-grid">
            {Object.entries(stockData.fields)
              .filter(([field]) => field !== "name")
              .map(([field, values]) => {
                const primary = values.yfinance ?? values.fmp;
                const hasBoth = values.yfinance != null && values.fmp != null;
                return (
                  <div className="stock-field" key={field}>
                    <div className="stock-field-label">{FIELD_LABELS[field] || field}</div>
                    <div className="stock-field-value">{formatValue(field, primary)}</div>
                    {hasBoth && (
                      <div className="stock-field-crosscheck">
                        yfinance: {formatValue(field, values.yfinance)} · FMP: {formatValue(field, values.fmp)}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {searchedTicker && (
        <>
          <div className="stock-controls-row">
            <h2 className="stock-section-title">Timeframe</h2>
            <input
              className="stock-period-slider"
              type="range"
              min={0}
              max={PERIOD_OPTIONS.length - 1}
              step={1}
              value={periodIndex}
              onChange={(e) => setPeriodIndex(Number(e.target.value))}
            />
            <strong>{PERIOD_OPTIONS[periodIndex].label}</strong>
          </div>

          {historyData && (
            <div className="stock-chart-container">
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart key={`${searchedTicker}-${periodIndex}`} data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" minTickGap={40} />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Close" stroke={primaryColor} dot={false} name={`${searchedTicker} Close`} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          <h3 className="stock-section-title">Compare Against Benchmarks or Other Tickers</h3>
          <div className="stock-controls-row">
            <input
              className="stock-compare-input"
              type="text"
              placeholder="Optional: e.g. MSFT, GOOGL, TSLA"
              value={compareTicker}
              onChange={(e) => setCompareTicker(e.target.value)}
            />
            <button className="stock-search-button" type="button" onClick={handleCompare}>
              Run Comparison
            </button>
          </div>

          <div className="stock-benchmark-checkboxes">
            {BENCHMARKS.map((name) => (
              <label key={name}>
                <input
                  type="checkbox"
                  checked={selectedBenchmarks.includes(name)}
                  onChange={() => toggleBenchmark(name)}
                />
                {name}
              </label>
            ))}
          </div>

          {compareData && (
            <div className="stock-chart-container">
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart data={compareData.rows}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" minTickGap={40} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend />
                  {compareData.seriesNames.map((name, i) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={compareColors[i % compareColors.length]}
                      dot={false}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// useSearchParams() requires the component using it to be wrapped in
// Suspense - Next.js will throw a build error otherwise.
export default function StockTool() {
  return (
    <Suspense fallback={<div className="page"><p className="stock-loading">Loading...</p></div>}>
      <StockToolInner />
    </Suspense>
  );
}
