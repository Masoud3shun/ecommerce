// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import LoginIcon from "@mui/icons-material/Login";
// import { useAuth } from "../providers/auth_provider";

// const Header = () => {
//   const auth = useAuth();
//   const [totalItems, setTotalItems] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const isSubMenuOpen = Boolean(subMenuAnchorEl);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSubMenuClick = (event) => {
//     setSubMenuAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSubMenuClose = () => {
//     setSubMenuAnchorEl(null);
//   };

//   const handleCloseLogOut = () => {
//     auth.logout();
//   };

//   useEffect(() => {
//     let _totalItems = 0;
//     for (var i = 0; i < auth.cartItems.length; i++) {
//       _totalItems += auth.cartItems[i].quantity;
//     }
//     setTotalItems(_totalItems);
//   }, [auth.cartItems]);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             <Button color="inherit" href="/">
//               <HomeIcon /> Home
//             </Button>
//           </Typography>
//           <Button color="inherit" href="/cart">
//             <Badge
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               badgeContent={totalItems}
//               color="secondary"
//             >
//               <ShoppingCartIcon />
//             </Badge>
//             Cart
//           </Button>
//           {auth.isLoggedIn ? (
//             <>
//               <Button
//                 color="inherit"
//                 aria-controls="demo-positioned-menu"
//                 aria-haspopup="true"
//                 onClick={handleMenuClick}
//               >
//                 <Avatar sx={{ width: 24, height: 24 }} src={auth.user.image} />{" "}
//                 {auth.user.email}
//               </Button>
//               <Menu
//                 id="demo-positioned-menu"
//                 anchorEl={anchorEl}
//                 open={isMenuOpen}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "middle",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//               >
//                 <a className="lrnmor" href={"/Profile"}>
//                   <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 </a>
//                 <a className="lrnmor" href="/Orders">
//                   <MenuItem onClick={handleClose}>Orders</MenuItem>
//                 </a>
//                 <MenuItem onClick={handleSubMenuClick}>Settings</MenuItem>
//                 <MenuItem onClick={handleCloseLogOut}>Logout</MenuItem>
//               </Menu>
//               <Menu
//                 id="sub-menu"
//                 anchorEl={subMenuAnchorEl}
//                 open={isSubMenuOpen}
//                 onClose={handleSubMenuClose}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//               >
//                 <a className="lrnmor" href="/Setting/ChangeProfile">
//                   <MenuItem onClick={handleSubMenuClose}>
//                     Change Profile
//                   </MenuItem>
//                 </a>
//                 <a className="lrnmor" href="/Setting/ChangePassword">
//                   <MenuItem onClick={handleSubMenuClose}>
//                     Change Password
//                   </MenuItem>
//                 </a>
//                 <a className="lrnmor" href="/Setting/UploadAvatar">
//                   <MenuItem onClick={handleSubMenuClose}>
//                     Upload Avatar
//                   </MenuItem>
//                 </a>
//               </Menu>
//             </>
//           ) : (
//             <Button color="inherit" href="/Login">
//               <LoginIcon />
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../providers/auth_provider";

const Header = () => {
  const auth = useAuth();
  const [totalItems, setTotalItems] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isSubMenuOpen = Boolean(subMenuAnchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const handleCloseLogOut = () => {
    auth.logout();
  };

  useEffect(() => {
    let _totalItems = 0;
    for (var i = 0; i < auth.cartItems.length; i++) {
      _totalItems += auth.cartItems[i].quantity;
    }
    setTotalItems(_totalItems);
  }, [auth.cartItems]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              <HomeIcon /> Home
            </Button>
          </Typography>
          <Button color="inherit" component={Link} to="/cart">
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              badgeContent={totalItems}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
            Cart
          </Button>
          {auth.isLoggedIn ? (
            <>
              <Button
                color="inherit"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <Avatar sx={{ width: 24, height: 24 }} src={auth.user.image} />{" "}
                {auth.user.email}
              </Button>
              <Menu
                id="demo-positioned-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "middle",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Link to="/Profile" className="lrnmor" onClick={handleClose}>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/Orders" className="lrnmor" onClick={handleClose}>
                  <MenuItem>Orders</MenuItem>
                </Link>
                <MenuItem onClick={handleSubMenuClick}>Settings</MenuItem>
                <MenuItem onClick={handleCloseLogOut}>Logout</MenuItem>
              </Menu>
              <Menu
                id="sub-menu"
                anchorEl={subMenuAnchorEl}
                open={isSubMenuOpen}
                onClose={handleSubMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Link
                  to="/Setting/ChangeProfile"
                  className="lrnmor"
                  onClick={handleSubMenuClose}
                >
                  <MenuItem>Change Profile</MenuItem>
                </Link>
                <Link
                  to="/Setting/ChangePassword"
                  className="lrnmor"
                  onClick={handleSubMenuClose}
                >
                  <MenuItem>Change Password</MenuItem>
                </Link>
                <Link
                  to="/Setting/UploadAvatar"
                  className="lrnmor"
                  onClick={handleSubMenuClose}
                >
                  <MenuItem>Upload Avatar</MenuItem>
                </Link>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/Login">
              <LoginIcon />
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
