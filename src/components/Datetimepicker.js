import DateTimePicker from "react-datetime-picker";

const DatetimePicker = (props) => {
  return (
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
  );
};

export default DatetimePicker;
