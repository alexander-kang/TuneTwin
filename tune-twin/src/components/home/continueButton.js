import { useNavigate } from 'react-router-dom'
import './home.css'

const ContinueButton = () => {
    const navigate = useNavigate()

    return (
        <div className="button-content">
            <button className="btn" onClick={navigate("/dashboard")}>
                Continue
            </button>
        </div>
    )

}

export default ContinueButton
