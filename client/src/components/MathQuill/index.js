/* @flow */
import React, { PureComponent } from 'react'
import classNames from 'classnames'

export type MQMathField = {
  latex: (string => MQMathField) &
  (() => string)
}

const MQ = window.MathQuill.getInterface(2)

type MathQuillProps = {
  latex: string,
  style?: Object,
  className?: string,
  // MQ Config:
  spaceBehavesLikeTab?: boolean,
  leftRightIntoCmdGoes?: string,
  restrictMismatchedBrackets?: boolean,
  sumStartsWithNEquals?: boolean,
  supSubsRequireOperand?: boolean,
  charsThatBreakOutOfSupSub?: string,
  autoSubscriptNumerals?: boolean,
  autoCommands?: string,
  autoOperatorNames?: string,
  substituteTextarea?: Function,
  // MathQuill Config Event Handlers
  // MathQuill actually names them handler.edit, handler.enter, etc
  onEnter?: Function,
  onEdit?: Function,
  onMoveOutOf?: Function,
  onDeleteOutOf?: Function,
  onUpOutOf?: Function,
  onSelectOutOf?: Function,
  onDownOutOf?: Function,
  // Extra React Event Handlers
  onFocus?: Function,
  onBlur?: Function,
}

type MathQuillState = {
  isFocused: boolean
}

export default class MQComponent extends PureComponent<MathQuillProps, MathQuillState> {

  mathField: MQMathField;
  span: ?HTMLSpanElement;
  preventOnEdit: boolean;
  state = { isFocused: false };
  static configKeys = [
    "spaceBehavesLikeTab",
    "leftRightIntoCmdGoes",
    "restrictMismatchedBrackets",
    "sumStartsWithNEquals",
    "supSubsRequireOperand",
    "charsThatBreakOutOfSupSub",
    "autoSubscriptNumerals",
    "autoCommands",
    "autoOperatorNames",
    "substituteTextarea",
  ];
  static handlerKeys = {
    onEnter: "enter",
    onMoveOutOf: "moveOutOf",
    onDeleteOutOf: "deleteOutOf",
    onUpOutOf: "upOutOf",
    onSelectOutOf: "selectOutOf",
    onDownOutOf: "downOutOf",
  };
  
  // static MQ = MathQuill.getInterface(2);


  getConfig(props: MathQuillProps) {
    const config = MQComponent.configKeys.filter(prop => props[prop] ).reduce(
      (theConfig, prop) => {
        theConfig[prop] = props[prop];
        return theConfig;
      },
      {},
    );

    
    config.handlers = {};
    config.handlers.edit = this.onEdit;
    
    return Object.keys(MQComponent.handlerKeys).filter(prop => props[prop] ).reduce(
      (theConfig, prop) => {
        const handlerKey = MQComponent.handlerKeys[prop];
        theConfig.handlers[handlerKey] = props[prop];
        return theConfig;
      },
      config,
    );
  }
  componentDidMount() {
    const config = this.getConfig(this.props);
    this.mathField = MQ.MathField(this.span, config);
    this.setLatex(this.props.latex);
  }
  setLatex(latex: string) {
    if (latex === this.mathField.latex()) {
      return;
    }
    
    this.preventOnEdit = true;
    this.mathField.latex(this.props.latex);
    this.preventOnEdit = false;
  }
  componentDidUpdate() {
    this.setLatex(this.props.latex);
  }
  onEdit = (mathField: MQMathField) => {
    const handler = this.props.onEdit;
    
    if (handler && !this.preventOnEdit) {
      handler(mathField);
    }
  };
  onFocus = () => {
    this.setState( { isFocused: true } );
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };
  onBlur = () => {
    this.setState( { isFocused: false } );
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };
  render() {
    const mqClasses = classNames(
      this.props.className,
      {
        "mq-editable-field": true,
        "mq-math-mode": true,
        "mq-focused": this.state.isFocused,
      },
    );
    return (
      <span
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={this.props.style}
        className={mqClasses}
        ref={ref => {
          this.span = ref;
        }}></span>
    );
  }

}

type StaticMathProps = {
  latex?: string,
  style?: Object,
  className?: string,
};

type MQStaticMath = {
  latex: Function
}

export class StaticMath extends PureComponent<StaticMathProps> {

  staticMath: MQStaticMath
  span: ?HTMLSpanElement

  componentDidMount() {
    this.staticMath = MQ.StaticMath(this.span)
  }

  componentDidUpdate() {
    if (this.props.latex !== this.staticMath.latex()) {
      this.staticMath.latex(this.props.latex)
    }
  }

  render() {
    const mqClasses = classNames(this.props.className, {
      'mq-math-mode': true
    } )
    return (
      <span
        style={this.props.style}
        className={mqClasses}
        ref={ ref => { this.span = ref } }>
        {this.props.latex}
      </span>
    )
  }

}
