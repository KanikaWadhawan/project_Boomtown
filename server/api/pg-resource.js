function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }

  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: `INSERT INTO users(fullname,email, password) VALUES ($1,$2,$3) RETURNING *`,
        values: [fullname, email, password]
      };
      console.log(newUserInsert);
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE email = $1`, // @TODO: Authentication - Server
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      try {
        const findUserQuery = {
          text: `SELECT id, fullname, email, bio FROM users WHERE id = $1`,
          values: [id]
        };

        const user = await postgres.query(findUserQuery);

        if (user.rows.length > 0) {
          return user.rows[0];
        } else {
          throw "User Not Found";
        }
      } catch (e) {
        throw e;
      }
      /**
       *  Refactor the following code using the error handling logic described above.
       *  When you're done here, ensure all of the resource methods in this file
       *  include a try catch, and throw appropriate errors.
       *
       *  Ex: If the user is not found from the DB throw 'User is not found'
       *  If the password is incorrect throw 'User or Password incorrect'
       */

      // -------------------------------
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE itemowner <> $1`,
        values: idToOmit ? [idToOmit] : [""]
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw e;
      }
    },

    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrower=$1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw e;
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query("SELECT * FROM tags");
        return tags.rows;
      } catch (e) {
        throw e;
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT it.tagid AS id, t.title 
               FROM itemtags it
               JOIN tags t 
               ON t.id = it.tagid 
               WHERE itemid =$1 `,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         * - Read about transactions here: https://node-postgres.com/features/transactions
         */
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const { title, description, tags } = item;

              // Generate new Item query

              const newItem = {
                text: ` INSERT INTO items (title, description, itemowner, imageurl) VALUES ($1, $2, $3 ,$4) RETURNING *`,
                values: [title, description, user, imageurl]
              };

              // Insert new Item

              const res = await postgres.query(newItem);
              const itemid = res.rows[0].id;

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)

              const tagsRelation = await tagsQueryString(tags, itemid, "");
              const TagId = tags.map(tag => {
                return tag.id;
              });
              const addTagQuery = {
                text: `INSERT INTO itemtags(tagid, itemid) VALUES${tagsRelation}`,
                values: TagId
              };

              // Insert tags

              await postgres.query(addTagQuery);

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();

                resolve(res.rows[0]);
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
