function getHoursAndMinutesFormatted():string{ 
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`
    return formattedTime
}

export default getHoursAndMinutesFormatted