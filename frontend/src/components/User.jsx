import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function User() {
    const [user, setUser] = createSignal(null);
    const [loading, setLoading] = createSignal(true);
    const navigate = useNavigate();

    onMount(async () => {
        const token = localStorage.getItem("access");

        // no token = no personality
        if (!token) {
            navigate("/");
            return;
        }

        const res = await fetch("http://127.0.0.1:8000/registerLogin/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // token expired / invalid
        if (!res.ok) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            navigate("/");
            return;
        }

        const data = await res.json();
        setUser(data);
        setLoading(false);
    });

    function logoutUser() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    }

    return (
        <>
            {loading() && <p>Verifying identity…</p>}

            {user() && (
                <div className="user-wrapper">
                    <h1>Welcome, {user().name} </h1>
                    <p>@{user().username}</p>

                    <button onClick={logoutUser}>Logout</button>
                </div>
            )}
        </>
    );
}
