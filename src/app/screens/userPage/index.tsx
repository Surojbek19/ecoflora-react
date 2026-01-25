import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/userPage.css";
import { serverApi } from "../../../lib/data/config";
import { MemberType } from "../../../lib/data/enums/member.enum";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  // if(!authMember) history.push("/");

  return (
    <div className={"user-page"}>
      <Container className="userpage-container">
        <Stack className={"my-page-frame"} direction={{ xs: "column", md: "row" }}>
          {/* LEFT */}
          <Stack className={"my-page-left"}>
            <Box className="left-card">
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-sub"}>Keep your profile fresh and consistent 🌿</Box>

              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          {/* RIGHT */}
          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                    alt="user"
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.RESTAURANT
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                      alt="badge"
                    />
                  </div>
                </div>

                <span className={"order-user-name"}>{authMember?.memberNick ?? "User"}</span>
                <span className={"order-user-prof"}>{authMember?.memberType ?? "MEMBER"}</span>
                <span className={"order-user-prof"}>
                  {authMember?.memberAddress ? authMember.memberAddress : "no address"}
                </span>
              </Box>

              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>

              <p className={"user-desc"}>
                {authMember?.memberDesc ? authMember.memberDesc : "no description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
