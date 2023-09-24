import React from 'react'
import githubLogo from '../../assets/github-mark.svg'
import './footer.css'

const Footer = () => {
  return (
    <footer>
        <hr/>
        <div className="footer-content">
            <div className="footer-left">
                Made for <a href="https://hack.uiowa.edu/">HackUIowa 2023</a>
            </div>

            <div className="footer-right">
                <a href="https://github.com/alexander-kang/TuneTwin">
                    <img src={githubLogo} alt="Link to project's GitHub repository" width="32" height="32"/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
