import { createSignal } from "solid-js";
import './style/formstyle.css';

export default function Register(){
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [message, setMessage] = createSignal("");
    const [email, setEmail] = createSignal("");

    //making a function to handel the request

    async function handleSubmit(e) {
        e.preventDefault();
        
        //await a reponse from a server when fetched link with payload {}

        const res = await fetch("http://127.0.0.1:8000/registerLogin/register/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username(),
                password: password(),
                email: email(),
          }),
        });
    
        const data = await res.json();
        setMessage(data.message || data.error);
        }

    //return statement
    return (
        <>

            <div className="form-wrapper">
            <p> {message()} </p>

            <form className="forms" onSubmit={handleSubmit}>

            <input placeholder="Username" onInput={(e) => setUsername(e.target.value)} />
            <input placeholder="Email" type="email" onInput={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onInput={(e) => setPassword(e.target.value)} />

            <button type="submit">Register</button>

            </form>
            </div>
        </>
    );
}
