import * as log from 'loglevel';
// log.warn("module-tastic");


const LOG_LEVEL = {
	DETAILED: 5,
	NORMAL: 1,
}

const LOG_CURRENT = LOG_LEVEL.NORMAL


const MsgEvent = new class {
	constructor() {}

	_event(type, payload, log) {
		if(LOG_CURRENT === LOG_LEVEL.NORMAL && log !== LOG_LEVEL.NORMAL) {
			return ;
		}

		const detail = {type, payload}
		const ev = new CustomEvent('ps_debug', {detail})
		document.dispatchEvent(ev)
	}

	func(...args) {
		this._event('func', args, LOG_LEVEL.DETAILED)
	}
	log(...args) {
		this._event('log', args, LOG_LEVEL.NORMAL)
	}
	warn(...args) {
		this._event('warn', args, LOG_LEVEL.NORMAL)
	}
	info(...args) {
		this._event('info', args, LOG_LEVEL.NORMAL)
	}
	error(...args) {
		this._event('error', args, LOG_LEVEL.NORMAL)
	}

	get webrtc() {
		return {
			log: (...args) => this._event('webrtc:log', args, LOG_LEVEL.DETAILED),
			warn: (...args) => this._event('webrtc:warn', args, LOG_LEVEL.DETAILED),
			info: (...args) => this._event('webrtc:info', args, LOG_LEVEL.DETAILED),
			error: (...args) => this._event('webrtc:error', args, LOG_LEVEL.DETAILED),
		};
	}
}

export default MsgEvent
