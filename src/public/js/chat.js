const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

fetch('/getProfile')
  .then(response => response.json())
  .then(data => {
    user = data;

    function addMessage(message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = message.text;
        messagesDiv.appendChild(newMessage);
      }
      
      socket.on('message', message => {
        addMessage(message);

      });
      
      form.addEventListener('submit', event => {
        event.preventDefault();
      
        const message = input.value.trim(); 
        
        if (message !== '') {
          if(user.rol=='admin'){
           alert("Los administradores no pueden enviar mensajes")
          }else{
            const Message = {
                text: message,
                user: user.email 
            }
            socket.emit('sendMessage', Message );
          }
      
          input.value = ''; 
        }
      });

  })
  .catch(error => {
    console.error(error);
  });

