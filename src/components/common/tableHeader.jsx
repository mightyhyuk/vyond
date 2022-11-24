import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.determineSortOrder(column.path)}
            >
              <span style={{ cursor: "pointer" }}>
                {column.label} {this.renderSortIcon(column)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  determineSortOrder = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.handleSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-up"></i>;
    return <i className="fa-solid fa-sort-down"></i>;
  };
}

export default TableHeader;
