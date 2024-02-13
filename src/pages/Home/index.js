import Header from "./Header";
import Comment from "./Comment";
import Media from "./Media";
import VoteButton from "./VoteButton";
import SplashScreen from "../../components/SplashScreen";
import LargeText from "./LargeText";
import LastTop10 from "./LastTop10";
import Footer from "../../components/Footer";
import CategoryVote from "./CategoryVote";
import Introduction from "./Introduction";

import "../../fonts/DTPhudu-Black.otf"

function Home() {
    return (
        <div>
            <SplashScreen />
            <Header />
            <div className="contentContainer">
                <LargeText />
                <VoteButton />
                <Introduction />
                <CategoryVote />
                <LastTop10 />
                <Media />
                <Comment />
                <Footer />
            </div>
        </div>
    );
}

export default Home;