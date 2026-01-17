import {
    Box,
    Button,
    TextField,
    Typography,
    Paper
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector"
import { loginUser } from "../api/auth.api";
import { getUser, setUser } from "../utils/auth";


const Login = () => {
    const [role, setRole] = useState("employee");
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // useEffect(() => {   
    //     const user = getUser()
    //     if(user) navigate(`/${user.role}`)
    //     else navigate('/')
    // },[])

    const handleLogin = async () => {
         if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        try{
            setLoading(true);
            setError("")
            console.log("api will called")
            const res = await loginUser({
                email,
                password,
                role
            })

            console.log("res", res);
            setUser(res.data)  
            navigate(`/${res.data.user.role}`)
            // const useRole = res.data.user.role;
        }
        catch(err){
            setError(err.response?.data?.message || "Login failed");
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Paper sx={{ p: 4, width: 360 }}>
                <Typography variant="h5" mb={2} textAlign="center">
                    WorkSmart AI Login
                </Typography>

                <RoleSelector role={role} setRole={setRole} />

                <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}/>

                {error && (
                    <Typography color="error" fontSize={14} mt={1}>
                        {error}
                    </Typography>
                )}

                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : `Login as ${role}`}
                </Button>

                {/* <Typography
          mt={2}
          textAlign="center"
          fontSize={14}
          sx={{ cursor: "pointer" }}
        >
          Don’t have an account? Register
        </Typography> */}
                <Typography fontSize={13} color="text.secondary" textAlign="center">
                    Contact admin for account access
                </Typography>

            </Paper>
        </Box>
    );
}

export default Login