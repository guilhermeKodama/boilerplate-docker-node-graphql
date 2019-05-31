const styles = theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      maxWidth: 1440,
      padding: theme.spacing.unit * 4,
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default styles
