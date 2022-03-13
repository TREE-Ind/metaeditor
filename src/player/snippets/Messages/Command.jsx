import React from "react";

// styles
import {styled} from 'styles/snippets'

// hooks
import {useNotify} from 'hooks/'

// libs
import moment from 'moment'

// components
import JsonEditor from 'components/JsonEditor/'



const ContentDiv = styled.ul(theme => ({
  width: 400,
  padding: theme.spacing(0, 1, 1),
}))


function CommandMessage(props) {
  const notify = useNotify()

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    onCommand: (payload) => {
      // console.error('>>>>', payload);

      // const time = moment(data?.time).format('LTS')
      // payload.time = time

      // console.error('@time', time);
      // payload.time = `${time.format('LTS')} (${time.fromNow()})`

      const content = renderBody(payload)

      if(payload?.error) {
        notify.error(payload.error, {
          title: undefined,
          key: 'error',
        })
        return ;
      }

      notify.info(content, {
        title: payload.type,
        key: payload.verification_id,
      })

    },
  }));

  const renderBody = (data) => {
    return (
      <ContentDiv>

        <JsonEditor
          label={undefined}
          content={data}
          height={150}
          onChange={() => {}}
          viewOnly
         />

      </ContentDiv>
    )
  }

  return (<div />)

}

export default React.forwardRef((props, ref) => (
	<CommandMessage {...props} innerRef={ref} />
))
