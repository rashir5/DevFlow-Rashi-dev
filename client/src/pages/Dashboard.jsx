import { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import EntryTable from "../components/EntryTable";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("API_URL =", API_URL);

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("devflow-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    workedOn: "",
    learned: "",
    blockers: "",
  });
  const [savedMsg, setSavedMsg] = useState("");
  const [saveError, setSaveError] = useState("");

  function getRequestErrorMessage(err, fallbackMessage) {
    return err.message === fallbackMessage ? fallbackMessage : "Network error";
  }

  async function load() {
    setLoading(true);
    setLoadError("");

    try {
      const res = await fetch(`${API_URL}/entries`);

      if (!res.ok) {
        throw new Error("Failed to load entries");
      }

      setEntries(await res.json());
    } catch (err) {
      setLoadError(getRequestErrorMessage(err, "Failed to load entries"));
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setSaveError("");
    setSavedMsg("");

    try {
      const res = await fetch(`${API_URL}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save entry");
      }

      setSavedMsg("Saved");
      setTimeout(() => setSavedMsg(""), 1500);

      setForm({ ...form, workedOn: "", learned: "", blockers: "" });
      load();
    } catch (err) {
      setSaveError(getRequestErrorMessage(err, "Failed to save entry"));
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadEntries() {
      setLoading(true);
      setLoadError("");

      try {
        const res = await fetch(`${API_URL}/entries`);

        if (!res.ok) {
          throw new Error("Failed to load entries");
        }

        const data = await res.json();

        if (!ignore) {
          setEntries(data);
        }
      } catch (err) {
        if (!ignore) {
          setLoadError(getRequestErrorMessage(err, "Failed to load entries"));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("devflow-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <main className="dashboard-shell">
      <div className="theme-control">
        <span className="theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
        <button
          className="theme-switch"
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          <span className="theme-switch-track">
            <span className="theme-switch-thumb" />
          </span>
        </button>
      </div>

      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Daily engineering journal</span>
          <h1>DevFlow</h1>
          <p className="hero-copy">
            Capture progress, learning, and blockers in one clean workspace.
          </p>
        </div>

        <div className="hero-panel">
          <span className="hero-stat-label">Entries tracked</span>
          <strong className="hero-stat-value">{entries.length}</strong>
          <p className="hero-stat-copy">
            A focused snapshot of what moved forward today.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <EntryForm
          form={form}
          savedMsg={savedMsg}
          saveError={saveError}
          onChange={setForm}
          onSubmit={submit}
        />
        <EntryTable entries={entries} loading={loading} error={loadError} />
      </section>
    </main>
  );
}
