import React from 'react';
import PropTypes from 'prop-types';

// context
import ContextProvider, {usePS} from './context/';

// styles
import {styled} from './styles'

// snippets
import DebugData from './snippets/DebugData/';

export {
	usePS,
	DebugData,
}

const VideoContainer = styled.div((theme) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	height: 'var(--window-height)',
	overflow: 'hidden',
	'&[data-loaded="false"]': {
		pointerEvents: 'none',
		visibility: 'hidden',
	},
	'& > video': {
		height: '100%',
		width: '100%',
		objectFit: 'cover',
		backgroundSize: 'cover',
	},
}))

const Content = styled.div((theme) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	height: 'var(--window-height)',
	overflow: 'hidden',
	pointerEvents: 'none',
	'& [data-click="true"], button, input, select, checkbox': {
		pointerEvents: 'all',
	},
}))


const ModuleRoot = (props) => {
	const prevHost = React.useRef(null);

	const [mounted, setMounted] = React.useState(false)

	const PS = usePS()
	const PS_LOADED = PS?.state?.loaded || false
	const PS_CONNECTED = PS?.state?.connected || false

	const [debugPanel, setDebugPanel] = React.useState(true)

	// Init connection
	const initConnection = () => {
		setTimeout(() => ContextClass.initConnection(), 1000) // Delay for preparing debug panel
	}

	React.useEffect(() => {

		if(!document.getElementById("playerUI")) {
			setDebugPanel(false)
		}

		setMounted(true)

  }, [])



  React.useEffect(() => {

		if(typeof props.host === 'string' && prevHost.current !== props.host) {

			if(props.autoConnect) {
				initConnection()
			}
		}

		prevHost.current = props.host; // assign the ref's current value

  }, [props.host]);

	const refClass = new class {
		constructor() {}

		emit({type, value, verification_id=undefined} = {}) {
			PS.cls.client.emit({type, value, verification_id})
		}
	}

	const ContextClass = new class {
		constructor() {}

		get cls() {
			return PS.cls;
		}

		get state() {
			return PS.state;
		}

		initConnection() {

			if(!props.host || !props.port) {
				console.error('Stream server not found');
				return ;
			}

			PS.cls.init({
				host: props.host,
				port: props.port,

				onLoad: props.onLoad,
				onConnect: props.onConnect,
				onRestart: props.onRestart,
				onError: props.onError,
				onClose: props.onClose,

				onCommand: props.onCommand,
				onCallback: props.onCallback,
				onDebug: props.onDebug,

				quality: props.quality,
			})
		}
	}

	// The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument

	React.useImperativeHandle(props.innerRef, () => refClass);


	if(mounted === false) {
		return (<div />);
	}

  return (
		<>
			<VideoContainer data-loaded={PS_LOADED} id="player" />
			<Content>
				<DebugData isDefault />
				{props.children(ContextClass)}
			</Content>
    </>
	)

};

ModuleRoot.propTypes = {
	children: PropTypes.func.isRequired,

	onLoad: PropTypes.func,
	onConnect: PropTypes.func,
	onRestart: PropTypes.func,
	onError: PropTypes.func,
	onClose: PropTypes.func,
	onCommand: PropTypes.func,
	onCallback: PropTypes.func,
	onDebug: PropTypes.func,

	onProgress: PropTypes.func,
	host: PropTypes.string,
	port: PropTypes.any,
	autoConnect: PropTypes.bool,
	isDev: PropTypes.bool,

	quality: PropTypes.number,
};

ModuleRoot.defaultProps = {
	children: () => {},

	onLoad: () => {},
	onConnect: () => {},
	onRestart: () => {},
	onError: () => {},
	onClose: () => {},
	onCommand: () => {},
	onCallback: () => {},
	onDebug: () => {},

	onProgress: () => {},
	host: undefined,
	port: 80,
	autoConnect: true,
	isDev: false,

	quality: 1,
};

export default React.forwardRef((props, ref) => (
	<ContextProvider>
		<ModuleRoot {...props} innerRef={ref} />
	</ContextProvider>
))
