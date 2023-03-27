import styles from "@/styles/layout/singleheader.module.scss";
import styles1 from "@/styles/layout/_header.module.scss";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { Box, Button, InputBase, Slide, styled } from "@mui/material";
import SearchIcon from "@/ui/icons/SearchIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import useWindowScroll from "@/hooks/useWindowScroll";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  amazon_deals_search,
  game_search,
  getMyFavourite,
} from "@/reduxtoolkit/profile.slice";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";

const StyledSearchContainer = styled(Box)`
  display: flex;
  align-content: center;
  background-color: var(--searchBg);
  border-radius: 8px;
  min-width: 1px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .MuiButtonBase-root {
    flex-grow: 1;
    flex-shrink: 0;
  }
  margin: auto;

  transition: all 225ms ease-in-out 0ms;
  &.showSearchInput {
    width: 90%;
    position: absolute;
    bottom: -21px;
    left: 0;
    right: 0;
  }
  &.hideSearchInput {
    width: 42px;
    position: relative;
    // bottom: 0;
    left: 0;
    .MuiInputBase-root {
      display: none;
    }
    .closeSearch {
      display: none;
      svg {
        font-size: 20px;

        path {
          fill: #a9acb2 !important;
        }
      }
    }
  }
  .MuiButtonBase-root {
    &:active,
    &:hover {
      box-shadow: none;
      background-color: transparent;
    }
    padding: 13px;
    min-width: 1px;
    background-color: transparent;
    box-shadow: none;
  }
`;

