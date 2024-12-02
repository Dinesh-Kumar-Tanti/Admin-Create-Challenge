export function addOneDay(date) {
    const newDate = new Date(date); 
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getChallengeStatus({ startDate, endDate}) {
    const currentDate = new Date();
    if(new Date(endDate) < currentDate) {
        return 'past';
    }
    if(new Date(startDate) > currentDate) {
        return 'upcoming';
    }
    return 'active';
}

export function timeLeft(eventDate) {
    const now = new Date();
    const eventTime = new Date(eventDate);
    // Calculate the difference in milliseconds
    const difference = eventTime - now;
    // If the event has already passed
    if (difference <= 0) {
        return "The event has already passed.";
    }
    // Calculate days, hours, and minutes
    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    return {
        days,
        hours,
        minutes,
    };
}


export function formatEventDate(dateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(dateString);
    const today = new Date();

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); 

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; 
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formattedDate = `${day}${daySuffix(day)} ${month}'${year}`;

    if (date < today) {
      return `Ended on ${formattedDate}`;
    } else if (date.toDateString() === today.toDateString()) {
      return `Started today`;
    } else {
      return `Starts on ${formattedDate}`;
    }
  }