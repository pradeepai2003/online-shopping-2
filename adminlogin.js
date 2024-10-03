function login() {
    var adminemail, adminpass;
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
  
    const db = firebase.firestore(); // Initialize Firestore
    const adminRef = db.collection("admin").doc("adminCredentials"); // Assuming "adminCredentials" contains admin details
  
    adminRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data(); // Get admin data
          adminemail = data.email;
          adminpass = data.password;
          if (adminemail && adminpass) {
            if (email === "" || password === "") {
              alert("Input is blank!");
            } else if (email === adminemail && password === adminpass) {
              showLoading();
              localStorage.setItem("isAdminLoggedIn", "true");
              window.location.href = "category.html"; // Redirect to the category page
            } else {
              alert("Wrong email or password.");
            }
          } else {
            alert("Please wait and try again.");
          }
        } else {
          alert("No admin credentials found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  document.getElementById("submit").onclick = login;
  
  function showLoading() {
    document.getElementById("loading").style.display = "block";
  }
  
  function hideLoading() {
    document.getElementById("loading").style.display = "none";
  }