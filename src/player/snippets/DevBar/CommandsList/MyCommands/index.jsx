import React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../../../context/'

// libs
import _ from 'lodash'

// material
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from '@mui/material/Icon';

// styles
import {styled, alpha} from 'styles/snippets'

// use
import useCommands from './useCommands'

// blocks
import CommandForm from './CommandForm'
import ExportDialog from './ExportDialog'


const CommandList = styled.div(theme => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
  overflow: 'auto',
  maxHeight: '25vh',
  '& > ul': {
    borderBottom: `solid 1px ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'stretch',
    ...theme.typography.body2,
    '&:hover': {
      backgroundColor: alpha(theme.palette.divider, .04),
    },
    '&:last-child': {
      borderBottom: 0,
    },
    '& > li': {
      flex: 1,
      padding: theme.spacing(1, 1),
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: alpha(theme.palette.divider, .1),
      },
    },
    '& > [data-li="content"]': {
      justifyContent: 'space-between',
      '& > ul': {
        '& > li': {
          ...theme.typography.body2,
          maxWidth: 200,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.2em',
          '&:nth-child(2)': {
            fontSize: 11,
            opacity: .5,
          },
        },
      },
      '& > [data-list="right"]': {
        '& > li': {
          textAlign: 'right',
        },
      },
    },
    '& > [data-li="icon"]': {
      borderRight: `solid 1px ${theme.palette.divider}`,
      minWidth: 45,
      maxWidth: 45,
      justifyContent: 'center',
      // backgroundColor: alpha(theme.palette.divider, .1),
    }
  }
}))

function MyCommands(props) {
  const player = usePlayer()

  const refCommandForm = React.useRef(null)
  const refExportDialog = React.useRef(null)

  const commands = useCommands()

  const [show, setShow] = React.useState(false)

  const onAdd = (fields) => {
    commands.addCommand(fields)
    setShow(true)
  }

  const onUpdate = (fields) => {
    commands.updateCommand(fields)
  }

  const onDelete = (fields) => {
    commands.deleteCommand(fields)
  }

  const commands_list = commands.commandsList

  const renderList = () => {

    if(commands_list.length === 0) {
      return (<div />);
    }

    const list = _.orderBy(commands_list, ['time', 'group'], ['asc', 'asc']);

    return (
      <CommandList>
        {list.map((item, index) => (
          <ul key={index}>
            <li data-li="icon" onClick={() => {

              player.cls.client.emit({
                type: item.slug,
                value: item.json,
                verification_id: undefined,
              })

            }}>
              <Icon>play_arrow</Icon>
            </li>
            <li data-li="content" onClick={() => refCommandForm.current.edit(item)}>
              <ul>
                <li>
                  {item.name}
                </li>
                {!item.default && (
                  <li>
                    id:{item.id}
                  </li>
                )}
              </ul>
              <ul data-list="right">
                <li>
                  {item.slug}
                </li>
                <li>
                  {item.group}
                </li>
              </ul>
            </li>
          </ul>
        ))}
      </CommandList>
    );
  }

  return (
    <div>

      <ButtonGroup
        fullWidth
        variant="outlined"
        color="inherit">
        <Button onClick={() => setShow(c => !c)}>My commands: {commands_list.length}</Button>
        <Button sx={{width: 50}} onClick={() => {
          refCommandForm.current.addNew()
        }}>
          <Icon>add</Icon>
        </Button>
        <Button sx={{width: 50}} onClick={() => {
          refExportDialog.current.open()
        }}>
          <Icon>cloud_upload</Icon>
        </Button>
      </ButtonGroup>

      <ExportDialog
        ref={refExportDialog}
        onImport={commands.importData}
        onExport={commands.exportData}
      />

      <CommandForm
        ref={refCommandForm}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete} />

      <Collapse in={show}>
        {renderList()}
      </Collapse>


    </div>
  )
}

export default MyCommands
