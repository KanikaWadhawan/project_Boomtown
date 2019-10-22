const styles = theme => ({
  sharePage: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(10)
    }
  },
  sharePreview: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

export default styles;
