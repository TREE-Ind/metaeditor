// import * as log from 'loglevel';
// log.warn("module-tastic");


// const LOG_LEVEL = {
// 	DETAILED: 5,
// 	NORMAL: 1,
// }
//
// const LOG_CURRENT = LOG_LEVEL.NORMAL


const MsgEvent = new class {
	constructor() { }

	_event(type, payload) {
		// if(LOG_CURRENT === LOG_LEVEL.NORMAL && log !== LOG_LEVEL.NORMAL) {
		// 	return ;
		// }

		const detail = { type, payload }
		const ev = new CustomEvent('ps_debug', { detail })
		document.dispatchEvent(ev)
	}

	func(...args) {
		this._event('func', args)
	}
	log(...args) {
		this._event('log', args)
	}
	warn(...args) {
		this._event('warn', args)
	}
	info(...args) {
		this._event('info', args)
	}
	error(...args) {
		this._event('error', args)
	}

	get webrtc() {
		return {
			log: (...args) => this._event('webrtc:log', args),
			warn: (...args) => this._event('webrtc:warn', args),
			info: (...args) => this._event('webrtc:info', args),
			error: (...args) => this._event('webrtc:error', args),
		};
	}
}

export default MsgEvent
