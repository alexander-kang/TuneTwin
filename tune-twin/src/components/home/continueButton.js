import { Link } from 'react-router-dom'
// import { Button } from 'react-native'

const ContinueButton = () => {
    function handleContinue() {
        <Link to="/dashboard"></Link>
    }

    return (
        <button onclick={handleContinue}>
            Continue
        </button>
    )

}

export default ContinueButton
