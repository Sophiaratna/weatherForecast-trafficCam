import DateTimePicker from "react-datetime-picker";

const DatetimePicker = (props) => {
  return (
    <>
      <h1>Please select date and time below:</h1>

      <DateTimePicker
        onChange={(event) => {
          console.log(event);
          props.setDateTime(event);
        }}
        value={props.dateTime}
        clearIcon={null}
        maxDate={new Date()}
        maxTime={new Date()}
        format="dd/MM/yyyy hh:mm a"
        required={true}
      />
    </>
  );
};

export default DatetimePicker;
