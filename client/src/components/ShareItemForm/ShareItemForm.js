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
import { Form, Field, FormSpy } from "react-final-form";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = values => {};
  validate = values => {};

  applyTags = (tags, allTags) => {
    return tags.map(tag => {
      const updatedTag = { title: tag };
      allTags.filter(t => {
        if (t.title === tag) {
          updatedTag.id = t.id;
        }
      });
      return updatedTag;
    });
  };

  dispatchUpdate = (values, allTags, updatePreview) => {
    updatePreview({
      ...values,
      tags: this.applyTags(values.tags || [], allTags)
      // null can not be maped
    });
  };

  saveItems = (values, allTags, addItem) => {};

  render() {
    const { classes, tags } = this.props;
    console.log(tags);

    return (
      <ItemPreviewContext.Consumer>
        {({ updatePreview, resetPreview }) => {
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
                    <FormSpy
                      subscription={{ values: true }}
                      onChange={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updatePreview);
                        }
                        return "";
                      }}
                    />

                    {/* /End of FormSpy/ */}
                    <Field
                      name="title"
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
                      name="description"
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
                      {/* start tag map */}
                      {tags.map(tag => (
                        <label>
                          <Field
                            name="tags"
                            component="input"
                            type="checkbox"
                            value={tag.title}
                          />{" "}
                          {tag.title}
                        </label>
                      ))}

                      {/* end tag map */}
                    </div>
                    {/* */}
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
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareForm);
