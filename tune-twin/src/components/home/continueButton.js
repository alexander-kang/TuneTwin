import { useNavigate } from 'react-router-dom'
import './home.css'

const ContinueButton = () => {
    const navigate = useNavigate()
    const navContinue = () => {
        navigate("/dashboard")
    }

    return (
        <div className="button-content">
            <button className="btn" onClick={navContinue}>
                Continue
            </button>
        </div>
    )

}

export default ContinueButton
