import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/users/create" component={RegisterScreen} exact />
          <Route path="/confirm-registration" component={ConfirmEmailScreen} />
          <Route path="/forgot-password" component={ForgotPasswordScreen} />
          <Route path="/reset-password" component={ResetPasswordScreen} />
          <Route
            path="/change-password"
            component={ChangePasswordScreen}
            exact
          />
        </Container>
      </main>
    </Router>
  );
}

export default App;
