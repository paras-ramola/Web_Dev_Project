import "./Footer.css"
import github_icon from "../../../src/assets/Github_icon.png"

function Footer(){
    return (
        <div className="footerContainer">
            <div className="buildInfo">
                <h3>Built By:</h3>
               <p>Paras Ramola</p>
            </div>
            <div className="contactInfo">
                <h3>Contact Me:</h3>
                <p>@gmail.com</p>
            </div>
            <div className="refernceInfo">
                <h3>Refernce:</h3>
                <a href="https://github.com/" className="github">
                    <img src={github_icon}></img>
                    <p>Github</p>
                    
                </a>
            </div>
        </div>
    );
}


export default Footer;
