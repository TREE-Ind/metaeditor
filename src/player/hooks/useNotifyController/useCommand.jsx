import React from "react";

// styles
import { styled } from 'styles/snippets'

// hooks
import { useNotify } from 'hooks/'

// libs
import moment from 'moment'

// components
import JsonEditor from 'components/JsonEditor/'



const ContentDiv = styled.ul(theme => ({
  width: 400,
  padding: theme.spacing(0, 1, 1),
}))


function useCommand(props) {
  const notify = useNotify()

  const sendCommand = (payload) => {
    // console.error('>>>>', payload);

    // const time = moment(data?.time).format('LTS')
    // payload.time = time

    // console.error('@time', time);
    // payload.time = `${time.format('LTS')} (${time.fromNow()})`

    const content = renderBody(payload)

    if (payload?.error) {
      notify.error(payload.error, {
        title: undefined,
        key: 'error',
      })
      return;
    }

    if (['console_command'].includes(payload?.type)) {
      return;
    }

    notify.info(content, {
      title: payload.type,
      key: payload.verification_id,
    })

  }

  const renderBody = (data) => {
    return (
      <ContentDiv>

        <JsonEditor
          label={undefined}
          content={data}
          height={150}
          onChange={() => { }}
          viewOnly
        />

      </ContentDiv>
    )
  }

  return {
    sendCommand,
  };

}

export default useCommand
