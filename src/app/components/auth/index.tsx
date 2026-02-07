import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Fab, Stack, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/data/types/common";
import { Messages } from "../../../lib/data/config";
import { LoginInput, MemberInput } from "../../../lib/data/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/data/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

/**
 * UI GOAL:
 * - blurred glass card (see-through)
 * - rounded container
 * - green accent like screenshot
 * - NO images, NO social icons
 * - LOGIC unchanged (only add reset on close)
 */
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Glass card (see-through)
  glassCard: {
    width: 520,
    borderRadius: 40,
    padding: "56px 64px 48px",

    /* more transparent */
    background: "rgba(255,255,255,0.08)",

    /* softer border */
    border: "1px solid rgba(255,255,255,0.22)",

    /* stronger blur to compensate */
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    /* subtle depth */
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  },
}));

/** TextField underline look like screenshot */
const glassFieldSx = {
  width: "100%",
  "& .MuiInputBase-root": {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(125, 255, 191, 0.95)",
  },
  "& .MuiInput-underline:before": {
    borderBottom: "1px solid rgba(255,255,255,0.55)",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: "1px solid rgba(255,255,255,0.75) !important",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid rgba(125, 255, 191, 0.95)",
  },
};

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** RESET FORM (so reopen doesn't show old inputs) */
  const resetAuthForm = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
  };

  /** Close handlers that also reset */
  const closeSignup = () => {
    resetAuthForm();
    handleSignupClose();
  };

  const closeLogin = () => {
    resetAuthForm();
    handleLoginClose();
  };

  // Optional: if both modals are closed, reset (covers outside-click, ESC, etc.)
  useEffect(() => {
    if (!signupOpen && !loginOpen) resetAuthForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupOpen, loginOpen]);

  /** HANDLERS (LOGIC UNTOUCHED) **/
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupReqest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginReqest().then();
    }
  };

  const handleSignupReqest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // Saving Authenticated User
      setAuthMember(result);

      // ✅ clear form so next open is clean
      resetAuthForm();

      // close modal
      handleSignupClose();
    } catch (err) {
      console.log(err);

      // close modal (your original behavior)
      handleSignupClose();

      // ✅ clear form so next open is clean even on error
      resetAuthForm();

      sweetErrorHandling(err).then();
    }
  };

  const handleLoginReqest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // Saving Authenticated User
      setAuthMember(result);

      // ✅ clear form so next open is clean
      resetAuthForm();

      // close modal
      handleLoginClose();
    } catch (err) {
      console.log(err);

      // close modal (your original behavior)
      handleLoginClose();

      // ✅ clear form so next open is clean even on error
      resetAuthForm();

      sweetErrorHandling(err).then();
    }
  };

  /** Screenshot-like green button */
  const glassButtonSx = {
    mt: 2,
    width: 240,
    height: 44,
    borderRadius: 10,
    textTransform: "none",
    fontWeight: 800,
    backgroundColor: "#1E3D2B",
    color: "rgba(10, 30, 18, 0.92)",
    boxShadow: "0 16px 28px rgba(0,0,0,0.22)",
    "&:hover": {
      backgroundColor: "#285743",
    },
  };

  /** Reusable header block like screenshot */
  const Header = ({ subtitle }: { subtitle: React.ReactNode }) => (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: 42,
          fontWeight: 900,
          color: "rgba(255,255,255,0.95)",
          lineHeight: 1.05,
        }}
      >
        Get Started
      </Typography>

      <Typography sx={{ mt: 1, fontSize: 12, color: "rgba(255,255,255,0.70)" }}>
        {subtitle}
      </Typography>
    </Box>
  );

  return (
    <div>
      {/* SIGNUP MODAL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={closeSignup}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "rgba(0,0,0,0.25)" },
        }}
      >
        <Fade in={signupOpen}>
          <Stack className={classes.glassCard} spacing={4} alignItems="center">
            <Header
              subtitle={
                <>
                  Already have an Account ?{" "}
                  <span
                    style={{
                      color: "rgba(125, 255, 191, 0.95)",
                      fontWeight: 800,
                    }}
                  >
                    Log in
                  </span>
                </>
              }
            />

            <Stack sx={{ width: "100%" }} spacing={3}>
              <TextField
                variant="standard"
                label="Name"
                value={memberNick}
                onChange={handleUsername}
                sx={glassFieldSx}
              />
              <TextField
                variant="standard"
                label="Phone number"
                value={memberPhone}
                onChange={handlePhone}
                sx={glassFieldSx}
              />
              <TextField
                variant="standard"
                label="Password"
                type="password"
                value={memberPassword}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={glassFieldSx}
              />
            </Stack>

            <Fab sx={glassButtonSx} variant="extended" onClick={handleSignupReqest}>
              <LoginIcon sx={{ mr: 1 }} />
              Sign Up
            </Fab>
          </Stack>
        </Fade>
      </Modal>

      {/* LOGIN MODAL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={closeLogin}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "rgba(0,0,0,0.25)" },
        }}
      >
        <Fade in={loginOpen}>
          <Stack className={classes.glassCard} spacing={4} alignItems="center">
            <Header subtitle={<></>} />

            <Stack sx={{ width: "100%" }} spacing={3}>
              <TextField
                variant="standard"
                label="Name"
                value={memberNick}
                onChange={handleUsername}
                sx={glassFieldSx}
              />
              <TextField
                variant="standard"
                label="Password"
                type="password"
                value={memberPassword}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={glassFieldSx}
              />
            </Stack>

            <Fab sx={glassButtonSx} variant="extended" onClick={handleLoginReqest}>
              <LoginIcon sx={{ mr: 1 }} />
              Log in
            </Fab>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
