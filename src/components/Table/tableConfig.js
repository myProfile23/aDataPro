let columns = [
  {
    property: "number",
    name: "Number",
    headerClass: "bold",
    cellClass: "center",
  },

  {
    property: "user",
    additionalProperty: "avatar_url",
    name: "Avatar",
    cellClass: "center",
    img: true,
  },
  {
    property: "user",
    additionalProperty: "login",
    name: "User",
    cellClass: "center",
  },
  { property: "title", name: "Issue", cellClass: "title" },
];

export const tableConfig = {
  columns,
  showHeader: true,
  rows: 7,
  page: 1,
  canSelect: false,
  selectedRowClass: "selected-row",
};
