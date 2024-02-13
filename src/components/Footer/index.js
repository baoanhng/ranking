
import "./Footer.scss"

function Footer() {
    return (
        <div className='footer'>
            <div>
                <p>
                    ©「<strong onClick={() => window.open("https://www.facebook.com/hyddytngokngek", "_blank")}>Hyddyt</strong> (Organizer)」
                    「<strong onClick={() => window.open("https://www.facebook.com/Zennomi", "_blank")}>Zennomi</strong> (Backend)」
                    「<strong onClick={() => window.open("https://www.facebook.com/TheMeoki", "_blank")}>Meoki</strong> (Frontend)」
                </p>
                <img src="" alt='logo placeholder' />
                <p>© BXH Light Novel Việt Nam 2024</p>
            </div>
        </div>
    );
}

export default Footer;