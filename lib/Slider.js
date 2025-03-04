"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactWithStyles = require("react-with-styles");

var _reactWithDirection = _interopRequireWildcard(require("react-with-direction"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _react = _interopRequireDefault(require("react"));

var _linear = _interopRequireDefault(require("./algorithms/linear"));

var _DefaultHandle = _interopRequireDefault(require("./DefaultHandle"));

var _DefaultProgressBar = _interopRequireDefault(require("./DefaultProgressBar"));

var _DefaultBackground = _interopRequireDefault(require("./DefaultBackground"));

var _OrientationPropType = _interopRequireDefault(require("./propTypes/OrientationPropType"));

var _SliderConstants = require("./constants/SliderConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var has = Object.prototype.hasOwnProperty;

var PropTypeArrOfNumber = _propTypes["default"].arrayOf(_propTypes["default"].number);

var PropTypeReactComponent = _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string]);

function getHandleFor(ev) {
  return Number(ev.currentTarget.getAttribute('data-handle-key'));
}

function killEvent(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread({}, _reactWithDirection.withDirectionPropTypes, {}, _reactWithStyles.withStylesPropTypes, {
  // Automatically adds a top position for large when enabled
  autoAdjustVerticalPosition: _propTypes["default"].bool,
  // the algorithm to use
  algorithm: _propTypes["default"].shape({
    getValue: _propTypes["default"].func,
    getPosition: _propTypes["default"].func
  }),
  background: PropTypeReactComponent,
  // any children you pass in
  children: _propTypes["default"].node,
  // prevent the slider from moving when clicked
  disabled: _propTypes["default"].bool,
  // a custom handle you can pass in
  handle: PropTypeReactComponent,
  // the maximum possible value
  max: _propTypes["default"].number,
  // the minimum possible value
  min: _propTypes["default"].number,
  // called on click
  onClick: _propTypes["default"].func,
  // called whenever the user is done changing values on the slider
  onChange: _propTypes["default"].func,
  // called on key press
  onKeyPress: _propTypes["default"].func,
  // called when you finish dragging a handle
  onSliderDragEnd: _propTypes["default"].func,
  // called every time the slider is dragged and the value changes
  onSliderDragMove: _propTypes["default"].func,
  // called when you start dragging a handle
  onSliderDragStart: _propTypes["default"].func,
  // called whenever the user is actively changing the values on the slider
  // (dragging, clicked, keypress)
  onValuesUpdated: _propTypes["default"].func,
  // the orientation
  orientation: _OrientationPropType["default"],
  // a component for rendering the pits
  pitComponent: PropTypeReactComponent,
  // the points that pits are rendered on
  pitPoints: PropTypeArrOfNumber,
  // a custom progress bar you can pass in
  progressBar: PropTypeReactComponent,
  // should we snap?
  snap: _propTypes["default"].bool,
  // the points we should snap to
  snapPoints: PropTypeArrOfNumber,
  // whether a proposed update is valid
  getNextHandlePosition: _propTypes["default"].func,
  // the values
  values: PropTypeArrOfNumber
}));
var defaultProps = {
  autoAdjustVerticalPosition: false,
  children: null,
  algorithm: _linear["default"],
  disabled: false,
  getNextHandlePosition: null,
  max: _SliderConstants.PERCENT_FULL,
  min: _SliderConstants.PERCENT_EMPTY,
  onClick: null,
  onChange: null,
  onKeyPress: null,
  onSliderDragEnd: null,
  onSliderDragMove: null,
  onSliderDragStart: null,
  onValuesUpdated: null,
  orientation: _SliderConstants.HORIZONTAL,
  pitComponent: null,
  pitPoints: [],
  snap: false,
  snapPoints: [],
  background: _DefaultBackground["default"],
  handle: _DefaultHandle["default"],
  progressBar: _DefaultProgressBar["default"],
  values: [_SliderConstants.PERCENT_EMPTY]
};

var Rheostat =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Rheostat, _React$Component);

  function Rheostat(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    var _this$props = _this.props,
        algorithm = _this$props.algorithm,
        max = _this$props.max,
        min = _this$props.min,
        values = _this$props.values;
    _this.state = {
      handlePos: values.map(function (value) {
        return algorithm.getPosition(value, min, max);
      }),
      handleDimensions: 0,
      slidingIndex: null,
      values: values
    };
    _this.getPublicState = _this.getPublicState.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getSliderBoundingBox = _this.getSliderBoundingBox.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getProgressStyle = _this.getProgressStyle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getMinValue = _this.getMinValue.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getMaxValue = _this.getMaxValue.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getHandleDimensions = _this.getHandleDimensions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getClosestSnapPoint = _this.getClosestSnapPoint.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getSnapPosition = _this.getSnapPosition.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getNextPositionForKey = _this.getNextPositionForKey.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getNextState = _this.getNextState.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getClosestHandle = _this.getClosestHandle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setStartSlide = _this.setStartSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.startMouseSlide = _this.startMouseSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.startTouchSlide = _this.startTouchSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleMouseSlide = _this.handleMouseSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleTouchSlide = _this.handleTouchSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSlide = _this.handleSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.endSlide = _this.endSlide.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleKeydown = _this.handleKeydown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.validatePosition = _this.validatePosition.bind((0, _assertThisInitialized2["default"])(_this));
    _this.validateValues = _this.validateValues.bind((0, _assertThisInitialized2["default"])(_this));
    _this.canMove = _this.canMove.bind((0, _assertThisInitialized2["default"])(_this));
    _this.fireChangeEvent = _this.fireChangeEvent.bind((0, _assertThisInitialized2["default"])(_this));
    _this.slideTo = _this.slideTo.bind((0, _assertThisInitialized2["default"])(_this));
    _this.updateNewValues = _this.updateNewValues.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setRef = _this.setRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setHandleNode = _this.setHandleNode.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setHandleContainerNode = _this.setHandleContainerNode.bind((0, _assertThisInitialized2["default"])(_this));
    _this.positionPercent = _this.positionPercent.bind((0, _assertThisInitialized2["default"])(_this));
    _this.invalidatePitStyleCache = _this.invalidatePitStyleCache.bind((0, _assertThisInitialized2["default"])(_this));
    _this.pitStyleCache = {};
    return _this;
  }

  var _proto = Rheostat.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // Note: This occurs in a timeout because styles need to be applied first
    this.handleDimensionsTimeout = setTimeout(function () {
      _this2.handleDimensionsTimeout = null;

      _this2.setState({
        handleDimensions: _this2.getHandleDimensions()
      });
    }, 0);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        min = _this$props2.min,
        max = _this$props2.max,
        orientation = _this$props2.orientation,
        pitPoints = _this$props2.pitPoints,
        algorithm = _this$props2.algorithm;
    var _this$state = this.state,
        values = _this$state.values,
        slidingIndex = _this$state.slidingIndex;
    var minMaxChanged = nextProps.min !== min || nextProps.max !== max;
    var valuesChanged = values.length !== nextProps.values.length || values.some(function (value, idx) {
      return nextProps.values[idx] !== value;
    });
    var orientationChanged = nextProps.orientation !== orientation;
    var algorithmChanged = nextProps.algorithm !== algorithm;
    var pitPointsChanged = nextProps.pitPoints !== pitPoints;
    var willBeDisabled = nextProps.disabled && !disabled;
    if (minMaxChanged || valuesChanged) this.updateNewValues(nextProps);

    if (willBeDisabled && slidingIndex !== null) {
      this.endSlide();
    }

    if (minMaxChanged || pitPointsChanged || orientationChanged || algorithmChanged) {
      this.invalidatePitStyleCache();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.handleDimensionsTimeout) {
      clearTimeout(this.handleDimensionsTimeout);
      this.handleDimensionsTimeout = null;
    }
  };

  _proto.getPublicState = function getPublicState() {
    var values = this.state.values;
    var _this$props3 = this.props,
        min = _this$props3.min,
        max = _this$props3.max;
    return {
      max: max,
      min: min,
      values: values
    };
  };

  _proto.getSliderBoundingBox = function getSliderBoundingBox() {
    var rect = this.handleContainerNode.getBoundingClientRect();
    return {
      height: rect.height || this.handleContainerNode.clientHeight,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width || this.handleContainerNode.clientWidth
    };
  };

  _proto.getProgressStyle = function getProgressStyle(idx) {
    var orientation = this.props.orientation;
    var handlePos = this.state.handlePos;
    var value = handlePos[idx];

    if (idx === 0) {
      return orientation === _SliderConstants.VERTICAL ? {
        height: "".concat(value, "%"),
        top: 0
      } : {
        left: 0,
        width: "".concat(value, "%")
      };
    }

    var prevValue = handlePos[idx - 1];
    var diffValue = value - prevValue;
    return orientation === _SliderConstants.VERTICAL ? {
      height: "".concat(diffValue, "%"),
      top: "".concat(prevValue, "%")
    } : {
      left: "".concat(prevValue, "%"),
      width: "".concat(diffValue, "%")
    };
  };

  _proto.getMinValue = function getMinValue(idx) {
    var min = this.props.min;
    var values = this.state.values;
    return values[idx - 1] ? Math.max(min, values[idx - 1]) : min;
  };

  _proto.getMaxValue = function getMaxValue(idx) {
    var max = this.props.max;
    var values = this.state.values;
    return values[idx + 1] ? Math.min(max, values[idx + 1]) : max;
  };

  _proto.getClosestSnapPoint = function getClosestSnapPoint(value) {
    var snapPoints = this.props.snapPoints;
    if (!snapPoints.length) return value;
    return snapPoints.reduce(function (snapTo, snap) {
      return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
    });
  };

  _proto.getHandleDimensions = function getHandleDimensions() {
    var orientation = this.props.orientation;
    if (!this.handleNode) return 0;
    return orientation === _SliderConstants.VERTICAL ? this.handleNode.clientHeight : this.handleNode.clientWidth;
  };

  _proto.getSnapPosition = function getSnapPosition(positionPercent) {
    var _this$props4 = this.props,
        algorithm = _this$props4.algorithm,
        max = _this$props4.max,
        min = _this$props4.min,
        snap = _this$props4.snap;
    if (!snap) return positionPercent;
    var value = algorithm.getValue(positionPercent, min, max);
    var snapValue = this.getClosestSnapPoint(value);
    return algorithm.getPosition(snapValue, min, max);
  };

  _proto.getNextPositionForKey = function getNextPositionForKey(idx, keyCode) {
    var _stepMultiplier;

    var _this$state2 = this.state,
        handlePos = _this$state2.handlePos,
        values = _this$state2.values;
    var _this$props5 = this.props,
        algorithm = _this$props5.algorithm,
        max = _this$props5.max,
        min = _this$props5.min,
        snapPoints = _this$props5.snapPoints,
        shouldSnap = _this$props5.snap;
    var proposedValue = values[idx];
    var proposedPercentage = handlePos[idx];
    var originalPercentage = proposedPercentage;
    var stepValue = 1;

    if (max >= 100) {
      proposedPercentage = Math.round(proposedPercentage);
    } else {
      stepValue = 100 / (max - min);
    }

    var currentIndex = null;

    if (shouldSnap) {
      currentIndex = snapPoints.indexOf(this.getClosestSnapPoint(values[idx]));
    }

    var stepMultiplier = (_stepMultiplier = {}, (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.LEFT, function (v) {
      return v * -1;
    }), (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.RIGHT, function (v) {
      return v * 1;
    }), (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.UP, function (v) {
      return v * 1;
    }), (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.DOWN, function (v) {
      return v * -1;
    }), (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.PAGE_DOWN, function (v) {
      return v > 1 ? -v : v * -10;
    }), (0, _defineProperty2["default"])(_stepMultiplier, _SliderConstants.KEYS.PAGE_UP, function (v) {
      return v > 1 ? v : v * 10;
    }), _stepMultiplier);

    if (has.call(stepMultiplier, keyCode)) {
      proposedPercentage += stepMultiplier[keyCode](stepValue);

      if (shouldSnap) {
        if (proposedPercentage > originalPercentage) {
          // move cursor right unless overflow
          if (currentIndex < snapPoints.length - 1) {
            proposedValue = snapPoints[currentIndex + 1];
          } // move cursor left unless there is overflow

        } else if (currentIndex > 0) {
          proposedValue = snapPoints[currentIndex - 1];
        }
      }
    } else if (keyCode === _SliderConstants.KEYS.HOME) {
      proposedPercentage = _SliderConstants.PERCENT_EMPTY;

      if (shouldSnap) {
        var _snapPoints = (0, _slicedToArray2["default"])(snapPoints, 1);

        proposedValue = _snapPoints[0];
      }
    } else if (keyCode === _SliderConstants.KEYS.END) {
      proposedPercentage = _SliderConstants.PERCENT_FULL;

      if (shouldSnap) {
        proposedValue = snapPoints[snapPoints.length - 1];
      }
    } else {
      return null;
    }

    return shouldSnap ? algorithm.getPosition(proposedValue, min, max) : proposedPercentage;
  };

  _proto.getNextState = function getNextState(idx, proposedPosition) {
    var handlePos = this.state.handlePos;
    var _this$props6 = this.props,
        max = _this$props6.max,
        min = _this$props6.min,
        algorithm = _this$props6.algorithm;
    var actualPosition = this.validatePosition(idx, proposedPosition);
    var nextHandlePos = handlePos.map(function (pos, index) {
      return index === idx ? actualPosition : pos;
    });
    return {
      handlePos: nextHandlePos,
      values: nextHandlePos.map(function (pos) {
        return algorithm.getValue(pos, min, max);
      })
    };
  };

  _proto.getClosestHandle = function getClosestHandle(positionPercent) {
    var handlePos = this.state.handlePos;
    return handlePos.reduce(function (closestIdx, node, idx) {
      var challenger = Math.abs(handlePos[idx] - positionPercent);
      var current = Math.abs(handlePos[closestIdx] - positionPercent);
      return challenger < current ? idx : closestIdx;
    }, 0);
  };

  _proto.setHandleNode = function setHandleNode(node) {
    this.handleNode = node;
  };

  _proto.setHandleContainerNode = function setHandleContainerNode(node) {
    this.handleContainerNode = node;
  };

  _proto.setStartSlide = function setStartSlide(ev) {
    var sliderBox = this.getSliderBoundingBox();
    this.setState({
      handleDimensions: this.getHandleDimensions(ev, sliderBox),
      slidingIndex: getHandleFor(ev)
    });
  };

  _proto.setRef = function setRef(ref) {
    this.rheostat = ref;
  };

  _proto.startMouseSlide = function startMouseSlide(ev) {
    var onSliderDragStart = this.props.onSliderDragStart;
    this.setStartSlide(ev, ev.clientX, ev.clientY);

    if (typeof document.addEventListener === 'function') {
      document.addEventListener('mousemove', this.handleMouseSlide, false);
      document.addEventListener('mouseup', this.endSlide, false);
    } else {
      document.attachEvent('onmousemove', this.handleMouseSlide);
      document.attachEvent('onmouseup', this.endSlide);
    }

    if (onSliderDragStart) onSliderDragStart();
    killEvent(ev);
  };

  _proto.startTouchSlide = function startTouchSlide(ev) {
    var onSliderDragStart = this.props.onSliderDragStart;
    if (ev.changedTouches.length > 1) return;
    var touch = ev.changedTouches[0];
    this.setStartSlide(ev, touch.clientX, touch.clientY);
    document.addEventListener('touchmove', this.handleTouchSlide, false);
    document.addEventListener('touchend', this.endSlide, false);
    if (onSliderDragStart) onSliderDragStart();
    killEvent(ev);
  };

  _proto.handleMouseSlide = function handleMouseSlide(ev) {
    var slidingIndex = this.state.slidingIndex;
    if (slidingIndex === null) return;
    this.handleSlide(ev.clientX, ev.clientY);
    killEvent(ev);
  };

  _proto.handleTouchSlide = function handleTouchSlide(ev) {
    var slidingIndex = this.state.slidingIndex;
    if (slidingIndex === null) return;

    if (ev.changedTouches.length > 1) {
      this.endSlide();
      return;
    }

    var touch = ev.changedTouches[0];
    this.handleSlide(touch.clientX, touch.clientY);
    killEvent(ev);
  };

  _proto.positionPercent = function positionPercent(x, y, sliderBox) {
    var _this$props7 = this.props,
        orientation = _this$props7.orientation,
        direction = _this$props7.direction;

    if (orientation === _SliderConstants.VERTICAL) {
      return (y - sliderBox.top) / sliderBox.height * _SliderConstants.PERCENT_FULL;
    }

    var horizontalPercentage = (x - sliderBox.left) / sliderBox.width * _SliderConstants.PERCENT_FULL;

    if (direction === _reactWithDirection.DIRECTIONS.RTL) {
      return 100 - horizontalPercentage;
    }

    return horizontalPercentage;
  };

  _proto.handleSlide = function handleSlide(x, y) {
    var onSliderDragMove = this.props.onSliderDragMove;
    var idx = this.state.slidingIndex;
    var sliderBox = this.getSliderBoundingBox();
    var positionPercent = this.positionPercent(x, y, sliderBox);
    this.slideTo(idx, positionPercent);

    if (this.canMove(idx, positionPercent)) {
      if (onSliderDragMove) onSliderDragMove();
    }
  };

  _proto.endSlide = function endSlide() {
    var _this3 = this;

    var _this$props8 = this.props,
        onSliderDragEnd = _this$props8.onSliderDragEnd,
        snap = _this$props8.snap;
    var _this$state3 = this.state,
        slidingIndex = _this$state3.slidingIndex,
        handlePos = _this$state3.handlePos;
    this.setState({
      slidingIndex: null
    });

    if (typeof document.removeEventListener === 'function') {
      document.removeEventListener('mouseup', this.endSlide, false);
      document.removeEventListener('touchend', this.endSlide, false);
      document.removeEventListener('touchmove', this.handleTouchSlide, false);
      document.removeEventListener('mousemove', this.handleMouseSlide, false);
    } else {
      document.detachEvent('onmousemove', this.handleMouseSlide);
      document.detachEvent('onmouseup', this.endSlide);
    }

    if (onSliderDragEnd) onSliderDragEnd();

    if (snap) {
      var positionPercent = this.getSnapPosition(handlePos[slidingIndex]);
      this.slideTo(slidingIndex, positionPercent, function () {
        return _this3.fireChangeEvent();
      });
    } else {
      this.fireChangeEvent();
    }
  };

  _proto.handleClick = function handleClick(ev) {
    var _this4 = this;

    if (ev.target.getAttribute('data-handle-key')) {
      return;
    }

    var _this$props9 = this.props,
        onClick = _this$props9.onClick,
        orientation = _this$props9.orientation; // Calculate the position of the slider on the page so we can determine
    // the position where you click in relativity.

    var sliderBox = this.getSliderBoundingBox();
    var positionDecimal = orientation === _SliderConstants.VERTICAL ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;
    var positionPercent = positionDecimal * _SliderConstants.PERCENT_FULL;
    var handleId = this.getClosestHandle(positionPercent);
    var validPositionPercent = this.getSnapPosition(positionPercent); // Move the handle there

    this.slideTo(handleId, validPositionPercent, function () {
      return _this4.fireChangeEvent();
    });
    if (onClick) onClick();
  };

  _proto.handleKeydown = function handleKeydown(ev) {
    var _this5 = this;

    var onKeyPress = this.props.onKeyPress;
    var idx = getHandleFor(ev);

    if (ev.keyCode === _SliderConstants.KEYS.ESC) {
      ev.currentTarget.blur();
      return;
    }

    var proposedPercentage = this.getNextPositionForKey(idx, ev.keyCode);
    if (proposedPercentage === null) return;

    if (this.canMove(idx, proposedPercentage)) {
      this.slideTo(idx, proposedPercentage, function () {
        return _this5.fireChangeEvent();
      });
      if (onKeyPress) onKeyPress();
    }

    killEvent(ev);
  } // Apply user adjustments to position
  ;

  _proto.userAdjustPosition = function userAdjustPosition(idx, proposedPosition) {
    var getNextHandlePosition = this.props.getNextHandlePosition;
    var nextPosition = proposedPosition;

    if (getNextHandlePosition) {
      nextPosition = parseFloat(getNextHandlePosition(idx, proposedPosition));

      if (Number.isNaN(nextPosition) || nextPosition < _SliderConstants.PERCENT_EMPTY || nextPosition > _SliderConstants.PERCENT_FULL) {
        throw new TypeError('getNextHandlePosition returned invalid position. Valid positions are floats between 0 and 100');
      }
    }

    return nextPosition;
  } // Make sure the proposed position respects the bounds and
  // does not collide with other handles too much.
  ;

  _proto.validatePosition = function validatePosition(idx, proposedPosition) {
    var _this$state4 = this.state,
        handlePos = _this$state4.handlePos,
        handleDimensions = _this$state4.handleDimensions;
    var nextPosition = this.userAdjustPosition(idx, proposedPosition);
    var orientation = this.props.orientation;
    var sliderBox = this.getSliderBoundingBox();
    var handlePercentage = orientation === _SliderConstants.VERTICAL ? handleDimensions / sliderBox.height * _SliderConstants.PERCENT_FULL / 2 : handleDimensions / sliderBox.width * _SliderConstants.PERCENT_FULL / 2;
    return Math.max(Math.min(nextPosition, handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handlePercentage : _SliderConstants.PERCENT_FULL // 100% is the highest value
    ), handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handlePercentage : _SliderConstants.PERCENT_EMPTY // 0% is the lowest value
    );
  };

  _proto.validateValues = function validateValues(proposedValues, props) {
    var _ref = props || this.props,
        max = _ref.max,
        min = _ref.min;

    return proposedValues.map(function (value, idx, values) {
      var realValue = Math.max(Math.min(value, max), min);

      if (values.length && realValue < values[idx - 1]) {
        return values[idx - 1];
      }

      return realValue;
    });
  } // Can we move the slider to the given position?
  ;

  _proto.canMove = function canMove(idx, proposedPosition) {
    var _this$state5 = this.state,
        handlePos = _this$state5.handlePos,
        handleDimensions = _this$state5.handleDimensions;
    var orientation = this.props.orientation;
    var sliderBox = this.getSliderBoundingBox();
    var handlePercentage = orientation === _SliderConstants.VERTICAL ? handleDimensions / sliderBox.height * _SliderConstants.PERCENT_FULL / 2 : handleDimensions / sliderBox.width * _SliderConstants.PERCENT_FULL / 2;
    if (proposedPosition < _SliderConstants.PERCENT_EMPTY) return false;
    if (proposedPosition > _SliderConstants.PERCENT_FULL) return false;
    var nextHandlePosition = handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handlePercentage : Infinity;
    if (proposedPosition > nextHandlePosition) return false;
    var prevHandlePosition = handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handlePercentage : -Infinity;
    if (proposedPosition < prevHandlePosition) return false;
    return true;
  };

  _proto.fireChangeEvent = function fireChangeEvent() {
    var onChange = this.props.onChange;
    if (onChange) onChange(this.getPublicState());
  };

  _proto.slideTo = function slideTo(idx, proposedPosition, onAfterSet) {
    var _this6 = this;

    var onValuesUpdated = this.props.onValuesUpdated;
    var nextState = this.getNextState(idx, proposedPosition);
    this.setState(nextState, function () {
      if (onValuesUpdated) onValuesUpdated(_this6.getPublicState());
      if (onAfterSet) onAfterSet();
    });
  };

  _proto.updateNewValues = function updateNewValues(nextProps) {
    var slidingIndex = this.state.slidingIndex; // Don't update while the slider is sliding

    if (slidingIndex !== null) {
      return;
    }

    var algorithm = this.props.algorithm;
    var max = nextProps.max,
        min = nextProps.min,
        values = nextProps.values;
    var nextValues = this.validateValues(values, nextProps);
    this.setState({
      handlePos: nextValues.map(function (value) {
        return algorithm.getPosition(value, min, max);
      }),
      values: nextValues
    });
  };

  _proto.invalidatePitStyleCache = function invalidatePitStyleCache() {
    this.pitStyleCache = {};
  };

  _proto.render = function render() {
    var _this7 = this;

    var _this$props10 = this.props,
        css = _this$props10.css,
        autoAdjustVerticalPosition = _this$props10.autoAdjustVerticalPosition,
        algorithm = _this$props10.algorithm,
        children = _this$props10.children,
        disabled = _this$props10.disabled,
        Handle = _this$props10.handle,
        max = _this$props10.max,
        min = _this$props10.min,
        orientation = _this$props10.orientation,
        PitComponent = _this$props10.pitComponent,
        pitPoints = _this$props10.pitPoints,
        Background = _this$props10.background,
        ProgressBar = _this$props10.progressBar,
        styles = _this$props10.styles;
    var _this$state6 = this.state,
        handlePos = _this$state6.handlePos,
        values = _this$state6.values;
    return (// eslint-disable-next-line jsx-a11y/click-events-have-key-events
      _react["default"].createElement("div", (0, _extends2["default"])({
        onClick: disabled ? undefined : this.handleClick
      }, css(styles.rheostat, autoAdjustVerticalPosition && styles.autoAdjustVerticalPosition, orientation === _SliderConstants.VERTICAL && styles.rheostat__vertical)), !!Background && _react["default"].createElement(Background, {
        orientation: orientation
      }), _react["default"].createElement("div", (0, _extends2["default"])({
        ref: this.setHandleContainerNode
      }, css(styles.handleContainer)), handlePos.map(function (pos, idx) {
        var handleStyle = orientation === _SliderConstants.VERTICAL ? {
          top: "".concat(pos, "%"),
          position: 'absolute'
        } : {
          left: "".concat(pos, "%"),
          position: 'absolute'
        };
        return _react["default"].createElement(Handle, {
          "aria-valuemax": _this7.getMaxValue(idx),
          "aria-valuemin": _this7.getMinValue(idx),
          "aria-valuenow": values[idx],
          "aria-valuetext": _this7.props['aria-valuetext'],
          "aria-label": _this7.props['aria-label'],
          "aria-labelledby": _this7.props['aria-labelledby'],
          "aria-disabled": disabled,
          "data-handle-key": idx,
          key: idx
          /* eslint-disable-line react/no-array-index-key */
          ,
          orientation: orientation,
          disabled: disabled,
          onClick: _this7.killEvent,
          onKeyDown: disabled ? undefined : _this7.handleKeydown,
          onMouseDown: disabled ? undefined : _this7.startMouseSlide,
          onTouchStart: disabled ? undefined : _this7.startTouchSlide,
          handleRef: _this7.setHandleNode,
          role: "slider",
          style: handleStyle,
          tabIndex: 0
        });
      })), !!ProgressBar && handlePos.map(function (node, idx, arr) {
        if (idx === 0 && arr.length > 1) {
          return null;
        }

        return _react["default"].createElement(ProgressBar, {
          key: idx
          /* eslint-disable-line react/no-array-index-key */
          ,
          style: _this7.getProgressStyle(idx),
          disabled: disabled
        });
      }), PitComponent && pitPoints.map(function (n) {
        var pitStyle = _this7.pitStyleCache[n];

        if (!pitStyle) {
          var pos = algorithm.getPosition(n, min, max);
          pitStyle = orientation === 'vertical' ? {
            top: "".concat(pos, "%"),
            position: 'absolute'
          } : {
            left: "".concat(pos, "%"),
            position: 'absolute'
          };
          _this7.pitStyleCache[n] = pitStyle;
        }

        return _react["default"].createElement(PitComponent, {
          key: n,
          style: pitStyle
        }, n);
      }), children)
    );
  };

  return Rheostat;
}(_react["default"].Component);

Rheostat.propTypes = propTypes;
Rheostat.defaultProps = defaultProps;

var _default = (0, _reactWithDirection["default"])((0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$rheostat = _ref2.rheostat,
      color = _ref2$rheostat.color,
      unit = _ref2$rheostat.unit,
      responsive = _ref2$rheostat.responsive;
  return {
    rheostat: {
      position: 'relative',
      overflow: 'visible'
    },
    autoAdjustVerticalPosition: (0, _defineProperty2["default"])({}, responsive.largeAndAbove, {
      top: 1.5 * unit
    }),
    rheostat__vertical: {
      height: '100%'
    },
    handleContainer: {
      height: 2 * unit - 1,
      top: -2,
      left: -2,
      bottom: 4,
      width: '100%',
      position: 'absolute'
    },
    rheostat_background: {
      backgroundColor: color.white,
      border: "1px solid ".concat(color.grey),
      position: 'relative'
    },
    rheostat_background__horizontal: {
      height: 2 * unit - 1,
      top: -2,
      left: -2,
      bottom: 4,
      width: '100%'
    },
    rheostat_background__vertical: {
      width: 2 * unit - 1,
      top: 0,
      height: '100%'
    }
  };
})(Rheostat));

exports["default"] = _default;