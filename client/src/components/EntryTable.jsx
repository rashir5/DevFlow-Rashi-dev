export default function EntryTable({ entries, loading, error }) {
  return (
    <article className="panel panel-table">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">History</span>
          <h2>Saved entries</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table className="entries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Worked On</th>
              <th>Learned</th>
              <th>Blockers</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="empty-state" colSpan={4}>
                  Loading entries...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="empty-state" colSpan={4}>
                  {error}
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td className="empty-state" colSpan={4}>
                  No entries yet.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry._id}>
                  <td className="date-cell">{entry.date}</td>
                  <td>{entry.workedOn || "-"}</td>
                  <td>{entry.learned || "-"}</td>
                  <td>{entry.blockers || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
