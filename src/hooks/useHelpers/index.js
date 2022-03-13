/* Usage

// hooks
import {useHelpers} from 'hooks/'

function demo() {
  const helpers = useHelpers();

  return (
    helpers.format.formatMoney(10000, '$')
    helpers.format.formatNumber({
      value: 33,
      decimal: 2,
      addon: '',
      separator: ',',
    })
  )
}


*/

// hooks
import format from './FormatClass';
import custom from './CustomClass';
import array from './ArrayClass';

const useHelpers = () => {
  return {
    format,
    custom,
    array,
  }
}

export default useHelpers
