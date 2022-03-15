import react from "react";

const ConvertUnix = (timeStamp) => {
    let dateObj = new Date(timeStamp * 1000);
    
    let hours = dateObj.getHours().toString().padStart(2, 0);
    let minutes = dateObj.getUTCMinutes().toString();
    let addZeroIfOneDigit = ('0' + minutes).slice(-2);

    return (`${hours}:${addZeroIfOneDigit}`);
  }

  export default ConvertUnix;