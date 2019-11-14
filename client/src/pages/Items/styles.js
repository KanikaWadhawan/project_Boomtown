const styles = theme => ({
  pageItems: {
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(11)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(18)
    }
  }
});

export default styles;
