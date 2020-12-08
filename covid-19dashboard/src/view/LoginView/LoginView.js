import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        padding: '10px',
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [userId, setUserId] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');
    const [errorText, setErrorText] = React.useState(null);
    const [resetPw, setResetPw] = React.useState(false);
    const [loggingInStatus, setLoggingInStatus] = React.useState(false);
    const [statusCode, setStatusCode] = React.useState(0);
    const handleLoginSuccess = props.handleLoginSuccess;

    const getDisabled = () => {
        if (loggingInStatus) {
            return { disabled: true }
        }
        return {}
    }
    const handleLogin = () => {
        setLoggingInStatus(true)
        setErrorText(null)

        //add in login api and set bearer token in localstorage as well
        let user1 = { username: "john", password: "password123", id: "1111111", changePassword: true }
        let user2 = { username: "mike", password: "password123", id: "2222222", changePassword: true }
        if (username === user1.username && password === user1.password) {
            handleLoginSuccess(user1)
        } else if (username === user2.username && password === user2.password) {
            setResetPw(true);
            setUserId(user2.id);
            setErrorText("Please change your password before logging in.");
            setLoggingInStatus(false)
        } else {
            setStatusCode(1)
            setErrorText("wrong password")
            setLoggingInStatus(false)
        }

    }

    const handleChangePassword = () => {
        const passRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{12,})$')
        setErrorText(null)
        setLoggingInStatus(true)
        if (newPassword === '' || newPassword === null) {
            setErrorText("Please fill in your new password.")
            setStatusCode(1)
            setLoggingInStatus(false)
        } else if (newPassword !== newPassword2) {
            setErrorText("Passwords don't match. Please retype your passwords.")
            setStatusCode(1)
            setLoggingInStatus(false)
        } else if (!passRegex.test(newPassword)) {
            setErrorText("Password must contain at least 1 upper case, 1 lower case, 1 number, 1 special character and must be more than 8 characters")
            setStatusCode(1)
            setLoggingInStatus(false)
        } else {
            let user2 = { username: "mike", password: "password123", id: "2222222", changePassword: false }
            handleLoginSuccess(user2)
        }
    }

    const keyPressLogin = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
        }
    }

    const keyPressResetPw = (e) => {
        if (e.keyCode === 13) {
            handleChangePassword();
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* `<img src={require('assets/image/logo/LoveCareSG.png')} alt='logo' style={{ height: "188px" }} />` */}
                {!resetPw ? <div className="login">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        {...getDisabled()}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(event) => { setUsername(event.target.value) }}
                        onKeyDown={keyPressLogin}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        {...getDisabled()}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => { setPassword(event.target.value) }}
                        onKeyDown={keyPressLogin}
                    />
                    {errorText !== null ? <Alert severity={statusCode === 1 ? 'error' : 'warning'} className={classes.error}>{errorText}</Alert> : ''}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        {...getDisabled()}
                        className={classes.submit}
                        onClick={handleLogin}
                        style={{ borderRadius: 25, minHeight: '48px' }}
                    >
                        Sign In
          </Button>
                </div>
                    :
                    <div className="resetPw">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...getDisabled()}
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="current-password"
                            value={newPassword}
                            onChange={(event) => { setNewPassword(event.target.value) }}
                            onKeyDown={keyPressResetPw}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...getDisabled()}
                            name="newPassword2"
                            label="Retype your new password"
                            type="password"
                            autoComplete="current-password"
                            value={newPassword2}
                            onChange={(event) => { setNewPassword2(event.target.value) }}
                            onKeyDown={keyPressResetPw}
                        />
                        {errorText !== null ? <Alert severity={statusCode === 1 ? 'error' : 'warning'} className={classes.error}>{errorText}</Alert> : ''}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            {...getDisabled()}
                            className={classes.submit}
                            onClick={handleChangePassword}
                            style={{ borderRadius: 25, minHeight: '48px' }}
                        >
                            Change Password
              </Button>
                    </div>}

                <Grid container>

                </Grid>
            </div>
            <Box mt={4}>
                {/* <FooterView /> */}
            </Box>
        </Container>
    );
}