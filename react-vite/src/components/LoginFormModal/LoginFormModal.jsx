import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Box, Button, Container, Input, Typography, useMediaQuery } from "@mui/material"
import "./LoginForm.css";
import OpenModalLink from "../OpenModalLink";
import SignupFormModal from "../SignupFormModal";
import { useTheme } from "@emotion/react";

const ariaLabel = { 'aria-label': 'description' }

function LoginFormModal() {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  return (
    <Box
      sx={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "500px",
        bgcolor: "secondary.main",
        width: "25vw",
        minWidth: "300px",
        boxShadow: 15,
        borderRadius: "20px",
        [theme.breakpoints.down("sm")]: {
          overflowY: "scroll",
          overflowX: "none",
          width: "100%",
          height: "100%",
          borderRadius: 0
        }
      }}
      component="form"
    >
      <Typography variant="h3">Login</Typography>
      <Input 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" inputProps={ariaLabel} 
        value={email}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}}
        required
      />
      {errors.email && <p>{errors.email}</p>}
      <Input 
        type="password"
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" inputProps={ariaLabel} 
        value={password}
        sx={{ color: 'primary.text', fontSize: sm ? "1.5rem" : "2rem", minWidth: "200px"}} 
        required
      />
      {errors.password && <p>{errors.password}</p>}
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          type="submit"
          size="sm"
          sx={{ color: "primary.text"}}
          style={{fontSize: sm ? "0.7rem" : md ? "0.75rem" : lg ? "1rem" : "1.2rem"}}
        >
          Login
        </Button>
        <Button 
          onClick={handleDemo} 
          variant="contained"
          type="submit"
          size="sm"
          sx={{ color: "primary.text"}}
          style={{fontSize: sm ? "0.7rem" : md ? "0.75rem" : lg ? "1rem" : "1.2rem"}}
        >
          Demo
        </Button>
      </Container>
      <Typography variant="subtitle1">
        Don&apos;t have an account? <OpenModalLink linkText="Sign Up Now" modalComponent={<SignupFormModal />} />
      </Typography>
    </Box>
  );
}

export default LoginFormModal;
