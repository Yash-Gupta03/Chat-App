// import {io} from 'socket.io-client';

const socket = io('http://localhost:4000');
socket.on('connect', ()=>{
  console.log("connection established");
})

const chattable = document.getElementById('chattable');


  
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const token = localStorage.getItem("id");
      const res = await axios.get("http://localhost:3000/group/retrieve", {
        headers: { Authorization: token },
      });
      res.data.groupsInfo.forEach((group) => {
        const parentNode = document.getElementById("chat-list");
        const createNewItemHtml = `<button id='${group.name}' onclick="loadchat('${group.name}')"<div class="chat-box"><div class="chat-detail"><div class="text-head">${group.name}</div></div></div></button>`;
        parentNode.innerHTML += createNewItemHtml;
      });
    } catch (error) {
      console.log(error);
    }
  });

  async function loadchat(groupname){
        localStorage.setItem('groupName',JSON.stringify(groupname))
        loadMessages();
  }
  

  const groupname = document.getElementById('groupname');

  async function loadMessages(){
    // chattable.innerHTML = '';
    groupname.innerHTML=JSON.parse(localStorage.getItem('groupName'));
    const gname = JSON.parse(localStorage.getItem('groupName'));
    socket.emit("retrieve-messages", gname);

    socket.on('allMessages', (data)=>{
      console.log(data);
      chattable.innerHTML = '';
      for(let i = 0; i<data.length; i++){
      showmessage(data[i].name, data[i].message);
    }
    })

    // const messages = await axios.get(`http://localhost:3000/message/retrieve-messages/${gname}`);
    // console.log(messages.data.allMessages[0].message);
    // for(let i = 0; i<messages.data.allMessages.length; i++){
    //   showmessage(messages.data.allMessages[i].name, messages.data.allMessages[i].message);
    // }


  }


const sendbtn = document.getElementById('sendbtn');

sendbtn.addEventListener('click',sendmessage);

const message = document.getElementById('message');

async function sendmessage(e){
  const groupName=JSON.parse(localStorage.getItem('groupName'));
  try{
      e.preventDefault();
      const messagedata={
        message:message.value,
        groupName: groupName
     }
     const token=localStorage.getItem('id');
  
     const response= await axios.post(`http://localhost:3000/message/add-message`,messagedata,{headers:{Authorization : token}});
     console.log('--------------------------',response.data.name,response.data.newMessage.message);
     console.log("running");
    //  showmessage(response.data.name.name,response.data.newMessage.message)
     message.value='';
     loadMessages();
      }catch(err){
        console.log(err);
      }
    }


    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }


  async function showmessage(user, message){
    console.log(user, message);
    const token=localStorage.getItem('id');
            const decodedtoken = parseJwt(token);
            let className;
            if(user===decodedtoken.name)
            {
              className='currentuser'
            }
            else{
                className = 'otheruser'
            }
            chattable.className="tbody";
            chattable.innerHTML+=`<tr class=${className}><td>${user}-${message}</td></tr>`;
  }