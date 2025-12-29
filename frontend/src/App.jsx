
import './App.css';
import { Router, Route } from "@solidjs/router";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import User from "./components/User";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />

      <Route
        path="/user"
        component={() => (
          <Protected>
            <User />
          </Protected>
        )}
      />
    </Router>
  );
}
