import React, { Component, Fragment } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Input,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Form, Field } from "react-final-form";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = values => {};
  validate = values => {};

  render() {
    const { classes, tags } = this.props;
    console.log(tags);

    return (
      <Fragment>
        <Typography
          gutterBottom
          variant="h3"
          component="h2"
          color="textPrimary"
          className={classes.shareTitleQuote}
        >
          Share. Borrow. Prosper.
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* // */}
              <Field
                name="itemName"
                render={({ input, meta }) => (
                  <Input
                    required
                    className={classes.ShareItemFormContents}
                    type="text"
                    fullWidth
                    placeholder="Name your Item"
                    inputProps={{
                      "aria-label": "Item name"
                    }}
                    {...input}
                    value={input.value}
                  />
                )}
              />
              {/* // */}
              <Field
                name="itemDescription"
                render={({ input, meta }) => (
                  <Input
                    required
                    className={classes.ShareItemFormContents}
                    type="text"
                    fullWidth
                    placeholder="Describe your Item"
                    inputProps={{
                      "aria-label": "Item description"
                    }}
                    {...input}
                    value={input.value}
                  />
                )}
              />
              {/* // */}
              <div className={classes.ShareItemFormContents}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="p"
                  color="textPrimary"
                >
                  Add Tags:
                </Typography>
                <Field
                  name="itemTags"
                  render={({ input, meta }) => {
                    const { onChange } = input;
                    return (
                      <FormControl fullWidth>
                        <FormGroup className={classes.ShareItemFormGroup}>
                          {tags.map(tag => (
                            <FormControlLabel
                              className={classes.ShareItemFormTags}
                              key={tag.id}
                              control={<Checkbox value={tag.id} />}
                              label={tag.title}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    );
                  }}
                />
              </div>
              {/* // */}
              <Button
                variant="contained"
                color="secondary"
                disabled
                type="submit"
              >
                Share
              </Button>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(ShareForm);
