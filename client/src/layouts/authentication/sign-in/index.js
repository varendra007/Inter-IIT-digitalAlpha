// import { useState } from "react";

// // react-router-dom components
// import { Link } from "react-router-dom";

// // @mui material components
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// //#import GitHubIcon from "@mui/icons-material/GitHub";
// //import GoogleIcon from "@mui/icons-material/Google";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// // Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// // Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function Basic() {
//     const [rememberMe, setRememberMe] = useState(false);

//     const handleSetRememberMe = () => setRememberMe(!rememberMe);

//     return (
//         <BasicLayout image={bgImage}>
//           <Card>
//             <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} p={2} mb={1} textAlign="center">
//               <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//                 Sign in
//               </MDTypography>
//               <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//                 <Grid item xs={2}>
//                   <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                     <FacebookIcon color="inherit" />
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                     <FacebookIcon  color="inherit" />
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                     <FacebookIcon  color="inherit" />
//                   </MDTypography>
//                 </Grid>
//               </Grid>
//             </MDBox>
//             <MDBox pt={4} pb={3} px={3}>
//               <MDBox component="form" role="form">
//                 <MDBox mb={2}>
//                   <MDInput type="email" label="Email" fullWidth />
//                 </MDBox>
//                 <MDBox mb={2}>
//                   <MDInput type="password" label="Password" fullWidth />
//                 </MDBox>
//                 <MDBox display="flex" alignItems="center" ml={-1}>
//                   <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//                   <MDTypography
//                     variant="button"
//                     fontWeight="regular"
//                     color="text"
//                     onClick={handleSetRememberMe}
//                     sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//                   >
//                     &nbsp;&nbsp;Remember me
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox mt={4} mb={1}>
//                   <MDButton variant="gradient" color="info" fullWidth>
//                     sign in
//                   </MDButton>
//                 </MDBox>
//                 <MDBox mt={3} mb={1} textAlign="center">
//                   <MDTypography variant="button" color="text">
//                     Don&apos;t have an account?{" "}
//                     <MDTypography
//                       component={Link}
//                       to="/authentication/sign-up"
//                       variant="button"
//                       color="info"
//                       fontWeight="medium"
//                       textGradient
//                     >
//                       Sign up
//                     </MDTypography>
//                   </MDTypography>
//                 </MDBox>
//               </MDBox>
//             </MDBox>
//           </Card>
//         </BasicLayout>
//     );
// }

// export default Basic;

import React from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useEffect } from "react";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "./debounceHook";
import axios from "axios";
import { Litem } from "./Lit";
import compData from "./csvjson.json";
import { height } from "@mui/system";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export default function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [LShows, setLShows] = useState([]);
  const [noLShows, setNoLShows] = useState(false);

  const isEmpty = !LShows || LShows.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoLShows(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoLShows(false);
    setLShows([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
  const hammingDistance = (str1 = "", str2 = "") => {
    if (str1.length !== str2.length) {
      return 0;
    }
    let dist = 0;
    for (let i = 0; i < str1.length; i += 1) {
      if (str1[i] !== str2[i]) {
        dist += 1;
      }
    }
    return dist;
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   var li = [];
  //   compData.forEach((el) => {
  //     var sim = similarity(`${searchValue}`, `${el.Company}`);
  //     if (sim >= 0.3 || el.Company.includes(searchValue)) {
  //       li.push(el);
  //     }
  //   });

  //   console.log(li);
  //   setComp(li);
  // };

  const searchLShow = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoLShows(false);
    var response = [];
    compData.forEach((el) => {
      var sim = similarity(`${searchQuery}`, `${el.Company}`);
      if (sim >= 0.3 || el.Company.includes(searchQuery)) {
        response.push(el);
      }
    });

    if (response) {
      console.log("Response: ", response);
      if (response.Company && response.Company.length === 0) setNoLShows(true);
      setLShows(response);
    }

    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchLShow);
  const [start, setStart] = useState("2022-03-01");
  const [end, setEnd] = useState("2018-03-01");
  useEffect(() => {
    console.log(end);
    console.log(start);
  }, [end, start]);
  const handleSearch = (comp) => {
    console.log(comp);
    console.log(end);
    console.log(start);
    // var data = {}
    const reqBdy = {
      company: comp,
      startDate: start,
      endDate: end,
    };
    localStorage.clear("searchCom");
    localStorage.setItem("searchCom", JSON.stringify(reqBdy));

    // localStorage.setItem("reqBdy", JSON.stringify(reqBdy));

    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <form action="" style={{ display: "flex", flexDirection: "column", minWidth: "50vh" }}>
        <label style={{ color: "white" }}>Start date</label>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <br />
        <label style={{ color: "#fff" }}>End date</label>
        <input
          type="date"
          name="end-date"
          id=""
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <br />
        <div></div>
        <SearchBarContainer
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          transition={containerTransition}
          ref={parentRef}
        >
          <SearchInputContainer>
            <SearchIcon>
              <IoSearch />
            </SearchIcon>
            <SearchInput
              placeholder="Search for Company"
              onFocus={expandContainer}
              ref={inputRef}
              value={searchQuery}
              onChange={changeHandler}
            />

            <AnimatePresence>
              {isExpanded && (
                <CloseIcon
                  key="close-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={collapseContainer}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose />
                </CloseIcon>
              )}
            </AnimatePresence>
          </SearchInputContainer>

          {isExpanded && <LineSeperator />}
          {isExpanded && (
            <SearchContent>
              {isLoading && (
                <LoadingWrapper>
                  <MoonLoader loading color="#000" size={20} />
                </LoadingWrapper>
              )}
              {!isLoading && isEmpty && !noLShows && (
                <LoadingWrapper>
                  <WarningMessage>Start typing to Search</WarningMessage>
                </LoadingWrapper>
              )}
              {!isLoading && noLShows && (
                <LoadingWrapper>
                  <WarningMessage>No Company found!</WarningMessage>
                </LoadingWrapper>
              )}
              {!isLoading && !isEmpty && (
                <>
                  {LShows.map(({ CIK, Company, Ticker }) => (
                    <div
                      onClick={() => {
                        handleSearch({ CIK, Company, Ticker });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Litem key={CIK} Company={Company} />
                    </div>
                  ))}
                </>
              )}
            </SearchContent>
          )}
        </SearchBarContainer>
      </form>
    </div>
  );
}
