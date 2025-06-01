export default function InfoTablas ({ title, headers, data }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="overflow-auto">
        <table className="border border-gray-100 table-fixed">
          <thead>
            <tr className="border-green-200 bg-green-100">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="border border-gray-100 px-2 py-1 text-sm text-left font-medium w-40"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="bg-white">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border border-gray-100 px-2 py-1 text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}