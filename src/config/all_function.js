
import dayjs from 'dayjs'

const all_function = {   

  shortName : (text)=> {
    let letter = ''
    const myArray = text.split(" ");
    myArray.forEach(function (item, index) {
      letter += item[0].toUpperCase()      
    });
    return letter;
  },
  limit : ()=> {    
    return 20;
  },
  localStorage_setWithExpiry : (key, value, ttl)=> {
    const now = new Date()    
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  },  
  localStorage_getWithExpiry : (key)=> {
      const itemStr = localStorage.getItem(key)     
      if(!itemStr){
        return null
      }
      const item = JSON.parse(itemStr)
      const now  = new Date()     
      if(now.getTime() > item.expiry){       
        localStorage.removeItem(key)
        return null
      }
      return item.value
  },
  generateRandomNumber : (length)=>{
    var randomValues = '';
    var stringValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';  
    var sizeOfCharacter = stringValues.length;  
    for (var i = 0; i < length; i++) {
      randomValues = randomValues+stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
    }
    return randomValues;
  },
  getFormattedDate: (myDateTime)=> {
    var dateTime  = new Date(Date.parse(myDateTime));
    var date      = dateTime.getDate().toString().length > 1 ? dateTime.getDate() : '0' + dateTime.getDate();
    var month     = dateTime.getMonth().toString().length > 1 ? dateTime.getMonth() + 1 : '0' + (dateTime.getMonth() + 1);
    var hours     = dateTime.getHours().toString().length > 1 ? dateTime.getHours() : '0' + dateTime.getHours();
    var minutes   = dateTime.getMinutes().toString().length > 1 ? dateTime.getMinutes() : '0' + dateTime.getMinutes();

    var formattedDate = date + '/' + month + '/' + dateTime.getFullYear() + ' ' + hours + ':' + minutes;
    return formattedDate;
  },
  objToQuerystring : (obj)=> {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
    }
    return keyValuePairs.join('&');
  },
  getFormattedDate: (myDateTime)=> {    
    return dayjs(myDateTime).format('MM-DD-YYYY, hh:mm A');
  },
  getHourMinute: (myDateTime)=> {    
    return dayjs(myDateTime).format('hh:mm');
  },
  currency: (amount)=>{
    return '$'+amount;
  },
  get_localTime : (obj)=> {
    let localTime = new Date(new Date().toLocaleString("en-US", {timeZone: "CAT"}));
    return localTime
  },
  checkAxiosError : (err)=> { 
    if(err && err.response.statusText=='Unauthorized'){
      localStorage.removeItem('electron_authToken');	
      localStorage.removeItem('electron_user_id');         
    }     
  },

}
export default all_function;