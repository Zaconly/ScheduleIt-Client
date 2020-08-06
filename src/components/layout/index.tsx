import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Notifications as NotificationsIcon, Portrait as PortraitIcon } from "@material-ui/icons"
import Head from "next/head"
import { ReactNode, useRef, useState } from "react"

import { modalContextVar } from "../../apollo"
import { useIsLoggedIn } from "../../utils/customHooks"
import { AuthModal } from "../auth"
import { OwnMenu } from "../custom"
import HeaderMenuItems from "./HeaderMenuItems"
import { useStyles } from "./style"

interface Props {
  children: ReactNode
  title?: string
  mode?: "classic" | "home" | "clean"
}

const Layout = ({ children, title, mode = "classic" }: Props) => {
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const isLoggedIn = useIsLoggedIn()

  const handleToggle = () => {
    setOpenMenu(prevOpen => !prevOpen)
  }

  const handleOpenAuthModal = (type: "login" | "register") => {
    modalContextVar({
      id: "AuthModal",
      isOpen: true,
      currentTab: type
    })
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>{title ? `${title} - ScheduleIt` : "ScheduleIt"}</title>
      </Head>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ScheduleIt
          </Typography>
          {mode !== "clean" && (
            <>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <div className={classes.rightSection}>
                  {isLoggedIn ? (
                    <IconButton
                      aria-label="show 17 new notifications"
                      color="inherit"
                      className={classes.iconPadding}
                    >
                      <Badge badgeContent={17} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        className={classes.navButton}
                        disableElevation
                        onClick={() => handleOpenAuthModal("login")}
                      >
                        Log In
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.navButton}
                        color="primary"
                        disableElevation
                        onClick={() => handleOpenAuthModal("register")}
                      >
                        Sign Up
                      </Button>
                      <AuthModal />
                    </>
                  )}
                  <IconButton
                    ref={anchorRef}
                    edge="end"
                    aria-controls={openMenu ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.iconPadding}
                    onClick={handleToggle}
                  >
                    <PortraitIcon />
                  </IconButton>
                  <OwnMenu
                    open={openMenu}
                    setOpen={setOpenMenu}
                    anchorRef={anchorRef}
                    style={{ minWidth: 200 }}
                  >
                    <HeaderMenuItems setOpen={setOpenMenu} />
                  </OwnMenu>
                </div>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}

export default Layout
