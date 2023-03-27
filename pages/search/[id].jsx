import ProductCard from "@/components/ProductCard/ProductCard";
import Wrapper from "@/layout/Wrappers/Wrapper";
import React, { useEffect, useMemo, useState } from "react";
import assest from "@/json/assest";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "@/styles/pages/search.module.scss";
import SingleHeader from "@/layout/Headers/SingleHeader";
import GamesCard from "@/components/ProductCard/GamesCard";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  amazon_deals_search,
  blog_search,
  coming_soon_game_search,
  favourite_search,
  feature_game_search,
  game_search,
  movies_search,
  new_release_search,
  popular_now_search,
  recently_played_games_search,
  target_deals_search,
  walmart_deals_search,
} from "@/reduxtoolkit/profile.slice";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { Skeleton_search } from "@/components/Skeleton/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { getHostName } from "@/lib/functions/_common.lib";
import BlogCard from "@/components/ProductCard/BlogCard";
import UpcommingMoviesCard from "@/components/ProductCard/UpcommingMoviesCard";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { favourite_list } = useSelector((state) => state?.profile);
  const [noDataStatus, setNoDataStatus] = useState(false);
  const {
    game_search_data,
    favourite_search_data,
    feature_game_search_data,
    coming_soon_game_search_data,
    recently_played_games_search_data,
    new_release_game_search_data,
    popular_now_search_data,
    game_search_data_status,
    feature_game_search_data_status,
    favourite_search_data_status,
    coming_soon_game_search_data_status,
    recently_played_games_search_data_status,
    new_release_game_search_data_status,
    popular_now_search_data_status,
    amazon_deals_search_status,
    amazon_deals_search_data,
    walmart_deals_search_status,
    walmart_deals_search_data,
    target_deals_search_status,
    target_deals_search_data,
    blog_search_status,
    blog_search_data,
    movies_search_status,
    movies_search_data,
  } = useSelector((state) => state?.profile);

  useEffect(() => {
    if (
      game_search_data?.game_list?.length == 0 &&
      favourite_search_data?.length == 0 &&
      feature_game_search_data?.game_list?.length == 0 &&
      coming_soon_game_search_data?.game_list?.length == 0 &&
      recently_played_games_search_data?.game_list?.length == 0 &&
      new_release_game_search_data?.game_list?.length == 0 &&
      popular_now_search_data?.game_list?.length == 0 &&
      amazon_deals_search_status == "idle" &&
      amazon_deals_search_data?.length == 0 &&
      walmart_deals_search_status == "idle" &&
      walmart_deals_search_data?.length == 0 &&
      target_deals_search_status == "idle" &&
      target_deals_search_data?.length == 0 &&
      blog_search_status == "idle" &&
      blog_search_data?.length == 0 &&
      movies_search_status == "idle" &&
      movies_search_data?.length == 0
    ) {
      setNoDataStatus(true);
    } else setNoDataStatus(false);
  }, [
    game_search_data,
    favourite_search_data,
    feature_game_search_data,
    coming_soon_game_search_data,
    recently_played_games_search_data,
    new_release_game_search_data,
    popular_now_search_data,
    amazon_deals_search_data,
    walmart_deals_search_data,
    target_deals_search_data,
    blog_search_status,
    movies_search_data,
  ]);

  const couponsData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product01,
        isFav: true,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product02,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
      {
        id: Math.random(),
        name: "Cafe Escapes Chai Latte K-Cup Pods",
        image: assest.product03,
        discount: 80,
        category: "Target",
        expiryDate: "10/31",
      },
    ];
  }, []);

  useEffect(() => {
    if (router?.query?.id) {
      const data = {
        source: "external",
        image_size: "THUMBNAIL",
        start_page: "all",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(favourite_search(data));
    }
    if (router?.query?.id) {
      const data = {
        source: "external",
        image_size: "THUMBNAIL",
        category_id: 0,
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(game_search(data));
    }
    if (router?.query?.id) {
      const data = {
        source: "external",
        type: "featured-games",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(feature_game_search(data));
    }
    if (router?.query?.id) {
      const data = {
        source: "external",
        type: "coming-next-month",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(coming_soon_game_search(data));
    }

    if (router?.query?.id) {
      const data = {
        source: "external",
        type: "recently-played",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(recently_played_games_search(data));
    }

    if (router?.query?.id) {
      const data = {
        source: "external",
        type: "new-releases",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(new_release_search(data));
    }

    if (router?.query?.id) {
      const data = {
        source: "external",
        type: "what's-popular-now",
        search: router?.query?.id?.replace(/\+/g, " "),
      };
      dispatch(popular_now_search(data));
    }
    if (router?.query?.id) {
      const data = {
        keywords: router?.query?.id,
      };
      dispatch(amazon_deals_search(data));
    }
    if (router?.query?.id) {
      const data = {
        keywords: router?.query?.id,
      };
      dispatch(walmart_deals_search(data));
    }
    if (router?.query?.id) {
      const data = {
        keywords: router?.query?.id,
      };
      dispatch(target_deals_search(data));
    }
    if (router?.query?.id) {
      const data = {
        skip: 0,
        limit: 0,
        keywords: router?.query?.id,
      };
      dispatch(blog_search(data));
    }
    if (router?.query?.id) {
      const data = {
        skip: 0,
        limit: 0,
        keywords: router?.query?.id,
      };
      dispatch(movies_search(data));
    }
  }, [router?.query?.id]);

  const findstoreData = useMemo(() => {
    return [
      {
        id: Math.random(),
        name: "Target",
        image: assest.product07,
        isFav: false,
        discount: 80,
        category: "120 Coupons",
      },
    ];
  }, []);
  return (
    <div className={styles.searchPage}>
      <Wrapper
        type={"search"}
        headerProps={{
          title: "Search",
          subtext: "Find the best result",
          hideProfile: true,
        }}
        disableFooter={true}
      >
        <SingleHeader type={"search"} fixedHeader />
        {noDataStatus == true && (
          <Box
            className={styles.pageerror}
            sx={{
              // height: "100vh",
              marginTop: "100px",
              display: "block",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Box className={styles.inner}>
              <Image
                loading="lazy"
                src={assest.noData}
                alt="menu1"
                height={195}
                width={302}
              />
            </Box>
            <h3
              style={{
                fontWeight: "700",
                marginTop: "20px",
                fontSize: "25px",
              }}
            >
              No Result Found
            </h3>
            <p
              style={{
                color: "#9E9E9E",
                marginTop: "20px",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Please try again with another
            </p>
            <p
              style={{
                color: "#9E9E9E",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              keywords or maybe use generic term
            </p>
          </Box>
        )}
        <div className={noDataStatus == true && "pagebody"}>
          {/* <div className="couponSlider">
            <div className="secHeading pad-none">
              <h3>Caupon's</h3>
            </div>
            <div className="itemsCarousel">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {couponsData.map((item) => (
                    <Grid item sm={4} xs={6}>
                      <ProductCard item={item} key={item?.id} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
          </div> */}
          <div
            className={
              game_search_data?.game_list?.length > 0 && "couponSlider"
            }
          >
            {game_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>All Games</h3>
              </div>
            )}

            {game_search_data_status == "idle" ? (
              game_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  {/* <Box sx={{ flexGrow: 1 }}> */}
                  <Grid container spacing={2}>
                    {game_search_data?.game_list?.map((item) => (
                      <Grid item sm={4} xs={6}>
                        <GamesCard
                          type={"searchGame"}
                          item={item}
                          key={item?.id}
                          favouriteList={favourite_list}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {/* </Box> */}
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>
          <div
            className={
              feature_game_search_data?.game_list?.length > 0 && "couponSlider"
            }
          >
            {feature_game_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Feature games</h3>
              </div>
            )}

            {feature_game_search_data_status == "idle" ? (
              feature_game_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {feature_game_search_data?.game_list?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            type={"searchGame"}
                            item={item}
                            key={item?.id}
                            favouriteList={favourite_list}
                            searchText={router?.query?.id}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={
              recently_played_games_search_data?.game_list?.length > 0 &&
              "couponSlider"
            }
          >
            {recently_played_games_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Recently played</h3>
              </div>
            )}

            {recently_played_games_search_data_status == "idle" ? (
              recently_played_games_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {recently_played_games_search_data?.game_list?.map(
                        (item) => (
                          <Grid item sm={4} xs={6}>
                            <GamesCard
                              type={"searchGame"}
                              item={item}
                              key={item?.id}
                              favouriteList={favourite_list}
                              searchText={router?.query?.id}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={
              popular_now_search_data?.game_list?.length > 0 && "couponSlider"
            }
          >
            {popular_now_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Popular now</h3>
              </div>
            )}

            {popular_now_search_data_status == "idle" ? (
              popular_now_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {popular_now_search_data?.game_list?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            type={"searchGame"}
                            item={item}
                            key={item?.id}
                            favouriteList={favourite_list}
                            searchText={router?.query?.id}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={
              coming_soon_game_search_data?.game_list?.length > 0 &&
              "couponSlider"
            }
          >
            {coming_soon_game_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Coming soon</h3>
              </div>
            )}

            {coming_soon_game_search_data_status == "idle" ? (
              coming_soon_game_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {coming_soon_game_search_data?.game_list?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            type={"searchGame"}
                            item={item}
                            key={item?.id}
                            favouriteList={favourite_list}
                            searchText={router?.query?.id}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={
              new_release_game_search_data?.game_list?.length > 0 &&
              "couponSlider"
            }
          >
            {new_release_game_search_data?.game_list?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>New release</h3>
              </div>
            )}

            {new_release_game_search_data_status == "idle" ? (
              new_release_game_search_data?.game_list?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {new_release_game_search_data?.game_list?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            type={"searchGame"}
                            item={item}
                            key={item?.id}
                            favouriteList={favourite_list}
                            searchText={router?.query?.id}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>
          <div className={favourite_search_data?.length > 0 && "couponSlider"}>
            {favourite_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Favorite</h3>
              </div>
            )}

            {favourite_search_data_status == "idle" ? (
              favourite_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {favourite_search_data?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            type={"searchGame"}
                            item={item}
                            key={item?.id}
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={amazon_deals_search_data?.length > 0 && "couponSlider"}
          >
            {amazon_deals_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Amazon deals</h3>
              </div>
            )}

            {amazon_deals_search_status == "idle" ? (
              amazon_deals_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {amazon_deals_search_data?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            item={item}
                            key={item?.id}
                            type="amazondealsSearch"
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={walmart_deals_search_data?.length > 0 && "couponSlider"}
          >
            {walmart_deals_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Walmart deals</h3>
              </div>
            )}

            {walmart_deals_search_status == "idle" ? (
              walmart_deals_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {walmart_deals_search_data?.map((item) => (
                        <Grid item xs={6}>
                          <GamesCard
                            item={item}
                            key={item?.id}
                            type="walmartDealsSearch"
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div
            className={target_deals_search_data?.length > 0 && "couponSlider"}
          >
            {target_deals_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Target deals</h3>
              </div>
            )}

            {target_deals_search_status == "idle" ? (
              target_deals_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {target_deals_search_data?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <GamesCard
                            item={item}
                            key={item?.id}
                            type="targetDealsSearch"
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div className={blog_search_data?.length > 0 && "couponSlider"}>
            {blog_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Blogs</h3>
              </div>
            )}

            {blog_search_status == "idle" ? (
              blog_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {blog_search_data?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <BlogCard
                            item={item}
                            key={item?.id}
                            type="blogsSearch"
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>

          <div className={movies_search_data?.length > 0 && "couponSlider"}>
            {movies_search_data?.length > 0 && (
              <div className="secHeading pad-none">
                <h3>Movies</h3>
              </div>
            )}

            {movies_search_status == "idle" ? (
              movies_search_data?.length > 0 && (
                <div className="itemsCarousel">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {movies_search_data?.map((item) => (
                        <Grid item sm={4} xs={6}>
                          <UpcommingMoviesCard
                            item={item}
                            key={item?.id}
                            type="moviesSearch"
                            favouriteList={favourite_list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </div>
              )
            ) : (
              <div className="couponSlider" style={{ marginTop: "0px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Skeleton_search />
                </Grid>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default index;
