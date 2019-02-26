import React, { PureComponent, Fragment } from "react";
import Link from "next/link";
import { Experiment, Variant, emitter } from "@marvelapp/react-ab-test";

export class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(e) {
    this.refs.experiment.win();
  }
  render() {
    return (
      <Fragment>
        <Link href="/about">
          <a>About</a>
        </Link>
        <div>
          <Experiment ref="experiment" name="My Example">
            <Variant name="A">
              <div>Section A</div>
            </Variant>
            <Variant name="B">
              <div>Section B</div>
            </Variant>
          </Experiment>
          <button onClick={this.onButtonClick}>Emit a win</button>
        </div>
      </Fragment>
    );
  }
}

// Called when the experiment is displayed to the user.
emitter.addPlayListener(function(experimentName, variantName) {
  console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
});

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function(experimentName, variantName) {
  console.log(
    `Variant ${variantName} of experiment ${experimentName} was clicked`
  );
});
export default Index;
