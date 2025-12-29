import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

import './style/formstyle.css';


export default function Login(){
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal("");
    const navigate = useNavigate();

    //handeling the register function
    function sendToRegister(){
        navigate("/register");
        return;
    }

    //handing the send function -> Onclikc only
    async function handleSend(e){
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:8000/registerLogin/login/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username(),
                password: password(),
            }),
        });

        //inside the handle sned check if res is okay 
        
        const data = await res.json()
        if (!res.ok){
            setError(data.error || "Login Failed");
            return; 
        };

        // store tokens correctly
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        navigate("/user");
    }

    //now the rest of the things
    return (
        <>
        <div className="form-wrapper">
        <form className="forms" onSubmit={handleSend}>
            <input type="text" onInput={(e) => setUsername(e.target.value)} />
            <input type="password" onInput={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>


        <small>Still haven't registered?</small>
        <button onClick={ sendToRegister }>Click here to Register</button>

        </div>

        </>
    );
    

}