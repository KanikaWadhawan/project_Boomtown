const styles = theme => ({
  shareTitleQuote: {
    fontWeight: 600
  },
  ShareItemFormContents: {
    marginBottom: theme.spacing(4)
  },
  ShareItemFormGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr) )",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(1)
  },
  ShareItemFormTags: {
    marginRight: 0
  }
});

export default styles;
