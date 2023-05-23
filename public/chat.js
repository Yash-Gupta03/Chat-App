async function messageInfo(e) {
    e.preventDefault();
    let message = document.getElementById("message").value;
    console.log("working");
  
    // Making values in the form null after submitting the form
    document.getElementById("message").value = null;
  
    // Creating object of the data
    const obj = {
      message
    };
    // Post request to the server to store user details
    const token = localStorage.getItem("id");
    try{
    const response = await axios.post(`http://localhost:3000/message/add-message`, obj, {
        headers: { Authorization: token },
      })
      console.log(response.status);
        if (response.status == 200) {
          const data = response.data.newMessageDetail;
          showMessageOnScreen(data);
        }
  
      }catch(err) {
        console.log(err);
        alert(err);
      };
  }


  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("id");  
    try{
    const res = await axios.get(`http://localhost:3000/message/get-message`)
        for (let i = 0; i < res.data.allMessageDetails.length; i++) {
          showMessageOnScreen(res.data.allMessageDetails[i]);
        }
    }catch(err){ console.log(err);}
  });
  

  function showMessageOnScreen(data) {
    const parentElement = document.getElementById("message-list");
    const childElement = `<li class="list-group-item list-group-item-primary">${data.message}</li>`
    parentElement.innerHTML += childElement;
  }
  