const fileTransfomer = {
  process(sourceText, sourcePath, options) {
    return {
      code: `
        const { gql } = require("graphql-tag");

       module.exports = gql\`
         ${sourceText}
       \`;
      
      `,
    };
  },
};

module.exports = fileTransfomer;
