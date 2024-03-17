function logout() {
    const accessToken = localStorage.getItem("token");
  
    fetch(`https://kittenassignment.onrender.com/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token");
          return response.json();
        } else {
          throw new Error(`Logout failed: ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log(result.msg);
        location.href = "../../index.html";
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
 
  function toggleMenu() {
    var innerNavbar = document.querySelector(".inner-navbar");
    innerNavbar.classList.toggle("show");
  }