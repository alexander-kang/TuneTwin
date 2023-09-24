// import { Button } from 'react-native'

const LoginButton = () => {
    function handleLogin() {
        window.open('http://127.0.0.1:8080/', '_blank', 'height=585, width=500')
    }

    return (
        <button onclick={handleLogin}>
            Sign Into Spotify
        </button>
    )
}

export default LoginButton
