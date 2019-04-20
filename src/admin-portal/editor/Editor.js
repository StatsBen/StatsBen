import React from "react";
import EntriesSelector from "./EntriesSelector";
import WritingBox from "./WritingBox";
import { firestore } from "../../authentication/firebase";
import { tidyEntry } from "../../utils";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let entryAttributes = [
      "Name",
      "Date",
      "Grade",
      "Types",
      "Color",
      "Theme",
      "Featured Text",
      "Featured Photo"
    ];

    let currentEntry = {};
    entryAttributes.map(attr => {
      currentEntry[attr] = " ";
    });

    // currentEntry.contents = "";
    // currentEntry.isFeatured = false;

    this.state = { entryAttributes, currentEntry };
  }

  unsubscribeFromFirestore = null;
  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => tidyEntry(doc));
        this.setState({ entries });
      });
  };

  loadEntry = entry => {
    let newEntry = {};

    this.state.entryAttributes.map(attr => {
      if (entry[attr]) {
        newEntry[attr] = entry[attr];
      } else {
        newEntry[attr] = " ";
      }
    });

    this.setState({ currentEntry: newEntry });
  };

  resetWriter = () => {
    let newEntry = {};
    this.state.entryAttributes.map(attr => {
      newEntry[attr] = "";
    });
    this.setState({ currentEntry: newEntry });
    this.render();
  };

  handleChange = event => {
    const { name, value } = event.target;
    let newEntry = this.state.currentEntry;
    newEntry[name] = value;
    this.setState({ currentEntry: newEntry });
  };

  submitNewEntry = event => {
    event.preventDefault();
    firestore.collection("entries").add(this.state.currentEntry);
    this.resetWriter();
  };

  // deleteEntry = event => {
  //   // TODO
  // };

  // updateEntry = event => {
  //   // TODO
  // };

  render() {
    return (
      <div id="editor-container">
        <div id="main-editor">
          <WritingBox
            currentEntry={this.state.currentEntry}
            resetWriter={this.resetWriter}
            handleChange={this.handleChange}
            submitNewEntry={this.submitNewEntry}
          />
          <EntriesSelector
            entries={this.state.entries}
            loadEntry={this.loadEntry}
          />
        </div>
      </div>
    );
  }
}

export default Editor;