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
        if (response.status == 200) {
            console.log("check 2");
          const data = response.data.newMessageDetail;
          showMessageOnScreen(data);
        }
  
      }catch(err) {
        console.log(err);
        alert(err);
        // const parentNode = document.getElementById("list");
        // const childNode = `<div style="color:red"><h5>${err.message}</h5></div>`;
        // parentNode.innerHTML += childNode;
      };
  }

  function showMessageOnScreen(data) {
    const parentElement = document.getElementById("list-group");
    const childElement = `<li class="list-group-item list-group-item-primary">${data.message}</li>`
    parentElement.innerHTML += childElement;
  }
  