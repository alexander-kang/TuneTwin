
import './home.css'

const LoginButton = () => {
    function handleLogin() {
        window.open('http://127.0.0.1:8080/', '_blank', 'height=585, width=500')
    }

    return (

        <div class="button-content">
            <button class="btn" onclick={handleLogin}>
                Sign Into Spotify
            </button>
        </div>
    )
}

export default LoginButton
