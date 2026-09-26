const fieldConfig = [
  {
    key: "workedOn",
    label: "Worked on",
    placeholder: "Shipped features, fixed issues, reviewed PRs...",
  },
  {
    key: "learned",
    label: "Learned",
    placeholder: "New patterns, tools, technical takeaways...",
  },
  {
    key: "blockers",
    label: "Blockers",
    placeholder: "Dependencies, unknowns, anything slowing progress...",
  },
];

export default function EntryForm({
  form,
  savedMsg,
  saveError,
  onChange,
  onSubmit,
}) {
  return (
    <article className="panel panel-form">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">New entry</span>
          <h2>Log today&apos;s work</h2>
        </div>
        <div className="date-chip">{form.date}</div>
      </div>

      <form onSubmit={onSubmit} className="entry-form">
        <label className="field-group">
          <span className="field-label">Date</span>
          <input
            className="field-input"
            value={form.date}
            type="date"
            onChange={(e) => onChange({ ...form, date: e.target.value })}
          />
        </label>

        {fieldConfig.map((field) => (
          <label className="field-group" key={field.key}>
            <span className="field-label">{field.label}</span>
            <textarea
              className="field-input field-textarea"
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={(e) =>
                onChange({ ...form, [field.key]: e.target.value })
              }
            />
          </label>
        ))}

        <div className="form-footer">
          <button className="primary-button" type="submit">
            Save Entry
          </button>
          <span
            className={`status-message${
              savedMsg || saveError ? " visible" : ""
            }${saveError ? " error" : ""}`}
          >
            {savedMsg || saveError || "Saved"}
          </span>
        </div>
      </form>
    </article>
  );
}
