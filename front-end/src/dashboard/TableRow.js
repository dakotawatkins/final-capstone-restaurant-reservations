import React from "react";
import { finishTable } from "../utils/api";


/** a function to display an individual 'TableRow' with data (columns) shown below */
export default function TableRow({ table, loadDashboard }) {
  /** if no table or undefined, return nulll */
  if (!table) return null;


  /** handles finishing a seated table */
  function handleFinish() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      finishTable(table.table_id, abortController.signal).then(loadDashboard);
      return () => abortController.abort();
    }
  }
  

  /** displays a single table (row), which is mapped in tablesJSX() in Dashboard,
   * which then displays a list of all tables */
  return (
    <tr style={{ fontFamily: "Courier" }} >
      <th className="text-center text-white" scope="row">{table.table_id}</th>
      <td className="text-center text-white">{table.table_name}</td>
      <td className="text-center text-white">{table.capacity}</td>
      <td className="text-center text-white" data-table-id-status={table.table_id}>
        {table.status}
      </td>
      <td className="text-center text-white">
        {table.reservation_id ? table.reservation_id : "--"}
      </td>

      {table.status === "occupied" && (
        <td className="text-center">
          <button
            className="btn btn-sm btn-outline-light"
            data-table-id-finish={table.table_id}
            onClick={handleFinish}
            type="button"
          >
            Finish
          </button>
        </td>
      )}
    </tr>
  );
}