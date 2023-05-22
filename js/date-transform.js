const dateTransform = (date) => {
  
  const [day, month, year] = date.split('.');
  
  if ((day < 32 && month < 13 && year.length < 5) && Number(day) && Number(month) && Number(year)) {
    const date = new Date(+year, month - 1, +day);
    const nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return `${dayOfWeek[date.getDay()]}, ${(Math.ceil((+day + (6 + new Date(year, month - 1).getDay()) % 7) / 7))} week ${nameMonth[date.getMonth()]} ${year}`;
  } else {
    return 'Дата некорректна';
  }
}

export default dateTransform;