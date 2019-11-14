import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import Typography from "@material-ui/core/Typography";

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
import { graphql, compose } from "react-apollo";
import validate from "./helpers/validation";

import styles from "./styles";
import PropTypes from "prop-types";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
      error: null
    };
  }

  render() {
    const { classes, LOGIN_MUTATION, SIGNUP_MUTATION } = this.props;

    return (
      <Form
        onSubmit={async values => {
          try {
            this.state.formToggle
              ? await LOGIN_MUTATION({ variables: { user: values } })
              : await SIGNUP_MUTATION({ variables: { user: values } });
          } catch (e) {
            this.setState({ error: e });
            // this.setState({ error: { database: { ...e } } });
          }
        }}
        validate={values => {
          return validate(values, this.formToggle);
        }}
        render={({ handleSubmit, form, valid }) => (
          <form
            onSubmit={event => {
              handleSubmit(event);
              form.reset();
            }}
            noValidate
            className={classes.accountForm}
          >
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>

                <Field
                  name="fullname"
                  render={({ input, meta }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: "off",
                        ...input
                      }}
                      value={input.value}
                    />
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>

              <Field
                name="email"
                render={({ input, meta }) => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: "off",
                      ...input
                    }}
                    value={input.value}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>

              <Field
                name="password"
                render={({ input, meta }) => (
                  <Input
                    id="password"
                    inputProps={{
                      autoComplete: "off"
                    }}
                    {...input}
                    type="password"
                    value={input.value}
                  />
                )}
              ></Field>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={!valid}
                >
                  {this.state.formToggle ? "Enter" : "Create Account"}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? "Create an account."
                      : "Login to existing account."}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {this.state.error ? this.state.error.message.split(": ")[1] : ""}
            </Typography>
          </form>
        )}
      />
    );
  }
}

AccountForm.propTypes = {
  LOGIN_MUTATION: PropTypes.func.isRequired,
  SIGNUP_MUTATION: PropTypes.func.isRequired
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGIN_MUTATION, {
    options: { refetchQueries },
    name: "LOGIN_MUTATION"
  }),
  graphql(SIGNUP_MUTATION, {
    options: { refetchQueries },
    name: "SIGNUP_MUTATION"
  }),
  withStyles(styles)
)(AccountForm);
