
const validation = { 
    validateEmail:(Text)=>{
        let regexp = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);               
        if(Text.match(regexp)){	
            return true;	
        }
        else{
            return false; 
        }
    },
    validateUrl:(Text)=>{
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        if(Text.match(regex)){	
            return true;	
        }
        else{
            return false; 
        }   
    },
    validatePhone:(Text)=>{
        //const regex = new RegExp(/^([0-9\s\-\+\(\)]*)$/);
        //const regex = new RegExp(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/);
        const regex = new RegExp(/^[0-9()+-\s]*$/);  
        
        if(Text.match(regex)){	
            return true;	
        }
        else{
            return false; 
        }   
    },
    ImageUpload:()=>{
        let size = 5 // 5 MB
        let extensions = 'jpeg, png, gif, webp'
        let mimeType = 'image/jpeg, image/png, image/gif, image/webp'
        return {
            'maxFileSize':size,
            'maxFileSizeInBytes':parseInt(size*1048576),
            'allowedExtensions':extensions,
            'allowedExtensionsArr':mimeType.split(",").map(item => item.trim()),
        }
    },
    validateName:(Text)=>{
        const regex = new RegExp(/^[a-zA-Z]+( [a-zA-Z]+)+$/);
        if(Text.match(regex)){	
            return true;	
        }        
        else{
            return false; 
        }   
    },

}
export default validation;