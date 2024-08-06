function startConnect(){
    clientID = "clientID - "+parseInt(Math.random() * 100);
    host = document.getElementById("host").value;   
    port = document.getElementById("port").value;  
    //userId  = document.getElementById("username").value;  
    //passwordId = document.getElementById("password").value;  

    document.getElementById("messages").innerHTML += "<span> Connecting to " + host + "on port " +port+"</span><br>";
    document.getElementById("messages").innerHTML += "<span> Using the client Id " + clientID +" </span><br>";

    client = new Paho.MQTT.Client(host,Number(port),clientID);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        'useSSL': true,
        'onSuccess': onConnect
    });
}

function onConnect(){
    topic =  document.getElementById("topic_s").value;
    document.getElementById("messages").innerHTML += "<span> Subscribing to topic "+topic + "</span><br>";
    client.subscribe(topic);
}

function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> ERROR: Connection is lost.</span><br>";
    if(responseObject !=0){
        document.getElementById("messages").innerHTML += "<span> ERROR:"+ responseObject.errorMessage +"</span><br>";
    }
}

function onMessageArrived(message){
    console.log("OnMessageArrived: "+message.payloadString);
    document.getElementById("messages").innerHTML += "<span> Topic:"+message.destinationName+"| Message : "+message.payloadString + "</span><br>";
}

function startDisconnect(){
    client.disconnect();
    document.getElementById("messages").innerHTML += "<span> Disconnected. </span><br>";
}

function publishMessage(){
msg = document.getElementById("Message").value;
topic = document.getElementById("topic_p").value;

Message = new Paho.MQTT.Message(msg);
Message.destinationName = topic;
client.send(Message);
document.getElementById("messages").innerHTML += "Message to topic "+topic+" is sent";
}

//toggle switch
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        console.log('Checked');
      } else {
        // do that
        console.log('Not checked');
      }
    });
  });


//keep with end of scroling
document.getElementById('scrollit').scrollTop = 9999999;


function sliderValue(){
    var slider = document.getElementById("slider");
    var output = document.getElementById("slider_value");
    output.innerHTML = slider.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    slider.onchange = function() {
      output.innerHTML = this.value;
      msg = this.value;
      topic = "carpenters_robot/speed";
      Message = new Paho.MQTT.Message(msg);
      Message.destinationName = topic;
      client.send(Message);
      document.getElementById("messages").innerHTML += "<span> Message:"+msg+" to topic "+topic+" is sent </span><br>";
    }

}
