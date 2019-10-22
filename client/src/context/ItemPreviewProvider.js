import React, { createContext, Component } from "react";

export const ItemPreviewContext = createContext();

class ItemPreviewProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        title: "Initial title",
        description: "Initial description",
        created: new Date(),
        tags: [],
        imageurl: "https://via.placeholder.com/350",
        itemowner: {}
      }
    };
  }

  updatePreview = item => {
    this.setState({ item: { ...this.state.item, ...item } });
  };

  resetPreview = () => {
    this.setState({
      item: {
        title: "Initial title",
        description: "Initial description",
        created: new Date(),
        tags: [],
        imageurl: "https://via.placeholder.com/350",
        itemowner: {}
      }
    });
  };

  render() {
    return (
      <ItemPreviewContext.Provider
        value={{
          state: this.state,
          updatePreview: this.updatePreview,
          resetPreview: this.resetPreview
        }}
      >
        {this.props.children}
      </ItemPreviewContext.Provider>
    );
  }
}

export default ItemPreviewProvider;
