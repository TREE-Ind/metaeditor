import PropTypes from 'prop-types';

// libs
import moment from 'moment'

// components
import JsonEditor from 'components/JsonEditor/'


function JsonSourceList({ label, json, height, ...props }) {

  const list = json.map(item => {
    const time = moment.utc(item.time)
    return {
      ...item,
      time: `${time.format('LTS')} (${time.fromNow()})`,
    };
  })

  label = (
    <div>
      {label} (<a href="#" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.onClear()
      }}>Clear all</a>)
    </div>
  )

  return (
    <div>
      <JsonEditor
        label={label}
        content={list}
        height={height}
        onChange={() => { }}
        viewOnly
      />
    </div>
  )
}

JsonSourceList.propTypes = {
  label: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  json: PropTypes.any.isRequired,
  height: PropTypes.any,
};

JsonSourceList.defaultProps = {
  height: '25vh',
}

export default JsonSourceList
