import PasswordForget from '../assets/PasswordForget.svg';
import {useState} from "react";
import CustomInput from "../components/CustomInput";
import {useHistory} from "react-router";
import backendService from "../services/backendService";
import hashString from "../services/hashString";
import InputValidation from "../services/InputValidation";

export default function ForgotPassword(){
    const history = useHistory();

    const [username,setUsername]=useState("");
    // const [sec, setSec] = useState("");
    const [password,setPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [securityAnswer,setSecurityAnswer]=useState('');

    const [securityQuestion, setSecurityQuestion] = useState("Security Question");
    // const [statusCode, setStatusCode] = useState(0);

    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }

    const handleSecChange=(e)=>{
        setSecurityAnswer(e.target.value);
    }

    const handlePassChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleNewPassChange=(e)=>{
        setNewPassword(e.target.value);
    }

    const fetchSecurityQuestion = async () => {
        let response = await backendService("GET", "/forgotPassword?username="+username, null, null, null);
        // let receivedStatusCode = response.statusCode;
        // console.log(response)
        response = typeof response.response==="undefined"?"null":response.response._text;
        response = response.trim();
        // console.log(response)
        if(response.localeCompare("\nNo such user\n") === 0)
            setSecurityQuestion("Security Question Not Found (User does not exist)");
        else
            setSecurityQuestion(response);
        setSecurityQuestion(response);
    }

    

    return (
        <div>
            <div className="loginLeftDiv">
                <img src={PasswordForget} alt="Forgot Password"/>
            </div>
            <div className="loginRightDiv">

                <div id="loginRightDivSubCol" className="signInFormDiv">
                    <form id="signInForm">
                        {/* <h1 className="heading setFont">Higher Studies Portal</h1> */}
                        <h2 className="setFont subHeading">Forgot password</h2>
                        <h2 className="setFont secQs">Username:</h2>
                        <CustomInput type={'text'} value={username} onChange={handleUsernameChange}/>

                        <input type="submit" className="btn btn-secondary btn-sm" value="Get Security Question" onClick={
                            (e)=> {
                                e.preventDefault();
                                fetchSecurityQuestion();
                            }
                        }/>
                        
                        <h2 className="setFont secQs" id="secQuest">{securityQuestion==="null"?"No Security Question Set":securityQuestion}</h2>
                        <CustomInput type={'password'} value={securityAnswer} disabled={securityQuestion==="null"} onChange={handleSecChange}/>

                        <h2 className="setFont secQs">New password:</h2>
                        <CustomInput type={'password'} value={password} disabled={securityQuestion==="null"} onChange={handlePassChange}/>

                        <h2 className="setFont secQs">Confirm password:</h2>
                        <CustomInput type={'password'} value={newPassword} disabled={securityQuestion==="null"} onChange={handleNewPassChange}/>

                        <input type="submit" className="formButton" value="Submit" onClick = {
                            async (e)=>{
                                e.preventDefault();
                                if(!InputValidation.checkPassword(password)){
                                    alert("Not following password policy");
                                    return;
                                }

                                if(password===newPassword) {
                                    let reqBody = {
                                        username: username,
                                        securityAnswer: securityAnswer,
                                        newHash: hashString(username, password)
                                    };
                                    let response = await backendService("POST", "/forgotPassword", reqBody, null, null);
                                    if(response.statusCode === 200) {
                                        history.replace("/login");
                                    }else{
                                        alert("Security Answer Incorrect");
                                    }
                                } else {
                                    alert("PASSWORDS DO NOT MATCH");
                                }
                                
                            }
                        }/>
                    </form>
                </div>

            </div>
        </div>
    );
}