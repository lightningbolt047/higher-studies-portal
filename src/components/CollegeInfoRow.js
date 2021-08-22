import Avatar from "@material-ui/core/Avatar";
import RoomIcon from '@material-ui/icons/Room';
import SchoolIcon from '@material-ui/icons/School';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TranslateIcon from '@material-ui/icons/Translate';
import ScoreIcon from '@material-ui/icons/Score';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


export default function CollegeInfoRow ({clgName, clgLocation, clgFee, clgAcceptance, clgMinMarks, languageMarks}) {
    return (
        <div id="collegeRow">
            <div id="collegeAvatarRow">
                <Avatar id="collegeAvatar"><b>{clgName[0]}</b></Avatar>
            </div>
            <div id="collegeInfoRow">
                <dl>
                    <dt><SchoolIcon className="listIcon"/></dt>
                    <dd>{clgName}</dd>
                    <dt><RoomIcon className="listIcon"/></dt>
                    <dd>{clgLocation}</dd>
                    <dt><MonetizationOnIcon className="listIcon"/></dt>
                    <dd>{clgFee}</dd>
                </dl>
            </div>
            <div id="collegeAcceptanceRow">
                <dl>
                    <dt><ThumbUpIcon className="listIcon"/></dt>
                    <dd>{clgAcceptance}% Acceptance</dd>
                    <dt><ScoreIcon className="listIcon"/></dt>
                    <dd>Minimum GRE {clgMinMarks} Marks</dd>
                    <dt><TranslateIcon className="listIcon"/></dt>
                    <dd>Minimum TOEFL {languageMarks} Marks</dd>
                </dl>
            </div>
            <div id="collegeRoutingRow">
                <ArrowForwardIcon/>
            </div>
        </div>
    );
}