/* Usage
https://www.npmjs.com/package/react-device-detect

// hooks
import {useDevice} from 'hooks/'

function demo() {
	const device = useDevice();

	return (
		<div>
			{device.isMobile && 'isMobile'}
			<br />
			{device.isDesktop && 'isDesktop'}
		</div>
	)
}

*/

import React from 'react';

// libs
// import * as detect from 'react-device-detect';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


function useDevice() {

	return {
		BrowserView,
		MobileView,
		isBrowser,
		isMobile,
	}

}


export default useDevice
