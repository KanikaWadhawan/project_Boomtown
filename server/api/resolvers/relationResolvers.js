const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    items(parent, args, { pgResource }, info) {
      try {
        const items = pgResource.getItemsForUser(parent.id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    borrowed(parent, args, { pgResource }, info) {
      try {
        const items = pgResource.getBorrowedItemsForUser(parent.id);

        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  },
  Item: {
    async itemowner({ itemowner }, args, { pgResource }, info) {
      try {
        const items = pgResource.getUserById(itemowner);

        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async tags(parent, args, { pgResource }, info) {
      try {
        const tagsItems = pgResource.getTagsForItem(parent.id);

        return tagsItems;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async borrower({ borrower }, args, { pgResource }, info) {
      try {
        if (borrower) {
          const borrowerUser = pgResource.getUserById(borrower);
          return borrowerUser;
        } else {
          return null;
        }
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  }
};

module.exports = relationResolvers;
