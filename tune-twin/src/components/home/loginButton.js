import { Button } from 'react-native'

const LoginButton = () => {
    function handleLogin() {
        window.open('/login', '_blank', 'height=585, width=500')
    }

    return (
        <Button onclick={handleLogin}>
            Sign Into Spotify
        </Button>
    )

}

export default LoginButton
