import PropTypes from 'prop-types';

// context
import { usePlayer } from 'player/context/';

// styles
import { styled } from 'styles/snippets'

// blocks
import MyCommands from './MyCommands/'

// snippets
import JsonSourceList from '../snippets/JsonSourceList'


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

  return (
    <div>

      <DataList>
        <li>
          <MyCommands />
        </li>
        <li>
          <JsonSourceList
            label="Commands"
            json={player.cls.commands.list}
            onClear={() => player.cls.commands.clear()}
            height={undefined} />
        </li>
        <li>
          <JsonSourceList
            label="Callbacks"
            json={player.cls.callbacks.list}
            onClear={() => player.cls.callbacks.clear()}
            height={undefined} />
        </li>
      </DataList>

    </div>
  )
}

export default CommandsList
