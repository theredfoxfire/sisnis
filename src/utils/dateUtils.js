export const getDateByStringJSON = (jsonDate = '') => {
  const arrayDateTime = jsonDate.split('T');
  const date = arrayDateTime[0];
  const time = arrayDateTime[1];
  const dateArray = date.split('-');
  const timeArray = date.split(':');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];
  const hour = timeArray[0];
  const minutes = timeArray[1];
  const seconds = timeArray[2];
  const newDateObject = new Date(jsonDate);

  return {
    date,
    time,
    year,
    month,
    day,
    hour,
    minutes,
    seconds,
    dateIDN: `${day}-${month}-${year}`,
    newDateObject,
  };
}

export const getDateStringFromObject = (dateObject) => {
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  return `${year}-${month+1}-${day}`;
}

export const getStringFromOptions = (key, options) => {
  return options.find(item => item.id === key) || {label: "", id: ""};
}
