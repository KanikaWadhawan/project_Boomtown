import React, { Component, Fragment } from "react";
import { Typography, Input, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Form, Field, FormSpy } from "react-final-form";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";
import {
  AcUnit as AcUnitIcon,
  AccountBalance as AccountBalanceIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Adb as AdbIcon,
  AirportShuttle as AirportShuttleIcon,
  Album as AlbumIcon
} from "@material-ui/icons";
import PropTypes from "prop-types";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true
    };
  }
  onSubmit = values => {};
  validate = ({ title, description, tags }) => {
    if (title && description && tags) {
      this.setState({ disableButton: false });
      return;
    }
    this.setState({ disableButton: true });
  };

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

  saveItems = async (values, allTags, addItem) => {
    try {
      // new item
      // const newItem = {
      //   ...values,
      //   tags: this.applyTags(values.tags || [], allTags)
      // };
      // add item
      await addItem({
        variables: {
          title: values.title,
          description: values.description,
          tags: this.applyTags(values.tags || [], allTags),
          imageurl: values.imageurl
        }
      });
    } catch (e) {
      throw e;
    }
  };

  render() {
    // this tags are alltags coming from the server
    const { classes, tags } = this.props;
    // console.log(tags);

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
              <Mutation mutation={ADD_ITEM_MUTATION}>
                {addItem => (
                  <Form
                    onSubmit={values => {
                      this.saveItems(values, tags, addItem);
                    }}
                    validate={this.validate}
                    render={({ handleSubmit, form }) => (
                      <form
                        onSubmit={event => {
                          handleSubmit(event);
                          form.reset();
                          resetPreview();
                        }}
                      >
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
                        <Field
                          name="imageurl"
                          render={({ input, meta }) => (
                            <Input
                              required
                              className={classes.ShareItemFormContents}
                              type="text"
                              fullWidth
                              placeholder="Url of your Item"
                              inputProps={{
                                "aria-label": "Item url"
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
                          {tags.map((tag, index) => (
                            <label key={index}>
                              <Field
                                name="tags"
                                component="input"
                                type="checkbox"
                                value={tag.title}
                              />{" "}
                              {tag.title} &nbsp;
                              {
                                ({ index } =
                                  index === 0 ? (
                                    <AccountBalanceIcon />
                                  ) : index === 1 ? (
                                    <AirportShuttleIcon />
                                  ) : index === 2 ? (
                                    <AccountBalanceWalletIcon />
                                  ) : index === 3 ? (
                                    <AdbIcon />
                                  ) : index === 4 ? (
                                    <AlbumIcon />
                                  ) : (
                                    <AcUnitIcon />
                                  ))
                              }
                            </label>
                          ))}

                          {/* end tag map */}
                        </div>
                        {/* */}
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={this.state.disableButton}
                          type="submit"
                        >
                          Share
                        </Button>
                      </form>
                    )}
                  />
                )}
              </Mutation>
            </Fragment>
          );
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

ShareForm.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(ShareForm);
