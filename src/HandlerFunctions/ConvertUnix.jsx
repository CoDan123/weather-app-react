import react from "react";

const ConvertUnix = (timeStamp) => {
    let dateObj = new Date(timeStamp * 1000);
    
    let hours = dateObj.getHours().toString().padStart(2, 0);
    let minutes = dateObj.getUTCMinutes().toString();

    return (`${hours}:${minutes}`);
  }

  export default ConvertUnix;