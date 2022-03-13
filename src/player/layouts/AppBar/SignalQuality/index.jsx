import React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../../context/'

// helpers
import useSignal from './useSignal'

// material
import { styled } from 'styles/snippets'
import IconButton from '@mui/material/IconButton';

// components
import SliderHorizontal from 'player/components/Slider/Horizontal'
import CustomDialog from 'components/Dialog/'

// blocks
import SignalIcon from './SignalIcon'


const RootList = styled.ul(theme => ({
	display: 'flex',
	justifyContent: 'center',
	'& > [data-li="icon"]': {
		// flex: 1,
		// maxWidth: 150,
		marginRight: theme.spacing(3),
	},
	'& > [data-li="content"]': {
		flex: 1,
	}
}))

const ContentList = styled.ul(theme => ({
	paddingBottom: theme.spacing(2),
	'& > li': {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: theme.spacing(1),
		'& > label': {
			color: theme.palette.text.secondary,
			flex: 1,
			maxWidth: 120,
		}
	}
}))


function SignalQualityMenu(props) {
	const player = usePlayer()
	const signal = useSignal()
	const refDialog = React.useRef(null)

  const handleOpen = () => {
		refDialog.current.open()
  };

	const renderInner = () => {

		const {width, height} = player.state.window_size

		const getQualityLabel = () => {
			const q = player.state.resolution_multiplier
			if(q < .8) {
				return 'low';
			} else if(q < 1.2) {
				return 'normal';
			} else if(q < 1.6){
				return 'good';
			} else {
				return 'best!'
			}
		}

		const list = [
			['Bitrate', signal.bitrate_hint + ' kbps'],
			['Received', signal.received_hint],
			['Resolution', width + ' x ' + height + ' px'],
			['Quality', getQualityLabel()],
		]
		return (
			<RootList>
				<li data-li="icon">
					<SignalIcon size="large" value={signal.signal} />
				</li>
				<li data-li="content">
					<ContentList>
						{list.map(([label, value], index) => (
							<li key={index}>
								<label>
									{label}:
								</label>
								<span>
									{value}
								</span>
							</li>
						))}
					</ContentList>

					<SliderHorizontal
						step={.01}
						min={.5}
						max={2}
						defaultValue={player.state.resolution_multiplier}
	          onChange={(v) => {
							player.cls.changeQuality(v)
						}}
	        />
				</li>
			</RootList>
		)
	}

  return (
    <div>

			{props.children(
				<SignalIcon
					disabled={!player.state.loaded}
					size="small"
					value={signal.signal}
					onClick={handleOpen} />
			)}

			<CustomDialog
				ref={refDialog}
				title="Signal Quality"
				subtitle={undefined}
				closeIcon
				showActions={false}
			>
				{renderInner()}
			</CustomDialog>

    </div>
  );
}

SignalQualityMenu.propTypes = {
	children: PropTypes.func.isRequired,
};

export default SignalQualityMenu
