import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Simple reusable data table for admin lists.
 * Columns: array of { id, label, render? } – render receives row.
 * rows: array of data objects.
 * onEdit / onDelete callbacks receive row.
 */
export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} sx={{ fontWeight: 600, bgcolor: "background.default" }}>
                {col.label}
              </TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} hover>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  {col.render ? col.render(row) : row[col.id]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="right">
                  {onEdit && (
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => onEdit(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => onDelete(row)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
