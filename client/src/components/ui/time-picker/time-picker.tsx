import { Fragment, useState } from 'react';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function SecondsTimePicker() {
  const [selectedTime, setTime] = useState<Date | null>(new Date(1970, 1, 1, 0, 2, 20));

  const handleTimeChange = (time: Date | null) => {
    // const minutes = new Date(val).getMinutes();
    // const seconds = new Date(val).getSeconds();
    // console.log(`${minutes}:${seconds}`);
    setTime(time);
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          ampm={false}
          openTo="seconds"
          views={['minutes', 'seconds']}
          format="mm:ss"
          label="Set min, sec"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default SecondsTimePicker;