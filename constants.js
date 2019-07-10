function getConfirations(object_type){
    var object={}
    switch (object_type)  
    { 
       case "Fiber":



           object.color="blue"; 
           break; 
       case 1: 
           object.color="blue"; ; 
           break; 
       case 2: 
           object.color="blue"; ; 
           break; 
       default: 
           object.color="red"; ; 
    } 
    return object;
}
var k=getConfirations("Fibe")
console.log(k)