function SingleHeader({ type, fixedHeader }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [gameSearch, setGameSearch] = useState("");
  const [URL_game_slug, setURL_game_slug] = useState("");
  const [slideIn, setSlideIn] = useState(true);
  const headerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (router?.query?.id) {
      setGameSearch(router?.query?.id);
    }
  }, [router?.query?.id]);

  useWindowScroll({
    onScrollDown: (scrollPosition) => {
      if (headerRef?.current) {
        if (scrollPosition?.positionY > headerRef?.current?.offsetHeight) {
          setSlideIn(false);
          setOpenSearchBox(false);
        }
      }
    },
    onScrollUp: () => {
      setSlideIn(true);
    },
    enabled: !fixedHeader,
  });

  useEffect(() => {
    if (gameSearch?.includes(" ")) {
      setURL_game_slug(gameSearch?.replace(/\s/g, "+"));
    } else {
      setURL_game_slug(gameSearch);
    }
  }, [gameSearch]);

  const [openSearchBox, setOpenSearchBox] = useState(
    type == "search" ? true : false
  );

  const search_func = () => {
    if (type == "amazondeals" && gameSearch) {
      router.push(`/search/${gameSearch}`);
    } else if (type == "blogs" && gameSearch) {
      // router.push("/allBlogs");
      router.push(`/search/${URL_game_slug}`);
    } else if (type == "movies" && gameSearch) {
      // router.push("/movie");
      router.push(`/search/${URL_game_slug}`);
    } else if (gameSearch) {
      router.push(`/search/${gameSearch}`);
    }
  };

  const searchBoxOpen = useCallback(() => {
    if (!openSearchBox) {
      setOpenSearchBox(true);
    } else {
      search_func();
    }
  }, [openSearchBox, search_func]);

  const closeSearchBox = useCallback(() => {
    if (type != "search") {
      setOpenSearchBox(false);
    } else {
      setGameSearch("");
    }
  }, [openSearchBox]);

  useEffect(() => {
    const data = {
      source: "external",
      image_size: "THUMBNAIL",
      start_page: "all",
    };
    dispatch(getMyFavourite(data));
  }, []);

  return (
    <Slide in={slideIn} direction={"down"}>
      <Box className={styles.pageSingleHeader} ref={headerRef}>
        {type == "search" ? (
          <BackButton onClick={() => router.back()} />
        ) : (
          type != "coupons" &&
          type != "ebooks" &&
          type != "alltodaysdeals" &&
          type != "games" &&
          type != "favourite" && <BackButton />
        )}

        <div className={styles.singleWrapper}>
          <div
            className={
              type == "favourite" ? "commonTopTitle1" : "commonTopTitle"
            }
          >
            {type == "movies" ? (
              <h3>Movies</h3>
            ) : type == "comingnextmonth" ? (
              <h3 style={{ marginLeft: "33px" }}>Coming next month</h3>
            ) : type == "featuregames" ? (
              <h3 style={{ marginLeft: "30px" }}>Feature games</h3>
            ) : type == "newrelease" ? (
              <h3 style={{ marginLeft: "30px" }}>New release</h3>
            ) : type == "popularnow" ? (
              <h3 style={{ marginLeft: "30px" }}>Popular now</h3>
            ) : type == "targetdeals" ? (
              <h3 style={{ marginLeft: "30px" }}>Target deals</h3>
            ) : type == "walmartdeals" ? (
              <h3 style={{ marginLeft: "30px" }}>Walmart deals</h3>
            ) : type == "storelist" ? (
              <h3 style={{ marginLeft: "30px" }}>Store list</h3>
            ) : type == "coupons" ? (
              <h3 style={{ marginLeft: "30px" }}>Coupons</h3>
            ) : type == "blogs" ? (
              <h3 style={{ marginLeft: "30px" }}>Blogs</h3>
            ) : type == "ebooks" ? (
              <h3 style={{ marginLeft: "30px" }}>Ebooks</h3>
            ) : type == "audiobooks" ? (
              <h3 style={{ marginLeft: "30px" }}>Audio files</h3>
            ) : type == "alltodaysdeals" ? (
              <h3 style={{ marginLeft: "30px" }}>Today’s deal</h3>
            ) : type == "games" ? (
              <h3 style={{ marginLeft: "30px" }}>Games</h3>
            ) : type == "favourite" ? (
              <div
                className={styles1.homeHeaderLeft}
                style={{ textAlign: "left" }}
              >
                <h1 style={{ color: "#1877F2", paddingBottom: "4px" }}>
                  Favorites
                </h1>
                <p
                  className={styles1.hearderSubHeading}
                  style={{
                    fontSize: "18px",
                    color: "#3B3B3B",
                    fontWeight: "500",
                  }}
                >
                  List of favorites items
                </p>
              </div>
            ) : type == "search" ? (
              <h3 style={{ marginLeft: "30px" }}>Search</h3>
            ) : type == "recentlyplayed" ? (
              <h3 style={{ marginLeft: "30px" }}>Recently played</h3>
            ) : (
              type == "amazondeals" && (
                <h3 style={{ marginLeft: "30px" }}>Amazon deals</h3>
              )
            )}
          </div>
          {
            <div className={styles.single_search}>
              <StyledSearchContainer
                className={
                  !openSearchBox ? "hideSearchInput" : "showSearchInput"
                }
              >
                <InputBase
                  style={{ paddingLeft: "10px" }}
                  placeholder="Search..."
                  inputRef={searchInputRef}
                  name="gameSearch"
                  value={gameSearch?.replace(/\+/g, " ")}
                  // onKeyPress={(e) => e.key == "Enter" && keypress_phone_func()}
                  onChange={(e) => setGameSearch(e.target.value)}
                />
                {
                type == "search" &&
                gameSearch == router?.asPath.split("/")[2] ? (
                  ""
                ) :
                 type == "search" &&
                  gameSearch != router?.asPath.split("/")[2] ? (
                  <MyButton onClick={searchBoxOpen}>
                    <SearchIcon style={{ paddingLeft: "0px" }} />
                  </MyButton>
                ) : (
                  <MyButton onClick={searchBoxOpen}>
                    <SearchIcon style={{ paddingLeft: "0px" }} />
                  </MyButton>
                )}

                <Button className="closeSearch" onClick={closeSearchBox}>
                  <CancelIcon />
                </Button>
              </StyledSearchContainer>
            </div>
          }
        </div>
      </Box>
    </Slide>
  );
}

export default SingleHeader;
