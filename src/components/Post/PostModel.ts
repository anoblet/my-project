export const model = {
  author: {
    label: "Author",
    name: "author",
    type: "text"
  },
  content: {
    label: "Content",
    name: "content",
    type: "textarea"
  },
  date: {
    label: "Date",
    type: "text"
  },
  title: {
    label: "Title",
    name: "title",
    type: "text"
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text"
    },
    {
      label: "Author",
      name: "author",
      type: "text"
    },
    {
      label: "Content",
      name: "content",
      type: "textarea"
    },
    {
      label: "Sort order",
      name: "sort",
      type: "number"
    }
  ]
};

export default model;
