const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The User GraphQL type has two fields that are not present in the
     *  user table in Postgres: items and borrowed.
     *
     *  According to our GraphQL schema, these fields should return a list of
     *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
     *
     */
    // @TODO: Uncomment these lines after you define the User type with these fields
    items(parent, args, {pgResource}, info) {
      
      try {
        const items = pgResource.getItemsForUser(parent.id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }

    },
    borrowed(parent, args,{pgResource}, info) {
      try {
        const items = pgResource.getBorrowedItemsForUser(parent.id);
        console.log(items);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }  
   }
  },
  Item: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The Item GraphQL type has two fields that are not present in the
     *  Items table in Postgres: itemowner, tags and borrower.
     *
     * According to our GraphQL schema, the itemowner and borrower should return
     * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
     *
     */
    // @TODO: Uncomment these lines after you define the Item type with these fields
    async itemowner({itemowner}, args,{pgResource}, info) {
      
      try {
        const items = pgResource.getUserById(itemowner);
        
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }  
     
    },
    async tags(parent, args,{pgResource}, info) {
   
      try {
        const tagsItems = pgResource.getTagsForItem(parent.id);
       
        return tagsItems;
      } catch (e) {
        throw new ApolloError(e);
      }  
   },
   async borrower({borrower}, args,{pgResource}, info) {
    
     try {
      if(borrower){
        const borrowerUser = pgResource.getUserById(borrower);
        return borrowerUser;
       }
       else{
         return null;
       }
       
     } catch (e) {
       throw new ApolloError(e);
     }  
    }
     
  }
 
  

};

module.exports =relationResolvers;