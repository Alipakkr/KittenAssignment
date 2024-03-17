let wrapper = document.querySelector(".wrapper"),
  signUpLink = document.querySelector(".link .signup-link"),
  signInLink = document.querySelector(".link .signin-link");

signUpLink.addEventListener("click", () => {
  wrapper.classList.add("animated-signin");
  wrapper.classList.remove("animated-signup");
});

signInLink.addEventListener("click", () => {
  wrapper.classList.add("animated-signup");
  wrapper.classList.remove("animated-signin");
});

const baseURL = "https://type-racing-speedster.onrender.com/";

const invalidspan = document.getElementById("invalid-text");
const invalid1span = document.getElementById("invalid1-text");
const sendOtpButton = document.getElementById("send-otp");

sendOtpButton.addEventListener("click", async function () {
  const emailInput = document.getElementById("sign-up-email");
  const email = emailInput.value;
  console.log(email);
  try {
    const response = await fetch(`${baseURL}users/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      invalid1span.innerHTML = `${data.msg}`; // Show success message
      invalid1span.style.color = "green";
    } else {
      invalid1span.innerHTML = `${data.msg}`; // Show error message
      invalid1span.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);

    invalid1span.innerHTML = "Something went wrong !";
  }
});

document.getElementById("register_btn").addEventListener("click", registerUser);
async function registerUser() {
  //getting elements
  const username_input = document.getElementById("sign-up-username");
  const password_input = document.getElementById("sign-up-password");
  const email_input = document.getElementById("sign-up-email");
  const otp_input = document.getElementById("sign-up-otp");

  //getting values
  const username = username_input.value;
  const password = password_input.value;
  const email = email_input.value;
  const otp = otp_input.value;
  try {
    if (username && password && email && otp) {
      const response = await fetch(`${baseURL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        invalid1span.innerHTML = `${data.msg}`; // Show success message
        invalid1span.style.color = "green";
        invalid1span.style.fontSize = "16px";
      } else {
        invalid1span.innerHTML = `${data.msg}`; // Show success message
        invalid1span.style.color = "red";
        invalid1span.style.fontSize = "16px";
        // checkCredentials("Invalid Otp or Password"); // Show error message
      }
    } else {
      invalid1span.innerHTML = "Enter Your Details";
      invalid1span.style.color = "red";
      invalid1span.style.fontSize = "16px";
    }
  } catch (error) {
    console.error("Error:", error);
    invalid1span.innerHTML = "Something went wrong";
    invalid1span.style.color = "red";
    invalid1span.style.fontSize = "16px";
  }
}

const loginButton = document.getElementById("log-in-btn");

loginButton.addEventListener("click", loginUser);
async function loginUser() {
  // getting elements
  const username_input = document.getElementById("log-in-username");
  const password_input = document.getElementById("log-in-password");
  // getting values
  const emailOrUserName = username_input.value;
  const password = password_input.value;
  try {
    if (emailOrUserName && password) {
      const response = await fetch(`${baseURL}users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailOrUserName, password }),
      });
      const data = await response.json();
      if (response.ok) {
        invalidspan.innerHTML = `${data.msg}`;
        invalidspan.style.color = "green";
        invalidspan.style.fontSize = "16px";
        console.log(data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("name", data.name);

        location.href = "../public/dashboard.html";
      } else {
        invalidspan.innerHTML = `${data.msg}`;
        invalidspan.style.color = "red";
        invalidspan.style.fontSize = "16px";
      }
    } else {
      invalidspan.innerHTML = "Enter Your Details";
      invalidspan.style.color = "red";
      invalidspan.style.fontSize = "16px";
    }
  } catch (error) {
    console.error("Error:", error);
    invalidspan.innerHTML = "Something went wrong";
    invalidspan.style.color = "red";
    invalidspan.style.fontSize = "16px";
  }
}

const login_facebook = document.getElementById("facebook-login");
login_facebook.addEventListener("click", () => {
    window.location.href = `${baseURL}facebook`;
});

const google_login = document.getElementById("google-login");
google_login.addEventListener("click", () => {
    window.location.href = `${baseURL}google`;
});