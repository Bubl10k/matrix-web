import { Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import AuthContext from "../context/AuthProvider"

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    let {loginUser} = useContext(AuthContext)
    const paperStyle={padding :20,height:'70vh', width: 500, margin:"20px auto"}

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(formData); // Pass formData instead of event
    };

    return(
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Typography variant="h4" sx={{marginBottom:'20px'}}>Sign In</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label='Username'
                    placeholder='Enter username'
                    variant='outlined'
                    value={formData.username}
                    fullWidth
                    required
                    sx={{marginBottom:'20px'}}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <TextField 
                    label='Password'
                    placeholder='Enter password'
                    type='password'
                    variant='outlined'
                    value={formData.password}
                    fullWidth
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                />
                <Button 
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={loginUser}
                >
                Sign in
                </Button>
            </form>
            <Typography > Do you have an account ?
                 <Link href="#" >
                    Sign Up 
            </Link>
            </Typography>
        </Paper>
    )
}
