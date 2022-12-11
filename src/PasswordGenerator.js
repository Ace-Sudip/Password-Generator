import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineContentCopy } from "react-icons/md";

function Passwordgenerator() {
  const [password, setPassword] = useState("");
  const [passwordL, setPasswordL] = useState(10);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const numbers = "0123456789";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacter = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

  
  function handleGeneratePassword() {
    if (!includeNumbers && !includeLowerCase && !includeSymbols &&
      !includeUpperCase) {
      notify("Select at least one checkbox", true);
    } 
    else {
      let characterList = "";
      if (includeUpperCase) {
        characterList = characterList + upperCase;
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCase;
      }
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacter;
      }
      setPassword(createPassword(characterList));
      notify("Password generated successfully", false);
    }
  }

  function createPassword(characterList) {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordL; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  function copyToClipboard() {
    if (password === "") {
      notify("Password is empty", true);
    } else {
      navigator.clipboard.writeText(password);
      notify("Password successfully copied to clipboard", false);
    }
  }

  return (
    <div
      className=" d-flex bg-primary align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container-fluid  bg-white     ">
        <div className="row border-radius-10px p-3 ">
          <div className="col-12 align-items-center  text-center">
            <div className="text-center color-blue mb-3">
              <h1>Password Generator</h1>
            </div>
            <div className="p-1 text-dark mb-1  ">
              <input
                type="text"
                value={password}
                className=" col-sm-5 col-8 h4 text-primary"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="bg-white btn btn-white ml-1 mb-2 p-1"
                onClick={copyToClipboard}
              >
                {" "}
                <MdOutlineContentCopy size="22px" />
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="pl" className="form-check-label h5">
                Length: &nbsp;{" "}
              </label>
              <input
                id="pl"
                type="number"
                defaultValue={passwordL}
                onChange={(e) => {
                  setPasswordL(e.target.value);
                }}
                min="8"
                max="25"
              />
            </div>

            <div className="form-check h5 mb-2">
              <input
                checked={includeUpperCase}
                onChange={(e) => {
                  setIncludeUpperCase(e.target.checked);
                }}
                className="form-check-input "
                type="checkbox"
                value=""
                id="defaultCheck1"
              />

              <label className="form-check-label mb-1 " htmlFor="defaultCheck1">
                Add Uppercase Letter
              </label>
              <br />
              <input
                checked={includeLowerCase}
                onChange={(e) => {
                  setIncludeLowerCase(e.target.checked);
                }}
                className="form-check-input "
                type="checkbox"
                id="defaultCheck2"
              />
              <label className="form-check-label mb-1" htmlFor="defaultCheck2">
                Add Lowercase Letter
              </label>
              <br />
              <input
                checked={includeNumbers}
                onChange={(e) => {
                  setIncludeNumbers(e.target.checked);
                }}
                className="form-check-input "
                type="checkbox"
                value=""
                id="defaultCheck3"
              />
              <label className="form-check-label mb-1" htmlFor="defaultCheck3">
                Include Numbers
              </label>
              <br />
              <input
                checked={includeSymbols}
                onChange={(e) => {
                  setIncludeSymbols(e.target.checked);
                }}
                className="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck4"
              />
              <label className="form-check-label mb-2" htmlFor="defaultCheck4">
                Include Symbols
              </label>
              <br />
              <button
                className="btn btn-primary  "
                onClick={handleGeneratePassword}
              >
                Generate Password
              </button>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Passwordgenerator;
