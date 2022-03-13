import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../../context/'

// material
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// libs
import moment from 'moment'

// styles
import {styled} from 'styles/snippets'

// components
import JsonEditor from 'components/JsonEditor/'

// blocks
import MyCommands from './MyCommands/'

const DataList = styled.div(theme => ({

  '& > li': {
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0,
    },
  }
}))

function CommandsList() {
  const player = usePlayer()

  const renderList = (label, obj) => {

    const list = obj.list.map(item => {
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
          obj.clear()
        }}>Clear</a>)
      </div>
    )

    return (
      <div>
        <JsonEditor
          label={label}
          content={list}
          height={'25vh'}
          onChange={() => {}}
          viewOnly
         />
      </div>
    )
  }

  return (
    <div>

      <DataList>
        <li>
          <MyCommands />
        </li>
        <li>
          {renderList('Commands', player.cls.commands)}
        </li>
        <li>
          {renderList('Callbacks', player.cls.callbacks)}
        </li>
      </DataList>

    </div>
  )
}

export default CommandsList
