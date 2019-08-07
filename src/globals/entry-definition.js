import { types } from "./types";

const entryDefinition = {
  attributes: [
    { name: "name", type: "string" },
    { name: "date", type: "date" },
    { name: "html", type: "html" },
    {
      name: "grade",
      type: "object",
      objectFields: [
        { name: "commitment", type: "number", unit: "commitmentGrade" },
        { name: "distance", type: "number", unit: "distance" },
        { name: "ice", type: "string", unit: "iceGrade" },
        { name: "rock", type: "string", unit: "ydsGrade" },
        { name: "scramble", type: "number", unit: "scramblingGrade" },
        { name: "vert", type: "number", unit: "vert" }
      ]
    }
  ]
};

/* This builds the definition for types programatically from the 'types.js' file. */
const typesDefn = { name: "types", type: "object", objectFields: [] };

types.map(type => {
  let typeDefn = { name: type, type: "boolean" };
  typesDefn.objectFields.push(typeDefn);
});

entryDefinition.attributes.push(typesDefn);

export { entryDefinition };
