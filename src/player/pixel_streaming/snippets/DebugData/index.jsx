import React from 'react';
import PropTypes from 'prop-types';

// styles
import {styled} from '../../styles'


const RootDiv = styled.div(() => ({

  '&[data-default="true"]': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visibility: 'hidden',
  },
  '& [data-list]': {
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },


  // CUSTOM
  '& #stats, & #LatencyStats': {
    padding: 10,
    backgroundColor: 'rgba(0,0,0, .1)',
    borderRadius: 10,
    '& > div': {
      padding: '3px 0',
      fontSize: 12,
    },
  },

}))


const StatusList = styled.ul(theme => ({
  display: 'flex',
  alignItems: 'center',
  '& > li': {
    lineHeight: '1em',
  },
  '& > [data-li="label"]': {
    fontSize: 30,
    '&.greyStatus': {
      color: 'grey',
    },
    '&.limeStatus': {
      color: 'green',
    },
    '&.orangeStatus': {
      color: 'orange',
    },
    '&.redStatus': {
      color: 'red',
    },
  },
}))


const PANEL_ID = {
  default: 'ps-debug-root',
  tmp: 'ps-debug-children',
}


function DebugForm(props) {

  const list = (label, content, details) => {
    return (
      <div>
        <ul data-list>
          <li>{label}</li>
          <li>{content}</li>
        </ul>
        {details}
      </div>
    )
  }

  const rootId = props.isDefault ? PANEL_ID.default : PANEL_ID.tmp

  if(props.isDefault && document?.getElementById(PANEL_ID.tmp)) {
    return <div />;
  }

  return (
    <RootDiv id={rootId} data-default={props.isDefault}>

      <div id="overlay" />

      {list('Status', (
        <StatusList>
          <li data-li="label" id="qualityStatus">●</li>
          <li>
            <button id="overlayButton">+</button>
          </li>
        </StatusList>
      ))}

      {list('Kick all other players', (
        <input readOnly type="button" id="kick-other-players-button" value="Kick" />
      ))}
      {list('Enlarge Display to Fill Window', (
        <input readOnly type="checkbox" id="enlarge-display-to-fill-window-tgl" checked />
      ))}
      {list('Quality control ownership', (
        <input readOnly type="checkbox" id="quality-control-ownership-tgl" />
      ))}

      <h3>
        Encoder Settings
      </h3>

      {list('Rate Control', (
        <select id="encoder-rate-control" defaultValue="CBR">
          <option value="CBR">CBR</option>
          <option value="VBR">VBR</option>
          <option value="ConstQP">ConstQP</option>
        </select>
      ))}

      {list('Target Bitrate (kbps)', (
        <input readOnly type="number" id="encoder-target-bitrate-text" value="0" min="0" max="100000" />
      ))}

      {list('Max Bitrate (kbps)', (
        <input readOnly type="number" id="encoder-max-bitrate-text" value="0" min="0" max="100000" />
      ))}

      {list('Min QP', (
        <input readOnly type="number" id="encoder-min-qp-text" value="0" min="0" max="999" />
      ))}

      {list('Max QP', (
        <input readOnly type="number" id="encoder-max-qp-text" value="0" min="0" max="999" />
      ))}

      {list('Filler Data', (
        <input readOnly type="checkbox" id="encoder-filler-data-tgl" />
      ))}

      {list('Multipass', (
        <select id="encoder-multipass" defaultValue="DISABLED">
          <option value="DISABLED">DISABLED</option>
          <option value="QUARTER">QUARTER</option>
          <option value="FULL">FULL</option>
        </select>
      ))}


      <div id="WebRTCSettings">
        <h3>
          WebRTC Settings
        </h3>

        {list('Degradation Pref', (
          <select id="webrtc-degradation-pref">
            <option value="BALANCED">BALANCED</option>
            <option value="MAINTAIN_FRAMERATE">MAINTAIN_FRAMERATE</option>
            <option value="MAINTAIN_RESOLUTION">MAINTAIN_RESOLUTION</option>
          </select>
        ))}

        {list('Max FPS', (
          <input readOnly type="number" id="webrtc-max-fps-text" value="1" min="1" max="999" />
        ))}

        {list('Min Bitrate (kbps)', (
          <input readOnly type="number" id="webrtc-min-bitrate-text" value="0" min="0" max="100000" />
        ))}

        {list('Max Bitrate (kbps)', (
          <input readOnly type="number" id="webrtc-max-bitrate-text" value="0" min="0" max="100000" />
        ))}

        {list('Low QP Threshold', (
          <input readOnly type="number" id="webrtc-low-qp-text" value="0" min="0" max="999" />
        ))}

        {list('High QP Threshold', (
          <input readOnly type="number" id="webrtc-high-qp-text" value="0" min="0" max="999" />
        ))}

        <input readOnly id="webrtc-params-submit" type="button" value="Apply" style={{width: '100%'}} />

      </div>

      <h3>
        Additional
      </h3>

      {list('Show FPS', (
        <input readOnly type="button" id="show-fps-button" value="Toggle" />
      ))}

      {list('Match Viewport Resolution', (
        <input readOnly type="checkbox" id="match-viewport-res-tgl" />
      ))}

      {list('Show Stats', (
        <input readOnly type="checkbox" id="show-stats-tgl" checked />
      ), (
        <div id="statsContainer">
          <div id="stats" />
        </div>
      ))}

      {list('Test Latency', (
        <button onClick={() => {
          window.ps_funcs.sendStartLatencyTest()
        }}>Test Latency</button>
      ), (
        <div id="LatencyStats" />
      ))}


    </RootDiv>
  )
}

DebugForm.propTypes = {
  isDefault: PropTypes.bool.isRequired,
};

DebugForm.defaultProps = {
  isDefault: false,
};

export default DebugForm
