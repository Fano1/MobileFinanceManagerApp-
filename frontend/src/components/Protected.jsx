import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Protected(props) {
    const navigate = useNavigate();

    onMount(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            navigate("/login");
        }
    });

    return props.children;
}
