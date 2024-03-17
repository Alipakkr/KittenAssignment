function logout() {
    const accessToken = localStorage.getItem("token");
  
    fetch(`https://type-racing-speedster.onrender.com/users/logout`, {
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
  
  document.getElementById("Learnig").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../view/learningTool.html";
  });
  
  document.getElementById("team").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../view/news.html";
  });
  
  document.getElementById("Home").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../public/dashboard.html";
  });
  
  document.getElementById("achievements").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../view/achivement.html";
  });
  function toggleMenu() {
    var innerNavbar = document.querySelector(".inner-navbar");
    innerNavbar.classList.toggle("show");
  }