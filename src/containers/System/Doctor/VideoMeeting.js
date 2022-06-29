import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./VideoMeeting.scss";
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

class VideoMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="video-meeting">
        <div className="container">
          <div className="video-content">
            <div className="video-patient video-screen">patient screen</div>
            <div className="video-doctor video-screen">doctor screen</div>
          </div>
        <div className="video-button"><PhoneDisabledIcon className="disable-icon" style={{color: "white"}}/></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailInfoDoctors: (id) => dispatch(actions.getDetailInfoDoctors(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoMeeting);
