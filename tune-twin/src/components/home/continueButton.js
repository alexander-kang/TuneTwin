import { Link } from 'react-router-dom'
import { Button } from 'react-native'

const ContinueButton = () => {
    function handleContinue() {
        <Link to="/dashboard"></Link>
    }

    return (
        <Button onclick={handleContinue}>
            Continue
        </Button>
    )

}

export default ContinueButton
